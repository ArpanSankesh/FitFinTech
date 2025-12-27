import React from 'react'
import NavBar from './components/NavBar'
import Hero from './components/Hero'
import About from './components/About'
import FeaturedTools from './components/FeaturedTools'

const App = () => {
  return (
    <div>
      <NavBar />
      {/* <Hero />
      <About /> */}
      <FeaturedTools/>
    </div>
  )
}

export default App