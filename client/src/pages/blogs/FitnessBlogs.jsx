import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { AppContext } from '../../context/AppContext'
import { FaClock, FaCalendarAlt, FaPlay } from "react-icons/fa";
import { Link } from 'react-router-dom';

const FitnessBlogs = () => {

    const { backendUrl } = useContext(AppContext);
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await axios.get(`${backendUrl}/api/blogs/list`);
                if (response.data.success) {
                    // Filter & Sort (Newest First)
                    const fitnessData = response.data.blogs
                        .filter(blog => blog.category === "Fitness")
                        .sort((a, b) => new Date(b.date) - new Date(a.date));
                    
                    setBlogs(fitnessData);
                }
            } catch (error) {
                console.error("Error fetching blogs:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchBlogs();
    }, [backendUrl]);

    const getExcerpt = (htmlContent) => {
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = htmlContent;
        const plainText = tempDiv.textContent || tempDiv.innerText || "";
        return plainText.length > 120 ? plainText.substring(0, 120) + "..." : plainText;
    }

    const calculateReadTime = (text) => {
        const words = text.split(/\s+/).length;
        const minutes = Math.ceil(words / 200);
        return `${minutes} min read`;
    }

    return (
        <div className='md:px-20 px-4 py-24 bg-white min-h-screen'>

            <h1 className='text-3xl md:text-5xl font-bold mb-4 text-center text-teal-600'>
                Fitness Guides
            </h1>
            <p className='text-gray-500 mb-12 text-lg leading-tight text-center max-w-xl mx-auto'>
                Workouts, nutrition, and science-backed health tips.
            </p>

            <div className='max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8'>

                {loading ? (
                    Array(6).fill(0).map((_, index) => (
                        <div key={index} className='bg-white rounded-xl md:rounded-2xl overflow-hidden border border-gray-100 shadow-md flex flex-col h-full animate-pulse'>
                            <div className='h-32 md:h-56 bg-gray-200 w-full'></div>
                            <div className='p-3 md:p-6 flex flex-col grow'>
                                <div className='h-4 md:h-6 bg-gray-200 rounded w-3/4 mb-3'></div>
                                <div className='hidden md:block h-3 bg-gray-200 rounded w-full mb-2'></div>
                                <div className='hidden md:block h-3 bg-gray-200 rounded w-5/6 mb-6'></div>
                                <div className='mt-auto border-t border-gray-100 pt-3 flex items-center justify-between'>
                                    <div className='h-3 bg-gray-200 rounded w-1/3'></div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    blogs.length > 0 ? blogs.map((card, index) => {
                        const plainTextDescription = getExcerpt(card.description);
                        const readTime = calculateReadTime(plainTextDescription);

                        return (
                            <Link to={`/blogs/${card._id}`} key={index} className='group bg-white rounded-xl md:rounded-2xl overflow-hidden border border-gray-100 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer flex flex-col h-full'>
                                
                                {/* Media Display */}
                                <div className='relative h-32 md:h-56 overflow-hidden'>
                                    {card.mediaType === 'video' ? (
                                        <>
                                            <video 
                                                src={card.image} 
                                                className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-500'
                                                muted
                                                loop
                                                onMouseOver={event => event.target.play()}
                                                onMouseOut={event => event.target.pause()}
                                            />
                                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none group-hover:opacity-0 transition-opacity duration-300">
                                                <div className="bg-black/30 p-2 rounded-full backdrop-blur-sm">
                                                    <FaPlay className="text-white text-xs ml-0.5" />
                                                </div>
                                            </div>
                                        </>
                                    ) : (
                                        <img src={card.image} alt={card.title} className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-500' />
                                    )}
                                </div>

                                <div className='p-3 md:p-6 flex flex-col grow'>
                                    <h3 className='text-sm md:text-xl font-bold text-gray-900 mb-2 md:mb-3 leading-tight group-hover:text-teal-600 transition-colors line-clamp-2'>
                                        {card.title}
                                    </h3>
                                    <p className='hidden md:block text-gray-500 text-sm mb-6 leading-relaxed line-clamp-3 grow'>
                                        {plainTextDescription}
                                    </p>
                                    <div className='border-t border-gray-100 pt-3 mt-auto flex items-center justify-between text-[10px] md:text-xs text-gray-400 font-medium'>
                                        <div className='flex items-center gap-2 md:gap-4'>
                                            <span className='flex items-center gap-1'><FaCalendarAlt /> {new Date(card.date).toLocaleDateString()}</span>
                                            <span className='hidden md:flex items-center gap-1'><FaClock /> {readTime}</span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        )
                    }) : (
                        <div className="col-span-full text-center text-gray-500">No fitness articles found.</div>
                    )
                )}
            </div>
        </div>
    )
}

export default FitnessBlogs