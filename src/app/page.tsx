'use client'

import Section from '@/components/Section'
import FieldConfiguration from '@/components/fieldConfiguration'
import FormFieldList from '@/components/formFieldList'

export default function Home() {
  return (
    <main className="container relative flex h-screen snap-y snap-mandatory flex-col overflow-y-scroll scroll-smooth bg-slate-900">
      <FormFieldList />
      <FieldConfiguration />
      <Section
        title="Generated form"
        color="bg-cyan-100"
        infos={['Form will be automatically generated when you make changes']}
      />
    </main>
  )
}
