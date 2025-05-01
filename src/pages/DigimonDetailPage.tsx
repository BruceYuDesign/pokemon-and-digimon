import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { usePageLayout } from '~/context/PageLayoutContext';
import { useDigimonDetailQuery } from '~/services/query/digimonQuery';
import { digimonTypeColors } from '~/libs/theme';
import DetailThumbnail from '~/components/Detail/DetailThumbnail';
import DetailName from '~/components/Detail/DetailName';
import DetailTypes from '~/components/Detail/DetailTypes';
import DetailDescription from '~/components/Detail/DetailDescription';
import DetailErrorContent from '~/components/Detail/DetailErrorContent';
import DetailOfflineContent from '~/components/Detail/DetailOfflineContent';


/**
 * Digimon 詳細資料頁面
 * @function DigimonDetailPage
 */
export default function DigimonDetailPage() {
  // 調用頁面佈局狀態
  const { setHeader } = usePageLayout();
  // 取得路由參數
  const { digimonId } = useParams<{ digimonId: string }>();


  // 取得 Digimon 詳細資料
  const {
    data: digimonDetail,
    isLoading,
    isError,
    isPaused,
    refetch,
  } = useDigimonDetailQuery(digimonId as string);


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
  if (isError) {
    return (
      <DetailErrorContent
        retryHandler={refetch}
      />
    );
  }


  // 網路斷線
  if (isPaused) {
    return (
      <DetailOfflineContent/>
    );
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