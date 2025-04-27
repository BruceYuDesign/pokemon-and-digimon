import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa6';
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
    <div className='relative flex flex-col items-stretch justify-stretch w-full h-full'>
      <header
        className='h-12 px-4 absolute top-0 right-0 left-0 flex flex-row items-center justify-between'
      >
        <Link
          className='flex flex-row items-center gap-4 text-white text-lg'
          to='/pokemon'
        >
          <FaArrowLeft />
          Pokemon
        </Link>
        <span className='text-white text-lg'>
          #{pokemonId?.padStart(4, '0')}
        </span>
      </header>
      {/* 角色圖片 */}
      <div
        className='flex items-center justify-center h-[280px] rounded-b-4xl'
        style={{
          backgroundColor: characterDetail?.color || '#888888',
        }}
      >
        {
          characterDetail?.thumbnail && (
            <img
              className='h-2/3 w-auto'
              src={characterDetail?.thumbnail || ''}
              alt={characterDetail?.name || '未知'}
            />
          )
        }
      </div>
      {/* 角色資訊 */}
      <div className='flex flex-col items-center gap-6 p-6'>
        {/* 名稱 */}
        <h2 className='text-white text-3xl'>
          {characterDetail?.name || '未知'}
        </h2>
        {/* 屬性 */}
        <div className='flex flex-row gap-4'>
          {
            characterDetail?.types?.map(type => (
              <span
                key={type}
                className='w-28 h-6 flex items-center justify-center text-white rounded-full'
                style={{
                  backgroundColor: typeColors[type],
                }}
              >
                {type}
              </span>
            )) || '未知'
          }
        </div>
        {/* 大小 */}
        <div className='w-full flex flex-row justify-around items-start'>
          {/* 體重 */}
          <div className='w-32 flex flex-col items-center gap-2'>
            <p className='text-white text-xl'>
              {characterDetail?.weight ? characterDetail.weight / 10 : '未知'} KG
            </p>
            <span className='text-white/50 text-sm'>
              Weight
            </span>
          </div>
          {/* 身高 */}
          <div className='w-32 flex flex-col items-center gap-2'>
            <p className='text-white text-xl'>
              {characterDetail?.height ? characterDetail.height / 10 : '未知'} M
            </p>
            <span className='text-white/50 text-sm'>
              Height
            </span>
          </div>
        </div>
        {/* 數值 */}
        <h3 className='text-white text-xl'>
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
    </div>
  );
}