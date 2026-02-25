import React, { useState } from 'react';
import { Building2, Home, Check, CalendarClock } from 'lucide-react';

const Services = ({ onNavigate }) => {
    const [activeTab, setActiveTab] = useState('commercial');

    const services = {
        commercial: [
            { title: "Office Buildings", desc: "Daily maintenance and sanitation protocols for high-traffic zones.", features: ["Lobby & Reception", "Restrooms", "Breakrooms"] },
            { title: "Office Medical Facilities", desc: "Terminal cleaning standards with hospital-grade disinfectants.", features: ["Waiting Areas", "Exam Rooms", "Sterilization"] },
            { title: "Retail & Showrooms", desc: "Floor polishing and dust-free environments for luxury displays.", features: ["Floor Buffing", "Glass Cleaning", "Fitting Rooms"] },
            { title: "Post-Construction", desc: "Heavy debris removal and fine dust detailing for occupancy.", features: ["Debris Removal", "Fine Dusting", "Sticker Removal"] },
        ],
        residential: [
            { title: "Recurring Service", desc: "Weekly, bi-weekly, or monthly maintenance for busy professionals.", features: ["Kitchen & Bath", "Dusting", "Floors"] },
            { title: "Deep Cleaning", desc: "Intensive detail work reaching behind and under appliance areas.", features: ["Baseboards", "Inside Cabinets", "Light Fixtures"] },
            { title: "Move-In / Out", desc: "Complete turnover cleaning ensuring deposit returns.", features: ["Appliances", "Vents", "Interior Windows"] },
            { title: "Luxury Estate", desc: "White-glove service for high-value properties and materials.", features: ["Marble Care", "Art Dusting", "Silver Polishing"] },
        ],
        airbnb: [
            { title: "Express Turnover", desc: "Rapid 4-hour window cleaning to prepare for same-day check-ins.", features: ["11 AM - 3 PM Window", "Bed Making", "Towel Staging"] },
            { title: "Inventory checks", desc: "We monitor your supplies and report low stock immediately.", features: ["Toiletries Count", "Damage Reporting", "Restocking"] },
            { title: "Deep Clean & Reset", desc: "Periodic deep cleans to maintain superhost status ratings.", features: ["Upholstery", "Carpet Spotting", "Grout Cleaning"] },
            { title: "Guest Experience", desc: "Small touches that get you 5-star reviews.", features: ["Welcome Gifts placement", "Thermostat Reset", "Key Management"] },
        ]
    };

    return (
        <section className="py-24 bg-[#020617] relative">
            <div className="container mx-auto px-6">

                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">
                        Premium <span className="text-emerald-400">Cleaning Services</span> in Woodstock
                    </h2>
                    <p className="text-slate-400 max-w-2xl mx-auto font-light text-lg">
                        Expert solutions designed to give you more time, better health, and a pristine environment you'll love coming home to.
                    </p>
                </div>

                {/* Modern Segmented Control */}
                <div className="flex justify-center mb-16 px-6">
                    <div className="bg-white/5 p-2 rounded-2xl border border-white/10 flex flex-col md:flex-row relative max-w-3xl w-full gap-2 backdrop-blur-sm">

                        {/* Commercial Button */}
                        <button
                            onClick={() => setActiveTab('commercial')}
                            className={`flex-1 flex items-center justify-center gap-3 py-4 px-6 rounded-xl text-sm font-bold tracking-wide transition-all duration-300 ease-out 
                            ${activeTab === 'commercial'
                                    ? 'bg-gradient-to-r from-emerald-500 to-emerald-700 text-white shadow-[0_0_20px_rgba(16,185,129,0.4)] ring-1 ring-white/20 scale-[1.02]'
                                    : 'text-slate-400 hover:text-white hover:bg-white/5 hover:scale-105'}`}
                        >
                            <Building2 className={`w-5 h-5 transition-transform duration-300 ${activeTab === 'commercial' ? 'scale-110' : ''}`} />
                            Commercial
                        </button>

                        {/* Residential Button */}
                        <button
                            onClick={() => setActiveTab('residential')}
                            className={`flex-1 flex items-center justify-center gap-3 py-4 px-6 rounded-xl text-sm font-bold tracking-wide transition-all duration-300 ease-out 
                            ${activeTab === 'residential'
                                    ? 'bg-gradient-to-r from-emerald-500 to-emerald-700 text-white shadow-[0_0_20px_rgba(16,185,129,0.4)] ring-1 ring-white/20 scale-[1.02]'
                                    : 'text-slate-400 hover:text-white hover:bg-white/5 hover:scale-105'}`}
                        >
                            <Home className={`w-5 h-5 transition-transform duration-300 ${activeTab === 'residential' ? 'scale-110' : ''}`} />
                            Residential
                        </button>

                        {/* Airbnb Button */}
                        <button
                            onClick={() => setActiveTab('airbnb')}
                            className={`flex-1 flex items-center justify-center gap-3 py-4 px-6 rounded-xl text-sm font-bold tracking-wide transition-all duration-300 ease-out 
                            ${activeTab === 'airbnb'
                                    ? 'bg-gradient-to-r from-emerald-500 to-emerald-700 text-white shadow-[0_0_20px_rgba(16,185,129,0.4)] ring-1 ring-white/20 scale-[1.02]'
                                    : 'text-slate-400 hover:text-white hover:bg-white/5 hover:scale-105'}`}
                        >
                            <CalendarClock className={`w-5 h-5 transition-transform duration-300 ${activeTab === 'airbnb' ? 'scale-110' : ''}`} />
                            Short-Term Rental
                        </button>
                    </div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {services[activeTab].map((service, index) => (
                        <div key={index} className="group p-8 rounded-2xl bg-[#0B1121] border border-white/5 hover:border-emerald-500/30 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_10px_40px_-10px_rgba(16,185,129,0.1)] relative overflow-hidden flex flex-col">
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                {activeTab === 'commercial' ? <Building2 className="w-24 h-24 text-emerald-500" /> :
                                    activeTab === 'residential' ? <Home className="w-24 h-24 text-emerald-500" /> :
                                        <CalendarClock className="w-24 h-24 text-emerald-500" />
                                }
                            </div>

                            <h3 className="text-xl font-bold text-white mb-3 group-hover:text-emerald-400 transition-colors relative z-10">{service.title}</h3>
                            <p className="text-slate-400 text-sm mb-6 leading-relaxed relative z-10 flex-grow">
                                {service.desc} <span className="text-emerald-500/80 font-medium italic block mt-2">The result: A spotless, ready-to-use space.</span>
                            </p>

                            <ul className="space-y-2 relative z-10 mb-6">
                                {service.features.map((feature, i) => (
                                    <li key={i} className="flex items-center gap-2 text-xs font-mono text-emerald-200/70">
                                        <Check className="w-3 h-3 text-emerald-500" /> {feature}
                                    </li>
                                ))}
                            </ul>

                            <button
                                onClick={() => onNavigate('booking')}
                                className="w-full py-2.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500 text-emerald-400 hover:text-white border border-emerald-500/30 font-bold text-sm transition-all duration-300 relative z-10"
                            >
                                Get a Quote
                            </button>
                        </div>
                    ))}
                </div>

                {/* Secondary CTA for Flow */}
                <div className="mt-16 text-center">
                    <p className="text-slate-500 mb-6 font-medium">Not sure which service you need?</p>
                    <button onClick={() => onNavigate('contact')} className="px-10 py-4 bg-white/5 border border-white/10 hover:bg-white/10 text-white font-bold rounded-lg transition-all">
                        Compare All Services
                    </button>
                </div>

            </div>
        </section>
    );
};

export default Services;
