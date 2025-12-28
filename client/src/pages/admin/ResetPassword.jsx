import React, { useContext, useState } from 'react'
import axios from 'axios'
import { AppContext } from '../../context/AppContext'
import { toast } from 'react-toastify'
import { FaKey, FaLock, FaEnvelope, FaArrowLeft } from 'react-icons/fa'
import { useNavigate, Link } from 'react-router-dom'

const ResetPassword = () => {

    const { backendUrl } = useContext(AppContext);
    const navigate = useNavigate();
    
    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [secretKey, setSecretKey] = useState("");
    const [loading, setLoading] = useState(false);

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axios.post(`${backendUrl}/api/auth/reset-password`, {
                email, newPassword, secretKey
            });

            if (response.data.success) {
                toast.success("Password Reset Successfully");
                navigate('/admin'); // Redirect to login
            } else {
                toast.error(response.data.message);
            }

        } catch (error) {
            toast.error(error.message);
        }
        setLoading(false);
    }

    return (
        <div className='min-h-screen flex items-center justify-center bg-gray-50 px-4'>
            <div className='bg-white p-8 rounded-xl shadow-lg w-full max-w-md border border-gray-100'>
                
                <h1 className='text-2xl font-bold text-gray-800 mb-2 flex items-center gap-2'>
                    <FaKey className='text-teal-600' /> Reset Password
                </h1>
                <p className='text-gray-500 mb-6 text-sm'>Enter your Admin Secret Key to regain access.</p>

                <form onSubmit={onSubmitHandler} className='flex flex-col gap-4'>
                    
                    {/* Email */}
                    <div className='relative'>
                        <FaEnvelope className='absolute top-3.5 left-3 text-gray-400' />
                        <input 
                            type="email" 
                            placeholder='Admin Email' 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className='w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:border-teal-500 outline-none'
                            required
                        />
                    </div>

                    {/* Secret Key */}
                    <div className='relative'>
                        <FaKey className='absolute top-3.5 left-3 text-gray-400' />
                        <input 
                            type="text" 
                            placeholder='Admin Secret Key (from .env)' 
                            value={secretKey}
                            onChange={(e) => setSecretKey(e.target.value)}
                            className='w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:border-teal-500 outline-none'
                            required
                        />
                    </div>

                    {/* New Password */}
                    <div className='relative'>
                        <FaLock className='absolute top-3.5 left-3 text-gray-400' />
                        <input 
                            type="password" 
                            placeholder='New Password' 
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className='w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:border-teal-500 outline-none'
                            required
                        />
                    </div>

                    <button disabled={loading} className='bg-teal-600 text-white py-3 rounded-lg font-bold hover:bg-teal-700 transition disabled:opacity-70'>
                        {loading ? "Resetting..." : "Reset Password"}
                    </button>
                </form>

                <div className='mt-6 text-center'>
                    <Link to="/admin" className='text-gray-500 hover:text-teal-600 text-sm flex items-center justify-center gap-2'>
                        <FaArrowLeft /> Back to Login
                    </Link>
                </div>

            </div>
        </div>
    )
}

export default ResetPassword