import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';


const ignorePathnames = [
  '/pokemon',
  '/digimon',
];


export default function ScrollToTop() {
  const { pathname } = useLocation();


  useEffect(() => {
    if (!ignorePathnames.includes(pathname)) {
      window.scrollTo(0, 0);
    }
  }, [pathname]);


  return null;
}