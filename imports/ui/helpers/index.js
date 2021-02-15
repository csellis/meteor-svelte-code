export const formatMoney = (amount, currency) => {
  // console.log(balances)
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount)
}

export const dateFormatter = (date) => {
  const parsed = new Date(date)
  return new Intl.DateTimeFormat('en', {
    month: 'numeric',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  }).format(parsed)
}