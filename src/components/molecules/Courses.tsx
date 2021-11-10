import * as React from 'react'
import Link from '@mui/material/Link'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Title from '../atoms/Title'

// Generate Order Data
function createData(
  id: number,
  course: string,
  courseName: string,
  studentAmount: number,
) {
  return { id, course, courseName, studentAmount }
}

const rows = [
  createData(0, 'Física', 'FI1', 3),
  createData(1, 'Física', 'FI1', 3),
  createData(3, 'Física', 'FI1', 3),
]

function preventDefault(event: React.MouseEvent) {
  event.preventDefault()
}

export default function Courses() {
  return (
    <React.Fragment>
      <Title>Recent Orders</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell>Curso</TableCell>
            <TableCell>Clave Curso</TableCell>
            <TableCell>Cantidad de estudiantes</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.course}</TableCell>
              <TableCell>{row.courseName}</TableCell>
              <TableCell>{row.studentAmount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        See more orders
      </Link>
    </React.Fragment>
  )
}
