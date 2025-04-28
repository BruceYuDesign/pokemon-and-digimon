import type { DigimonDetail } from '~/services/digimonService';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PageHeader from '~/components/PageHeader';
import CharacterThumbnail from '~/components/Character/CharacterThumbnail';
import CharacterName from '~/components/Character/CharacterName';
import CharacterTypes from '~/components/Character/CharacterTypes';
import CharacterDescription from '~/components/Character/CharacterDescription';
import { getDigimon } from '~/services/digimonService';
import { digimonTypeColors } from '~/libs/theme';


export default function DigimonDetailPage() {
  const [digimonDetail, setDigimonDetail] = useState<DigimonDetail | null>(null);
  const { digimonId } = useParams<{ digimonId: string }>();


  useEffect(() => {
    // 取得角色詳細資料
    const getAndSetDigimonDetail = async () => {
      const digimonDetail = await getDigimon(`https://digi-api.com/api/v1/digimon/${digimonId}`);
      setDigimonDetail(digimonDetail);
    }
    getAndSetDigimonDetail();

    // 捲動至頂部
    window.scrollTo(0, 0);
  }, []);


  return (
    <>
      <PageHeader
        textColor='#000000'
        backgroundColor='transparent'
        prevPageUrl='/digimon'
        prevPageName='Digimon'
        pageName={`#${digimonId?.padStart(5, '0')}`}
      />
      {/* 角色圖片 */}
      <CharacterThumbnail
        image={digimonDetail?.thumbnail}
        backgroundColor='#FFFFFF'
        alt={digimonDetail?.name}
      />
      {/* 角色資訊 */}
      <div className='flex flex-col items-center gap-6 p-6'>
        {/* 名稱 */}
        <CharacterName
          name={digimonDetail?.name}
        />
        {/* 屬性 */}
        <CharacterTypes
          types={digimonDetail?.types}
          typeColors={digimonTypeColors}
        />
        {/* 描述 */}
        <CharacterDescription
          description={digimonDetail?.description}
        />
      </div>
    </>
  );
}