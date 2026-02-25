import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const faqs = [
        {
            question: "How much do your cleaning services cost?",
            answer: "Pricing depends on the size of your space and the type of service (Recurring, Deep, or Move-In/Out). We offer transparent, flat-rate pricing for residential homes and custom quotes for local businesses. Get a free estimate in minutes by clicking 'Get Quote'!"
        },
        {
            question: "Do you provide cleaning services in my area?",
            answer: "We proudly serve Woodstock, Acworth, Kennesaw, Marietta, and the surrounding Cherokee & Cobb County area. If you're nearby but not sure if we cover your street, give us a call!"
        },
        {
            question: "Are you licensed, insured, and bonded?",
            answer: "Yes, absolutely! CleanShine Pro is fully licensed, bonded, and carries professional liability insurance. Your property and our team are protected at all times, giving you total peace of mind."
        },
        {
            question: "Do I need to provide cleaning supplies?",
            answer: "Not necessarily. We bring our own high-quality, eco-friendly cleaning supplies and professional-grade equipment. However, if you have specific products you'd like us to use on certain surfaces, just let us know!"
        },
        {
            question: "What is your 100% Satisfaction Guarantee?",
            answer: "We stand by our work. If you're not completely satisfied with any area we've cleaned, just notify us within 24 hours. We'll come back and re-clean those spots at no extra cost until it's perfect."
        },
        {
            question: "How do I schedule or change a booking?",
            answer: "You can book directly through our website or by calling us. For existing clients, we offer a simple portal to manage schedules. We ask for a 24-hour notice for any cancellations or rescheduling."
        }
    ];

    const toggle = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="py-24 bg-[#020617] border-t border-white/5">
            <div className="container mx-auto px-6 max-w-4xl">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">
                        Frequently Asked <span className="text-emerald-400">Questions</span>
                    </h2>
                    <p className="text-slate-400 font-light text-lg">
                        Everything you need to know about our professional cleaning services in Woodstock.
                    </p>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div key={index} className="bg-[#0B1121] border border-white/5 rounded-2xl overflow-hidden transition-all duration-300">
                            <button
                                onClick={() => toggle(index)}
                                className="w-full flex justify-between items-center p-6 text-left hover:bg-white/5 transition-colors"
                            >
                                <span className="text-white font-bold">{faq.question}</span>
                                {openIndex === index ? (
                                    <ChevronUp className="text-emerald-400 w-5 h-5" />
                                ) : (
                                    <ChevronDown className="text-slate-500 w-5 h-5" />
                                )}
                            </button>
                            <div
                                className={`transition-all duration-300 ease-in-out px-6 overflow-hidden ${openIndex === index ? 'max-h-48 pb-6 opacity-100' : 'max-h-0 opacity-0'
                                    }`}
                            >
                                <p className="text-slate-400 text-sm leading-relaxed">
                                    {faq.answer}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQ;
