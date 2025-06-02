import ImageWithStatus from '~/components/ImageWithStatus';


interface DetailThumbnailProps {
  /**
   * 角色的圖片
   */
  image?: string;
  /**
   * 背景色
   */
  backgroundColor?: string;
  /**
   * 角色圖片的替代文字
   */
  alt?: string;
  /**
   * 是否讀取中，如果是則顯示讀取骨架
   */
  isLoading?: boolean;
}


/**
 * 角色介紹：圖片
 * @function DetailThumbnail
 * @param {DetailThumbnailProps} props
 */
export default function DetailThumbnail(props: DetailThumbnailProps) {
  // 讀取骨架
  if (props.isLoading) {
    return (
      <div
        className='util-skeleton
        h-[280px] rounded-b-4xl'
        data-testid='detail-thumbnail-skeleton'
      ></div>
    );
  }


  return (
    <div
      className='flex items-center justify-center h-[280px] rounded-b-4xl'
      style={{
        backgroundColor: props.backgroundColor,
      }}
      data-testid='detail-thumbnail-container'
    >
      <ImageWithStatus
        className='h-3/5'
        src={props.image}
        alt={props.alt}
      />
    </div>
  );
}