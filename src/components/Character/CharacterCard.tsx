import { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { FaQuestion } from 'react-icons/fa';


export interface CharacterCardProps {
  name: string;
  thumbnail: string;
  textColor: string;
  backgroundColor: string;
  onClick: () => void;
}


export default function CharacterCard(props: CharacterCardProps) {
  const [isError, setIsError] = useState(false);


  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0,
    rootMargin: '100px 0px 100px 0px',
  });


  const imageOnError = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
    event.currentTarget.onerror = null;
    setIsError(true);
  }


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
            <div className='h-[calc(100%-2.5rem)] flex items-center justify-center'>
              {
                (props.thumbnail && !isError) ? (
                  <img
                    className='h-full w-auto object-contain pointer-events-none'
                    src={props.thumbnail}
                    alt={props.name || 'Unknown'}
                    onError={imageOnError}
                  />
                ) : (
                  <FaQuestion
                    className='w-1/2 h-1/2 text-white opacity-25'
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
              {props.name || 'Unknown'}
            </h3>
          </div>
        )
      }
    </div>
  );
}