import React from "react";

const AboutUs = () => {
  return (
    <div className="min-h-screen px-5 md:px-40 py-24 bg-gray-50">
      
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900">
          About <span className="text-teal-600">Us</span>
        </h1>
        <p className="mt-6 text-gray-600 max-w-3xl mx-auto text-lg">
          We help people live healthier, wealthier, and smarter lives through
          practical knowledge in fitness, finance, and technology.
        </p>
      </div>

      {/* Content */}
      <div className="grid md:grid-cols-2 gap-16 items-center">
        
        {/* Left */}
        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Why We Exist
          </h2>
          <p className="text-gray-600 mb-6 leading-relaxed">
            Most people struggle not because of lack of motivation, but because
            of lack of clarity. The internet is noisy. Advice is scattered.
            We created this platform to simplify growth across the most
            important areas of life.
          </p>

          <p className="text-gray-600 leading-relaxed">
            Whether you want to get fit, manage money better, or stay ahead in
            tech — we focus on **actionable, no-BS content** that actually
            improves your life.
          </p>
        </div>

        {/* Right */}
        <div className="bg-white p-8 rounded-2xl shadow-lg">
          <h3 className="text-2xl font-semibold mb-4 text-gray-800">
            What You’ll Find Here
          </h3>
          <ul className="space-y-3 text-gray-600 list-disc pl-5">
            <li>Science-backed fitness & health guidance</li>
            <li>Beginner-friendly finance & investing knowledge</li>
            <li>Practical tech tools, AI & productivity insights</li>
            <li>Content written to be simple, useful, and honest</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
