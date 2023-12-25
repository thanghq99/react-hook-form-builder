import { IInputType } from '@/lib/InputTypes'
import { Dispatch, SetStateAction } from 'react'

export interface Field {
  id: string
  name: string
  type: IInputType
  required: boolean
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
