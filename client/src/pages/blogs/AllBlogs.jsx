import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { AppContext } from '../../context/AppContext'
import { FaClock, FaCalendarAlt } from "react-icons/fa";
import { Link } from 'react-router-dom';

const AllBlogs = () => {
    
    const { backendUrl } = useContext(AppContext);
    const [blogs, setBlogs] = useState([]);
    const [activeCategory, setActiveCategory] = useState("All");
    const [loading, setLoading] = useState(true);

    const categories = ["All", "Fitness", "Finance", "Technology"];

    // 1. Fetch Blogs from Backend
    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await axios.get(`${backendUrl}/api/blogs/list`);
                if (response.data.success) {
                    setBlogs(response.data.blogs);
                }
            } catch (error) {
                console.error("Error fetching blogs:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchBlogs();
    }, [backendUrl]);

    // 2. Filter Logic
    const filteredBlogs = activeCategory === "All" 
        ? blogs 
        : blogs.filter(blog => blog.category === activeCategory);

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
        return <div className='min-h-screen flex items-center justify-center text-teal-600 font-bold'>Loading articles...</div>;
    }

    return (
        <div className='md:px-20 px-4 py-24 bg-white min-h-screen'>
            
            {/* Header */}
            <h1 className='text-3xl md:text-5xl font-bold mb-4 text-center text-gray-900'>
                All Articles
            </h1>
            <p className='text-gray-500 mb-8 text-lg leading-tight text-center max-w-xl mx-auto'>
                Expert insights across fitness, finance, and technology
            </p>

            {/* Filter Buttons */}
            <div className='flex flex-wrap justify-center md:gap-4 gap-2 mb-12'>
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

            {/* Articles Grid */}
            <div className='max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8'>
                
                {filteredBlogs.length > 0 ? filteredBlogs.map((card, index) => {
                    
                    // Prepare data for display
                    const plainTextDescription = getExcerpt(card.description);
                    const readTime = calculateReadTime(plainTextDescription);

                    return (
                        <Link to={`/blogs/${card._id}`} // Use _id for MongoDB
                            key={index} 
                            className='group bg-white rounded-xl md:rounded-2xl overflow-hidden border border-gray-100 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer flex flex-col h-full'
                        >
                            {/* Image Wrapper */}
                            <div className='relative h-48 md:h-56 overflow-hidden bg-gray-100'>
                                <img 
                                    src={card.image} 
                                    alt={card.title} 
                                    className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-500' 
                                />
                                
                                <div className='absolute top-4 left-4 bg-teal-600/90 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide shadow-sm'>
                                    {card.category}
                                </div>
                            </div>

                            {/* Content Area */}
                            <div className='p-5 md:p-6 flex flex-col grow'>
                                
                                <h3 className='text-lg md:text-xl font-bold text-gray-900 mb-3 leading-tight group-hover:text-teal-600 transition-colors line-clamp-2'>
                                    {card.title}
                                </h3>
                                
                                <p className='text-gray-500 text-sm mb-6 leading-relaxed line-clamp-3 grow'>
                                    {plainTextDescription}
                                </p>

                                {/* Meta Data */}
                                <div className='border-t border-gray-100 pt-4 mt-auto flex items-center justify-between text-xs text-gray-400 font-medium'>
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
                }) : (
                    <div className="col-span-full text-center text-gray-500 py-10">
                        No articles found in this category.
                    </div>
                )}
            </div>
            
        </div>
    )
}

export default AllBlogs