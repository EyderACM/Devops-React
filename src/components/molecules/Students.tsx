import * as React from 'react'
import DeleteIcon from '@mui/icons-material/Delete'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import { Student } from 'pages/dashboard/students'
import Title from '../atoms/Title'
import { CircularProgress, Grid, IconButton } from '@mui/material'

interface ICourse {
  students: Student[]
  onRowClick: (id: number) => (e: any) => void
  onRowDelete: (id: number) => (e: any) => void
}

export default function Students({
  students,
  onRowClick,
  onRowDelete,
}: ICourse) {
  return (
    <React.Fragment>
      <Title>Estudiantes</Title>
      {students !== undefined ? (
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Id </TableCell>
              <TableCell>Nombres</TableCell>
              <TableCell>Apellidos</TableCell>
              <TableCell>Fecha de Nacimiento</TableCell>
              <TableCell>Sexo</TableCell>
              <TableCell>Fecha de Inscripción</TableCell>
              <TableCell>Id del Curso</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students.map((row) => (
              <TableRow
                onClick={onRowClick(row.enrollmentId)}
                key={`${row.firstNames}-${row.course.id}`}
                hover
              >
                <TableCell>{row.enrollmentId}</TableCell>
                <TableCell>{row.firstNames}</TableCell>
                <TableCell>{row.lastNames}</TableCell>
                <TableCell>{row.birthDate}</TableCell>
                <TableCell>{row.sex}</TableCell>
                <TableCell>{row.enrollmentDate}</TableCell>
                <TableCell>{row.course.courseName}</TableCell>
                <TableCell>
                  <IconButton
                    onClick={onRowDelete(row.enrollmentId)}
                    sx={{ zIndex: 10 }}
                  >
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
