import FileUpload from './components/fileUpload'
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom'
import './App.css'
import Nav from './components/nav'
import Files from './components/files'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Nav />
      <main className="flex-grow">
        <Outlet />
      </main>
    </div>
  )
}

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<FileUpload backendUrl={BACKEND_URL} />} />
            <Route path="/files" element={<Files backendUrl={BACKEND_URL} />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}




export default App
