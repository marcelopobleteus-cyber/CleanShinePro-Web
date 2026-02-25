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
                                <p className="text-slate-300 italic mb-4 leading-relaxed">"Sarah and her team are a lifesaver. As a busy parent in Woodstock, finding someone reliable was hard until I found CleanShine. My house has never looked this good!"</p>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center text-white font-bold text-xs">MA</div>
                                    <div>
                                        <div className="text-white font-bold text-sm">Michelle A.</div>
                                        <div className="text-slate-500 text-xs">Woodstock Resident</div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white/5 p-6 rounded-2xl border border-white/5 relative">
                                <Quote className="absolute top-6 right-6 text-white/10 w-10 h-10" />
                                <p className="text-slate-300 italic mb-4 leading-relaxed">"Best Airbnb turnover service in Cobb County. They never miss a detail, and my 'Cleanliness' rating has stayed at a perfect 5.0 since I switched to them."</p>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-white font-bold text-xs">DT</div>
                                    <div>
                                        <div className="text-white font-bold text-sm">David T.</div>
                                        <div className="text-slate-500 text-xs">Superhost, Kennesaw</div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white/5 p-6 rounded-2xl border border-white/5 relative">
                                <Quote className="absolute top-6 right-6 text-white/10 w-10 h-10" />
                                <p className="text-slate-300 italic mb-4 leading-relaxed">"Professional, on-time, and thorough. They handled our post-construction cleaning perfectly. Highly recommend for any business owner."</p>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center text-white font-bold text-xs">RL</div>
                                    <div>
                                        <div className="text-white font-bold text-sm">Robert L.</div>
                                        <div className="text-slate-500 text-xs">Local Business Owner</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Why Choose Us / Industries */}
                    <div>
                        <h2 className="text-3xl font-bold text-white mb-6">Why <span className="text-emerald-400">Choose Us?</span></h2>
                        <ul className="space-y-4 mb-12">
                            {[
                                { title: "Licensed & Insured", desc: "Full $5M liability coverage for your protection." },
                                { title: "Customized Checklists", desc: "Cleaning tailored to your specific needs." },
                                { title: "Eco-Friendly", desc: "Safe for kids, pets, and the environment." },
                                { title: "Vetted Professionals", desc: "Every team member is background checked." }
                            ].map((item, i) => (
                                <li key={i} className="flex gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:border-emerald-500/30 transition-all">
                                    <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0 mt-1">✓</div>
                                    <div>
                                        <h4 className="text-white font-bold text-sm">{item.title}</h4>
                                        <p className="text-slate-500 text-xs leading-relaxed">{item.desc}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>

                        <h2 className="text-3xl font-bold text-white mb-10">Industries <span className="text-emerald-400">Served</span></h2>
                        <div className="grid grid-cols-2 gap-4">
                            {['Corporate Offices', 'Medical & Dental', 'Short-Term Rentals', 'Retail & Showrooms', 'Luxury HOA', 'Post-Construction'].map((item, i) => (
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
