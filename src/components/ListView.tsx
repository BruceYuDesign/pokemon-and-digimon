import { useRef, useEffect } from 'react';
import { BiLoader } from 'react-icons/bi';


interface ListViewProps {
  children: React.ReactNode;
  nextPageHandler: () => void;
}


export default function ListView(props: ListViewProps) {
  const nextPageElement = useRef<HTMLDivElement>(null);


  useEffect(() => {
    if (!nextPageElement.current) return;

    const observer = new IntersectionObserver(([{ isIntersecting }]) => {
      if (!isIntersecting) return;
      props.nextPageHandler();
    }, { threshold: 0.5 });

    observer.observe(nextPageElement.current);

    return () => observer.disconnect();
  }, []);


  // TODO 在入完不要顯示 Spinner
  return (
    <>
      <div
        className='p-4 grid grid-cols-2 gap-4 auto-rows-max
        md:grid-cols-3'
      >
        {props.children}
      </div>
      <div
        className='h-16 flex items-center justify-center'
        ref={nextPageElement}
      >
        <BiLoader
          className='w-8 h-8 mx-auto opacity-50 animate-spin'
        />
      </div>
    </>
  );
}