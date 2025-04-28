interface CharacterDescriptionProps {
  description?: string;
}


export default function CharacterDescription(props: CharacterDescriptionProps) {
  return (
    <p className='text-lg leading-loose'>
      {props.description || 'No description available.'}
    </p>
  );
}