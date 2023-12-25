import { z } from 'zod'

export const EInputType = z.enum([
  'button',
  'checkbox',
  'color',
  'date',
  'email',
  'file',
  'image',
  'number',
  'password',
  'radio',
  'range',
  'tel',
  'text',
])

export type IInputType = z.infer<typeof EInputType>
