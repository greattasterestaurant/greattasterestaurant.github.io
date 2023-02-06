export default (date) => {
  const isNovember = date.getMonth() === 10
  const isThursday = date.getDay() === 4
  const isWithinDayOfMonth = 22 <= date.getDate() && date.getDate() <= 28
  return isNovember && isThursday && isWithinDayOfMonth
}
