import { UseFormReturn } from 'react-hook-form'

import { Field } from './formFieldList'

export interface FieldConfigurationProps {
  addField: (newField: Field) => void
  updateField: (updatedField: Field) => void
  field: Field | null
}

export interface TextInputConfigProps {
  form: UseFormReturn<Field>
}
