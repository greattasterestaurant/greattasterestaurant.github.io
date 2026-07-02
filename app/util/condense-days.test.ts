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
      hours: [{
        openTime: '12pm',
        closeTime: '9:30pm'
      }]
    },
    {
      days: 'Monday–Thursday',
      hours: [{
        openTime: '11am',
        closeTime: '9:30pm'
      }]
    },
    {
      days: 'Friday–Saturday',
      hours: [{
        openTime: '11am',
        closeTime: '10pm'
      }]
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
        hours: []
      },
      {
        days: 'Monday–Thursday',
        hours: [{
          openTime: '11am',
          closeTime: '9:30pm'
        }]
      },
      {
        days: 'Friday–Saturday',
        hours: [{
          closeTime: '10pm',
          openTime: '11am'
        }]
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
        hours: [{
          closeTime: '9:30pm',
          openTime: '12pm'
        }]
      },
      {
        days: 'Monday–Tuesday',
        hours: [{
          closeTime: '9:30pm',
          openTime: '11am'
        }]
      },
      {
        days: 'Wednesday',
        hours: []
      },
      {
        days: 'Thursday',
        hours: [{
          closeTime: '9:30pm',
          openTime: '11am'
        }]
      },
      {
        days: 'Friday–Saturday',
        hours: [{
          closeTime: '10pm',
          openTime: '11am'
        }]
      }
    ] satisfies DaysDisplayed[])
  })
})

describe('non-continuous open hours', () => {
  test('partially open Sunday', () => {
    const days: readonly HoursOfDay[] = [
      { dayOfWeek: 'Sunday', openTime: '12pm', closeTime: '3pm' },
      { dayOfWeek: 'Sunday', openTime: '5pm', closeTime: '9:30pm' },

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
        hours: [
          {
            openTime: '12pm',
            closeTime: '3pm'
          },
          {
            openTime: '5pm',
            closeTime: '9:30pm'
          }
        ]
      },
      {
        days: 'Monday–Thursday',
        hours: [{
          openTime: '11am',
          closeTime: '9:30pm'
        }]
      },
      {
        days: 'Friday–Saturday',
        hours: [{
          openTime: '11am',
          closeTime: '10pm'
        }]
      }
    ] satisfies DaysDisplayed[])
  })
})
