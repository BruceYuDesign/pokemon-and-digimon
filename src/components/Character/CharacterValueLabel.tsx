interface ValueLabelProps {
  label: string;
  unit: string;
  value: number;
}


export default function CharacterValueLabel(props: ValueLabelProps) {
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