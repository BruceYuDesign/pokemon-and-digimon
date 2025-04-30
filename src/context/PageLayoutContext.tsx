import type { PageHeaderProps } from '~/components/PageHeader';
import { createContext, useContext, useState } from 'react';


interface PageLayoutContext {
  /**
   * 頁首參數
   */
  header: PageHeaderProps;
  /**
   * 設定頁首參數
   */
  setHeader: (newPageLayout: PageHeaderProps) => void;
}


interface PageLayoutProviderProps {
  /**
   * 子元件
   */
  children: React.ReactNode;
}


// 建立頁面佈局狀態
const pageLayoutContext = createContext<PageLayoutContext>({
  header: {
    backgroundColor: '',
    textColor: '',
    pageName: '',
    prevPageName: '',
    prevPageUrl: '',
  },
  setHeader: () => {},
});


/**
 * 頁面佈局狀態的作用域
 * @function PageLayoutProvider
 * @param {PageLayoutProviderProps} props
 */
export function PageLayoutProvider(props: PageLayoutProviderProps) {
  const [header, setHeader] = useState<PageHeaderProps>({
    backgroundColor: '',
    textColor: '',
    pageName: '',
    prevPageName: '',
    prevPageUrl: '',
  });

  return (
    <pageLayoutContext.Provider
      value={{
        header,
        setHeader,
      }}
    >
      {props.children}
    </pageLayoutContext.Provider>
  );
}


/**
 * 調用頁面佈局狀態
 * @function usePageLayout
 * @returns {PageLayoutContext}
 */
export function usePageLayout(): PageLayoutContext {
  const context = useContext(pageLayoutContext);

  if (!context) {
    throw new Error('usePageLayout 需要在 PageLayoutProvider 中使用');
  }

  return context;
}