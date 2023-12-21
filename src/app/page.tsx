'use client'

import Section from '@/components/Section'
import FormFieldList from '@/components/formFieldList'
import FieldConfiguration, {
  DEFAULT_VALUES,
} from '@/components/fieldConfiguration'
import { Field } from '@/interfaces/formFieldList'
import { useState } from 'react'
import cloneDeep from 'lodash/cloneDeep'
import { useToast } from '@/components/ui/use-toast'

export default function Home() {
  const [fieldList, setFieldList] = useState<Field[]>([])
  const [selectedField, setSelectedField] = useState<Field | null>(null)
  const { toast } = useToast()

  const selectField = (id: string) => {
    const selectedField = fieldList.find((field) => field.id === id) || null
    setSelectedField(selectedField)
  }

  const addField = (newField: Field) => {
    if (isUsedName(newField.name)) return
    const newList = cloneDeep(fieldList)
    newList.push(newField)
    setFieldList(newList)
    setSelectedField(DEFAULT_VALUES)
  }

  const updateField = (updatedField: Field) => {
    if (isUsedName(updateField.name)) return
    const newList = cloneDeep(fieldList)
    const updatedFieldIndex = newList.findIndex(
      (field) => field.id === updatedField.id
    )
    newList.splice(updatedFieldIndex, 1, updatedField)
    setFieldList(newList)
    setSelectedField(null)
  }

  const removeField = (id: string) => {
    const newList = cloneDeep(fieldList)
    const deletedFieldIndex = newList.findIndex((field) => field.id === id)
    newList.splice(deletedFieldIndex, 1)
    setFieldList(newList)
  }

  const isUsedName = (name: string) => {
    const existingFieldNames = fieldList.map((field) => field.name)
    if (existingFieldNames.includes(name)) {
      toast({
        title: 'This name has already been used',
        variant: 'destructive',
      })
      return true
    }
    return false
  }

  return (
    <main className="container relative flex h-screen snap-y snap-mandatory flex-col overflow-y-scroll scroll-smooth bg-slate-900">
      <FormFieldList
        fieldList={fieldList}
        setFieldList={setFieldList}
        selectField={selectField}
        removeField={removeField}
      />
      <FieldConfiguration
        addField={addField}
        updateField={updateField}
        field={selectedField}
      />
      <Section
        title="Generated form"
        color="bg-cyan-100"
        infos={['Form will be automatically generated when you make changes']}
      />
    </main>
  )
}
