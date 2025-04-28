interface CharacterDescriptionProps {
  description?: string;
  isLoading?: boolean;
}


export default function CharacterDescription(props: CharacterDescriptionProps) {


  if (props.isLoading) {
    return (
      <div className='w-full flex flex-col gap-4.5'>
        <div
          className='util-skeleton
          rounded w-full h-4.5'
        ></div>
        <div
          className='util-skeleton
          rounded w-full h-4.5'
        ></div>
        <div
          className='util-skeleton
          rounded w-full h-4.5'
        ></div>
        <div
          className='util-skeleton
          rounded w-full h-4.5'
        ></div>
        <div
          className='util-skeleton
          rounded w-full h-4.5'
        ></div>
        <div
          className='util-skeleton
          rounded w-2/3 h-4.5'
        ></div>
      </div>
    );
  }


  return (
    <p className='text-lg leading-loose'>
      {props.description || 'No description available.'}
    </p>
  );
}