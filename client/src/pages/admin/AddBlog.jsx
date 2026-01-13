import React, { useContext, useState, useRef, useMemo } from 'react'
import axios from 'axios'
import { AppContext } from '../../context/AppContext'
import { toast } from 'react-toastify'
import { FaCloudUploadAlt, FaArrowLeft, FaVideo, FaImage, FaTimes } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import JoditEditor from 'jodit-react'

const AddBlog = () => {

    const { backendUrl, token } = useContext(AppContext);
    const navigate = useNavigate();
    const editor = useRef(null);

    // Form State
    const [media, setMedia] = useState(null); 
    const [mediaType, setMediaType] = useState('image'); 
    const [mediaPreview, setMediaPreview] = useState(null); 
    
    const [description, setDescription] = useState("");
    const [data, setData] = useState({
        title: "",
        category: "Technology", 
        author: "Admin"
    });

    // Upload State
    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState(0);

    // Jodit Config
    const config = useMemo(() => ({
        readonly: false,
        placeholder: 'Start typing your blog content here...',
        height: 500,
        uploader: {
            url: `${backendUrl}/api/blogs/upload-editor-image`,
            format: 'json',
            method: 'POST',
            prepareData: function (data) {
                return data;
            },
            process: function (resp) {
                return {
                    files: resp.data.files || [],
                    path: resp.data.path,
                    baseurl: resp.data.baseurl,
                    error: resp.success ? null : resp.message,
                    msg: resp.message
                };
            },
            defaultHandlerSuccess: function (data, resp) {
                if (data.files && data.files.length) {
                    this.selection.insertImage(data.files[0]);
                }
            },
        },
        buttons: [
            'bold', 'italic', 'underline', 'strikethrough', '|',
            'font', 'fontsize', 'brush', 'paragraph', '|',
            'image', 'video', 'link', '|', 
            'align', 'undo', 'redo', '|',
            'hr', 'eraser', 'fullsize'
        ]
    }), [backendUrl]);

    // 1. Handle File Selection
    const onMediaChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setMedia(null);
        setMediaPreview(null);

        const fileType = file.type.split('/')[0]; // 'image' or 'video'

        if (fileType === 'image') {
            setMediaType('image');
        } else if (fileType === 'video') {
            setMediaType('video');
        } else {
            toast.error("Please upload an Image or Video.");
            return;
        }

        setMedia(file);
        setMediaPreview(URL.createObjectURL(file));
    }

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({ ...data, [name]: value }));
    }

    // 2. Submit Handler
    const onSubmitHandler = async (e) => {
        e.preventDefault();
        
        if (!media) {
            toast.error("Please upload a cover image or video");
            return;
        }

        setLoading(true);
        setProgress(0);

        try {
            const formData = new FormData();
            formData.append('title', data.title);
            formData.append('description', description);
            formData.append('category', data.category);
            formData.append('author', data.author);
            formData.append('image', media); 
            formData.append('mediaType', mediaType); 

            const response = await axios.post(`${backendUrl}/api/blogs/add`, formData, {
                headers: { token },
                onUploadProgress: (progressEvent) => {
                    const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    setProgress(percentCompleted);
                }
            });

            if (response.data.success) {
                toast.success("Blog Published Successfully!");
                // Reset Form
                setMedia(null);
                setMediaPreview(null);
                setDescription("");
                setData({
                    title: "",
                    category: "Technology",
                    author: "Admin"
                });
                setProgress(0);
            } else {
                toast.error(response.data.message);
            }

        } catch (error) {
            console.log(error);
            toast.error(error.message);
        } finally {
            setLoading(false);
            setTimeout(() => setProgress(0), 1000);
        }
    }

    const clearMedia = (e) => {
        e.preventDefault();
        setMedia(null);
        setMediaPreview(null);
    }

    return (
        <div className='min-h-screen bg-gray-50 p-6 md:p-8 relative'>

            {/* Loading Overlay */}
            {loading && (
                <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex flex-col items-center justify-center">
                    <div className="w-64">
                        <div className="flex justify-between mb-2">
                            <span className="text-teal-700 font-bold">Publishing...</span>
                            <span className="text-teal-700 font-bold">{progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                            <div 
                                className="bg-teal-600 h-4 rounded-full transition-all duration-300 ease-out"
                                style={{ width: `${progress}%` }}
                            ></div>
                        </div>
                        <p className="text-xs text-gray-500 mt-2 text-center">Uploading media, please wait.</p>
                    </div>
                </div>
            )}

            <div className='max-w-5xl mx-auto mb-6'>
                <button
                    onClick={() => navigate('/admin/dashboard')}
                    className='flex items-center gap-2 text-gray-600 hover:text-teal-600 transition-colors'
                >
                    <FaArrowLeft /> Back to Dashboard
                </button>
            </div>

            <form onSubmit={onSubmitHandler} className='max-w-5xl mx-auto bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden'>
                
                <div className="bg-teal-600 p-6 text-white">
                     <h1 className='text-2xl font-bold'>Write a New Blog</h1>
                     <p className='text-teal-100 text-sm'>Create rich content with images and videos.</p>
                </div>

                <div className='p-8 flex flex-col gap-8'>

                    {/* Cover Media */}
                    <div>
                        <p className='text-sm font-bold text-gray-700 mb-3 flex items-center gap-2'>
                            Cover Media 
                        </p>
                        
                        <label htmlFor="media-upload" className='cursor-pointer block w-full'>
                            <div className={`border-2 border-dashed ${mediaPreview ? 'border-teal-500' : 'border-gray-300'} rounded-xl h-64 flex flex-col items-center justify-center bg-gray-50 hover:bg-teal-50/30 transition-colors relative overflow-hidden group`}>
                                
                                {mediaPreview ? (
                                    <>
                                        {mediaType === 'video' ? (
                                            <video src={mediaPreview} controls className='w-full h-full object-cover' />
                                        ) : (
                                            <img src={mediaPreview} alt="Preview" className='w-full h-full object-cover' />
                                        )}
                                        
                                        <button onClick={clearMedia} className="absolute top-4 right-4 bg-red-500 text-white p-2 rounded-full shadow-lg hover:bg-red-600 transition z-10">
                                            <FaTimes />
                                        </button>
                                    </>
                                ) : (
                                    <div className='text-center p-6 text-gray-400 group-hover:text-teal-600 transition-colors'>
                                        <div className="flex justify-center gap-3 mb-3">
                                            <FaImage size={32} />
                                            <FaVideo size={32} />
                                        </div>
                                        <p className='font-medium text-lg'>Click to upload Cover</p>
                                    </div>
                                )}
                            </div>
                            <input 
                                onChange={onMediaChange} 
                                type="file" 
                                id="media-upload" 
                                accept="image/*,video/*" 
                                hidden 
                            />
                        </label>
                    </div>

                    {/* Meta Data */}
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                        <div className="md:col-span-2">
                            <p className='text-sm font-bold text-gray-700 mb-2'>Blog Title</p>
                            <input
                                name='title'
                                onChange={onChangeHandler}
                                value={data.title}
                                className='w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-gray-50 focus:bg-white transition-colors'
                                type="text"
                                placeholder='Enter a catchy headline...'
                                required
                            />
                        </div>

                        <div>
                            <p className='text-sm font-bold text-gray-700 mb-2'>Category</p>
                            <select
                                name="category"
                                onChange={onChangeHandler}
                                value={data.category}
                                className='w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white cursor-pointer'
                            >
                                <option value="Technology">Technology</option>
                                <option value="Fitness">Fitness</option>
                                <option value="Finance">Finance</option>
                            </select>
                        </div>

                        <div>
                            <p className='text-sm font-bold text-gray-700 mb-2'>Author</p>
                            <input
                                name='author'
                                onChange={onChangeHandler}
                                value={data.author}
                                className='w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-gray-50 focus:bg-white'
                                type="text"
                                placeholder='Who is writing this?'
                            />
                        </div>
                    </div>

                    {/* Rich Text Editor */}
                    <div>
                        <div className="flex justify-between items-end mb-2">
                            <p className='text-sm font-bold text-gray-700'>Blog Content</p>
                        </div>
                        
                        <div className="border border-gray-200 rounded-lg overflow-hidden">
                            <JoditEditor
                                ref={editor}
                                value={description}
                                config={config}
                                tabIndex={1}
                                onBlur={newContent => setDescription(newContent)}
                            />
                        </div>
                    </div>

                    <button
                        type='submit'
                        disabled={loading}
                        className={`w-full py-4 bg-teal-600 text-white font-bold text-lg rounded-xl hover:bg-teal-700 transition-all shadow-md hover:shadow-xl flex items-center justify-center gap-2 transform active:scale-95 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        {loading ? 'Processing...' : (
                            <>
                                <FaCloudUploadAlt size={24} /> Publish Blog
                            </>
                        )}
                    </button>

                </div>
            </form>
        </div>
    )
}

export default AddBlog