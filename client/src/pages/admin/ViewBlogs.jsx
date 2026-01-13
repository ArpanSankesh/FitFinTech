import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { AppContext } from '../../context/AppContext'
import { toast } from 'react-toastify'
import { FaTrash, FaArrowLeft, FaEdit, FaEye, FaExclamationTriangle, FaVideo } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

const ViewBlogs = () => {

    const { backendUrl, token } = useContext(AppContext);
    const navigate = useNavigate();
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [blogToDelete, setBlogToDelete] = useState(null);

    const fetchBlogs = async () => {
        try {
            const response = await axios.get(`${backendUrl}/api/blogs/list`);
            if (response.data.success) {
                // SORTING: Newest First
                const sortedBlogs = response.data.blogs.sort((a, b) => new Date(b.date) - new Date(a.date));
                setBlogs(sortedBlogs);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    const confirmDelete = (id) => {
        setBlogToDelete(id);
        setShowDeleteModal(true);
    }

    const executeDelete = async () => {
        try {
            const response = await axios.post(`${backendUrl}/api/blogs/remove`, { id: blogToDelete }, {
                headers: { token }
            });

            if (response.data.success) {
                toast.success("Blog Deleted Successfully");
                fetchBlogs(); 
                setShowDeleteModal(false);
                setBlogToDelete(null);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    useEffect(() => {
        fetchBlogs();
    }, []);

    return (
        <div className='min-h-screen bg-gray-50 p-8 relative '>
            
            <div className='max-w-6xl mx-auto flex items-center justify-between mb-8'>
                <button 
                    onClick={() => navigate('/admin/dashboard')}
                    className='flex items-center gap-2 text-gray-600 hover:text-teal-600 transition-colors'
                >
                    <FaArrowLeft /> Back to Dashboard
                </button>
                <h1 className='text-2xl font-bold text-gray-800'>Manage Blog Posts</h1>
            </div>

            <div className='max-w-6xl mx-auto bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden'>
                
                <div className='grid grid-cols-[1fr_3fr_1fr_1fr_1fr] bg-gray-50 border-b border-gray-200 p-4 text-sm font-bold text-gray-600'>
                    <p>Cover</p>
                    <p>Title</p>
                    <p>Category</p>
                    <p>Date</p>
                    <p className='text-center'>Actions</p>
                </div>

                {loading ? (
                    Array(5).fill(0).map((_, index) => (
                        <div key={index} className='grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center p-4 border-b border-gray-100 animate-pulse'>
                            <div className='w-16 h-10 bg-gray-200 rounded'></div>
                            <div className='h-4 bg-gray-200 rounded w-3/4'></div>
                            <div className='h-6 bg-gray-200 rounded-full w-20'></div>
                            <div className='h-4 bg-gray-200 rounded w-24'></div>
                            <div className='flex items-center justify-center gap-3'>
                                <div className='w-6 h-6 bg-gray-200 rounded-full'></div>
                                <div className='w-6 h-6 bg-gray-200 rounded-full'></div>
                                <div className='w-6 h-6 bg-gray-200 rounded-full'></div>
                            </div>
                        </div>
                    ))
                ) : (
                    blogs.map((item, index) => (
                        <div key={index} className='grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors text-sm text-gray-700'>
                            
                            {/* Handle Video vs Image */}
                            <div className='w-16 h-10 rounded overflow-hidden bg-gray-200 relative group'>
                                {item.mediaType === 'video' ? (
                                    <>
                                        <video 
                                            src={item.image} 
                                            className='w-full h-full object-cover' 
                                            muted 
                                        />
                                        <div className='absolute inset-0 flex items-center justify-center bg-black/20'>
                                            <FaVideo className='text-white text-xs' />
                                        </div>
                                    </>
                                ) : (
                                    <img src={item.image} alt="Thumbnail" className='w-full h-full object-cover' />
                                )}
                            </div>
                            
                            <p className='font-medium truncate pr-4'>{item.title}</p>
                            
                            <p className='inline-block'>
                                <span className='px-3 py-1 bg-teal-50 text-teal-700 rounded-full text-xs font-semibold'>
                                    {item.category}
                                </span>
                            </p>
                            
                            <p>{new Date(item.date).toLocaleDateString()}</p>
                            
                            <div className='flex items-center justify-center gap-3'>
                                <button onClick={() => navigate(`/blogs/${item._id}`)} className='text-blue-500 hover:text-blue-700 transition-colors p-1'>
                                    <FaEye />
                                </button>
                                <button onClick={() => navigate(`/admin/edit-blog/${item._id}`)} className='text-gray-500 hover:text-gray-700 transition-colors p-1'>
                                    <FaEdit />
                                </button>
                                <button onClick={() => confirmDelete(item._id)} className='text-red-400 hover:text-red-600 transition-colors p-1'>
                                    <FaTrash />
                                </button>
                            </div>
                        </div>
                    ))
                )}
                
                {!loading && blogs.length === 0 && (
                    <div className='p-12 text-center text-gray-400'>
                        No blogs found. Start writing one!
                    </div>
                )}
            </div>

            {showDeleteModal && (
                <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm'>
                    <div className='bg-white rounded-xl shadow-2xl p-6 w-full max-w-sm animate-fade-in'>
                        <div className='flex flex-col items-center text-center mb-6'>
                            <div className='w-12 h-12 bg-red-100 rounded-full flex items-center justify-center text-red-500 mb-4'>
                                <FaExclamationTriangle size={24} />
                            </div>
                            <h3 className='text-lg font-bold text-gray-800'>Delete Blog Post?</h3>
                            <p className='text-gray-500 text-sm mt-2'>
                                Are you sure you want to delete this blog? This action cannot be undone.
                            </p>
                        </div>
                        <div className='flex gap-3'>
                            <button onClick={() => setShowDeleteModal(false)} className='flex-1 px-4 py-2 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors'>Cancel</button>
                            <button onClick={executeDelete} className='flex-1 px-4 py-2 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition-colors shadow-md'>Yes, Delete !</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ViewBlogs