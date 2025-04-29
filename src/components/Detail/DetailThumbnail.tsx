import { useState } from 'react';
import { FaQuestion } from 'react-icons/fa';


interface DetailThumbnailProps {
  isLoading?: boolean;
  image?: string;
  backgroundColor?: string;
  alt?: string;
}


export default function DetailThumbnail(props: DetailThumbnailProps) {
  const [isError, setIsError] = useState(false);


  const imageOnError = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
    event.currentTarget.onerror = null;
    setIsError(true);
  }


  if (props.isLoading) {
    return (
      <div
        className='util-skeleton
        h-[280px] rounded-b-4xl'
      ></div>
    );
  }


  return (
    <div
      className='flex items-center justify-center h-[280px] rounded-b-4xl'
      style={{
        backgroundColor: !isError
          ? props.backgroundColor
          : 'var(--color-background-alt)',
      }}
    >
      {
        (props.image && !isError) ? (
          <img
            className='h-2/3 w-auto pointer-events-none'
            src={props.image}
            alt={props.alt || 'Unknown'}
            onError={imageOnError}
          />
        ) : (
          <FaQuestion
            className='w-1/2 h-1/2 text-foreground opacity-25'
          />
        )
      }
    </div>
  );
}