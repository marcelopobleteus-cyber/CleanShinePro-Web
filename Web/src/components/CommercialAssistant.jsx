import React, { useState, useRef, useEffect } from 'react';
import { Shield, X, Send, ChevronRight, Check } from 'lucide-react';
import { getGeminiResponse } from '../services/gemini';

const CommercialAssistant = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { type: 'bot', text: "Welcome to CleanShine Pro! I'm Shine, your expert cleaning consultant. Are you looking to transform your office morale or reclaim your home sanctuary today?" }
    ]);
    const [quickActions, setQuickActions] = useState([
        "Free Office Quote", "Deep Home Clean", "Airbnb Turnover", "Our Guarantee"
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [showBubble, setShowBubble] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (!isOpen) setShowBubble(true);
        }, 3000);
        return () => clearTimeout(timer);
    }, [isOpen]);

    // Form State
    const [showForm, setShowForm] = useState(false);
    const [formStep, setFormStep] = useState(0); // 0: Type, 1: Details, 2: Contact
    const [formData, setFormData] = useState({
        type: '',
        address: '',
        service: '',
        name: '',
        contact: ''
    });

    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, showForm, formStep]);

    const handleSend = async (overrideMsg = null) => {
        const userMsg = overrideMsg || input.trim();
        if (!userMsg) return;

        setMessages(prev => [...prev, { type: 'user', text: userMsg }]);
        setInput('');
        setIsTyping(true);

        try {
            // Call Gemini AI with History
            let aiText = await getGeminiResponse(userMsg, messages);
            let triggerForm = false;

            // Check for hidden trigger from AI
            if (aiText.includes('[[SHOW_FORM]]')) {
                triggerForm = true;
                aiText = aiText.replace('[[SHOW_FORM]]', '').trim();
            }

            setMessages(prev => [...prev, { type: 'bot', text: aiText }]);

            if (triggerForm) {
                setShowForm(true);
                setFormStep(0);
            }
        } catch (error) {
            setMessages(prev => [...prev, { type: 'bot', text: "I'm having trouble connecting right now. Please try again later." }]);
        } finally {
            setIsTyping(false);
        }
    };

    const handleFormUpdate = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        if (field === 'type') setFormStep(1); // Auto-advance on type selection
    };

    const handleNextStep = () => {
        if (formStep < 2) setFormStep(prev => prev + 1);
        else handleSubmitForm();
    };

    const handleSubmitForm = () => {
        setShowForm(false);
        setIsTyping(true);
        setTimeout(() => {
            setMessages(prev => [...prev, { type: 'bot', text: `Thanks ${formData.name}! We've received your ${formData.type} request for ${formData.address}. A specialist will contact you at ${formData.contact} shortly!` }]);
            setIsTyping(false);
            // Reset form for future use
            setFormData({ type: '', address: '', service: '', name: '', contact: '' });
            setFormStep(0);
        }, 1500);
    };

    return (
        <div className="fixed bottom-6 right-6 z-[100] font-sans">

            {/* Chat Window */}
            {isOpen && (
                <div className="absolute bottom-20 right-0 w-[380px] bg-[#0F172A] border border-emerald-500/30 rounded-2xl shadow-2xl overflow-hidden flex flex-col animate-in slide-in-from-bottom-5 duration-300">

                    {/* Header */}
                    <div className="bg-gradient-to-r from-emerald-600 to-emerald-800 p-4 flex justify-between items-center">
                        <div className="flex items-center gap-3">
                            <div className="relative">
                                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center relative shadow-lg">
                                    <Shield className="w-6 h-6 text-emerald-600 fill-current" />
                                    {/* Eyes Animation */}
                                    <div className="absolute top-[14px] left-[11px] w-[4px] h-[4px] bg-[#020617] rounded-full z-10 animate-blink"></div>
                                    <div className="absolute top-[14px] right-[11px] w-[4px] h-[4px] bg-[#020617] rounded-full z-10 animate-blink"></div>
                                </div>
                                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-[#0F172A] rounded-full animate-pulse"></div>
                            </div>
                            <div>
                                <h3 className="text-white font-bold text-sm">Shine Assistant</h3>
                                <p className="text-emerald-100 text-xs flex items-center gap-1">
                                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full"></span> Online
                                </p>
                            </div>
                        </div>
                        <button onClick={() => setIsOpen(false)} className="text-emerald-100 hover:text-white transition-colors">
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Chat Body */}
                    <div className="h-[450px] overflow-y-auto p-4 space-y-4 bg-[#0B1121] scrollbar-thin scrollbar-thumb-emerald-600/20 scrollbar-track-transparent">

                        {messages.map((msg, idx) => (
                            <div key={idx} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[85%] p-3.5 rounded-2xl text-sm leading-relaxed shadow-sm ${msg.type === 'user'
                                    ? 'bg-emerald-600 text-white rounded-tr-sm'
                                    : 'bg-[#1E293B] text-slate-200 border border-white/5 rounded-tl-sm'
                                    }`}>
                                    {msg.text}
                                </div>
                            </div>
                        ))}

                        {/* Quick Actions */}
                        {messages.length < 3 && !showForm && (
                            <div className="flex flex-wrap gap-2 mt-2">
                                {quickActions.map(action => (
                                    <button
                                        key={action}
                                        onClick={() => handleSend(action)}
                                        className="text-[11px] bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-3 py-1.5 rounded-full hover:bg-emerald-500 hover:text-white transition-all"
                                    >
                                        {action}
                                    </button>
                                ))}
                            </div>
                        )}

                        {/* Interactive Form Logic */}
                        {showForm && (
                            <div className="bg-[#1E293B] border border-emerald-500/30 rounded-xl p-4 ml-0 animate-fade-in shadow-lg max-w-[90%]">
                                <div className="flex items-center gap-2 mb-3 border-b border-white/5 pb-2">
                                    <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center text-xs font-bold text-emerald-400">
                                        {formStep + 1}/3
                                    </div>
                                    <h4 className="text-emerald-400 text-sm font-semibold">
                                        {formStep === 0 ? "Property Type" : formStep === 1 ? "Location & Needs" : "Contact Info"}
                                    </h4>
                                </div>

                                {formStep === 0 && (
                                    <div className="grid grid-cols-2 gap-2">
                                        {['Commercial', 'Residential', 'Airbnb', 'Other'].map(type => (
                                            <button
                                                key={type}
                                                onClick={() => handleFormUpdate('type', type)}
                                                className={`p-2 text-xs rounded-lg border border-white/10 hover:border-emerald-500 hover:bg-emerald-500/10 transition-all text-left flex items-center justify-between group ${formData.type === type ? 'bg-emerald-500/20 border-emerald-500' : 'bg-white/5 text-slate-300'}`}
                                            >
                                                {type}
                                                {formData.type === type && <Check className="w-3 h-3 text-emerald-400" />}
                                            </button>
                                        ))}
                                    </div>
                                )}

                                {formStep === 1 && (
                                    <div className="space-y-3">
                                        <input
                                            type="text"
                                            placeholder="Property Address / City"
                                            className="w-full bg-[#020617] border border-white/10 rounded-lg p-2 text-xs text-white focus:border-emerald-500 outline-none"
                                            value={formData.address}
                                            onChange={(e) => handleFormUpdate('address', e.target.value)}
                                        />
                                        <select
                                            className="w-full bg-[#020617] border border-white/10 rounded-lg p-2 text-xs text-slate-300 focus:border-emerald-500 outline-none"
                                            value={formData.service}
                                            onChange={(e) => handleFormUpdate('service', e.target.value)}
                                        >
                                            <option value="">Select Service Type...</option>
                                            <option value="Standard Clean">Standard Clean</option>
                                            <option value="Deep Clean">Deep Clean</option>
                                            <option value="Move In/Out">Move In/Out</option>
                                            <option value="Post-Construction">Post-Construction</option>
                                        </select>
                                        <button
                                            onClick={handleNextStep}
                                            disabled={!formData.address || !formData.service}
                                            className="w-full bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed text-white text-xs font-bold py-2 rounded-lg transition-colors"
                                        >
                                            Next Step
                                        </button>
                                    </div>
                                )}

                                {formStep === 2 && (
                                    <div className="space-y-3">
                                        <input
                                            type="text"
                                            placeholder="Your Name"
                                            className="w-full bg-[#020617] border border-white/10 rounded-lg p-2 text-xs text-white focus:border-emerald-500 outline-none"
                                            value={formData.name}
                                            onChange={(e) => handleFormUpdate('name', e.target.value)}
                                        />
                                        <input
                                            type="text"
                                            placeholder="Phone or Email"
                                            className="w-full bg-[#020617] border border-white/10 rounded-lg p-2 text-xs text-white focus:border-emerald-500 outline-none"
                                            value={formData.contact}
                                            onChange={(e) => handleFormUpdate('contact', e.target.value)}
                                        />
                                        <button
                                            onClick={handleNextStep}
                                            disabled={!formData.name || !formData.contact}
                                            className="w-full bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed text-white text-xs font-bold py-2 rounded-lg transition-colors flex items-center justify-center gap-2"
                                        >
                                            Submit Request <Send className="w-3 h-3" />
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}

                        {isTyping && (
                            <div className="flex justify-start">
                                <div className="bg-[#1E293B] p-3 rounded-2xl rounded-tl-sm flex gap-1 items-center border border-white/5 w-16">
                                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce"></span>
                                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce delay-100"></span>
                                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce delay-200"></span>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Area */}
                    {!showForm && (
                        <div className="p-3 bg-[#0F172A] border-t border-white/5">
                            <div className="relative flex items-center gap-2">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                                    placeholder="Type your message..."
                                    className="flex-1 bg-[#020617] text-white text-sm rounded-xl py-3 pl-4 pr-10 border border-white/10 focus:border-emerald-500/50 focus:outline-none focus:ring-1 focus:ring-emerald-500/50 placeholder-slate-500 transition-all"
                                />
                                <button
                                    onClick={handleSend}
                                    className={`p-3 rounded-xl transition-all ${input.trim() ? 'bg-emerald-600 text-white hover:bg-emerald-500 shadow-lg shadow-emerald-900/20' : 'bg-white/5 text-slate-500 cursor-not-allowed'}`}
                                >
                                    <Send className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* Welcome Bubble */}
            {showBubble && !isOpen && (
                <div
                    onClick={() => {
                        setIsOpen(true);
                        setShowBubble(false);
                    }}
                    className="absolute bottom-20 right-0 w-64 bg-white border border-emerald-500/20 p-4 rounded-2xl rounded-br-sm shadow-[0_10px_40px_rgba(0,0,0,0.3)] cursor-pointer animate-in fade-in zoom-in slide-in-from-bottom-5 duration-500 group/bubble"
                >
                    <div className="flex gap-3">
                        <div className="w-10 h-10 bg-emerald-100 rounded-full flex-shrink-0 flex items-center justify-center">
                            <Shield className="w-6 h-6 text-emerald-600 fill-current opacity-80" />
                        </div>
                        <div>
                            <p className="text-[#020617] text-sm font-bold leading-tight mb-1">Expert Cleaner Online</p>
                            <p className="text-slate-500 text-xs leading-tight">Hi! Claim <span className="text-emerald-600 font-bold">30% OFF</span> your first service today! 🎁</p>
                        </div>
                    </div>
                    {/* Pulsing indicator */}
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white animate-ping"></div>
                </div>
            )}

            {/* Launcher Button */}
            <button
                onClick={() => {
                    setIsOpen(!isOpen);
                    setShowBubble(false);
                }}
                className={`group relative flex items-center justify-center w-16 h-16 bg-emerald-600 hover:bg-emerald-500 rounded-full shadow-[0_0_30px_rgba(16,185,129,0.3)] transition-all hover:scale-110 active:scale-95 z-[100] ${!isOpen && 'animate-gentle-pulse'}`}
            >
                {/* Shield with Eyes Icon (Custom SVG) */}
                <div className={`transition-all duration-500 absolute inset-0 flex items-center justify-center ${isOpen ? 'opacity-0 rotate-90 scale-50' : 'opacity-100 rotate-0 scale-100'}`}>
                    <div className="relative w-8 h-8">
                        <Shield className="w-full h-full text-white fill-current" />
                        {/* Eyes */}
                        <div className="absolute top-[30%] left-[25%] w-[15%] h-[15%] bg-[#020617] rounded-full animate-blink"></div>
                        <div className="absolute top-[30%] right-[25%] w-[15%] h-[15%] bg-[#020617] rounded-full animate-blink delay-75"></div>
                    </div>
                </div>

                <X className={`w-8 h-8 text-white transition-all duration-500 absolute ${isOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-50'}`} />

                {/* Notification Badge */}
                {!isOpen && (
                    <span className="absolute top-1 right-1 w-3.5 h-3.5 bg-red-500 rounded-full border-2 border-[#020617] animate-pulse"></span>
                )}
            </button>

            {/* Global Styles for Animations */}
            <style jsx>{`
                @keyframes blink {
                    0%, 100% { transform: scaleY(1); }
                    50% { transform: scaleY(0.1); }
                }
                .animate-blink {
                    animation: blink 3s infinite;
                }
                @keyframes gentle-pulse {
                    0%, 100% { transform: scale(1); box-shadow: 0 0 30px rgba(16,185,129,0.3); }
                    50% { transform: scale(1.05); box-shadow: 0 0 50px rgba(16,185,129,0.5); }
                }
                .animate-gentle-pulse {
                    animation: gentle-pulse 3s infinite ease-in-out;
                }
                .animate-fade-in { animation: fadeIn 0.5s ease-out; }
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </div>
    );
};

export default CommercialAssistant;
