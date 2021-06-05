import React, { useState, useContext } from 'react'
import { AppContext } from '../../Context'
import Submit from '../Submit'

const initialValues = {
  firstName: '',
  lastName: '',
  company: '',
  job: '',
  mobile: '',
  phone: '',
  fax: '',
  email: '',
  street: '',
  city: '',
  zip: '',
  state: '',
  country: '',
  website: '',
}

const VCardForm = (): JSX.Element => {
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

    let data = 'BEGIN:VCARD\n'
    data += 'VERSION:3.0\n'
    data += 'N:' + value.lastName + ';' + value.firstName + '\n'
    data += 'FN:' + value.firstName + ' ' + value.lastName + '\n'
    data += 'ORG:' + value.company + '\n'
    data += 'TITLE:' + value.job + '\n'
    data +=
      'ADR:;;' + value.street + ';' + value.city + ';' + value.state + ';' + value.zip + ';' + value.country + '\n'
    data += 'TEL;WORK;VOICE:' + value.phone + '\n'
    data += 'TEL;CELL:' + value.mobile + '\n'
    data += 'TEL;FAX:' + value.fax + '\n'
    data += 'EMAIL;WORK;INTERNET:' + value.email + '\n'
    data += 'URL:' + value.website + '\n'
    data += 'END:VCARD\n'

    qrCode.update({
      data,
    })
  }

  return (
    <form className='qrForm-vcard' onSubmit={handleSubmit}>
      <div className='row mb-3'>
        <div className='col'>
          <div className='form-floating'>
            <input
              id='firstName'
              className='form-control'
              type='text'
              name='firstName'
              placeholder='First Name'
              value={value.firstName}
              onChange={handleChange}
              required
            />
            <label htmlFor='firstName'>First Name</label>
          </div>
        </div>
        <div className='col'>
          <div className='form-floating'>
            <input
              id='lastName'
              className='form-control'
              type='text'
              name='lastName'
              placeholder='Last Name'
              value={value.lastName}
              onChange={handleChange}
            />
            <label htmlFor='lastName'>Last Name</label>
          </div>
        </div>
      </div>

      <div className='mb-3'>
        <div className='form-floating'>
          <input
            id='mobile'
            className='form-control'
            type='text'
            name='mobile'
            placeholder='Mobile'
            value={value.mobile}
            onChange={handleChange}
          />
          <label htmlFor='mobile'>Mobile</label>
        </div>
      </div>

      <div className='row mb-3'>
        <div className='col'>
          <div className='form-floating'>
            <input
              id='phone'
              className='form-control'
              type='text'
              name='phone'
              placeholder='Phone'
              value={value.phone}
              onChange={handleChange}
            />
            <label htmlFor='phone'>Phone</label>
          </div>
        </div>
        <div className='col'>
          <div className='form-floating'>
            <input
              id='fax'
              className='form-control'
              type='text'
              name='fax'
              placeholder='Fax'
              value={value.fax}
              onChange={handleChange}
            />
            <label htmlFor='fax'>Fax</label>
          </div>
        </div>
      </div>

      <div className='mb-3'>
        <div className='form-floating'>
          <input
            id='email'
            className='form-control'
            type='email'
            name='email'
            placeholder='Email'
            value={value.email}
            onChange={handleChange}
          />
          <label htmlFor='email'>Email</label>
        </div>
      </div>

      <div className='row mb-3'>
        <div className='col'>
          <div className='form-floating'>
            <input
              id='company'
              className='form-control'
              type='text'
              name='company'
              placeholder='Company'
              value={value.company}
              onChange={handleChange}
            />
            <label htmlFor='company'>Company</label>
          </div>
        </div>
        <div className='col'>
          <div className='form-floating'>
            <input
              id='job'
              className='form-control'
              type='text'
              name='job'
              placeholder='Your Job'
              value={value.job}
              onChange={handleChange}
            />
            <label htmlFor='job'>Job</label>
          </div>
        </div>
      </div>

      <div className='mb-3'>
        <div className='form-floating'>
          <input
            id='street'
            className='form-control'
            type='text'
            name='street'
            placeholder='Street'
            value={value.street}
            onChange={handleChange}
          />
          <label htmlFor='street'>Street</label>
        </div>
      </div>

      <div className='row mb-3'>
        <div className='col-8'>
          <div className='form-floating'>
            <input
              id='city'
              className='form-control'
              type='text'
              name='city'
              placeholder='City'
              value={value.city}
              onChange={handleChange}
            />
            <label htmlFor='city'>City</label>
          </div>
        </div>
        <div className='col-4'>
          <div className='form-floating'>
            <input
              id='zip'
              className='form-control'
              type='text'
              name='zip'
              placeholder='Zip'
              value={value.zip}
              onChange={handleChange}
            />
            <label htmlFor='zip'>Zip</label>
          </div>
        </div>
      </div>

      <div className='mb-3'>
        <div className='form-floating'>
          <input
            id='state'
            className='form-control'
            type='text'
            name='state'
            placeholder='State'
            value={value.state}
            onChange={handleChange}
          />
          <label htmlFor='state'>State</label>
        </div>
      </div>

      <div className='mb-3'>
        <div className='form-floating'>
          <input
            id='country'
            className='form-control'
            type='text'
            name='country'
            placeholder='Country'
            value={value.country}
            onChange={handleChange}
          />
          <label htmlFor='country'>Country</label>
        </div>
      </div>

      <div className='mb-3'>
        <div className='form-floating'>
          <input
            id='website'
            className='form-control'
            type='url'
            name='website'
            placeholder='Website'
            value={value.website}
            onChange={handleChange}
          />
          <label htmlFor='website'>Website</label>
        </div>
      </div>

      <Submit />
    </form>
  )
}

export default VCardForm
