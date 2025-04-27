import { Outlet } from 'react-router-dom';
import { ListCacheProvider } from '~/context/ListCacheContext';
import { PokemonDetailProvider } from '~/context/pokemonDetailContext';


export default function PokemonLayout() {
  return (
    <ListCacheProvider>
      <PokemonDetailProvider>
        <Outlet />
      </PokemonDetailProvider>
    </ListCacheProvider>
  );
}