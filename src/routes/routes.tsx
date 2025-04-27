import { RouteObject } from 'react-router-dom';
import CharacterLayout from '~/layouts/CharacterLayout';
import HomePage from '~/pages/HomePage';
import PokemonListPage from '~/pages/PokemonListPage';
import PokemonDetailPage from '~/pages/PokemonDetailPage';


export const routes: Array<RouteObject> = [
  {
    element: <CharacterLayout/>,
    children: [
      {
        path: '/',
        element: <HomePage/>,
      },
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
];