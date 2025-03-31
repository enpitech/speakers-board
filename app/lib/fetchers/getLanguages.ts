export const getLanguages = async (language?: string | null) => {
  const response = await fetch(
    `http://localhost:3001/languages${language ? `?language=${language}` : ''}`,
  );
  const languages = await response.json();
  console.log({ languages });
  return languages;
};
