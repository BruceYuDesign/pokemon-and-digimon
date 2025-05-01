import { Fragment, useLayoutEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePokemonListQuery } from '~/services/query/pokemonQuery';
import { usePageLayout } from '~/context/PageLayoutContext';
import { useScrollCache } from '~/context/ScrollCacheContext';
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
  const { scrollCache } = useScrollCache();


  // 取得並設定 Pokemon 清單
  const {
    data: pokemonsData,
    isFetching,
    isError,
    fetchNextPage,
    hasNextPage,
  } = usePokemonListQuery();


  // 角色卡片點擊處理函式
  const handleCardClick = async (pokemonId: string | number) => {
    scrollCache.current = window.scrollY;
    navigate(`/pokemon/${pokemonId}`);
  }


  // 在首次載入頁面時執行
  useLayoutEffect(() => {
    // 設定頁首
    setHeader({
      textColor: '#FFFFFF',
      backgroundColor: 'var(--color-pokemon)',
      prevPageUrl: '/',
      prevPageName: 'Home',
      pageName: 'Pokemon',
    });

    // 回到上次捲動位置
    window.scrollTo(0, scrollCache.current);
  }, []);


  return (
    <ListView
      nextPageHandler={fetchNextPage}
      isFetching={isFetching}
      isError={isError}
      hasNextPage={hasNextPage}
    >
      {
        pokemonsData?.pages?.map((page, index) => (
          <Fragment
            key={index}
          >
            {
              page.content.map((pokemonItem, index) => (
                <CharacterCard
                  key={index}
                  name={pokemonItem.name}
                  thumbnail={pokemonItem.thumbnail}
                  textColor='#FFFFFF'
                  backgroundColor={pokemonItem.color}
                  onClick={() => handleCardClick(pokemonItem.id)}
                />
              ))
            }
          </Fragment>
        ))
      }
    </ListView>
  );
}