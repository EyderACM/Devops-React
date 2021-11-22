/**
 * @jest-environment jsdom
 */
import React from 'react'
import { render, screen } from '@testing-library/react'
import CoursesDashboard from '../../../src/pages/dashboard/courses'
import { Session } from 'next-auth'
import mocksession from '../../mocks/MockIronSession'

// Test if the courses page is rendered correctly
describe('Dashboard Courses Page', () => {
  test('renders correctly', async () => {
    const mocksession = { isLoggedIn: true, login: 'a', username: 'MaddozS' }

    const { getByText, getAllByText } = render(
      <CoursesDashboard user={mocksession} />,
    )

    expect(getByText('Dashboard')).toBeTruthy()
    expect(getByText('Estudiantes')).toBeTruthy()
    expect(getAllByText('Cursos')).toBeTruthy()
    expect(getAllByText('Cursos')).toHaveLength(2)
  })
})
