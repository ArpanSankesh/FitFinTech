import React, { useContext, useEffect, useState, useRef, useMemo } from 'react'
import axios from 'axios'
import { AppContext } from '../../context/AppContext'
import { toast } from 'react-toastify'
import { FaCloudUploadAlt, FaArrowLeft, FaSave } from 'react-icons/fa'
import { useNavigate, useParams } from 'react-router-dom'
import JoditEditor from 'jodit-react'

const EditBlog = () => {
    
    const { id } = useParams(); // Get ID from URL
    const { backendUrl, token } = useContext(AppContext);
    const navigate = useNavigate();
    const editor = useRef(null);

    const [image, setImage] = useState(false); // For NEW image file
    const [prevImage, setPrevImage] = useState(""); // For EXISTING image URL
    
    const [description, setDescription] = useState("");
    const [data, setData] = useState({
        title: "",
        category: "Technology",
        author: "Admin"
    });

    const [loading, setLoading] = useState(false);

    // Jodit Config
    const config = useMemo(() => ({
        readonly: false,
        height: 400
    }), []);

    // 1. Fetch Existing Blog Data
    useEffect(() => {
        const fetchBlogData = async () => {
            try {
                const response = await axios.get(`${backendUrl}/api/blogs/single`, {
                    params: { id }
                });

                if (response.data.success) {
                    const blog = response.data.blog;
                    setData({
                        title: blog.title,
                        category: blog.category,
                        author: blog.author
                    });
                    setDescription(blog.description);
                    setPrevImage(blog.image); // Show old image initially
                } else {
                    toast.error("Blog not found");
                    navigate('/admin/view-blogs');
                }
            } catch (error) {
                toast.error("Failed to fetch blog data");
            }
        };

        fetchBlogData();
    }, [id, backendUrl, navigate]);

    // Handle Input Changes
    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({ ...data, [name]: value }));
    }

    // 2. Submit Updates
    const onSubmitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const formData = new FormData();
            
            formData.append('id', id); // Important: Identify which blog to update
            formData.append('title', data.title);
            formData.append('description', description);
            formData.append('category', data.category);
            formData.append('author', data.author);
            
            // Only append 'image' if user selected a NEW file
            if (image) {
                formData.append('image', image);
            }

            const response = await axios.post(`${backendUrl}/api/blogs/update`, formData, {
                headers: { token }
            });

            if (response.data.success) {
                toast.success("Blog Updated Successfully");
                navigate('/admin/view-blogs'); // Go back to list
            } else {
                toast.error(response.data.message);
            }

        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
        
        setLoading(false);
    }

    return (
        <div className='min-h-screen bg-gray-50 p-8'>
            
            <div className='max-w-4xl mx-auto mb-6'>
                <button 
                    onClick={() => navigate('/admin/view-blogs')}
                    className='flex items-center gap-2 text-gray-600 hover:text-teal-600 transition-colors'
                >
                    <FaArrowLeft /> Back to List
                </button>
            </div>

            <form onSubmit={onSubmitHandler} className='max-w-4xl mx-auto bg-white rounded-xl shadow-sm border border-gray-100 p-8'>
                
                <h1 className='text-2xl font-bold text-gray-800 mb-8'>Edit Blog Post</h1>

                <div className='flex flex-col gap-8'>

                    {/* Image Upload */}
                    <div>
                        <p className='text-sm font-medium text-gray-700 mb-3'>Blog Thumbnail</p>
                        <label htmlFor="image" className='cursor-pointer block w-full max-w-75'>
                            <div className='border-2 border-dashed border-gray-300 rounded-lg h-48 flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors relative overflow-hidden'>
                                
                                {/* Logic: Show New Image Preview OR Old Image URL */}
                                {image ? (
                                    <img src={URL.createObjectURL(image)} alt="Preview" className='w-full h-full object-cover absolute top-0 left-0' />
                                ) : prevImage ? (
                                    <img src={prevImage} alt="Current" className='w-full h-full object-cover absolute top-0 left-0 opacity-90' />
                                ) : (
                                    <div className='text-center p-4 text-gray-400'>
                                        <FaCloudUploadAlt size={40} className='mx-auto mb-2' />
                                        <p className='text-sm'>Click to change image</p>
                                    </div>
                                )}

                            </div>
                            <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden />
                        </label>
                        <p className='text-xs text-gray-400 mt-2'>Leave empty to keep current image.</p>
                    </div>

                    {/* Title */}
                    <div>
                        <p className='text-sm font-medium text-gray-700 mb-2'>Blog Title</p>
                        <input 
                            name='title'
                            onChange={onChangeHandler}
                            value={data.title}
                            className='w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500' 
                            type="text" 
                            required 
                        />
                    </div>

                    {/* Category & Author */}
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                        <div>
                            <p className='text-sm font-medium text-gray-700 mb-2'>Category</p>
                            <select 
                                name="category" 
                                onChange={onChangeHandler} 
                                value={data.category}
                                className='w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white'
                            >
                                <option value="Fitness">Fitness</option>
                                <option value="Finance">Finance</option>
                                <option value="Technology">Technology</option>
                            </select>
                        </div>
                        <div>
                            <p className='text-sm font-medium text-gray-700 mb-2'>Author</p>
                            <input 
                                name='author'
                                onChange={onChangeHandler}
                                value={data.author}
                                className='w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500' 
                                type="text" 
                            />
                        </div>
                    </div>

                    {/* Editor */}
                    <div className='mb-4'> 
                        <p className='text-sm font-medium text-gray-700 mb-2'>Content</p>
                        <JoditEditor
                            ref={editor}
                            value={description}
                            config={config}
                            tabIndex={1} 
                            onBlur={newContent => setDescription(newContent)} 
                        />
                    </div>

                    <button 
                        type='submit' 
                        disabled={loading}
                        className={`w-full md:w-auto px-8 py-3 bg-teal-600 text-white font-bold rounded-lg hover:bg-teal-700 transition-colors shadow-sm flex items-center justify-center gap-2 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                        <FaSave />
                        {loading ? 'Saving...' : 'Save Changes'}
                    </button>

                </div>
            </form>
        </div>
    )
}

export default EditBlog