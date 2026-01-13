import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { AppContext } from '../context/AppContext' 
import { FaClock, FaCalendarAlt, FaArrowRight, FaPlay } from "react-icons/fa";
import { Link } from 'react-router-dom';

const LatestArticle = () => {

    const { backendUrl } = useContext(AppContext);
    const [latestBlogs, setLatestBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await axios.get(`${backendUrl}/api/blogs/list`);
                if (response.data.success) {
                    const allBlogs = response.data.blogs;
                    // Sort by Date (Newest First)
                    const sortedBlogs = allBlogs.sort((a, b) => new Date(b.date) - new Date(a.date));
                    setLatestBlogs(sortedBlogs.slice(0, 6));
                }
            } catch (error) {
                console.error("Error fetching latest blogs:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchBlogs();
    }, [backendUrl]);

    const getExcerpt = (htmlContent) => {
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = htmlContent;
        return tempDiv.textContent || tempDiv.innerText || "";
    }

    const calculateReadTime = (text) => {
        const words = text.split(/\s+/).length;
        const minutes = Math.ceil(words / 200);
        return `${minutes} min read`;
    }

    if (loading) {
        return <div className='py-20 text-center text-teal-600 font-bold'>Loading latest articles...</div>;
    }

    return (
        <div className='md:px-30 px-5 py-12 bg-white'>
            
            <h1 className='text-3xl md:text-5xl font-bold mb-4 '>
                Latest Articles
            </h1>
            <p className='text-gray-500 max-w-2xl mb-12 text-lg leading-tight'>
                Expert insights across fitness, finance, and technology
            </p>

            <div className='max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                
                {latestBlogs.map((card, index) => {
                    const plainTextDescription = getExcerpt(card.description);
                    const readTime = calculateReadTime(plainTextDescription);

                    return (
                        <Link
                            to={`/blogs/${card._id}`} 
                            key={index} 
                            className='group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer flex flex-col h-full'
                        >
                            {/* Media Wrapper */}
                            <div className='relative h-56 overflow-hidden bg-gray-100'>
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
                                            <div className="bg-black/30 p-3 rounded-full backdrop-blur-sm">
                                                <FaPlay className="text-white text-lg ml-1" />
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <img 
                                        src={card.image} 
                                        alt={card.title} 
                                        className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-500' 
                                    />
                                )}
                                <div className='absolute top-4 left-4 bg-teal-600/90 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide shadow-sm'>
                                    {card.category}
                                </div>
                            </div>

                            <div className='p-6 flex flex-col grow'>
                                <h3 className='text-xl font-bold text-gray-900 mb-3 leading-tight group-hover:text-teal-600 transition-colors line-clamp-2'>
                                    {card.title}
                                </h3>
                                <p className='text-gray-500 text-sm mb-6 leading-relaxed line-clamp-3 grow'>
                                    {plainTextDescription}
                                </p>
                                <div className='border-t border-gray-100 pt-4 flex items-center justify-between text-xs text-gray-400 font-medium'>
                                    <div className='flex items-center gap-4'>
                                        <span className='flex items-center gap-1'>
                                            <FaCalendarAlt /> {new Date(card.date).toLocaleDateString()}
                                        </span>
                                        <span className='flex items-center gap-1'>
                                            <FaClock /> {readTime}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    )
                })}
            </div>

            <div className='mt-16 text-center'>
                 <Link to={'/blogs'}>
                    <button className='inline-flex items-center gap-2 text-teal-700 font-bold hover:gap-4 transition-all border-2 border-teal-700 px-6 py-3 rounded-lg hover:bg-teal-700 hover:text-white'>
                        View All Articles <FaArrowRight />
                    </button>
                 </Link>
            </div>
        </div>
    )
}

export default LatestArticle