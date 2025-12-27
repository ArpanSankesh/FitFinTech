import React from 'react'
import NavBar from './components/NavBar'
import Hero from './components/Hero'
import About from './components/About'
import FeaturedTools from './components/FeaturedTools'
import LatestArticle from './components/LatestArticle'

const App = () => {
  return (
    <div>
      <NavBar />
      <Hero />
      <About />
      <FeaturedTools/>
      <LatestArticle/>
    </div>
  )
}

export default App