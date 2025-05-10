import { requestHandler } from '~/libs/requestHandler';
import { commonApiConfig } from '~/services/api/common';


const {
  ITEMS_PER_PAGE,
} = commonApiConfig;


export interface DigimonListResult {
  /**
   * 角色清單
   */
  results: Array<{
    /**
     * 角色唯一識別碼
     */
    id: number | string;
    /**
     * 角色名稱
     */
    name: string;
    /**
     * 角色詳細資料的請求網址
     */
    href: string;
    /**
     * 角色圖片
     */
    thumbnail: string;
  }>;
  /**
   * 分頁資訊
   */
  pagenation: {
    /**
     * 當前頁碼
     */
    page: number;
    /**
     * 總頁數
     */
    totalPages: number;
    /**
     * 下一頁頁碼
     */
    nextPage?: number;
  }
}


export interface DigimonDetailResult {
  /**
   * 角色的唯一識別碼
   */
  id: number | string;
  /**
   * 角色名稱
   */
  name: string;
  /**
   * 角色圖片
   */
  thumbnail: string;
  /**
   * 角色屬性
   */
  types: Array<string>;
  /**
   * 角色描述
   */
  description: string;
}


// 後端回傳 digimon list 格式
interface DigimonListResponse {
  content: Array<{
    id: number | string;
    name: string;
    href: string;
    image: string;
  }>;
  pageable: {
    currentPage: number;
    elementsOnPage: number;
    totalElements: number;
    totalPages: number;
    previousPage: string;
    nextPage: string;
  }
}


// 後端回傳 digimon detail 格式
interface DigimonDetailResponse {
  id: number;
  name: string;
  xAntibody: boolean;
  images: Array<{
    href: string;
    transparent: boolean;
  }>;
  levels: Array<{
    id: number;
    level: string;
  }>;
  types: Array<{
    id: number;
    type: string;
  }>;
  attributes: Array<{
    id: number;
    attribute: string;
  }>;
  fields: Array<{
    id: number;
    field: string;
    image: string;
  }>;
  releaseDate: string;
  descriptions: Array<{
    origin: string;
    language: string;
    description: string;
  }>;
  skills: Array<{
    id: number;
    skill: string;
    translation: string;
    description: string;
  }>;
  priorEvolutions: Array<{
    id: number;
    digimon: string;
    condition: string;
    image: string;
    url: string;
  }>;
  nextEvolutions: Array<{
    id: number;
    digimon: string;
    condition: string;
    image: string;
    url: string;
  }>;
}


// Digimon 基本請求網址
const baseUrl = 'https://digi-api.com/api/v1/digimon';


/**
 * 取得 Digimon 清單資料
 * @function getDigimons
 * @param {number?} page - 請求頁碼，未填則請求第一頁
 * @returns {Promise<DigimonListResult>} - Digimon 清單
 */
export async function getDigimons(page?: number): Promise<DigimonListResult> {
  const data: DigimonListResponse = await requestHandler({
    url: `${baseUrl}?page=${page || 0}&pageSize=${ITEMS_PER_PAGE}`,
  });

  const { currentPage, totalPages } = data.pageable;
  const results = data.content.map(({ image, ...others }) => ({
    thumbnail: image,
    ...others,
  }));

  return {
    results,
    pagenation: {
      page: currentPage,
      totalPages: totalPages,
      nextPage: currentPage < totalPages ? currentPage + 1 : undefined,
    },
  };
}


/**
 * 使用 url 取得單一 Digimon 詳細資料
 * @function getDigimonByUrl
 * @param {string} url - 請求網址
 * @returns {Promise<DigimonDetailResult>} - Digimon 詳細資料
 */
export async function getDigimonByUrl(url: string): Promise<DigimonDetailResult> {
  const data: DigimonDetailResponse = await requestHandler({ url });

  return {
    id: data.id,
    name: data.name.replaceAll('-', ' ').trim(),
    thumbnail: data.images[0].href,
    types: data.types.map(({ type }) => type),
    description: data.descriptions.find(({ language }) => language === 'en_us')?.description || '',
  }
}


/**
 * 使用 id 取得單一 Digimon 詳細資料
 * @function getDigimonById
 * @param {string} id - 請求的 id
 * @returns {Promise<DigimonDetail>} - Digimon 詳細資料
 */
export async function getDigimonById(id: string): Promise<DigimonDetailResult> {
  const requestUrl = `${baseUrl}/${id}`;
  return await getDigimonByUrl(requestUrl);
}