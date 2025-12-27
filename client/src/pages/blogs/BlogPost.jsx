import React from 'react'
import { useParams, Link } from 'react-router-dom'
import blogData from '../../Data/BlogData'
import { FaCalendarAlt, FaUser, FaClock, FaArrowLeft, FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";

const BlogPost = () => {
  const { id } = useParams();

  const blog = blogData.find((b) => b.id === id);

  if (!blog) {
    return (
      <div className='h-screen flex flex-col items-center justify-center'>
        <h2 className='text-3xl font-bold text-gray-800 mb-4'>Blog Not Found</h2>
        <Link to="/" className='text-teal-600 underline'>Go Back Home</Link>
      </div>
    );
  }

  return (
    <div className='bg-white min-h-screen pt-24 pb-20 px-5 md:px-20'>
        
        <div className='max-w-4xl mx-auto'>
            
            {/* Back Button */}
            <Link to="/blogs" className='inline-flex items-center gap-2 text-gray-500 hover:text-teal-600 transition-colors mb-8 font-medium'>
                <FaArrowLeft /> Back to Articles
            </Link>

            {/* 1. Cover Image */}
            <div className='w-full h-75 md:h-125 rounded-3xl overflow-hidden shadow-lg mb-10'>
                <img 
                    src={blog.image} 
                    alt={blog.title} 
                    className='w-full h-full object-cover'
                />
            </div>

            {/* 2. Header Content */}
            <div className='mb-10'>
                {/* Category Badge */}
                <span className='bg-teal-100 text-teal-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide'>
                    {blog.category}
                </span>

                {/* Title */}
                <h1 className='text-3xl md:text-5xl font-bold text-gray-900 mt-4 mb-6 leading-tight'>
                    {blog.title}
                </h1>

                {/* Meta Data (Author, Date, Time) */}
                <div className='flex flex-wrap items-center gap-6 text-gray-500 text-sm border-b border-gray-100 pb-8'>
                    <div className='flex items-center gap-2'>
                        <div className='w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-600'>
                            <FaUser size={12} />
                        </div>
                        <span className='font-medium text-gray-900'>{blog.author}</span>
                    </div>
                    <span className='flex items-center gap-2'><FaCalendarAlt /> {blog.createdAt}</span>
                    <span className='flex items-center gap-2'><FaClock /> {blog.readTime}</span>
                </div>
            </div>

            {/* 3. The Blog Content */}
            <div className='prose prose-lg max-w-none text-gray-700 leading-relaxed'>
                {/* Since your data is a single string with "\n", 
                   we split it to create actual paragraphs 
                */}
                {blog.content.split('\n').map((paragraph, index) => (
                    <p key={index} className='mb-6 text-lg'>
                        {paragraph}
                    </p>
                ))}
            </div>

            {/* 4. Social Share (Optional visual touch) */}
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