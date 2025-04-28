import type { DigimonDetail } from '~/services/digimonService';
import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import PageHeader from '~/components/PageHeader';
import CharacterThumbnail from '~/components/Character/CharacterThumbnail';
import CharacterName from '~/components/Character/CharacterName';
import CharacterTypes from '~/components/Character/CharacterTypes';
import CharacterDescription from '~/components/Character/CharacterDescription';
import ErrorRetryButton from '~/components/ErrorRetryButton';
import { getDigimonById } from '~/services/digimonService';
import { digimonTypeColors } from '~/libs/theme';


export default function DigimonDetailPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [digimonDetail, setDigimonDetail] = useState<DigimonDetail | null>(null);
  const { digimonId } = useParams<{ digimonId: string }>();


  const getAndSetDigimonDetail = useCallback(async () => {
    setIsLoading(true);
    try {
      const digimonDetail = await getDigimonById(digimonId as string);
      setDigimonDetail(digimonDetail);
      setHasError(false);
    } catch {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  }, [digimonId]);


  useEffect(() => {
    getAndSetDigimonDetail();
  }, []);


  const pageContent = () => (
    <>
      {/* 角色圖片 */}
      <CharacterThumbnail
        image={digimonDetail?.thumbnail}
        backgroundColor='#FFFFFF'
        alt={digimonDetail?.name}
        isLoading={isLoading}
      />
      {/* 角色資訊 */}
      <div className='flex flex-col items-center gap-6 p-6'>
        {/* 名稱 */}
        <CharacterName
          name={digimonDetail?.name}
          isLoading={isLoading}
        />
        {/* 屬性 */}
        <CharacterTypes
          types={digimonDetail?.types}
          typeColors={digimonTypeColors}
          isLoading={isLoading}
        />
        {/* 描述 */}
        <CharacterDescription
          description={digimonDetail?.description}
          isLoading={isLoading}
        />
      </div>
    </>
  );


  const errorContent = () => (
    <div className='min-h-dvh w-dvw flex flex-col items-center justify-center'>
      <ErrorRetryButton
        retryHandler={getAndSetDigimonDetail}
      />
    </div>
  );


  return (
    <>
      <PageHeader
        textColor='#000000'
        backgroundColor='transparent'
        prevPageUrl='/digimon'
        prevPageName='Digimon'
        pageName={`#${digimonId?.padStart(5, '0')}`}
      />
      {
        (!isLoading && hasError)
          ? errorContent()
          : pageContent()
      }
    </>
  );
}