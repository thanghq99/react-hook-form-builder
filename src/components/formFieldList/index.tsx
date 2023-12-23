'use client'

import { useFieldListContext } from '@/hooks/useFieldList'
import React, { FC } from 'react'

import Section from '../Section'
import FieldItem from './FieldItem'

const FormFieldList: FC = () => {
  const { fieldList, selectField, removeField } = useFieldListContext()
  return (
    <Section
      title="Form fields"
      color="bg-lime-100"
      infos={[
        'You can start adding fields with Field configuration',
        'You can save the form config by clicking the Save configuration at the bottom',
      ]}
    >
      <div className="flex flex-col gap-2">
        {fieldList.map((field) => (
          <FieldItem
            key={field.id}
            field={field}
            selectField={selectField}
            removeField={removeField}
          />
        ))}
      </div>
    </Section>
  )
}

export default FormFieldList
