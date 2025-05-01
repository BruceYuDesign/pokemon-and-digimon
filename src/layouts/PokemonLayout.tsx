import { Outlet } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ScrollCacheProvider } from '~/context/ScrollCacheContext';


/**
 * Pokemon 的版面佈局，包含清單與角色詳細資料緩存
 * @function PokemonLayout
*/
export default function PokemonLayout() {
  const queryClient = new QueryClient();


  return (
    <QueryClientProvider
      client={queryClient}
    >
      <ScrollCacheProvider>
        <Outlet />
      </ScrollCacheProvider>
    </QueryClientProvider>
  );
}