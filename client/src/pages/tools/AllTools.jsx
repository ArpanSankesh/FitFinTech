import React, { useState, useEffect } from 'react'
import { toolsData } from '../../Data/ToolsData'
import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const AllTools = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    // Simulate loading for 1 second to show the skeleton
    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className='md:px-20 px-4 py-24 bg-gray-50 min-h-screen'>
            
            {/* Header */}
            <div className='text-center mb-16'>
                <h1 className='text-3xl md:text-5xl font-bold mb-4 text-gray-900'>
                    Our Tools 
                </h1>
                <p className='text-gray-500 text-lg max-w-xl mx-auto'>
                    Expert insights and calculators across fitness, finance, and technology.
                </p>
            </div>

            {/* Tools Grid */}
            <div className='max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8'>
                
                {loading ? (
                    // --- SKELETON LOADING STATE ---
                    [1, 2, 3, 4, 5, 6].map((n) => (
                        <div key={n} className='bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 animate-pulse'>
                            {/* Image Skeleton */}
                            <div className='h-48 bg-gray-200 w-full'></div>
                            {/* Content Skeleton */}
                            <div className='p-6'>
                                <div className='h-4 bg-gray-200 rounded w-1/4 mb-4'></div>
                                <div className='h-8 bg-gray-200 rounded w-3/4 mb-4'></div>
                                <div className='h-4 bg-gray-200 rounded w-full mb-2'></div>
                                <div className='h-4 bg-gray-200 rounded w-5/6'></div>
                            </div>
                        </div>
                    ))
                ) : (
                    // --- REAL DATA MAPPING ---
                    toolsData.map((tool) => (
                        <div 
                            key={tool.id} 
                            onClick={() => navigate(tool.path)}
                            className='group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer flex flex-col h-full'
                        >
                            {/* Image Wrapper */}
                            <div className='relative h-48 overflow-hidden'>
                                <img 
                                    src={tool.image} 
                                    alt={tool.title} 
                                    className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-500' 
                                />
                                {/* Category Badge */}
                                <div className={`absolute top-4 left-4 ${tool.color} text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide shadow-md`}>
                                    {tool.category}
                                </div>
                            </div>

                            {/* Content Area */}
                            <div className='p-6 flex flex-col grow'>
                                <h3 className='text-xl font-bold text-gray-900 mb-3 group-hover:text-teal-600 transition-colors'>
                                    {tool.title}
                                </h3>
                                
                                <p className='text-gray-500 text-sm leading-relaxed mb-6 line-clamp-3'>
                                    {tool.desc}
                                </p>

                                {/* Bottom Link */}
                                <div className='mt-auto flex items-center gap-2 text-sm font-bold text-gray-400 group-hover:text-teal-600 transition-colors uppercase tracking-wider'>
                                    Try Tool <FaArrowRight className='group-hover:translate-x-1 transition-transform' />
                                </div>
                            </div>
                        </div>
                    ))
                )}

            </div>
        </div>
    )
}

export default AllTools