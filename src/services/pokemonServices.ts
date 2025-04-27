import type { Pokemon } from '@bgoff1/pokeapi-types';
import type { CharacterDetail } from '~/context/CharacterDetailContext';
import { requestHandler } from '~/libs/requestHandler';


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


export const typeColors: Record<string, string> = {
  grass: '#4E7A40',
  poison: '#6A4E6A',
  fire: '#9E4E30',
  flying: '#6A6790',
  water: '#405E90',
  bug: '#6A7840',
  normal: '#6A6A54',
  electric: '#A08E40',
  fairy: '#A0707C',
  ground: '#96804C',
  fighting: '#702C28',
  psychic: '#A05068',
  rock: '#786840',
  steel: '#787890',
  ice: '#5C8C8C',
  ghost: '#483C58',
  dragon: '#402880',
  dark: '#483C38',
}


export async function getPokemons(url?: string): Promise<Pokemons> {
  const data = await requestHandler({
    url: url || baseUrl,
  });

  return data;
}


export async function getPokemon(url: string): Promise<CharacterDetail> {
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

  // 於 <CharacterCard/> 與 <PokemonDetailPage/> 中統一處理空值
  return {
    id: data.id,
    name: data.name.replaceAll('-', ' ').trim(),
    thumbnail: data.sprites.other?.['official-artwork']?.front_default || data.sprites.front_default || undefined,
    types: data.types.map(({ type }) => type.name),
    weight: data.weight,
    height: data.height,
    hp,
    attack,
    defense,
    speed,
    exp: data.base_experience,
    color: typeColors[data.types[0].type.name],
  }
}