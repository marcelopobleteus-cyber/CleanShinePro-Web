import React from 'react';
import { BookOpen, Clock, ArrowRight, User, Sparkles, MapPin } from 'lucide-react';

const BlogPage = ({ onNavigate }) => {
    const posts = [
        {
            id: 1,
            title: "5 Hidden Germ Hotspots in Your Woodstock Office",
            excerpt: "Flu season is approaching. Learn which areas in your office are harboring the most germs and how our hospital-grade cleaning protocols can help.",
            date: "Oct 12, 2024",
            readTime: "5 min",
            category: "Commercial Cleaning",
            image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800"
        },
        {
            id: 2,
            title: "The Ultimate Move-Out Checklist for Kennesaw Renters",
            excerpt: "Moving is stressful. Our expert checklist ensures you get your security deposit back with a professional move-out scrub-down.",
            date: "Sep 28, 2024",
            readTime: "8 min",
            category: "Move-Out Guide",
            image: "https://images.unsplash.com/photo-1581578731548-c64695ce6958?auto=format&fit=crop&q=80&w=800"
        },
        {
            id: 3,
            title: "Cleaning Post-Construction: Why Regular Vacuums Aren't Enough",
            excerpt: "Construction dust is abrasive and microscopic. Discover why specialized HEPA filtration is a must for your new build in Marietta.",
            date: "Sep 15, 2024",
            readTime: "6 min",
            category: "Expert Detailing",
            image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=800"
        }
    ];

    return (
        <div className="min-h-screen bg-[#020617] text-white pt-32 pb-20">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="space-y-6 mb-20 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-400 text-xs font-bold uppercase tracking-widest">
                        <BookOpen className="w-4 h-4" /> The Cleaning IQ Blog
                    </div>
                    <h1 className="text-6xl md:text-7xl font-black tracking-tighter italic leading-none">
                        EXPERT INSIGHTS <br />
                        <span className="text-emerald-500">FROM THE PRO CLEANERS</span>
                    </h1>
                    <p className="text-xl text-slate-400 max-w-2xl mx-auto font-medium">
                        Tips, guides, and industry secrets for maintaining a pristine environment in North Georgia homes and offices.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
                    {posts.map((post) => (
                        <div key={post.id} className="group bg-white/5 border border-white/10 rounded-[2.5rem] overflow-hidden hover:border-emerald-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-emerald-500/10">
                            <div className="aspect-video relative overflow-hidden">
                                <img src={post.image} alt={post.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                <div className="absolute top-4 left-4 px-3 py-1 bg-emerald-500 text-[#020617] text-[10px] font-black uppercase tracking-widest rounded-full">
                                    {post.category}
                                </div>
                            </div>
                            <div className="p-8 space-y-4">
                                <div className="flex items-center gap-4 text-slate-500 text-[10px] font-black uppercase tracking-widest">
                                    <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {post.readTime}</span>
                                    <span className="flex items-center gap-1"><User className="w-4 h-4" /> Admin</span>
                                </div>
                                <h3 className="text-xl font-black leading-tight italic group-hover:text-emerald-400 transition-colors uppercase tracking-tight">
                                    {post.title}
                                </h3>
                                <p className="text-sm text-slate-400 leading-relaxed font-medium">
                                    {post.excerpt}
                                </p>
                                <button className="pt-4 flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-emerald-500 group-hover:gap-4 transition-all">
                                    Read Article <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Newsletter Gancho */}
                <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-[3rem] p-12 relative overflow-hidden">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div className="space-y-4">
                            <h2 className="text-4xl font-black italic uppercase tracking-tighter">Stay updated with <br />North GA Cleaning Tips</h2>
                            <p className="text-slate-400 font-medium">We'll send you a monthly digest of cleaning hacks and exclusive Woodstock discounts.</p>
                        </div>
                        <div className="flex gap-4">
                            <input type="email" placeholder="Enter your email" className="flex-1 bg-[#020617] border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-emerald-500 transition-all" />
                            <button className="px-8 py-4 bg-emerald-500 text-[#020617] font-black rounded-2xl uppercase tracking-widest text-xs hover:bg-emerald-400 transition-all">
                                Join
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogPage;
