export const formatMoney = (amount, currency) => {
  // console.log(balances)
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount)
}