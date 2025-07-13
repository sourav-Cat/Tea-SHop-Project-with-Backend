import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Header from './components/Header';
import Products from './components/Products';
import GreatTea from './components/GreatTea';
import Reviews from './components/Reviews';
import MapSection from './components/MapSection';
import Footer from './components/Footer';
import GetStartedModal from './components/GetStartedModal';
import BuyNowModal from './components/BuyNowModal';

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [showGetStartedModal, setShowGetStartedModal] = useState(false);
  const [showBuyNowModal, setShowBuyNowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Handle scroll to update active navigation
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'products', 'reviews', 'map', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetBottom = offsetTop + element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleBuyNow = (product) => {
    setSelectedProduct(product);
    setShowBuyNowModal(true);
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="App">
      <Navbar 
        activeSection={activeSection} 
        onNavigate={scrollToSection}
        onGetStarted={() => setShowGetStartedModal(true)}
      />
      
      <main className="max-w-screen-xl mx-auto px-4 lg:px-20">
        <Header onExplore={() => scrollToSection('products')} />
        
        <Products onBuyNow={handleBuyNow} />
        
        <GreatTea />
        
        <Reviews />
        
        <MapSection />
      </main>
      
      <Footer 
        onGetStarted={() => setShowGetStartedModal(true)}
        onNavigate={scrollToSection}
      />

      {/* Modals */}
      <GetStartedModal 
        isOpen={showGetStartedModal}
        onClose={() => setShowGetStartedModal(false)}
        onExplore={() => {
          setShowGetStartedModal(false);
          setTimeout(() => scrollToSection('products'), 300);
        }}
        onContact={() => {
          setShowGetStartedModal(false);
          setTimeout(() => scrollToSection('contact'), 300);
        }}
      />

      <BuyNowModal 
        isOpen={showBuyNowModal}
        product={selectedProduct}
        onClose={() => setShowBuyNowModal(false)}
      />
    </div>
  );
}

export default App; 