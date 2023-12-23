'use client'

import { useFieldListContext } from '@/hooks/useFieldList'
import { DEFAULT_VALUES } from '@/interfaces/FieldListContextType'
import { Field } from '@/interfaces/formFieldList'
import { zodResolver } from '@hookform/resolvers/zod'
import { PlusCircle } from 'lucide-react'
import React, { FC, useEffect, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { v4 as uuidv4 } from 'uuid'
import * as z from 'zod'

import Section from '../Section'
import { Button } from '../ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form'
import { Input } from '../ui/input'

const formSchema = z.object({
  name: z
    .string()
    .min(1, { message: 'Field name must have atleast one character' }),
})

const FieldConfiguration: FC = () => {
  const { selectedField, addField, updateField } = useFieldListContext()
  const form = useForm<Field>({
    mode: 'onChange',
    defaultValues: useMemo(() => {
      return selectedField ? selectedField : DEFAULT_VALUES
    }, [selectedField]),
    resolver: zodResolver(formSchema),
  })

  useEffect(() => {
    form.reset(selectedField ? selectedField : DEFAULT_VALUES)
  }, [selectedField, form])

  const onSubmit = () => {
    const formValue = form.getValues()
    if (selectedField) {
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
