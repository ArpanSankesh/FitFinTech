import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaRocket, FaLock, FaEnvelope } from "react-icons/fa";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    
    if (email === "admin@fitfintech.com" && password === "admin123") {
        console.log("Login Success");
         
        alert("Login Successful! (Redirecting to Dashboard...)");
    } else {
        setError("Invalid credentials. Try admin@fitfintech.com / admin123");
    }
    
  }

  return (
    <div className='min-h-screen bg-gray-100 flex items-center justify-center px-4'>
        
        <div className='bg-white w-full max-w-md p-8 rounded-2xl shadow-lg border border-gray-100'>
            
            {/* Logo Area */}
            <div className='text-center mb-8'>
                <div className='inline-flex items-center justify-center w-16 h-16 bg-teal-50 rounded-full mb-4 text-teal-600'>
                    <FaRocket size={32} />
                </div>
                <h1 className='text-2xl font-bold text-gray-900'>Admin Portal</h1>
                <p className='text-gray-500 text-sm'>Sign in to manage FitFinTech</p>
            </div>

            {/* Error Message */}
            {error && (
                <div className='bg-red-50 text-red-600 text-sm p-3 rounded-lg mb-4 text-center border border-red-100'>
                    {error}
                </div>
            )}

            {/* Form */}
            <form onSubmit={handleLogin} className='space-y-6'>
                
                {/* Email Input */}
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
                            className='w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all'
                            placeholder='admin@fitfintech.com'
                        />
                    </div>
                </div>

                {/* Password Input */}
                <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>Password</label>
                    <div className='relative'>
                        <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400'>
                            <FaLock />
                        </div>
                        <input 
                            type="password" 
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className='w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all'
                            placeholder='••••••••'
                        />
                    </div>
                </div>

                {/* Submit Button */}
                <button 
                    type='submit'
                    className='w-full bg-teal-600 text-white font-bold py-3 rounded-lg hover:bg-teal-700 transition-colors shadow-md hover:shadow-lg transform active:scale-95 duration-200'
                >
                    Sign In
                </button>
            </form>

            <div className='mt-6 text-center text-xs text-gray-400'>
                © 2025 FitFinTech Admin Panel
            </div>

        </div>
    </div>
  )
}

export default Login