import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { TextInputConfigProps } from '@/interfaces/fieldConfiguration'
import React, { FC } from 'react'

import { Input } from '../ui/input'

const TextInputConfig: FC<TextInputConfigProps> = ({ form }) => {
  return (
    <div>
      <FormField
        control={form.control}
        name="textInput.defaultValue"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Default value</FormLabel>
            <FormControl>
              <Input type="text" placeholder="Default value" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  )
}

export default TextInputConfig
