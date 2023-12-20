import React, { FC } from 'react'
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
  name: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
})

const FieldConfiguration: FC<FieldConfigurationProps> = ({ addField }) => {
  const form = useForm<Field>({
    mode: 'onChange',
    defaultValues: {
      id: '',
      name: '',
    },
    resolver: zodResolver(formSchema),
  })

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    addField({ ...values, id: uuidv4() })
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
          <Button type="submit">Submit</Button>
        </form>
      </Form>
      <Button>
        <PlusCircle />
        Add a new field
      </Button>
    </Section>
  )
}

export default FieldConfiguration
