import type { DigimonDetail } from '~/services/digimonService';
import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { usePageLayout } from '~/context/PageLayoutContext';
import { getDigimonById } from '~/services/digimonService';
import { digimonTypeColors } from '~/libs/theme';
import DetailThumbnail from '~/components/Detail/DetailThumbnail';
import DetailName from '~/components/Detail/DetailName';
import DetailTypes from '~/components/Detail/DetailTypes';
import DetailDescription from '~/components/Detail/DetailDescription';
import DetailErrorContent from '~/components/Detail/DetailErrorContent';


/**
 * Digimon 詳細資料頁面
 * @function DigimonDetailPage
 */
export default function DigimonDetailPage() {
  // 調用頁面佈局狀態
  const { setHeader } = usePageLayout();
  // 取得路由參數
  const { digimonId } = useParams<{ digimonId: string }>();
  // Digimon 詳細資料
  const [digimonDetail, setDigimonDetail] = useState<DigimonDetail | null>(null);
  // 是否讀取中
  const [isLoading, setIsLoading] = useState(true);
  // 是否有錯誤
  const [hasError, setHasError] = useState(false);


  // 取得並設定 Digimon 詳細資料
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


  // 頁面載入時，取得 Digimon 詳細資料
  useEffect(() => {
    getAndSetDigimonDetail();
  }, []);


  // 監聽 Digimon 詳細資料是否有更新，設定頁面佈局
  useEffect(() => {
    setHeader({
      textColor: digimonDetail ? '#000000' : '#FFFFFF',
      backgroundColor: digimonDetail ? '#FFFFFF' : 'transparent',
      prevPageUrl: '/digimon',
      prevPageName: 'Digimon',
      pageName: `#${digimonId?.padStart(5, '0')}`,
    });
  }, [digimonDetail]);


  // 錯誤頁面
  if (!isLoading && hasError) {
    return (
      <DetailErrorContent
        retryHandler={getAndSetDigimonDetail}
      />
    )
  }


  return (
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
}