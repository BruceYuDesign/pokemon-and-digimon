interface DetailValueLabelProps {
  /**
   * 標籤文字
   */
  label: string;
  /**
   * 數值單位
   */
  unit: string;
  /**
   * 數值
   */
  value?: number;
  /**
   * 是否讀取中，如果是則顯示讀取骨架
   */
  isLoading?: boolean;
}


/**
 * 角色介紹：數值標籤
 * @function DetailValueLabel
 * @param {DetailValueLabelProps} props
 */
export default function DetailValueLabel(props: DetailValueLabelProps) {
  return (
    <div className='w-32 flex flex-col items-center gap-2'>
      {
        props.isLoading
          // 讀取骨架
          ? (
            <div
              className='util-skeleton
              rounded h-7 w-14'
              data-testid='detail-value-label-skeleton'
            ></div>
          )
          // 顯示數值
          : (
            <p
              className='text-xl'
              data-testid='detail-value-label-text'
            >
              {props.value || 0} {props.unit}
            </p>
          )
      }
      <span
        className='text-sm opacity-50'
        data-testid='detail-value-label-description'
      >
        {props.label}
      </span>
    </div>
  );
}