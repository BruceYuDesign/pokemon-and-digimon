import type { DigimonDetail } from '~/services/digimonService';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PageHeader from '~/components/PageHeader';
import { getDigimon } from '~/services/digimonService';
import { digimonTypeColors } from '~/libs/theme';


export default function DigimonDetailPage() {
  const [digimonDetail, setDigimonDetail] = useState<DigimonDetail | null>(null);
  const { digimonId } = useParams<{ digimonId: string }>();


  useEffect(() => {
    // 捲動至頂部
    window.scrollTo(0, 0);

    // 取得角色詳細資料
    const getAndSetDigimonDetail = async () => {
      const digimonDetail = await getDigimon(`https://digi-api.com/api/v1/digimon/${digimonId}`);
      setDigimonDetail(digimonDetail);
    }
    getAndSetDigimonDetail();
  }, []);


  return (
    <>
      <PageHeader
        textColor='#000000'
        backgroundColor='transparent'
        prevPageUrl='/digimon'
        prevPageName='Digimon'
        pageName={`#${digimonId?.padStart(4, '0')}`}
      />
      {/* 角色圖片 */}
      <div
        className='flex items-center justify-center h-[280px] rounded-b-4xl'
        style={{
          backgroundColor: '#FFFFFF',
        }}
      >
        {
          digimonDetail?.thumbnail && (
            <img
              className='h-2/3 w-auto'
              src={digimonDetail?.thumbnail || ''}
              alt={digimonDetail?.name || 'Unknown'}
            />
          )
        }
      </div>
      {/* 角色資訊 */}
      <div className='flex flex-col items-center gap-6 p-6'>
        {/* 名稱 */}
        <h1 className='text-3xl'>
          {digimonDetail?.name || 'Unknown'}
        </h1>
        {/* 屬性 */}
        <div className='flex flex-row gap-4 flex-wrap'>
          {
            digimonDetail?.types?.map(type => (
              <span
                key={type}
                className='px-3 min-w-28 h-6 flex items-center justify-center rounded-full'
                style={{
                  backgroundColor: digimonTypeColors[type],
                }}
              >
                {type}
              </span>
            )) || 'Unknown'
          }
        </div>
        <p className='text-lg leading-loose'>
          {digimonDetail?.description || 'Unknown'}
        </p>
      </div>
    </>
  );
}