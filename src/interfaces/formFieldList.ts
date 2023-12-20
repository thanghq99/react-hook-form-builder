import { Dispatch, SetStateAction } from 'react'

export interface Field {
  id: string
  name: string
}

export interface FormFieldListProps {
  fieldList: Field[]
  setFieldList: Dispatch<SetStateAction<Field[]>>
}
