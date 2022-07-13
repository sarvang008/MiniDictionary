import { render, screen } from '@testing-library/react'
import { fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import axios from "axios";
import Dashboard from './Dashboard'

import getDefinitions,{api} from '../../Service/DictionaryService'
  jest.mock('axios');

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

describe('Check Api validation', () => {
test('Get successful result of the API call', async () => {
 const definitions= [
    {
        "word": "hello",
       
        "meanings": [
            {
                "partOfSpeech": "noun",
                "definitions": [
                    {
                        "definition": "\"Hello!\" or an equivalent greeting.",
                        "synonyms": [],
                        "antonyms": []
                    }
                ],
                "synonyms": [
                    "greeting"
                ],
                "antonyms": []
            },
            {
                "partOfSpeech": "verb",
                "definitions": [
                    {
                        "definition": "To greet with \"hello\".",
                        "synonyms": [],
                        "antonyms": []
                    }
                ],
                "synonyms": [],
                "antonyms": []
            },
            {
                "partOfSpeech": "interjection",
                "definitions": [
                    {
                        "definition": "A greeting (salutation) said when meeting someone or acknowledging someone’s arrival or presence.",
                        "synonyms": [],
                        "antonyms": [],
                        "example": "Hello, everyone."
                    },
                    {
                        "definition": "A greeting used when answering the telephone.",
                        "synonyms": [],
                        "antonyms": [],
                        "example": "Hello? How may I help you?"
                    },
                    {
                        "definition": "A call for response if it is not clear if anyone is present or listening, or if a telephone conversation may have been disconnected.",
                        "synonyms": [],
                        "antonyms": [],
                        "example": "Hello? Is anyone there?"
                    },
                    {
                        "definition": "Used sarcastically to imply that the person addressed or referred to has done something the speaker or writer considers to be foolish.",
                        "synonyms": [],
                        "antonyms": [],
                        "example": "You just tried to start your car with your cell phone. Hello?"
                    },
                    {
                        "definition": "An expression of puzzlement or discovery.",
                        "synonyms": [],
                        "antonyms": [],
                        "example": "Hello! What’s going on here?"
                    }
                ],
                "synonyms": [],
                "antonyms": [
                    "bye",
                    "goodbye"
                ]
            }
        ],
      
    }
]
// jest.resetAllMocks()
  axios.get.mockResolvedValue({data: definitions});

  render(<Dashboard />)

  userEvent.type(screen.getByTestId('search'), 'hello')
  const form = screen.getByTestId('form');
  expect(form).toBeInTheDocument()
   fireEvent.submit(form)
  await waitFor(() =>
  //  expect(screen.getByText(/Loading/i)).toBeInTheDocument()

    expect(screen.getByText(/bye/i)).toBeInTheDocument()

)
  

      // await waitFor(() => expect(getDefinitions('hello')).toEqual(definitions));



  // expect(await screen.findByText("unverified")).toBeInTheDocument();

})


})