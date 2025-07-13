import React from 'react';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaClock, FaPhone, FaDirections, FaCopy, FaCheck } from 'react-icons/fa';
import { useState } from 'react';

const MapSection = () => {
  const [copied, setCopied] = useState(false);

  const openGoogleMaps = () => {
    const address = "123 Tea Street, Dhaka 1200, Bangladesh";
    const encodedAddress = encodeURIComponent(address);
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
    window.open(googleMapsUrl, '_blank');
  };

  const copyAddress = () => {
    const address = "123 Tea Street, Dhaka 1200, Bangladesh";
    navigator.clipboard.writeText(address).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }).catch(err => {
      console.error('Failed to copy address: ', err);
      alert('Failed to copy address. Please copy manually: ' + address);
    });
  };

  return (
    <section id="map-section" className="py-16 lg:py-24">
      <motion.div 
        className="text-center mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-3xl md:text-5xl font-bold mb-4 text-[#1C1C1C] font-man">
          Visit Our Tea House
        </h2>
        <p className="max-w-3xl mx-auto text-base md:text-lg text-[#777777] px-4">
          Come experience the finest tea collection in our cozy tea house. We're located in the heart of the city, easily accessible for all tea lovers.
        </p>
      </motion.div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Map */}
        <motion.div 
          className="bg-white rounded-xl shadow-lg overflow-hidden"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="h-96 w-full">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.902442430136!2d90.3773!3d23.8103!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c0b0a0b0b0b0%3A0x0!2zMjPCsDQ4JzM3LjEiTiA5MMKwMjInNDAuMyJF!5e0!3m2!1sen!2sbd!4v1234567890"
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Tea House Location"
            />
          </div>
        </motion.div>
        
        {/* Location Details */}
        <motion.div 
          className="space-y-8"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-8">
            <h3 className="text-2xl font-bold text-[#1C1C1C] mb-6">Location Details</h3>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-[#FF8938] to-[#FF0000] rounded-full flex items-center justify-center flex-shrink-0">
                  <FaMapMarkerAlt className="text-white text-xl" />
                </div>
                <div>
                  <h4 className="font-semibold text-lg text-[#1C1C1C]">Address</h4>
                  <p className="text-[#777777]">123 Tea Street, Dhaka 1200<br />Bangladesh</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-[#FF8938] to-[#FF0000] rounded-full flex items-center justify-center flex-shrink-0">
                  <FaClock className="text-white text-xl" />
                </div>
                <div>
                  <h4 className="font-semibold text-lg text-[#1C1C1C]">Opening Hours</h4>
                  <p className="text-[#777777]">Monday - Friday: 8:00 AM - 10:00 PM<br />Saturday - Sunday: 9:00 AM - 11:00 PM</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-[#FF8938] to-[#FF0000] rounded-full flex items-center justify-center flex-shrink-0">
                  <FaPhone className="text-white text-xl" />
                </div>
                <div>
                  <h4 className="font-semibold text-lg text-[#1C1C1C]">Contact</h4>
                  <p className="text-[#777777]">Phone: +880 1234-567890<br />Email: info@teahouse.com</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h4 className="font-semibold text-lg text-[#1C1C1C] mb-4">Get Directions</h4>
            <div className="space-y-3">
              <motion.button
                onClick={openGoogleMaps}
                className="w-full bg-gradient-to-r from-[#FF8938] to-[#FF0000] text-white py-3 px-4 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <FaDirections />
                Open in Google Maps
              </motion.button>
              <motion.button
                onClick={copyAddress}
                className={`w-full py-3 px-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                  copied 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {copied ? <FaCheck /> : <FaCopy />}
                {copied ? 'Address Copied!' : 'Copy Address'}
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Next Button */}
      <motion.div 
        className="text-center mt-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <button 
          onClick={() => document.getElementById('footer')?.scrollIntoView({ behavior: 'smooth' })}
          className="bg-gradient-to-r from-[#FF8938] to-[#FF0000] text-white px-8 py-4 rounded-xl font-bold hover:shadow-lg transition-all duration-300 flex items-center mx-auto gap-3"
        >
          Next Section <FaArrowDown />
        </button>
      </motion.div>
    </section>
  );
};

export default MapSection; 