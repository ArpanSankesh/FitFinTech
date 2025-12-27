import React from 'react'
import blogData from '../Data/BlogData'
import { FaClock, FaCalendarAlt, FaArrowRight } from "react-icons/fa";

const LatestArticle = () => {

    return (
        <div className='md:px-30 px-5 py-12 bg-white'>
            
            <h1 className='text-3xl md:text-5xl font-bold mb-4 '>
                Latest Articles
            </h1>
            <p className='text-gray-500 max-w-2xl mb-12 text-lg leading-tight'>
                Expert insights across fitness, finance, and technology
            </p>

            {/* Articles Grid */}
            <div className='max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                
                
                {blogData.slice(0, 6).map((card, index) => (
                    <div 
                        key={index} 
                        className='group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer flex flex-col h-full'
                    >
                        {/* Image Wrapper */}
                        <div className='relative h-56 overflow-hidden'>
                            <img 
                                src={card.image} 
                                alt={card.title} 
                                className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-500' 
                            />
                            {/* Category Badge */}
                            <div className='absolute top-4 left-4 bg-teal-600/90 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide shadow-sm'>
                                {card.category}
                            </div>
                        </div>

                        {/* Content Area */}
                        <div className='p-6 flex flex-col grow'>
                            
                            {/* Title */}
                            <h3 className='text-xl font-bold text-gray-900 mb-3 leading-tight group-hover:text-teal-600 transition-colors line-clamp-2'>
                                {card.title}
                            </h3>

                            {/* Excerpt */}
                            <p className='text-gray-500 text-sm mb-6 leading-relaxed line-clamp-3 grow'>
                                {card.excerpt}
                            </p>

                            {/* Meta Data */}
                            <div className='border-t border-gray-100 pt-4 flex items-center justify-between text-xs text-gray-400 font-medium'>
                                <div className='flex items-center gap-4'>
                                    <span className='flex items-center gap-1'>
                                        <FaCalendarAlt /> {card.createdAt}
                                    </span>
                                    <span className='flex items-center gap-1'>
                                        <FaClock /> {card.readTime}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* View All Button */}
            <div className='mt-16 text-center'>
                 <button className='inline-flex items-center gap-2 text-teal-700 font-bold hover:gap-4 transition-all border-2 border-teal-700 px-6 py-3 rounded-lg hover:bg-teal-700 hover:text-white'>
                    View All Articles <FaArrowRight />
                 </button>
            </div>
        </div>
    )
}

export default LatestArticle