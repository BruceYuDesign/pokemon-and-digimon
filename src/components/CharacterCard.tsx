export interface CharacterCardProps {
  name?: string;
  thumbnail?: string;
  types?: Array<string>;
  weight?: number;
  height?: number;
  hp?: number;
  attack?: number;
  defense?: number;
  speed?: number;
  exp?: number;
}


export default function CharacterCard(props: CharacterCardProps) {
  return (
    <div className='flex flex-col gap-4 p-4 bg-slate-500 aspect-square rounded-2xl overflow-hidden'>
      <div className='h-3/4 flex items-center justify-center'>
        {
          props.thumbnail && (
            <img
              className='h-full aspect-square'
              src={props.thumbnail}
              alt={props.name || '未知'}
            />
          )
        }
      </div>
      <h3 className='text-center text-white text-xl'>
        {props.name || '未知'}
      </h3>
    </div>
  );
  return (
    <div className='flex flex-col gap-1 border-t py-4'>
      {
        props.thumbnail && (
          <img
            src={props.thumbnail}
            alt={props.name || '未知'}
            width={200}
            height={200}
          />
        )
      }
      <h3>{props.name || '未知'}</h3>
      <p>Types: {props.types?.join(', ') || '未知'}</p>
      <p>Weight: {props.weight || '未知'} KG</p>
      <p>Height: {props.height || '未知'} M</p>
      <b>Stats</b>
      <p>HP: {props.hp || '????'}</p>
      <p>ATK: {props.attack || '????'}</p>
      <p>DEF: {props.defense || '????'}</p>
      <p>SPD: {props.speed || '????'}</p>
      <p>EXP: {props.exp || '????'}</p>
    </div>
  );
}