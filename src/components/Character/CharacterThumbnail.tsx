import { useState } from 'react';
import { FaQuestion } from 'react-icons/fa';


interface CharacterThumbnailProps {
  image?: string;
  backgroundColor?: string;
  alt?: string;
}


export default function CharacterThumbnail(props: CharacterThumbnailProps) {
  const [isError, setIsError] = useState(false);


  const imageOnError = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
    event.currentTarget.onerror = null;
    setIsError(true);
  }


  return (
    <div
      className='flex items-center justify-center h-[280px] rounded-b-4xl'
      style={{
        backgroundColor: !isError
          ? props.backgroundColor
          : '#3A393B',
      }}
    >
      {
        (props.image && !isError) ? (
          <img
            className='h-2/3 w-auto'
            src={props.image}
            alt={props.alt || 'Unknown'}
            onError={imageOnError}
          />
        ) : (
          <FaQuestion
            className='w-1/2 h-1/2 text-white opacity-25'
          />
        )
      }
    </div>
  );
}