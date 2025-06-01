import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa6';


export interface PageHeaderProps {
  /**
   * 文字顏色
   */
  textColor: string;
  /**
   * 背景顏色
   */
  backgroundColor: string;
  /**
   * 當前頁面名稱
   */
  pageName: string;
  /**
   * 上一頁名稱
   */
  prevPageName: string;
  /**
   * 上一頁網址
   */
  prevPageUrl: string;
}


/**
 * 頁面頁首
 * @function PageHeader
 * @param {PageHeaderProps} props
 */
export default function PageHeader(props: PageHeaderProps) {
  return (
    <header
      className='fixed top-0 right-0 left-0 z-10'
      data-testid='page-header'
    >
      <div
        className='util-container
        h-header px-4 flex flex-row items-center justify-between
        lg:rounded-b-2xl'
        style={{
          color: props.textColor,
          backgroundColor: props.backgroundColor,
        }}
        data-testid='page-header-container'
      >
        {/* 上一頁 */}
        <Link
          className='flex flex-row items-center gap-4 text-lg'
          to={props.prevPageUrl}
          data-testid='page-header-prev-link'
        >
          <FaArrowLeft />
          {props.prevPageName}
        </Link>
        {/* 當前頁面 */}
        <p
          className='text-lg'
          data-testid='page-header-current-name'
        >
          {props.pageName}
        </p>
      </div>
    </header>
  );
}