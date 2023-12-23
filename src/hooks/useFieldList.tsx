import { FieldListContext } from '@/contexts/FieldListContext'
import { useContext } from 'react'

export const useFieldListContext = () => {
  const context = useContext(FieldListContext)

  return context
}
