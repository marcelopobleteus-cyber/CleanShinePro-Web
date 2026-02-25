import React from 'react';
import { ArrowRight, Star, Calendar, ShieldCheck, Phone } from 'lucide-react';

const Hero = ({ onNavigate }) => {
  return (
    <section className="relative bg-[#020617] text-white overflow-hidden min-h-[85vh] flex items-center pt-10 pb-16">

      {/* Background Atmosphere */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] bg-blue-900/20 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-emerald-900/10 rounded-full blur-[120px]"></div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_100%)]"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-12 items-center">

        {/* Left: Content */}
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-yellow-500/30 bg-yellow-500/10 backdrop-blur-sm mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-yellow-500"></span>
            </span>
            <span className="text-yellow-400 text-xs font-bold tracking-widest uppercase">Get $30 OFF Your First Cleaning Service!</span>
          </div>

          <h1 className="text-5xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-6 font-heading">
            <span className="text-white">Expert Home & Office</span> <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
              Cleaning in Woodstock.
            </span>
          </h1>
          <p className="text-2xl text-white font-medium mb-4">Serving Woodstock, Cherokee & Cobb County</p>

          <p className="text-lg text-slate-300 mb-8 leading-relaxed font-light max-w-lg">
            Experience a deeper clean with our <span className="text-white font-semibold">Licensed & Insured</span> pros. We use eco-friendly products and provide a <span className="text-white font-semibold">100% Satisfaction Guarantee</span> to give you a stress-free, spotless sanctuary.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <button onClick={() => onNavigate('booking')} className="group relative px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg overflow-hidden transition-all shadow-lg hover:shadow-emerald-500/20">
              <span className="relative flex items-center gap-2">
                Get a Free Quote <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </span>
            </button>
            <button onClick={() => window.location.href = 'tel:+1234567890'} className="px-8 py-4 bg-transparent border border-white/20 hover:bg-white/10 text-white font-bold rounded-lg transition-all flex items-center justify-center gap-2">
              <Phone className="w-5 h-5" /> Call Now
            </button>
          </div>
        </div>

        {/* Right: Dual Image Composition (Home + Office) */}
        <div className="relative h-[500px] w-full hidden lg:block">

          {/* Main Card: Office (Bottom Layer) */}
          <div className="absolute top-8 right-0 w-[80%] h-[400px] rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-[#0B1121]">
            <img
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
              alt="Commercial Office Cleaning"
              className="w-full h-full object-cover opacity-60 hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded text-xs font-mono text-emerald-400 border border-emerald-500/30">
              COMMERCIAL STANDARDS
            </div>
          </div>

          {/* Secondary Card: Residential (Overlapping) */}
          <div className="absolute bottom-12 left-0 w-[60%] h-[300px] rounded-2xl overflow-hidden border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] bg-[#0B1121] transform hover:-translate-y-2 transition-transform duration-500">
            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
              alt="Modern Living Room Cleaning"
              className="w-full h-full object-cover opacity-80"
            />
            {/* Residential "App UI" overlay */}
            <div className="absolute bottom-0 w-full bg-[#020617]/90 backdrop-blur-xl border-t border-emerald-500/30 p-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                </div>
                <div>
                  <div className="text-xs text-slate-400 uppercase tracking-wider">Service Verified</div>
                  <div className="text-white text-sm font-bold">Deep Clean Complete</div>
                </div>
              </div>
              <div className="flex justify-between items-center text-xs text-slate-500 border-t border-white/5 pt-2 mt-2">
                <div className="flex items-center gap-1"><Calendar className="w-3 h-3" /> Next: Tue, 9:00 AM</div>
                <div className="flex items-center gap-1 text-yellow-500"><Star className="w-3 h-3 fill-current" /> 5.0</div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Hero;
