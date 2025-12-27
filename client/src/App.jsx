import React from 'react'

import { Routes, Route } from 'react-router-dom'

import NavBar from './components/NavBar'
import Footer from './components/Footer'
import Home from './pages/Home'

import AllBlogs from './pages/blogs/AllBlogs'
import FitnessBlogs from './pages/blogs/FitnessBlogs'
import FinanceBlogs from './pages/blogs/FinanceBlogs'
import TechnologyBlogs from './pages/blogs/TechnologyBlogs'
import ScrollToTop from './components/ScrollToTop'

const App = () => {
  return (
    <div>
      <ScrollToTop />
      
      <NavBar />
      <Routes>
        <Route path="/" element={<Home/>} />

        <Route path="/blogs" element={<AllBlogs/>} />
        <Route path="/blogs/fitness" element={<FitnessBlogs/>} />
        <Route path="/blogs/finance" element={<FinanceBlogs/>} />
        <Route path="/blogs/technology" element={<TechnologyBlogs/>} />
        
      </Routes>
      <Footer/>
    </div>
  )
}

export default App