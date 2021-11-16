import { Fragment, useEffect, useState } from 'react'
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
import requiredString from 'utils/functions/requiredString'

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
  const [courses, setCourses] = useState<Course[]>()
  const [open, setOpen] = useState<boolean>(false)
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormCourse>({
    resolver: yupResolver(coursesSchema),
  })

  useEffect(() => {
    const fetchCourses = async () => {
      const authorization = `Bearer ${user?.login || ''}`

      const rawCourses = await fetch('http://localhost:8080/api/courses', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          authorization,
        },
      })
      const coursesDto = (await rawCourses.json()) as Course[]
      setCourses(coursesDto)
    }
    fetchCourses()
  }, [])

  const onSubmit = handleSubmit((data) => {
    console.log(data)
  })

  return (
    <Fragment>
      <CourseDialog
        open={open}
        setOpen={setOpen}
        formControl={control}
        onSubmit={onSubmit}
        errors={errors}
      />
      <DashboardWrapper>
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Grid item xs={12}>
            <Grid container sx={{ pb: 2 }}>
              <Button variant="contained" onClick={() => setOpen(true)}>
                Crear
              </Button>
            </Grid>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
              <Courses courses={courses!} />
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
