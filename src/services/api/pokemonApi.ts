import type { Pokemon } from '@bgoff1/pokeapi-types';
import { requestHandler } from '~/libs/requestHandler';
import { pokemonTypeColors } from '~/libs/theme';
import { commonApiConfig } from '~/services/api/common';


const {
  ITEMS_PER_PAGE,
} = commonApiConfig;


export interface PokemonListResult {
  /**
   * 角色清單
   */
  results: Array<{
    /**
     * 角色名稱
     */
    name: string;
    /**
     * 角色詳細資料請求網址
     */
    url: string;
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


export interface PokemonDetailResult {
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
   * 角色體重
   */
  weight: number;
  /**
   * 角色身高
   */
  height: number;
  /**
   * 角色血量
   */
  hp: number;
  /**
   * 角色攻擊力
   */
  attack: number;
  /**
   * 角色防禦力
   */
  defense: number;
  /**
   * 角色速度
   */
  speed: number;
  /**
   * 擊敗角色獲得的經驗值
   */
  exp: number;
  /**
   * 角色對應的顏色
   */
  color: string;
}


// 後端回傳 pokemon list 格式
interface PokemonListResponse {
  count: number;
  next?: string;
  previois?: string;
  results: Array<{
    name: string;
    url: string;
  }>;
}


// 後端回傳 pokemon detail 格式
interface PokemonDetailResponse extends Pokemon {
  sprites: Pokemon['sprites'] & {
    other?: {
      ['official-artwork']?: {
        front_default?: string;
      }
    }
  }
}


// 所需的 Stat 名稱
type StatName = 'hp' | 'attack' | 'defense' | 'speed';


// 需從原始資料 stats 取得的屬性
const statNames = ['hp', 'attack', 'defense', 'speed'];


// Pokemon 基本請求網址
const baseUrl = 'https://pokeapi.co/api/v2/pokemon';


/**
 * 取得 Pokemon 清單資料
 * @function getPokemons
 * @param {number?} page - 請求頁碼，未填則請求第一頁
 * @returns {Pokemons} - Pokemon 清單
 */
export async function getPokemons(page?: number): Promise<PokemonListResult> {
  const currentPage = page || 0;

  const data: PokemonListResponse = await requestHandler({
    url: `${baseUrl}?offset=${currentPage * ITEMS_PER_PAGE}&limit=${ITEMS_PER_PAGE}`,
  });

  return {
    results: data.results,
    pagenation: {
      page: currentPage,
      totalPages: Math.ceil(data.count / ITEMS_PER_PAGE),
      nextPage: data.next ? (currentPage + 1) : undefined,
    },
  };
}


/**
 * 使用 url 取得單一 Pokemon 詳細資料
 * @function getPokemonByUrl
 * @param {string} url - 請求網址
 * @returns {Promise<PokemonDetail>} - Pokemon 詳細資料
 */
export async function getPokemonByUrl(url: string): Promise<PokemonDetailResult> {
  const data: PokemonDetailResponse = await requestHandler({ url });

  // 取出需要的資料
  const { hp, attack, defense, speed } = data.stats.reduce(
    (accumulator: Record<StatName, number>, { stat, base_stat }) => {
      if (statNames.includes(stat.name)) {
        accumulator[stat.name as StatName] = base_stat;
      }
      return accumulator;
    },
    {} as Record<StatName, number>,
  );

  return {
    id: data.id,
    name: data.name.replaceAll('-', ' ').trim(),
    thumbnail: data.sprites.other?.['official-artwork']?.front_default || data.sprites.front_default || '',
    types: data.types.map(({ type }) => type.name),
    weight: data.weight,
    height: data.height,
    hp,
    attack,
    defense,
    speed,
    exp: data.base_experience,
    color: pokemonTypeColors[data.types[0].type.name],
  }
}


/**
 * 使用 id 取得單一 Pokemon 詳細資料
 * @function getPokemonById
 * @param {string} id - 請求的 id
 * @returns {Promise<PokemonDetail>} - Pokemon 詳細資料
 */
export async function getPokemonById(id: string): Promise<PokemonDetailResult> {
  const requestUrl = `${baseUrl}/${id}`;
  return await getPokemonByUrl(requestUrl);
}