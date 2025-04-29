import type { PokemonDetail } from '~/services/pokemonService';
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getPokemons, getPokemonByUrl } from '~/services/pokemonService';
import { useListCache } from '~/context/ListCacheContext';
import { useDetailCache } from '~/context/DetailCacheContext';
import PageHeader from '~/components/PageHeader';
import ListView from '~/components/ListView';
import CharacterCard from '~/components/CharacterCard';


export default function PokemonListPage() {
  const navigate = useNavigate();
  const listCache = useListCache();
  const lockedRequest = useRef<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);
  const { setDetailCache } = useDetailCache();


  const getAndSetPokemons = async (getPokemonsUrl?: string) => {
    if (lockedRequest.current) return;
    lockedRequest.current = true;
    setIsLoading(true);
    try {
      const data = await getPokemons(getPokemonsUrl);
      const newPokemons = await Promise.all(
        data.results.map(({ url }) => getPokemonByUrl(url))
      );
      listCache.setItems(prevPokemons => [
        ...prevPokemons,
        ...newPokemons,
      ]);
      listCache.nextPageUrl.current = data.next;
      setHasError(false);
    } catch {
      setHasError(true);
    } finally {
      lockedRequest.current = false;
      setIsLoading(false);
    }
  }


  const nextPageHandler = () => {
    if (!listCache.nextPageUrl.current) return;
    getAndSetPokemons(listCache.nextPageUrl.current);
  }


  const handleCardClick = async (pokemonDetail: PokemonDetail) => {
    setDetailCache(pokemonDetail);
    navigate(`/pokemon/${pokemonDetail.id}`);
  }


  useEffect(() => {
    // 第一次載入頁面
    if (!listCache.items.length) {
      getAndSetPokemons();
    }

    // 回到上次捲動位置
    window.scrollTo(0, listCache.scrollY.current);

    // 記錄捲動位置
    const setScrollYCache = () => {
      listCache.scrollY.current = window.scrollY;
    }
    window.addEventListener('scroll', setScrollYCache);
    return () => window.removeEventListener('scroll', setScrollYCache);
  }, []);


  return (
    <div className='pt-[var(--header-height)]'>
      <PageHeader
        textColor='#FFFFFF'
        backgroundColor='#D53B47'
        prevPageUrl='/'
        prevPageName='Home'
        pageName='Pokemon'
      />
      <ListView
        nextPageHandler={nextPageHandler}
        isLoading={isLoading}
        hasError={hasError}
      >
        {(listCache.items as Array<PokemonDetail>).map((pokemonDetail, index) => (
          <CharacterCard
            key={index}
            name={pokemonDetail.name}
            thumbnail={pokemonDetail.thumbnail}
            textColor='#FFFFFF'
            backgroundColor={pokemonDetail.color}
            onClick={() => handleCardClick(pokemonDetail)}
          />
        ))}
      </ListView>
    </div>
  );
}