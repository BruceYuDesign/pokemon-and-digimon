import { useRef, useEffect } from 'react';


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


  return (
    <>
      <div className='grid grid-cols-2 gap-4 auto-rows-max'>
        {props.children}
      </div>
      <div ref={nextPageElement}></div>
    </>
  );
}