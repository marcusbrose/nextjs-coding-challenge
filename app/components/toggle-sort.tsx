import { Field, FieldLabel } from "@/components/ui/field"
import { Button } from "@/components/ui/button"
import { ArrowUp, ArrowDown } from "lucide-react"
import { MouseEvent } from "react"

type Props = {
  value: 'default' | 'date_desc' | 'date_asc'
  onChange: (value: 'default' | 'date_desc' | 'date_asc') => void
}

export default function ({
  value,
  onChange = () => { },
}: Props) {
  const onClick = (e: MouseEvent) => {
    e.preventDefault()
    switch (value) {
      case 'default':
        onChange('date_desc')
        break
      case 'date_desc':
        onChange('date_asc')
        break
      case 'date_asc':
        onChange('default')
        break
    }
  }
  return (
    <Field className="w-20">
      <FieldLabel htmlFor="sort">Sort</FieldLabel>
      <Button type="button" id="sort" aria-label="Toggle sort options" variant="outline" onClick={onClick} >
        {value === "date_asc" &&
          <>
            Date
            <ArrowUp />
          </>
        }
        {value === "date_desc" &&
          <>
            Date
            <ArrowDown />
          </>
        }
        {value === "default" &&
          <>
            Auto
          </>
        }
      </Button>
    </Field>
  )
}
