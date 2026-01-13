import React, { useContext, useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'
import { AppContext } from '../../context/AppContext'
import { FaCalendarAlt, FaUser, FaClock, FaArrowLeft, FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";

const BlogPost = () => {
    
    const { id } = useParams();
    const { backendUrl } = useContext(AppContext);
    
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const response = await axios.get(`${backendUrl}/api/blogs/single`, {
                    params: { id }
                });
                
                if (response.data.success) {
                    setBlog(response.data.blog);
                }
            } catch (error) {
                console.error("Error fetching blog:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchBlog();
    }, [id, backendUrl]);

    const calculateReadTime = (htmlContent) => {
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = htmlContent;
        const text = tempDiv.textContent || tempDiv.innerText || "";
        const words = text.split(/\s+/).length;
        const minutes = Math.ceil(words / 200);
        return `${minutes} min read`;
    }

    if (loading) {
        return <div className='h-screen flex items-center justify-center text-teal-600 font-bold'>Loading article...</div>;
    }

    if (!blog) {
        return (
            <div className='h-screen flex flex-col items-center justify-center'>
                <h2 className='text-3xl font-bold text-gray-800 mb-4'>Blog Not Found</h2>
                <Link to="/blogs" className='text-teal-600 underline'>Back to Articles</Link>
            </div>
        );
    }

    return (
        <div className='bg-white min-h-screen pt-24 pb-20 px-5 md:px-20'>
            
            <div className='max-w-4xl mx-auto'>
                
                <Link to="/blogs" className='inline-flex items-center gap-2 text-gray-500 hover:text-teal-600 transition-colors mb-8 font-medium'>
                    <FaArrowLeft /> Back to Articles
                </Link>

                {/* 1. Cover Media (Video or Image) */}
                <div className='w-full h-auto md:h-[500px] rounded-3xl overflow-hidden shadow-lg mb-10 bg-gray-100 flex items-center justify-center'>
                    {blog.mediaType === 'video' ? (
                        <video 
                            src={blog.image} 
                            controls 
                            autoPlay 
                            muted 
                            className='w-full h-full object-contain bg-black'
                        />
                    ) : (
                        <img 
                            src={blog.image} 
                            alt={blog.title} 
                            className='w-full h-full object-cover'
                        />
                    )}
                </div>

                {/* 2. Header Content */}
                <div className='mb-10'>
                    <span className='bg-teal-100 text-teal-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide'>
                        {blog.category}
                    </span>

                    <h1 className='text-3xl md:text-5xl font-bold text-gray-900 mt-4 mb-6 leading-tight'>
                        {blog.title}
                    </h1>

                    <div className='flex flex-wrap items-center gap-6 text-gray-500 text-sm border-b border-gray-100 pb-8'>
                        <div className='flex items-center gap-2'>
                            <div className='w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-600'>
                                <FaUser size={12} />
                            </div>
                            <span className='font-medium text-gray-900'>{blog.author}</span>
                        </div>
                        <span className='flex items-center gap-2'>
                            <FaCalendarAlt /> {new Date(blog.date).toLocaleDateString()}
                        </span>
                        <span className='flex items-center gap-2'>
                            <FaClock /> {calculateReadTime(blog.description)}
                        </span>
                    </div>
                </div>

                {/* 3. Content */}
                <div 
                    className='prose prose-lg prose-teal max-w-none text-gray-700 leading-relaxed'
                    dangerouslySetInnerHTML={{ __html: blog.description }} 
                />

                {/* 4. Social Share */}
                <div className='mt-12 pt-8 border-t border-gray-100'>
                    <h3 className='text-gray-900 font-bold mb-4'>Share this article</h3>
                    <div className='flex gap-4'>
                        <button className='w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 transition'><FaFacebook /></button>
                        <button className='w-10 h-10 rounded-full bg-sky-500 text-white flex items-center justify-center hover:bg-sky-600 transition'><FaTwitter /></button>
                        <button className='w-10 h-10 rounded-full bg-blue-800 text-white flex items-center justify-center hover:bg-blue-900 transition'><FaLinkedin /></button>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default BlogPost