import React, { useState } from 'react';
import { Send, MapPin, Mail, CheckCircle, ArrowRight } from 'lucide-react';

const ContactPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        serviceType: 'Commercial Cleaning',
        message: ''
    });
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulate API call
        setTimeout(() => {
            setSubmitted(true);
        }, 1000);
    };

    return (
        <div className="bg-[#020617] text-white min-h-screen pt-12 pb-24 font-sans">

            {/* Header */}
            <div className="container mx-auto px-6 text-center mb-20 relative">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none"></div>
                <h1 className="relative z-10 text-4xl md:text-6xl font-bold mb-6 font-heading tracking-tight">
                    Get in <span className="text-emerald-400">Touch</span>
                </h1>
                <p className="relative z-10 text-slate-400 max-w-2xl mx-auto text-lg font-light">
                    Ready to elevate your standards? Fill out the form below and receiving a custom proposal within 24 hours.
                </p>
            </div>

            <div className="container mx-auto px-6 max-w-6xl">
                <div className="grid md:grid-cols-2 gap-12 lg:gap-24">

                    {/* Contact Info */}
                    <div className="space-y-12">
                        <div>
                            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                                <span className="w-8 h-1 bg-emerald-500 rounded-full"></span>
                                Corporate HQ
                            </h3>
                            <div className="flex items-start gap-4 p-6 bg-white/5 rounded-2xl border border-white/10 hover:border-emerald-500/30 transition-colors">
                                <div className="p-3 bg-emerald-500/10 rounded-xl">
                                    <MapPin className="text-emerald-400 w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-lg text-white mb-2">Location</h4>
                                    <p className="text-slate-400 leading-relaxed">
                                        900 Buice Lake Pkwy<br />
                                        Acworth, GA 30102
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div>
                            <div className="flex items-start gap-4 p-6 bg-white/5 rounded-2xl border border-white/10 hover:border-emerald-500/30 transition-colors">
                                <div className="p-3 bg-emerald-500/10 rounded-xl">
                                    <Mail className="text-emerald-400 w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-lg text-white mb-2">Digital Inquiries</h4>
                                    <p className="text-slate-400 leading-relaxed mb-1">contact@cleanshinepro.com</p>
                                    <p className="text-xs text-slate-500">24/7 Monitoring</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-emerald-900/20 to-blue-900/20 p-8 rounded-3xl border border-emerald-500/20">
                            <h4 className="font-bold text-xl mb-4">Why Choose Us?</h4>
                            <ul className="space-y-3">
                                {[
                                    "Fully Insured & Bonded",
                                    "AI-Driven Quality Control",
                                    "Hospital-Grade Disinfectants",
                                    "Zero-Liability Guarantee"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 text-slate-300">
                                        <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Form */}
                    <div className="bg-[#0B1121] border border-white/5 rounded-3xl p-8 md:p-10 shadow-2xl relative overflow-hidden">
                        {submitted ? (
                            <div className="h-full flex flex-col items-center justify-center text-center space-y-6 animate-fade-in">
                                <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center">
                                    <CheckCircle className="w-10 h-10 text-emerald-400" />
                                </div>
                                <h3 className="text-3xl font-bold text-white">Message Sent!</h3>
                                <p className="text-slate-400 max-w-sm">
                                    Thank you for contacting CleanShine Pro. Our team is reviewing your request and will be in touch shortly.
                                </p>
                                <button
                                    onClick={() => setSubmitted(false)}
                                    className="text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-2"
                                >
                                    Send another message <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                                <h3 className="text-2xl font-bold mb-2">Send a Message</h3>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-400 ml-1">Full Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        required
                                        className="w-full bg-[#020617] border border-white/10 rounded-xl p-4 text-white focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-all placeholder-slate-600"
                                        placeholder="John Doe"
                                        value={formData.name}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-400 ml-1">Email Address</label>
                                    <input
                                        type="email"
                                        name="email"
                                        required
                                        className="w-full bg-[#020617] border border-white/10 rounded-xl p-4 text-white focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-all placeholder-slate-600"
                                        placeholder="john@company.com"
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-400 ml-1">Service Interest</label>
                                    <select
                                        name="serviceType"
                                        className="w-full bg-[#020617] border border-white/10 rounded-xl p-4 text-white focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-all"
                                        value={formData.serviceType}
                                        onChange={handleChange}
                                    >
                                        <option>Commercial Cleaning</option>
                                        <option>Office Medical Facilities</option>
                                        <option>Airbnb Turnover</option>
                                        <option>Residential Deep Clean</option>
                                        <option>Post-Construction</option>
                                        <option>Other</option>
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-400 ml-1">Message Details</label>
                                    <textarea
                                        name="message"
                                        rows="4"
                                        required
                                        className="w-full bg-[#020617] border border-white/10 rounded-xl p-4 text-white focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-all placeholder-slate-600 resize-none"
                                        placeholder="Tell us about your facility square footage or specific needs..."
                                        value={formData.message}
                                        onChange={handleChange}
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-emerald-500/20 transition-all flex items-center justify-center gap-2 group"
                                >
                                    Send Request
                                    <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;
