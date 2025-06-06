import { FaArrowLeft } from 'react-icons/fa6';


interface ErrorRedirectButtonProps {
  /**
   * 錯誤重定向函式
   */
  redirectHandler: () => void;
}


/**
 * 錯誤重定向按鈕
 * @function ErrorRedirectButton
 * @param {ErrorRedirectButtonProps} props
 */
export default function ErrorRedirectButton(props: ErrorRedirectButtonProps) {
  return (
    <button
      className='flex flex-row items-center gap-2 px-6 py-1.5 rounded-full bg-foreground text-background cursor-pointer'
      onClick={props.redirectHandler}
      type='button'
      data-testid='error-redirect-button'
    >
      <FaArrowLeft
        className='w-5 h-5'
      />
      Redirect
    </button>
  );
}