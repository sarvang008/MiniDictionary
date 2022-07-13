import  { useState,useEffect } from 'react'
import DictionaryForm from '../../Components/DictionaryForm'
import DictionaryItem from '../../Components/DictionaryItem'
import getDefinitions from '../../Service/DictionaryService'


const Dashboard = () => {

  const [text, setText] = useState('')

  const [dictionaryList,setDictionaryList ] = useState(null)
  const [errorMessage,setErrorMessage ] = useState('')
  const [loading,setLoading ] = useState(false)



    const onSubmit = async(e) => {
    e.preventDefault()
  
    try {
      setLoading(true)
      const result= await getDefinitions(text.trim())
     
      console.log(result.data[0].meanings[0].definitions[0].definition)
     const definitions=result.data.map(item=>item.meanings.map(meaning=>meaning.definitions))
     console.log(definitions[0][0])
      setDictionaryList(definitions[0][0])
     
      setErrorMessage('')
      setLoading(false)

  
    } catch (error) {
     console.log(error)
      setDictionaryList([])
      setLoading(false)
      setErrorMessage('No Definitions found')
    }
   
  }



  return (
    <>
      <DictionaryForm text={text} setText={setText} onSubmit={onSubmit}/>

      <section className='content'>

        {loading && <div >Loading...</div>}
        {!loading && dictionaryList?.length > 0 ? (
          <div className='lists'>
            {dictionaryList.map((item,index) => (
              <DictionaryItem key={index} item={item.definition} />
            ))}
          </div>
        ) : (
          <h3>{!loading && errorMessage}</h3>
        )}
      </section>
    </>
  )
}

export default Dashboard
