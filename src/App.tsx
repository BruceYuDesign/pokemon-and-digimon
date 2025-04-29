import { useRoutes } from 'react-router-dom';
import { ToastContainer } from 'material-react-toastify';
import { routes } from '~/routes/routes';
import { PageLayoutProvider } from '~/context/PageLayoutContext';
import ScrollToTop from '~/components/ScrollToTop';


/**
 * 應用程式的根組件
 * @function App
 */
export default function App() {
  // 使用路由
  const routing = useRoutes(routes);


  return (
    <>
      <div className='w-full min-h-dvh'>
        <PageLayoutProvider>
          {routing}
        </PageLayoutProvider>
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