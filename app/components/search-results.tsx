import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table"
import { MediaItemRaw } from "@/types"

type Props = {
  results: MediaItemRaw[]
}

export default function({
  results,
}: Props) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>No.</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Credit</TableHead>
          <TableHead>Date</TableHead>
          {/* <TableHead className="text-right">Match</TableHead> */}
        </TableRow>
      </TableHeader>
      <TableBody>
        {results.map((result) => (
          <TableRow key={result.bildnummer}>
            <TableCell className="w-1/6 font-medium">{result.bildnummer}</TableCell>
            <TableCell className="w-3/6 max-w-80 truncate">{result.suchtext}</TableCell>
            <TableCell className="w-2/6">{result.fotografen}</TableCell>
            <TableCell className="w-1/6">{result.datum}</TableCell>
            {/* <TableCell className="text-right">{result.totalAmount}</TableCell> */}
          </TableRow>
        ))}
        {results.length === 0 && (  
          <TableRow>
            <TableCell colSpan={3} className="text-center">
              No results found.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}
