export async function postFile(file: File, rows: number) {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await fetch(`http://localhost:3000/aggregate?rows=${rows}`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Ошибка: ${response.status}`);
    }

    return response;
  } catch (error) {
    console.error('Ошибка загрузки файла:', error);
    throw error;
  }
}
