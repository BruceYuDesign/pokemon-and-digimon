import { Outlet } from 'react-router-dom';
import { ListCacheProvider } from '~/context/ListCacheContext';
import { DetailCacheProvider } from '~/context/DetailCacheContext';


export default function PokemonLayout() {
  return (
    <ListCacheProvider>
      <DetailCacheProvider>
        <Outlet />
      </DetailCacheProvider>
    </ListCacheProvider>
  );
}