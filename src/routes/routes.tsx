import { RouteObject } from 'react-router-dom';
import BasicLayout from '~/layouts/BasicLayout';
import HomePage from '~/pages/HomePage';
import PokemonPage from '~/pages/PokemonPage';

export const routes: Array<RouteObject> = [
  {
    element: <BasicLayout/>,
    children: [
      {
        path: '',
        element: <HomePage/>,
      },
      {
        path: '/pokemon',
        element: <PokemonPage/>,
      },
      {
        path: '/digimon',
        element: <></>,
      },
    ]
  },
];