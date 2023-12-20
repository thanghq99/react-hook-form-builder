'use client'

import Section from '@/components/Section'
import FormFieldList from '@/components/formFieldList'
import FieldConfiguration from '@/components/fieldConfiguration'
import { Field } from '@/interfaces/formFieldList'
import { useState } from 'react'
import cloneDeep from 'lodash/cloneDeep'

export default function Home() {
  const [fieldList, setFieldList] = useState<Field[]>([])

  const addField = (newField: Field) => {
    const newList = cloneDeep(fieldList)
    newList.push(newField)
    setFieldList(newList)
  }

  return (
    <main className="container relative flex h-screen snap-y snap-mandatory flex-col overflow-y-scroll scroll-smooth bg-slate-900">
      <FormFieldList fieldList={fieldList} setFieldList={setFieldList} />
      <FieldConfiguration addField={addField} />
      <Section
        title="Generated form"
        color="bg-cyan-100"
        infos={['Form will be automatically generated when you make changes']}
      />
    </main>
  )
}
