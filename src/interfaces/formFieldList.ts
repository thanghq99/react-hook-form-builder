import { IInputType } from '@/lib/InputTypes'
import { Dispatch, SetStateAction } from 'react'

export interface Field {
  id: string
  name: string
  type: IInputType
  required: boolean
  textInput: {
    defaultValue?: string
    min: number | null
    minMsg: string | null
    max: number | null
    maxMsg: string | null
    length: number | null
    lengthMsg: string | null
    email: boolean | null
    emailMsg: string | null
    url: boolean | null
    urlMsg: string | null
    emoji: boolean | null
    emojiMsg: string | null
    uuid: boolean | null
    uuidMsg: string | null
    includes: string | null
    includesMsg: string | null
    startsWith: string | null
    startsWithMsg: string | null
    endsWith: string | null
    endsWithMsg: string | null
    datetime: boolean | null
    datetimeMsg: string | null
    ip: boolean | null
    ipMsg: string | null
  } | null
}

export interface FormFieldListProps {
  fieldList: Field[]
  setFieldList: Dispatch<SetStateAction<Field[]>>
  selectField: (id: string) => void
  removeField: (id: string) => void
}

export interface FieldItemProps {
  field: Field
  selectField: (id: string) => void
  removeField: (id: string) => void
}
