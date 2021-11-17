/**
 * @jest-environment jsdom
 */

import Index from '../../src/pages/index'
import renderer from 'react-test-renderer'

// Test if the page is rendered correctly
test('renders correctly', () => {
  const component = renderer.create(<Index />)

  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
