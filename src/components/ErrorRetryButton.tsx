import { VscDebugRestart } from 'react-icons/vsc';


interface ErrorRetryButtonProps {
  retryHandler: () => void;
}


export default function ErrorRetryButton(props: ErrorRetryButtonProps) {
  return (
    <button
      className='flex flex-row items-center gap-2 px-6 py-1.5 rounded-full bg-white text-black'
      onClick={props.retryHandler}
      type='button'
    >
      <VscDebugRestart
        className='w-5 h-5'
      />
      Retry
    </button>
  );
}