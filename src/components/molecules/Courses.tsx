import * as React from 'react'
import DeleteIcon from '@mui/icons-material/Delete'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import { Course } from 'pages/dashboard/courses'
import Title from '../atoms/Title'
import { CircularProgress, Grid, IconButton } from '@mui/material'

interface ICourse {
  courses: Course[]
  onRowClick: (id: number) => (e: any) => void
  onRowDelete: (id: number) => (e: any) => void
}

export default function Courses({ courses, onRowClick, onRowDelete }: ICourse) {
  return (
    <React.Fragment>
      <Title>Cursos</Title>
      {courses !== undefined ? (
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Curso</TableCell>
              <TableCell>Clave Curso</TableCell>
              <TableCell>Nombre del profesor</TableCell>
              <TableCell>Código el Aula</TableCell>
              <TableCell>Tiene proyector</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {courses.map((row) => (
              <TableRow
                onClick={onRowClick(row.id)}
                key={`${row.courseName}-${row.courseTagId}`}
                hover
              >
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.courseName}</TableCell>
                <TableCell>{row.courseTagId}</TableCell>
                <TableCell>{row.professorName}</TableCell>
                <TableCell>{row.classRoomCode}</TableCell>
                <TableCell>{row.hasProjector ? 'Sí' : 'No'}</TableCell>
                <TableCell>
                  <IconButton onClick={onRowDelete(row.id)} sx={{ zIndex: 10 }}>
                    <DeleteIcon color="action" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <Grid
          item
          container
          alignItems="center"
          justifyContent="center"
          height={150}
          width="100%"
        >
          <CircularProgress />
        </Grid>
      )}
    </React.Fragment>
  )
}
