"use client"

import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxItem,
  ComboboxList,
  ComboboxValue,
  useComboboxAnchor
} from "@/components/ui/combobox"
import { Field, FieldLabel } from "@/components/ui/field"

// improve by fetching dynamically from API endpoint
// or use facet filters from search index
const restrictions = [
  "GER",
  "SUI",
  "AUT",
] as const

type Props = {
  value: string[] | null
  onChange: (value: string[] | null) => void
}

export default function ({
  value,
  onChange = () => { },
}: Props) {
  const anchor = useComboboxAnchor()
  return (
    <Field>
      <FieldLabel htmlFor="restrictions">Restriction</FieldLabel>
      <Combobox id="restrictions" items={restrictions} multiple value={value} onValueChange={onChange}>
        <ComboboxChips ref={anchor} className="w-full max-w-xs">
          <ComboboxValue>
            {(values) => (
              <>
                {values.map((value: string) => (
                  <ComboboxChip key={value}>{value}</ComboboxChip>
                ))}
                <ComboboxChipsInput />
              </>
            )}
          </ComboboxValue>
        </ComboboxChips>
        <ComboboxContent anchor={anchor}>
          <ComboboxEmpty>No items found.</ComboboxEmpty>
          <ComboboxList>
            {(item) => (
              <ComboboxItem key={item} value={item}>
                {item}
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </Field>
  )
}
