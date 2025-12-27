import React from 'react'
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram, FaYoutube, FaRocket } from "react-icons/fa";
import { Link } from 'react-router-dom'; // <--- 1. Import this

const Footer = () => {
  return (
    <div className='bg-[#0f172a] text-gray-300 py-16 px-5 md:px-20 border-t border-gray-800'>
        
        <div className='max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12'>
            
            {/* Brand Info */}
            <div className='lg:col-span-1'>
                <Link to="/" className='flex items-center gap-2 text-white text-2xl font-bold mb-4'>
                    <FaRocket className='text-[#0D9488]' /> FitFinTech
                </Link>
                <p className='text-gray-400 text-sm leading-relaxed pr-5'>
                    Fit Raho. Rich Bano. Smart Jeeyo.
                </p>
            </div>

            {/* Explore Links */}
            <div>
                <h3 className='text-white font-bold text-lg mb-4'>Explore</h3>
                <ul className='space-y-3 text-gray-400'>
                    {/* 2. Use Link for internal pages */}
                    <li><Link to="/blogs" className='hover:text-[#0D9488] transition-colors'>All Blogs</Link></li>
                    <li><Link to="/blogs/fitness" className='hover:text-[#0D9488] transition-colors'>Fitness Blog</Link></li>
                    <li><Link to="/blogs/finance" className='hover:text-[#0D9488] transition-colors'>Finance Blog</Link></li>
                    <li><Link to="/blogs/technology" className='hover:text-[#0D9488] transition-colors'>Technology Blog</Link></li>
                    <li><Link to="/tools" className='hover:text-[#0D9488] transition-colors'>Tools</Link></li>
                </ul>
            </div>

            {/* Company Links */}
            <div>
                <h3 className='text-white font-bold text-lg mb-4'>Company</h3>
                <ul className='space-y-3 text-gray-400'>
                    <li><Link to="/about" className='hover:text-[#0D9488] transition-colors'>About Us</Link></li>
                    <li><Link to="/contact" className='hover:text-[#0D9488] transition-colors'>Contact</Link></li>
                    {/* Privacy usually stays as text or separate page */}
                    <li className='hover:text-[#0D9488] cursor-pointer transition-colors'>Privacy Policy</li>
                    <li className='hover:text-[#0D9488] cursor-pointer transition-colors'>Terms & Conditions</li>
                </ul>
            </div>

             {/* Follow Us (External links use <a>) */}
             <div>
                <h3 className='text-white font-bold text-lg mb-4'>Follow Us</h3>
                <div className='flex gap-4'>
                    <a href="https://facebook.com" target="_blank" rel="noreferrer"><FaFacebook className='text-2xl hover:text-[#0D9488] transition-colors' /></a>
                    <a href="https://twitter.com" target="_blank" rel="noreferrer"><FaTwitter className='text-2xl hover:text-[#0D9488] transition-colors' /></a>
                    <a href="https://linkedin.com" target="_blank" rel="noreferrer"><FaLinkedin className='text-2xl hover:text-[#0D9488] transition-colors' /></a>
                    <a href="https://instagram.com" target="_blank" rel="noreferrer"><FaInstagram className='text-2xl hover:text-[#0D9488] transition-colors' /></a>
                    <a href="https://youtube.com" target="_blank" rel="noreferrer"><FaYoutube className='text-2xl hover:text-[#0D9488] transition-colors' /></a>
                </div>
            </div>

        </div>

        <div className='border-t border-gray-800 pt-8 text-center text-sm text-gray-500'>
            © 2025 FitFinTech. All rights reserved.
        </div>

    </div>
  )
}

export default Footer