import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PageHeader from '~/components/PageHeader';
import ProgressBar from '~/components/ProgressBar';
import { useCharacterDetail } from '~/context/CharacterDetailContext';
import { typeColors, getPokemon } from '~/services/pokemonServices';


export default function PokemonDetailPage() {
  const { characterDetail, setCharacterDetail } = useCharacterDetail();
  const { pokemonId } = useParams<{ pokemonId: string }>();


  useEffect(() => {
    // 捲動至頂部
    window.scrollTo(0, 0);

    // 第一次載入應用程式時，取得角色詳細資料
    const getAndSetPokemonDetail = async () => {
      const characterDetail = await getPokemon(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
      setCharacterDetail(characterDetail);
    }
    if (!characterDetail) {
      getAndSetPokemonDetail();
    }
  }, []);


  return (
    <>
      <PageHeader
        prevPageUrl='/pokemon'
        prevPageName='Pokemon'
        pageName={`#${pokemonId?.padStart(4, '0')}`}
      />
      {/* 角色圖片 */}
      <div
        className='flex items-center justify-center h-[280px] rounded-b-4xl'
        style={{
          backgroundColor: characterDetail?.color || '#3A393B',
        }}
      >
        {
          characterDetail?.thumbnail && (
            <img
              className='h-2/3 w-auto'
              src={characterDetail?.thumbnail || ''}
              alt={characterDetail?.name || 'Unknown'}
            />
          )
        }
      </div>
      {/* 角色資訊 */}
      <div className='flex flex-col items-center gap-6 p-6'>
        {/* 名稱 */}
        <h2 className='text-3xl'>
          {characterDetail?.name || 'Unknown'}
        </h2>
        {/* 屬性 */}
        <div className='flex flex-row gap-4'>
          {
            characterDetail?.types?.map(type => (
              <span
                key={type}
                className='w-28 h-6 flex items-center justify-center rounded-full'
                style={{
                  backgroundColor: typeColors[type],
                }}
              >
                {type}
              </span>
            )) || 'Unknown'
          }
        </div>
        {/* 大小 */}
        <div className='w-full flex flex-row justify-around items-start'>
          {/* 體重 */}
          <div className='w-32 flex flex-col items-center gap-2'>
            <p className='text-xl'>
              {characterDetail?.weight ? characterDetail.weight / 10 : 0} KG
            </p>
            <span className='text-sm opacity-50'>
              Weight
            </span>
          </div>
          {/* 身高 */}
          <div className='w-32 flex flex-col items-center gap-2'>
            <p className='text-xl'>
              {characterDetail?.height ? characterDetail.height / 10 : 0} M
            </p>
            <span className='text-sm opacity-50'>
              Height
            </span>
          </div>
        </div>
        {/* 數值 */}
        <h3 className='text-xl'>
          Base Stats
        </h3>
        <div className='w-full flex flex-col items-center gap-4'>
          {/* 生命值 */}
          <ProgressBar
            label='HP'
            value={characterDetail?.hp || 0}
            maxValue={255}
            progressColor='#D63843'
          />
          {/* 攻擊力 */}
          <ProgressBar
            label='ATK'
            value={characterDetail?.attack || 0}
            maxValue={190}
            progressColor='#FEA726'
          />
          {/* 防禦力 */}
          <ProgressBar
            label='DEF'
            value={characterDetail?.defense || 0}
            maxValue={250}
            progressColor='#0091EA'
          />
          {/* 速度 */}
          <ProgressBar
            label='SPD'
            value={characterDetail?.speed || 0}
            maxValue={200}
            progressColor='#8EB0C4'
          />
          {/* 經驗值 */}
          <ProgressBar
            label='EXP'
            value={characterDetail?.exp || 0}
            maxValue={635}
            progressColor='#388D3E'
          />
        </div>
      </div>
    </>
  );
}