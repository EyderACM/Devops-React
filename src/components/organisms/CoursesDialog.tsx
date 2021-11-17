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
import IEntityDialog from 'types/entityDialog'
import ControlledTextField from 'components/molecules/ControlledTextField'

type ICourseDialog = IEntityDialog<FormCourse>

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
