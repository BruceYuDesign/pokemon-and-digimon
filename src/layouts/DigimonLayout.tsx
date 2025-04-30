import { Outlet } from 'react-router-dom';
import { ListCacheProvider } from '~/context/ListCacheContext';


/**
 * Digimon 的版面佈局，包含清單緩存
 * @function DigimonLayout
 */
export default function DigimonLayout() {
  return (
    <ListCacheProvider>
      <Outlet />
    </ListCacheProvider>
  );
}