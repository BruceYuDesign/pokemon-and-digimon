import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PageHeader from '~/components/PageHeader';
import ProgressBar from '~/components/ProgressBar';
import { usePokemonDetail } from '~/context/pokemonDetailContext';
import { getPokemon } from '~/services/pokemonService';
import { pokemonTypeColors } from '~/libs/theme';


export default function PokemonDetailPage() {
  const { pokemonDetail, setPokemonDetail } = usePokemonDetail();
  const { pokemonId } = useParams<{ pokemonId: string }>();


  useEffect(() => {
    // 捲動至頂部
    window.scrollTo(0, 0);

    // 第一次載入應用程式時，取得角色詳細資料
    const getAndSetPokemonDetail = async () => {
      const pokemonDetail = await getPokemon(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
      setPokemonDetail(pokemonDetail);
    }
    if (!pokemonDetail) {
      getAndSetPokemonDetail();
    }
  }, []);


  return (
    <>
      <PageHeader
        textColor='#FFFFFF'
        backgroundColor='transparent'
        prevPageUrl='/pokemon'
        prevPageName='Pokemon'
        pageName={`#${pokemonId?.padStart(4, '0')}`}
      />
      {/* 角色圖片 */}
      <div
        className='flex items-center justify-center h-[280px] rounded-b-4xl'
        style={{
          backgroundColor: pokemonDetail?.color || '#3A393B',
        }}
      >
        {
          pokemonDetail?.thumbnail && (
            <img
              className='h-2/3 w-auto'
              src={pokemonDetail?.thumbnail || ''}
              alt={pokemonDetail?.name || 'Unknown'}
            />
          )
        }
      </div>
      {/* 角色資訊 */}
      <div className='flex flex-col items-center gap-6 p-6'>
        {/* 名稱 */}
        <h1 className='text-3xl'>
          {pokemonDetail?.name || 'Unknown'}
        </h1>
        {/* 屬性 */}
        <div className='flex flex-row gap-4 flex-wrap'>
          {
            pokemonDetail?.types?.map(type => (
              <span
                key={type}
                className='px-3 min-w-28 h-6 flex items-center justify-center rounded-full'
                style={{
                  backgroundColor: pokemonTypeColors[type],
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
              {pokemonDetail?.weight ? pokemonDetail.weight / 10 : 0} KG
            </p>
            <span className='text-sm opacity-50'>
              Weight
            </span>
          </div>
          {/* 身高 */}
          <div className='w-32 flex flex-col items-center gap-2'>
            <p className='text-xl'>
              {pokemonDetail?.height ? pokemonDetail.height / 10 : 0} M
            </p>
            <span className='text-sm opacity-50'>
              Height
            </span>
          </div>
        </div>
        {/* 數值 */}
        <h2 className='text-xl'>
          Base Stats
        </h2>
        <div className='w-full flex flex-col items-center gap-4'>
          {/* 生命值 */}
          <ProgressBar
            label='HP'
            value={pokemonDetail?.hp || 0}
            maxValue={255}
            progressColor='#D63843'
          />
          {/* 攻擊力 */}
          <ProgressBar
            label='ATK'
            value={pokemonDetail?.attack || 0}
            maxValue={190}
            progressColor='#FEA726'
          />
          {/* 防禦力 */}
          <ProgressBar
            label='DEF'
            value={pokemonDetail?.defense || 0}
            maxValue={250}
            progressColor='#0091EA'
          />
          {/* 速度 */}
          <ProgressBar
            label='SPD'
            value={pokemonDetail?.speed || 0}
            maxValue={200}
            progressColor='#8EB0C4'
          />
          {/* 經驗值 */}
          <ProgressBar
            label='EXP'
            value={pokemonDetail?.exp || 0}
            maxValue={635}
            progressColor='#388D3E'
          />
        </div>
      </div>
    </>
  );
}