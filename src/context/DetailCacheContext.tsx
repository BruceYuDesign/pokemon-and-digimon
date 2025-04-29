import type { ReactNode } from 'react';
import { createContext, useContext, useState } from 'react';


interface DetailCacheContext {
  /**
   * 角色詳細資料的緩存
   */
  detailCache: unknown | null;
  /**
   * 設定角色詳細資料的緩存
   */
  setDetailCache: (detailCache: unknown) => void;
}


interface DetailCacheProviderProps {
  /**
   * 子元件
   */
  children: ReactNode;
}


// 建立角色詳細資料緩存
const detailCacheContext = createContext<DetailCacheContext>({
  detailCache: null,
  setDetailCache: () => {},
});


/**
 * 角色詳細資料緩存的作用域
 * @function DetailCacheProvider
 * @param {DetailCacheProviderProps} props
 */
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


/**
 * 調用角色詳細資料緩存
 * @function useDetailCache
 * @returns {DetailCacheContext}
 */
export function useDetailCache(): DetailCacheContext {
  const context = useContext(detailCacheContext);

  if (!context) {
    throw new Error('useDetailCache 需要在 DetailCacheProvider 中使用');
  }

  return context;
}