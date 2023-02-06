import { Relation } from "./Relation"
import { Image } from "./Image"
import { Food } from "./Food"

export interface GalleryItem {
  readonly id: string
  readonly name: string
  readonly sort: number
  readonly food: Relation<Food> | null
  readonly image: Relation<Image> | null
}
