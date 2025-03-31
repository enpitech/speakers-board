export const getTopics = async () => {
  const response = await fetch('http://localhost:3001/topics');
  const topics = await response.json();
  return topics.map((topic: { id: string; name: string }) => topic.name);
};
