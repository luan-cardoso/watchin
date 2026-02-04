// Função para formatar data de YYYY-MM-DD para MM/YYYY
export function formatDateToMonthYear(dateString: string): string {
  const date = new Date(dateString);
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${month}/${year}`;
}
