import { daysOfWeek } from './days-of-week'
import type { DayOfWeek } from '~/types/Hours'

export function isConsecutiveDayOfWeek (a: DayOfWeek, b: DayOfWeek): boolean {
  return (daysOfWeek.indexOf(a) + 1) % daysOfWeek.length === daysOfWeek.indexOf(b)
}
