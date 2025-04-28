import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PageHeader from '~/components/PageHeader';
import CharacterThumbnail from '~/components/Character/CharacterThumbnail';
import CharacterName from '~/components/Character/CharacterName';
import CharacterTypes from '~/components/Character/CharacterTypes';
import CharacterValueLabel from '~/components/Character/CharacterValueLabel';
import CharacterProgressBar from '~/components/Character/CharacterProgressBar';
import { usePokemonDetail } from '~/context/pokemonDetailContext';
import { getPokemon } from '~/services/pokemonService';
import { pokemonTypeColors } from '~/libs/theme';


export default function PokemonDetailPage() {
  const { pokemonDetail, setPokemonDetail } = usePokemonDetail();
  const { pokemonId } = useParams<{ pokemonId: string }>();


  useEffect(() => {
    // 第一次載入應用程式時，取得角色詳細資料
    const getAndSetPokemonDetail = async () => {
      const pokemonDetail = await getPokemon(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
      setPokemonDetail(pokemonDetail);
    }
    if (!pokemonDetail) {
      getAndSetPokemonDetail();
    }

    // 捲動至頂部
    window.scrollTo(0, 0);
  }, []);


  return (
    <>
      <PageHeader
        textColor='#FFFFFF'
        backgroundColor='transparent'
        prevPageUrl='/pokemon'
        prevPageName='Pokemon'
        pageName={`#${pokemonId?.padStart(5, '0')}`}
      />
      {/* 角色圖片 */}
      <CharacterThumbnail
        image={pokemonDetail?.thumbnail}
        backgroundColor={pokemonDetail?.color}
        alt={pokemonDetail?.name}
      />
      {/* 角色資訊 */}
      <div className='flex flex-col items-center gap-6 p-6'>
        {/* 名稱 */}
        <CharacterName
          name={pokemonDetail?.name}
        />
        {/* 屬性 */}
        <CharacterTypes
          types={pokemonDetail?.types}
          typeColors={pokemonTypeColors}
        />
        {/* 大小 */}
        <div className='w-full flex flex-row justify-around items-start'>
          {/* 體重 */}
          <CharacterValueLabel
            label='Weight'
            unit='KG'
            value={pokemonDetail?.weight ? pokemonDetail.weight / 10 : 0}
          />
          {/* 身高 */}
          <CharacterValueLabel
            label='Height'
            unit='M'
            value={pokemonDetail?.height ? pokemonDetail.height / 10 : 0}
          />
        </div>
        {/* 數值 */}
        <h2 className='text-xl'>
          Base Stats
        </h2>
        <div className='w-full flex flex-col items-center gap-4'>
          {/* 生命值 */}
          <CharacterProgressBar
            label='HP'
            value={pokemonDetail?.hp}
            maxValue={255}
            progressColor='#D63843'
          />
          {/* 攻擊力 */}
          <CharacterProgressBar
            label='ATK'
            value={pokemonDetail?.attack}
            maxValue={190}
            progressColor='#FEA726'
          />
          {/* 防禦力 */}
          <CharacterProgressBar
            label='DEF'
            value={pokemonDetail?.defense}
            maxValue={250}
            progressColor='#0091EA'
          />
          {/* 速度 */}
          <CharacterProgressBar
            label='SPD'
            value={pokemonDetail?.speed}
            maxValue={200}
            progressColor='#8EB0C4'
          />
          {/* 經驗值 */}
          <CharacterProgressBar
            label='EXP'
            value={pokemonDetail?.exp}
            maxValue={635}
            progressColor='#388D3E'
          />
        </div>
      </div>
    </>
  );
}