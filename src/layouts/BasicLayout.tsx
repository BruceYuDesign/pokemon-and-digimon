import { Outlet } from 'react-router-dom';
import { usePageLayout } from '~/context/PageLayoutContext';
import PageHeader from '~/components/PageHeader';


/**
 * 基本版面佈局
 * @function BasicLayout
 */
export default function BasicLayout() {
  // 調用頁面佈局狀態
  const { header } = usePageLayout();


  return (
    <div
      className='util-container
      flex flex-col pb-15'
    >
      <PageHeader
        textColor={header.textColor}
        backgroundColor={header.backgroundColor}
        prevPageUrl={header.prevPageUrl}
        prevPageName={header.prevPageName}
        pageName={header.pageName}
      />
      <Outlet/>
    </div>
  );
}