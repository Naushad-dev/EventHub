import React from 'react'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import {Outlet} from "react-router-dom"
const App = () => {
  return (
  <>
  <Navbar/>
  <Outlet/>
  </>
  )
}

export default App