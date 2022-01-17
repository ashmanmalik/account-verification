const formatter = new Intl.NumberFormat('en-AU', {
  style: 'currency',
  currency: 'AUD',
});

/**
 * Utility function for formatting a number (e.g. a bank balance) as currency
 * e.g. 123.45 will be formatted as $123.45
 */
export function formatCurrency(value) {
  return formatter.format(value);
}
