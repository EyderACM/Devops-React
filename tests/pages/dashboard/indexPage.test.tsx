/**
 * @jest-environment jsdom
 */
import React from 'react'
import { render } from '@testing-library/react'
import Dashboard from '../../../src/pages/dashboard/index'

// Test if the courses page is rendered correctly
describe('Dashboard Courses Page', () => {
  test('renders correctly', async () => {
    const { getByText } = render(<Dashboard />)

    expect(getByText('Bienvenido al sistema')).toBeTruthy()
  })
})
