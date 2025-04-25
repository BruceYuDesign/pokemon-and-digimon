import type { Pokemon } from '@bgoff1/pokeapi-types';
import type { CharacterCardProps } from '~/components/CharacterCard';
import { requestHandler } from '~/utils/requestHandler';


interface Pokemons {
  count: number;
  next: string;
  previois: string;
  results: Array<{
    name: string;
    url: string;
  }>;
}


interface PokemonWithArtwork extends Pokemon {
  sprites: Pokemon['sprites'] & {
    other?: {
      ['official-artwork']?: {
        front_default?: string;
      };
    };
  };
}


type StatName = 'hp' | 'attack' | 'defense' | 'speed';


const statNames = ['hp', 'attack', 'defense', 'speed'];


const baseUrl = 'https://pokeapi.co/api/v2/pokemon';


export async function getPokemons(url?: string): Promise<Pokemons> {
  const data = await requestHandler({
    url: url || baseUrl,
  });
  return data;
}


export async function getPokemon(url: string): Promise<CharacterCardProps> {
  const data: PokemonWithArtwork = await requestHandler({ url });


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

  // 於 <Card/> 中統一處理 void 型別
  return {
    name: data.name,
    thumbnail: data.sprites.other?.['official-artwork']?.front_default || data.sprites.front_default || undefined,
    types: data.types.map(({ type }) => type.name),
    weight: data.weight,
    height: data.height,
    hp,
    attack,
    defense,
    speed,
    exp: data.base_experience,
  }
}