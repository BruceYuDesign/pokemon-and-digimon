import { useState } from 'react';
import { FaQuestion } from 'react-icons/fa';


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
  // 是否有錯誤
  const [hasError, setHasError] = useState(false);


  // 圖片讀取失敗
  const imageOnError = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
    event.currentTarget.onerror = null;
    setHasError(true);
  }


  // 讀取骨架
  if (props.isLoading) {
    return (
      <div
        className='util-skeleton
        h-[280px] rounded-b-4xl'
      ></div>
    );
  }


  return (
    <div
      className='flex items-center justify-center h-[280px] rounded-b-4xl'
      style={{
        backgroundColor: !hasError
          ? props.backgroundColor
          : 'var(--color-background-alt)',
      }}
    >
      {
        (props.image && !hasError) ? (
          // 顯示角色圖片
          <img
            className='h-2/3 w-auto pointer-events-none'
            src={props.image}
            alt={props.alt || 'Unknown'}
            onError={imageOnError}
          />
        ) : (
          // 顯示問號
          <FaQuestion
            className='w-1/2 h-1/2 text-foreground opacity-25'
          />
        )
      }
    </div>
  );
}