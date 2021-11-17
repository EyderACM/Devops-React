/**
 * @jest-environment jsdom
 */
import React from 'react'
import { render } from '@testing-library/react'
import SignUp from '../../src/pages/sign-up'

// test if the sign up page is rendered correctly
describe('Sign Up Page', () => {
  it('renders correctly', () => {
    const { getByText } = render(<SignUp />)
    expect(getByText('¿Deseas crear una cuenta?')).toBeTruthy()
  })
})
