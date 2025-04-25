import type { CharacterCardProps } from '~/components/CharacterCard';
import { useState, useRef, useEffect } from 'react';
import { getPokemons, getPokemon } from '~/utils/pokemon';
import ListView from '~/components/ListView';
import CharacterCard from '~/components/CharacterCard';


export default function PokemonPage() {
  const [pokemons, setPokemons] = useState<Array<CharacterCardProps>>([]);
  const isLoading = useRef<boolean>(false);
  const nextPageUrl = useRef<string>(null);


  const getAndSetPokemons = async (getPokemonsUrl?: string) => {
    if (isLoading.current) return;
    isLoading.current = true;

    const data = await getPokemons(getPokemonsUrl);

    if (data) {
      const newPokemons = await Promise.all(
        data.results.map(({ url }) => getPokemon(url))
      );

      setPokemons(prevPokemons => [
        ...prevPokemons,
        ...newPokemons,
      ]);

      nextPageUrl.current = data.next;
    }
    isLoading.current = false;
  }


  const nextPageHandler = async () => {
    if (!nextPageUrl.current) return;
    getAndSetPokemons(nextPageUrl.current);
  }


  useEffect(() => {
    getAndSetPokemons();
  }, []);


  return (
    <ListView
      nextPageHandler={nextPageHandler}
    >
      {pokemons.map(pokemon => (
        <CharacterCard
          key={pokemon.name}
          {...pokemon}
        />
      ))}
    </ListView>
  );
}