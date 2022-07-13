import axios from 'axios'

export const api='https://api.dictionaryapi.dev/api/v2/entries/en'

const getDefinitions = async (text) => {
  const result = await axios.get(
    `${api}/${text}`
  )

 return result
}

export default getDefinitions
