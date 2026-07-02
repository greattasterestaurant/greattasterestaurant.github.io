import lodash from 'lodash'
import { isConsecutiveDayOfWeek } from './is-consecutive-day-of-week'
import { daysOfWeek } from './days-of-week'
import type { DayOfWeek } from '~/types/Hours'

const { groupBy, pick } = lodash

export interface HoursOfDay {
  readonly dayOfWeek: DayOfWeek
  readonly openTime: string
  readonly closeTime: string
}

export interface HoursOpen {
  readonly openTime: string
  readonly closeTime: string
}

/**
 * A range of consecutive days with the same open and close times.
 */
interface DaysConsecutive {
  readonly daysRange: [DayOfWeek] | [DayOfWeek, DayOfWeek],
  readonly hours: readonly HoursOpen[]
}

/**
 * Similar to {@see HoursOfDay} but the day of the week can be a range. Ex: "Monday–Friday"
 */
export interface DaysDisplayed {
  readonly days: string
  readonly hours: readonly HoursOpen[]
}

export function condenseDays (days: readonly HoursOfDay[]): DaysDisplayed[] {
  const dayOfWeekToOpenHours = groupBy(days, 'dayOfWeek')

  const folded = daysOfWeek.reduce((acc: DaysConsecutive[], dayOfWeek: DayOfWeek): DaysConsecutive[] => {
    // Note: This does not run open hours ranges through a date parser and sort.
    // Assuming the input data is already sorted.
    const openHours: readonly HoursOpen[] = (dayOfWeekToOpenHours[dayOfWeek] ?? []).map(el => pick(el, ['openTime', 'closeTime']))

    const last = acc.pop()

    if (last === undefined) {
      return [{
        daysRange: [dayOfWeek],
        hours: openHours
      }]
    }

    const continuous = hoursAreSame(last.hours, openHours) &&
      isConsecutiveDayOfWeek(last.daysRange[1] ?? last.daysRange[0], dayOfWeek)
    if (continuous) {
      return [
        ...acc,
        {
          daysRange: [last.daysRange[0], dayOfWeek],
          hours: last.hours
        }
      ]
    }

    return [
      ...acc,
      last,
      {
        daysRange: [dayOfWeek],
        hours: openHours
      }
    ]
  }, [])

  return folded.map(el => ({
    days: el.daysRange.join('–'),
    hours: el.hours
  }))
}

function hoursAreSame (a: readonly HoursOpen[], b: readonly HoursOpen[]) {
  return a.length === b.length &&
    a.every((hours, i) =>
      hours.openTime === b[i]?.openTime &&
      hours.closeTime === b[i]?.closeTime)
}
