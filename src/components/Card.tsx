export interface CardProps {
  name: string;
  thumbnail: string;
  types: Array<string>;
  weight: number;
  height: number;
  hp: number;
  attack: number;
  defense: number;
  speed: number;
  exp: number;
}

export default function Card(props: CardProps) {
  return (
    <div className='flex flex-col gap-1 border-t py-4'>
      <img
        src={props.thumbnail}
        alt={props.name}
        width={200}
        height={200}
      />
      <h3>{props.name}</h3>
      <p>Types: {props.types.join(', ')}</p>
      <p>Weight: {props.weight} KG</p>
      <p>Height: {props.height} M</p>
      <b>Stats</b>
      <p>HP: {props.hp}</p>
      <p>ATK: {props.attack}</p>
      <p>DEF: {props.defense}</p>
      <p>SPD: {props.speed}</p>
      <p>EXP: {props.exp}</p>
    </div>
  );
}