import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import PageHeader from '~/components/PageHeader';
import CharacterThumbnail from '~/components/Character/CharacterThumbnail';
import CharacterName from '~/components/Character/CharacterName';
import CharacterTypes from '~/components/Character/CharacterTypes';
import CharacterValueLabel from '~/components/Character/CharacterValueLabel';
import CharacterProgressBar from '~/components/Character/CharacterProgressBar';
import ErrorRetryButton from '~/components/ErrorRetryButton';
import { usePokemonDetail } from '~/context/pokemonDetailContext';
import { getPokemonById } from '~/services/pokemonService';
import { pokemonTypeColors } from '~/libs/theme';


export default function PokemonDetailPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const { pokemonDetail, setPokemonDetail } = usePokemonDetail();
  const { pokemonId } = useParams<{ pokemonId: string }>();


  const getAndSetPokemonDetail = useCallback(async () => {
    setIsLoading(true);
    try{
      const pokemonDetail = await getPokemonById(pokemonId as string);
      setPokemonDetail(pokemonDetail);
      setHasError(false);
    } catch {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  }, [pokemonId]);


  useEffect(() => {
    if (pokemonDetail) {
      setIsLoading(false);
    } else {
      getAndSetPokemonDetail();
    }
  }, []);


  const pageContent = () => (
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
        isLoading={isLoading}
      />
      {/* 角色資訊 */}
      <div className='flex flex-col items-center gap-6 p-6'>
        {/* 名稱 */}
        <CharacterName
          name={pokemonDetail?.name}
          isLoading={isLoading}
        />
        {/* 屬性 */}
        <CharacterTypes
          types={pokemonDetail?.types}
          typeColors={pokemonTypeColors}
          isLoading={isLoading}
        />
        {/* 大小 */}
        <div className='w-full flex flex-row justify-around items-start'>
          {/* 體重 */}
          <CharacterValueLabel
            label='Weight'
            unit='KG'
            value={pokemonDetail?.weight ? pokemonDetail.weight / 10 : 0}
            isLoading={isLoading}
          />
          {/* 身高 */}
          <CharacterValueLabel
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
          <CharacterProgressBar
            label='HP'
            value={pokemonDetail?.hp}
            maxValue={255}
            progressColor='#D63843'
            isLoading={isLoading}
          />
          {/* 攻擊力 */}
          <CharacterProgressBar
            label='ATK'
            value={pokemonDetail?.attack}
            maxValue={190}
            progressColor='#FEA726'
            isLoading={isLoading}
          />
          {/* 防禦力 */}
          <CharacterProgressBar
            label='DEF'
            value={pokemonDetail?.defense}
            maxValue={250}
            progressColor='#0091EA'
            isLoading={isLoading}
          />
          {/* 速度 */}
          <CharacterProgressBar
            label='SPD'
            value={pokemonDetail?.speed}
            maxValue={200}
            progressColor='#8EB0C4'
            isLoading={isLoading}
          />
          {/* 經驗值 */}
          <CharacterProgressBar
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


  const errorContent = () => (
    <div className='min-h-dvh w-dvw flex flex-col items-center justify-center'>
      <ErrorRetryButton
        retryHandler={getAndSetPokemonDetail}
      />
    </div>
  );


  return (
    <>
      <PageHeader
        textColor='#FFFFFF'
        backgroundColor='transparent'
        prevPageUrl='/pokemon'
        prevPageName='Pokemon'
        pageName={`#${pokemonId?.padStart(5, '0')}`}
      />
      {
        (!isLoading && hasError)
          ? errorContent()
          : pageContent()
      }
    </>
  );
}