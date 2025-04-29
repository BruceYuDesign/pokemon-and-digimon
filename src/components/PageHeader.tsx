import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa6';


interface PageHeaderProps {
  textColor: string;
  backgroundColor: string;
  prevPageUrl: string;
  prevPageName: string;
  pageName: string;
}


export default function PageHeader(props: PageHeaderProps) {
  return (
    <header
      className='fixed top-0 right-0 left-0 z-10'
    >
      <div
        className='util-container
        h-12 px-4 flex flex-row items-center justify-between
        lg:rounded-b-2xl'
        style={{
          color: props.textColor,
          backgroundColor: props.backgroundColor,
        }}
      >
        <Link
          className='flex flex-row items-center gap-4 text-lg'
          to={props.prevPageUrl}
          viewTransition
        >
          <FaArrowLeft />
          {props.prevPageName}
        </Link>
        <p className='text-lg'>
          {props.pageName}
        </p>
      </div>
    </header>
  );
}