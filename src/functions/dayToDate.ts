export const dayToDate = (dayOfYear: number): string => {
  const year = 2020;
  const date = new Date(year, 0);
  date.setDate(dayOfYear);

  return new Intl.DateTimeFormat('ru-RU', {
    day: 'numeric',
    month: 'long',
  }).format(date);
};
