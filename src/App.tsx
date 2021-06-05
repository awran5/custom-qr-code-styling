import React, { useState, useEffect, useRef, useContext } from 'react'
import { DotType, CornerSquareType, CornerDotType } from 'qr-code-styling/lib/types'
import { AppContext } from './Context'
import Header from './Components/Header'
import Tabs from './Components/Tabs'
import TextForm from './Components/Forms/Text'
import UrlForm from './Components/Forms/Url'
import EmailForm from './Components/Forms/Email'
import VCardForm from './Components/Forms/VCard'
import WiFiForm from './Components/Forms/WiFi'
import Footer from './Components/Footer'
import Download from './Components/Download'

const tabs = [
  {
    label: 'Text',
    Component: TextForm,
  },
  {
    label: 'URL',
    Component: UrlForm,
  },
  {
    label: 'E-mail',
    Component: EmailForm,
  },
  {
    label: 'VCard',
    Component: VCardForm,
  },
  {
    label: 'WiFi',
    Component: WiFiForm,
  },
]

const initialOpions = {
  size: 1000,
  removeBrand: false,
  image: window.location.origin + '/scanme.svg',
  imageMargin: 20,
  mainShape: 'dots' as DotType,
  shapeColor: '#6a1a4c',
  squareShape: 'extra-rounded' as CornerSquareType,
  squareColor: '#6a1a4c',
  cornersDotShape: 'dot' as CornerDotType,
  cornersDotColor: '#dc3545',
}

