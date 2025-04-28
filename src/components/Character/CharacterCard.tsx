import { useInView } from 'react-intersection-observer';


export interface CharacterCardProps {
  name: string;
  thumbnail: string;
  textColor: string;
  backgroundColor: string;
  onClick: () => void;
}


export default function CharacterCard(props: CharacterCardProps) {
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0,
    rootMargin: '100px 0px 100px 0px',
  });


  return (
    <div
      className='aspect-square'
      ref={ref}
    >
      {
        inView && (
          <div
            className='flex flex-col items-stretch justify-between p-4 aspect-square rounded-2xl overflow-hidden cursor-pointer'
            onClick={props.onClick}
            style={{
              backgroundColor: props.backgroundColor,
            }}
          >
            <div className='h-3/4 flex items-center justify-center'>
              {
                props.thumbnail && (
                  <img
                    className='h-full object-contain'
                    src={props.thumbnail}
                    alt={props.name || '未知'}
                  />
                )
              }
            </div>
            <h3
              className='h-8 shrink-0 text-center text-xl whitespace-nowrap text-ellipsis overflow-hidden'
              style={{
                color: props.textColor,
              }}
            >
              {props.name || '未知'}
            </h3>
          </div>
        )
      }
    </div>
  );
}