import { VscDebugRestart } from 'react-icons/vsc';


interface ErrorRetryButtonProps {
  /**
   * 錯誤重試函式
   */
  retryHandler: () => void;
}


/**
 * 錯誤重試按鈕
 * @function ErrorRetryButton
 * @param {ErrorRetryButtonProps} props
 */
export default function ErrorRetryButton(props: ErrorRetryButtonProps) {
  return (
    <button
      className='flex flex-row items-center gap-2 px-6 py-1.5 rounded-full bg-foreground text-background cursor-pointer'
      onClick={props.retryHandler}
      type='button'
      data-testid='error-retry-button'
    >
      <VscDebugRestart
        className='w-5 h-5'
      />
      Retry
    </button>
  );
}