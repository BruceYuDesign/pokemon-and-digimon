import type { DigimonItem } from '~/services/digimonService';
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDigimons } from '~/services/digimonService';
import { usePageLayout } from '~/context/PageLayoutContext';
import { useListCache } from '~/context/ListCacheContext';
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
  const listCache = useListCache();
  // 鎖定請求，用於防止重複請求
  const lockedRequest = useRef<boolean>(false);
  // 是否讀取中
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // 是否有錯誤
  const [hasError, setHasError] = useState<boolean>(false);


  // 取得並設定 Digimon 列表
  const getAndSetDigimons = async (getDigimonsUrl?: string) => {
    if (lockedRequest.current) return;
    lockedRequest.current = true;
    setIsLoading(true);
    try {
      const data = await getDigimons(getDigimonsUrl);
      listCache.setItems(prevDigimons => [
        ...prevDigimons,
        ...data.content,
      ]);
      listCache.nextPageUrl.current = data.pageable.nextPage;
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
    getAndSetDigimons(listCache.nextPageUrl.current);
  }


  // 角色卡片點擊處理函式
  const handleCardClick = async (digimonItem: DigimonItem) => {
    navigate(`/digimon/${digimonItem.id}`);
  }


  // 在首次載入頁面時執行
  useEffect(() => {
    // 設定頁首
    setHeader({
      textColor: '#FFFFFF',
      backgroundColor: 'var(--color-digimon)',
      prevPageUrl: '/',
      prevPageName: 'Home',
      pageName: 'Digimon',
    });

    // 第一次載入頁面
    if (!listCache.items.length) {
      getAndSetDigimons();
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
      {(listCache.items as Array<DigimonItem>).map((digimonItem, index) => (
        <CharacterCard
          key={index}
          name={digimonItem.name}
          thumbnail={digimonItem.image}
          textColor='#000000'
          backgroundColor='#FFFFFF'
          onClick={() => handleCardClick(digimonItem)}
        />
      ))}
    </ListView>
  );
}