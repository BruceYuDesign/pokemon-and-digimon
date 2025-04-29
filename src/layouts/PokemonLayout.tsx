import { Outlet } from 'react-router-dom';
import { ListCacheProvider } from '~/context/ListCacheContext';
import { DetailCacheProvider } from '~/context/DetailCacheContext';


/**
 * Pokemon 的版面佈局，包含清單與角色詳細資料緩存
 * @function PokemonLayout
 */
export default function PokemonLayout() {
  return (
    <ListCacheProvider>
      <DetailCacheProvider>
        <Outlet />
      </DetailCacheProvider>
    </ListCacheProvider>
  );
}