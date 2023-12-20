'use client'

import Section from '@/components/Section'

export default function Home() {
  return (
    <main className="container relative flex h-screen snap-y snap-mandatory flex-col overflow-y-scroll scroll-smooth bg-slate-900">
      <Section
        title="Form fields"
        color="bg-lime-100"
        infos={[
          'You can start adding fields with Field configuration',
          'You can save the form config by clicking the Save configuration at the bottom',
        ]}
      />
      <Section
        title="Field configuration"
        color="bg-amber-100"
        infos={['This form allows you to create and update form fields']}
      />
      <Section
        title="Generated form"
        color="bg-cyan-100"
        infos={['Form will be automatically generated when you make changes']}
      />
    </main>
  )
}
