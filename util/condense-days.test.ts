import { describe, expect, test } from 'vitest'
import { condenseDays, type DaysDisplayed, type HoursOfDay } from './condense-days'

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
      days: 'Sunday',
      hours: {
        open: true,
        openTime: '12pm',
        closeTime: '9:30pm'
      }
    },
    {
      days: 'Monday–Thursday',
      hours: {
        open: true,
        openTime: '11am',
        closeTime: '9:30pm'
      }
    },
    {
      days: 'Friday–Saturday',
      hours: {
        open: true,
        openTime: '11am',
        closeTime: '10pm'
      }
    }
  ] satisfies DaysDisplayed[])
})

describe('handles closed days', () => {
  test('handles closed start of week', () => {
    const days: readonly HoursOfDay[] = [
      { dayOfWeek: 'Monday', openTime: '11am', closeTime: '9:30pm' },
      { dayOfWeek: 'Tuesday', openTime: '11am', closeTime: '9:30pm' },
      { dayOfWeek: 'Wednesday', openTime: '11am', closeTime: '9:30pm' },
      { dayOfWeek: 'Thursday', openTime: '11am', closeTime: '9:30pm' },
      { dayOfWeek: 'Friday', openTime: '11am', closeTime: '10pm' },
      { dayOfWeek: 'Saturday', openTime: '11am', closeTime: '10pm' }
    ]

    expect(condenseDays(days)).toEqual([
      {
        days: 'Sunday',
        hours: {
          open: false
        }
      },
      {
        days: 'Monday–Thursday',
        hours: {
          open: true,
          openTime: '11am',
          closeTime: '9:30pm'
        }
      },
      {
        days: 'Friday–Saturday',
        hours: {
          open: true,
          closeTime: '10pm',
          openTime: '11am'
        }
      }
    ] satisfies DaysDisplayed[])
  })

  test('handles closed day in middle of week', () => {
    const days: readonly HoursOfDay[] = [
      { dayOfWeek: 'Sunday', openTime: '12pm', closeTime: '9:30pm' },
      { dayOfWeek: 'Monday', openTime: '11am', closeTime: '9:30pm' },
      { dayOfWeek: 'Tuesday', openTime: '11am', closeTime: '9:30pm' },
      // Wednesday is intentionally missing here.
      { dayOfWeek: 'Thursday', openTime: '11am', closeTime: '9:30pm' },
      { dayOfWeek: 'Friday', openTime: '11am', closeTime: '10pm' },
      { dayOfWeek: 'Saturday', openTime: '11am', closeTime: '10pm' }
    ]

    expect(condenseDays(days)).toEqual([
      {
        days: 'Sunday',
        hours: {
          open: true,
          closeTime: '9:30pm',
          openTime: '12pm'
        }
      },
      {
        days: 'Monday–Tuesday',
        hours: {
          open: true,
          closeTime: '9:30pm',
          openTime: '11am'
        }
      },
      {
        days: 'Wednesday',
        hours: {
          open: false
        }
      },
      {
        days: 'Thursday',
        hours: {
          open: true,
          closeTime: '9:30pm',
          openTime: '11am'
        }
      },
      {
        days: 'Friday–Saturday',
        hours: {
          open: true,
          closeTime: '10pm',
          openTime: '11am'
        }
      }
    ] satisfies DaysDisplayed[])
  })
})
