import React from 'react'
import Hero from '../components/Hero.jsx'
import About from '../components/About.jsx'
import FeaturedTools from '../components/FeaturedTools.jsx'
import LatestArticle from '../components/LatestArticle.jsx'
import Newsletter from '../components/Newsletter.jsx'

const Home = () => {
    return (
        <div>
            <Hero />
            <About />
            <FeaturedTools />
            <LatestArticle />
            <Newsletter />
        </div>
    )
}

export default Home