export default async function(params: {
  q: string
  credit: string | null
  dateFrom: string | undefined
  dateTo: string | undefined
  restrictions: string[] | null
  sort: string
  page?: number
}) {
  const searchParams = new URLSearchParams()

  if (params.q) searchParams.set("q", params.q)
  if (params.credit) searchParams.set("credit", params.credit)
  if (params.dateFrom) searchParams.set("from", params.dateFrom)
  if (params.dateTo) searchParams.set("to", params.dateTo)
  if (params.sort) searchParams.set("sort", params.sort)
  if (params.restrictions?.length) {
    searchParams.set("restrictions", params.restrictions.join(","))
  }
  if (params.page) searchParams.set("page", params.page.toString())

  const res = await fetch(`/api/search?${searchParams.toString()}`)

  if (!res.ok) {
    throw new Error("Search failed")
  }

  return res.json()
}
