import type { RouteObject } from 'react-router-dom';
import BasicLayout from '~/layouts/BasicLayout';
import PokemonLayout from '~/layouts/PokemonLayout';
import DigimonLayout from '~/layouts/DigimonLayout';
import HomePage from '~/pages/HomePage';
import PokemonListPage from '~/pages/PokemonListPage';
import PokemonDetailPage from '~/pages/PokemonDetailPage';
import DigimonListPage from '~/pages/DigimonListPage';
import DigimonDetailPage from '~/pages/DigimonDetailPage';


// 頁面路由
export const routes: Array<RouteObject> = [
  {
    element: <BasicLayout/>,
    children: [
      // 首頁
      {
        path: '/',
        element: <HomePage/>,
      },
      // Pokemon
      {
        element: <PokemonLayout/>,
        children: [
          // Pokemon 清單
          {
            path: '/pokemon',
            element: <PokemonListPage/>,
          },
          // Pokemon 詳細資料
          {
            path: '/pokemon/:pokemonId',
            element: <PokemonDetailPage/>,
          },
        ]
      },
      // Digimon
      {
        element: <DigimonLayout/>,
        children: [
          // Digimon 清單
          {
            path: '/digimon',
            element: <DigimonListPage/>,
          },
          // Digimon 詳細資料
          {
            path: '/digimon/:digimonId',
            element: <DigimonDetailPage/>,
          },
        ],
      },
    ],
  },
];