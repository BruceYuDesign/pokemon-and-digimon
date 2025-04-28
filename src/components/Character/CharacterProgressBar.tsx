interface ProgressBarProps {
  label: string;
  value?: number;
  maxValue: number;
  progressColor: string;
  isLoading?: boolean;
}


export default function ProgressBar(props: ProgressBarProps) {


  if (props.isLoading) {
    return (
      <div className='w-full flex flex-row justify-start items-center'>
        <span className='w-12 opacity-50 text-sm'>
          {props.label}
        </span>
        <div
          className='util-skeleton
          w-full h-6 rounded-full'
        ></div>
      </div>
    );
  }


  return (
    <div className='w-full flex flex-row justify-start items-center'>
      {/* 標籤 */}
      <span className='w-12 opacity-50 text-sm'>
        {props.label}
      </span>
      <div className='relative flex flex-row justify-start items-stretch bg-white w-full h-6 rounded-full overflow-hidden'>
        {/* 進度條 白底 黑字 */}
        <div
          className='px-2 flex flex-row justify-start items-center rounded-full'
          style={{
            width: `${(props.value || 0) / props.maxValue * 100}%`,
          }}
        >
          <span className='ml-auto text-black text-sm'>
            {props.value || 0}/{props.maxValue}
          </span>
        </div>
        {/* 進度條 有色底 白字 */}
        <div
          className='absolute left-0 top-0 bottom-0 px-2 flex flex-row justify-start items-center rounded-full overflow-hidden'
          style={{
            width: `${(props.value || 0) / props.maxValue * 100}%`,
            backgroundColor: props.progressColor,
          }}
        >
          <span className='ml-auto text-sm'>
            {props.value || 0}/{props.maxValue}
          </span>
        </div>
      </div>
    </div>
  );
}