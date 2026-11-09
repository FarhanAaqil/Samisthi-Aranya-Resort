const inr = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
});

/** 2500 becomes "₹2,500". */
export function formatINR(amount: number): string {
  return inr.format(amount);
}
