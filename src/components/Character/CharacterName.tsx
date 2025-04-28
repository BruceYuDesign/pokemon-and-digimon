interface CharacterNameProps {
  name?: string;
}


export default function CharacterName(props: CharacterNameProps) {
  return (
    <h1 className='text-3xl'>
      {props.name || 'Unknown'}
    </h1>
  );
}