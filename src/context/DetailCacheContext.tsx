import type { ReactNode } from 'react';
import { createContext, useContext, useState } from 'react';


interface DetailCacheContext {
  detailCache: unknown | null;
  setDetailCache: (detailCache: unknown) => void;
}


interface DetailCacheProviderProps {
  children: ReactNode;
}


const detailCacheContext = createContext<DetailCacheContext>({
  detailCache: null,
  setDetailCache: () => {},
});


export function DetailCacheProvider(props: DetailCacheProviderProps) {
  const [detailCache, setDetailCache] = useState<unknown | null>(null);

  return (
    <detailCacheContext.Provider
      value={{
        detailCache,
        setDetailCache,
      }}
    >
      {props.children}
    </detailCacheContext.Provider>
  );
}


export function useDetailCache() {
  const context = useContext(detailCacheContext);

  if (!context) {
    throw new Error('useDetailCache 需要在 DetailCacheProvider 中使用');
  }

  return context;
}