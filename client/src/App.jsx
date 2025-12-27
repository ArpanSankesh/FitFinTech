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
import BlogPost from './pages/blogs/BlogPost'
import AllTools from './pages/tools/AllTools'

import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsConditions from './pages/TermsAndCondition';

const App = () => {
  return (
    <div>
      <ScrollToTop />

      <NavBar />
      <Routes>
        {/* home */}
        <Route path="/" element={<Home />} />

        {/* Blogs */}
        <Route path="/blogs" element={<AllBlogs />} />
        <Route path="/blogs/fitness" element={<FitnessBlogs />} />
        <Route path="/blogs/finance" element={<FinanceBlogs />} />
        <Route path="/blogs/technology" element={<TechnologyBlogs />} />
        <Route path="/blogs/:id" element={<BlogPost />} />

        {/* Tools */}
        <Route path="/tools" element={<AllTools />} />

        {/* Other Routes */}
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-conditions" element={<TermsConditions />} />

      </Routes>
      <Footer />
    </div>
  )
}

export default App