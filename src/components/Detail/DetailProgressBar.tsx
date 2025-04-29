interface DetailProgressBarProps {
  /**
   * 能力條的標籤文字
   */
  label: string;
  /**
   * 能力條的數值
   */
  value?: number;
  /**
   * 能力條的最大值
   */
  maxValue: number;
  /**
   * 能力條顏色
   */
  progressColor: string;
  /**
   * 是否讀取中，如果是則顯示讀取骨架
   */
  isLoading?: boolean;
}


/**
 * 角色介紹：能力條
 * @function DetailProgressBar
 * @param {DetailProgressBarProps} props
 */
export default function DetailProgressBar(props: DetailProgressBarProps) {


  // 讀取骨架
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
      <div className='relative flex flex-row justify-start items-stretch bg-foreground w-full h-6 rounded-full overflow-hidden'>
        {/* 進度條 白底 黑字 */}
        <div
          className='px-2 flex flex-row justify-start items-center rounded-full'
          style={{
            width: `${(props.value || 0) / props.maxValue * 100}%`,
          }}
        >
          <span className='ml-auto text-background text-sm'>
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