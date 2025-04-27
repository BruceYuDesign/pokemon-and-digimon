import type { ReactNode } from 'react';
import { createContext, useContext, useState } from 'react';


// 於 <CharacterCard/> 與 <PokemonDetailPage/> 中統一處理空值
export interface CharacterDetail {
  id?: number | string;
  name?: string;
  thumbnail?: string;
  types?: Array<string>;
  weight?: number;
  height?: number;
  hp?: number;
  attack?: number;
  defense?: number;
  speed?: number;
  exp?: number;
  color?: string;
}


interface CharacterDetailContext {
  characterDetail: CharacterDetail | null;
  setCharacterDetail: (characterDetail: CharacterDetail) => void;
}


interface CharacterDetailProviderProps {
  children: ReactNode;
}


const characterDetailContext = createContext<CharacterDetailContext>({
  characterDetail: null,
  setCharacterDetail: () => {},
});


export function CharacterDetailProvider(props: CharacterDetailProviderProps) {
  const [characterDetail, setCharacterDetail] = useState<CharacterDetail | null>(null);

  return (
    <characterDetailContext.Provider
      value={{
        characterDetail,
        setCharacterDetail,
      }}
    >
      {props.children}
    </characterDetailContext.Provider>
  );
}


export function useCharacterDetail() {
  const context = useContext(characterDetailContext);

  if (!context) {
    throw new Error('useCharacterDetail 需要在 CharacterDetailProvider 中使用');
  }

  return context;
}