function App() {
  const { qrCode, canvasRef } = useContext(AppContext)
  const [options, setOptions] = useState(initialOpions)
  const [isSave, setSave] = useState(false)
  const [offcanvas, setOffcanvas] = useState(false)
  const [selectedTab, setSelectedTab] = useState(0)
  const offcanvasRef = useRef<HTMLInputElement>(null)
  const uploadRef = useRef<HTMLInputElement>(null)

  const handleOptions = (event: React.ChangeEvent) => {
    const { type, name, value, checked, files } = event.target as HTMLInputElement

    setOptions((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))

    if (!files) return
    const image = files[0]

    if (image) {
      // Check supported formats
      if (!image.type.match('image.*')) {
        console.error('Error: File is not supported.')
        setOptions((prev) => ({
          ...prev,
          image: initialOpions.image,
        }))
      }

      // Check max size (1 M in Bytes)
      if (image.size > 2097152) {
        console.error('Error: Maximum file size is 2 MB')
        setOptions((prev) => ({
          ...prev,
          image: initialOpions.image,
        }))
      }

      const fileReader = new FileReader()
      fileReader.onload = () => {
        setOptions((prev) => ({
          ...prev,
          image: fileReader.result as string,
        }))
      }
      fileReader.readAsDataURL(image)
    }
  }

  const handleOffcanvas = () => setOffcanvas((prev) => !prev)

  const handleSave = () => {
    setSave(true)
    localStorage.setItem('qr-code', JSON.stringify(options))
    setTimeout(() => setSave(false), 1000)
  }

  const handleSavedValues = () => {
    const savedValues = localStorage.getItem('qr-code')

    if (savedValues) {
      setOptions(JSON.parse(savedValues))
    }
  }

  const handleReset = () => {
    setOptions(initialOpions)
    if (uploadRef.current) {
      uploadRef.current.value = ''
    }
  }

  const handleResetImage = () => {
    if (uploadRef.current) {
      uploadRef.current.value = ''
      setOptions((prev) => ({
        ...prev,
        image: initialOpions.image,
      }))
    }
  }

  useEffect(() => {
    const image = options.removeBrand ? '' : options.image
    qrCode.update({
      width: options.size,
      height: options.size,
      image,
      dotsOptions: {
        type: options.mainShape,
        color: options.shapeColor,
      },
      cornersSquareOptions: {
        type: options.squareShape,
        color: options.squareColor,
      },
      cornersDotOptions: {
        type: options.cornersDotShape,
        color: options.cornersDotColor,
      },
      imageOptions: {
        margin: options.imageMargin,
      },
    })
  }, [qrCode, options])

  useEffect(() => {
    window.onclick = (event: MouseEvent) => {
      if (offcanvas && offcanvasRef.current) {
        if (event.target === offcanvasRef.current) setOffcanvas(false)
      }
    }
  }, [offcanvas])

  return (
    <div className='d-flex flex-column vh-100 App'>
      <Header />

      <main className='content'>
        <div className='container py-5'>
          <div className='row flex-lg-row-reverse justify-content-between g-5 py-5'>
            <div className='col-12 col-md-4'>
              <div className='qr-code-container'>
                <div className='qr-code text-center mx-auto' ref={canvasRef}></div>
                <div className='customization'>
                  <div className='py-5'>
                    <input
                      id='size'
                      className='form-range'
                      type='range'
                      name='size'
                      min='500'
                      max='1500'
                      step='50'
                      value={options.size}
                      onChange={handleOptions}
                    />
                    <div className='d-flex justify-content-between small'>
                      <span className='text-muted'>Low Quality</span>
                      <span className='fw-bold'>{` ${options.size} x ${options.size} Px`}</span>
                      <span className='text-muted'>High Quality</span>
                    </div>
                  </div>

                  <div className='d-grid py-4'>
                    <button className='btn btn-danger py-2' type='button' onClick={handleOffcanvas}>
                      Customize
                    </button>
                  </div>

                  <div className='d-grid py-4'>
                    <div className='form-check form-switch'>
                      <input
                        className='form-check-input'
                        type='checkbox'
                        id='removeBrand'
                        name='removeBrand'
                        checked={options.removeBrand}
                        onChange={handleOptions}
                      />
                      <label className='form-check-label' htmlFor='removeBrand'>
                        Remove Brand
                      </label>
                    </div>
                  </div>

                  <Download />
                </div>
              </div>
            </div>

            <div className='col-12 col-md-6 col-lg-6'>
              <h1 className='display-5 fw-bold lh-1 mb-3 pt-5'>
                Impress your clients
                <br />
                surprise your firends!
              </h1>
              <p className='lead'>Generate a modern, styled and branded QR code for Free!</p>
              <Tabs className='mt-5' selectedTab={selectedTab} onClick={setSelectedTab} tabs={tabs} type='pills' />
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <div
        className={`offcanvas offcanvas-start${offcanvas ? ' show' : ''}`}
        style={offcanvas ? { visibility: 'visible' } : { visibility: 'hidden' }}
        tabIndex={-1}
      >
        <div className='offcanvas-header'>
          <h5 className='offcanvas-title'>Customization</h5>
          <button type='button' className='btn-close text-reset' aria-label='Close' onClick={handleOffcanvas}></button>
        </div>
        <div className='offcanvas-body'>
          <div className='main-shape'>
            <div className='row'>
              <label htmlFor='mainShape' className='col-sm-6 col-form-label fw-bold mb-3'>
                Main Shape
              </label>
              <div className='col-sm-6'>
                <select
                  id='mainShape'
                  className='form-select'
                  name='mainShape'
                  value={options.mainShape}
                  onChange={handleOptions}
                >
                  <option value='square'>Square</option>
                  <option value='dots'>Dots</option>
                  <option value='rounded'>Rounded</option>
                  <option value='extra-rounded'>Extra rounded</option>
                  <option value='classy'>Classy</option>
                  <option value='classy-rounded'>Classy rounded</option>
                </select>
              </div>
            </div>

            <div className='row'>
              <label htmlFor='shapeColor' className='col-sm-6 col-form-label fw-bold mb-3'>
                Shape Color
              </label>
              <div className='col-sm-6'>
                <input
                  id='shapeColor'
                  className='form-control form-control-color'
                  name='shapeColor'
                  type='color'
                  onChange={handleOptions}
                  value={options.shapeColor}
                />
              </div>
            </div>
          </div>

          <hr />

          <div className='square-shape '>
            <div className='row pt-3'>
              <label htmlFor='squareShape' className='col-sm-6 col-form-label fw-bold mb-3'>
                Corners Square Shape
              </label>
              <div className='col-sm-6'>
                <select
                  id='squareShape'
                  className='form-select'
                  name='squareShape'
                  value={options.squareShape}
                  onChange={handleOptions}
                >
                  <option value='square'>Square</option>
                  <option value='dot'>Dot</option>
                  <option value='extra-rounded'>Extra rounded</option>
                </select>
              </div>
            </div>

            <div className='row'>
              <label htmlFor='squareColor' className='col-sm-6 col-form-label fw-bold mb-3'>
                Corners Squares Color
              </label>
              <div className='col-sm-6'>
                <input
                  id='squareColor'
                  className='form-control form-control-color'
                  type='color'
                  name='squareColor'
                  value={options.squareColor}
                  onChange={handleOptions}
                />
              </div>
            </div>
          </div>

          <hr />

          <div className='corners-dots'>
            <div className='row pt-3'>
              <label htmlFor='cornersDotShape' className='col-sm-6 col-form-label fw-bold mb-3'>
                Corners Dot Shape
              </label>
              <div className='col-sm-6'>
                <select
                  id='cornersDotShape'
                  className='form-select'
                  name='cornersDotShape'
                  value={options.cornersDotShape}
                  onChange={handleOptions}
                >
                  <option value='square'>Square</option>
                  <option value='dot'>Dot</option>
                </select>
              </div>
            </div>

            <div className='row'>
              <label htmlFor='cornersDotColor' className='col-sm-6 col-form-label fw-bold mb-3'>
                Corners Dot Color
              </label>
              <div className='col-sm-6'>
                <input
                  id='cornersDotColor'
                  className='form-control form-control-color'
                  name='cornersDotColor'
                  type='color'
                  value={options.cornersDotColor}
                  onChange={handleOptions}
                />
              </div>
            </div>
          </div>

          <hr />

          <div className='brand'>
            <div className='row pt-3'>
              <label htmlFor='image' className='col-sm-3 col-form-label fw-bold mb-3'>
                Logo
              </label>
              <div className='col-sm-9'>
                <div className='input-group'>
                  <input
                    id='image'
                    className='form-control'
                    type='file'
                    onChange={handleOptions}
                    name='image'
                    ref={uploadRef}
                    accept='.gif,.jpg,.jpeg,.png,.gif,.bmp,.webp,.svg'
                  />

                  <span
                    className={`input-group-text${
                      uploadRef.current && uploadRef.current.value === '' ? ' disabled' : ''
                    }`}
                    onClick={handleResetImage}
                    role='button'
                  >
                    &#x2715;
                  </span>
                </div>
                <div className='form-text'>
                  Upload your own logo image as .png, .jpg, .gif or .svg file format with a maximum size of 2 MB.
                </div>
              </div>
            </div>

            <div className='row pt-3'>
              <label htmlFor='imageMargin' className='col-sm-6 col-form-label fw-bold mb-3'>
                Logo Margin
              </label>
              <div className='col-sm-6'>
                <input
                  id='imageMargin'
                  className='form-control'
                  type='number'
                  name='imageMargin'
                  max={100}
                  value={options.imageMargin}
                  onChange={handleOptions}
                />
              </div>
            </div>
          </div>

          <hr />

          <div className='d-grid gap-2 d-md-flex justify-content-md-end pt-4'>
            <button className='btn btn-outline-danger me-auto' type='button' onClick={handleReset}>
              Reset
            </button>
            <button className='btn btn-primary' type='button' onClick={handleSavedValues}>
              Load Saved Style
            </button>
            <button className='btn btn-success' type='button' onClick={handleSave}>
              {isSave ? 'Saving..' : 'Save Style'}
            </button>
          </div>
        </div>
      </div>
      {offcanvas && <div ref={offcanvasRef} className={`modal-backdrop ${offcanvas ? 'fade show' : ''}`}></div>}
    </div>
  )
}

export default App
