import React, { useState, useContext } from 'react'
import { AppContext } from '../../Context'
import Submit from '../Submit'

const TextForm = () => {
  const [values, setValues] = useState('')
  const { qrCode } = useContext(AppContext)

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValues(event.target.value)
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    qrCode.update({
      data: values
    })
  }

  return (
    <form className='qrForm-text' onSubmit={handleSubmit}>
      <div className='form-floating mb-3'>
        <textarea
          id='text'
          className='form-control'
          name='text'
          value={values}
          cols={3}
          onChange={handleChange}
          placeholder='Add Text'
          required
        />
        <label htmlFor='text'>Add Text</label>
      </div>
      <Submit />
    </form>
  )
}

export default TextForm
