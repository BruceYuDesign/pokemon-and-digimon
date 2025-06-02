import { useState, useRef } from 'react';
import { FaQuestion } from 'react-icons/fa';
import { AiOutlineLoading } from 'react-icons/ai';


/**
 * 錯誤重試次數上限
 */
export const ERROR_RETRY_LIMIT = 3;


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
  // 圖片元素
  const imageRef = useRef<HTMLImageElement>(null);
  // 錯誤重試次數
  const retryCount = useRef(0);


  // 圖片讀取失敗
  const imageOnError = () => {
    if (!imageRef.current) return;
    if (retryCount.current < ERROR_RETRY_LIMIT && props.src) {
      retryCount.current++;
      imageRef.current.src = props.src + '?retry=' + retryCount.current;
    } else {
      setIsLoading(false);
      setIsFailed(true);
    }
  }


  // 圖片讀取成功
  const imageOnLoad = () => {
    setIsLoading(false);
  }


  // 使用者點擊重試
  const handleUserRetry = () => {
    if (!imageRef.current) return;
    retryCount.current = 0;
    setIsLoading(true);
    setIsFailed(false);
    imageRef.current.src = props.src || '';
  }


  // 圖片狀態
  const imageStateContent = () => {
    // 讀取失敗或是沒連結
    if (isFailed || !props.src) {
      return (
        <FaQuestion
          className='h-2/3 w-auto invert-25 opacity-25'
          onClick={handleUserRetry}
          data-testid='image-with-status-error'
        />
      );
    }
    // 讀取中
    else if (isLoading) {
      return (
        <AiOutlineLoading
          className='h-2/3 w-auto invert-25 opacity-25 animate-spin'
          style={{
            animationDuration: '3s',
          }}
          data-testid='image-with-status-load'
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
        ref={imageRef}
        className='h-full w-auto pointer-events-none'
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
        data-testid='image-with-status-img'
      />
      <div className='absolute top-0 right-0 bottom-0 left-0 w-full h-full flex items-center justify-center'>
        {imageStateContent()}
      </div>
    </div>
  );
}