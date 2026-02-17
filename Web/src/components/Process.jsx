import React from 'react';

const Process = () => {
    const steps = [
        { num: '01', title: "Estimate", desc: "Online or On-site walkthrough to assess your unique needs." },
        { num: '02', title: "The Plan", desc: "We build a checklist tailored to your home or office." },
        { num: '03', title: "The Clean", desc: "Our vetted, uniformed pros arrive fully equipped." },
        { num: '04', title: "Quality Check", desc: "We verify satisfaction before marking the job complete." }
    ];

    return (
        <section className="py-16 bg-[#0B1121] relative border-t border-white/5">
            <div className="container mx-auto px-6">
                <div className="text-center mb-10">
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">Operating <span className="text-emerald-400">Protocol</span></h2>
                    <p className="text-slate-400 text-sm font-light max-w-lg mx-auto">
                        A standard operating procedure used by top-tier facilities, adapted for your space.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
                    {/* Connecting Line (Desktop) */}
                    <div className="hidden md:block absolute top-7 left-0 w-full h-px bg-gray-800 z-0 px-12">
                        <div className="h-full bg-emerald-500/30"></div>
                    </div>

                    {steps.map((step, index) => (
                        <div key={index} className="relative z-10 flex flex-col items-center text-center">
                            <div className="w-14 h-14 rounded-full bg-[#020617] border border-emerald-500 text-emerald-400 flex items-center justify-center font-mono font-bold text-lg mb-4 shadow-[0_0_15px_rgba(16,185,129,0.1)]">
                                {step.num}
                            </div>
                            <h3 className="text-white font-bold text-base mb-1">{step.title}</h3>
                            <p className="text-xs text-slate-500 max-w-[180px] leading-relaxed">{step.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Process;
