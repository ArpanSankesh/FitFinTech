import React from 'react'

const Hero = () => {
    return (
        <div className='min-h-screen w-full bg-linear-to-br from-[#111827] to-[#134E4A] flex flex-col p-5 md:px-30 justify-center text-white pt-10'>
            {/* left */}
            <div className="md:w-3/5">
                <h1 className="text-white text-5xl md:text-7xl font-bold ">Fit Raho. <span className='text-[#0D9488]'>Rich Bano.</span> Smart Jeeyo.</h1>
                <p className='mt-6 md:text-2xl text-gray-300'>Daily Fitness + Finance + Tech solutions in one place. Your complete guide to a healthier, wealthier, and smarter life.</p>

                <div className='mt-10 flex gap-4 justify-center md:justify-start'>
                    <button className='cursor-pointer bg-[#0D9488] hover:bg-[#134E4A] transition md:py-4 py-3 px-6 md:px-8 outline-none border-2 border-[#0D9488] rounded-lg'>Explore Blog</button>
                    <button className='cursor-pointer bg-transparent hover:bg-white hover:text-black transition md:py-4 py-3 px-6 md:px-8 outline-none border-2 border-white rounded-lg'>Learn More</button>
                </div>
            </div>
            {/* right */}
            <div className='hidden md:flex'>

            </div>
        </div>
    )
}

export default Hero