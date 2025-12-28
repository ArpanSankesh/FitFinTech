import React, { useContext, useState, useRef, useMemo } from 'react'
import axios from 'axios'
import { AppContext } from '../../context/AppContext' 
import { toast } from 'react-toastify'
import { FaCloudUploadAlt, FaArrowLeft } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import JoditEditor from 'jodit-react' // ✅ Import Jodit

const AddBlog = () => {
    
    const { backendUrl, token } = useContext(AppContext);
    const navigate = useNavigate();
    
    // Jodit requires a reference
    const editor = useRef(null);
    
    const [image, setImage] = useState(false);
    const [description, setDescription] = useState(""); // Stores HTML content
    
    const [data, setData] = useState({
        title: "",
        category: "Technology",
        author: "Admin"
    });

    const [loading, setLoading] = useState(false);

    // Jodit Config (Optional: Makes it look cleaner)
    const config = useMemo(() => ({
        readonly: false,
        placeholder: 'Start typing your blog content here...',
        height: 400
    }), []);

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({ ...data, [name]: value }));
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const formData = new FormData();
            
            formData.append('title', data.title);
            formData.append('description', description); // Sends the HTML from Jodit
            formData.append('category', data.category);
            formData.append('author', data.author);
            formData.append('image', image);

            const response = await axios.post(`${backendUrl}/api/blogs/add`, formData, {
                headers: { token }
            });

            if (response.data.success) {
                toast.success("Blog Added Successfully");
                setImage(false);
                setDescription(""); 
                setData({
                    title: "",
                    category: "Technology",
                    author: "Admin"
                });
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
                    onClick={() => navigate('/admin-dashboard')}
                    className='flex items-center gap-2 text-gray-600 hover:text-teal-600 transition-colors'
                >
                    <FaArrowLeft /> Back to Dashboard
                </button>
            </div>

            <form onSubmit={onSubmitHandler} className='max-w-4xl mx-auto bg-white rounded-xl shadow-sm border border-gray-100 p-8'>
                
                <h1 className='text-2xl font-bold text-gray-800 mb-8'>Write a New Blog</h1>

                <div className='flex flex-col gap-8'>

                    {/* Image Upload */}
                    <div>
                        <p className='text-sm font-medium text-gray-700 mb-3'>Blog Thumbnail</p>
                        <label htmlFor="image" className='cursor-pointer block w-full max-w-[300px]'>
                            <div className='border-2 border-dashed border-gray-300 rounded-lg h-48 flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors relative overflow-hidden'>
                                {image ? (
                                    <img src={URL.createObjectURL(image)} alt="Preview" className='w-full h-full object-cover absolute top-0 left-0' />
                                ) : (
                                    <div className='text-center p-4 text-gray-400'>
                                        <FaCloudUploadAlt size={40} className='mx-auto mb-2' />
                                        <p className='text-sm'>Click to upload image</p>
                                    </div>
                                )}
                            </div>
                            <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden required />
                        </label>
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
                            placeholder='e.g. The Future of Fintech' 
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
                                <option value="Technology">Technology</option>
                                <option value="Startup">Startup</option>
                                <option value="Lifestyle">Lifestyle</option>
                                <option value="Finance">Finance</option>
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
                                placeholder='Author Name'
                            />
                        </div>
                    </div>

                    {/* --- JODIT EDITOR (Updated) --- */}
                    <div className='mb-4'> 
                        <p className='text-sm font-medium text-gray-700 mb-2'>Content</p>
                        <JoditEditor
                            ref={editor}
                            value={description}
                            config={config}
                            tabIndex={1} // tabIndex of textarea
                            onBlur={newContent => setDescription(newContent)} // Preferred for performance
                            onChange={newContent => {}}
                        />
                    </div>

                    <button 
                        type='submit' 
                        disabled={loading}
                        className={`w-full md:w-auto px-8 py-3 bg-teal-600 text-white font-bold rounded-lg hover:bg-teal-700 transition-colors shadow-sm flex items-center justify-center ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                        {loading ? 'Publishing...' : 'Publish Blog'}
                    </button>

                </div>
            </form>
        </div>
    )
}

export default AddBlog