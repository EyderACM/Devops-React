import 'date-fns'
import * as React from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import { TextField, MenuItem, getFormLabelUtilityClasses } from '@mui/material'
import { Controller } from 'react-hook-form'
import LoadingButton from '@mui/lab/LoadingButton'
import IEntityDialog from 'types/entityDialog'
import ControlledTextField from 'components/molecules/ControlledTextField'
import { FormStudent } from 'pages/dashboard/students'
import { defaultConfig } from 'components/molecules/ControlledTextField'
import { Course } from 'pages/dashboard/courses'
import DesktopDatePicker from '@mui/lab/DesktopDatePicker'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import AdapterDateFns from '@mui/lab/AdapterDateFns'

type IStudentDialog = IEntityDialog<FormStudent> & {
  courses: Course[]
}

function DateInput({
  label,
  key,
  name,
  errors,
  isBeingEdited,
  formControl,
}: any) {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Controller
        key={key}
        name={name}
        control={formControl}
        rules={{ required: true }}
        render={({ field }) => (
          <DesktopDatePicker
            {...field}
            label={label}
            inputFormat="MM/dd/yyyy"
            onChange={field.onChange}
            value={field.value || new Date()}
            renderInput={(params) => (
              <TextField
                fullWidth
                required
                variant="standard"
                margin="dense"
                error={Boolean(errors[field.name])}
                helperText={errors[field.name]?.message}
                InputLabelProps={{
                  shrink: true,
                }}
                {...params}
              />
            )}
            disabled={
              !(!isBeingEdited || (field.value !== undefined && isBeingEdited))
            }
          />
        )}
      />
    </LocalizationProvider>
  )
}

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
        <DateInput
          key="birthDate"
          name="birthDate"
          formControl={formControl}
          label="Fecha de nacimiento"
          errors={errors}
          isBeingEdited={isFormBeingEdited}
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
              value={field.value}
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
        <DateInput
          key="enrollmentDate"
          name="enrollmentDate"
          formControl={formControl}
          label="Fecha de inscripción"
          errors={errors}
          isBeingEdited={isFormBeingEdited}
        />

        <Controller
          key="courseId"
          name="courseId"
          control={formControl}
          rules={{ required: true }}
          render={({ field }) => (
            <TextField
              {...field}
              {...defaultConfig}
              value={field.value || ''}
              id={field.name}
              label="Curso seleccionado"
              error={Boolean(errors[field.name])}
              helperText={errors[field.name]?.message}
              autoComplete="course"
              select
              InputLabelProps={{
                shrink: field.value !== undefined || isFormBeingEdited,
              }}
            >
              {courses.map(({ id, courseName }) => (
                <MenuItem key={`${courseName}-${id}`} value={id}>
                  {courseName}
                </MenuItem>
              ))}
            </TextField>
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

export default StudentsDialog
