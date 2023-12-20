import React, { FC } from 'react'
import Section from '../Section'
import { FormFieldListProps } from '@/interfaces/formFieldList'

const FormFieldList: FC<FormFieldListProps> = ({ fieldList }) => {
  return (
    <Section
      title="Form fields"
      color="bg-lime-100"
      infos={[
        'You can start adding fields with Field configuration',
        'You can save the form config by clicking the Save configuration at the bottom',
      ]}
    >
      {fieldList.map((field) => (
        <p key={field.id}>
          {field.id} - {field.name}
        </p>
      ))}
    </Section>
  )
}

export default FormFieldList
