import React from 'react';
import { ArrowRight, Cpu, Search, CalendarCheck, Send, MapPin, Camera, Star, Receipt, UserCheck, ShieldCheck } from 'lucide-react';
import Link from '../components/Link';

const STEPS = [
    { icon: Search, title: 'You enter your address', text: 'The quote looks up public property records (square footage, bedrooms, bathrooms) so you only confirm what is there. Offices and stores are recognized as commercial.' },
    { icon: Cpu, title: 'The engine prices the job', text: 'CleaningIQ calculates the time and team the job needs and compares it with what local competitors charge for the same service, size, frequency and ZIP. Your price is set 5% below that average.' },
    { icon: CalendarCheck, title: 'You book a date', text: 'Pick a day and time online. For recurring plans, the whole series is scheduled and each visit is confirmed with you two days before.' },
    { icon: Send, title: 'The job goes to a local partner', text: 'The job is offered to the vetted partner companies that cover your ZIP. The first qualified team to accept takes it. If nobody can, our office steps in.' },
    { icon: MapPin, title: 'The team checks in by GPS', text: 'When the team arrives, the app records the time and location. They follow the checklist for your service.' },
    { icon: Camera, title: 'Photos and extras', text: 'The team takes before-and-after photos. If something extra comes up (inside the oven, a messy garage), you approve it in your portal before it is charged.' },
    { icon: Star, title: 'You see the report and rate it', text: 'Check-out time, photos and your statement are in your private portal. Rate the visit; anything 3 stars or less goes straight to a person on our team.' },
    { icon: Receipt, title: 'Billing and partner pay', text: 'CleanShine Pro bills you. Every week the system closes the completed jobs and prepares each partner’s statement, and our team pays them. You only ever deal with us.' },
];

const PRINCIPLES = [
    { icon: UserCheck, title: 'People approve, machines prepare', text: 'Automation drafts the quotes, reminders, offers and statements. Anything that matters, like a new partner, a refund or a first message to a lead, waits for a person to approve it.' },
    { icon: ShieldCheck, title: 'Only real numbers', text: 'If the system doesn’t know something, it shows a dash instead of making it up. That goes for prices, ratings and reports.' },
    { icon: Cpu, title: 'One price everywhere', text: 'The website, the office and the phone use the same pricing engine, so the price never depends on who you talk to.' },
];

export default function HowItWorksPage() {
    return (
        <div className="bg-[#020617] text-white">
            <header className="container mx-auto px-4 md:px-6 py-14 md:py-20 max-w-4xl">
                <p className="text-xs font-bold uppercase tracking-widest text-violet-300 mb-3">Powered by CleaningIQ</p>
                <h1 className="text-4xl md:text-6xl font-bold mb-6 font-heading leading-tight">How CleanShine Pro <span className="text-emerald-400">works</span></h1>
                <p className="text-lg text-slate-300 leading-relaxed">
                    CleanShine Pro is a Georgia cleaning company that works with a network of vetted local cleaning companies. Every job runs on CleaningIQ, our own software: it prices the job, sends it to the right team, records the visit and handles the billing. Here is exactly what happens from your first click to the photo report.
                </p>
            </header>

            <section className="container mx-auto px-4 md:px-6 pb-16 max-w-4xl">
                <ol className="relative border-l border-emerald-500/30 ml-5 space-y-8">
                    {STEPS.map(({ icon: Icon, title, text }, i) => (
                        <li key={title} className="pl-10 relative">
                            <span className="absolute -left-5 top-0 w-10 h-10 rounded-full bg-[#0B1121] border border-emerald-500/40 flex items-center justify-center text-emerald-400"><Icon className="w-5 h-5" /></span>
                            <h2 className="text-xl font-bold mb-1"><span className="text-slate-500 mr-2">{i + 1}.</span>{title}</h2>
                            <p className="text-slate-400 leading-relaxed">{text}</p>
                        </li>
                    ))}
                </ol>
            </section>

            <section className="bg-[#050B1A] border-y border-white/5 py-16">
                <div className="container mx-auto px-4 md:px-6 max-w-5xl">
                    <h2 className="text-3xl md:text-4xl font-bold mb-8">Three rules the system follows</h2>
                    <div className="grid md:grid-cols-3 gap-5">
                        {PRINCIPLES.map(({ icon: Icon, title, text }) => (
                            <div key={title} className="bg-[#0B1121] border border-white/5 rounded-2xl p-6">
                                <Icon className="w-6 h-6 text-violet-300 mb-3" />
                                <h3 className="font-bold text-lg mb-2">{title}</h3>
                                <p className="text-slate-400 text-sm leading-relaxed">{text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-16">
                <div className="container mx-auto px-4 md:px-6 max-w-5xl grid md:grid-cols-2 gap-6">
                    <div className="bg-emerald-700/20 border border-emerald-500/30 rounded-2xl p-8">
                        <h2 className="text-2xl font-bold mb-3">Need a cleaning?</h2>
                        <p className="text-slate-300 mb-6">See your exact price in about a minute.</p>
                        <Link to="/quote" className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-500 font-bold rounded-lg">Get my price <ArrowRight className="w-4 h-4" /></Link>
                    </div>
                    <div className="bg-violet-700/20 border border-violet-400/30 rounded-2xl p-8">
                        <h2 className="text-2xl font-bold mb-3">Run a cleaning company?</h2>
                        <p className="text-slate-300 mb-6">Get jobs from our network and use CleaningIQ at no cost.</p>
                        <Link to="/partners" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#0A2E5C] font-bold rounded-lg">See the partner program <ArrowRight className="w-4 h-4" /></Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
