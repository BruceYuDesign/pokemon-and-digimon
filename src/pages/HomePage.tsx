import { Link } from 'react-router-dom';
import PokemonCoverImage from '~/assets/images/pokemon-cover.png';
import DigimonCoverImage from '~/assets/images/digimon-cover.png';


// 頁面連結
const pageLinks = [
  {
    href: '/pokemon',
    label: 'Pokemon',
    image: PokemonCoverImage,
    backgroundColor: 'var(--color-pokemon)',
  },
  {
    href: '/digimon',
    label: 'Digimon',
    image: DigimonCoverImage,
    backgroundColor: 'var(--color-digimon)',
  },
];


/**
 * 首頁
 * @function HomePage
 */
export default function HomePage() {
  return (
    <div
      className='util-container
      min-h-dvh px-8 py-14 flex flex-col items-center justify-center gap-14'
    >
      {/* 頁面標題 */}
      <h1
        className='text-2xl text-center font-bold
        md:text-4xl
        xl:text-6xl'
      >
        Pokemon Ｘ Digimon
      </h1>
      {/* 連結 */}
      <div
        className='w-full grid grid-cols-1 auto-rows-max place-content-center gap-8
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
              <h2 className='h-1/4 text-3xl flex items-center justify-center text-white'>
                {pageLink.label}
              </h2>
            </Link>
          ))
        }
      </div>
    </div>
  );
}