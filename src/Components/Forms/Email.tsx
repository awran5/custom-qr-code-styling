import React, { useState, useContext } from 'react'
import { AppContext } from '../../Context'
import Submit from '../Submit'

const initialValues = {
  email: '',
  subject: '',
  body: '',
}

const EmailForm = (): JSX.Element => {
  const [value, setValue] = useState(initialValues)
  const { qrCode } = useContext(AppContext)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target
    setValue((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const data = `mailto:${value.email}?subject=${value.subject}&body=${value.body}`

    qrCode.update({
      data,
    })
  }

  return (
    <form className='qrForm-email' onSubmit={handleSubmit}>
      <div className='form-floating mb-3'>
        <input
          id='eEmail'
          className='form-control'
          type='email'
          name='email'
          value={value.email}
          onChange={handleChange}
          placeholder='Email'
          required
        />
        <label htmlFor='email'>Email</label>
      </div>
      <div className='form-floating mb-3'>
        <input
          id='eSubject'
          className='form-control'
          type='text'
          name='subject'
          value={value.subject}
          onChange={handleChange}
          placeholder='Subject'
        />
        <label htmlFor='subject'>Subject</label>
      </div>
      <div className='form-floating mb-3'>
        <textarea
          id='body'
          className='form-control'
          name='body'
          rows={3}
          value={value.body}
          onChange={handleChange}
          placeholder='Message'
        />
        <label htmlFor='body'>Message</label>
      </div>

      <Submit />
    </form>
  )
}

export default EmailForm
