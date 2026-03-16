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
import BlogPage from './pages/BlogPage';
import LocalServicePage from './pages/LocalServicePage';
import CommercialAssistant from './components/CommercialAssistant';
import FAQ from './components/FAQ';
import { Phone, ArrowRight } from 'lucide-react';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [bookingData, setBookingData] = useState(null);

  const handleNavigate = (page, data = null) => {
    setCurrentPage(page);
    if (page === 'booking') {
      setBookingData(data);
    } else {
      setBookingData(null);
    }

    // Dynamic SEO Titles
    const titles = {
      home: "Professional House Cleaning Woodstock GA | CleanShine Pro llc",
      services: "Cleaning Services in Woodstock & Kennesaw | CleanShine Pro",
      process: "Our 6-Step Cleaning Process | CleanShine Pro Quality",
      booking: "Get a Free Cleaning Estimate | CleanShine Pro Premium Engine",
      about: "About CleanShine Pro | Licensed & Insured Cleaning North GA",
      contact: "Contact CleanShine Pro | Cleaning Services in Canton & Marietta",
      blog: "Cleaning Insights & Maintenance Tips | CleanShine Pro Blog",
      woodstock: "Best House Cleaning Woodstock GA | Top-Rated Home Cleaners",
      acworth: "Professional Cleaning Services Acworth GA | CleanShine Pro",
      kennesaw: "Deep Cleaning Specialists Kennesaw GA | Guaranteed Results",
      marietta: "Marietta GA Cleaning Pros | Elite Home & Office Detailing"
    };
    if (titles[page]) document.title = titles[page];

    window.scrollTo(0, 0);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'services':
        return <ServicesPage onNavigate={handleNavigate} />;
      case 'service-areas':
        return <ServiceAreasPage onNavigate={handleNavigate} />;
      case 'process':
        return <ProcessPage onNavigate={handleNavigate} />;
      case 'contact':
        return <ContactPage />;
      case 'about':
        return <AboutPage onNavigate={handleNavigate} />;
      case 'privacy':
        return <PrivacyPage />;

      case 'booking':
        return <BookingPage initialData={bookingData} />;
      case 'blog':
        return <BlogPage onNavigate={handleNavigate} />;
      case 'woodstock':
      case 'acworth':
      case 'kennesaw':
      case 'marietta':
        return <LocalServicePage city={currentPage} onNavigate={handleNavigate} />;
      default:
        return (
          <>
            <Hero onNavigate={handleNavigate} />
            <TrustBar />
            <Services onNavigate={handleNavigate} />

            {/* Mid-Page CTA */}
            <section className="py-20 bg-gradient-to-r from-emerald-900/10 to-blue-900/10 border-y border-white/5">
              <div className="container mx-auto px-6 text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready for a Cleaner, Healthier Space?</h2>
                <p className="text-slate-400 mb-8 max-w-xl mx-auto">Join hundreds of satisfied Woodstock residents who have reclaimed their time and peace of mind.</p>
                <button onClick={() => handleNavigate('booking')} className="px-10 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg transition-all shadow-lg hover:shadow-emerald-500/30">
                  Get Your Free Estimate
                </button>
              </div>
            </section>

            <Process />
            <Testimonials />

            <FAQ />

            {/* Bottom Final CTA / Lead Form Hook */}
            <section className="py-24 bg-[#0B1121] border-t border-white/5 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full bg-emerald-500/5 blur-3xl pointer-events-none"></div>
              <div className="container mx-auto px-6 max-w-5xl relative z-10">
                <div className="grid md:grid-cols-2 gap-16 items-center">
                  <div>
                    <h2 className="text-4xl font-bold text-white mb-6 leading-tight">Fast, Reliable & <span className="text-emerald-400">Guaranteed.</span></h2>
                    <p className="text-slate-400 mb-8 text-lg">
                      Whether it's a deep home clean or daily office maintenance, we bring the same level of precision and care to every job.
                    </p>
                    <ul className="space-y-4 mb-8">
                      <li className="flex items-center gap-3 text-slate-300">
                        <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">✓</div>
                        Licensed, Bonded & Insured
                      </li>
                      <li className="flex items-center gap-3 text-slate-300">
                        <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">✓</div>
                        100% Satisfaction Guarantee
                      </li>
                      <li className="flex items-center gap-3 text-slate-300">
                        <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">✓</div>
                        Eco-Friendly & Pet-Safe Products
                      </li>
                    </ul>
                  </div>
                  <div className="bg-[#020617] p-8 rounded-3xl border border-white/10 shadow-2xl">
                    <h3 className="text-2xl font-bold text-white mb-6">Request a Quick Call</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Name</label>
                        <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-emerald-500 outline-none transition-colors" placeholder="John Doe" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Phone</label>
                        <input type="tel" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-emerald-500 outline-none transition-colors" placeholder="(123) 456-7890" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Service</label>
                        <select className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-emerald-500 outline-none transition-colors appearance-none">
                          <option className="bg-[#020617]">Residential Cleaning</option>
                          <option className="bg-[#020617]">Commercial Cleaning</option>
                          <option className="bg-[#020617]">Move-In/Out</option>
                          <option className="bg-[#020617]">Airbnb Turnover</option>
                        </select>
                      </div>
                      <button onClick={() => handleNavigate('contact')} className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl transition-all shadow-lg active:scale-95 mt-4 group">
                        Send Request <ArrowRight className="inline-block ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                      </button>
                      <p className="text-center text-[10px] text-slate-500 mt-4 italic">By clicking "Send Request", you agree to be contacted via call/text. No spam, ever.</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#020617]">
      {/* Sticky Mobile Call Button */}
      <div className="md:hidden fixed bottom-6 right-6 z-[60]">
        <a
          href="tel:+1234567890"
          className="flex items-center justify-center w-14 h-14 bg-emerald-500 text-white rounded-full shadow-[0_0_20px_rgba(16,185,129,0.5)] animate-bounce"
        >
          <Phone className="w-6 h-6" />
        </a>
      </div>
      {/* Navigation - White Strip */}
      <nav className="bg-white/95 backdrop-blur-xl border-b border-gray-200 sticky top-0 z-50 py-4 shadow-sm transition-all duration-300">
        <div className="container mx-auto px-6 flex justify-between items-center">
          {/* Enhanced Logo Visibility */}
          <div className="flex items-center cursor-pointer" onClick={() => handleNavigate('home')}>
            <img
              src="/logo.png"
              alt="CleanShine Pro"
              className="h-20 md:h-24 w-auto object-contain hover:brightness-110 transition-all duration-300"
            />
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-600">
              <button onClick={() => handleNavigate('home')} className={`hover:text-emerald-600 transition-colors ${currentPage === 'home' ? 'text-emerald-600 font-bold' : ''}`}>Home</button>
              <button onClick={() => handleNavigate('about')} className={`hover:text-emerald-600 transition-colors ${currentPage === 'about' ? 'text-emerald-600 font-bold' : ''}`}>About</button>
              <button onClick={() => handleNavigate('services')} className={`hover:text-emerald-600 transition-colors ${currentPage === 'services' ? 'text-emerald-600 font-bold' : ''}`}>Services</button>
              <button onClick={() => handleNavigate('process')} className={`hover:text-emerald-600 transition-colors ${currentPage === 'process' ? 'text-emerald-600 font-bold' : ''}`}>Process</button>
              <button onClick={() => handleNavigate('contact')} className={`hover:text-emerald-600 transition-colors ${currentPage === 'contact' ? 'text-emerald-600 font-bold' : ''}`}>Contact</button>
            </div>
            <button onClick={() => handleNavigate('booking')} className="hidden md:block px-6 py-2.5 bg-[#0A2E5C] hover:bg-[#020617] text-white text-sm font-semibold rounded-full transition-all shadow-md hover:shadow-lg">
              Get Quote
            </button>
          </div>
        </div>
      </nav>

      <main className="flex-grow">
        {renderPage()}
      </main>

      <CommercialAssistant />
      <Footer onNavigate={handleNavigate} />
      <Analytics />
    </div>
  );
}

export default App;
