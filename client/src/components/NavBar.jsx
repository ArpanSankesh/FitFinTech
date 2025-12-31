import React, { useState } from 'react'
import { FaBars, FaTimes } from "react-icons/fa"
import { Link } from 'react-router-dom'

const NavBar = () => {

    const [isOpen, setIsOpen] = useState(false)


    return (
        <nav className="w-full fixed bg-white z-50">
            <div className='px-5 md:px-30 py-3 md:py-5 flex items-center justify-between'>
                {/* logo */}
                <Link to='/'>
                <div className='text-2xl font-bold text-[#0D9488] cursor-pointer'>FitFinTech</div>
                </Link>


                {/* Desktop view */}
                <ul className='hidden md:flex gap-8 text-lg text-gray-700'>
                    <li><Link to='/blogs' className='cursor-pointer hover:underline font-medium'>All Blogs</Link></li>
                    <li><Link to='/blogs/fitness' className='cursor-pointer hover:underline font-medium'>Fitness Blog</Link></li>
                    <li><Link to='/blogs/finance' className='cursor-pointer hover:underline font-medium'>Finance Blog</Link></li>
                    <li><Link to='/blogs/technology' className='cursor-pointer hover:underline font-medium'>Technology Blog</Link></li>
                    <li><Link to='/tools' className='cursor-pointer hover:underline font-medium'>Tools</Link></li>
                </ul>

                <div className='md:hidden'>
                    {isOpen ? (
                        <FaTimes className="text-2xl text-gray-700 cursor-pointer" onClick={() => setIsOpen(false)} />
                    ) : (
                        <FaBars className="text-2xl text-gray-700 cursor-pointer " onClick={() => setIsOpen(true)} />

                    )}

                </div>
            </div>

            {/* Mobile menu */}
            {isOpen && (
                <div className='bg-white md:hidden top-0 fixed inset-0 z-50 flex flex-col items-center justify-center gap-8'> 
                    <ul className='flex flex-col font-bold gap-8 text-5xl'>
                        <li><Link to='/blogs'  className='cursor-pointer hover:underline font-medium' onClick={() => setIsOpen(false)}>All Blogs</Link></li>
                    <li><Link to='/blogs/fitness'  className='cursor-pointer hover:underline font-medium' onClick={() => setIsOpen(false)}>Fitness Blog</Link></li>
                    <li><Link to='/blogs/finance'  className='cursor-pointer hover:underline font-medium' onClick={() => setIsOpen(false)}>Finance Blog</Link></li>
                    <li><Link to='/blogs/technology'  className='cursor-pointer hover:underline font-medium' onClick={() => setIsOpen(false)}>Technology Blog</Link></li>
                    <li><Link to='/tools'  className='cursor-pointer hover:underline font-medium' onClick={() => setIsOpen(false)}>Tools</Link></li>
                    </ul>
                    <FaTimes className="text-2xl text-gray-700 cursor-pointer absolute right-5 top-5 " onClick={() => setIsOpen(false)} />
                </div>

            )}

        </nav>
    )
}

export default NavBar