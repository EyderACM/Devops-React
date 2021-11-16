import * as React from 'react'
import Button from '@mui/material/Button'
import TextField, { TextFieldProps } from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import { FormControlLabel, Skeleton, Switch } from '@mui/material'
import { Controller, UseFormReturn } from 'react-hook-form'
import { FormCourse } from 'pages/dashboard/courses'
import LoadingButton from '@mui/lab/LoadingButton'
import { If, Then, Else } from 'react-if'

interface ICourseDialog {
  open: boolean
  setOpen: (value: boolean) => void
  onSubmit: any
  formControl: UseFormReturn<FormCourse>['control']
  errors: UseFormReturn['formState']['errors']
  isSubmitting: boolean
  editMode: boolean
}

interface IControlledTextField {
  formControl: ICourseDialog['formControl']
  name: keyof FormCourse
  label: string
  errors: ICourseDialog['errors']
  isBeingEdited: boolean
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
  isBeingEdited,
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

function CourseDialog({
  open,
  setOpen,
  onSubmit,
  formControl,
  errors,
  isSubmitting,
  editMode,
}: ICourseDialog) {
  const isFormBeingEdited = React.useMemo(() => !!editMode, [editMode])
  const textFieldConfig = {
    formControl: formControl,
    errors,
    isBeingEdited: isFormBeingEdited,
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Crear un curso</DialogTitle>
      <DialogContent>
        <ControlledTextField
          name="courseName"
          label="Nombre del curso"
          {...textFieldConfig}
        />
        <ControlledTextField
          name="courseTagId"
          label="Clave del curso"
          {...textFieldConfig}
        />
        <ControlledTextField
          name="professorName"
          label="Nombre del profesor"
          {...textFieldConfig}
        />
        <ControlledTextField
          name="classRoomCode"
          label="Clave del aula"
          {...textFieldConfig}
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
        <LoadingButton
          variant="contained"
          onClick={onSubmit}
          loading={isSubmitting}
        >
          {isFormBeingEdited ? 'Editar' : 'Crear'}
        </LoadingButton>
      </DialogActions>
    </Dialog>
  )
}

export default CourseDialog
