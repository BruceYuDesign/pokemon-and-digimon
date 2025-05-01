import { Outlet } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ScrollCacheProvider } from '~/context/ScrollCacheContext';


/**
 * Digimon 的版面佈局，包含清單緩存
 * @function DigimonLayout
*/
export default function DigimonLayout() {
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