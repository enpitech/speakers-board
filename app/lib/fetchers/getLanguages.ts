export const getLanguages = async () => {
  const response = await fetch(`http://localhost:3001/languages`);
  const languages = await response.json();
  return languages.map((language: { id: string; name: string }) => language.name) as string[];
};
