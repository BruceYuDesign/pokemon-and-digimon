interface DetailTypesProps {
  /**
   * 角色的屬性
   */
  types?: Array<string>;
  /**
   * 屬性的顏色對照表
   */
  typeColors: Record<string, string>;
  /**
   * 是否讀取中，如果是則顯示讀取骨架
   */
  isLoading?: boolean;
}


/**
 * 角色介紹：屬性
 * @function DetailTypes
 * @param {DetailTypesProps} props
 */
export default function DetailTypes(props: DetailTypesProps) {


  // 讀取骨架
  if (props.isLoading) {
    return (
      <div
        className='util-skeleton
        h-6 w-28 rounded-full'
        data-testid='detail-types-skeleton'
      ></div>
    );
  }


  return (
    <div
      className='flex flex-row items-center justify-center gap-4 flex-wrap'
      data-testid='detail-types-container'
    >
      {
        (props.types && props.types.length > 0) ? (
          // 含對應屬性
          props.types.map(type => (
            <span
              key={type}
              className='px-3 min-w-28 h-6 flex items-center justify-center rounded-full'
              style={{
                backgroundColor: props.typeColors[type] || 'var(--color-background-alt)',
              }}
              data-testid='detail-types-item'
            >
              {type}
            </span>
          )
        )) : (
          // 未知屬性
          <span
            className='px-3 min-w-28 h-6 flex items-center justify-center rounded-full bg-background-alt'
            data-testid='detail-types-unknown'
          >
            Unknown
          </span>
        )
      }
    </div>
  );
}