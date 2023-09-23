export function currencyFormatter(value: number): string {
  const formatter = Intl.NumberFormat('hu', {
    style: 'currency',
    currency: 'HUF',
    maximumFractionDigits: 0,
  });

  return formatter.format(value);
}
