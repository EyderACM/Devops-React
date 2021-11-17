/**
 * @jest-environment jsdom
 */

import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Courses from '../../../src/components/molecules/Courses'
import { Course } from '../../../src/pages/dashboard/courses'

describe('Test courses', () => {
  it('renders Courses with 3 courses defined', () => {
    // an array of Course objects from the Course interface
    const courses: Course[] = [
      {
        id: 1,
        courseName: 'Curso 1',
        courseTagId: 'CURSO1',
        professorName: 'Fulanito',
        classRoomCode: 'SALON1',
        hasProjector: false,
      },
      {
        id: 2,
        courseName: 'Curso 2',
        courseTagId: 'CURSO2',
        professorName: 'Fulanito',
        classRoomCode: 'SALON2',
        hasProjector: true,
      },
      {
        id: 3,
        courseName: 'Curso 3',
        courseTagId: 'CURSO3',
        professorName: 'Fulanito',
        classRoomCode: 'SALON3',
        hasProjector: true,
      },
    ]

    // a function which deletes a course from the courses array
    const deleteCourse = (id: number) => (e: any) => {
      e.stopPropagation()
      courses.splice(id, 1)
    }

    // a function which console logs the course name
    const logCourseName = (id: number) => (e: any) => {
      e.stopPropagation()
      console.log(courses[id].courseName)
    }

    const { container } = render(
      <Courses
        courses={courses}
        onRowDelete={deleteCourse}
        onRowClick={logCourseName}
      />,
    )

    // the table body should have 3 rows

    const tableBody = container.querySelector('tbody')
    // check if the table body exists
    expect(tableBody).toBeTruthy()

    expect(tableBody?.children.length).toBe(3)
  })

  // Test deleting a course
  it('deletes a course', () => {
    // an array of Course objects from the Course interface
    const courses: Course[] = [
      {
        id: 1,
        courseName: 'Curso 1',
        courseTagId: 'CURSO1',
        professorName: 'Fulanito',
        classRoomCode: 'SALON1',
        hasProjector: false,
      },
      {
        id: 2,
        courseName: 'Curso 2',
        courseTagId: 'CURSO2',
        professorName: 'Fulanito',
        classRoomCode: 'SALON2',
        hasProjector: true,
      },
      {
        id: 3,
        courseName: 'Curso 3',
        courseTagId: 'CURSO3',
        professorName: 'Fulanito',
        classRoomCode: 'SALON3',
        hasProjector: true,
      },
    ]

    // a function which deletes a course from the courses array
    const deleteCourse = (id: number) => (e: any) => {
      e.stopPropagation()
      courses.splice(id, 1)
    }

    // a function which console logs the course name
    const logCourseName = (id: number) => (e: any) => {
      e.stopPropagation()
      console.log(courses[id].courseName)
    }

    const { container } = render(
      <Courses
        courses={courses}
        onRowDelete={deleteCourse}
        onRowClick={logCourseName}
      />,
    )

    // the table body should have 3 rows

    let tableBody = container.querySelector('tbody')
    // check if the table body exists
    expect(tableBody).toBeTruthy()

    expect(tableBody?.children.length).toBe(3)

    // Click the delete button of the first course

    const deleteButton = container.querySelector('tbody tr:first-child button')
    // check if the delete button exists
    expect(deleteButton).toBeTruthy()
    // click the delete button
    // @ts-ignore
    fireEvent.click(deleteButton)

    const { container: newContainer } = render(
      <Courses
        courses={courses}
        onRowDelete={deleteCourse}
        onRowClick={logCourseName}
      />,
    )

    tableBody = newContainer.querySelector('tbody')

    // the table body should have 2 rows
    expect(tableBody?.children.length).toBe(2)
  })
})
