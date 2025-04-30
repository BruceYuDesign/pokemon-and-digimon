import type { ReactNode, SetStateAction, RefObject } from 'react';
import { createContext, useContext, useState, useRef } from 'react';


interface ListCacheContext {
  /**
   * 緩存下一頁的網址
   */
  nextPageUrl: RefObject<string>;
  /**
   * 緩存滾動位置
   */
  scrollY: RefObject<number>;
  /**
   * 緩存子元件
   */
  items: Array<unknown>;
  /**
   * 設定緩存子元件
   */
  setItems: (newItems: SetStateAction<Array<unknown>>) => void;
}


interface ListCacheProviderProps {
  /**
   * 子元件
   */
  children: ReactNode;
}


// 建立列表緩存
const listCacheContext = createContext<ListCacheContext>({
  nextPageUrl: { current: '' },
  scrollY: { current: 0 },
  items: [],
  setItems: () => {},
});


/**
 * 清單緩存的作用域
 * @function ListCacheProvider
 * @param {ListCacheProviderProps} props
 */
export function ListCacheProvider(props: ListCacheProviderProps) {
  const nextPageUrl = useRef<string>('');
  const scrollY = useRef<number>(0);
  const [items, setItems] = useState<Array<unknown>>([]);

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


/**
 * 調用清單詳細資料緩存
 * @function useListCache
 * @returns {ListCacheContext}
 */
export function useListCache(): ListCacheContext {
  const context = useContext(listCacheContext);

  if (!context) {
    throw new Error('useListCache 需要在 ListCacheProvider 中使用');
  }

  return context;
}