export default (date: Date) => {
  const isNovember = date.getMonth() === 10
  const isThursday = date.getDay() === 4
  const isWithinDayOfMonth = date.getDate() >= 22 && date.getDate() <= 28
  return isNovember && isThursday && isWithinDayOfMonth
}
