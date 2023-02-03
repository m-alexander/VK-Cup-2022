const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

export const uploadFile = async (file) => {
  const body = await toBase64(file);
  const response = await fetch("/upload-image", { method: "POST", body });
  return await response.json();
};
