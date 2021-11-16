import * as React from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import LoadingButton from '@mui/lab/LoadingButton'

interface ICourseDialog {
  open: boolean
  setOpen: (value: boolean) => void
  onSubmit: any
  isSubmitting: boolean
}

function CourseDialog({
  open,
  setOpen,
  onSubmit,
  isSubmitting,
}: ICourseDialog) {
  const handleClose = () => {
    setOpen(false)
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>¿Estas seguro de que deseas eliminar el curso?</DialogTitle>
      <DialogContent></DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancelar</Button>
        <LoadingButton
          variant="contained"
          onClick={onSubmit}
          loading={isSubmitting}
        >
          Eliminar
        </LoadingButton>
      </DialogActions>
    </Dialog>
  )
}

export default CourseDialog
