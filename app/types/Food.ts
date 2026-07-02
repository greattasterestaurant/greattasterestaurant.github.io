import type { Relation } from './Relation'
import type { Menu } from './Menus'
import type { Image } from './Image'

export interface Food {
  readonly id: number
  readonly name: string
  readonly description: string
  readonly price: string
  readonly spicy: number
  readonly sort: number
  readonly menu: Relation<Menu> | null
  readonly image: Relation<Image> | null
  readonly __table: 'food'
}
