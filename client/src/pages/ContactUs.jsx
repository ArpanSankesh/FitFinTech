import React from "react";

const ContactUs = () => {
  return (
    <div className="min-h-screen px-5 md:px-40 py-24 bg-white">
      
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900">
          Contact <span className="text-teal-600">Us</span>
        </h1>
        <p className="mt-6 text-gray-600 max-w-2xl mx-auto text-lg">
          Have a question, suggestion, or collaboration idea?
          We’d love to hear from you.
        </p>
      </div>

      {/* Form */}
      <div className="max-w-3xl mx-auto bg-gray-50 p-8 md:p-12 rounded-2xl shadow-lg">
        <form className="space-y-6">
          
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Name
            </label>
            <input
              type="text"
              placeholder="Your name"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              placeholder="your@email.com"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Message
            </label>
            <textarea
              rows="5"
              placeholder="Write your message here..."
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-teal-600 text-white py-3 rounded-lg font-semibold hover:bg-teal-700 transition"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
