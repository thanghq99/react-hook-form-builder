'use client'

import Section from '@/components/Section'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useFieldListContext } from '@/hooks/useFieldList'
import { DEFAULT_VALUES } from '@/interfaces/FieldListContextType'
import { Field } from '@/interfaces/formFieldList'
import { EInputType } from '@/lib/InputTypes'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowRightLeft, PlusCircle } from 'lucide-react'
import React, { FC, useEffect, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { v4 as uuidv4 } from 'uuid'
import * as z from 'zod'

const formSchema = z.object({
  name: z
    .string()
    .min(1, { message: 'Field name must have atleast one character' }),
  type: EInputType,
  required: z.boolean(),
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
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 grow flex flex-col"
        >
          <Tabs defaultValue="common" className="w-full">
            <TabsList className="w-full">
              <TabsTrigger className="w-1/2" value="common">
                Common
              </TabsTrigger>
              <TabsTrigger className="w-1/2" value="advance">
                Advance
              </TabsTrigger>
            </TabsList>
            <TabsContent value="common">
              <div className="h-full w-full px-2">
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
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Field type</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a type for this field" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {EInputType.options.map((type) => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="required"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between">
                      <FormLabel>Required field?</FormLabel>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          aria-readonly
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </TabsContent>
            <TabsContent value="advance">Change your advance here.</TabsContent>
          </Tabs>
          <div className="flex justify-end space-x-2  grow">
            <Button type="button">
              <ArrowRightLeft /> Switch form
            </Button>

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
