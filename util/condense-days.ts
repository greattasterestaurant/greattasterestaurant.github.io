export interface Day {
  readonly dayOfWeek: string
  readonly openTime: string
  readonly closeTime: string
}

export function condenseDays (days: readonly Day[]): Day[] {
  return days.reduce((acc: Day[], current: Day): Day[] => {
    const last = acc.pop()
    const continuous =
      last?.openTime === current.openTime &&
      last.closeTime === current.closeTime
    const continuousDaysOfWeek = continuous
      ? last.dayOfWeek.includes('–')
        ? last.dayOfWeek.replace(/–.*/, '–' + current.dayOfWeek)
        : last.dayOfWeek + '–' + current.dayOfWeek
      : null
    const includeLast = !continuous && last
    return [
      ...acc,
      ...(includeLast ? [last] : []),
      {
        dayOfWeek: continuousDaysOfWeek ?? current.dayOfWeek,
        openTime: current.openTime,
        closeTime: current.closeTime
      }
    ]
  }, [])
}
