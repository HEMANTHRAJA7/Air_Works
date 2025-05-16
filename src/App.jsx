import React from 'react'
import { BrowserRouter, Route , Routes, Navigate} from 'react-router-dom'
import Home from './pages/LandingPage/home'
import Signin from "./pages/signin"
import CreateAccount from "./pages/createAccount"

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/createAccount" element={<CreateAccount />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App