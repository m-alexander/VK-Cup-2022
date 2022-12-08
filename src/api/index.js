const BASE_PATH =
  process.env.NODE_ENV === "development" ? "http://localhost:3000/api" : "/api";

export const getLetters = async (folder) => {
  try {
    const response = await fetch(`${BASE_PATH}/${folder}`);
    return (await response.json()) ?? [];
  } catch (e) {
    return [];
  }
};

export const getLetter = async (folder, letterId) => {
  try {
    const response = await fetch(`${BASE_PATH}/${folder}/${letterId}`);
    return await response.json();
  } catch (e) {
    return null;
  }
};
