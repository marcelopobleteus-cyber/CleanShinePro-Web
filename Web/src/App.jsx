import React, { useState } from 'react';
import { Analytics } from '@vercel/analytics/react';
import Hero from './components/Hero';
import TrustBar from './components/TrustBar';
import Services from './components/Services';
import Process from './components/Process';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import ServicesPage from './pages/ServicesPage';
import ProcessPage from './pages/ProcessPage';
import ContactPage from './pages/ContactPage';
import ServiceAreasPage from './pages/ServiceAreasPage';
import BookingPage from './pages/BookingPage';
import AboutPage from './pages/AboutPage';
import PrivacyPage from './pages/PrivacyPage';
import CommercialAssistant from './components/CommercialAssistant';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'services':
        return <ServicesPage onNavigate={setCurrentPage} />;
      case 'service-areas':
        return <ServiceAreasPage onNavigate={setCurrentPage} />;
      case 'process':
        return <ProcessPage onNavigate={setCurrentPage} />;
      case 'contact':
        return <ContactPage />;
      case 'about':
        return <AboutPage onNavigate={setCurrentPage} />;
      case 'privacy':
        return <PrivacyPage />;

      case 'booking':
        return <BookingPage />;
      default:
        return (
          <>
            <Hero onNavigate={setCurrentPage} />
            <TrustBar />
            <Services onNavigate={setCurrentPage} />
            <Process />
            <Testimonials />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#020617]">
      {/* Navigation - White Strip */}
      <nav className="bg-white/95 backdrop-blur-xl border-b border-gray-200 sticky top-0 z-50 py-4 shadow-sm transition-all duration-300">
        <div className="container mx-auto px-6 flex justify-between items-center">
          {/* Enhanced Logo Visibility */}
          <div className="flex items-center cursor-pointer" onClick={() => setCurrentPage('home')}>
            <img
              src="/logo.png"
              alt="CleanShine Pro"
              className="h-16 md:h-20 w-auto object-contain hover:scale-105 transition-transform duration-300"
            />
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-600">
              <button onClick={() => setCurrentPage('home')} className={`hover:text-emerald-600 transition-colors ${currentPage === 'home' ? 'text-emerald-600 font-bold' : ''}`}>Home</button>
              <button onClick={() => setCurrentPage('about')} className={`hover:text-emerald-600 transition-colors ${currentPage === 'about' ? 'text-emerald-600 font-bold' : ''}`}>About</button>
              <button onClick={() => setCurrentPage('services')} className={`hover:text-emerald-600 transition-colors ${currentPage === 'services' ? 'text-emerald-600 font-bold' : ''}`}>Services</button>
              <button onClick={() => setCurrentPage('process')} className={`hover:text-emerald-600 transition-colors ${currentPage === 'process' ? 'text-emerald-600 font-bold' : ''}`}>Process</button>
              <button onClick={() => setCurrentPage('contact')} className={`hover:text-emerald-600 transition-colors ${currentPage === 'contact' ? 'text-emerald-600 font-bold' : ''}`}>Contact</button>
            </div>
            <button onClick={() => setCurrentPage('contact')} className="hidden md:block px-6 py-2.5 bg-[#0A2E5C] hover:bg-[#020617] text-white text-sm font-semibold rounded-full transition-all shadow-md hover:shadow-lg">
              Get Quote
            </button>
          </div>
        </div>
      </nav>

      <main className="flex-grow">
        {renderPage()}
      </main>

      <CommercialAssistant />
      <Footer onNavigate={setCurrentPage} />
      <Analytics />
    </div>
  );
}

export default App;
