/**
 * @jest-environment jsdom
 */

import React from 'react'
import { render } from '@testing-library/react'
import Title from '../../../src/components/atoms/Title'

test('Test title rendering', () => {
  const { getByRole } = render(<Title> Titulo de prueba </Title>)

  const heading = getByRole('heading', {
    name: /Titulo de prueba/i,
  })

  expect(heading).toBeTruthy()
})
