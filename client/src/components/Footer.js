import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaMugHot, FaCircleChevronRight } from 'react-icons/fa';
import { FaFacebook, FaInstagram, FaSquareXTwitter } from 'react-icons/fa6';

const Footer = ({ onGetStarted, onNavigate }) => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      showMessage('Please enter a valid email address.', 'error');
      return;
    }

    try {
      showMessage('Subscribing...', 'loading');
      
      // Send to backend
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email })
      });
      
      const result = await response.json();
      
      if (result.success) {
        showMessage('Successfully subscribed to newsletter! 🎉', 'success');
        setEmail(''); // Clear input
      } else {
        showMessage(result.error || 'Subscription failed. Please try again.', 'error');
      }
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      showMessage('Network error. Please try again.', 'error');
    }
  };

  const showMessage = (msg, type) => {
    setMessage(msg);
    setMessageType(type);
    
    // Auto-hide success messages after 5 seconds
    if (type === 'success') {
      setTimeout(() => {
        setMessage('');
        setMessageType('');
      }, 5000);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleNewsletterSubmit(e);
    }
  };

  return (
    <footer id="footer" className="bg-orange-200 w-full mb-20 text-gray-700 py-16 px-4 md:px-16">
      <div className="max-w-6xl mx-auto">
        {/* Logo */}
        <motion.div 
          className="mb-12 flex flex-col md:flex-row justify-between items-center gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <img className="w-20 h-20" src="/images/cup.png" alt="Tea House Logo" />
          <div className="flex flex-col md:flex-row items-center gap-6">
            <h4 className="text-lg font-semibold">Ready to get started?</h4>
            <motion.button
              onClick={onGetStarted}
              className="bg-gradient-to-r from-[#FF8938] to-[#FF0000] text-white px-6 py-3 rounded-lg font-bold hover:shadow-lg transition-all duration-300 transform hover:scale-105"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started
            </motion.button>
          </div>
        </motion.div>
        
        {/* Links */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* First column */}
          <div className="space-y-4">
            <h3 className="font-semibold text-xl mb-4 text-gray-800">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <button 
                  onClick={() => onNavigate('home')}
                  className="hover:text-orange-600 transition-colors duration-200 cursor-pointer"
                >
                  Home
                </button>
              </li>
              <li><a className="hover:text-orange-600 transition-colors duration-200" href="#About">About Us</a></li>
              <li><a className="hover:text-orange-600 transition-colors duration-200" href="#Products">Products</a></li>
              <li><a className="hover:text-orange-600 transition-colors duration-200" href="#Contact">Contact</a></li>
            </ul>
          </div>
          
          {/* Second column */}
          <div className="space-y-4">
            <h3 className="font-semibold text-xl mb-4 text-gray-800">Our Services</h3>
            <ul className="space-y-3">
              <li><a className="hover:text-orange-600 transition-colors duration-200" href="#">Premium Tea</a></li>
              <li><a className="hover:text-orange-600 transition-colors duration-200" href="#">Tea Accessories</a></li>
              <li><a className="hover:text-orange-600 transition-colors duration-200" href="#">Tea Workshops</a></li>
              <li><a className="hover:text-orange-600 transition-colors duration-200" href="#">Custom Blends</a></li>
            </ul>
          </div>
          
          {/* Third column */}
          <div className="space-y-4">
            <h3 className="font-semibold text-xl mb-4 text-gray-800">Help</h3>
            <ul className="space-y-3">
              <li><a className="hover:text-orange-600 transition-colors duration-200" href="#FAQs">FAQs</a></li>
              <li><a className="hover:text-orange-600 transition-colors duration-200" href="#Contact">Contact Us</a></li>
              <li><a className="hover:text-orange-600 transition-colors duration-200" href="#Shipping">Shipping Info</a></li>
              <li><a className="hover:text-orange-600 transition-colors duration-200" href="#Returns">Returns</a></li>
            </ul>
          </div>
          
          {/* Fourth column */}
          <div className="space-y-4">
            <h3 className="font-semibold text-xl mb-4 text-gray-800">
              Subscribe to our newsletter
            </h3>
            <p className="text-sm text-gray-600 mb-4">Get updates about new tea varieties and special offers!</p>
            <form onSubmit={handleNewsletterSubmit} className="flex items-center">
              <input 
                type="email" 
                placeholder="Email Address" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyPress={handleKeyPress}
                className="bg-transparent border-b-2 border-gray-600 flex-1 mr-2 focus:outline-none focus:border-orange-500" 
              />
              <button type="submit" className="text-orange-600 hover:text-orange-700 transition-colors duration-200">
                <FaCircleChevronRight className="text-xl" />
              </button>
            </form>
            {message && (
              <div className={`text-sm mt-2 ${
                messageType === 'success' ? 'text-green-600' :
                messageType === 'error' ? 'text-red-600' :
                'text-orange-600'
              }`}>
                {message}
              </div>
            )}
            <div className="flex gap-4 mt-4">
              <a 
                href="https://www.facebook.com/najmus.sadat.551805/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-orange-600 hover:text-orange-700 transition-colors duration-200"
              >
                <FaFacebook className="text-2xl" />
              </a>
              <a 
                href="https://www.instagram.com/najmus__sourav/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-orange-600 hover:text-orange-700 transition-colors duration-200"
              >
                <FaInstagram className="text-2xl" />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-orange-600 hover:text-orange-700 transition-colors duration-200"
              >
                <FaSquareXTwitter className="text-2xl" />
              </a>
            </div>
          </div>
        </motion.div>
      </div> 
      
      {/* Copyright Section */}
      <motion.div 
        className="bg-gray-800 text-white py-6 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <div className="max-w-6xl mx-auto px-4">
          <p className="text-sm">
            © 2024 Tea House. All rights reserved. | 
            <a href="#" className="hover:text-orange-400 transition-colors duration-200"> Privacy Policy</a> | 
            <a href="#" className="hover:text-orange-400 transition-colors duration-200"> Terms of Service</a> | 
            <a href="#" className="hover:text-orange-400 transition-colors duration-200"> Cookie Policy</a>
          </p>
          <p className="text-xs text-gray-400 mt-2">
            Made with ❤️ for tea lovers worldwide
          </p>
        </div>
      </motion.div>
    </footer>
  );
};

export default Footer; 