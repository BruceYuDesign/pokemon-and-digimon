import { useRoutes } from 'react-router-dom';
import { routes } from '~/routes/routes';


/**
 * 應用程式的根組件
 * @function App
 */
export default function App() {
  const routing = useRoutes(routes);
  return routing;
}