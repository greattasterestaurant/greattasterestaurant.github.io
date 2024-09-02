import lodash from 'lodash'
import { isConsecutiveDayOfWeek } from './is-consecutive-day-of-week'
import { daysOfWeek } from './days-of-week'
import type { DayOfWeek } from '~/types/Hours'

const { keyBy } = lodash

export interface HoursOfDay {
  readonly dayOfWeek: DayOfWeek
  readonly openTime: string
  readonly closeTime: string
}

export interface HoursOpen {
  readonly open: true
  readonly openTime: string
  readonly closeTime: string
}

export interface Closed {
  readonly open: false
}

/**
 * A range of consecutive days with the same open and close times.
 */
interface DaysConsecutive {
  readonly daysRange: [DayOfWeek] | [DayOfWeek, DayOfWeek],
  readonly hours: Closed | HoursOpen
}

/**
 * Similar to {@see HoursOfDay} but the day of the week can be a range. Ex: "Monday–Friday"
 */
export interface DaysDisplayed {
  readonly days: string
  readonly hours: Closed | HoursOpen
}

export function condenseDays (days: readonly HoursOfDay[]): DaysDisplayed[] {
  // Note: This function doesn't currently non-contiguous open hours on the same day.
  const dayOfWeekToOpenHours = keyBy(days, 'dayOfWeek')

  const folded = daysOfWeek.reduce((acc: DaysConsecutive[], dayOfWeek: DayOfWeek): DaysConsecutive[] => {
    const openHours = dayOfWeekToOpenHours[dayOfWeek]
    const currentDayOpenHours: Closed | HoursOpen = openHours === undefined
      ? { open: false }
      : { open: true, openTime: openHours.openTime, closeTime: openHours.closeTime }

    const last = acc.pop()

    if (last === undefined) {
      return [{
        daysRange: [dayOfWeek],
        hours: currentDayOpenHours
      }]
    }

    const continuous = isHoursSame(last.hours, currentDayOpenHours) &&
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
        hours: currentDayOpenHours
      }
    ]
  }, [])

  return folded.map(el => ({
    days: el.daysRange.join('–'),
    hours: el.hours
  }))
}

function isHoursSame (a: Closed | HoursOpen, b: Closed | HoursOpen) {
  if (a.open && b.open) {
    return a.openTime === b.openTime && a.closeTime === b.closeTime
  }

  if (!a.open && !b.open) {
    return true
  }

  return false
}
