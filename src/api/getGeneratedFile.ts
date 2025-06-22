export async function getGeneratedFile(
  size: number,
  withErrors: string = 'on',
  maxSpend: string = '1000'
) {
  const url = `http://localhost:3000/report?size=${size}&withErrors=${withErrors}&maxSpend=${maxSpend}`;

  try {
    const response = await fetch(url, {
      method: 'GET',
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
