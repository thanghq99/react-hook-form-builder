import { FieldItemProps } from '@/interfaces/formFieldList'
import { FileEdit, Hand, Move, Trash2 } from 'lucide-react'
import React, { FC } from 'react'
import { useHover } from '@mantine/hooks'
import { Button } from '../ui/button'

const FieldItem: FC<FieldItemProps> = ({ field, selectField, removeField }) => {
  const { hovered, ref } = useHover()

  return (
    <div
      ref={ref}
      className="flex items-center justify-between gap-2 rounded-lg border bg-white p-3"
    >
      {hovered ? (
        <Hand className="shrink-0 hover:cursor-pointer" />
      ) : (
        <Move className="shrink-0" />
      )}
      <h2 className="block w-full">{field.name}</h2>
      <div className="flex gap-2">
        <Button
          variant="secondary"
          className="hover:cursor-pointer"
          onClick={() => selectField(field.id)}
        >
          <FileEdit className="md:mr-2" />
          <p className="hidden md:inline">Edit</p>
        </Button>

        <Button
          variant="destructive"
          className="hover:cursor-pointer"
          onClick={() => removeField(field.id)}
        >
          <Trash2 className="md:mr-2" />
          <p className="hidden md:inline">Remove</p>
        </Button>
      </div>
    </div>
  )
}

export default FieldItem
