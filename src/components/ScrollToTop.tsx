import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';


// 要忽略的路徑
export const ignorePathnames = [
  '/pokemon',
  '/digimon',
];


/**
 * 滾動到頁面頂部，未實際渲染元件
 * @function CharacterCard
 */
export default function ScrollToTop() {
  // 取得當前路徑
  const { pathname } = useLocation();


  // 當路徑改變時，滾動到頁面頂部
  useEffect(() => {
    if (!ignorePathnames.includes(pathname)) {
      window.scrollTo(0, 0);
    }
  }, [pathname]);


  return null;
}