import React from 'react';
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone } from 'lucide-react';

const Footer = ({ onNavigate }) => {
    return (
        <footer className="bg-[#020617] text-white pt-20 pb-10 border-t border-white/5">
            <div className="container mx-auto px-6">

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Brand */}
                    <div>
                        <div className="mb-6">
                            {/* White text logo for footer */}
                            <div className="text-2xl font-bold font-heading cursor-pointer" onClick={() => onNavigate('home')}>CLEANSHINE <span className="text-emerald-400">PRO</span></div>
                        </div>
                        <p className="text-slate-400 text-sm leading-relaxed mb-6">
                            Setting the new standard in corporate and residential hygiene. Standardized excellence, insured professionals, and guaranteed results.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-emerald-600 transition-colors"><Facebook size={18} /></a>
                            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-emerald-600 transition-colors"><Instagram size={18} /></a>
                            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-emerald-600 transition-colors"><Linkedin size={18} /></a>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-bold text-lg mb-6">Company</h4>
                        <ul className="space-y-3 text-sm text-slate-400">
                            <li><button onClick={() => onNavigate('about')} className="hover:text-emerald-400 transition-colors text-left">About Us</button></li>
                            <li><button onClick={() => onNavigate('process')} className="hover:text-emerald-400 transition-colors text-left">Our Process</button></li>
                            <li><button onClick={() => onNavigate('blog')} className="hover:text-emerald-400 transition-colors text-left font-bold text-emerald-500">Expert Blog</button></li>
                            <li><button onClick={() => onNavigate('contact')} className="hover:text-emerald-400 transition-colors text-left">Careers</button></li>
                            <li><button onClick={() => onNavigate('service-areas')} className="hover:text-emerald-400 transition-colors text-left">All Service Areas</button></li>
                            <li><button onClick={() => onNavigate('privacy')} className="hover:text-emerald-400 transition-colors text-left">Privacy Policy</button></li>
                        </ul>
                    </div>

                    {/* Service Regions */}
                    <div>
                        <h4 className="font-bold text-lg mb-6">Service Localities</h4>
                        <ul className="space-y-3 text-sm text-slate-400">
                            <li><button onClick={() => onNavigate('woodstock')} className="hover:text-emerald-400 transition-colors text-left">Woodstock, GA</button></li>
                            <li><button onClick={() => onNavigate('acworth')} className="hover:text-emerald-400 transition-colors text-left">Acworth, GA</button></li>
                            <li><button onClick={() => onNavigate('kennesaw')} className="hover:text-emerald-400 transition-colors text-left">Kennesaw, GA</button></li>
                            <li><button onClick={() => onNavigate('marietta')} className="hover:text-emerald-400 transition-colors text-left">Marietta, GA</button></li>
                            <li><button onClick={() => onNavigate('contact')} className="hover:text-emerald-400 transition-colors text-left italic">Request New City +</button></li>
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h4 className="font-bold text-lg mb-6">Services</h4>
                        <ul className="space-y-3 text-sm text-slate-400">
                            <li onClick={() => onNavigate('services')} className="hover:text-emerald-400 cursor-pointer">Commercial Cleaning</li>
                            <li onClick={() => onNavigate('services')} className="hover:text-emerald-400 cursor-pointer">Office Medical Facilities</li>
                            <li onClick={() => onNavigate('services')} className="hover:text-emerald-400 cursor-pointer">Airbnb Turnover</li>
                            <li onClick={() => onNavigate('services')} className="hover:text-emerald-400 cursor-pointer">Post-Construction</li>
                            <li onClick={() => onNavigate('services')} className="hover:text-emerald-400 cursor-pointer">Deep Residential</li>
                            <li onClick={() => onNavigate('services')} className="hover:text-emerald-400 cursor-pointer">Move-In / Move-Out</li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="font-bold text-lg mb-6">Contact</h4>
                        <ul className="space-y-4 text-sm text-slate-400">
                            <li className="flex items-start gap-3">
                                <MapPin className="text-emerald-500 mt-0.5" size={18} />
                                <span>900 Buice Lake Pkwy<br />Woodstock, GA 30188</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail className="text-emerald-500" size={18} />
                                <span>contact@cleanshinepro.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-white/5 pt-8 text-center text-slate-500 text-sm">
                    <p>&copy; {new Date().getFullYear()} CleanShine Pro LLC. All rights reserved. Fully Insured & Bonded.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
