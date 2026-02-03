import { Field, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"

type Props = {
  value: string
  onChange: (value: string) => void
}

export default function ({
  value,
  onChange = () => { },
}: Props) {

  const _onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value)
  }

  return (
    <Field>
      <FieldLabel htmlFor="search-query">Search</FieldLabel>
      <Input id="search-query" placeholder="Keywords, ..." value={value} onChange={_onChange} />
    </Field>
  )
}
