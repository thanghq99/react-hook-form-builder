'use client'

import { useToast } from '@/components/ui/use-toast'
import { FieldListContext } from '@/contexts/FieldListContext'
import { Field } from '@/interfaces/formFieldList'
import cloneDeep from 'lodash/cloneDeep'
import { FC, PropsWithChildren, useState } from 'react'

export const FieldListProvider: FC<PropsWithChildren> = ({ children }) => {
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
    setSelectedField(null)
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
    <FieldListContext.Provider
      value={{
        fieldList,
        setFieldList,
        selectedField,
        selectField,
        addField,
        updateField,
        removeField,
      }}
    >
      {children}
    </FieldListContext.Provider>
  )
}
