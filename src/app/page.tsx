'use client'

import Section from '@/components/Section'

export default function Home() {
  return (
    <main className="container relative flex h-screen snap-y snap-mandatory flex-col overflow-y-scroll scroll-smooth bg-slate-900">
      <Section title="Form fields" color="bg-lime-100" />
      <Section title="Field configuration" color="bg-amber-100" />
      <Section title="Generated form" color="bg-cyan-100" />
    </main>
  )
}
