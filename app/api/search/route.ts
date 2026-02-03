import { trackSearch } from '@/lib/analytics'
import { INDEX } from '@/lib/index'
import { tokenize } from '@/lib/preprocess'
import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'nodejs'

function scoreItem(item: any, queryTokens: string[]) {
  let score = 0

  for (const q of queryTokens) {
    // Exact matches get higher scores
    if (item.bildnummer === q) score += 5
    // Suchtext matches are more important than fotografen
    if (item.suchtext.toLowerCase().includes(q)) score += 3
    if (item.fotografen.toLowerCase().includes(q)) score += 2

    for (const t of item.tokens) {
      // Token matches
      if (t === q) score += 2
      // Prefix matches
      else if (t.startsWith(q)) score += 1
    }
  }

  return score
}

export async function GET(req: NextRequest) {
  // fake error for testing
  if (Math.random() < .1) {
    throw new Error('Search API is disabled temporarily for performance improvements.')
  }
  // Start analytics tracking
  const start = performance.now()

  const { searchParams } = new URL(req.url)
  const q = searchParams.get('q') ?? ''
  const credit = searchParams.get('credit')
  const from = searchParams.get('from')
  const to = searchParams.get('to')
  const restrictions = searchParams.get('restrictions')?.split(',') ?? []
  const sort = searchParams.get('sort') ?? 'relevance'
  const page = Number(searchParams.get('page') ?? 1)
  const pageSize = Number(searchParams.get('pageSize') ?? 10)

  const queryTokens = q.length === 1 ? [q] : tokenize(q)

  // Initial scoring
  let results = INDEX.map(item => ({
    item,
    score: q ? scoreItem(item, queryTokens) : 0,
  })).filter(r => (q ? r.score > 0 : true))

  // Credit filter
  if (credit) {
    results = results.filter(r =>
      r.item.fotografen.includes(credit)
    )
  }

  // Date range filter
  if (from || to) {
    results = results.filter(r => {
      const d = r.item.dateISO
      if (!d) return false
      if (from && d < from) return false
      if (to && d > to) return false
      return true
    })
  }

  // Restrictions filter
  if (restrictions.length) {
    results = results.filter(r =>
      restrictions.every(res =>
        r.item.restrictions.includes(res)
      )
    )
  }

  // Sorting
  results.sort((a, b) => {
    if (sort === 'date_asc') {
      return (a.item.dateISO ?? '').localeCompare(b.item.dateISO ?? '')
    }
    if (sort === 'date_desc') {
      return (b.item.dateISO ?? '').localeCompare(a.item.dateISO ?? '')
    }
    return b.score - a.score
  })

  const total = results.length
  const offset = (page - 1) * pageSize
  const responseTime = Math.round(performance.now() - start)

  // Track analytics
  const { averageResponseTime } = trackSearch(q, responseTime)

  return NextResponse.json({
    items: results.slice(offset, offset + pageSize).map(r => {
      const { item: { restrictions, tokens, dateISO, suchtext, ...item } } = r
      return {
        ...item,
        suchtext: suchtext.split(' PUBLICATIONx').at(0) || suchtext,
      }
    }),
    page,
    pageSize,
    total,
    totalPages: Math.ceil(total / pageSize),
    responseTime,
    averageResponseTime,
  })
}
