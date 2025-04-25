import { Outlet } from 'react-router-dom';

export default function BasicLayout() {
  return (
    <div className='w-full min-h-dvh'>
      <div className='max-w-3xl w-full mx-auto px-4 flex flex-col'>
        <Outlet />
      </div>
    </div>
  );
}