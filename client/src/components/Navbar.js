import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes, FaMugHot } from 'react-icons/fa';

const Navbar = ({ activeSection, onNavigate, onGetStarted }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home', icon: 'fa-home' },
    { id: 'products', label: 'Products', icon: 'fa-leaf' },
    { id: 'reviews', label: 'Reviews', icon: 'fa-star' },
    { id: 'map', label: 'Location', icon: 'fa-map-marker-alt' },
    { id: 'contact', label: 'Contact', icon: 'fa-envelope' }
  ];

  const handleNavClick = (sectionId) => {
    onNavigate(sectionId);
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    // Prevent body scroll when menu is open
    document.body.style.overflow = !isMobileMenuOpen ? 'hidden' : 'auto';
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-screen-xl mx-auto px-4 lg:px-20">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center">
            <img className="w-12 h-12 mr-3" src="/images/cup.png" alt="Tea House Logo" />
            <span className="text-2xl font-bold text-gray-800 font-man">Tea House</span>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`transition-colors duration-200 cursor-pointer font-medium ${
                  activeSection === item.id
                    ? 'text-orange-600'
                    : 'text-gray-700 hover:text-orange-600'
                }`}
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={onGetStarted}
              className="bg-gradient-to-r from-[#FF8938] to-[#FF0000] text-white px-6 py-2 rounded-lg font-bold hover:shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              Get Started
            </button>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              onClick={toggleMobileMenu}
              className="text-gray-700 hover:text-orange-600 transition-colors duration-200 p-2 rounded-lg hover:bg-orange-50"
            >
              {isMobileMenuOpen ? (
                <FaTimes className="text-xl" />
              ) : (
                <FaBars className="text-xl" />
              )}
            </button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ duration: 0.3 }}
              className="lg:hidden fixed top-0 right-0 h-full z-50"
            >
              <div className="bg-white w-80 h-full shadow-2xl">
                {/* Header */}
                <div className="px-6 py-6 border-b border-gray-200">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <img className="w-10 h-10 mr-3" src="/images/cup.png" alt="Tea House Logo" />
                      <span className="text-xl font-bold text-gray-800 font-man">Tea House</span>
                    </div>
                    <button
                      onClick={toggleMobileMenu}
                      className="text-gray-500 hover:text-orange-600 transition-colors duration-200 p-2"
                    >
                      <FaTimes className="text-2xl" />
                    </button>
                  </div>
                </div>
                
                {/* Menu Items */}
                <div className="px-6 py-6 space-y-4">
                  {navItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleNavClick(item.id)}
                      className={`flex items-center py-4 px-4 w-full text-left transition-all duration-200 rounded-lg ${
                        activeSection === item.id
                          ? 'text-orange-600 font-semibold bg-orange-50'
                          : 'text-gray-700 hover:text-orange-600 hover:bg-orange-50 font-medium'
                      }`}
                    >
                      <i className={`fa-solid ${item.icon} mr-3 text-lg`}></i>
                      {item.label}
                    </button>
                  ))}
                </div>
                
                {/* Footer */}
                <div className="px-6 py-6 border-t border-gray-200 absolute bottom-0 left-0 right-0">
                  <button
                    onClick={() => {
                      onGetStarted();
                      toggleMobileMenu();
                    }}
                    className="w-full bg-gradient-to-r from-[#FF8938] to-[#FF0000] text-white px-6 py-4 rounded-xl font-bold hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
                  >
                    <FaMugHot className="mr-2" />
                    Get Started
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar; 