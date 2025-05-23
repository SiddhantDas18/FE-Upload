import { useState } from 'react'
import FileUpload from './components/fileUpload'
import { BrowserRouter,Routes,Route } from 'react-router-dom'

import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <FileUpload />
      </div>
    </>
  )
}

export default App
