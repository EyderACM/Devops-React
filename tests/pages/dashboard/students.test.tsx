/**
 * @jest-environment jsdom
 */
import React from 'react'
import { render } from '@testing-library/react'
import StudentDashboard from '../../../src/pages/dashboard/students'

// Test if the courses page is rendered correctly
describe('Dashboard Courses Page', () => {
  test('renders correctly', async () => {
    const mocksession = { isLoggedIn: true, login: 'a', username: 'MaddozS' }

    const { getByText, getAllByText } = render(
      <StudentDashboard user={mocksession} />,
    )

    expect(getByText('Dashboard')).toBeTruthy()
    expect(getAllByText('Estudiantes')).toBeTruthy()
    expect(getAllByText('Estudiantes')).toHaveLength(2)
  })
})
