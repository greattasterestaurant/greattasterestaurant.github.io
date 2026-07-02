export type DayOfWeek =
  | 'Sunday'
  | 'Monday'
  | 'Tuesday'
  | 'Wednesday'
  | 'Thursday'
  | 'Friday'
  | 'Saturday'

export interface Hours {
  readonly id: number
  readonly day_of_week: DayOfWeek
  readonly close_time: string
  readonly open_time: string
  readonly sort: number
}
