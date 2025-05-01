import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { usePageLayout } from '~/context/PageLayoutContext';
import { usePokemonDetailQuery } from '~/services/query/pokemonQuery';
import { pokemonTypeColors } from '~/libs/theme';
import DetailThumbnail from '~/components/Detail/DetailThumbnail';
import DetailName from '~/components/Detail/DetailName';
import DetailTypes from '~/components/Detail/DetailTypes';
import DetailValueLabel from '~/components/Detail/DetailValueLabel';
import DetailProgressBar from '~/components/Detail/DetailProgressBar';
import DetailErrorContent from '~/components/Detail/DetailErrorContent';
import DetailOfflineContent from '~/components/Detail/DetailOfflineContent';


/**
 * Pokemon 詳細資料頁面
 * @function PokemonDetailPage
 */
export default function PokemonDetailPage() {
  // 調用頁面佈局狀態
  const { setHeader } = usePageLayout();
  // 取得路由參數
  const { pokemonId } = useParams<{ pokemonId: string }>();


  // 取得 Pokemon 詳細資料
  const {
    data: pokemonDetail,
    isLoading,
    isError,
    isPaused,
    refetch,
  } = usePokemonDetailQuery(pokemonId as string);


  // 監聽 Pokemon 詳細資料是否有更新，設定頁面佈局
  useEffect(() => {
    setHeader({
      textColor: '#FFFFFF',
      backgroundColor: pokemonDetail?.color || 'transparent',
      prevPageUrl: '/pokemon',
      prevPageName: 'Pokemon',
      pageName: `#${pokemonId?.padStart(5, '0')}`,
    });
  }, [pokemonDetail]);


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
        image={pokemonDetail?.thumbnail}
        backgroundColor={pokemonDetail?.color}
        alt={pokemonDetail?.name}
        isLoading={isLoading}
      />
      {/* 角色資訊 */}
      <div className='flex flex-col items-center gap-6 p-6'>
        {/* 名稱 */}
        <DetailName
          name={pokemonDetail?.name}
          isLoading={isLoading}
        />
        {/* 屬性 */}
        <DetailTypes
          types={pokemonDetail?.types}
          typeColors={pokemonTypeColors}
          isLoading={isLoading}
        />
        {/* 大小 */}
        <div className='w-full flex flex-row justify-around items-start'>
          {/* 體重 */}
          <DetailValueLabel
            label='Weight'
            unit='KG'
            value={pokemonDetail?.weight ? pokemonDetail.weight / 10 : 0}
            isLoading={isLoading}
          />
          {/* 身高 */}
          <DetailValueLabel
            label='Height'
            unit='M'
            value={pokemonDetail?.height ? pokemonDetail.height / 10 : 0}
            isLoading={isLoading}
          />
        </div>
        {/* 數值 */}
        <h2 className='text-xl'>
          Base Stats
        </h2>
        <div className='w-full flex flex-col items-center gap-4'>
          {/* 生命值 */}
          <DetailProgressBar
            label='HP'
            value={pokemonDetail?.hp}
            maxValue={255}
            progressColor='#D63843'
            isLoading={isLoading}
          />
          {/* 攻擊力 */}
          <DetailProgressBar
            label='ATK'
            value={pokemonDetail?.attack}
            maxValue={190}
            progressColor='#FEA726'
            isLoading={isLoading}
          />
          {/* 防禦力 */}
          <DetailProgressBar
            label='DEF'
            value={pokemonDetail?.defense}
            maxValue={250}
            progressColor='#0091EA'
            isLoading={isLoading}
          />
          {/* 速度 */}
          <DetailProgressBar
            label='SPD'
            value={pokemonDetail?.speed}
            maxValue={200}
            progressColor='#8EB0C4'
            isLoading={isLoading}
          />
          {/* 經驗值 */}
          <DetailProgressBar
            label='EXP'
            value={pokemonDetail?.exp}
            maxValue={635}
            progressColor='#388D3E'
            isLoading={isLoading}
          />
        </div>
      </div>
    </>
  );
}