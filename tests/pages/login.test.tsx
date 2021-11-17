/**
 * @jest-environment jsdom
 */
import React from 'react'
import { render } from '@testing-library/react'
import Login from '../../src/pages/login'

// test if the login page is rendered correctly
describe('Login Page', () => {
  it('renders correctly', () => {
    const { getByText } = render(<Login />)
    expect(getByText('¡Bienvenido!')).toBeTruthy()
  })
})
