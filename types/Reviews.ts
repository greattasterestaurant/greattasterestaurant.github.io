export interface Review {
  readonly id: number
  readonly author: string
  readonly rating: number
  readonly date: string
  readonly body: string

  readonly __table: "reviews"
}
