import React from 'react';
import { motion } from 'framer-motion';
import { FaArrowDown } from 'react-icons/fa';

const GreatTea = () => {
  return (
    <section id="next-section" className="py-16 lg:py-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Image section */}
        <motion.div 
          className="grid grid-cols-2 grid-rows-3 gap-4 lg:w-5/6"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="h-32 lg:h-40 rounded-lg bg-gradient-to-r from-red-300 to-red-100"></div>
          <div className="bg-orange-50 row-span-2 rounded-lg flex items-center justify-center">
            <img className="w-32 h-32 object-contain" src="/images/fresh-1.png" alt="Fresh Tea Leaves" />
          </div>
          <div className="bg-orange-50 row-span-2 rounded-lg flex items-center justify-center">
            <img className="w-32 h-32 object-contain" src="/images/fresh-2.png" alt="Premium Tea Blend" />
          </div>
          <div className="h-32 lg:h-40 rounded-lg bg-gradient-to-r from-stone-300 to-stone-100"></div>
        </motion.div>
        
        {/* Text section */}
        <motion.div 
          className="font-man"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">
            Great Tea, Freshly <br />Presented
          </h1>
          <p className="text-[#777777] mb-8 text-lg leading-relaxed">
            The meaning of gong cha is Chinese is to provide the best tea to emperor from all possessions. It represents the highest quality and self expectation. Establishing in 2006, Gong cha had been deeply appreciated by its customers because of good words of mouth and unique customized service originated from Taiwan.
          </p>
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h2 className="text-2xl font-bold mb-3 text-[#1C1C1C]">Unique Taste</h2>
              <p className="text-[#777777]">A unique and different style from other teapots gives a luxurious and minimalist impression</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <h3 className="text-2xl font-bold mb-3 text-[#1C1C1C]">Premium Quality</h3>
              <p className="text-[#777777]">Premium quality that makes tea more elegant and more durable when you use it.</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
      
      {/* Next Button */}
      <motion.div 
        className="text-center mt-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
      >
        <button 
          onClick={() => document.getElementById('reviews')?.scrollIntoView({ behavior: 'smooth' })}
          className="bg-gradient-to-r from-[#FF8938] to-[#FF0000] text-white px-8 py-4 rounded-xl font-bold hover:shadow-lg transition-all duration-300 flex items-center mx-auto gap-3"
        >
          Next Section <FaArrowDown />
        </button>
      </motion.div>
    </section>
  );
};

export default GreatTea; 