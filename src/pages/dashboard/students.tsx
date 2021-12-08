import { Fragment, useEffect, useMemo, useState } from 'react'
import Grid from '@mui/material/Grid'
import * as Yup from 'yup'
import { withIronSessionSsr } from 'iron-session/next'
import withoutUserSession from 'utils/serverSide/withoutUserSession'
import { sessionOptions } from 'lib/session'
import DashboardWrapper from 'components/molecules/DashboardWrapper'
import { Paper, Container, Button } from '@mui/material'
import { InferGetServerSidePropsType } from 'next'
import Students from 'components/molecules/Students'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup/dist/yup'
import StudentDialog from 'components/organisms/StudentsDialog'
import DeleteDialog from 'components/organisms/DeleteDialog'
import requiredString from 'utils/functions/requiredString'
import useAuthenticatedSWR from 'hooks/useAuthenticatedSWR'
import { Course } from './courses'

export interface Student {
  enrollmentId: number
  firstNames: string
  lastNames: string
  birthDate: Date
  sex: string
  enrollmentDate: Date
  course: Course
}

export type FormStudent = Omit<Student, 'enrollmentId' | 'course'> & {
  courseId: number
}

const studentSchema: Yup.SchemaOf<FormStudent> = Yup.object().shape({
  firstNames: requiredString('El nombre es requerido'),
  lastNames: requiredString('Los apellidos son requeridos'),
  birthDate: Yup.date().required('La fecha es requerida'),
  sex: requiredString('Definir el sexo es requerido'),
  enrollmentDate: Yup.date().required('La fecha es requerida'),
  courseId: Yup.number().required('El curso es requerido'),
})

function StudentsDashboard({
  user,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const authorization = useMemo(() => user?.login, [user])
  const [editedId, setEditedId] = useState<number | undefined>(undefined)
  const { data: courses } = useAuthenticatedSWR<Course>({
    path: 'courses',
    token: authorization,
  })
  const { data: students, mutate } = useAuthenticatedSWR<Student>({
    path: 'students',
    token: authorization,
  })
  const [openStudentDialog, setOpenStudentDialog] = useState<boolean>(false)
  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false)
  const [isDeletingStudent, setIsDeletingStudent] = useState<boolean>(false)
  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormStudent>({
    resolver: yupResolver(studentSchema),
  })

  useEffect(() => {
    if (openStudentDialog === false) {
      reset({})
      setEditedId(undefined)
    }
  }, [openStudentDialog])

  const onSubmit = handleSubmit(async (data) => {
    const method = editedId ? 'PUT' : 'POST'
    const baseUrl = `http://${process.env.NEXT_PUBLIC_DEVOPS_API_HOST}:8080/api/students`

    const requestUrl = editedId ? `${baseUrl}/${editedId}` : baseUrl
    const { course, ...restOfData } = data as any

    await fetch(requestUrl, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${authorization}` || '',
      },
      body: JSON.stringify({ ...restOfData, course: restOfData.courseId }),
    })
    mutate()
    setOpenStudentDialog(false)
    reset({})
  })

  const onClickStudent = (id: number) => async (e: any) => {
    reset({})
    setEditedId(id)
    setOpenStudentDialog(true)
    const rawStudent = await fetch(`http://${process.env.NEXT_PUBLIC_DEVOPS_API_HOST}:8080/api/students/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${authorization}` || '',
      },
    })
    const student = (await rawStudent.json()) as Student
    reset({ ...student, courseId: student.course.id })
  }

  const onOpenDeleteStudentDialog = (id: number) => async (e: any) => {
    e.stopPropagation()
    setEditedId(id)
    setOpenDeleteDialog(true)
  }

  const onDeleteStudent = async () => {
    setIsDeletingStudent(true)
    try {
      await fetch(`http://${process.env.NEXT_PUBLIC_DEVOPS_API_HOST}:8080/api/students/${editedId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${authorization}` || '',
        },
      })
      mutate()
    } catch (error) {
      console.log(error)
    } finally {
      setEditedId(undefined)
      setIsDeletingStudent(false)
      setOpenDeleteDialog(false)
    }
  }

  return (
    <Fragment>
      <DeleteDialog
        open={openDeleteDialog}
        setOpen={setOpenDeleteDialog}
        onSubmit={onDeleteStudent}
        isSubmitting={isDeletingStudent}
      />
      <StudentDialog
        open={openStudentDialog}
        setOpen={setOpenStudentDialog}
        formControl={control}
        onSubmit={onSubmit}
        errors={errors}
        isSubmitting={isSubmitting}
        editMode={!!editedId}
        courses={courses}
      />
      <DashboardWrapper>
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Grid item xs={12}>
            <Grid container sx={{ pb: 2 }}>
              <Button
                variant="contained"
                onClick={() => setOpenStudentDialog(true)}
              >
                Crear
              </Button>
            </Grid>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
              <Students
                students={students!}
                onRowClick={onClickStudent}
                onRowDelete={onOpenDeleteStudentDialog}
              />
            </Paper>
          </Grid>
        </Container>
      </DashboardWrapper>
    </Fragment>
  )
}

export default StudentsDashboard

export const getServerSideProps = withIronSessionSsr(
  withoutUserSession,
  sessionOptions,
)
