import type { DigimonDetail } from '~/services/digimonService';
import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import PageHeader from '~/components/PageHeader';
import DetailThumbnail from '~/components/Detail/DetailThumbnail';
import DetailName from '~/components/Detail/DetailName';
import DetailTypes from '~/components/Detail/DetailTypes';
import DetailDescription from '~/components/Detail/DetailDescription';
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
      <DetailThumbnail
        image={digimonDetail?.thumbnail}
        backgroundColor='#FFFFFF'
        alt={digimonDetail?.name}
        isLoading={isLoading}
      />
      {/* 角色資訊 */}
      <div className='flex flex-col items-center gap-6 p-6'>
        {/* 名稱 */}
        <DetailName
          name={digimonDetail?.name}
          isLoading={isLoading}
        />
        {/* 屬性 */}
        <DetailTypes
          types={digimonDetail?.types}
          typeColors={digimonTypeColors}
          isLoading={isLoading}
        />
        {/* 描述 */}
        <DetailDescription
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
        backgroundColor='#FFFFFF'
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