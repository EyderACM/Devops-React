import * as React from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import { TextField, MenuItem } from '@mui/material'
import { Controller } from 'react-hook-form'
import LoadingButton from '@mui/lab/LoadingButton'
import IEntityDialog from 'types/entityDialog'
import ControlledTextField from 'components/molecules/ControlledTextField'
import { FormStudent } from 'pages/dashboard/students'
import { defaultConfig } from 'components/molecules/ControlledTextField'
import { Course } from 'pages/dashboard/courses'

type IStudentDialog = IEntityDialog<FormStudent> & { courses: Course[] }

function StudentsDialog({
  open,
  setOpen,
  onSubmit,
  formControl,
  errors,
  isSubmitting,
  editMode,
  courses,
}: IStudentDialog) {
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
      <DialogTitle>Registrar un estudiante</DialogTitle>
      <DialogContent>
        <ControlledTextField
          name="firstNames"
          label="Primer nombre"
          {...textFieldConfig}
        />
        <ControlledTextField
          name="lastNames"
          label="Apellidos"
          {...textFieldConfig}
        />
        <ControlledTextField
          name="birthDate"
          label="Fecha de nacimiento"
          {...textFieldConfig}
        />
        <Controller
          key="sex"
          name="sex"
          control={formControl}
          rules={{ required: true }}
          render={({ field }) => (
            <TextField
              {...field}
              {...defaultConfig}
              value={field.value || ''}
              id={field.name}
              label="Sexo"
              error={Boolean(errors[field.name])}
              helperText={errors[field.name]?.message}
              autoComplete="sex"
              select
              disabled={
                !(
                  !isFormBeingEdited ||
                  (field.value !== undefined && isFormBeingEdited)
                )
              }
              InputLabelProps={{
                shrink: field.value !== undefined || isFormBeingEdited,
              }}
            >
              {['M', 'F', 'Otro'].map((value) => (
                <MenuItem key={value} value={value}>
                  {value}
                </MenuItem>
              ))}
            </TextField>
          )}
        />
        <ControlledTextField
          name="enrollmentDate"
          label="Fecha de inscripción"
          {...textFieldConfig}
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

export default StudentsDialog
