import type { PokemonDetail } from '~/services/pokemonService';
import { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getPokemons, getPokemon } from '~/services/pokemonService';
import { useListCache } from '~/context/ListCacheContext';
import { usePokemonDetail } from '~/context/pokemonDetailContext';
import PageHeader from '~/components/PageHeader';
import ListView from '~/components/ListView';
import CharacterCard from '~/components/Character/CharacterCard';


export default function PokemonListPage() {
  const navigate = useNavigate();
  const listCache = useListCache();
  const { setPokemonDetail } = usePokemonDetail();
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


  const handleCardClick = async (pokemonDetail: PokemonDetail) => {
    setPokemonDetail(pokemonDetail);
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
    <div className='relative pt-12'>
      <PageHeader
        textColor='#FFFFFF'
        backgroundColor='#D53B47'
        prevPageUrl='/'
        prevPageName='Home'
        pageName='Pokemon'
      />
      <ListView
        nextPageHandler={nextPageHandler}
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