export const formattedDate = (startDate) => startDate?.split(' ')[0]; // Extracts "2024-08-01"
export const formatDate = (dateStr) => {
  const date = new Date(dateStr);

  const options = { day: 'numeric', month: 'short', year: 'numeric' };
  const formattedDate = date.toLocaleDateString('en-US', options);
  return formattedDate;
};
