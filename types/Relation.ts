export interface Relation<T extends { __table: string }> {
  readonly data: T
  readonly meta: {
    readonly table: T["__table"]
    readonly type: string
  }
}
