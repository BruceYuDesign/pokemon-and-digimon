import { useRef, useEffect } from 'react';
import { BiLoader } from 'react-icons/bi';
import ErrorRetryButton from '~/components/ErrorRetryButton';


interface ListViewProps {
  /**
   * 子元素
   */
  children: React.ReactNode;
  /**
   * 下一頁的處理函式
   */
  nextPageHandler: () => void;
  /**
   * 是否讀取中
   */
  isLoading: boolean;
  /**
   * 是否有錯誤
   */
  hasError: boolean;
}


/**
 * 清單視圖
 * @function CharacterCard
 * @param {CharacterCardProps} props
 */
export default function ListView(props: ListViewProps) {
  // 下一頁的元素
  const nextPageElement = useRef<HTMLDivElement>(null);


  // 監聽是否滾動到下一頁的元素
  useEffect(() => {
    const observer = new IntersectionObserver(([{ isIntersecting }]) => {
      if (isIntersecting && !props.isLoading && !props.hasError) {
        props.nextPageHandler();
      }
    }, { threshold: 0.5 });

    if (nextPageElement.current) {
      observer.observe(nextPageElement.current);
    }

    return () => observer.disconnect();
  }, [props.isLoading, props.hasError]);


  return (
    <>
      {/* 清單 */}
      <div
        className='mt-header p-4 grid grid-cols-2 gap-4 auto-rows-max
        md:grid-cols-3'
      >
        {props.children}
      </div>
      {/* 下一頁容器 */}
      <div
        className='h-20 flex items-center justify-center'
        ref={nextPageElement}
      >
        {/* 讀取中 */}
        {
          props.isLoading && (
            <BiLoader
              className='w-8 h-8 mx-auto opacity-50 animate-spin'
            />
          )
        }
        {/* 錯誤重試 */}
        {
          (props.hasError && !props.isLoading) && (
            <ErrorRetryButton
              retryHandler={props.nextPageHandler}
            />
          )
        }
      </div>
    </>
  );
}