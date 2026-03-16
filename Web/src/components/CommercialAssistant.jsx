import React, { useState, useRef, useEffect } from 'react';
import { Shield, X, Send, ChevronRight, Check } from 'lucide-react';
import { getGeminiResponse, getGeminiBookingResponse } from '../services/gemini';

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

    const [bookingContext, setBookingContext] = useState(null);

    useEffect(() => {
        let bubbleTimer;
        if (!isOpen) {
            // bubbleTimer = setTimeout(() => {
            //     setShowBubble(true);
            // }, 3000);
        }

        const handleOpenContext = (e) => {
            const { context, formData, estimate } = e.detail;
            setIsOpen(true);
            setShowBubble(false);
            if (bubbleTimer) clearTimeout(bubbleTimer);
            setBookingContext({ formData, estimate });

            setMessages([
                {
                    type: 'bot',
                    text: `I've analyzed your ${formData.sqft} sqft property! The estimate of $${estimate.min} - $${estimate.max} reflects our premium hospital-grade standards. How can I help you finalize? I can show you exactly what's included, estimate the duration, or add extra services like inside the fridge or oven!`
                }
            ]);
            setQuickActions(["What's included?", "How long will it take?", "Add Extra Services", "Our Guarantee"]);
        };

        window.addEventListener('open-shine-chat', handleOpenContext);

        return () => {
            if (bubbleTimer) clearTimeout(bubbleTimer);
            window.removeEventListener('open-shine-chat', handleOpenContext);
        };
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

        // --- LOCAL SALES BRAIN (No API Dependency) ---
        const salesBrain = {
            keywords: {
                inclusions: ['included', 'include', 'incluye', 'que trae', 'ofrecen', 'tareas', 'checklist'],
                pricing: ['price', 'cost', 'precio', 'cuanto', 'valor', 'rate', 'estimate', 'cotizacion'],
                duration: ['time', 'long', 'tiempo', 'duracion', 'tarda', 'horas'],
                extras: ['extra', ' fridge', ' oven', 'nevera', 'horno', 'adicional'],
                trust: ['trust', 'insurance', 'seguro', 'background', 'safe', 'confianza', 'liability', 'guarantee', 'garantía'],
                payments: ['pay', 'deposit', 'zelle', 'tarjeta', 'pago', 'depositar', 'transferencia'],
                location: ['area', 'where', 'donde', 'woodstock', 'atlanta', 'kennesaw', 'city']
            },
            responses: {
                inclusions: (service) => {
                    let text = `Nuestro servicio de **${service || 'Limpieza'}** es de grado hospitalario e incluye: \n\n`;
                    if (service?.includes("Standard")) text += "• Aspirado de alta potencia y trapeado con desinfectantes EPA.\n• Desinfección completa de baños (toilete, ducha, espejos).\n• Limpieza de exteriores de electrodomésticos y encimeras de cocina.\n• Limpieza profunda de polvo en todas las superficies.\n• Recogida de basura y tendido de camas.";
                    else if (service?.includes("Deep")) text += "• **TODO lo del Standard PLUS:**\n• Limpieza detallada de zócalos (baseboards) a mano.\n• Interior de microondas y desengrasado de estufa.\n• Limpieza de rieles de ventanas y marcos de puertas.\n• Fregado de azulejos y eliminación de depósitos de calcio.\n• Limpieza profunda detrás de muebles ligeros.";
                    else if (service?.includes("Airbnb")) text += "• **Turnover Pro:** Limpieza profunda post-huésped.\n• Lavandería pro (lavado/secado/doblado).\n• Staging de hotel para reseñas 5 estrellas.\n• Reporte de daños inmediato con fotos.\n• Reposición de suministros y desinfección de puntos de alto contacto.";
                    else if (service?.includes("Medical")) text += "• Esterilización grado hospitalario.\n• Control estricto de contaminación cruzada.\n• Desinfección de salas de espera y consultorios.\n• Documentación de limpieza para cumplimiento normativo.";
                    else if (service?.includes("Construction")) text += "• Extracción industrial de polvo fino.\n• Remoción de adhesivos, pintura y residuos de cemento.\n• Limpieza interior de gabinetes y cajones.\n• Pulido final de accesorios y tuberías externas.";
                    else text += "• Desinfección de grado hospitalario.\n• Cuidado experto de suelos y superficies.\n• Protocolos certificados de higiene.";
                    return text;
                },
                pricing: (min, max) => `Nuestra tarifa de **$${min} - $${max}** incluye un margen del 35% que garantiza el uso de supervisores certificados y químicos de grado hospitalario. No somos los más baratos, somos los mejores.`,
                duration: (hMin, hMax, sqft, service) => {
                    let ratio = 1200;
                    if (service?.includes('Medical')) ratio = 1500;
                    else if (service?.includes('Construction')) ratio = 800;
                    else if (service?.includes('Office')) ratio = 3500;

                    const est = Math.ceil(sqft / ratio);
                    return `Para su espacio de **${sqft} sqft**, estimamos una ejecución de **${Math.max(2, est)} a ${est + 2} horas**, utilizando un equipo de mínimo 2 profesionales.`;
                },
                extras: "Añada valor con nuestros Premium Extras:\n• **Nevera/Horno**: $35 c/u (Sanitizado Profundo)\n• **Gabinetes**: $45 (Interior detallado)\n• **Persianas**: $30 (Cuidado húmedo)",
                trust: "Limpiamos con confianza: Seguro de **$5M**, garantía de satisfacción 24h y personal 100% verificado. Si no está perfecto, volvemos GRATIS.",
                payments: "Para confirmar su espacio en la agenda, solicitamos un **depósito profesional del 35%**. Aceptamos Zelle, Tarjeta y Transferencia. ¿Le gustaría los datos de pago?",
                location: "Estamos basados en **Woodstock**. Para servicios a más de 30 millas, aplicamos un cargo de transporte de $15 + 50% de tiempo de viaje para proteger el salario de nuestro equipo."
            }
        };

        const closingPitch = "\n\n**¿Desea asegurar su reserva ahora con el depósito del 35% para bloquear su fecha en nuestro calendario?**";

        // Logic Process
        setTimeout(async () => {
            let responseText = "";
            const msg = userMsg.toLowerCase();
            const service = bookingContext?.formData?.serviceType;
            const sqft = parseInt(bookingContext?.formData?.sqft) || 1200;
            const beds = parseInt(bookingContext?.formData?.beds) || 0;
            const extrasCount = bookingContext?.formData?.extras?.length || 0;

            if (salesBrain.keywords.inclusions.some(k => msg.includes(k))) responseText = salesBrain.responses.inclusions(service);
            else if (salesBrain.keywords.duration.some(k => msg.includes(k))) {
                responseText = salesBrain.responses.duration(0, 0, sqft, service);
            }
            else if (salesBrain.keywords.pricing.some(k => msg.includes(k))) {
                const min = bookingContext?.estimate?.min || "...";
                const max = bookingContext?.estimate?.max || "...";
                responseText = salesBrain.responses.pricing(min, max);
            }
            else if (salesBrain.keywords.extras.some(k => msg.includes(k))) responseText = salesBrain.responses.extras;
            else if (salesBrain.keywords.trust.some(k => msg.includes(k))) responseText = salesBrain.responses.trust;
            else if (salesBrain.keywords.payments.some(k => msg.includes(k))) responseText = salesBrain.responses.payments;
            else if (salesBrain.keywords.location.some(k => msg.includes(k))) responseText = salesBrain.responses.location;

            if (responseText) {
                setMessages(prev => [...prev, { type: 'bot', text: responseText + closingPitch }]);
                setIsTyping(false);
                return;
            }

            // Fallback strategy: If Gemini fails or shows an error, show a custom professional fallback instead
            try {
                let aiText;
                if (bookingContext) {
                    aiText = await getGeminiBookingResponse(userMsg, bookingContext.formData, messages);
                } else {
                    aiText = await getGeminiResponse(userMsg, messages);
                }

                // Silencing Technical Errors for the User
                if (aiText.includes('AI Error') || aiText.includes('Offline')) {
                    throw new Error("API Limit");
                }

                if (aiText.includes('[[SHOW_FORM]]')) {
                    setShowForm(true);
                    aiText = aiText.replace('[[SHOW_FORM]]', '').trim();
                }

                setMessages(prev => [...prev, { type: 'bot', text: aiText + (bookingContext ? closingPitch : "") }]);
            } catch (error) {
                setMessages(prev => [...prev, { type: 'bot', text: "Entendido. Como experto, mi recomendación es que bloqueemos su fecha ahora mismo con el depósito del 35% para asegurar el mejor equipo disponible. ¿Procedemos con los detalles del pago?" }]);
            } finally {
                setIsTyping(false);
            }
        }, 600);
    };

    const handleFormUpdate = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        if (field === 'type') setFormStep(1); // Auto-advance on type selection
    };

    const handleNextStep = () => {
        if (formStep < 2) setFormStep(prev => prev + 1);
        else handleSubmitForm();
    };

    const handleSubmitForm = async () => {
        setIsTyping(true);
        try {
            await fetch("https://formsubmit.co/ajax/contact@cleanshinepro.com", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                    ...formData,
                    _subject: `AI ASSISTANT LEAD: ${formData.type} - ${formData.name}`,
                    _template: "table"
                }),
            });

            setMessages(prev => [...prev, { type: 'bot', text: `Thanks ${formData.name}! We've received your ${formData.type} request for ${formData.address}. A specialist will contact you at ${formData.contact} shortly!` }]);
        } catch (error) {
            setMessages(prev => [...prev, { type: 'bot', text: "I've saved your details but had a small issue sending the notification. Our team will contact you soon!" }]);
        } finally {
            setIsTyping(false);
            setShowForm(false);
            setFormData({ type: '', address: '', service: '', name: '', contact: '' });
            setFormStep(0);
        }
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
            <style>{`
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
