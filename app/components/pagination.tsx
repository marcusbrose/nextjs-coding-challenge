import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

type Props = {
  page: number
  totalPages: number
  onPageChange: (page: number) => void // improvement: remove this prop and use router instead
}

function getVisiblePages(page: number, totalPages: number) {
  const delta = 1 // wie viele Seiten links/rechts der aktuellen
  const pages: number[] = []

  const start = Math.max(2, page - delta)
  const end = Math.min(totalPages - 1, page + delta)

  for (let i = start; i <= end; i++) {
    pages.push(i)
  }

  return pages
}

export default function PaginationComponent({
  page,
  totalPages,
  onPageChange,
}: Props) {
  if (totalPages <= 1) return null

  const visiblePages = getVisiblePages(page, totalPages)
  const showLeftEllipsis = visiblePages[0] > 2
  const showRightEllipsis =
    visiblePages[visiblePages.length - 1] < totalPages - 1

  return (
    <Pagination>
      <PaginationContent>

        {/* Previous */}
        <PaginationItem>
          <PaginationPrevious
            // href={page > 1 ? `?page=${page - 1}` : undefined}
            onClick={() => page > 1 && onPageChange(page - 1)}
            aria-disabled={page === 1}
          />
        </PaginationItem>

        {/* First page */}
        <PaginationItem>
          <PaginationLink
            // href="?page=1"
            onClick={() => onPageChange(1)}
            isActive={page === 1}
          >
            1
          </PaginationLink>
        </PaginationItem>

        {/* Left ellipsis */}
        {showLeftEllipsis && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {/* Middle pages */}
        {visiblePages.map((p) => (
          <PaginationItem key={p}>
            <PaginationLink
              // href={`?page=${p}`}
              onClick={() => onPageChange(p)}
              isActive={page === p}
            >
              {p}
            </PaginationLink>
          </PaginationItem>
        ))}

        {/* Right ellipsis */}
        {showRightEllipsis && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {/* Last page */}
        {totalPages > 1 && (
          <PaginationItem>
            <PaginationLink
              // href={`?page=${totalPages}`}
              onClick={() => onPageChange(totalPages)}
              isActive={page === totalPages}
            >
              {totalPages}
            </PaginationLink>
          </PaginationItem>
        )}

        {/* Next */}
        <PaginationItem>
          <PaginationNext
            // href={page < totalPages ? `?page=${page + 1}` : undefined}
            onClick={() => page < totalPages && onPageChange(page + 1)}
            aria-disabled={page === totalPages}
          />
        </PaginationItem>

      </PaginationContent>
    </Pagination>
  )
}
