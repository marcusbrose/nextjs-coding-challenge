"use client"

import fetchSearch from "@/lib/api/fetchSearch"
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from "react"
import { DateRange } from "react-day-picker"
import ComboboxCredit from "./components/combobox-credit"
import ComboboxRestrictions from "./components/combobox-restrictions"
import DateRangePicker from "./components/date-range-picker"
import InputSearch from "./components/input-search"
import Pagination from "./components/pagination"
import SearchResults from "./components/search-results"
import ToggleSort from "./components/toggle-sort"
import { useDebounce } from "./hooks/useDebounce"
import {
  AlertCircleIcon,
  LoaderCircleIcon,
} from "lucide-react"
import { Alert, AlertTitle } from "@/components/ui/alert"

export default function Home() {

  // improvement: persist all filters to URL params
  // const searchParams = useSearchParams()
  // const page = parseInt(searchParams.get('page') || '1', 10) || 1
  // ...
  
  const [q, setQ] = useState('')
  const [credit, setCredit] = useState<string | null>(null)
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  })
  const [restrictions, setRestrictions] = useState<string[] | null>([])
  const [sort, setSort] = useState<'default' | 'date_desc' | 'date_asc'>('default')
  const [page, setPage] = useState(1)

  // reset page when filters change
  useEffect(() => {
    setPage(1)
  }, [q, credit, dateRange, restrictions, sort])

  const debouncedQ = useDebounce(q, 300)
  
  const { data, isLoading, isError } = useQuery({
    queryKey: [
      "search",
      debouncedQ,
      credit,
      dateRange?.from,
      dateRange?.to,
      restrictions,
      sort,
      page,
    ],
    queryFn: () =>
      fetchSearch({
        q: debouncedQ,
        credit,
        dateFrom: dateRange?.from?.toISOString().slice(0, 10) ?? undefined,
        dateTo: dateRange?.to?.toISOString().slice(0, 10) ?? undefined,
        restrictions,
        sort,
        page,
      }),
  })

  return (
    <div className="flex flex-col gap-4 max-w-5xl mx-auto p-4">
      <div className="flex flex-col gap-4">
        <form className="contents">
          <div className="flex gap-4">
            <InputSearch value={q} onChange={setQ} />
          </div>
          <div className="flex gap-4">
            <ComboboxCredit value={credit} onChange={setCredit} />
            <DateRangePicker value={dateRange} onChange={setDateRange} />
            <ComboboxRestrictions value={restrictions} onChange={setRestrictions} />
            <div className="w-28">
              <ToggleSort value={sort} onChange={setSort} />
            </div>
          </div>
        </form>
      </div>

      {isLoading && <div className="flex gap-2 justify-center items-center">
        <LoaderCircleIcon className="animate-spin" />
        Loading...
      </div>}

      {isError && <Alert variant="destructive">
        <AlertCircleIcon />
        <AlertTitle>Error loading data</AlertTitle>
      </Alert>}

      {data && !isLoading && !isError &&
        <>
          <SearchResults results={data.items} />
          <Pagination page={data.page} totalPages={data.totalPages} onPageChange={setPage} />
        </>
      }

    </div>
  )
}