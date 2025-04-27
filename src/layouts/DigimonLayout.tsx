import { Outlet } from 'react-router-dom';
import { ListCacheProvider } from '~/context/ListCacheContext';


export default function DigimonLayout() {
  return (
    <ListCacheProvider>
      <Outlet />
    </ListCacheProvider>
  );
}