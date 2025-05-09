import { AxiosError } from 'axios';
import ErrorRetryButton from '~/components/ErrorRetryButton';
import ErrorRedirectButton from '~/components/ErrorRedirectButton';


interface DetailErrorContentProps {
  /**
   * 錯誤重試函式
   */
  retryHandler: () => void;
  /**
   * 錯誤重定向函式
   */
  redirectHandler: () => void;
  /**
   * 錯誤物件
   */
  error: Error | AxiosError;
}


interface ErrorList {
  [key: number]: React.ReactNode;
}


/**
 * 角色介紹：錯誤頁面
 * @function DetailErrorContent
 * @param {DetailErrorContentProps} props
 */
export default function DetailErrorContent(props: DetailErrorContentProps) {
  // 錯誤清單
  const errorList: ErrorList = {
    404: (
      <ErrorRedirectButton
        redirectHandler={props.redirectHandler}
      />
    ),
  }


  // 錯誤狀態碼
  const statusCode: number | undefined = props.error instanceof AxiosError
    ? (props.error.status || 500)
    : 500;


  // 錯誤內容
  const errorContent = errorList[statusCode] || (
    <ErrorRetryButton
      retryHandler={props.retryHandler}
    />
  );


  return (
    <div className='min-h-dvh w-dvw flex flex-col items-center justify-center'>
      {errorContent}
    </div>
  );
}