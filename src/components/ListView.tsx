import { useRef, useEffect } from 'react';
import { BiLoader } from 'react-icons/bi';
import ErrorRetryButton from '~/components/ErrorButton/ErrorRetryButton';
import OfflineMessage from '~/components/OfflineMessage';
import CharacterCardsSkeleton from '~/components/CharacterCardsSkeleton';


interface ListViewProps {
  /**
   * 子元素
   */
  children?: React.ReactNode;
  /**
   * 下一頁的處理函式
   */
  nextPageHandler: () => void;
  /**
   * 是否讀取中
   */
  isFetching: boolean;
  /**
   * 是否有錯誤
   */
  isError: boolean;
  /**
   * 是否暫停請求（普遍為網路斷線）
   */
  isPaused: boolean;
  /**
   * 是否還有下一頁
   */
  hasNextPage: boolean;
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
      if (isIntersecting && !props.isFetching && !props.isError && props.hasNextPage) {
        props.nextPageHandler();
      }
    }, { threshold: 0.5 });

    if (nextPageElement.current) {
      observer.observe(nextPageElement.current);
    }

    return () => observer.disconnect();
  }, [props.isFetching, props.isError]);


  return (
    <>
      {/* 清單 */}
      <div
        className='mt-header p-4 grid grid-cols-2 gap-4 auto-rows-max
        md:grid-cols-3'
      >
        {
          props.children || (
            // 讀取骨架，若沒有錯誤且沒有暫停請求
            (props.isFetching && !props.isError && !props.isPaused) && (
              <CharacterCardsSkeleton/>
            )
          )
        }
      </div>
      {/* 下一頁容器 */}
      <div
        className='min-h-20 flex items-center justify-center'
        ref={nextPageElement}
      >
        {/* 讀取中 */}
        {
          props.isFetching && (
            <BiLoader
              className='w-8 h-8 mx-auto opacity-50 animate-spin'
            />
          )
        }
        {/* 錯誤重試，並且非暫停狀態 */}
        {
          (props.isError && !props.isPaused) && (
            <ErrorRetryButton
              retryHandler={props.nextPageHandler}
            />
          )
        }
        {/* 網路斷線 */}
        {
          props.isPaused && (
            <OfflineMessage/>
          )
        }
      </div>
    </>
  );
}