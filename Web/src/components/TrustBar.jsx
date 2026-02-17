import React from 'react';
import { ShieldCheck, UserCheck, Clock, Leaf } from 'lucide-react';

const TrustBar = () => {
    const items = [
        { icon: <ShieldCheck className="w-6 h-6" />, label: "Fully Insured & Bonded", sub: "$5M Liability Coverage" },
        { icon: <Leaf className="w-6 h-6" />, label: "Eco-Friendly Products", sub: "Safe for Pets & Kids" },
        { icon: <Clock className="w-6 h-6" />, label: "24-Hour Clean Warranty", sub: "Satisfaction Guaranteed" },
        { icon: <UserCheck className="w-6 h-6" />, label: "Background Checked", sub: "Strict Vetting Process" },
    ];

    return (
        <section className="bg-[#020617] border-b border-white/5 py-12 relative overflow-hidden">
            {/* Glow effect */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-emerald-500/5 blur-3xl pointer-events-none"></div>

            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {items.map((item, index) => (
                        <div key={index} className="group relative bg-[#0B1121] hover:bg-[#162032] border border-white/5 hover:border-emerald-500/30 p-6 rounded-xl transition-all duration-300">
                            <div className="flex flex-col items-center text-center">
                                <div className="w-12 h-12 rounded-full bg-slate-800/50 flex items-center justify-center text-emerald-400 mb-4 group-hover:scale-110 group-hover:text-emerald-300 transition-all shadow-[0_0_15px_rgba(16,185,129,0.1)]">
                                    {item.icon}
                                </div>
                                <h3 className="text-white font-bold text-sm tracking-wide uppercase mb-1">{item.label}</h3>
                                <p className="text-slate-500 text-xs font-mono">{item.sub}</p>
                            </div>
                            {/* Bottom active line */}
                            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TrustBar;
