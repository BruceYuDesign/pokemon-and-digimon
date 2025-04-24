import type { Pokemon } from "@bgoff1/pokeapi-types";
import type { CardProps } from '~/components/Card';
import { useState, useEffect } from 'react';
import Card from '~/components/Card';

interface PokemonWithArtwork extends Pokemon {
  sprites: Pokemon['sprites'] & {
    other?: {
      ['official-artwork']?: {
        front_default?: string;
      };
    };
  };
}

async function fetchCardOption(url: string) {
  const response = await fetch(url);
  const data: PokemonWithArtwork = await response.json();
  return {
    name: data.name,
    thumbnail: data.sprites.other?.['official-artwork']?.front_default,
    types: data.types.map(({ type }) => type.name),
    weight: data.weight,
    height: data.height,
    hp: data.stats.find(({ stat }) => stat.name === 'hp')?.base_stat,
    attack: data.stats.find(({ stat }) => stat.name === 'attack')?.base_stat,
    defense: data.stats.find(({ stat }) => stat.name === 'defense')?.base_stat,
    speed: data.stats.find(({ stat }) => stat.name === 'speed')?.base_stat,
    exp: data.base_experience,
  }
}

export default function PokemonPage() {
  const [cards, setCards] = useState<Array<CardProps>>([]);

  useEffect(() => {
    const fetchCards = async () => {
      const response = await fetch('https://pokeapi.co/api/v2/pokemon');
      const { results } = await response.json();
      const cards = await Promise.all(results.map(({ url }: { url: string }) => fetchCardOption(url)));
      setCards(cards);
    }
    fetchCards();
  }, []);

  return (
    <>
      {cards.map((card) => (
        <Card
          key={card.name}
          {...card}
        />
      ))}
    </>
  );
}