
function DictionaryForm({text,onSubmit,setText}) {
 
  return (
    <section className='form'>
      <form onSubmit={onSubmit} aria-label="form"  data-testid="form" >
        <div className='form-group'>
          <input
            type='text'
            name='text'
            id='text'
            placeholder='Enter a word'
            data-testid="search"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <div className='form-group'>
          <button className='btn btn-block' type='submit' data-testid="submit" disabled={text.trim().length<1}>
            Search Dictionary
          </button>
        </div>
      </form>
    </section>
  )
}

export default DictionaryForm
