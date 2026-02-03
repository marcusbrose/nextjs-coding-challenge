import raw from '@/data/media.json'
import { MediaItemIndexed, MediaItemRaw } from '@/types/index'
import {
  extractRestrictions,
  parseDate,
  tokenize,
} from './preprocess'

const rawExtended = [...Array(400)].reduce((acc, _, i) => {
// const rawExtended = [...Array(10)].reduce((acc, _, i) => {
  // add some random data
  raw.map(item => acc.push({
    ...item,
    suchtext: item.suchtext.includes('PUBLICATIONxINxGERxSUIxAUTxONLY')
     ? item.suchtext
     : `${item.suchtext} PUBLICATIONxINx${(['GER', 'SUI', 'AUT'].at(i % 3))}xONLY`,
    bildnummer: i === 0 ? item.bildnummer : ('0000000000'+(acc.length + 1)).slice(-10),
    datum: i % 3 === 0 ? '02.02.2026' : item.datum,
  }))
  return acc
}, [] as typeof raw)

export const INDEX: MediaItemIndexed[] = rawExtended.map((item: MediaItemRaw) => ({
  ...item,
  dateISO: parseDate(item.datum),
  tokens: [
    ...tokenize(item.suchtext),
    ...tokenize(item.fotografen),
    item.bildnummer,
  ],
  restrictions: extractRestrictions(item.suchtext),
}))
