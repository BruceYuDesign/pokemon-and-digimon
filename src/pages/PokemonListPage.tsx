import { useRef, useEffect } from 'react';
import { getPokemons, getPokemon } from '~/services/pokemonServices';
import { useListCache } from '~/context/ListCacheContext';
import ListView from '~/components/ListView';
import CharacterCard from '~/components/CharacterCard';


export default function PokemonListPage() {
  const listCache = useListCache();
  const isLoading = useRef<boolean>(false);


  const getAndSetPokemons = async (getPokemonsUrl?: string) => {
    if (isLoading.current) return;
    isLoading.current = true;

    const data = await getPokemons(getPokemonsUrl);

    if (data) {
      const newPokemons = await Promise.all(
        data.results.map(({ url }) => getPokemon(url))
      );

      listCache.setItems(prevPokemons => [
        ...prevPokemons,
        ...newPokemons,
      ]);

      listCache.nextPageUrl.current = data.next;
    }
    isLoading.current = false;
  }


  const nextPageHandler = () => {
    if (!listCache.nextPageUrl.current) return;
    getAndSetPokemons(listCache.nextPageUrl.current);
  }


  useEffect(() => {
    // 第一次載入頁面
    if (!listCache.items.length) {
      getAndSetPokemons();
    }

    // 回到上次捲動位置
    window.scrollTo(0, listCache.scrollY.current);

    // 記錄捲動位置
    // TODO 滾動中會無法取得捲動位置
    const setScrollYCache = () => {
      listCache.scrollY.current = window.scrollY;
    }
    window.addEventListener('scroll', setScrollYCache);
    return () => window.removeEventListener('scroll', setScrollYCache);
  }, []);


  return (
    <ListView
      nextPageHandler={nextPageHandler}
    >
      {listCache.items.map(pokemon => (
        <CharacterCard
          key={pokemon.name}
          {...pokemon}
        />
      ))}
    </ListView>
  );
}