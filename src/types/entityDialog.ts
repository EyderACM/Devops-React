import { UseFormReturn } from 'react-hook-form'

interface IEntityDialog<T> {
  open: boolean
  setOpen: (value: boolean) => void
  onSubmit: any
  formControl: UseFormReturn<T>['control']
  errors: UseFormReturn['formState']['errors']
  isSubmitting: boolean
  editMode: boolean
}

export default IEntityDialog
