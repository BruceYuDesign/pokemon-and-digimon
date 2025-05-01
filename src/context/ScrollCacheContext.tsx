import type { ReactNode, RefObject } from 'react';
import { createContext, useContext, useRef } from 'react';


interface ScrollCacheContext {
  /**
   * 緩存滾動位置
   */
  scrollCache: RefObject<number>;
}


interface ScrollCacheProviderProps {
  /**
   * 子元件
   */
  children: ReactNode;
}


// 建立滾動位置緩存
const scrollCacheContext = createContext<ScrollCacheContext>({
  scrollCache: { current: 0 },
});


/**
 * 滾動位置緩存的作用域
 * @function ScrollCacheProvider
 * @param {ScrollCacheProviderProps} props
 */
export function ScrollCacheProvider(props: ScrollCacheProviderProps) {
  const scrollCache = useRef<number>(0);

  return (
    <scrollCacheContext.Provider
      value={{
        scrollCache,
      }}
    >
      {props.children}
    </scrollCacheContext.Provider>
  );
}


/**
 * 調用滾動位置緩存
 * @function useScrollCache
 * @returns {ScrollCacheContext}
 */
export function useScrollCache(): ScrollCacheContext {
  const context = useContext(scrollCacheContext);

  if (!context) {
    throw new Error('useScrollCache 需要在 ScrollCacheProvider 中使用');
  }

  return context;
}