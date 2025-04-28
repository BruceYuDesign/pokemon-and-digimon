import { useRef, useEffect } from 'react';
import { BiLoader } from 'react-icons/bi';
import ErrorRetryButton from '~/components/ErrorRetryButton';


interface ListViewProps {
  children: React.ReactNode;
  nextPageHandler: () => void;
  isLoading: boolean;
  hasError: boolean;
}


export default function ListView(props: ListViewProps) {
  const nextPageElement = useRef<HTMLDivElement>(null);


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
      <div
        className='p-4 grid grid-cols-2 gap-4 auto-rows-max
        md:grid-cols-3'
      >
        {props.children}
      </div>
      <div
        className='h-20 flex items-center justify-center'
        ref={nextPageElement}
      >
        {
          props.isLoading && (
            <BiLoader
              className='w-8 h-8 mx-auto opacity-50 animate-spin'
            />
          )
        }
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