import axios from 'axios'

const getDefinitions = async(text) => {
  const result=  await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${text}`)

  return result.data
}

export default getDefinitions