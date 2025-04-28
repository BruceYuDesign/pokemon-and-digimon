interface CharacterTypesProps {
  types?: Array<string>;
  typeColors: Record<string, string>;
}


export default function CharacterTypes(props: CharacterTypesProps) {
  return (
    <div className='flex flex-row gap-4 flex-wrap'>
      {
        (props.types && props.types.length > 0) ? (
          props.types.map(type => (
            <span
              key={type}
              className='px-3 min-w-28 h-6 flex items-center justify-center rounded-full'
              style={{
                backgroundColor: props.typeColors[type] || '#3A393B',
              }}
            >
              {type}
            </span>
          )
        )) : (
          <span
            className='px-3 min-w-28 h-6 flex items-center justify-center rounded-full'
            style={{
              backgroundColor: '#3A393B',
            }}
          >
            Unknown
          </span>
        )
      }
    </div>
  );
}