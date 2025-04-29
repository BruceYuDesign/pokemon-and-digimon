import type { Pokemon as OriginPokemon } from '@bgoff1/pokeapi-types';
import { requestHandler } from '~/libs/requestHandler';
import { pokemonTypeColors } from '~/libs/theme';


interface Pokemons {
  /**
   * 總數量
   */
  count: number;
  /**
   * 下一頁請求網址
   */
  next: string;
  /**
   * 上一頁請求網址
   */
  previois: string;
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
}


interface Pokemon extends OriginPokemon {
  /**
   * 角色圖片（並非雪碧圖）
   */
  sprites: OriginPokemon['sprites'] & {
    /**
     * 其他角色圖片
     */
    other?: {
      /**
       * 官方藝術作品
       */
      ['official-artwork']?: {
        /**
         * 角色正面圖片
         */
        front_default?: string;
      };
    };
  };
}


export interface PokemonDetail {
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


// 所需的 Stat 名稱
type StatName = 'hp' | 'attack' | 'defense' | 'speed';


// 需從原始資料 stats 取得的屬性
const statNames = ['hp', 'attack', 'defense', 'speed'];


// Pokemon 基本請求網址
const baseUrl = 'https://pokeapi.co/api/v2/pokemon';


/**
 * 取得 Pokemon 清單資料
 * @function getPokemons
 * @param {string?} url - 請求網址，未填則請求第一頁
 * @returns {Promise<Pokemons>} - Pokemon 清單
 */
export async function getPokemons(url?: string): Promise<Pokemons> {
  const data = await requestHandler({
    url: url || `${baseUrl}?limit=18`,
  });

  return data;
}


/**
 * 使用 url 取得單一 Pokemon 詳細資料
 * @function getPokemonByUrl
 * @param {string} url - 請求網址
 * @returns {Promise<PokemonDetail>} - Pokemon 詳細資料
 */
export async function getPokemonByUrl(url: string): Promise<PokemonDetail> {
  const data: Pokemon = await requestHandler({ url });

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
export async function getPokemonById(id: string): Promise<PokemonDetail> {
  const requestUrl = `${baseUrl}/${id}`;
  return await getPokemonByUrl(requestUrl);
}