import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaRocket, FaPlus, FaList, FaSignOutAlt, FaChartLine, FaDumbbell, FaLaptopCode, FaMoneyBillWave, FaUserShield } from "react-icons/fa";

const AdminDashboard = () => {
  const { logout, backendUrl } = useContext(AppContext);
  const navigate = useNavigate();

  // 1. Add a loading state
  const [loading, setLoading] = useState(true);

  const [stats, setStats] = useState({
    total: 0,
    fitness: 0,
    finance: 0,
    technology: 0
  });

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const { data } = await axios.get(backendUrl + '/api/blogs/list');

        if (data.success) {
          const blogs = data.blogs;

          setStats({
            total: blogs.length,
            fitness: blogs.filter(b => b.category === "Fitness").length,
            finance: blogs.filter(b => b.category === "Finance").length,
            technology: blogs.filter(b => b.category === "Technology").length
          });
        }
      } catch (error) {
        console.log(error);
        toast.error("Failed to load dashboard data");
      } finally {
        // 2. Turn off loading when API call finishes (success or fail)
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [backendUrl]);

  return (
    <div className='min-h-screen bg-gray-50 flex'>

      {/* --- SIDEBAR --- */}
      <aside className='w-64 bg-white border-r border-gray-200 hidden md:flex flex-col'>
        <div className='h-16 flex items-center px-6 border-b border-gray-100'>
          <div className='flex items-center gap-2 text-teal-600 font-bold text-xl'>
            <FaRocket />
            <span>FitFinTech</span>
          </div>
        </div>

        <nav className='flex-1 py-6 px-3 space-y-1'>
          <MenuLink icon={<FaChartLine />} label="Dashboard" active={true} onClick={() => navigate('/admin/dashboard')} />
          <MenuLink icon={<FaPlus />} label="Add New Blog" onClick={() => navigate('/admin/add-blog')} />
          <MenuLink icon={<FaList />} label="All Blogs" onClick={() => navigate('/admin/view-blogs')} />
          <MenuLink icon={<FaUserShield />} label="Settings" onClick={() => navigate('/admin/profile')} />
        </nav>

        <div className='p-4 border-t border-gray-100'>
          <button onClick={handleLogout} className='flex items-center gap-3 text-gray-600 hover:text-red-600 hover:bg-red-50 w-full px-4 py-3 rounded-lg transition-all duration-200'>
            <FaSignOutAlt />
            <span className='font-medium'>Logout</span>
          </button>
        </div>
      </aside>

      <main className='flex-1'>
        <header className='h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8'>
          <h2 className='text-xl font-semibold text-gray-800'>Overview</h2>
          <div className='flex items-center gap-4'>
            <div className='w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center text-teal-700 font-bold text-sm'>A</div>
            <span className='text-sm font-medium text-gray-700 hidden md:block'>Admin</span>
          </div>
        </header>

        <div className='p-8'>

          {/* 3. Pass the 'loading' prop to StatCard */}
          <div className='grid grid-cols-1 md:grid-cols-4 gap-6 mb-8'>
            <StatCard loading={loading} title="Total Blogs" value={stats.total} color="bg-gray-100 text-gray-600" icon={<FaList />} />
            <StatCard loading={loading} title="Fitness" value={stats.fitness} color="bg-orange-50 text-orange-600" icon={<FaDumbbell />} />
            <StatCard loading={loading} title="Finance" value={stats.finance} color="bg-green-50 text-green-600" icon={<FaMoneyBillWave />} />
            <StatCard loading={loading} title="Technology" value={stats.technology} color="bg-blue-50 text-blue-600" icon={<FaLaptopCode />} />
          </div>

          <div className='bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center'>
            <div className='max-w-md mx-auto'>
              <h3 className='text-lg font-bold text-gray-800 mb-2'>Manage Your Content</h3>
              <p className='text-gray-500 mb-6'>Ready to share something new? Create a new blog post now.</p>
              <button onClick={() => navigate('/admin/add-blog')} className='bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700 transition-colors inline-flex items-center gap-2'>
                <FaPlus /> Create New Post
              </button>
            </div>
          </div>

        </div>
      </main>
    </div>
  )
}

const MenuLink = ({ icon, label, active, onClick }) => (
  <div onClick={onClick} className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-colors ${active ? 'bg-teal-50 text-teal-700' : 'text-gray-600 hover:bg-gray-50'}`}>
    <span className='text-lg'>{icon}</span>
    <span className='font-medium'>{label}</span>
  </div>
);

// 4. Update StatCard to show Skeleton when loading
const StatCard = ({ title, value, color, icon, loading }) => (
  <div className='bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between'>
    <div>
      <p className='text-gray-500 text-sm mb-1'>{title}</p>
      {loading ? (
        // SKELETON: A pulsing gray box
        <div className='h-8 w-16 bg-gray-200 rounded animate-pulse mt-1'></div>
      ) : (
        // ACTUAL DATA
        <h3 className='text-2xl font-bold text-gray-800'>{value}</h3>
      )}
    </div>
    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${color}`}>
      <span className='text-xl'>{icon}</span>
    </div>
  </div>
);

export default AdminDashboard;