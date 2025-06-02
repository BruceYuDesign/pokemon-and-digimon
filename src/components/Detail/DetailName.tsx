interface DetailNameProps {
  /**
   * 角色的名字
   */
  name?: string;
  /**
   * 是否讀取中，如果是則顯示讀取骨架
   */
  isLoading?: boolean;
}


/**
 * 角色介紹：名字
 * @function DetailName
 * @param {DetailNameProps} props
 */
export default function DetailName(props: DetailNameProps) {


  // 讀取骨架
  if (props.isLoading) {
    return (
      <div
        className='util-skeleton
        rounded w-32 h-9'
        data-testid='detail-name-skeleton'
      ></div>
    );
  }


  return (
    <h1
      className='text-3xl text-center'
      data-testid='detail-name-text'
    >
      {props.name || 'Unknown'}
    </h1>
  );
}