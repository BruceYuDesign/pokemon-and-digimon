import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'material-react-toastify';


export default function BasicLayout() {
  return (
    <div className='w-full min-h-dvh'>
      <div
        className='util-container
        flex flex-col'
      >
        <Outlet/>
        <ToastContainer
          position='top-center'
        />
      </div>
    </div>
  )
}