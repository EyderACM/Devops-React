import * as React from 'react'
import TextField, { TextFieldProps } from '@mui/material/TextField'
import { Controller, Path } from 'react-hook-form'
import IEntityDialog from 'types/entityDialog'

interface IControlledTextField<T> {
  formControl: IEntityDialog<T>['formControl']
  name: Path<T>
  label: string
  errors: IEntityDialog<T>['errors']
  isBeingEdited: boolean
}

export const defaultConfig: TextFieldProps = {
  type: 'text',
  fullWidth: true,
  variant: 'standard',
  autoFocus: true,
  margin: 'dense',
  required: true,
}

function ControlledTextField<T>({
  formControl,
  name,
  label,
  errors,
  isBeingEdited,
}: IControlledTextField<T>) {
  return (
    <Controller
      control={formControl}
      name={name}
      render={({ field }) => (
        <TextField
          id={field.name}
          label={label}
          error={Boolean(errors[field.name])}
          helperText={errors[field.name]?.message}
          disabled={
            !(!isBeingEdited || (field.value !== undefined && isBeingEdited))
          }
          InputLabelProps={{
            shrink: field.value !== undefined || isBeingEdited,
          }}
          {...field}
          {...defaultConfig}
        />
      )}
    />
  )
}

export default ControlledTextField
