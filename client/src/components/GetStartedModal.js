import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaMugHot, FaLeaf, FaEnvelope, FaTimes } from 'react-icons/fa';

const GetStartedModal = ({ isOpen, onClose, onExplore, onContact }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="bg-white rounded-xl p-8 max-w-md w-full mx-4 transform transition-all duration-300"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="text-center">
            <motion.div 
              className="w-16 h-16 bg-gradient-to-r from-[#FF8938] to-[#FF0000] rounded-full flex items-center justify-center mx-auto mb-6"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            >
              <FaMugHot className="text-white text-2xl" />
            </motion.div>
            
            <motion.h2 
              className="text-2xl font-bold text-gray-800 mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Welcome to Tea House!
            </motion.h2>
            
            <motion.p 
              className="text-gray-600 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Ready to explore our premium tea collection? Let's get you started with the perfect tea experience.
            </motion.p>
            
            <motion.div 
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <motion.button
                onClick={onExplore}
                className="w-full bg-gradient-to-r from-[#FF8938] to-[#FF0000] text-white py-3 rounded-lg font-bold hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <FaLeaf className="mr-2" />
                Explore Products
              </motion.button>
              
              <motion.button
                onClick={onContact}
                className="w-full bg-gray-100 text-gray-700 py-3 rounded-lg font-bold hover:bg-gray-200 transition-all duration-300 flex items-center justify-center"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <FaEnvelope className="mr-2" />
                Contact Us
              </motion.button>
            </motion.div>
            
            <motion.button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors duration-200"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              whileHover={{ scale: 1.1 }}
            >
              <FaTimes className="text-xl" />
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default GetStartedModal; 