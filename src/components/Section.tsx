import { cn } from '@/lib/utils'
import { Info } from 'lucide-react'
import React, { FC, PropsWithChildren } from 'react'

interface SectionProps extends PropsWithChildren {
  title: string
  color: string
  infos?: string[]
}

const Section: FC<SectionProps> = ({ title, color, infos, children }) => {
  return (
    <div
      className={cn(
        'flex flex-col min-h-screen shrink-0 snap-center p-4',
        color
      )}
    >
      <div className="mb-20">
        <h1 className="block pb-2 pt-4 text-2xl font-bold">{title}</h1>
        {infos &&
          infos.map((info, index) => (
            <div className="flex gap-2" key={index}>
              <Info width={20} height={20} className="shrink-0" />
              <p className="grow text-sm">{info}</p>
            </div>
          ))}
      </div>
      {children}
    </div>
  )
}

export default Section
