import { requestHandler } from '~/libs/requestHandler';


interface DigimonListResult {
  /**
   * 角色清單
   */
  content: Array<{
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
    image: string;
  }>;
  /**
   * 分頁資訊
   */
  pageable: {
    /**
     * 當前頁碼
     */
    currentPage: number;
    /**
     * 該頁的角色數量
     */
    elementsOnPage: number;
    /**
     * 角色總數
     */
    totalElements: number;
    /**
     * 總頁數
     */
    totalPages: number;
    /**
     * 上一頁請求網址
     */
    previousPage: string;
    /**
     * 下一頁請求網址
     */
    nextPage: string;
  }
}


interface DigimonDetailResult {
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


// 未有完整 API 說明
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
 * @returns {Promise<Digimons>} - Digimon 清單
 */
export async function getDigimons(page?: number): Promise<DigimonListResult> {
  const data = await requestHandler({
    url: `${baseUrl}?page=${page || 0}&pageSize=18`,
  });

  return data;
}


/**
 * 使用 url 取得單一 Digimon 詳細資料
 * @function getDigimonByUrl
 * @param {string} url - 請求網址
 * @returns {Promise<DigimonDetail>} - Digimon 詳細資料
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