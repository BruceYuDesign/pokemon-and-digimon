import { Link } from 'react-router-dom';
import PokemonCoverImage from '~/assets/images/pokemon-cover.png';
import DigimonCoverImage from '~/assets/images/digimon-cover.png';


const pageLinks = [
  {
    to: '/pokemon',
    label: 'Pokemon',
    image: PokemonCoverImage,
    backgroundColor: '#D53B47',
  },
  {
    to: '/digimon',
    label: 'Digimon',
    image: DigimonCoverImage,
    backgroundColor: '#2B5DB2',
  },
];


export default function HomePage() {
  return (
    <div
      className='p-16 w-full min-h-dvh grid grid-cols-1 auto-rows-max place-content-center gap-8
      sm:grid-cols-2'>
      {
        pageLinks.map(({ to, label, image, backgroundColor }) => (
          <Link
            className='p-12 flex flex-col items-center justify-between aspect-square rounded-4xl'
            key={label}
            style={{
              backgroundColor,
            }}
            to={to}
          >
            <img
              className='h-3/4 object-contain'
              src={image}
              alt={label}
            />
            <h2 className='text-3xl'>
              {label}
            </h2>
          </Link>
        ))
      }
    </div>
  );
}