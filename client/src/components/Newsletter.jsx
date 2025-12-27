import React from 'react'

const Newsletter = () => {
  return (
    <div className='w-full bg-[#0D9488] py-16 px-5'>
        <div className='max-w-4xl mx-auto text-center flex flex-col items-center justify-center'>
            
            <h2 className='text-3xl md:text-4xl font-bold text-white mb-3'>
                Stay Updated
            </h2>
            <p className='text-teal-50 mb-8 text-lg'>
                Get weekly tips on fitness, finance, and tech delivered to your inbox.
            </p>

            <div className='w-full max-w-lg flex flex-col md:flex-row gap-4'>
                <input 
                    type="email" 
                    placeholder="Enter your email" 
                    className='w-full px-6 py-4 rounded-lg outline-none text-gray-700 focus:ring-2 focus:ring-teal-300'
                />
                <button className='bg-white text-[#0D9488] font-bold px-8 py-4 rounded-lg hover:bg-teal-50 transition-colors shadow-md'>
                    Subscribe
                </button>
            </div>
            
        </div>
    </div>
  )
}

export default Newsletter