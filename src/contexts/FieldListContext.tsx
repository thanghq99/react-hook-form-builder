'use client'

import { FieldListContextType } from '@/interfaces/FieldListContextType'
import { createContext } from 'react'

export const FieldListContext = createContext<FieldListContextType>(null!)
