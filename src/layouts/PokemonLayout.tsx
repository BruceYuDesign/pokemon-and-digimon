import { Outlet } from 'react-router-dom';
import { ListCacheProvider } from '~/context/ListCacheContext';
import { PokemonDetailProvider } from '~/context/DetailContext';


export default function PokemonLayout() {
  return (
    <ListCacheProvider>
      <PokemonDetailProvider>
        <Outlet />
      </PokemonDetailProvider>
    </ListCacheProvider>
  );
}