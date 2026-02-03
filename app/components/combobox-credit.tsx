"use client"

import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox"
import { Field, FieldLabel } from "@/components/ui/field"

// improve by fetching dynamically from API endpoint
// or use facet filters from search index
const credits = [
  "IMAGO / United Archives International",
  "IMAGO / teutopress",
  "IMAGO / Travel Photography",
  "IMAGO / Wildlife Images",
  "IMAGO / Concert Photography",
  "IMAGO / Sports Images",
  "IMAGO / Cityscapes",
  "IMAGO / Portrait Photography",
  "IMAGO / Landscape Photography",
  "IMAGO / Event Photography",
  "IMAGO / Macro Photography",
  "IMAGO / Drone Photography",
  "IMAGO / Nature Photography",
  "IMAGO / Aerial Photography",
  "IMAGO / Food Photography",
  "IMAGO / City Photography",
] as const

type Props = {
  value: string | null
  onChange: (value: string | null) => void
}

export default function ({
  value,
  onChange = () => { },
}: Props) {
  return (
    <Field>
      <FieldLabel htmlFor="credit">Credit</FieldLabel>
      <Combobox id="credit" items={credits} value={value} onValueChange={onChange}>
        <ComboboxInput placeholder="Select" />
        <ComboboxContent>
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
