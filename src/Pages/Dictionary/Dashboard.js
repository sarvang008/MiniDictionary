import  { useState } from 'react'
import DictionaryForm from '../../Components/DictionaryForm'
import DictionaryItem from '../../Components/DictionaryItem'
import getDefinitions from '../../Service/DictionaryService'


const Dashboard = () => {

  const [text, setText] = useState('')

  const [dictionaryList,setDictionaryList ] = useState(null)
  const [errorMessage,setErrorMessage ] = useState('')


  

  const onSubmit = async(e) => {
    e.preventDefault()
  
    try {
      const result= await getDefinitions(text.trim())
     
     const definitions=result.map(item=>item.meanings.map(meaning=>meaning.definitions))
    
     setDictionaryList(definitions.flat(Infinity))
      setErrorMessage('')
  
    } catch (error) {
     
      setDictionaryList([])
      setErrorMessage('No Definitions found')
    }
    setText('')
  }


  return (
    <>
      <DictionaryForm text={text} setText={setText} onSubmit={onSubmit}/>

      <section className='content'>
        {dictionaryList?.length > 0 ? (
          <div className='lists'>
            {dictionaryList.map((item,index) => (
              <DictionaryItem key={index} item={item.definition} />
            ))}
          </div>
        ) : (
          <h3>{errorMessage}</h3>
        )}
      </section>
    </>
  )
}

export default Dashboard
