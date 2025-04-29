import type { DigimonItem } from '~/services/digimonService';
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDigimons } from '~/services/digimonService';
import { useListCache } from '~/context/ListCacheContext';
import PageHeader from '~/components/PageHeader';
import ListView from '~/components/ListView';
import CharacterCard from '~/components/CharacterCard';


export default function DigimonListPage() {
  const navigate = useNavigate();
  const listCache = useListCache();
  const lockedRequest = useRef<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);


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


  const nextPageHandler = () => {
    if (!listCache.nextPageUrl.current) return;
    getAndSetDigimons(listCache.nextPageUrl.current);
  }


  const handleCardClick = async (digimonItem: DigimonItem) => {
    navigate(`/digimon/${digimonItem.id}`);
  }


  useEffect(() => {
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
    <div className='relative pt-12'>
      <PageHeader
        textColor='#FFFFFF'
        backgroundColor='#2B5DB2'
        prevPageUrl='/'
        prevPageName='Home'
        pageName='Digimon'
      />
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
    </div>
  );
}