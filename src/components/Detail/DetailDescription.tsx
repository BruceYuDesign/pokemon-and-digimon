interface DetailDescriptionProps {
  /**
   * 角色的描述文字
   */
  description?: string;
  /**
   * 是否讀取中，如果是則顯示讀取骨架
   */
  isLoading?: boolean;
}


/**
 * 角色介紹：描述
 * @function DetailDescription
 * @param {DetailDescriptionProps} props
 */
export default function DetailDescription(props: DetailDescriptionProps) {


  // 讀取骨架
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