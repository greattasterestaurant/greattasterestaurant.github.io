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
] as const satisfies DayOfWeek[]
