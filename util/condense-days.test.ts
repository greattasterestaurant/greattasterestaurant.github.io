import { expect, test } from 'vitest'
import { condenseDays, type HoursOfDay } from './condense-days'

test('condenses consecutive weekdays', () => {
  const days: readonly HoursOfDay[] = [
    { dayOfWeek: 'Sunday', openTime: '12pm', closeTime: '9:30pm' },
    { dayOfWeek: 'Monday', openTime: '11am', closeTime: '9:30pm' },
    { dayOfWeek: 'Tuesday', openTime: '11am', closeTime: '9:30pm' },
    { dayOfWeek: 'Wednesday', openTime: '11am', closeTime: '9:30pm' },
    { dayOfWeek: 'Thursday', openTime: '11am', closeTime: '9:30pm' },
    { dayOfWeek: 'Friday', openTime: '11am', closeTime: '10pm' },
    { dayOfWeek: 'Saturday', openTime: '11am', closeTime: '10pm' }
  ]

  expect(condenseDays(days)).toEqual([
    {
      closeTime: '9:30pm',
      dayOfWeek: 'Sunday',
      openTime: '12pm'
    },
    {
      closeTime: '9:30pm',
      dayOfWeek: 'Monday–Thursday',
      openTime: '11am'
    },
    {
      closeTime: '10pm',
      dayOfWeek: 'Friday–Saturday',
      openTime: '11am'
    }
  ])
})
