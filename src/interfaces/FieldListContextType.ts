import { EInputType } from '@/lib/InputTypes'
import { Dispatch, SetStateAction } from 'react'

import { Field } from './formFieldList'

export const DEFAULT_VALUES: Field = {
  id: '',
  name: '',
  type: EInputType.enum.text,
  required: false,
  textInput: {
    defaultValue: undefined,
    min: null,
    minMsg: null,
    max: null,
    maxMsg: null,
    length: null,
    lengthMsg: null,
    email: null,
    emailMsg: null,
    emoji: null,
    emojiMsg: null,
    url: null,
    urlMsg: null,
    uuid: null,
    uuidMsg: null,
    includes: null,
    includesMsg: null,
    startsWith: null,
    startsWithMsg: null,
    endsWith: null,
    endsWithMsg: null,
    datetime: null,
    datetimeMsg: null,
    ip: null,
    ipMsg: null,
  },
}
export interface FieldListContextType {
  fieldList: Field[]
  setFieldList: Dispatch<SetStateAction<Field[]>>
  selectedField: Field | null
  selectField: (id: string) => void
  addField: (newField: Field) => void
  updateField: (updatedField: Field) => void
  removeField: (id: string) => void
}
