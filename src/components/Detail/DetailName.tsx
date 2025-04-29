interface DetailNameProps {
  isLoading?: boolean;
  name?: string;
}


export default function DetailName(props: DetailNameProps) {


  if (props.isLoading) {
    return (
      <div
        className='util-skeleton
        rounded w-32 h-9'
      ></div>
    );
  }


  return (
    <h1 className='text-3xl text-center'>
      {props.name || 'Unknown'}
    </h1>
  );
}