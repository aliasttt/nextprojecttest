export function formatCurrency(
  amount: number,
  currency: "TRY" | "USD" | "EUR",
  locale: string,
): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}





