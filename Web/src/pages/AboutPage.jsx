import React from 'react';
import { Award, MapPin, Users, History, CheckCircle2, Building, Star } from 'lucide-react';

const AboutPage = ({ onNavigate }) => {
    return (
        <div className="bg-[#020617] text-white min-h-screen pt-24 pb-12 font-sans">

            {/* Header */}
            <div className="container mx-auto px-6 text-center mb-20 relative">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none"></div>
                <h1 className="relative z-10 text-4xl md:text-6xl font-bold mb-6 font-heading tracking-tight">
                    Our <span className="text-emerald-400">Standard</span>
                </h1>
                <p className="relative z-10 text-slate-400 max-w-2xl mx-auto text-lg font-light">
                    Born in Atlanta, built on excellence. We are redefining the cleaning industry with technology, integrity, and hospital-grade precision.
                </p>
                <div className="relative z-10 mt-12 p-8 bg-emerald-500/5 border border-emerald-500/20 rounded-2xl max-w-4xl mx-auto backdrop-blur-sm">
                    <p className="text-slate-200 text-lg leading-relaxed italic">
                        "At CleanShine Pro, we provide premium residential and commercial cleaning services to busy professionals and business owners in Woodstock and Cherokee County. Unlike traditional cleaning companies, we combine hospital-grade sanitation protocols with a white-glove service experience, ensuring that every space we touch isn't just clean—it's transformationally pristine."
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-6 max-w-6xl space-y-24">

                {/* Our Story Section */}
                <section className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="relative">
                        <div className="absolute -inset-4 bg-gradient-to-r from-emerald-600 to-blue-600 rounded-2xl blur opacity-20"></div>
                        <div className="relative bg-[#0B1121] border border-white/5 rounded-2xl overflow-hidden shadow-2xl p-8 md:p-10">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-400">
                                    <History className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white">Established 2023</h3>
                                    <p className="text-slate-400 text-sm">Atlanta, Georgia</p>
                                </div>
                            </div>
                            <p className="text-slate-300 leading-relaxed mb-6">
                                CleanShine Pro LLC began with a simple yet ambitious mission: to elevate the standard of cleanliness in Atlanta's cleaning market. What started as a local operation has rapidly expanded into a premier service provider for high-stakes environments.
                            </p>
                            <p className="text-slate-300 leading-relaxed">
                                From Day 1, we rejected the "mop and bucket" status quo. Instead, we implemented **stringent quality oversight**, hospital-grade disinfection protocols, and a white-glove service model that caters specifically to commercial facilities and luxury residential estates.
                            </p>
                        </div>
                    </div>
                    <div>
                        <h2 className="text-3xl font-bold mb-6">Rooted in Atlanta,<br />Serving the Metro Area</h2>
                        <p className="text-slate-400 mb-8 leading-relaxed">
                            We are proud to be an Atlanta-based company. Our growth is a testament to the trust we've built with businesses and homeowners across the metro area. We don't just work here; we are part of the community.
                        </p>

                        <div className="grid grid-cols-2 gap-4">
                            {[
                                "Atlanta (HQ)", "Woodstock", "Marietta", "Alpharetta",
                                "Sandy Springs", "Roswell", "Kennesaw", "Acworth"
                            ].map((city, i) => (
                                <div key={i} className="flex items-center gap-2 text-sm text-slate-300 bg-white/5 p-3 rounded-lg border border-white/5">
                                    <MapPin className="w-4 h-4 text-emerald-500" /> {city}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Our Focus */}
                <section className="bg-gradient-to-b from-[#0F172A] to-[#020617] rounded-3xl p-8 md:p-16 border border-white/5">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold mb-4">Our Core Specializations</h2>
                        <p className="text-slate-400">We don't do "average". We specialize in environments that demand perfection.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Commercial Card */}
                        <div className="bg-[#0B1121] p-8 rounded-2xl border border-white/5 hover:border-emerald-500/30 transition-colors">
                            <Building className="w-10 h-10 text-emerald-400 mb-6" />
                            <h3 className="text-xl font-bold mb-3">Commercial Excellence</h3>
                            <p className="text-slate-400 text-sm leading-relaxed mb-4">
                                Partnering with office buildings, medical facilities, and retail spaces to ensure strict hygiene compliance and a pristine professional image.
                            </p>
                        </div>

                        {/* Luxury Residential Card */}
                        <div className="bg-[#0B1121] p-8 rounded-2xl border border-white/5 hover:border-emerald-500/30 transition-colors">
                            <Star className="w-10 h-10 text-emerald-400 mb-6" />
                            <h3 className="text-xl font-bold mb-3">Luxury Residential</h3>
                            <p className="text-slate-400 text-sm leading-relaxed mb-4">
                                Discrete, white-glove service for high-value properties. We treat your sanctuary with the privacy and level of detail it deserves.
                            </p>
                        </div>

                        {/* Quality Card */}
                        <div className="bg-[#0B1121] p-8 rounded-2xl border border-white/5 hover:border-emerald-500/30 transition-colors">
                            <Award className="w-10 h-10 text-emerald-400 mb-6" />
                            <h3 className="text-xl font-bold mb-3">Guaranteed Quality</h3>
                            <p className="text-slate-400 text-sm leading-relaxed mb-4">
                                Backed by comprehensive insurance and a 100% satisfaction guarantee. If it's not perfect, we make it right, immediately.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Team & Value */}
                <section className="grid md:grid-cols-2 gap-12 items-center mb-24">
                    <div>
                        <h2 className="text-3xl font-bold mb-6">The CleanShine Difference</h2>
                        <ul className="space-y-6">
                            <li className="flex gap-4">
                                <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0">
                                    <Users className="w-5 h-5 text-emerald-400" />
                                </div>
                                <div>
                                    <h4 className="font-bold mb-1">Vetted Professionals</h4>
                                    <p className="text-sm text-slate-400">Every team member undergoes rigorous background checks and intensive training in our specific protocols.</p>
                                </div>
                            </li>
                            <li className="flex gap-4">
                                <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0">
                                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                                </div>
                                <div>
                                    <h4 className="font-bold mb-1">Consistency Key</h4>
                                    <p className="text-sm text-slate-400">We use digital checklists and photo-verification for every job, ensuring you get the same 5-star result every single time.</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-2xl border border-white/10 group">
                        <img
                            src="https://images.unsplash.com/photo-1577412647305-991150c7d163?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                            alt="Professional Cleaning Team"
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent opacity-90"></div>
                        <div className="absolute bottom-8 left-8 right-8">
                            <div className="text-2xl font-bold mb-2">Trusted by Atlanta's Best</div>
                            <div className="text-emerald-400 font-mono text-sm">SERVING COMMERCIAL & RESIDENTIAL SINCE 2023</div>
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="text-center max-w-2xl mx-auto">
                    <h2 className="text-3xl font-bold mb-6">Ready to work with us?</h2>
                    <p className="text-slate-400 mb-8">Join the growing list of businesses and homeowners who trust CleanShine Pro.</p>
                    <button
                        onClick={() => onNavigate('contact')} // Using passed prop for navigation
                        className="px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg transition-all shadow-lg hover:shadow-emerald-500/30"
                    >
                        Request a Proposal
                    </button>
                </section>

            </div>
        </div>
    );
};

export default AboutPage;
