import React from 'react';
import { Shield, Check, Clock, MapPin, Star, Building2, Home, Sparkles } from 'lucide-react';

const LocalServicePage = ({ city, onNavigate }) => {
    const cityName = city.charAt(0).toUpperCase() + city.slice(1);

    return (
        <div className="min-h-screen bg-[#020617] text-white pt-32 pb-20">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                {/* Hero Section */}
                <div className="grid lg:grid-cols-2 gap-16 items-center mb-32">
                    <div className="space-y-8">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-400 text-xs font-bold uppercase tracking-widest">
                            <MapPin className="w-4 h-4" /> Locally Owned & Operated in {cityName}, GA
                        </div>
                        <h1 className="text-6xl md:text-7xl font-black tracking-tighter italic leading-[0.9]">
                            TOP-RATED HOUSE <br />
                            <span className="text-emerald-500">CLEANING {cityName.toUpperCase()}</span>
                        </h1>
                        <p className="text-xl text-slate-400 leading-relaxed max-w-xl font-medium">
                            Premium residential and commercial cleaning services tailored for homeowners in {cityName}. Experience the CleanShine Pro difference with our cost-based pricing and 48-hour satisfaction guarantee.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <button onClick={() => onNavigate('booking')} className="px-8 py-4 bg-emerald-500 text-[#020617] font-black rounded-2xl flex items-center gap-3 hover:bg-emerald-400 transition-all shadow-[0_10px_30px_rgba(16,185,129,0.3)] uppercase tracking-widest text-sm">
                                Get Instant Quote in {cityName} <Sparkles className="w-5 h-5" />
                            </button>
                            <button onClick={() => onNavigate('services')} className="px-8 py-4 bg-white/5 border border-white/10 text-white font-bold rounded-2xl hover:bg-white/10 transition-all uppercase tracking-widest text-sm">
                                View Packages
                            </button>
                        </div>
                    </div>

                    <div className="relative group">
                        <div className="absolute -inset-4 bg-emerald-500/20 rounded-[3rem] blur-2xl group-hover:bg-emerald-500/30 transition-all duration-1000"></div>
                        <div className="relative bg-[#0B1121] border border-white/10 rounded-[3rem] p-8 space-y-6 shadow-2xl overflow-hidden">
                            <div className="flex justify-between items-center pb-6 border-b border-white/10">
                                <div>
                                    <div className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mb-1">Service Spotlight</div>
                                    <h3 className="text-xl font-black italic uppercase">Post-Construction Cleaning</h3>
                                </div>
                                <div className="p-3 bg-emerald-500/20 rounded-2xl text-emerald-400"><Building2 className="w-6 h-6" /></div>
                            </div>
                            <p className="text-sm text-slate-400 leading-relaxed italic">
                                "As {cityName} continues to grow with new developments, we've specialized in post-construction detailing. We remove the heavy dust and industrial residue that regular cleaners miss, making your new home move-in ready."
                            </p>
                            <div className="py-6 space-y-4">
                                <div className="flex items-center gap-4 group/item">
                                    <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-emerald-400 group-hover/item:bg-emerald-500 group-hover/item:text-[#020617] transition-all"><Check className="w-5 h-5" /></div>
                                    <span className="font-bold text-slate-300">HEPA-Filtered Industrial Vacuums</span>
                                </div>
                                <div className="flex items-center gap-4 group/item">
                                    <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-emerald-400 group-hover/item:bg-emerald-500 group-hover/item:text-[#020617] transition-all"><Check className="w-5 h-5" /></div>
                                    <span className="font-bold text-slate-300">White-Glove Surface Detailing</span>
                                </div>
                                <div className="flex items-center gap-4 group/item">
                                    <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-emerald-400 group-hover/item:bg-emerald-500 group-hover/item:text-[#020617] transition-all"><Check className="w-5 h-5" /></div>
                                    <span className="font-bold text-slate-300">Construction Window Cleaning</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Local Trust Grid */}
                <div className="grid md:grid-cols-3 gap-8 pb-32">
                    <div className="p-10 bg-white/5 border border-white/10 rounded-[2.5rem] space-y-4">
                        <div className="flex items-center gap-2 text-yellow-500 mb-2">
                            {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-4 h-4 fill-current" />)}
                        </div>
                        <h4 className="text-lg font-black uppercase tracking-widest italic">{cityName} Native Favorite</h4>
                        <p className="text-xs text-slate-500 leading-relaxed uppercase font-bold tracking-tight">"The best cleaning experience in Cherokee County. Their attention to detail in the kitchen and bathrooms is unmatched."</p>
                    </div>
                    <div className="p-10 bg-emerald-500/10 border border-emerald-500/20 rounded-[2.5rem] space-y-4">
                        <h4 className="text-5xl font-black text-emerald-400 tracking-tighter">100%</h4>
                        <p className="text-sm font-black text-white uppercase tracking-widest">Satisfaction Shield</p>
                        <p className="text-xs text-slate-400 font-medium">If you're not wowed within 48 hours, we'll re-clean any area for free. Total peace of mind for {cityName} residents.</p>
                    </div>
                    <div className="p-10 bg-white/5 border border-white/10 rounded-[2.5rem] space-y-4">
                        <h4 className="text-lg font-black uppercase tracking-widest italic leading-tight">Licensed & Insured</h4>
                        <p className="text-xs text-slate-500 leading-relaxed uppercase font-bold tracking-tight">Full general liability and workers' comp coverage to protect your {cityName} property and our professional staff.</p>
                    </div>
                </div>

                {/* Call To Action */}
                <div className="bg-gradient-to-br from-indigo-900 to-[#020617] rounded-[3.5rem] p-16 text-center border border-white/10 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/20 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2"></div>
                    <div className="relative z-10 space-y-8">
                        <h2 className="text-5xl md:text-6xl font-black tracking-tighter italic">READY TO TRANSFORM <br />YOUR {cityName.toUpperCase()} HOME?</h2>
                        <p className="text-xl text-slate-400 font-medium">Join 500+ happy clients in Georgia. Get your instant estimate in 2 minutes.</p>
                        <button onClick={() => onNavigate('booking')} className="px-12 py-6 bg-white text-[#020617] font-black rounded-[2rem] hover:bg-emerald-400 transition-all uppercase tracking-[0.2em] text-sm shadow-2xl">
                            Claim 30% OFF First Service
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LocalServicePage;
