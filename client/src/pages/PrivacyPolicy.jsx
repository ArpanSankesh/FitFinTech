import React from 'react'

const PrivacyPolicy = () => {
  return (
    <div className='bg-white min-h-screen py-24 px-5 md:px-20'>
        <div className='max-w-4xl mx-auto'>
            
            <h1 className='text-3xl md:text-5xl font-bold text-gray-900 mb-8'>Privacy Policy</h1>
            <p className='text-gray-500 mb-10'>Last updated: December 27, 2025</p>

            <div className='prose prose-lg text-gray-700 leading-relaxed space-y-8'>
                
                <section>
                    <h2 className='text-2xl font-bold text-gray-900 mb-4'>1. Introduction</h2>
                    <p>
                        Welcome to FitFinTech. We respect your privacy and are committed to protecting your personal data. 
                        This privacy policy will inform you as to how we look after your personal data when you visit our website 
                        and tell you about your privacy rights.
                    </p>
                </section>

                <section>
                    <h2 className='text-2xl font-bold text-gray-900 mb-4'>2. Information We Collect</h2>
                    <p>
                        We may collect, use, store and transfer different kinds of personal data about you which we have grouped together follows:
                    </p>
                    <ul className='list-disc pl-5 mt-4 space-y-2'>
                        <li><strong>Identity Data:</strong> includes first name, last name, username or similar identifier.</li>
                        <li><strong>Contact Data:</strong> includes email address and telephone number.</li>
                        <li><strong>Technical Data:</strong> includes internet protocol (IP) address, browser type and version, time zone setting and location, and operating system.</li>
                    </ul>
                </section>

                <section>
                    <h2 className='text-2xl font-bold text-gray-900 mb-4'>3. How We Use Your Information</h2>
                    <p>
                        We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
                    </p>
                    <ul className='list-disc pl-5 mt-4 space-y-2'>
                        <li>To provide and maintain our service.</li>
                        <li>To notify you about changes to our service.</li>
                        <li>To provide customer support.</li>
                        <li>To gather analysis or valuable information so that we can improve our service.</li>
                    </ul>
                </section>

                <section>
                    <h2 className='text-2xl font-bold text-gray-900 mb-4'>4. Cookies</h2>
                    <p>
                        We use cookies and similar tracking technologies to track the activity on our Service and hold certain information. 
                        You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
                    </p>
                </section>

                <section>
                    <h2 className='text-2xl font-bold text-gray-900 mb-4'>5. Contact Us</h2>
                    <p>
                        If you have any questions about this Privacy Policy, you can contact us:
                    </p>
                    <p className='mt-2 font-medium text-teal-600'>By email: support@fitfintech.com</p>
                </section>

            </div>
        </div>
    </div>
  )
}

export default PrivacyPolicy