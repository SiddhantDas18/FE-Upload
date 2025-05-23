import FileUpload from './components/fileUpload'
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom'
import './App.css'
import Nav from './components/nav'
import Files from './components/files'

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
            <Route path="/" element={<FileUpload />} />
            <Route path="/files" element={<Files />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}




export default App
