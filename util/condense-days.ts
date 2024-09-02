import type { DayOfWeek } from '~/types/Hours'

/**
 * Ordered days of week starting with Sunday.
 */
export const daysOfWeek = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
] as const

export interface HoursOfDay {
  readonly dayOfWeek: DayOfWeek
  readonly openTime: string
  readonly closeTime: string
}

/**
 * A range of consecutive days with the same open and close times.
 */
interface DaysConsecutive {
  readonly daysRange: [DayOfWeek] | [DayOfWeek, DayOfWeek],
  readonly openTime: string
  readonly closeTime: string
}

/**
 * Similar to {@see HoursOfDay} but the day of the week can be a range. Ex: "Monday–Friday"
 */
export interface DaysDisplayed {
  readonly dayOfWeek: string
  readonly openTime: string
  readonly closeTime: string
}

export function condenseDays (days: readonly HoursOfDay[]): DaysDisplayed[] {
  const daysWithCombinedConsecutiveDays = days.reduce((acc: DaysConsecutive[], current: HoursOfDay): DaysConsecutive[] => {
    const last = acc.pop()

    if (last === undefined) {
      return [{
        daysRange: [current.dayOfWeek],
        openTime: current.openTime,
        closeTime: current.closeTime
      }]
    }

    const continuous =
      last.openTime === current.openTime &&
      last.closeTime === current.closeTime

    return [
      ...acc,
      ...(!continuous ? [last] : []),
      {
        daysRange: continuous
          ? [last.daysRange[0], current.dayOfWeek]
          : [current.dayOfWeek],
        openTime: current.openTime,
        closeTime: current.closeTime
      }
    ]
  }, [])

  return daysWithCombinedConsecutiveDays.map(el => ({
    dayOfWeek: el.daysRange.join('–'),
    openTime: el.openTime,
    closeTime: el.closeTime
  }))
}
