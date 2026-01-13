import React from 'react'
import { FaCalculator, FaChartPie, FaRunning, FaRobot, FaArrowRight, FaWallet, FaDumbbell, FaRulerCombined } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const FeaturedTools = () => {

  const navigate = useNavigate();

  return (
    <div className='md:py-24 py-12 bg-gray-50 px-5 md:px-20'>
        
        {/* Header */}
        <div className='max-w-7xl mx-auto mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6'>
            <div>
                <h2 className='text-teal-600 font-bold tracking-wide uppercase text-sm mb-2'>
                    Interactive Tools
                </h2>
                <h1 className='text-4xl md:text-5xl font-bold text-gray-900'>
                    Try our Calculators
                </h1>
            </div>
            <p className='text-gray-500 max-w-md text-lg md:text-right'>
                Stop guessing. Use our data-driven tools to plan your health and wealth simultaneously.
            </p>
        </div>

        {/* Grid Layout */}
        <div className='max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-6 h-auto md:h-125'>
            
            {/* LARGE CARD: Fitness & Finance Calculator */}
            <div 
                onClick={() => navigate('/tools/fit-fin-calculator')}
                className='md:col-span-2 md:row-span-2 bg-[#0D9488] rounded-3xl p-8 relative overflow-hidden group cursor-pointer shadow-xl transition-transform hover:scale-[1.01]'
            >
                <div className='relative z-10 flex flex-col justify-between h-full'>
                    <div>
                        <div className='bg-white/20 w-12 h-12 flex items-center justify-center rounded-xl backdrop-blur-sm mb-6'>
                            <FaCalculator className='text-white text-2xl' />
                        </div>
                        <h3 className='text-3xl font-bold text-white mb-2'>Fitness & Finance Calculator</h3>
                        <p className='text-teal-50 text-lg max-w-sm'>
                            The ultimate dual-engine tool. Calculate your BMI and your SIP Investment returns in a single view.
                        </p>
                    </div>
                    <button className='bg-white text-teal-700 font-bold py-3 px-6 rounded-lg w-max flex items-center gap-2 mt-8 group-hover:gap-4 transition-all'>
                        Start Calculating <FaArrowRight />
                    </button>
                </div>
                
                {/* Decorative Background Blur */}
                <div className='absolute -right-10 -bottom-20 w-80 h-80 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition-all'></div>
            </div>

            {/* SMALL CARD 1: Daily Planner */}
            <div 
                onClick={() => navigate('/tools/daily-planner')}
                className='bg-white p-6 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between'
            >
                <div className='flex justify-between items-start'>
                    <div className='bg-orange-100 p-3 rounded-xl'>
                        <FaChartPie className='text-orange-600 text-xl' />
                    </div>
                    <FaArrowRight className='text-gray-300 group-hover:text-orange-600 transition-colors -rotate-45 group-hover:rotate-0' />
                </div>
                <div>
                    <h4 className='text-xl font-bold text-gray-800 mt-4'>Daily Planner</h4>
                    <p className='text-sm text-gray-500 mt-1'>Track Calories vs. Daily Budget.</p>
                </div>
            </div>

            {/* SMALL CARD 2: Tracker Suite */}
            <div 
                onClick={() => navigate('/tools/body-fat-expense')}
                className='bg-white p-6 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between'
            >
                <div className='flex justify-between items-start'>
                    <div className='bg-purple-100 p-3 rounded-xl'>
                        <FaRulerCombined className='text-purple-600 text-xl' />
                    </div>
                    <FaArrowRight className='text-gray-300 group-hover:text-purple-600 transition-colors -rotate-45 group-hover:rotate-0' />
                </div>
                <div>
                    <h4 className='text-xl font-bold text-gray-800 mt-4'>Tracker Suite</h4>
                    <p className='text-sm text-gray-500 mt-1'>Body Fat % & Expense List.</p>
                </div>
            </div>

        </div>
        
        {/* Footer Button */}
        <div className='flex justify-center mt-12'>
            <button 
                onClick={() => navigate('/tools')}
                className='bg-transparent border-2 border-teal-600 text-teal-700 hover:bg-teal-600 hover:text-white transition-colors font-bold py-3 px-8 rounded-lg'
            >
                Explore All Tools
            </button>
        </div>
    </div>
  )
}

export default FeaturedTools