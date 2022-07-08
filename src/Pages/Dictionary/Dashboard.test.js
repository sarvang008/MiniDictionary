import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Dashboard from './Dashboard'

import getDefinitions from '../../Service/DictionaryService'


test('initial render submit button is disabled', async () => {
  render(<Dashboard />)

  expect(screen.getByTestId('submit')).toBeDisabled()
})

test('render submit button is enabled after user input', async () => {
  render(<Dashboard />)

  expect(screen.getByTestId('submit')).toBeDisabled()

  userEvent.type(screen.getByTestId('search'), 'dog')

  expect(screen.getByTestId('submit')).toBeEnabled()
})

test('Get successful result of the API call', async () => {
 

  const result = await getDefinitions('dog');
  expect(result.length).toBeGreaterThan(0)
})


test('Get failure result of the API call', async () => {
 
try {

    const result = await getDefinitions('asdd');
    expect(result.length).toBe(0)
    
} catch (error) {
    // eslint-disable-next-line jest/no-conditional-expect
    expect(error).toBeDefined()
   

}
 
  })
  