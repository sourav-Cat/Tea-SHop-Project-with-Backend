import React from 'react';
import { motion } from 'framer-motion';
import { FaArrowDown } from 'react-icons/fa';

const Products = ({ onBuyNow }) => {
  const products = [
    {
      id: 1,
      name: "Milk Tea",
      description: "Smooth and creamy milk tea with rich flavor and perfect sweetness balance.",
      price: 4.99,
      originalPrice: 6.99,
      image: "/images/tea-1.png",
      category: "Milk Tea"
    },
    {
      id: 2,
      name: "Black Tea",
      description: "Strong and bold black tea with natural antioxidants and refreshing taste.",
      price: 3.99,
      originalPrice: 5.99,
      image: "/images/tea-2.png",
      category: "Black Tea"
    },
    {
      id: 3,
      name: "Lemon Tea",
      description: "Refreshing lemon tea with citrus zest and natural vitamin C boost.",
      price: 4.49,
      originalPrice: 6.49,
      image: "/images/tea-3.png",
      category: "Herbal Tea"
    },
    {
      id: 4,
      name: "Orange Tea",
      description: "Sweet and tangy orange tea with natural fruit essence and aroma.",
      price: 4.79,
      originalPrice: 6.79,
      image: "/images/tea-4.png",
      category: "Fruit Tea"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  return (
    <section id="products" className="py-16 lg:py-24">
      {/* Section title */}
      <motion.div 
        className="text-center mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-3xl md:text-5xl font-bold mb-4 text-[#1C1C1C] font-man">
          Our Featured Products
        </h2>
        <p className="max-w-3xl mx-auto text-base md:text-lg text-[#777777] px-4">
          There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.
        </p>
      </motion.div>
      
      {/* Product grid */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {products.map((product) => (
          <motion.div
            key={product.id}
            className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden group"
            variants={itemVariants}
            whileHover={{ y: -5 }}
          >
            <div className="p-6">
              <img 
                className="mx-auto w-32 h-32 object-contain mb-4 group-hover:scale-105 transition-transform duration-300" 
                src={product.image} 
                alt={product.name} 
              />
              <div>
                <h3 className="font-bold text-center text-[#1C1C1C] text-xl mb-2">
                  {product.name}
                </h3>
                <p className="text-center text-sm text-[#777777] mb-3">
                  {product.description}
                </p>
                <div className="text-center mb-4">
                  <span className="text-2xl font-bold text-orange-600">
                    ${product.price}
                  </span>
                  <span className="text-sm text-gray-500 line-through ml-2">
                    ${product.originalPrice}
                  </span>
                </div>
                <motion.button
                  onClick={() => onBuyNow(product)}
                  className="w-full bg-gradient-to-r from-[#FF8938] to-[#FF0000] text-white py-2 px-4 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Buy Now
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
      
      {/* Next Button */}
      <motion.div 
        className="text-center mt-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <button 
          onClick={() => document.getElementById('next-section')?.scrollIntoView({ behavior: 'smooth' })}
          className="bg-gradient-to-r from-[#FF8938] to-[#FF0000] text-white px-8 py-4 rounded-xl font-bold hover:shadow-lg transition-all duration-300 flex items-center mx-auto gap-3"
        >
          Next Section <FaArrowDown />
        </button>
      </motion.div>
    </section>
  );
};

export default Products; 