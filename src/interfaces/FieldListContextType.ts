import { EInputType } from '@/lib/InputTypes'
import { Dispatch, SetStateAction } from 'react'

import { Field } from './formFieldList'

export const DEFAULT_VALUES = {
  id: '',
  name: '',
  type: EInputType.enum.text,
  required: false,
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
