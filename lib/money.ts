export function formatSar(amount: number): string {
  return `${amount} ر.س`;
}

export function offerUnitSar(sar: number, qty: number): string {
  const unit = Math.round((sar / qty) * 10) / 10;
  return `${unit} ر.س للحبة`;
}
