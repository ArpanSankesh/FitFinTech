import React from 'react'

import { Routes, Route, useLocation } from 'react-router-dom'

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
import Login from './pages/Login'
import { ToastContainer } from 'react-toastify'
import AdminDashboard from './pages/admin/AdminDashboard'
import AddBlog from './pages/admin/AddBlog'
import ViewBlogs from './pages/admin/ViewBlogs'
import EditBlog from './pages/admin/EditBlog'
import Profile from './pages/admin/Profile'
import ResetPassword from './pages/admin/ResetPassword'

const App = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');
  return (
    <div>
      <ToastContainer />
      <ScrollToTop />

      {!isAdminRoute && <NavBar />}
      
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

        {/* Admin routes */}
        <Route path="/admin" element={<Login />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/add-blog" element={<AddBlog />} />
        <Route path="/admin/view-blogs" element={<ViewBlogs />} />
        <Route path="/admin/edit-blog/:id" element={<EditBlog />} />
        <Route path="/admin/profile" element={<Profile />} />
        <Route path="/admin/reset-password" element={<ResetPassword />} />

      </Routes>

      {!isAdminRoute && <Footer />}
      
    </div>
  )
}

export default App