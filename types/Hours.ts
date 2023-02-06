export interface Hours {
  readonly id: number
  readonly day_of_week:
    | "Sunday"
    | "Monday"
    | "Tuesday"
    | "Wednesday"
    | "Thursday"
    | "Friday"
    | "Saturday"
  readonly close_time: string
  readonly open_time: string
  readonly sort: number
}
