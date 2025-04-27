import { RouteObject } from 'react-router-dom';
import BasicLayout from '~/layouts/BasicLayout';
import PokemonLayout from '~/layouts/PokemonLayout';
import DigimonLayout from '~/layouts/DigimonLayout';
import HomePage from '~/pages/HomePage';
import PokemonListPage from '~/pages/PokemonListPage';
import PokemonDetailPage from '~/pages/PokemonDetailPage';
import DigimonListPage from '~/pages/DigimonListPage';
import DigimonDetailPage from '~/pages/DigimonDetailPage';


export const routes: Array<RouteObject> = [
  {
    element: <BasicLayout/>,
    children: [
      {
        path: '/',
        element: <HomePage/>,
      },
      {
        element: <PokemonLayout/>,
        children: [
          {
            path: '/pokemon',
            element: <PokemonListPage/>,
          },
          {
            path: '/pokemon/:pokemonId',
            element: <PokemonDetailPage/>,
          },
        ]
      },
      {
        element: <DigimonLayout/>,
        children: [
          {
            path: '/digimon',
            element: <DigimonListPage/>,
          },
          {
            path: '/digimon/:digimonId',
            element: <DigimonDetailPage/>,
          },
        ]
      },
    ],
  },
];