import { Outlet } from 'react-router-dom';


export default function BasicLayout() {
  return (
    <div className='w-full min-h-dvh'>
      <div
        className='util-container
        flex flex-col'
      >
        <Outlet />
      </div>
    </div>
  )
}