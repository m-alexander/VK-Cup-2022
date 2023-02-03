const BASE_PATH = "/api";

export const getLetters = async (folder, page = 1, filters = []) => {
  const params = new URLSearchParams({ page });
  if (filters.length) params.append("filters", filters);

  try {
    const response = await fetch(`${BASE_PATH}/${folder}?${params}`);
    return (await response.json()) ?? {};
  } catch (e) {
    return {};
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

const folders = new Map([
  ["important", "Важное"],
  ["sent", "Отправленные"],
  ["drafts", "Черновики"],
  ["archive", "Архив"],
  ["spam", "Спам"],
  ["trash", "Корзина"],
]);

export const addLetter = async (data, folder) => {
  return fetch(`${BASE_PATH}/add-letter`, {
    method: "POST",
    body: JSON.stringify({
      author: { name: "A" },
      to: [data.to],
      title: data.subject,
      text: data.content,
      folder: folders.get(folder),
      date: new Date().toISOString(),
      doc: data.attaches ? { img: data.attaches[0] } : null,
    }),
  });
};
