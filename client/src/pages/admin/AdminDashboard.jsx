import React, { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { FaRocket, FaPlus, FaList, FaUser, FaSignOutAlt, FaChartLine } from "react-icons/fa";

const AdminDashboard = () => {
  const { logout } = useContext(AppContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className='min-h-screen bg-gray-50 flex'>
      
      {/* --- SIDEBAR --- */}
      <aside className='w-64 bg-white border-r border-gray-200 hidden md:flex flex-col'>
        
        {/* Logo */}
        <div className='h-16 flex items-center px-6 border-b border-gray-100'>
          <div className='flex items-center gap-2 text-teal-600 font-bold text-xl'>
            <FaRocket />
            <span>FitFinTech</span>
          </div>
        </div>

        {/* Menu */}
        <nav className='flex-1 py-6 px-3 space-y-1'>
          
          {/* 1. Dashboard Link */}
          <MenuLink 
            icon={<FaChartLine />} 
            label="Dashboard" 
            active={true} 
            onClick={() => navigate('/admin-dashboard')} 
          />
          
          {/* 2. Add Blog Link (Works now!) */}
          <MenuLink 
            icon={<FaPlus />} 
            label="Add New Blog" 
            onClick={() => navigate('/add-blog')} 
          />
          
          {/* 3. All Blogs Link (Placeholder for now) */}
          <MenuLink 
            icon={<FaList />} 
            label="All Blogs" 
            onClick={() => console.log("Go to List")} 
          />
          
          {/* 4. Subscribers Link (Placeholder) */}
          <MenuLink 
            icon={<FaUser />} 
            label="Subscribers" 
            onClick={() => console.log("Go to Subscribers")} 
          />

        </nav>

        {/* Logout Button */}
        <div className='p-4 border-t border-gray-100'>
          <button 
            onClick={handleLogout}
            className='flex items-center gap-3 text-gray-600 hover:text-red-600 hover:bg-red-50 w-full px-4 py-3 rounded-lg transition-all duration-200'
          >
            <FaSignOutAlt />
            <span className='font-medium'>Logout</span>
          </button>
        </div>

      </aside>


      {/* --- MAIN CONTENT --- */}
      <main className='flex-1'>
        
        {/* Top Header */}
        <header className='h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8'>
            <h2 className='text-xl font-semibold text-gray-800'>Overview</h2>
            <div className='flex items-center gap-4'>
                <div className='w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center text-teal-700 font-bold text-sm'>
                    A
                </div>
                <span className='text-sm font-medium text-gray-700 hidden md:block'>Admin</span>
            </div>
        </header>

        {/* Dashboard Content */}
        <div className='p-8'>
            
            {/* Stats Grid */}
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-8'>
                <StatCard title="Total Blogs" value="12" color="bg-blue-50 text-blue-600" />
                <StatCard title="Total Views" value="1,240" color="bg-purple-50 text-purple-600" />
                <StatCard title="Subscribers" value="85" color="bg-teal-50 text-teal-600" />
            </div>

            {/* Quick Action */}
            <div className='bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center'>
                <div className='max-w-md mx-auto'>
                    <h3 className='text-lg font-bold text-gray-800 mb-2'>Manage Your Content</h3>
                    <p className='text-gray-500 mb-6'>Ready to share something new? Create a new blog post now.</p>
                    {/* Big Button also navigates now */}
                    <button 
                        onClick={() => navigate('/add-blog')}
                        className='bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700 transition-colors inline-flex items-center gap-2'
                    >
                        <FaPlus /> Create New Post
                    </button>
                </div>
            </div>

        </div>
      </main>

    </div>
  )
}

// Helper Component: Now accepts onClick
const MenuLink = ({ icon, label, active, onClick }) => (
    <div 
        onClick={onClick}
        className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-colors ${active ? 'bg-teal-50 text-teal-700' : 'text-gray-600 hover:bg-gray-50'}`}
    >
        <span className='text-lg'>{icon}</span>
        <span className='font-medium'>{label}</span>
    </div>
);

const StatCard = ({ title, value, color }) => (
    <div className='bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between'>
        <div>
            <p className='text-gray-500 text-sm mb-1'>{title}</p>
            <h3 className='text-2xl font-bold text-gray-800'>{value}</h3>
        </div>
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${color}`}>
            <FaChartLine size={20} />
        </div>
    </div>
);

export default AdminDashboard;