import { Relation } from './Relation'

export interface Menu {
  readonly id: number
  readonly name: string
  readonly parent: Relation<Menu> | null
  readonly description: string
  readonly sort: number

  readonly __table: 'menus'
}
