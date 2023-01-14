const BASE_PATH = "/api";

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
