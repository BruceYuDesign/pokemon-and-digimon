import { Fragment, useLayoutEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDigimonListQuery } from '~/services/query/digimonQuery';
import { usePageLayout } from '~/context/PageLayoutContext';
import { useScrollCache } from '~/context/ScrollCacheContext';
import ListView from '~/components/ListView';
import CharacterCard from '~/components/CharacterCard';


/**
 * Digimon 清單頁面
 * @function DigimonListPage
 */
export default function DigimonListPage() {
  // 調用頁面導航
  const navigate = useNavigate();
  // 調用頁面佈局狀態
  const { setHeader } = usePageLayout();
  // 調用清單資料緩存
  const { scrollCache } = useScrollCache();


  // 取得 Digimons 清單
  const {
    data: digimonsData,
    isFetching,
    isError,
    fetchNextPage,
    hasNextPage,
  } = useDigimonListQuery();


  // 角色卡片點擊處理函式
  const handleCardClick = async (digimonId: string | number) => {
    scrollCache.current = window.scrollY;
    navigate(`/digimon/${digimonId}`);
  }


  // 在首次載入頁面時執行
  useLayoutEffect(() => {
    // 設定頁首
    setHeader({
      textColor: '#FFFFFF',
      backgroundColor: 'var(--color-digimon)',
      prevPageUrl: '/',
      prevPageName: 'Home',
      pageName: 'Digimon',
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
        digimonsData?.pages?.map((page, index) => (
          <Fragment
            key={index}
          >
            {
              page.content.map((digimonItem, index) => (
                <CharacterCard
                  key={index}
                  name={digimonItem.name}
                  thumbnail={digimonItem.image}
                  textColor='#000000'
                  backgroundColor='#FFFFFF'
                  onClick={() => handleCardClick(digimonItem.id)}
                />
              ))
            }
          </Fragment>
        ))
      }
    </ListView>
  );
}