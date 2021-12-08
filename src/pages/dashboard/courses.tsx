import { Fragment, useEffect, useMemo, useState } from 'react'
import Grid from '@mui/material/Grid'
import * as Yup from 'yup'
import { withIronSessionSsr } from 'iron-session/next'
import withoutUserSession from 'utils/serverSide/withoutUserSession'
import { sessionOptions } from 'lib/session'
import DashboardWrapper from 'components/molecules/DashboardWrapper'
import { Paper, Container, Button } from '@mui/material'
import { InferGetServerSidePropsType } from 'next'
import Courses from 'components/molecules/Courses'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup/dist/yup'
import CourseDialog from 'components/organisms/CoursesDialog'
import DeleteDialog from 'components/organisms/DeleteDialog'
import requiredString from 'utils/functions/requiredString'
import useAuthenticatedSWR from 'hooks/useAuthenticatedSWR'

export interface Course {
  id: number
  courseName: string
  courseTagId: string
  professorName: string
  classRoomCode: string
  hasProjector: boolean
}

export type FormCourse = Omit<Course, 'id'>

const coursesSchema: Yup.SchemaOf<FormCourse> = Yup.object().shape({
  courseName: requiredString('El nombre del curso es requerido'),
  courseTagId: requiredString('La clave del curso es requerida'),
  professorName: requiredString('El nombre del profesor es requerido'),
  classRoomCode: requiredString('La clave del aula es requerida'),
  hasProjector: Yup.bool().required('El proyector debe ser determinado'),
})

function CoursesDashboard({
  user,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const authorization = useMemo(() => user?.login, [user])
  const [editedId, setEditedId] = useState<number | undefined>(undefined)
  const { data: courses, mutate } = useAuthenticatedSWR<Course>({
    path: 'courses',
    token: authorization,
  })
  const [openCourseDialog, setOpenCourseDialog] = useState<boolean>(false)
  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false)
  const [isDeletingCourse, setIsDeletingCourse] = useState<boolean>(false)
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormCourse>({
    resolver: yupResolver(coursesSchema),
  })

  useEffect(() => {
    if (openCourseDialog === false) {
      reset({})
      setEditedId(undefined)
    }
  }, [openCourseDialog])

  const onSubmit = handleSubmit(async (data) => {
    const method = editedId ? 'PUT' : 'POST'
    const baseUrl = `http://${process.env.NEXT_PUBLIC_DEVOPS_API_HOST}:8080/api/courses`

    const requestUrl = editedId ? `${baseUrl}/${editedId}` : baseUrl

    await fetch(requestUrl, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${authorization}` || '',
      },
      body: JSON.stringify(data),
    })
    mutate()
    setOpenCourseDialog(false)
    reset({})
  })

  const onClickCourse = (id: number) => async (e: any) => {
    reset({})
    setEditedId(id)
    setOpenCourseDialog(true)
    const rawCourse = await fetch(`http://${process.env.NEXT_PUBLIC_DEVOPS_API_HOST}:8080/api/courses/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${authorization}` || '',
      },
    })
    const course = (await rawCourse.json()) as Course
    reset(course)
  }

  const onOpenDeleteCourseDialog = (id: number) => async (e: any) => {
    e.stopPropagation()
    setEditedId(id)
    setOpenDeleteDialog(true)
  }

  const onDeleteCourse = async () => {
    setIsDeletingCourse(true)
    try {
      await fetch(`http://${process.env.NEXT_PUBLIC_DEVOPS_API_HOST}:8080/api/courses/${editedId}`, {
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
      setIsDeletingCourse(false)
      setOpenDeleteDialog(false)
    }
  }

  return (
    <Fragment>
      <DeleteDialog
        open={openDeleteDialog}
        setOpen={setOpenDeleteDialog}
        onSubmit={onDeleteCourse}
        isSubmitting={isDeletingCourse}
      />
      <CourseDialog
        open={openCourseDialog}
        setOpen={setOpenCourseDialog}
        formControl={control}
        onSubmit={onSubmit}
        errors={errors}
        isSubmitting={isSubmitting}
        editMode={!!editedId}
      />
      <DashboardWrapper>
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Grid item xs={12}>
            <Grid container sx={{ pb: 2 }}>
              <Button
                variant="contained"
                onClick={() => setOpenCourseDialog(true)}
              >
                Crear
              </Button>
            </Grid>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
              <Courses
                courses={courses!}
                onRowClick={onClickCourse}
                onRowDelete={onOpenDeleteCourseDialog}
              />
            </Paper>
          </Grid>
        </Container>
      </DashboardWrapper>
    </Fragment>
  )
}

export default CoursesDashboard

export const getServerSideProps = withIronSessionSsr(
  withoutUserSession,
  sessionOptions,
)
