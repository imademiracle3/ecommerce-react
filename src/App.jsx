import { useState } from 'react'
import { Route, Routes } from 'react-router'

import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'

import './App.css'
import Home from './pages/Home'
import Auth from './pages/Auth'
import Checkout from './pages/ProductDetails'
import Navbar from './components/Navbar'
import AuthProvider from './context/AuthContext'
import ProductDetails from './pages/ProductDetails'

function App() {
  

  return (
    <AuthProvider>
        <div className='app'>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>} /> 
        <Route path='/auth' element={<Auth/>} /> 
        <Route path='/checkout' element={<Checkout/>} /> 
        <Route path='/products/:id' element={<ProductDetails/>} /> 
      </Routes>

    </div>

    </AuthProvider>
  
  
  )
}

export default App
