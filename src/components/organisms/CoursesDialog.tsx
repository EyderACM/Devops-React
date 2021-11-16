import * as React from 'react'
import Button from '@mui/material/Button'
import TextField, { TextFieldProps } from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import { FormControlLabel, Switch } from '@mui/material'
import { Controller, UseFormReturn } from 'react-hook-form'
import { FormCourse } from 'pages/dashboard/courses'

interface ICourseDialog {
  open: boolean
  setOpen: (value: boolean) => void
  onSubmit: any
  formControl: UseFormReturn<FormCourse>['control']
  errors: UseFormReturn['formState']['errors']
}

interface IControlledTextField {
  formControl: ICourseDialog['formControl']
  name: keyof FormCourse
  label: string
  errors: ICourseDialog['errors']
}

const defaultConfig: TextFieldProps = {
  type: 'text',
  fullWidth: true,
  variant: 'standard',
  autoFocus: true,
  margin: 'dense',
  required: true,
}

function ControlledTextField({
  formControl,
  name,
  label,
  errors,
}: IControlledTextField) {
  return (
    <Controller
      control={formControl}
      name={name}
      render={({ field }) => (
        <TextField
          id={field.name}
          label={label}
          error={Boolean(errors[field.name])}
          {...field}
          {...defaultConfig}
        />
      )}
    />
  )
}

function CourseDialog({
  open,
  setOpen,
  onSubmit,
  formControl,
  errors,
}: ICourseDialog) {
  const handleClose = () => {
    setOpen(false)
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Crear un curso</DialogTitle>
      <DialogContent>
        <ControlledTextField
          name="courseName"
          formControl={formControl}
          label="Nombre del curso"
          errors={errors}
        />
        <ControlledTextField
          name="courseTagId"
          formControl={formControl}
          label="Clave del curso"
          errors={errors}
        />
        <ControlledTextField
          name="professorName"
          formControl={formControl}
          label="Nombre del profesor"
          errors={errors}
        />
        <ControlledTextField
          name="classRoomCode"
          formControl={formControl}
          label="Clave del aula"
          errors={errors}
        />
        <Controller
          control={formControl}
          name="hasProjector"
          defaultValue={false}
          render={({ field }) => (
            <FormControlLabel
              control={
                <Switch
                  checked={field.value}
                  value={field.value || false}
                  onChange={(event, value) => field.onChange(value)}
                  name="hasProjector"
                />
              }
              label="Tiene projector?"
            />
          )}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancelar</Button>
        <Button onClick={onSubmit}>Crear</Button>
      </DialogActions>
    </Dialog>
  )
}

export default CourseDialog
