import React from 'react'
import NavBar from './components/NavBar'
import Hero from './components/Hero'
import About from './components/About'
import FeaturedTools from './components/FeaturedTools'
import LatestArticle from './components/LatestArticle'
import Newsletter from './components/Newsletter'
import Footer from './components/Footer'

const App = () => {
  return (
    <div>
      <NavBar />
      <Hero />
      <About />
      <FeaturedTools/>
      <LatestArticle/>
      <Newsletter/>
      <Footer/>
    </div>
  )
}

export default App