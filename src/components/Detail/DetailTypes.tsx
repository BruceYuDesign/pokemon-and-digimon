interface DetailTypesProps {
  types?: Array<string>;
  typeColors: Record<string, string>;
  isLoading?: boolean;
}


export default function DetailTypes(props: DetailTypesProps) {


  if (props.isLoading) {
    return (
      <div
        className='util-skeleton
        h-6 w-28 rounded-full'
      ></div>
    );
  }


  return (
    <div className='flex flex-row gap-4 flex-wrap'>
      {
        (props.types && props.types.length > 0) ? (
          props.types.map(type => (
            <span
              key={type}
              className='px-3 min-w-28 h-6 flex items-center justify-center rounded-full'
              style={{
                backgroundColor: props.typeColors[type] || 'var(--color-background-alt)',
              }}
            >
              {type}
            </span>
          )
        )) : (
          <span className='px-3 min-w-28 h-6 flex items-center justify-center rounded-full bg-background-alt'>
            Unknown
          </span>
        )
      }
    </div>
  );
}