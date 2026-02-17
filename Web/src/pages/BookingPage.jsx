import React, { useState, useEffect } from 'react';
import { Check, ChevronRight, ChevronLeft, Calendar, User, Home, Building2, MapPin } from 'lucide-react';

const BookingPage = () => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        serviceType: '',
        frequency: 'one-time',
        sqft: '',
        beds: '',
        baths: '',
        date: '',
        time: '',
        name: '',
        cw_email: '', // Honeypot
        email: '',
        phone: '',
        address: '',
        city: 'Acworth',
        zip: ''
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    useEffect(() => {
        document.title = 'Book Your Cleaning | CleanShine Pro Acworth';
        window.scrollTo(0, 0);
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        // Clear error on change
        if (errors[name]) {
            setErrors({ ...errors, [name]: '' });
        }
    };

    const validateStep = (currentStep) => {
        const newErrors = {};
        let isValid = true;

        if (currentStep === 1) {
            if (!formData.serviceType) { newErrors.serviceType = "Please select a service type"; isValid = false; }
        }
        if (currentStep === 2) {
            if (!formData.sqft) { newErrors.sqft = "Square footage is required"; isValid = false; }
            if (formData.serviceType === 'residential' && !formData.beds) { newErrors.beds = "Bedrooms required"; isValid = false; }
            if (formData.serviceType === 'residential' && !formData.baths) { newErrors.baths = "Bathrooms required"; isValid = false; }
        }
        if (currentStep === 3) {
            if (!formData.date) { newErrors.date = "Please select a date"; isValid = false; }
            if (!formData.time) { newErrors.time = "Please selecting a time preference"; isValid = false; }
        }
        if (currentStep === 4) {
            if (!formData.name) { newErrors.name = "Full Name is required"; isValid = false; }
            if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) { newErrors.email = "Valid email is required"; isValid = false; }
            if (!formData.phone) { newErrors.phone = "Phone number is required"; isValid = false; }
            if (!formData.address) { newErrors.address = "Street address is required"; isValid = false; }
            if (!formData.zip) { newErrors.zip = "Zip code is required"; isValid = false; }
        }

        setErrors(newErrors);
        return isValid;
    };

    const nextStep = () => {
        if (validateStep(step)) {
            setStep(step + 1);
            window.scrollTo(0, 0);
        }
    };

    const prevStep = () => {
        setStep(step - 1);
        window.scrollTo(0, 0);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateStep(4)) {
            setIsSubmitting(true);
            // Simulate API call
            setTimeout(() => {
                setIsSubmitting(false);
                setIsSuccess(true);
                window.scrollTo(0, 0);
            }, 1500);
        }
    };

    // Schema.org JSON-LD
    const schemaData = {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": "Residential & Commercial Cleaning",
        "provider": {
            "@type": "LocalBusiness",
            "name": "CleanShine Pro",
            "address": {
                "@type": "PostalAddress",
                "streetAddress": "900 Buice Lake Pkwy",
                "addressLocality": "Acworth",
                "addressRegion": "GA",
                "postalCode": "30102",
                "addressCountry": "US"
            },
            "telephone": "+1-555-012-3456",
            "priceRange": "$$"
        },
        "areaServed": ["Acworth", "Kennesaw", "Marietta", "Woodstock"]
    };

    if (isSuccess) {
        return (
            <div className="min-h-screen pt-24 pb-12 bg-[#020617] text-white flex items-center justify-center">
                <div className="bg-[#0B1121] border border-emerald-500/30 p-8 rounded-2xl max-w-md text-center">
                    <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Check className="w-10 h-10 text-emerald-400" />
                    </div>
                    <h2 className="text-3xl font-bold mb-4">Booking Received!</h2>
                    <p className="text-slate-400 mb-8">Thank you, {formData.name}. We have received your request for {formData.serviceType} cleaning on {formData.date}. Our team will contact you shortly to confirm details.</p>
                    <button onClick={() => window.location.href = '/'} className="px-8 py-3 bg-emerald-600 hover:bg-emerald-500 rounded-lg font-bold transition-all">Return Home</button>
                    {/* Schema Injection */}
                    <script type="application/ld+json">{JSON.stringify(schemaData)}</script>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-24 pb-12 bg-[#020617] text-white">
            <script type="application/ld+json">{JSON.stringify(schemaData)}</script>
            <div className="container mx-auto px-6 max-w-3xl">

                <h1 className="text-3xl md:text-5xl font-bold text-center mb-4">Book Your <span className="text-emerald-400">Clean</span></h1>
                <p className="text-slate-400 text-center mb-10 max-w-xl mx-auto">Complete the form below to get an instant quote and schedule your premium cleaning service.</p>

                {/* Progress Bar */}
                <div className="flex justify-between mb-8 relative">
                    <div className="absolute top-1/2 left-0 w-full h-1 bg-white/5 -z-10 transform -translate-y-1/2"></div>
                    <div className="absolute top-1/2 left-0 h-1 bg-emerald-500 -z-10 transform -translate-y-1/2 transition-all duration-500" style={{ width: `${((step - 1) / 3) * 100}%` }}></div>
                    {[1, 2, 3, 4].map(num => (
                        <div key={num} className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm border-2 transition-all duration-300 bg-[#020617] ${step >= num ? 'border-emerald-500 text-emerald-400' : 'border-white/10 text-slate-600'}`}>
                            {step > num ? <Check className="w-5 h-5" /> : num}
                        </div>
                    ))}
                </div>

                <div className="bg-[#0B1121] border border-white/5 p-8 rounded-2xl shadow-2xl">

                    {/* Step 1: Service Type */}
                    {step === 1 && (
                        <div className="animate-fade-in-up">
                            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3"><Building2 className="text-emerald-500" /> Select Service Type</h3>
                            <div className="grid md:grid-cols-2 gap-4">
                                {['Residential Standard', 'Residential Deep Clean', 'Move-In / Move-Out', 'Commercial Office'].map(type => (
                                    <label key={type} className={`cursor-pointer border p-6 rounded-xl flex flex-col items-center justify-center gap-3 transition-all ${formData.serviceType === type ? 'border-emerald-500 bg-emerald-500/10' : 'border-white/10 hover:border-emerald-500/30 hover:bg-white/5'}`}>
                                        <input
                                            type="radio"
                                            name="serviceType"
                                            value={type}
                                            checked={formData.serviceType === type}
                                            onChange={handleChange}
                                            className="hidden"
                                        />
                                        <span className={`font-bold ${formData.serviceType === type ? 'text-emerald-400' : 'text-slate-300'}`}>{type}</span>
                                    </label>
                                ))}
                            </div>
                            {errors.serviceType && <p className="text-red-500 text-sm mt-2">{errors.serviceType}</p>}
                        </div>
                    )}

                    {/* Step 2: Property Details */}
                    {step === 2 && (
                        <div className="animate-fade-in-up">
                            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3"><Home className="text-emerald-500" /> Property Details</h3>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-slate-400 text-sm mb-2">Square Footage</label>
                                    <input type="number" name="sqft" value={formData.sqft} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-emerald-500 transition-colors text-white" placeholder="e.g. 2500" />
                                    {errors.sqft && <p className="text-red-500 text-sm mt-1">{errors.sqft}</p>}
                                </div>
                                <div>
                                    <label className="block text-slate-400 text-sm mb-2">Frequency</label>
                                    <select name="frequency" value={formData.frequency} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-emerald-500 transition-colors text-white">
                                        <option className="bg-[#0B1121] text-white" value="one-time">One-Time Clean</option>
                                        <option className="bg-[#0B1121] text-white" value="weekly">Weekly (Save 20%)</option>
                                        <option className="bg-[#0B1121] text-white" value="bi-weekly">Bi-Weekly (Save 15%)</option>
                                        <option className="bg-[#0B1121] text-white" value="monthly">Monthly (Save 10%)</option>
                                    </select>
                                </div>
                                {formData.serviceType.includes('Residential') && (
                                    <>
                                        <div>
                                            <label className="block text-slate-400 text-sm mb-2">Bedrooms</label>
                                            <select name="beds" value={formData.beds} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-emerald-500 transition-colors text-white">
                                                <option className="bg-[#0B1121] text-white" value="">Select...</option>
                                                {[1, 2, 3, 4, 5, 6].map(n => <option className="bg-[#0B1121] text-white" key={n} value={n}>{n} Beds</option>)}
                                            </select>
                                            {errors.beds && <p className="text-red-500 text-sm mt-1">{errors.beds}</p>}
                                        </div>
                                        <div>
                                            <label className="block text-slate-400 text-sm mb-2">Bathrooms</label>
                                            <select name="baths" value={formData.baths} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-emerald-500 transition-colors text-white">
                                                <option className="bg-[#0B1121] text-white" value="">Select...</option>
                                                {[1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5].map(n => <option className="bg-[#0B1121] text-white" key={n} value={n}>{n} Baths</option>)}
                                            </select>
                                            {errors.baths && <p className="text-red-500 text-sm mt-1">{errors.baths}</p>}
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Step 3: Scheduling */}
                    {step === 3 && (
                        <div className="animate-fade-in-up">
                            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3"><Calendar className="text-emerald-500" /> When do you need us?</h3>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-slate-400 text-sm mb-2">Preferred Date</label>
                                    <input type="date" name="date" value={formData.date} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-emerald-500 transition-colors text-white [color-scheme:dark]" />
                                    {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date}</p>}
                                </div>
                                <div>
                                    <label className="block text-slate-400 text-sm mb-2">Preferred Time Window</label>
                                    <select name="time" value={formData.time} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-emerald-500 transition-colors text-white">
                                        <option className="bg-[#0B1121] text-white" value="">Select...</option>
                                        <option className="bg-[#0B1121] text-white" value="morning">Morning (8am - 12pm)</option>
                                        <option className="bg-[#0B1121] text-white" value="afternoon">Afternoon (12pm - 4pm)</option>
                                        <option className="bg-[#0B1121] text-white" value="flexible">Flexible</option>
                                    </select>
                                    {errors.time && <p className="text-red-500 text-sm mt-1">{errors.time}</p>}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Step 4: Contact Info */}
                    {step === 4 && (
                        <div className="animate-fade-in-up">
                            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3"><User className="text-emerald-500" /> Your Details</h3>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="md:col-span-2">
                                    <label className="block text-slate-400 text-sm mb-2">Full Name</label>
                                    <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-emerald-500 transition-colors text-white" />
                                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                                </div>
                                <div>
                                    <label className="block text-slate-400 text-sm mb-2">Email Address</label>
                                    <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-emerald-500 transition-colors text-white" />
                                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                                </div>
                                <div>
                                    <label className="block text-slate-400 text-sm mb-2">Phone Number</label>
                                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-emerald-500 transition-colors text-white" />
                                    {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-slate-400 text-sm mb-2">Street Address</label>
                                    <div className="relative">
                                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
                                        <input type="text" name="address" value={formData.address} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-lg pl-12 pr-4 py-3 focus:outline-none focus:border-emerald-500 transition-colors text-white" placeholder="123 Main St" />
                                    </div>
                                    {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
                                </div>
                                <div>
                                    <label className="block text-slate-400 text-sm mb-2">City</label>
                                    <input type="text" name="city" value={formData.city} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-emerald-500 transition-colors text-white" readOnly />
                                </div>
                                <div>
                                    <label className="block text-slate-400 text-sm mb-2">Zip Code</label>
                                    <input type="text" name="zip" value={formData.zip} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-emerald-500 transition-colors text-white" placeholder="30101" />
                                    {errors.zip && <p className="text-red-500 text-sm mt-1">{errors.zip}</p>}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Navigation Buttons */}
                    <div className="flex justify-between mt-8 pt-6 border-t border-white/5">
                        {step > 1 ? (
                            <button onClick={prevStep} className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors font-medium">
                                <ChevronLeft className="w-5 h-5" /> Back
                            </button>
                        ) : <div></div>}

                        {step < 4 ? (
                            <button onClick={nextStep} className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-8 py-3 rounded-lg font-bold transition-all shadow-lg shadow-emerald-900/20">
                                Next Step <ChevronRight className="w-5 h-5" />
                            </button>
                        ) : (
                            <button onClick={handleSubmit} disabled={isSubmitting} className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-8 py-3 rounded-lg font-bold transition-all shadow-lg shadow-emerald-900/20 disabled:opacity-50 disabled:cursor-not-allowed">
                                {isSubmitting ? 'Processing...' : 'Complete Booking'} <Check className="w-5 h-5" />
                            </button>
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
};

export default BookingPage;
