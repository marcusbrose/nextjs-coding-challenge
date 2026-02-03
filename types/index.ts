// public representation of a media item
export interface MediaItemRaw {
  suchtext: string
  bildnummer: string
  fotografen: string
  datum: string
  hoehe: string
  breite: string
}

// for internal indexed representation
export interface MediaItemIndexed extends MediaItemRaw {
  dateISO: string | null
  tokens: string[]
  restrictions: string[]
}
