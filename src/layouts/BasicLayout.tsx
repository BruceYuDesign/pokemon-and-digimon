import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'material-react-toastify';


export default function BasicLayout() {
  return (
    <div className='w-full min-h-dvh pb-10'>
      <div
        className='util-container
        flex flex-col'
      >
        <Outlet/>
        <ToastContainer
          position='top-center'
          theme='colored'
          limit={1}
          autoClose={3000}
        />
      </div>
    </div>
  );
}