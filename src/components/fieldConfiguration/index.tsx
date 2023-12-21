import React, { FC, useEffect, useMemo } from 'react'
import Section from '../Section'
import { Button } from '../ui/button'
import { PlusCircle } from 'lucide-react'
import { FieldConfigurationProps } from '@/interfaces/fieldConfiguration'
import { useForm } from 'react-hook-form'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form'
import { Input } from '../ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Field } from '@/interfaces/formFieldList'
import { v4 as uuidv4 } from 'uuid'

const formSchema = z.object({
  name: z
    .string()
    .min(1, { message: 'Field name must have atleast one character' }),
})

export const DEFAULT_VALUES = {
  id: '',
  name: '',
}

const FieldConfiguration: FC<FieldConfigurationProps> = ({
  addField,
  updateField,
  field,
}) => {
  const form = useForm<Field>({
    mode: 'onChange',
    defaultValues: useMemo(() => {
      return field ? field : DEFAULT_VALUES
    }, [field]),
    resolver: zodResolver(formSchema),
  })

  useEffect(() => {
    console.log(field)
    form.reset(field ? field : DEFAULT_VALUES)
  }, [field, form])

  const onSubmit = () => {
    const formValue = form.getValues()
    if (field) {
      updateField(formValue)
    } else {
      addField({ ...formValue, id: uuidv4() })
    }
  }

  return (
    <Section
      title="Field configuration"
      color="bg-amber-100"
      infos={['This form allows you to create and update form fields']}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Field name</FormLabel>
                <FormControl>
                  <Input placeholder="Field name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-end">
            {form.getValues('id') ? (
              <Button type="submit">Update</Button>
            ) : (
              <Button type="submit">
                <PlusCircle className="mr-2" />
                Add
              </Button>
            )}
          </div>
        </form>
      </Form>
    </Section>
  )
}

export default FieldConfiguration
