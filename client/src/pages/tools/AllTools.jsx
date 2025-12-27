import React, { useState } from 'react'
import toolsData from '../../Data/ToolsData'
import { FaClock, FaCalendarAlt, FaArrowRight } from "react-icons/fa";
import { Link } from 'react-router-dom';

const AllTools = () => {
  const [activeCategory, setActiveCategory] = useState("All");
    
    const filteredBlogs = activeCategory === "All" 
        ? toolsData 
        : toolsData.filter(blog => blog.category === activeCategory);
    
    const categories = ["All", "Fitness", "Finance", "Tech"];

    return (
        <div className='md:px-20 px-4 py-24 bg-white'>
            
            {/* Header */}
            <h1 className='text-3xl md:text-5xl font-bold mb-4 text-center text-gray-900'>
                Our Tools 
            </h1>
            <p className='text-gray-500 mb-8 text-lg leading-tight text-center max-w-xl mx-auto'>
                Expert insights across fitness, finance, and technology
            </p>

            {/* 3. Filter Buttons Section */}
            <div className='flex flex-wrap justify-center md:gap-4 gap-1 mb-12'>
                {categories.map((cat, index) => (
                    <button 
                        key={index}
                        onClick={() => setActiveCategory(cat)}
                        className={`px-4 py-2 md:px-6 md:py-2 rounded-full font-bold text-sm transition-all duration-300 border-2 
                        ${activeCategory === cat 
                            ? "bg-teal-600 text-white border-teal-600 shadow-md" 
                            : "bg-white text-gray-500 border-gray-200 hover:border-teal-400 hover:text-teal-600"}`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Articles Grid  */}
            <div className='max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8'>
                
                {filteredBlogs.map((card, index) => (
                    
                    
                    <Link to={`/blogs/${card.id}`}
                        key={index} 
                        className='group bg-white rounded-xl md:rounded-2xl overflow-hidden border border-gray-100 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer flex flex-col h-full'
                        >
                        {/* Image Wrapper */}
                        <div className='relative h-32 md:h-56 overflow-hidden'>
                            <img 
                                src={card.image} 
                                alt={card.title} 
                                className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-500' 
                                />
                            
                            <div className='absolute top-2 left-2 md:top-4 md:left-4 bg-teal-600/90 backdrop-blur-sm text-white text-[10px] md:text-xs font-bold px-2 py-1 md:px-3 rounded-full uppercase tracking-wide shadow-sm'>
                                {card.category}
                            </div>
                        </div>

                        {/* Content Area */}
                        <div className='p-3 md:p-6 flex flex-col grow'>
                            
                          
                            <h3 className='text-sm md:text-xl font-bold text-gray-900 mb-2 md:mb-3 leading-tight group-hover:text-teal-600 transition-colors line-clamp-2'>
                                {card.title}
                            </h3>

                            
                            <p className='hidden md:block text-gray-500 text-sm mb-6 leading-relaxed line-clamp-3 grow'>
                                {card.excerpt}
                            </p>

                            {/* Meta Data */}
                            <div className='border-t border-gray-100 pt-3 mt-auto flex items-center justify-between text-[10px] md:text-xs text-gray-400 font-medium'>
                                <div className='flex flex-wrap items-center gap-2 md:gap-4'>
                                    <span className='flex items-center gap-1'>
                                        <FaCalendarAlt /> {card.createdAt}
                                    </span>
                                    
                                    <span className='hidden md:flex items-center gap-1'>
                                        <FaClock /> {card.readTime}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </Link>
                
                ))}
            </div>
            
        </div>
    )
}

export default AllTools