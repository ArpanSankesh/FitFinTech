import React, { useState } from 'react';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle, loading, success, error

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');

    try {
      setTimeout(() => {
        console.log("Subscribed:", email);
        setStatus('success');
        setEmail('');
      }, 1500);

    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <div className='w-full bg-[#0D9488] py-16 px-5'>
      <div className='max-w-4xl mx-auto text-center flex flex-col items-center justify-center'>
        
        <h2 className='text-3xl md:text-4xl font-bold text-white mb-3'>
          Stay Updated
        </h2>
        <p className='text-teal-50 mb-8 text-lg'>
          Get weekly tips on fitness, finance, and tech delivered to your inbox.
        </p>

        <form 
          onSubmit={handleSubmit} 
          className='w-full max-w-lg flex flex-col md:flex-row gap-4'
        >
          <input 
            type="email" 
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email" 
            className='bg-white w-full px-6 py-4 rounded-lg outline-none text-gray-700 focus:ring-2 focus:ring-teal-300'
          />
          <button 
            type="submit"
            disabled={status === 'loading'}
            className='bg-white text-[#0D9488] font-bold px-8 py-4 rounded-lg hover:bg-teal-50 transition-colors shadow-md disabled:opacity-70'
          >
            {status === 'loading' ? 'Joining...' : 'Subscribe'}
          </button>
        </form>

        {/* Feedback Messages */}
        {status === 'success' && (
          <p className="mt-4 text-white font-medium">Thanks for subscribing! 🎉</p>
        )}
        {status === 'error' && (
          <p className="mt-4 text-red-200 font-medium">Something went wrong. Please try again.</p>
        )}
        
      </div>
    </div>
  );
};

export default Newsletter;