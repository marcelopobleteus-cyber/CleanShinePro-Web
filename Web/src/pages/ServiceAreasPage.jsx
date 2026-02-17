import React from 'react';
import { MapPin, ArrowRight } from 'lucide-react';

const ServiceAreasPage = ({ onNavigate }) => {
    const areas = [
        { city: "Acworth", zip: ["30101", "30102"] },
        { city: "Kennesaw", zip: ["30144", "30152"] },
        { city: "Marietta", zip: ["30060", "30061", "30062", "30063", "30064", "30065", "30066", "30067", "30068"] },
        { city: "Woodstock", zip: ["30188", "30189"] },
    ];

    return (
        <div className="pt-24 pb-12 bg-[#020617] min-h-screen text-white">
            <div className="container mx-auto px-6">
                <div className="max-w-3xl mx-auto text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">Serving <span className="text-emerald-400">Acworth & Cobb County</span></h1>
                    <p className="text-slate-400 text-lg">
                        We provide premium residential and commercial cleaning services to the following communities in Georgia.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-12 items-start">
                    {/* Areas List */}
                    <div className="grid gap-6">
                        {areas.map((area, index) => (
                            <div key={index} className="bg-[#0B1121] border border-white/5 p-6 rounded-xl hover:border-emerald-500/30 transition-all group">
                                <div className="flex items-center gap-4 mb-3">
                                    <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                                        <MapPin className="w-5 h-5" />
                                    </div>
                                    <h3 className="text-xl font-bold text-white">{area.city}, GA</h3>
                                </div>
                                <div className="flex flex-wrap gap-2 pl-14">
                                    {area.zip.map(zip => (
                                        <span key={zip} className="text-xs font-mono text-slate-500 bg-white/5 px-2 py-1 rounded border border-white/5">
                                            {zip}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Map Placeholder */}
                    <div className="bg-[#0B1121] border border-white/5 rounded-2xl overflow-hidden h-[400px] relative group">
                        <iframe
                            className="w-full h-full opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                            src="https://maps.google.com/maps?q=Acworth,+GA&t=&z=11&ie=UTF8&iwloc=&output=embed"
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                        {/* Overlay CTA */}
                        <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/90 to-transparent">
                            <button onClick={() => onNavigate('booking')} className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-all">
                                Check Availability in Your Area <ArrowRight className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ServiceAreasPage;
