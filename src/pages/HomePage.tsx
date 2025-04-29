import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PokemonCoverImage from '~/assets/images/pokemon-cover.png';
import DigimonCoverImage from '~/assets/images/digimon-cover.png';


const pageLinks = [
  {
    href: '/pokemon',
    label: 'Pokemon',
    image: PokemonCoverImage,
    backgroundColor: '#D53B47',
  },
  {
    href: '/digimon',
    label: 'Digimon',
    image: DigimonCoverImage,
    backgroundColor: '#2B5DB2',
  },
];


export default function HomePage() {


  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  return (
    <div
      className='p-8 w-full min-h-dvh grid grid-cols-1 auto-rows-max place-content-center gap-8
      sm:grid-cols-2'
    >
      {
        pageLinks.map(pageLink => (
          <Link
            className='px-12 flex flex-col items-center justify-between aspect-square rounded-4xl'
            key={pageLink.label}
            style={{
              backgroundColor: pageLink.backgroundColor,
            }}
            to={pageLink.href}
          >
            <div className='h-3/4 w-full flex items-center justify-center'>
              <img
                className='h-3/4 w-auto object-contain pointer-events-none'
                src={pageLink.image}
                alt={pageLink.label}
              />
            </div>
            <h2 className='h-1/4 text-3xl flex items-center justify-center'>
              {pageLink.label}
            </h2>
          </Link>
        ))
      }
    </div>
  );
}