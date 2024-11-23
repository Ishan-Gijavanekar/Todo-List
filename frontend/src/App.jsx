import { useState } from 'react'
import React from 'react'
import Navbar from './components/Navbar'
import HomePage from './components/Home'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'
import UpdateItem from './components/UpdateItem'
import DeleteItem from './components/DeleteItem'

function App() {

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path='/signin' element={<SignIn />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/update-item/:id' element={<UpdateItem />} />
          <Route path='/signup-item' element={<DeleteItem />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
