import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'material-react-toastify';
import ScrollToTop from '~/components/ScrollToTop';


/**
 * 基本版面佈局
 * @function BasicLayout
 */
export default function BasicLayout() {
  return (
    <>
      <div className='w-full min-h-dvh pb-10'>
        <div
          className='util-container
          flex flex-col'
        >
          <Outlet/>
        </div>
      </div>
      {/* 吐司訊息容器 */}
      <ToastContainer
        position='top-center'
        theme='dark'
        pauseOnHover={false}
        limit={1}
        autoClose={2000}
      />
      {/* 頁面置頂觸發器 */}
      <ScrollToTop/>
    </>
  );
}