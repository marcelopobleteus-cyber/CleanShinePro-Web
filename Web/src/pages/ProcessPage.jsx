import React from 'react';
import { ClipboardList, Search, Sparkles, Star, UserCheck, Shield, CalendarDays } from 'lucide-react';

const ProcessPage = () => {
    const steps = [
        {
            icon: Search,
            title: "1. Initial Estimate",
            desc: "Contact us online or by phone. For larger commercial spaces, we conduct a quick on-site walkthrough to assess square footage and specific needs.",
            color: "text-blue-400"
        },
        {
            icon: ClipboardList,
            title: "2. Custom Plan Creation",
            desc: "We generate a tailored checklist for your property. This includes frequency (daily, weekly), specific focus areas, and security protocols.",
            color: "text-emerald-400"
        },
        {
            icon: CalendarDays,
            title: "3. Scheduling & Dispatch",
            desc: "Choose a time that works for you. Our system automatically dispatches the nearest available crew with the right equipment for your job.",
            color: "text-purple-400"
        },
        {
            icon: UserCheck,
            title: "4. The Clean",
            desc: "Our uniformed, background-checked professionals arrive on time. They follow the digital checklist to ensure no detail is missed.",
            color: "text-emerald-500"
        },
        {
            icon: Star,
            title: "5. Quality Assurance",
            desc: "Post-clean, we request your feedback. Our supervisors also conduct random spot checks to maintain our high corporate standards.",
            color: "text-yellow-400"
        }
    ];

    return (
        <div className="bg-[#020617] text-white min-h-screen pt-24 pb-12">

            {/* Header */}
            <header className="container mx-auto px-6 text-center mb-20 relative">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-500/10 rounded-full blur-[100px] z-0 pointer-events-none"></div>
                <h1 className="relative z-10 text-5xl md:text-6xl font-bold mb-6 font-heading">
                    Our <span className="text-emerald-400">Process</span>
                </h1>
                <p className="relative z-10 text-slate-400 max-w-2xl mx-auto text-lg font-light">
                    Transparency at every step. From the first quote to the final polish, our automated workflow ensures reliability and consistency.
                </p>
            </header>

            <div className="container mx-auto px-6 max-w-4xl">

                {/* Timeline */}
                <div className="relative">
                    {/* Vertical Line */}
                    <div className="absolute left-8 lg:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-emerald-500/50 via-blue-500/50 to-transparent"></div>

                    <div className="space-y-16">
                        {steps.map((step, index) => (
                            <div key={index} className={`relative flex flex-col lg:flex-row gap-8 items-start lg:items-center ${index % 2 === 0 ? 'lg:flex-row-reverse' : ''}`}>

                                {/* Icon Bubble */}
                                <div className="absolute left-8 lg:left-1/2 -translate-x-1/2 w-16 h-16 rounded-full bg-[#0B1121] border border-white/10 flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.2)] z-10">
                                    <step.icon className={`w-8 h-8 ${step.color}`} />
                                </div>

                                {/* Content Card */}
                                <div className="ml-24 lg:ml-0 lg:w-1/2 p-6 bg-[#0F172A] border border-white/5 rounded-2xl hover:border-emerald-500/30 transition-all duration-300 shadow-xl">
                                    <h3 className={`text-xl font-bold mb-3 ${step.color}`}>{step.title}</h3>
                                    <p className="text-slate-400 text-sm leading-relaxed">{step.desc}</p>
                                </div>

                                {/* Spacer for the other side */}
                                <div className="hidden lg:block lg:w-1/2"></div>
                            </div>
                        ))}
                    </div>

                </div>

                {/* Safety Badge */}
                <div className="mt-24 bg-emerald-900/10 border border-emerald-500/20 p-8 rounded-2xl flex flex-col md:flex-row items-center gap-6">
                    <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                        <Shield className="w-8 h-8" />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-white mb-2">Safety is Non-Negotiable</h3>
                        <p className="text-slate-400 text-sm">Every step of our process is designed with security in mind. From key management protocols to insurance coverage, your property is in safe hands.</p>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ProcessPage;
