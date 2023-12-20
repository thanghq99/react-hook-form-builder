import React, { FC, PropsWithChildren } from 'react'
import { twMerge } from 'tailwind-merge'

interface SectionProps extends PropsWithChildren {
  title: string
  color: string
}

const Section: FC<SectionProps> = ({ title, color, children }) => {
  return (
    <div className={twMerge('min-h-screen shrink-0 snap-center px-2', color)}>
      <h1 className="block px-2 py-8 text-2xl">{title}</h1>
      {children}
    </div>
  )
}

export default Section
