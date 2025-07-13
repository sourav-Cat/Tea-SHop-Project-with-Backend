import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowDown, FaChevronUp } from 'react-icons/fa';

const Reviews = () => {
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const reviews = [
    {
      id: 1,
      name: "Nusrat Faria",
      title: "Tea Enthusiast",
      comment: "We are providing the best and suitable tea services for the people who are interested to quality tea. The taste and aroma are simply amazing!",
      image: "/images/client.png"
    },
    {
      id: 2,
      name: "Ahmed Khan",
      title: "Business Owner",
      comment: "The tea quality is exceptional and the service is outstanding. I love their premium tea collection!",
      image: "/images/client.png"
    },
    {
      id: 3,
      name: "Sarah Johnson",
      title: "Tea Connoisseur",
      comment: "Best tea house in the city! Their traditional tea preparation methods are simply perfect.",
      image: "/images/client.png"
    }
  ];

  const handleShowAllReviews = () => {
    if (showAllReviews) {
      // Show original state
      setShowAllReviews(false);
    } else {
      // Show all reviews with animation
      setIsLoading(true);
      setShowAllReviews(true);
      setTimeout(() => setIsLoading(false), 2000);
    }
  };

  const getCardStyle = (index) => {
    if (!showAllReviews) {
      // Original state - only middle card fully visible
      if (index === 0) {
        return { opacity: 1, transform: 'translateX(0)', zIndex: 10 };
      } else {
        return { 
          opacity: 0.4, 
          transform: 'translateX(16px)', 
          zIndex: 5,
          ...(index === 2 && { transform: 'translateX(16px) translateY(8px)' })
        };
      }
    } else {
      // Show all state
      const isMobile = window.innerWidth < 768;
      const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;
      
      if (index === 0) {
        return { opacity: 1, transform: 'translateX(0)', zIndex: 10 };
      } else if (index === 1) {
        const yOffset = isMobile ? -60 : isTablet ? -80 : -120;
        return { opacity: 1, transform: `translateX(0) translateY(${yOffset}px)`, zIndex: 20 };
      } else if (index === 2) {
        const yOffset = isMobile ? 60 : isTablet ? 80 : 120;
        return { opacity: 1, transform: `translateX(0) translateY(${yOffset}px)`, zIndex: 20 };
      }
    }
  };

  return (
    <section id="reviews" className="mb-24">
      <div className="bg-gradient-to-r from-orange-400 to-red-700 rounded-xl grid grid-cols-1 lg:grid-cols-2 text-white px-7 md:px-16 lg:px-24 py-16">
        {/* Text section */}
        <div className="flex justify-center items-center">
          <div className="w-5/6">
            <motion.h1 
              className="font-bold text-4xl lg:text-5xl mb-5"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              Meet Our Super <br /> Clients
            </motion.h1>
            <motion.p 
              className="mb-5 text-lg"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.
            </motion.p>
            <motion.div 
              className="flex justify-center md:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <button
                onClick={handleShowAllReviews}
                disabled={isLoading}
                className={`px-6 py-3 rounded-lg font-semibold transition-colors duration-200 shadow-lg hover:shadow-xl text-lg ${
                  isLoading 
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : showAllReviews
                    ? 'bg-white text-orange-500 hover:bg-gray-100'
                    : 'bg-white text-orange-500 hover:bg-gray-100'
                }`}
              >
                {isLoading ? 'Loading...' : showAllReviews ? 'Show Less' : 'Show All'}
              </button>
            </motion.div>
            
            {/* Mobile Show Less Button (Fixed Position) */}
            <AnimatePresence>
              {showAllReviews && (
                <motion.div
                  className="fixed top-1/2 right-4 z-50 hidden md:hidden transform -translate-y-1/2 mobile-show-less-btn"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3 }}
                >
                  <button
                    onClick={handleShowAllReviews}
                    className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-600 text-white px-8 py-6 rounded-full font-black shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-110 text-xl border-4 border-white animate-pulse"
                  >
                    <FaChevronUp className="mr-3 text-2xl inline" />
                    SHOW LESS
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
        
        {/* Review cards section */}
        <div className="relative py-16 lg:py-24">
          <AnimatePresence>
            {reviews.map((review, index) => (
              <motion.div
                key={review.id}
                className="absolute h-56 bg-white text-black rounded-xl flex items-center w-full md:w-4/5 lg:w-full px-6 shadow-lg"
                style={{
                  ...getCardStyle(index),
                  top: index === 0 ? '13rem' : index === 1 ? '0' : '2rem',
                  left: index === 0 ? '0' : '1rem',
                  right: index === 0 ? '0' : 'auto',
                  margin: index === 0 ? '0 auto' : '0',
                  transition: 'all 0.5s ease-in-out'
                }}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: getCardStyle(index).opacity, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                {/* Image */}
                <div className="absolute bg-white rounded-full -top-5 -left-5 p-1 shadow-md">
                  <img className="w-12 h-12 rounded-full" src={review.image} alt="Client" />
                </div>
                {/* Text */}
                <div className="ml-4">
                  <p className="text-left text-[#777777] mb-4 mt-2">
                    {review.comment}
                  </p>
                  <h2 className="font-bold text-lg">{review.name}</h2>
                  <h3 className="text-gray-600">{review.title}</h3>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
      
      {/* Next Button */}
      <motion.div 
        className="text-center mt-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <button 
          onClick={() => document.getElementById('map-section')?.scrollIntoView({ behavior: 'smooth' })}
          className="bg-gradient-to-r from-[#FF8938] to-[#FF0000] text-white px-8 py-4 rounded-xl font-bold hover:shadow-lg transition-all duration-300 flex items-center mx-auto gap-3"
        >
          Next Section <FaArrowDown />
        </button>
      </motion.div>
    </section>
  );
};

export default Reviews; 