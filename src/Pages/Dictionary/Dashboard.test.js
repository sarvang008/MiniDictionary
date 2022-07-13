import { render, screen } from '@testing-library/react'
import { fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import axios from 'axios'
import Dashboard from './Dashboard'

const definitions = [
  {
    word: 'hello',

    meanings: [
      {
        partOfSpeech: 'noun',
        definitions: [
          {
            definition: '"Hello!" or an equivalent greeting.',
            synonyms: [],
            antonyms: [],
          },
        ],
        synonyms: ['greeting'],
        antonyms: [],
      },
      {
        partOfSpeech: 'verb',
        definitions: [
          {
            definition: 'To greet with "hello".',
            synonyms: [],
            antonyms: [],
          },
        ],
        synonyms: [],
        antonyms: [],
      },
      {
        partOfSpeech: 'interjection',
        definitions: [
          {
            definition:
              'A greeting (salutation) said when meeting someone or acknowledging someone’s arrival or presence.',
            synonyms: [],
            antonyms: [],
            example: 'Hello, everyone.',
          },
          {
            definition: 'A greeting used when answering the telephone.',
            synonyms: [],
            antonyms: [],
            example: 'Hello? How may I help you?',
          },
          {
            definition:
              'A call for response if it is not clear if anyone is present or listening, or if a telephone conversation may have been disconnected.',
            synonyms: [],
            antonyms: [],
            example: 'Hello? Is anyone there?',
          },
          {
            definition:
              'Used sarcastically to imply that the person addressed or referred to has done something the speaker or writer considers to be foolish.',
            synonyms: [],
            antonyms: [],
            example:
              'You just tried to start your car with your cell phone. Hello?',
          },
          {
            definition: 'An expression of puzzlement or discovery.',
            synonyms: [],
            antonyms: [],
            example: 'Hello! What’s going on here?',
          },
        ],
        synonyms: [],
        antonyms: ['bye', 'goodbye'],
      },
    ],
  },
]
jest.mock('axios')

describe('Check form validation', () => {
  test('initial render submit button is disabled', async () => {
    render(<Dashboard />)

    expect(screen.getByTestId('submit')).toBeDisabled()
  })

  test('render submit button is enabled after user input', async () => {
    render(<Dashboard />)

    userEvent.type(screen.getByTestId('search'), 'dog')

    expect(screen.getByTestId('submit')).toBeEnabled()
  })
})

describe('Check Component after API call', () => {
  test('Get successful result of the API call', async () => {
    axios.get.mockResolvedValue({ data: definitions })

    render(<Dashboard />)

    userEvent.type(screen.getByTestId('search'), 'hello')
    const form = screen.getByTestId('form')
    expect(form).toBeInTheDocument()
    fireEvent.submit(form)
    await waitFor(() =>
      expect(screen.getByText(/Loading/i)).toBeInTheDocument()
    )

    await waitFor(() => {
      expect(
        screen.queryByText(/No Definitions found/i)
      ).not.toBeInTheDocument()
    })

    await waitFor(() => {
      expect(screen.queryByText(/Loading/i)).not.toBeInTheDocument()
      const items = screen.getAllByRole('listitem')
      expect(items.length).toBe(7)
    })
  })

  test('Get No value from API call', async () => {
    const err = new Error('No Definitions found')
    err.response = {
      status: 404,
      message: 'myDescription',
    }
    axios.get.mockRejectedValueOnce(err)

    render(<Dashboard />)

    userEvent.type(screen.getByTestId('search'), 'sdfsd')
    const form = screen.getByTestId('form')
    expect(form).toBeInTheDocument()
    fireEvent.submit(form)
    await waitFor(() =>
      expect(screen.getByText(/Loading/i)).toBeInTheDocument()
    )

    await waitFor(() => {
      expect(screen.queryByText(/No Definitions found/i)).toBeInTheDocument()
    })

    await waitFor(() => {
      expect(screen.queryByText(/Loading/i)).not.toBeInTheDocument()
      const list = screen.queryByTestId('list')
      expect(list).not.toBeInTheDocument()
    })
  })

  test('Get Server Error from API call', async () => {
    const err = new Error('Server Error')
    err.response = {
      status: 500,
      message: 'Server Error',
    }
    axios.get.mockRejectedValueOnce(err)

    render(<Dashboard />)

    userEvent.type(screen.getByTestId('search'), '')
    const form = screen.getByTestId('form')
    expect(form).toBeInTheDocument()
    fireEvent.submit(form)
    await waitFor(() =>
      expect(screen.getByText(/Loading/i)).toBeInTheDocument()
    )

    await waitFor(() => {
      expect(screen.queryByText(/Server Error/i)).toBeInTheDocument()
    })

    await waitFor(() => {
      expect(screen.queryByText(/Loading/i)).not.toBeInTheDocument()
      const list = screen.queryByTestId('list')
      expect(list).not.toBeInTheDocument()
    })
  })
})
