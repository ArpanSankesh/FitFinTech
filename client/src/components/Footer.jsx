import React from 'react'
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram, FaYoutube, FaRocket } from "react-icons/fa";

const Footer = () => {
  return (
    <div className='bg-[#0f172a] text-gray-300 py-16 px-5 md:px-20 border-t border-gray-800'>
        
        {/* Top Section: Grid Layout */}
        <div className='max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12'>
            
            {/* Column 1: Brand Info */}
            <div className='lg:col-span-1'>
                <div className='flex items-center gap-2 text-white text-2xl font-bold mb-4'>
                    <FaRocket className='text-[#0D9488]' /> FitFinTech
                </div>
                <p className='text-gray-400 text-sm leading-relaxed pr-5'>
                    Fit Raho. Rich Bano. Smart Jeeyo.
                </p>
            </div>

            {/* Column 2: Content Links */}
            <div>
                <h3 className='text-white font-bold text-lg mb-4'>Explore</h3>
                <ul className='space-y-3 text-gray-400'>
                    <li className='hover:text-[#0D9488] cursor-pointer transition-colors'>Fitness Blog</li>
                    <li className='hover:text-[#0D9488] cursor-pointer transition-colors'>Finance Blog</li>
                    <li className='hover:text-[#0D9488] cursor-pointer transition-colors'>Technology Blog</li>
                    <li className='hover:text-[#0D9488] cursor-pointer transition-colors'>Blogs</li>
                    <li className='hover:text-[#0D9488] cursor-pointer transition-colors'>Tools</li>
                </ul>
            </div>

            {/* Column 3: Company Links */}
            <div>
                <h3 className='text-white font-bold text-lg mb-4'>Company</h3>
                <ul className='space-y-3 text-gray-400'>
                    <li className='hover:text-[#0D9488] cursor-pointer transition-colors'>About Us</li>
                    <li className='hover:text-[#0D9488] cursor-pointer transition-colors'>Contact</li>
                    <li className='hover:text-[#0D9488] cursor-pointer transition-colors'>Privacy Policy</li>
                    <li className='hover:text-[#0D9488] cursor-pointer transition-colors'>Terms & Conditions</li>
                </ul>
            </div>

             {/* Column 4: Follow Us */}
             <div>
                <h3 className='text-white font-bold text-lg mb-4'>Follow Us</h3>
                <div className='flex gap-4'>
                    <FaFacebook className='text-2xl hover:text-[#0D9488] cursor-pointer transition-colors' />
                    <FaTwitter className='text-2xl hover:text-[#0D9488] cursor-pointer transition-colors' />
                    <FaLinkedin className='text-2xl hover:text-[#0D9488] cursor-pointer transition-colors' />
                    <FaInstagram className='text-2xl hover:text-[#0D9488] cursor-pointer transition-colors' />
                    <FaYoutube className='text-2xl hover:text-[#0D9488] cursor-pointer transition-colors' />
                </div>
            </div>

        </div>

        {/* Bottom Bar */}
        <div className='border-t border-gray-800 pt-8 text-center text-sm text-gray-500'>
            © 2025 FitFinTech. All rights reserved.
        </div>

    </div>
  )
}

export default Footer