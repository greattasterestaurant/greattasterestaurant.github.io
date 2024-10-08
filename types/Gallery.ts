import type { Relation } from './Relation'
import type { Image } from './Image'
import type { Food } from './Food'

export interface GalleryItem {
  readonly id: string
  readonly name: string
  readonly sort: number
  readonly food: Relation<Food> | null
  readonly image: Relation<Image> | null
}
