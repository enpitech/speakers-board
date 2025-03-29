export async function loader() {
  const speakers = await fetch('../db/speakers.json');
  //   return json(speakers);
}

export default function Speakers() {
  return <div>Speakers</div>;
}
