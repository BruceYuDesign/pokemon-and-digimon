import type { PokemonDetail } from '~/services/pokemonService';
import type { ReactNode } from 'react';
import { createContext, useContext, useState } from 'react';


interface PokemonDetailContext {
  pokemonDetail: PokemonDetail | null;
  setPokemonDetail: (pokemonDetail: PokemonDetail) => void;
}


interface PokemonDetailProviderProps {
  children: ReactNode;
}


const pokemonDetailContext = createContext<PokemonDetailContext>({
  pokemonDetail: null,
  setPokemonDetail: () => {},
});


export function PokemonDetailProvider(props: PokemonDetailProviderProps) {
  const [pokemonDetail, setPokemonDetail] = useState<PokemonDetail | null>(null);

  return (
    <pokemonDetailContext.Provider
      value={{
        pokemonDetail,
        setPokemonDetail,
      }}
    >
      {props.children}
    </pokemonDetailContext.Provider>
  );
}


export function usePokemonDetail() {
  const context = useContext(pokemonDetailContext);

  if (!context) {
    throw new Error('usePokemonDetail 需要在 PokemonDetailProvider 中使用');
  }

  return context;
}