import React from 'react'
import { BrowserRouter, Route , Routes, Navigate} from 'react-router-dom'
import Home from './pages/home'
import Signin from "./pages/signin"
import Login from "./pages/login"

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App