import React from 'react';
import { motion } from 'framer-motion';
import { FaArrowRight, FaStar } from 'react-icons/fa';

const Header = ({ onExplore }) => {
  return (
    <header id="home" className="flex flex-col lg:flex-row items-center gap-8 p-8">
      <motion.div 
        className="lg:w-1/2"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Text and paragraph */}
        <h3 className="text-4xl lg:text-7xl font-man font-bold leading-tight">
          It's good <br /> 
          tea time at The <br /> Tea House
        </h3>
        <p className="font-man w-full lg:w-3/4 pt-7 text-left text-[#777777] text-lg">
          Tea and Botanical Solutions Supplier Give Optimum Satisfaction To Your Taste Buds.
        </p>
        <motion.button
          onClick={onExplore}
          className="bg-gradient-to-r from-[#FF8938] to-[#FF0000] text-xl text-white p-4 mt-6 rounded-xl w-auto text-center font-bold hover:shadow-lg transition-all duration-300 cursor-pointer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Explore More <FaArrowRight className="ml-2 transform -rotate-45 inline" />
        </motion.button>
      </motion.div>
      
      <motion.div 
        className="lg:w-1/2 relative group"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="rounded-lg">
          <img 
            className="w-full rounded-lg transition-all duration-500 group-hover:scale-105 group-hover:shadow-2xl" 
            src="/images/banner.png" 
            alt="Tea House Banner" 
          />
        </div>
        <motion.div 
          className="absolute flex rounded-xl bg-white shadow-2xl px-4 py-3 text-left items-center bottom-4 left-4 md:px-6 md:py-4 lg:left-8 lg:bottom-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div>
            <FaStar className="text-2xl text-orange-500" />
          </div>
          <div className="ml-3">
            <h2 className="text-2xl font-bold">5.00</h2>
            <p className="text-[#777777] text-sm">
              Trust Pilot Ratings
            </p>
          </div>
        </motion.div>
      </motion.div>
    </header>
  );
};

export default Header; 