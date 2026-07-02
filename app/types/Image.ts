export interface Image {
  readonly id: number
  readonly name: string
  readonly url: string
  readonly thumbnail_url: string
  readonly old_thumbnail_url: string

  readonly __table: 'directus_files'
}
