import React, { useContext, useState } from 'react'
import axios from 'axios'
import { AppContext } from '../../context/AppContext'
import { toast } from 'react-toastify'
import { FaUserShield, FaLock, FaSave } from 'react-icons/fa'

const Profile = () => {

    const { backendUrl, token, setUser } = useContext(AppContext);
    
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        // Basic Validation
        if (newPassword !== confirmPassword) {
            return toast.error("New passwords do not match!");
        }
        if (newPassword.length < 8) {
            return toast.error("Password must be at least 8 characters.");
        }

        setLoading(true);

        try {
            const response = await axios.post(`${backendUrl}/api/auth/change-password`, 
                { oldPassword, newPassword },
                { headers: { token } }
            );

            if (response.data.success) {
                toast.success("Password Updated Successfully");
                setOldPassword("");
                setNewPassword("");
                setConfirmPassword("");
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
            
            <div className='max-w-2xl mx-auto'>
                <h1 className='text-3xl font-bold text-gray-800 mb-8 flex items-center gap-3'>
                    <FaUserShield className='text-teal-600' /> Admin Profile
                </h1>

                {/* Password Change Card */}
                <div className='bg-white rounded-xl shadow-sm border border-gray-100 p-8'>
                    
                    <div className='flex items-center gap-4 mb-8 border-b border-gray-100 pb-6'>
                        <div className='w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center text-teal-600 text-2xl font-bold'>
                            A
                        </div>
                        <div>
                            <h2 className='text-xl font-bold text-gray-800'>Admin Account</h2>
                            <p className='text-gray-500 text-sm'>Manage your security preferences</p>
                        </div>
                    </div>

                    <form onSubmit={onSubmitHandler} className='flex flex-col gap-6'>
                        
                        <h3 className='text-lg font-semibold text-gray-700 flex items-center gap-2'>
                            <FaLock className='text-gray-400' size={16} /> Change Password
                        </h3>

                        {/* Old Password */}
                        <div>
                            <label className='block text-sm font-medium text-gray-700 mb-2'>Current Password</label>
                            <input 
                                type="password" 
                                value={oldPassword}
                                onChange={(e) => setOldPassword(e.target.value)}
                                className='w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-teal-500 transition-colors'
                                placeholder='Enter current password'
                                required
                            />
                        </div>

                        {/* New Password */}
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                            <div>
                                <label className='block text-sm font-medium text-gray-700 mb-2'>New Password</label>
                                <input 
                                    type="password" 
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    className='w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-teal-500 transition-colors'
                                    placeholder='Minimum 8 chars'
                                    required
                                />
                            </div>
                            <div>
                                <label className='block text-sm font-medium text-gray-700 mb-2'>Confirm New Password</label>
                                <input 
                                    type="password" 
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className='w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-teal-500 transition-colors'
                                    placeholder='Retype new password'
                                    required
                                />
                            </div>
                        </div>

                        <button 
                            type='submit' 
                            disabled={loading}
                            className={`mt-4 bg-teal-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-teal-700 transition-colors flex items-center justify-center gap-2 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                        >
                            <FaSave /> {loading ? 'Updating...' : 'Update Password'}
                        </button>

                    </form>
                </div>

            </div>
        </div>
    )
}

export default Profile