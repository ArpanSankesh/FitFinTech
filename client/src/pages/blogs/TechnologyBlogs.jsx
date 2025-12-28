import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { AppContext } from '../../context/AppContext'
import { FaClock, FaCalendarAlt } from "react-icons/fa";
import { Link } from 'react-router-dom';

const TechnologyBlogs = () => {

    const { backendUrl } = useContext(AppContext);
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await axios.get(`${backendUrl}/api/blogs/list`);
                if (response.data.success) {
                    const techData = response.data.blogs.filter(blog => blog.category === "Technology");
                    setBlogs(techData);
                }
            } catch (error) {
                console.error("Error fetching blogs:", error);
            }
        };
        fetchBlogs();
    }, [backendUrl]);

    const getExcerpt = (htmlContent) => {
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = htmlContent;
        const plainText = tempDiv.textContent || tempDiv.innerText || "";

        
        if (plainText.length > 120) {
            return plainText.substring(0, 120) + "...";
        }
        return plainText;
    }

    const calculateReadTime = (text) => {
        const words = text.split(/\s+/).length;
        const minutes = Math.ceil(words / 200);
        return `${minutes} min read`;
    }

    return (
        <div className='md:px-20 px-4 py-24 bg-white min-h-screen'>

            <h1 className='text-3xl md:text-5xl font-bold mb-4 text-center text-teal-600'>
                Tech Insights
            </h1>
            <p className='text-gray-500 mb-12 text-lg leading-tight text-center max-w-xl mx-auto'>
                Latest gadgets, AI tools, and productivity software.
            </p>

            <div className='max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8'>

                {blogs.length > 0 ? blogs.map((card, index) => {
                    const plainTextDescription = getExcerpt(card.description);
                    const readTime = calculateReadTime(plainTextDescription);

                    return (
                        <Link to={`/blogs/${card._id}`} key={index} className='group bg-white rounded-xl md:rounded-2xl overflow-hidden border border-gray-100 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer flex flex-col h-full'>
                            <div className='relative h-32 md:h-56 overflow-hidden'>
                                <img src={card.image} alt={card.title} className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-500' />
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
                    <div className="col-span-full text-center text-gray-500">No tech articles found !</div>
                )}
            </div>
        </div>
    )
}

export default TechnologyBlogs