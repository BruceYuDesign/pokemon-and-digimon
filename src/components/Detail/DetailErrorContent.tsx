import ErrorRetryButton from '~/components/ErrorButton/ErrorRetryButton';
import ErrorRedirectButton from '~/components/ErrorButton/ErrorRedirectButton';


export interface DetailErrorContentProps {
  /**
   * 錯誤處理函式
   */
  errorHandler: () => void;
  /**
   * 錯誤按鈕類型
   */
  errorButtonType: 'retry' | 'redirect';
}


/**
 * 角色介紹：錯誤頁面
 * @function DetailErrorContent
 * @param {DetailErrorContentProps} props
 */
export default function DetailErrorContent(props: DetailErrorContentProps) {


  // 錯誤按鈕
  const errorButtons = {
    'retry': (
      <ErrorRetryButton
        retryHandler={props.errorHandler}
      />
    ),
    'redirect': (
      <ErrorRedirectButton
        redirectHandler={props.errorHandler}
      />
    ),
  }


  return (
    <div className='min-h-dvh w-full flex flex-col items-center justify-center'>
      {errorButtons[props.errorButtonType]}
    </div>
  );
}