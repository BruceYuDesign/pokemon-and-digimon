import type { CharacterDetail } from '~/context/CharacterDetailContext';
import { Link } from 'react-router-dom';
import { useCharacterDetail } from '~/context/CharacterDetailContext';


type CharacterCardProps = CharacterDetail;


export default function CharacterCard(props: CharacterCardProps) {
  const { setCharacterDetail } = useCharacterDetail();


  const handleOnClick = () => {
    setCharacterDetail(props);
  }


  return (
    <Link
      className='flex flex-col gap-4 p-4 aspect-square rounded-2xl overflow-hidden'
      onClick={handleOnClick}
      to={`/pokemon/${props.id}`}
      style={{
        backgroundColor: props.color,
      }}
    >
      <div className='h-3/4 flex items-center justify-center'>
        {
          props.thumbnail && (
            <img
              className='h-full aspect-square'
              src={props.thumbnail}
              alt={props.name || '未知'}
            />
          )
        }
      </div>
      <h3 className='text-center text-white text-xl whitespace-nowrap text-ellipsis overflow-hidden'>
        {props.name || '未知'}
      </h3>
    </Link>
  );
}