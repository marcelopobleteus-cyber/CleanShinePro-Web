import React from 'react';
import { Building2, Home, Cross, Wind, ShieldCheck, SprayCan, CheckCircle2, Star, Clock, Key } from 'lucide-react';

const ServicesPage = ({ onNavigate }) => {
    return (
        <div className="bg-[#020617] text-white min-h-screen pt-24 pb-12">

            {/* Header */}
            <header className="container mx-auto px-6 text-center mb-20 relative">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-emerald-500/10 rounded-full blur-[100px] z-0 pointer-events-none"></div>
                <h1 className="relative z-10 text-5xl md:text-6xl font-bold mb-6 font-heading">
                    Specialized <span className="text-emerald-400">Hygiene Solutions</span>
                </h1>
                <p className="relative z-10 text-slate-400 max-w-2xl mx-auto text-lg font-light">
                    From corporate headquarters to high-end residential estates, we deliver a standardized level of cleanliness that ensures health, safety, and brand prestige.
                </p>
            </header>

            <div className="container mx-auto px-6 space-y-32">

                {/* Section 1: Commercial */}
                <section className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-emerald-600 to-cyan-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                        <div className="relative bg-[#0B1121] border border-white/5 rounded-2xl overflow-hidden shadow-2xl">
                            <img
                                src="/assets/cleaning-crew.webp"
                                alt="Professional Commercial Cleaning Crew"
                                className="w-full h-80 object-cover opacity-80"
                            />
                            <div className="p-8">
                                <div className="flex items-center gap-3 mb-4">
                                    <Building2 className="text-emerald-400 w-6 h-6" />
                                    <h3 className="text-2xl font-bold font-heading">Commercial & Corporate</h3>
                                </div>
                                <p className="text-slate-400 mb-6 leading-relaxed">
                                    <span className="text-white font-bold block mb-1">Outcome:</span> A pathogen-free, professional environment that boosts employee morale and brand prestige.
                                </p>
                                <div className="grid grid-cols-2 gap-4 text-xs mb-6">
                                    <div className="p-2 bg-white/5 rounded border border-white/5">
                                        <span className="text-emerald-400 block font-bold mb-1">Ideal Client:</span>
                                        Corporate Offices, Clinics
                                    </div>
                                    <div className="p-2 bg-white/5 rounded border border-white/5">
                                        <span className="text-emerald-400 block font-bold mb-1">Frequency:</span>
                                        Daily / 3x Weekly
                                    </div>
                                </div>
                                <ul className="space-y-3">
                                    {['Lobby & Reception Detailing', 'Restroom Sanitation (Hospital Grade)', 'Workstation Disinfection', 'Trash & Recycling Management'].map((item, i) => (
                                        <li key={i} className="flex items-center gap-3 text-sm text-slate-300">
                                            <CheckCircle2 className="w-4 h-4 text-emerald-500" /> {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                    {/* ... (rest of commercial content) ... */}
                    <div>
                        <h2 className="text-3xl font-bold mb-6 italic text-emerald-400">Design Your Workplace for Success</h2>
                        <div className="space-y-8">
                            <div className="flex gap-4">
                                <div className="w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center shrink-0">
                                    <ShieldCheck className="w-6 h-6 text-emerald-400" />
                                </div>
                                <div>
                                    <h4 className="text-xl font-bold mb-2">Liability Protection</h4>
                                    <p className="text-slate-400 text-sm">Every crew member is background checked, insured, and bonded. We carry $5M in liability coverage for your peace of mind.</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center shrink-0">
                                    <Cross className="w-6 h-6 text-emerald-400" />
                                </div>
                                <div>
                                    <h4 className="text-xl font-bold mb-2">Medical Grade Protocols</h4>
                                    <p className="text-slate-400 text-sm">We use EPA-registered disinfectants tailored for healthcare facilities, applying the same rigor to corporate offices.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Section 2: Residential */}
                <section className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="order-2 md:order-1">
                        <h2 className="text-3xl font-bold mb-6 italic text-emerald-400">Reclaim Your Home Sanctuary</h2>
                        <div className="space-y-8">
                            <div className="flex gap-4">
                                <div className="w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center shrink-0">
                                    <SprayCan className="w-6 h-6 text-emerald-400" />
                                </div>
                                <div>
                                    <h4 className="text-xl font-bold mb-2">Deep Clean & Recurring</h4>
                                    <p className="text-slate-400 text-sm">From spring cleaning deep dives to weekly maintenance. We handle the dust, grime, and details so you can reclaim your weekends.</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center shrink-0">
                                    <Wind className="w-6 h-6 text-emerald-400" />
                                </div>
                                <div>
                                    <h4 className="text-xl font-bold mb-2">Move-In / Move-Out</h4>
                                    <p className="text-slate-400 text-sm">Guarantee your security deposit return or prepare your new home for a fresh start with our exhaustive turnover checklist.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="relative group order-1 md:order-2">
                        <div className="absolute -inset-1 bg-gradient-to-l from-emerald-600 to-cyan-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                        <div className="relative bg-[#0B1121] border border-white/5 rounded-2xl overflow-hidden shadow-2xl">
                            <img
                                src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                                alt="Modern Residential"
                                className="w-full h-80 object-cover opacity-80"
                            />
                            <div className="p-8">
                                <div className="flex items-center gap-3 mb-4">
                                    <Home className="text-emerald-400 w-6 h-6" />
                                    <h3 className="text-2xl font-bold font-heading">Residential Cleaning</h3>
                                </div>
                                <p className="text-slate-400 mb-6 leading-relaxed">
                                    <span className="text-white font-bold block mb-1">Outcome:</span> A healthy, stress-free home where you can truly relax without thinking about chores.
                                </p>
                                <div className="grid grid-cols-2 gap-4 text-xs mb-6">
                                    <div className="p-2 bg-white/5 rounded border border-white/5">
                                        <span className="text-emerald-400 block font-bold mb-1">Ideal Client:</span>
                                        Busy Families, Professionals
                                    </div>
                                    <div className="p-2 bg-white/5 rounded border border-white/5">
                                        <span className="text-emerald-400 block font-bold mb-1">Frequency:</span>
                                        Weekly / Bi-Weekly
                                    </div>
                                </div>
                                <ul className="space-y-3">
                                    {['Kitchen Degreasing & Polishing', 'Bathroom Descaling & Sanitation', 'Floor Care (Wood, Tile, Carpet)', 'Internal Window Cleaning'].map((item, i) => (
                                        <li key={i} className="flex items-center gap-3 text-sm text-slate-300">
                                            <CheckCircle2 className="w-4 h-4 text-emerald-500" /> {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Section 3: Airbnb */}
                <section className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-emerald-600 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                        <div className="relative bg-[#0B1121] border border-white/5 rounded-2xl overflow-hidden shadow-2xl">
                            <img
                                src="https://images.unsplash.com/photo-1556020685-ae41abfc9365?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                                alt="Airbnb Rental"
                                className="w-full h-80 object-cover opacity-80"
                            />
                            <div className="p-8">
                                <div className="flex items-center gap-3 mb-4">
                                    <Star className="text-emerald-400 w-6 h-6" />
                                    <h3 className="text-2xl font-bold font-heading">Short-Term Rentals (Airbnb)</h3>
                                </div>
                                <p className="text-slate-400 mb-6 leading-relaxed">
                                    <span className="text-white font-bold block mb-1">Outcome:</span> Consistent 5-star cleanliness ratings and a turnkey hosting experience.
                                </p>
                                <div className="grid grid-cols-2 gap-4 text-xs mb-6">
                                    <div className="p-2 bg-white/5 rounded border border-white/5">
                                        <span className="text-emerald-400 block font-bold mb-1">Ideal Client:</span>
                                        Superhosts, Property Mgrs
                                    </div>
                                    <div className="p-2 bg-white/5 rounded border border-white/5">
                                        <span className="text-emerald-400 block font-bold mb-1">Frequency:</span>
                                        Per Booking Turnover
                                    </div>
                                </div>
                                <ul className="space-y-3">
                                    {['Same-Day Turnover (Window 11AM-3PM)', 'Hotel-Quality Linen Staging', 'Essential Restocking (Soap, TP, Coffee)', 'Damage & Maintenance Reporting'].map((item, i) => (
                                        <li key={i} className="flex items-center gap-3 text-sm text-slate-300">
                                            <CheckCircle2 className="w-4 h-4 text-emerald-500" /> {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h2 className="text-3xl font-bold mb-6 italic text-emerald-400">The Superhost Standard</h2>
                        <div className="space-y-8">
                            <div className="flex gap-4">
                                <div className="w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center shrink-0">
                                    <Clock className="w-6 h-6 text-emerald-400" />
                                </div>
                                <div>
                                    <h4 className="text-xl font-bold mb-2">Precision Timing</h4>
                                    <p className="text-slate-400 text-sm">We sync with your booking calendar. Our crews are dispatched automatically when a guest checks out.</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center shrink-0">
                                    <Key className="w-6 h-6 text-emerald-400" />
                                </div>
                                <div>
                                    <h4 className="text-xl font-bold mb-2">Hotel-Quality Staging</h4>
                                    <p className="text-slate-400 text-sm">We don't just clean; we stage. Towels folded perfectly, welcome kits arranged, and every surface photo-ready.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Call to Action */}
                <section className="bg-gradient-to-r from-emerald-900/20 to-blue-900/20 rounded-3xl p-12 text-center border border-white/5 mb-12">
                    <h2 className="text-3xl font-bold mb-4">Ready to elevate your space?</h2>
                    <p className="text-slate-400 mb-8 max-w-xl mx-auto">Get a custom quote in minutes. No credit card required, just simple transparent pricing.</p>
                    <button onClick={() => onNavigate('contact')} className="px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg transition-all shadow-lg hover:shadow-emerald-500/30">
                        Get Free Estimate
                    </button>
                </section>

            </div>
        </div>
    );
};

export default ServicesPage;
