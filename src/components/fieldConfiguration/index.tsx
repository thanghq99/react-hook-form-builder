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
import { useToast } from '@/components/ui/use-toast'
import { useFieldListContext } from '@/hooks/useFieldList'
import { DEFAULT_VALUES } from '@/interfaces/FieldListContextType'
import { Field } from '@/interfaces/formFieldList'
import { EInputType } from '@/lib/InputTypes'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowRightLeft, PlusCircle, Settings } from 'lucide-react'
import React, { FC, useEffect, useMemo, useState } from 'react'
import { UseFormReturn, useForm } from 'react-hook-form'
import { v4 as uuidv4 } from 'uuid'
import * as z from 'zod'

import TextInputConfig from './TextInputConfig'

type Tab = 'common' | 'advanced'

const formSchema = z.object({
  name: z
    .string()
    .min(1, { message: 'Field name must have atleast one character' }),
  type: EInputType,
  required: z.boolean(),
  textInput: z
    .object({
      defaultValue: z.string().default('').nullable(),
      min: z
        .number()
        .gte(0, { message: 'Must be 0 or more characters long' })
        .optional()
        .nullable(),
      max: z
        .number()
        .gte(0, { message: 'Must be 0 or more characters long' })
        .optional()
        .nullable(),
      length: z
        .number()
        .gte(0, { message: 'Must be 0 or more characters long' })
        .optional()
        .nullable(),
    })
    .nullable(),
})

const FieldConfiguration: FC = () => {
  const { toast } = useToast()
  const { selectedField, addField, updateField } = useFieldListContext()

  const [selectedTab, setSelectedTab] = useState<Tab>('common')

  const form = useForm<Field>({
    mode: 'onBlur',
    defaultValues: useMemo(() => {
      return selectedField ? selectedField : DEFAULT_VALUES
    }, [selectedField]),
    resolver: zodResolver(formSchema),
  })

  const watchType = form.watch('type')

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

  const onError = () => {
    toast({
      title: 'Please check the configuration again',
      variant: 'destructive',
    })
  }

  const switchAdvancedForm = (form: UseFormReturn<Field>) => {
    switch (watchType) {
      case 'text': {
        return <TextInputConfig form={form} />
      }
      case 'checkbox': {
        return <div>checkbox form</div>
      }
      case 'radio': {
        return <div>radio form</div>
      }
      case 'file': {
        return <div>file form</div>
      }
      default: {
        return (
          <div>
            <p>This setting is being developed</p>
          </div>
        )
      }
    }
  }

  const selectTab = (tabName: Tab) => {
    setSelectedTab(tabName)
  }

  const switchTab = () => {
    setSelectedTab((prev) => (prev === 'common' ? 'advanced' : 'common'))
  }

  return (
    <Section
      title="Field configuration"
      color="bg-amber-100"
      infos={['This form allows you to create and update form fields']}
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit, onError)}
          className="space-y-4 grow flex flex-col"
        >
          <p className="text-green-600">{JSON.stringify(form.getValues())}</p>
          <Tabs value={selectedTab} className="w-full">
            <TabsList className="w-full">
              <TabsTrigger
                className="w-1/2"
                value="common"
                onClick={() => selectTab('common')}
              >
                Common
              </TabsTrigger>
              <TabsTrigger
                className="w-1/2"
                value="advanced"
                onClick={() => selectTab('advanced')}
              >
                Advanced
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
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </TabsContent>
            <TabsContent value="advanced">
              {switchAdvancedForm(form)}
            </TabsContent>
          </Tabs>
          <div className="flex justify-end space-x-2 grow">
            <Button type="button" onClick={switchTab}>
              <ArrowRightLeft className="mr-2" /> Switch form
            </Button>

            {form.getValues('id') ? (
              <Button type="submit">
                <Settings className="mr-2" />
                Update
              </Button>
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
