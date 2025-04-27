import type { ReactNode, SetStateAction, RefObject } from 'react';
import { createContext, useContext, useState, useRef } from 'react';


interface ListCacheContext {
  nextPageUrl: RefObject<string>;
  scrollY: RefObject<number>;
  items: Array<unknown>;
  setItems: (newItems: SetStateAction<Array<unknown>>) => void;
}


interface ListCacheProviderProps {
  children: ReactNode;
}


const listCacheContext = createContext<ListCacheContext>({
  nextPageUrl: { current: '' },
  scrollY: { current: 0 },
  items: [],
  setItems: () => {},
});


export function ListCacheProvider(props: ListCacheProviderProps) {
  const nextPageUrl = useRef<string>('');
  const scrollY = useRef<number>(0);
  const [items, setItems] = useState<Array<any>>([]);

  return (
    <listCacheContext.Provider
      value={{
        nextPageUrl,
        scrollY,
        items,
        setItems,
      }}
    >
      {props.children}
    </listCacheContext.Provider>
  );
}


export function useListCache() {
  const context = useContext(listCacheContext);

  if (!context) {
    throw new Error('useListCache 需要在 ListCacheProvider 中使用');
  }

  return context;
}