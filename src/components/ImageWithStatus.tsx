import { useState, useRef } from 'react';
import { FaQuestion } from 'react-icons/fa';
import { AiOutlineLoading } from "react-icons/ai";


/**
 * 錯誤重試次數上限
 */
const ERROR_RETRY_LIMIT = 3;


interface ImageWithStatusProps {
  /**
   * 圖片連結
   */
  src?: string;
  /**
   * class 名稱
   */
  className?: string;
  /**
   * 圖片的替代文字
   */
  alt?: string;
  /**
   * 圖片的寬度
   */
  width?: number;
  /**
   * 圖片的高度
   */
  height?: number;
}


/**
 * 含讀取畫面與錯誤處理的圖片
 * @function ImageWithStatus
 * @param {ImageWithStatusProps} props
 */
export default function ImageWithStatus(props: ImageWithStatusProps) {
  // 是否讀取中
  const [isLoading, setIsLoading] = useState(true);
  // 是否讀取失敗
  const [isFailed, setIsFailed] = useState(false);
  // 錯誤重試次數
  const retryCount = useRef(0);


  // 圖片讀取失敗
  const imageOnError = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
    if (retryCount.current < ERROR_RETRY_LIMIT && props.src) {
      retryCount.current++;
      event.currentTarget.src = props.src + '?retry=' + retryCount.current;
    } else {
      setIsLoading(false);
      setIsFailed(true);
    }
  }


  // 圖片讀取成功
  const imageOnLoad = () => {
    setIsLoading(false);
  }


  // 圖片狀態
  const imageStateContent = () => {
    // 讀取失敗或是沒連結
    if (isFailed || !props.src) {
      return (
        <FaQuestion
          className='w-2/3 h-2/3 invert-25 opacity-25'
        />
      );
    }
    // 讀取中
    if (isLoading) {
      return (
        <AiOutlineLoading
          className='w-2/3 h-2/3 invert-25 opacity-25 animate-spin'
          style={{
            animationDuration: '3s',
          }}
        />
      );
    }
  }


  return (
    <div
      className={
        'relative flex items-center justify-center ' +
        props.className
      }
    >
      <img
        className='h-full w-auto'
        style={{
          opacity: isLoading || isFailed || !props.src ? 0 : 1,
        }}
        src={props.src}
        alt={props.alt || 'Unknown'}
        width={props.width}
        height={props.height}
        loading='lazy'
        decoding='async'
        onError={imageOnError}
        onLoad={imageOnLoad}
      />
      <div className='absolute top-0 right-0 bottom-0 left-0 w-full h-full flex items-center justify-center'>
        {imageStateContent()}
      </div>
    </div>
  );
}