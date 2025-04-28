interface ValueLabelProps {
  label: string;
  unit: string;
  value: number;
  isLoading?: boolean;
}


export default function CharacterValueLabel(props: ValueLabelProps) {


  if (props.isLoading) {
    return (
      <div className='w-32 flex flex-col items-center gap-2'>
        <div
          className='util-skeleton
          rounded h-7 w-14'
        ></div>
        <span className='text-sm opacity-50'>
          {props.label}
        </span>
      </div>
    );
  }


  return (
    <div className='w-32 flex flex-col items-center gap-2'>
      <p className='text-xl'>
        {props.value || 0} {props.unit}
      </p>
      <span className='text-sm opacity-50'>
        {props.label}
      </span>
    </div>
  );
}