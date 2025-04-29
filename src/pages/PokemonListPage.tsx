import type { PokemonDetail } from '~/services/pokemonService';
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getPokemons, getPokemonByUrl } from '~/services/pokemonService';
import { usePageLayout } from '~/context/PageLayoutContext';
import { useListCache } from '~/context/ListCacheContext';
import { useDetailCache } from '~/context/DetailCacheContext';
import ListView from '~/components/ListView';
import CharacterCard from '~/components/CharacterCard';


/**
 * Pokemon 清單頁面
 * @function PokemonListPage
 */
export default function PokemonListPage() {
  // 調用頁面導航
  const navigate = useNavigate();
  // 調用頁面佈局狀態
  const { setHeader } = usePageLayout();
  // 調用清單資料緩存
  const listCache = useListCache();
  // 調用角色詳細資料緩存
  const { setDetailCache } = useDetailCache();
  // 鎖定請求，用於防止重複請求
  const lockedRequest = useRef<boolean>(false);
  // 是否讀取中
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // 是否有錯誤
  const [hasError, setHasError] = useState<boolean>(false);


  // 取得並設定 Pokemon 列表
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


  // 下一頁處理函式
  const nextPageHandler = () => {
    if (!listCache.nextPageUrl.current) return;
    getAndSetPokemons(listCache.nextPageUrl.current);
  }


  // 角色卡片點擊處理函式
  const handleCardClick = async (pokemonDetail: PokemonDetail) => {
    setDetailCache(pokemonDetail);
    navigate(`/pokemon/${pokemonDetail.id}`);
  }


  // 在首次載入頁面時執行
  useEffect(() => {
    // 設定頁首
    setHeader({
      textColor: '#FFFFFF',
      backgroundColor: 'var(--color-pokemon)',
      prevPageUrl: '/',
      prevPageName: 'Home',
      pageName: 'Pokemon',
    });

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
  );
}