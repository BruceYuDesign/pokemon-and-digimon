import ErrorRetryButton from '~/components/ErrorRetryButton';


interface DetailErrorContentProps {
  /**
   * 錯誤重試函式
   */
  retryHandler: () => void;
}


/**
 * 角色介紹：讀取錯誤
 * @function DetailErrorContent
 * @param {DetailErrorContentProps} props
 */
export default function DetailErrorContent(props: DetailErrorContentProps) {
  return (
    <div className='min-h-dvh w-dvw flex flex-col items-center justify-center'>
      <ErrorRetryButton
        retryHandler={props.retryHandler}
      />
    </div>
  );
}