import React from 'react'
import { render, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Planet from '../src/Planet'

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'), // use actual for all non-hook parts
  useParams: () => ({
    planet: 'alderaan'
  }),
  useRouteMatch: () => ({ url: '/planet/alderaan' }),
}))

jest.mock('../src/hooks', () => {
  const data = require('./data/planet')

  return {
    useHttp: jest.fn().mockReturnValue([data.default])
  }
})

afterEach(cleanup)

it('renders without crashing', () => {
  const { getByTestId } = render(<Planet />)
  expect(getByTestId('planet')).toBeDefined()
})