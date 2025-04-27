import { Outlet } from 'react-router-dom';
import { ListCacheProvider } from '~/context/ListCacheContext';
import { CharacterDetailProvider } from '~/context/CharacterDetailContext';


export default function CharacterLayout() {
  return (
    <div className='w-full min-h-dvh'>
      <div
        className='util-container
        flex flex-col'
      >
        <ListCacheProvider>
          <CharacterDetailProvider>
            <Outlet />
          </CharacterDetailProvider>
        </ListCacheProvider>
      </div>
    </div>
  );
}