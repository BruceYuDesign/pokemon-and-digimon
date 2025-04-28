import type { Pokemon as OriginPokemon } from '@bgoff1/pokeapi-types';
import { requestHandler } from '~/libs/requestHandler';
import { pokemonTypeColors } from '~/libs/theme';


interface Pokemons {
  count: number;
  next: string;
  previois: string;
  results: Array<{
    name: string;
    url: string;
  }>;
}


interface Pokemon extends OriginPokemon {
  sprites: OriginPokemon['sprites'] & {
    other?: {
      ['official-artwork']?: {
        front_default?: string;
      };
    };
  };
}


export interface PokemonDetail {
  id: number | string;
  name: string;
  thumbnail: string;
  types: Array<string>;
  weight: number;
  height: number;
  hp: number;
  attack: number;
  defense: number;
  speed: number;
  exp: number;
  color: string;
}


type StatName = 'hp' | 'attack' | 'defense' | 'speed';


const statNames = ['hp', 'attack', 'defense', 'speed'];


const defaultUrl = 'https://pokeapi.co/api/v2/pokemon?limit=18';


export async function getPokemons(url?: string): Promise<Pokemons> {
  const data = await requestHandler({
    url: url || defaultUrl,
  });

  return data;
}


export async function getPokemon(url: string): Promise<PokemonDetail> {
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