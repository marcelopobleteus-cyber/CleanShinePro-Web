import React from 'react';
import { Quote } from 'lucide-react';

const Testimonials = () => {
    return (
        <section className="py-24 bg-[#020617] border-t border-white/5">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

                    {/* Reviews */}
                    <div>
                        <h2 className="text-3xl font-bold text-white mb-10">Client <span className="text-emerald-400">Feedback</span></h2>
                        <div className="space-y-6">
                            <div className="bg-white/5 p-6 rounded-2xl border border-white/5 relative">
                                <Quote className="absolute top-6 right-6 text-white/10 w-10 h-10" />
                                <p className="text-slate-300 italic mb-4 leading-relaxed">"CleanShine's automated scheduling and consistent quality have transformed how we manage our 3 office locations. The reporting dashboard is a game changer."</p>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-blue-500"></div>
                                    <div>
                                        <div className="text-white font-bold text-sm">Sarah Jenkins</div>
                                        <div className="text-slate-500 text-xs">Ops Manager, TechFlow Inc.</div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white/5 p-6 rounded-2xl border border-white/5 relative">
                                <Quote className="absolute top-6 right-6 text-white/10 w-10 h-10" />
                                <p className="text-slate-300 italic mb-4 leading-relaxed">"Finally, a service that takes security as seriously as hygiene. The background checked crew is phenomenal."</p>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500"></div>
                                    <div>
                                        <div className="text-white font-bold text-sm">Dr. Mark Alverez</div>
                                        <div className="text-slate-500 text-xs">Alverez Dental Group</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Industries Grid */}
                    <div>
                        <h2 className="text-3xl font-bold text-white mb-10">Industries <span className="text-emerald-400">Served</span></h2>
                        <div className="grid grid-cols-2 gap-4">
                            {['Corporate Offices', 'Medical & Dental', 'Financial Institutions', 'High-Tech Manufacturing', 'Luxury HOA', 'Retail Showrooms'].map((item, i) => (
                                <div key={i} className="bg-[#0B1121] border border-white/5 p-4 rounded-xl flex items-center gap-3 text-slate-300 hover:border-emerald-500/50 hover:text-white transition-all">
                                    <div className="w-2 h-2 bg-emerald-500 rounded-full shadow-[0_0_8px_#10B981]"></div>
                                    <span className="text-sm font-medium">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Testimonials;
