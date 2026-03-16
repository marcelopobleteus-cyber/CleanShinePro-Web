import React, { useState } from 'react';
import { Building2, Home, Cross, Wind, ShieldCheck, SprayCan, CheckCircle2, Star, Clock, Key, X, ArrowRight } from 'lucide-react';

const ServicesPage = ({ onNavigate }) => {
    const [activeChecklist, setActiveChecklist] = useState(null);

    const checklists = {
        commercial: [
            "Lobby & Reception Detailing",
            "Restroom Sanitation (Hospital Grade)",
            "Workstation Disinfection",
            "Trash & Recycling Management",
            "Eco-Friendly Floor Care",
            "Internal Glass & Window Cleaning",
            "Breakroom & Kitchen Maintenance",
            "High-Touch Point Sterilization",
            "Pathogen-free certification available"
        ],
        standard: [
            "Dusting all accessible surfaces (furniture, shelves, decor)",
            "Vacuuming and mopping all floors",
            "Detailed bathroom cleaning (toilet, shower, sinks, mirrors)",
            "Wiping kitchen counters & appliance exteriors",
            "Emptying all trash bins & replacing liners",
            "Making beds (linens must be left out)",
            "Cleaning mirrors & glass surfaces",
            "General tidying of common areas",
            "Stovetop and microwave exterior cleaning"
        ],
        deep: [
            "Everything in Standard Cleaning +",
            "Baseboard detailing & hand-wiping",
            "Inside oven cleaning (deep degreasing)",
            "Inside microwave cleaning",
            "Interior window tracks & sills",
            "Door frames, handles & light switch cleaning",
            "Detailed cabinet exterior cleaning",
            "Grout scrubbing in showers & tubs",
            "Dusting behind & under light furniture",
            "Heavy grease removal in kitchen"
        ],
        airbnb: [
            "Full turnover clean between guests",
            "Laundry service (wash/dry/fold) & professional bed making",
            "Restocking essentials (Toilet paper, paper towels, soap, coffee)",
            "Damage & maintenance reporting with photo evidence",
            "Sanitizing high-touch guest areas (remotes, door knobs)",
            "Interior fridge cleaning for fresh guest arrival",
            "Trash removal and bin sanitation",
            "Staging welcome kits and local guides",
            "Syncing with Host Calendar for automatic cleaning schedules"
        ]
    };

    return (
        <div className="bg-[#020617] text-white min-h-screen pt-24 pb-12">
            {/* Checklist Modal */}
            {activeChecklist && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 backdrop-blur-md bg-black/60 transition-opacity duration-300">
                    <div className="bg-[#0B1121] border border-emerald-500/30 w-full max-w-lg rounded-3xl p-8 relative shadow-2xl animate-zoom-in">
                        <button
                            onClick={() => setActiveChecklist(null)}
                            className="absolute top-6 right-6 p-2 hover:bg-white/10 rounded-full transition-colors text-slate-400 hover:text-white"
                        >
                            <X className="w-6 h-6" />
                        </button>
                        <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                            <CheckCircle2 className="text-emerald-400" />
                            {activeChecklist === 'airbnb' ? 'Airbnb Turnover' : activeChecklist.charAt(0).toUpperCase() + activeChecklist.slice(1)} Checklist
                        </h3>
                        <ul className="space-y-4 max-h-[60vh] overflow-y-auto pr-4 custom-scrollbar">
                            {checklists[activeChecklist].map((item, i) => (
                                <li key={i} className="flex items-start gap-4 text-slate-300">
                                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 shrink-0"></div>
                                    <span className="text-sm leading-relaxed">{item}</span>
                                </li>
                            ))}
                        </ul>
                        <button
                            onClick={() => {
                                setActiveChecklist(null);
                                onNavigate('booking', {
                                    serviceType: activeChecklist,
                                    subService: {
                                        title: activeChecklist === 'airbnb' ? 'Airbnb Turnover' : activeChecklist.charAt(0).toUpperCase() + activeChecklist.slice(1),
                                        desc: checklists[activeChecklist][0],
                                        features: checklists[activeChecklist].slice(1, 4)
                                    }
                                });
                            }}
                            className="w-full mt-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl transition-all shadow-lg active:scale-95 shadow-emerald-900/20"
                        >
                            Get Quote for This Service
                        </button>
                    </div>
                </div>
            )}

            {/* Header */}
            <header className="container mx-auto px-6 text-center mb-20 relative">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-emerald-500/10 rounded-full blur-[100px] z-0 pointer-events-none"></div>
                <h1 className="relative z-10 text-5xl md:text-6xl font-bold mb-6 font-heading">
                    Specialized <span className="text-emerald-400">Hygiene Solutions</span>
                </h1>
                <p className="relative z-10 text-slate-400 max-w-2xl mx-auto text-lg font-light leading-relaxed">
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
                                className="w-full h-80 object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
                            />
                            <div className="p-8">
                                <div className="flex items-center gap-3 mb-4">
                                    <Building2 className="text-emerald-400 w-6 h-6" />
                                    <h3 className="text-2xl font-bold font-heading">Commercial & Corporate</h3>
                                </div>
                                <p className="text-slate-400 mb-6 leading-relaxed">
                                    <span className="text-white font-bold block mb-1 text-sm uppercase tracking-wider">Outcome:</span> A pathogen-free, professional environment that boosts employee morale and brand prestige.
                                </p>
                                <div className="grid grid-cols-2 gap-4 text-[10px] mb-8 uppercase tracking-widest font-bold">
                                    <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                                        <span className="text-emerald-400 block mb-1 opacity-70">Ideal Client:</span>
                                        Offices, Clinics
                                    </div>
                                    <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                                        <span className="text-emerald-400 block mb-1 opacity-70">Frequency:</span>
                                        Daily / Weekly
                                    </div>
                                </div>
                                <div className="flex flex-col gap-4">
                                    <ul className="space-y-4">
                                        {['Lobby & Reception Detailing', 'Restroom Sanitation (Hospital Grade)', 'Workstation Disinfection'].map((item, i) => (
                                            <li key={i} className="flex items-center gap-3 text-sm text-slate-300">
                                                <div className="w-5 h-5 rounded-full bg-emerald-500/10 flex items-center justify-center">
                                                    <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                                                </div>
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                    <button
                                        onClick={() => setActiveChecklist('commercial')}
                                        className="mt-4 px-6 py-3 border border-emerald-500/20 hover:border-emerald-500/50 bg-emerald-500/5 rounded-xl text-xs font-bold text-emerald-400 transition-all flex items-center justify-center gap-2 group"
                                    >
                                        View Full Checklist <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="lg:pl-12">
                        <h2 className="text-3xl font-bold mb-6 italic text-emerald-400 leading-tight">Design Your Workplace for Success</h2>
                        <div className="space-y-10">
                            <div className="flex gap-6">
                                <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center shrink-0 border border-white/5 shadow-inner">
                                    <ShieldCheck className="w-7 h-7 text-emerald-400" />
                                </div>
                                <div>
                                    <h4 className="text-xl font-bold mb-2">Liability Protection</h4>
                                    <p className="text-slate-400 text-sm leading-relaxed">Every crew member is background checked, insured, and bonded. We carry $5M in liability coverage for your peace of mind.</p>
                                </div>
                            </div>
                            <div className="flex gap-6">
                                <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center shrink-0 border border-white/5 shadow-inner">
                                    <Cross className="w-7 h-7 text-emerald-400" />
                                </div>
                                <div>
                                    <h4 className="text-xl font-bold mb-2">Medical Grade Protocols</h4>
                                    <p className="text-slate-400 text-sm leading-relaxed">We use EPA-registered disinfectants tailored for healthcare facilities, applying the same rigor to corporate offices.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Section 2: Residential */}
                <section className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="order-2 md:order-1 lg:pr-12">
                        <h2 className="text-3xl font-bold mb-6 italic text-emerald-400 leading-tight">Reclaim Your Home Sanctuary</h2>
                        <div className="space-y-10">
                            <div className="flex gap-6">
                                <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center shrink-0 border border-white/5 shadow-inner">
                                    <SprayCan className="w-7 h-7 text-emerald-400" />
                                </div>
                                <div>
                                    <h4 className="text-xl font-bold mb-2">Standard & Deep Clean</h4>
                                    <p className="text-slate-400 text-sm leading-relaxed mb-6">From routine maintenance to intensive seasonal deep dives. We handle the dust, grime, and details so you can reclaim your weekends.</p>
                                    <div className="flex flex-wrap gap-3">
                                        <button
                                            onClick={() => setActiveChecklist('standard')}
                                            className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-[10px] font-bold text-slate-300 uppercase tracking-widest transition-all"
                                        >
                                            Standard Cleaning List
                                        </button>
                                        <button
                                            onClick={() => setActiveChecklist('deep')}
                                            className="px-4 py-2 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 rounded-lg text-[10px] font-bold text-emerald-400 uppercase tracking-widest transition-all"
                                        >
                                            Deep Cleaning List
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-6">
                                <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center shrink-0 border border-white/5 shadow-inner">
                                    <Wind className="w-7 h-7 text-emerald-400" />
                                </div>
                                <div>
                                    <h4 className="text-xl font-bold mb-2">Move-In / Move-Out</h4>
                                    <p className="text-slate-400 text-sm leading-relaxed">Guarantee your security deposit return or prepare your new home for a fresh start with our exhaustive turnover checklist.</p>
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
                                className="w-full h-80 object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
                            />
                            <div className="p-8">
                                <div className="flex items-center gap-3 mb-4">
                                    <Home className="text-emerald-400 w-6 h-6" />
                                    <h3 className="text-2xl font-bold font-heading">Residential Cleaning</h3>
                                </div>
                                <p className="text-slate-400 mb-6 leading-relaxed text-sm">
                                    <span className="text-white font-bold block mb-1 uppercase tracking-wider text-xs">Outcome:</span> A healthy, stress-free home where you can truly relax without thinking about chores.
                                </p>
                                <div className="grid grid-cols-2 gap-4 text-[10px] mb-8 uppercase tracking-widest font-bold">
                                    <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                                        <span className="text-emerald-400 block mb-1 opacity-70">Ideal Client:</span>
                                        Busy Families
                                    </div>
                                    <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                                        <span className="text-emerald-400 block mb-1 opacity-70">Frequency:</span>
                                        Bi-Weekly
                                    </div>
                                </div>
                                <ul className="space-y-4">
                                    {['Kitchen Degreasing & Polishing', 'Bathroom Descaling & Sanitation', 'Floor Care (Wood, Tile, Carpet)'].map((item, i) => (
                                        <li key={i} className="flex items-center gap-3 text-sm text-slate-300">
                                            <div className="w-5 h-5 rounded-full bg-emerald-500/10 flex items-center justify-center">
                                                <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                                            </div>
                                            {item}
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
                                className="w-full h-80 object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
                            />
                            <div className="p-8">
                                <div className="flex items-center gap-3 mb-4">
                                    <Star className="text-emerald-400 w-6 h-6" />
                                    <h3 className="text-2xl font-bold font-heading">Short-Term Rentals (Airbnb)</h3>
                                </div>
                                <p className="text-slate-400 mb-6 leading-relaxed text-sm">
                                    <span className="text-white font-bold block mb-1 uppercase tracking-wider text-xs">Outcome:</span> Consistent 5-star cleanliness ratings and a turnkey hosting experience.
                                </p>
                                <div className="grid grid-cols-2 gap-4 text-[10px] mb-8 uppercase tracking-widest font-bold">
                                    <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                                        <span className="text-emerald-400 block mb-1 opacity-70">Ideal Client:</span>
                                        Superhosts
                                    </div>
                                    <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                                        <span className="text-emerald-400 block mb-1 opacity-70">Frequency:</span>
                                        Per Turnover
                                    </div>
                                </div>
                                <div className="flex flex-col gap-4">
                                    <ul className="space-y-4">
                                        {['Same-Day Turnover (11AM-3PM)', 'Hotel-Quality Linen Staging', 'Essential Restocking'].map((item, i) => (
                                            <li key={i} className="flex items-center gap-3 text-sm text-slate-300">
                                                <div className="w-5 h-5 rounded-full bg-emerald-500/10 flex items-center justify-center">
                                                    <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                                                </div>
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                    <button
                                        onClick={() => setActiveChecklist('airbnb')}
                                        className="mt-4 px-6 py-3 border border-purple-500/20 hover:border-purple-500/50 bg-purple-500/5 rounded-xl text-xs font-bold text-purple-400 transition-all flex items-center justify-center gap-2 group"
                                    >
                                        View Turnover Checklist <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="lg:pl-12">
                        <h2 className="text-3xl font-bold mb-6 italic text-emerald-400 leading-tight">The Superhost Standard</h2>
                        <div className="space-y-10">
                            <div className="flex gap-6">
                                <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center shrink-0 border border-white/5 shadow-inner">
                                    <Clock className="w-7 h-7 text-emerald-400" />
                                </div>
                                <div>
                                    <h4 className="text-xl font-bold mb-2">Precision Timing</h4>
                                    <p className="text-slate-400 text-sm leading-relaxed">We sync with your booking calendar. Our crews are dispatched automatically when a guest checks out, ensuring zero downtime.</p>
                                </div>
                            </div>
                            <div className="flex gap-6">
                                <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center shrink-0 border border-white/5 shadow-inner">
                                    <Key className="w-7 h-7 text-emerald-400" />
                                </div>
                                <div>
                                    <h4 className="text-xl font-bold mb-2">Hotel-Quality Staging</h4>
                                    <p className="text-slate-400 text-sm leading-relaxed">We don't just clean; we stage. Towels folded perfectly, welcome kits arranged, and every surface photo-ready for your next review.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Call to Action */}
                <section className="bg-gradient-to-r from-emerald-900/20 to-blue-900/20 rounded-3xl p-16 text-center border border-white/5 mb-12 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 blur-3xl rounded-full -mr-32 -mt-32 group-hover:bg-emerald-500/10 transition-colors"></div>
                    <h2 className="text-4xl font-bold mb-6 relative z-10 font-heading">Ready to elevate your space?</h2>
                    <p className="text-slate-400 mb-10 max-w-xl mx-auto text-lg font-light relative z-10">Get a custom quote in minutes. No credit card required, just simple transparent pricing tailored to your specific needs.</p>
                    <button onClick={() => onNavigate('booking')} className="px-12 py-5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-2xl transition-all shadow-xl hover:shadow-emerald-500/30 active:scale-95 relative z-10">
                        Get Free Estimate Now
                    </button>
                </section>

            </div>
        </div>
    );
};

export default ServicesPage;
