import React from 'react'
import { FaDumbbell, FaChartLine, FaMicrochip } from "react-icons/fa";

const FeaturedTools = () => {
  // Data array to make the code cleaner and easier to edit later
    const cards = [
      {
        title: "Fitness",
        icon: <FaDumbbell className="text-4xl text-teal-600 mb-4" />,
        desc: "Master your health with science-backed diet tips, workouts, and fitness hacks.",
        items: ["Weight Loss Strategies", "Workout Plans", "Nutrition Guides"]
      },
      {
        title: "Finance",
        icon: <FaChartLine className="text-4xl text-teal-600 mb-4" />,
        desc: "Grow your wealth with smart investment advice, savings hacks, and market trends.",
        items: ["Investment Strategies", "Budgeting 101", "Crypto & Stocks"]
      },
      {
        title: "Tech",
        icon: <FaMicrochip className="text-4xl text-teal-600 mb-4" />,
        desc: "Stay ahead with the latest gadget reviews, AI tools, and software tutorials.",
        items: ["Gadget Reviews", "AI Tools & Tips", "Coding Tutorials"]
      },
      {
        title: "Tech",
        icon: <FaMicrochip className="text-4xl text-teal-600 mb-4" />,
        desc: "Stay ahead with the latest gadget reviews, AI tools, and software tutorials.",
        items: ["Gadget Reviews", "AI Tools & Tips", "Coding Tutorials"]
      },
      {
        title: "Tech",
        icon: <FaMicrochip className="text-4xl text-teal-600 mb-4" />,
        desc: "Stay ahead with the latest gadget reviews, AI tools, and software tutorials.",
        items: ["Gadget Reviews", "AI Tools & Tips", "Coding Tutorials"]
      },
    ];
  
    return (
      <div className='py-20 bg-gray-50 flex flex-col items-center justify-center px-5 md:px-20'>
          
          {/* Section Header */}
          <h1 className='text-teal-600 text-3xl md:text-5xl font-bold mb-4 text-center'>
              Featured Tools & Calculators
          </h1>
          <p className='text-gray-500 text-center max-w-2xl mb-12 text-lg'>
              High-engagement tools trusted by thousands
          </p>
  
          {/* Cards Container */}
          <div className='w-full grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl'>
              
              {/* Map through the cards data to generate HTML */}
              {cards.map((card, index) => (
                  <div key={index} className='bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 p-8 border border-gray-100 flex flex-col items-center text-center'>
                      
                      {/* Icon */}
                      <div className='bg-teal-50  rounded-full mb-4'>
                          {card.icon}
                      </div>
  
                      {/* Title */}
                      <h3 className='text-2xl font-bold text-gray-800 mb-3'>{card.title}</h3>
                      
                      {/* Description */}
                      <p className='text-gray-600 mb-6 leading-relaxed'>
                          {card.desc}
                      </p>
  
                      {/* List Items */}
                      <ul className='text-gray-500 space-y-2 w-full text-left pl-8 list-disc'>
                          {card.items.map((item, i) => (
                              <li key={i}>{item}</li>
                          ))}
                      </ul>
                  </div>
              ))}
              
          </div>
      </div>
    )
}

export default FeaturedTools