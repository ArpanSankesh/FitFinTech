import React from 'react'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import Home from './pages/Home'
import { Routes, Route } from 'react-router-dom'
import AllBlogs from './pages/Blogs page/AllBlogs'

const App = () => {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/blogs" element={<AllBlogs/>} />
        <Route path="/blogs/fitness" element={<AllBlogs/>} />
        <Route path="/blogs/finance" element={<AllBlogs/>} />
        <Route path="/blogs/technology" element={<AllBlogs/>} />
        
      </Routes>
      <Footer/>
    </div>
  )
}

export default App