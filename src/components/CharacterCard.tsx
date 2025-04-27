import type { CharacterDetail } from '~/context/CharacterDetailContext';
import { Link } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import { useCharacterDetail } from '~/context/CharacterDetailContext';


type CharacterCardProps = CharacterDetail;


export default function CharacterCard(props: CharacterCardProps) {
  const { setCharacterDetail } = useCharacterDetail();
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0,
    rootMargin: '100px 0px 100px 0px',
  });


  const handleOnClick = () => {
    setCharacterDetail(props);
  }


  return (
    <div
      className='aspect-square'
      ref={ref}
    >
      {
        inView && (
          <Link
            className='flex flex-col items-stretch justify-between p-4 aspect-square rounded-2xl overflow-hidden'
            onClick={handleOnClick}
            to={`/pokemon/${props.id}`}
            style={{
              backgroundColor: props.color,
            }}
            viewTransition
          >
            <div className='h-3/4 flex items-center justify-center'>
              {
                props.thumbnail && (
                  <img
                    className='h-full w-full object-contain'
                    src={props.thumbnail}
                    alt={props.name || '未知'}
                  />
                )
              }
            </div>
            <h3 className='h-8 shrink-0 text-center text-xl whitespace-nowrap text-ellipsis overflow-hidden'>
              {props.name || '未知'}
            </h3>
          </Link>
        )
      }
    </div>
  );
}