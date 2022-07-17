import { useState } from 'react'
import DictionaryForm from '../../Components/DictionaryForm'
import DictionaryItem from '../../Components/DictionaryItem'
import getDefinitions from '../../Service/DictionaryService'

function flatten(array)
{
    if(array.length === 0)
        return array;
    else if(Array.isArray(array[0]))
        return flatten(array[0]).concat(flatten(array.slice(1)));
    else
        return [array[0]].concat(flatten(array.slice(1)));
}
const Dashboard = () => {
  const [text, setText] = useState('')

  const [dictionaryList, setDictionaryList] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const onSubmit = async (e) => {
    e.preventDefault()

    try {
      setLoading(true)
      const result = await getDefinitions(text.trim())

      const definitions = result.data.map((item) =>
        item.meanings.map((meaning) => meaning.definitions)
      )
     
      setDictionaryList(flatten(definitions))

      setErrorMessage('')
      setLoading(false)
    } catch (error) {
      if (error.response.status >= 400 && error.response.status < 500) {
        setDictionaryList([])
        setLoading(false)
        setErrorMessage('No Definitions found')
      } else if (error.response.status >= 500) {
        setDictionaryList([])
        setLoading(false)
        setErrorMessage('Server Error')
      }
    }
  }

  return (
    <>
      <DictionaryForm text={text} setText={setText} onSubmit={onSubmit} />

      <section className='content'>
        {loading && <div>Loading...</div>}
        {!loading && dictionaryList?.length > 0 ? (
          <ul className='lists' data-testid='list'>
            {dictionaryList.map((item, index) => (
              <DictionaryItem key={index} item={item.definition} />
            ))}
          </ul>
        ) : (
          <h3>{!loading && errorMessage}</h3>
        )}
      </section>
    </>
  )
}

export default Dashboard
