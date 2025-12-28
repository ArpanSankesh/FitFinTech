import React, { useState, useContext, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom' // ✅ Added Link
import { AppContext } from '../context/AppContext'
import { FaRocket, FaLock, FaEnvelope, FaUserPlus, FaSignInAlt } from "react-icons/fa";
import { toast } from 'react-toastify';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState(''); // Added Name state for Register
  
 
  const [currState, setCurrState] = useState('Login'); 
  
  const navigate = useNavigate();
  const { login, token, backendUrl, setToken } = useContext(AppContext);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
        if (currState === 'Sign Up') {
            // --- REGISTER ---
            // Added 'name' to the request body
            const { data } = await axios.post(backendUrl + '/api/auth/register', { name, email, password });
            if (data.success) {
                localStorage.setItem('token', data.token);
                setToken(data.token);
                toast.success("Account Created!");
            } else {
                toast.error(data.message);
            }

        } else {
            
            const { data } = await axios.post(backendUrl + '/api/auth/login', { email, password });
            if (data.success) {
                localStorage.setItem('token', data.token);
                setToken(data.token);
            } else {
                toast.error(data.message);
            }
        }

    } catch (error) {
        toast.error(error.response?.data?.message || error.message);
    }
  }

  
  useEffect(() => {
    if (token) {
        navigate('/admin/dashboard');
    }
  }, [token, navigate]);

  return (
    <div className='min-h-screen bg-gray-100 flex items-center justify-center px-4'>
        
        <div className='bg-white w-full max-w-md p-8 rounded-2xl shadow-lg border border-gray-100'>
            
            {/* Header */}
            <div className='text-center mb-8'>
                <div className='inline-flex items-center justify-center w-16 h-16 bg-teal-50 rounded-full mb-4 text-teal-600'>
                    <FaRocket size={32} />
                </div>
                <h1 className='text-2xl font-bold text-gray-900'>
                    {currState === 'Login' ? 'Admin Portal' : 'Create Account'}
                </h1>
                <p className='text-gray-500 text-sm'>
                    {currState === 'Login' ? 'Sign in to manage FitFinTech' : 'Create your secure admin account'}
                </p>
            </div>

            {/* Form */}
            <form onSubmit={onSubmitHandler} className='space-y-6'>
                
                {/* Name Field (Only for Sign Up) */}
                {currState === 'Sign Up' && (
                    <div>
                        <label className='block text-sm font-medium text-gray-700 mb-2'>Full Name</label>
                        <div className='relative'>
                            <input 
                                type="text" 
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className='w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all'
                                placeholder='John Doe'
                            />
                        </div>
                    </div>
                )}

                {/* Email (Always visible) */}
                <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>Email Address</label>
                    <div className='relative'>
                        <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400'>
                            <FaEnvelope />
                        </div>
                        <input 
                            type="email" 
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className='w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all'
                            placeholder='admin@fitfintech.com'
                        />
                    </div>
                </div>

                {/* Password (Always visible) */}
                <div>
                    <div className='flex justify-between items-center mb-2'>
                        <label className='block text-sm font-medium text-gray-700'>Password</label>
                        
                        {/* ✅ LINK TO RESET PAGE */}
                        {currState === 'Login' && (
                            <Link to="/admin/reset-password" className='text-xs text-teal-600 cursor-pointer hover:underline'>
                                Forgot Password?
                            </Link>
                        )}
                    </div>
                    <div className='relative'>
                        <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400'>
                            <FaLock />
                        </div>
                        <input 
                            type="password" 
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className='w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all'
                            placeholder='••••••••'
                        />
                    </div>
                </div>

                {/* Main Action Button */}
                <button 
                    type='submit'
                    className='w-full bg-teal-600 text-white font-bold py-3 rounded-lg hover:bg-teal-700 transition-colors shadow-md flex items-center justify-center gap-2'
                >
                    {currState === 'Login' ? <><FaSignInAlt /> Sign In</> : <><FaUserPlus /> Create Account</>}
                </button>
            </form>

            {/* Footer Links */}
            <div className='mt-6 text-center text-sm text-gray-600'>
                {currState === 'Login' ? (
                    <>
                        Don't have an account?{' '}
                        <span onClick={() => setCurrState('Sign Up')} className='text-teal-600 font-semibold cursor-pointer hover:underline'>Register</span>
                    </>
                ) : (
                    <>
                        Already have an account?{' '}
                        <span onClick={() => setCurrState('Login')} className='text-teal-600 font-semibold cursor-pointer hover:underline'>Login</span>
                    </>
                )}
            </div>

        </div>
    </div>
  )
}

export default Login