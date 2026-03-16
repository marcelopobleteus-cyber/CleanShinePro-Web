import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
    Calendar, Clock, Check, ChevronRight, ChevronLeft,
    Home, Building2, Sparkles, MapPin, User, BarChart3, Bot, Shield, ListChecks, Package,
    ShieldCheck, FileText, Lock, Zap, Layers
} from 'lucide-react';
import { calculateSTREngine, STR_ADDONS } from '../engines/short_term_rental_engine';


const serviceEngines = {
    residential: {
        id: 'residential',
        title: 'Residential',
        icon: Home,
        desc: 'Premium home cleaning for families and individuals.',
        subcategories: {
            'standard': {
                id: 'standard',
                title: 'Premium Standard Cleaning',
                desc: 'Regular maintenance for a healthy, dust-free home environment.',
                features: ['All Surfaces Dusted', 'Vacuum & Mop', 'Detailed Restrooms', 'Kitchen Externals', 'Trash Removal'],
                checklist: [
                    'Dusting all furniture and accessible surfaces',
                    'Vacuuming carpets and mopping hard floors',
                    'Cleaning and disinfecting bathrooms (toilet, shower, sinks)',
                    'Cleaning exterior of kitchen appliances and countertops',
                    'Emptying trash bins and replacing liners',
                    'Basic organization and making beds'
                ]
            },
            'deep': {
                id: 'deep',
                title: 'Full Deep Sanitize',
                desc: 'Detailed restoration for homes that need extra attention.',
                features: ['Baseboards Wiped', 'Inside Oven/Fridge', 'Window Tracks', 'Vents & Grills', 'Heavy Grout Scrub'],
                checklist: [
                    'Everything in Standard Cleaning PLUS:',
                    'Hand-wiping all baseboards and door frames',
                    'Cleaning interior of oven and microwave',
                    'Detailing window tracks and sills',
                    'Scrubbing tile grout in bathrooms and kitchens',
                    'Deep cleaning behind light-moveable furniture'
                ]
            },
            'move_out': {
                id: 'move_out',
                title: 'Move-In / Move-Out',
                desc: 'Comprehensive turnover cleaning for empty properties.',
                features: ['Inside All Cabinets', 'Baseboards & Trim', 'Closet Detailing', 'Wall Spotting', 'Appliance Deep Clean'],
                checklist: [
                    'Deep cleaning of all empty rooms and closets',
                    'Wiping inside all kitchen and bathroom cabinets',
                    'Detailing all baseboards, door frames, and window sills',
                    'Cleaning interior of all major appliances',
                    'Removing dust and cobwebs from high ceilings and fans',
                    'Sweeping, mopping, and vacuuming all floor surfaces'
                ]
            }

        }
    },
    commercial: {
        id: 'commercial',
        title: 'Commercial',
        icon: Building2,
        desc: 'Professional grade sanitation for workspaces and facilities.',
        subcategories: {
            'office': {
                id: 'office',
                title: 'Pro Office Sanitation',
                desc: 'Daily or periodic maintenance for high-productivity workspaces.',
                features: ['Workstation Disinfection', 'Restroom Sanitation', 'Lobby Detailing', 'Trash Management', 'Floor Care'],
                checklist: [
                    'Disinfecting all workstations and high-touch points',
                    'Sanitizing restrooms and replenishing soaps/paper',
                    'Cleaning reception area and conference rooms',
                    'Floor Care (Vacuuming/Mopping)',
                    'Emptying trash and recycling bins',
                    'Cleaning breakroom area and kitchenette'
                ]
            },
            'medical': {
                id: 'medical',
                title: 'Medical Grade Sterilization',
                desc: 'Terminal cleaning standards with hospital-grade disinfectants.',
                features: ['Sterilization Protocols', 'Waiting Area Detail', 'Exam Room Prep', 'Bio-Hazard Safety', 'Zero Cross-Contamination'],
                checklist: [
                    'Hospital-grade sterilization of all surfaces',
                    'High-level disinfection of waiting and exam rooms',
                    'Strict adherence to cross-contamination prevention',
                    'Specialized floor care and antimicrobial treatment',
                    'Sanitization of medical-grade furniture and equipment bases',
                    'Documentation of cleaning for compliance'
                ]
            },
            'retail': {
                id: 'retail',
                title: 'Retail & Showrooms',
                desc: 'Floor polishing and dust-free environments for luxury displays.',
                features: ['Floor Buffing', 'Glass & Mirror Detail', 'Fitting Room Sanitize', 'Display Dusting', 'Aesthetic Polish'],
                checklist: [
                    'Expert floor buffing and high-gloss polishing',
                    'Detailing glass windows, mirrors, and displays',
                    'Daily maintenance for high-traffic retail areas',
                    'Sanitizing fitting rooms and checkout counters',
                    'Dust-free cleaning for luxury merchandise displays',
                    'Entrance area debris and dust control'
                ]
            },
            'construction': {
                id: 'construction',
                title: 'Post-Construction',
                desc: 'Heavy debris removal and fine dust detailing for occupancy.',
                features: ['Fine Dusting', 'Debris Removal', 'Sticker Removal', 'Window Detailing', 'HVAC Vent Cleaning'],
                checklist: [
                    'Three-phase construction cleaning (Rough, Light, Final)',
                    'Industrial-grade fine dust extraction from all surfaces',
                    'Removing adhesive, paint splatters, and cement residue',
                    'Detailing inside all cabinets and drawers',
                    'Cleaning HVAC vents and ceiling fixtures',
                    'Final polish of all fixtures and hardware'
                ]
            }
        }
    },
    short_term: {
        id: 'short_term',
        title: 'Short-Term Rental',
        icon: Sparkles,
        desc: 'Specialized turnover for Airbnb and vacation rentals.',
        subcategories: {
            'airbnb': {
                id: 'airbnb',
                title: 'Airbnb Specialist Turnover',
                desc: 'Hotel-standard staging and deep disinfection for 5-star reviews.',
                features: ['Laundry Service', 'Amenity Restock', 'Damage Report', 'Pro Bed Staging', 'High-Touch Sanitization'],
                checklist: [
                    'Complete turnover cleaning and sanitization',
                    'Washing and drying linens and towels',
                    'Professional bed making and towel staging',
                    'Restocking guest essentials (toiletries, coffee, etc.)',
                    'Visual inspection and damage reporting with photos',
                    'Interior fridge cleaning included'
                ]
            }
        }
    }
};


const BookingPage = () => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        mainService: '',
        subService: '',
        sqft: '',
        beds: '',
        baths: '',
        frequency: 'one-time',
        date: '',
        time: '',
        name: '',
        email: '',
        phone: '',
        address: '',
        city: 'Woodstock',
        zip: '',
        distance: '0',
        basementType: 'none',
        levels: 1,
        extras: [],
        quoteMode: 'SQFT', // 'SQFT' or 'AREAS'
        roomSelection: {
            kitchen: 1,
            fullBath: 1,
            halfBath: 0,
            living: 1,
            bed: 1,
            office: 0,
            stairs: 0
        }
    });

    const [errors, setErrors] = useState({});
    const [estimatedPrice, setEstimatedPrice] = useState(null);
    const [isCalculating, setIsCalculating] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [subServiceInfo, setSubServiceInfo] = useState(null);
    const [diagnostics, setDiagnostics] = useState(null);
    const [strAddons, setStrAddons] = useState([]); // STR-specific add-ons
    const [timeLeft, setTimeLeft] = useState(7200);
    const [isRecurringConverted, setIsRecurringConverted] = useState(false);
    const [isPaid, setIsPaid] = useState(false);
    const [quoteId] = useState(`CSP-${Math.floor(Date.now() / 1000).toString().slice(-6)}`);
    const [acceptedTerms, setAcceptedTerms] = useState(false);
    const [isEmailVerified, setIsEmailVerified] = useState(false);
    const [hasCompletedBooking, setHasCompletedBooking] = useState(false);
    const [quoteCount, setQuoteCount] = useState(0);
    const [isVerifying, setIsVerifying] = useState(false);
    const calculationTimer = useRef(null);




    useEffect(() => {
        if (formData.mainService && formData.subService) {
            const info = serviceEngines[formData.mainService]?.subcategories[formData.subService];
            setSubServiceInfo(info || null);
        }
    }, [formData.mainService, formData.subService]);

    useEffect(() => {
        if (step === 6) {
            track_event("booking_step_6_loaded");
            const timer = setInterval(() => {
                setTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [step]);

    const formatTime = (seconds) => {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = seconds % 60;
        return `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    const track_event = (name) => {
        console.log(`[Metric] Event: ${name}`, {
            time: new Date().toISOString(),
            formData: { ...formData, price: estimatedPrice?.total }
        });
    };



    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: null }));
        }
    };

    const validateStep = (currentStep) => {
        let newErrors = {};
        let isValid = true;

        if (currentStep === 1) {
            if (!formData.mainService) { newErrors.mainService = "Please select a service engine"; isValid = false; }
        }
        if (currentStep === 2) {
            if (!formData.subService) { newErrors.subService = "Please select a specialization"; isValid = false; }
        }
        if (currentStep === 3) {
            if (formData.quoteMode === 'AREAS' && formData.mainService === 'residential') {
                const roomCount = Object.values(formData.roomSelection).reduce((a, b) => a + b, 0);
                if (roomCount === 0) {
                    newErrors.rooms = "Please select at least one area to clean";
                    isValid = false;
                }
            } else {
                if (!formData.sqft || formData.sqft < 100) { newErrors.sqft = "Valid square footage required (min 100)"; isValid = false; }
                if (formData.mainService === 'residential' || formData.mainService === 'short_term') {
                    if (!formData.beds) { newErrors.beds = "Bedrooms required"; isValid = false; }
                    if (!formData.baths) { newErrors.baths = "Bathrooms required"; isValid = false; }
                }
            }
        }
        if (currentStep === 4) {
            if (!formData.date) { newErrors.date = "Please select a date"; isValid = false; }
            if (!formData.time) { newErrors.time = "Please selecting a time preference"; isValid = false; }
        }
        if (currentStep === 6) {
            if (!formData.name) { newErrors.name = "Full Name is required"; isValid = false; }
            if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) { newErrors.email = "Valid email is required"; isValid = false; }
            if (!formData.phone) { newErrors.phone = "Phone number is required"; isValid = false; }
            if (!formData.address) { newErrors.address = "Street address is required"; isValid = false; }
        }

        setErrors(newErrors);
        return isValid;
    };

    const residential_engine = (config) => {
        const { sqft, beds, baths, subType, isRecurring, extras = [], basementType = 'none', quoteMode = 'SQFT', roomSelection = {} } = config;

        // Hour-Based Add-On Engine (Mapped for UI compatibility)
        const addOnLaborMap = {
            oven: 0.6,
            fridge: 0.5,
            cabinets: 0.8,
            blinds: 1.2,
            windows: 1.5,
            pet_light: 0.3,
            pet_heavy: 0.8,
            laundry: 0.7,
            organizing: 0.5,
            sofa: 0.8
        };

        const addOnEquipmentCost = {
            sofa: 15,
            carpet: 20
        };

        let addonHours = 0;
        let equipmentFees = 0;
        let matsMultiplier = 1.0;

        extras.forEach(id => {
            if (addOnLaborMap[id]) addonHours += addOnLaborMap[id];
            if (addOnEquipmentCost[id]) equipmentFees += addOnEquipmentCost[id];
            if (id === 'pet_heavy') matsMultiplier = 1.03;
        });

        // PRE-CALCULATE SQFT HOURS FOR CEILING CROSS-VALIDATION
        let prod = 190;
        if (subType === 'deep') prod = 140;
        else if (subType === 'move_out') prod = 145;
        else if (subType === 'construction') prod = 110;
        else if (isRecurring) prod = 220;

        const bedroom_factor = 0.10;
        const bathroom_factor = 0.30;
        const baseH_sqft = (parseFloat(sqft) || 1000) / prod;
        const sqftHoursThreshold = baseH_sqft + (beds * bedroom_factor) + (baths * bathroom_factor) + addonHours;

        let totalH = 0;
        let baseLaborHours = 0;
        let engineName = 'Residential Engine (SqFt Model)';

        if (quoteMode === 'AREAS') {
            engineName = 'Residential Engine (Area-Based Model)';
            const roomTimes = {
                kitchen: subType === 'deep' ? 1.5 : 0.8,
                fullBath: subType === 'deep' ? 1.0 : 0.6,
                halfBath: subType === 'deep' ? 0.5 : 0.3,
                living: subType === 'deep' ? 0.8 : 0.6,
                bed: subType === 'deep' ? 0.6 : 0.3,
                office: subType === 'deep' ? 0.6 : 0.3,
                stairs: subType === 'deep' ? 0.3 : 0.2
            };

            let roomHours = 0;
            Object.keys(roomSelection).forEach(room => {
                roomHours += (roomSelection[room] || 0) * (roomTimes[room] || 0);
            });

            const setupFee = 0.5;
            baseLaborHours = roomHours + setupFee + addonHours;

            // RULE C: Minimum Protection (2.5h)
            if (baseLaborHours < 2.5) baseLaborHours = 2.5;

            // RULE D: Cross-Validation (SqFt Ceiling)
            if (baseLaborHours > sqftHoursThreshold) {
                baseLaborHours = sqftHoursThreshold;
            }

            totalH = baseLaborHours;
        } else {
            totalH = sqftHoursThreshold;

            // Basement Structural Modifier
            if (basementType === 'finished') {
                totalH *= 1.05;
            } else if (basementType === 'unfinished') {
                totalH *= 1.02;
            }
            baseLaborHours = totalH;
        }

        // STRATEGIC MARGIN ADJUSTMENT v2
        let margin = 0.23; // Default One-Time (Deep, Standard, Move-Out)

        if (isRecurring) {
            // Rotational / Essentials or Recurring Full House
            margin = (quoteMode === 'AREAS') ? 0.30 : 0.28;
        }

        return {
            laborHours: totalH,
            base_labor_hours: baseLaborHours.toFixed(2),
            basement_adjusted_hours: totalH.toFixed(2),
            materialsPercent: 0.08 * matsMultiplier,
            margin: margin,
            engineName,
            fixedFees: equipmentFees
        };
    };



    const commercial_engine = (config) => {
        const { sqft, subType, isRecurring } = config;
        let prod = 350;
        let mats = 0.07;
        let margin = isRecurring ? 0.30 : 0.25;

        if (subType === 'medical') { prod = 250; mats = 0.12; }
        else if (subType === 'retail') { prod = 300; mats = 0.08; }
        else if (subType === 'construction') { prod = 120; mats = 0.15; }

        return {
            laborHours: sqft / prod,
            materialsPercent: mats,
            margin: margin,
            engineName: 'Commercial Engine'
        };
    };

    const airbnb_engine = (config, addonsOverride = null) => {
        const selectedAddons = addonsOverride !== null ? addonsOverride : strAddons;
        return calculateSTREngine({ ...config, selectedAddons });
    };

    const calculateAdvancedEstimate = useCallback((dataOverride = null) => {
        const data = dataOverride || formData;
        setIsCalculating(true);

        if (calculationTimer.current) clearTimeout(calculationTimer.current);

        calculationTimer.current = setTimeout(async () => {
            // 🛡️ SECURITY LAYER: Backend Authority Synchronization
            const syncBackend = async () => {
                try {
                    const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/generate-estimate-csp`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`
                        },
                        body: JSON.stringify({
                            formData: data,
                            email: data.email,
                            isEmailVerified: isEmailVerified
                        })
                    });
                    const result = await response.json();
                    if (result.error) {
                        setErrors(prev => ({ ...prev, general: result.error }));
                        return null;
                    }
                    return result;
                } catch (e) {
                    console.warn("Pricing logic disconnected from backend authority.");
                    return null;
                }
            };

            const serverResult = await syncBackend();

            const { mainService, subService, sqft, beds, baths, frequency, extras, basementType, levels, distance, address } = data;
            const isRecurring = frequency !== 'one-time';
            const sqftNum = parseInt(sqft) || 0;
            const bedCount = parseInt(beds) || 0;
            const bathCount = parseFloat(baths) || 0;

            const BASE_WAGE = 19;
            const REAL_HOURLY_COST = BASE_WAGE * 1.12;
            const OVERHEAD_RATE = 0.15;

            let engineResult;
            const config = {
                sqft: sqftNum,
                beds: bedCount,
                baths: bathCount,
                subType: subService,
                isRecurring,
                extras,
                basementType: basementType,
                levels: levels || 1,
                quoteMode: data.quoteMode,
                roomSelection: data.roomSelection
            };

            // SEPARATE ENGINES AT TOP LEVEL
            switch (mainService) {
                case 'residential':
                    engineResult = residential_engine(config);
                    break;
                case 'commercial':
                    engineResult = commercial_engine(config);
                    break;
                case 'short_term':
                    engineResult = airbnb_engine(config, data.strAddonsOverride ?? null);
                    break;
                default:
                    engineResult = { laborHours: 0, materialsPercent: 0, margin: 0.25, engineName: 'Generic' };
            }

            let { laborHours, materialsPercent, margin, engineName, fixedFees = 0, basementLabel = "" } = engineResult;

            // Enforce Minimums
            if (sqftNum > 1500 && laborHours < 1) {
                laborHours = 1.5;
            }

            // Extra Services (Legacy fixed fee bypass for Residential)
            let optionalFees = fixedFees;
            if (mainService !== 'residential') {
                extras.forEach(extraId => {
                    if (extraId === 'fridge') optionalFees += 35;
                    if (extraId === 'oven') optionalFees += 35;
                    if (extraId === 'cabinets') optionalFees += 45;
                    if (extraId === 'blinds') optionalFees += 30;
                });
            }


            // Crew Logic (Startup Capacity Optimized)
            let crewSize = 1;
            if (mainService === 'residential') {
                const duration_if_3 = laborHours / 3;
                if (duration_if_3 >= 3.5 && duration_if_3 <= 4.5) {
                    crewSize = 3;
                } else if (duration_if_3 > 4.5) {
                    crewSize = 4;
                } else if (duration_if_3 < 3.0) {
                    crewSize = 2;
                } else {
                    crewSize = 3; // Default preference
                }
                // Capacity Cap
                if (crewSize > 4) crewSize = 4;
            } else {
                // Determine initial crew size for STR/Commercial
                let initialLaborEstimate = laborHours;
                if (mainService === 'short_term') {
                    // For STR, we pre-calculate based on Sqft and Buffers to get the right scaling
                    const personHours = (sqftNum / 300) + 1.0; // 1.0 is ~total buffers
                    initialLaborEstimate = personHours;
                }

                if (initialLaborEstimate <= 3) {
                    crewSize = 1;
                } else if (initialLaborEstimate <= 6) {
                    crewSize = 2;
                } else {
                    crewSize = Math.ceil(initialLaborEstimate / 3);
                }

                // If STR, re-run engine with the determined crewSize for final adjustment
                // CRITICAL: must pass strAddonsOverride to avoid stale closure bug
                if (mainService === 'short_term') {
                    engineResult = airbnb_engine({ ...config, crewSize }, data.strAddonsOverride ?? null);
                    laborHours = engineResult.laborHours;
                }
            }
            const durationHours = laborHours / crewSize;

            // 3️⃣ ZONE-BASED MARGIN MODIFIER
            const ZIP_ZONES = {
                '30188': 'ZONE_BASE', '30189': 'ZONE_BASE', '30101': 'ZONE_BASE', '30102': 'ZONE_BASE',
                '30075': 'ZONE_PREMIUM', '30076': 'ZONE_PREMIUM', '30062': 'ZONE_PREMIUM', '30067': 'ZONE_PREMIUM', '30068': 'ZONE_PREMIUM',
                '30114': 'ZONE_PRICE_SENSITIVE', '30115': 'ZONE_PRICE_SENSITIVE', '30107': 'ZONE_PRICE_SENSITIVE'
            };

            const userZip = data.zip || '30188';
            const zone = ZIP_ZONES[userZip] || 'ZONE_BASE';
            let zoneModifier = 0;
            if (zone === 'ZONE_PREMIUM') zoneModifier = 0.03;
            else if (zone === 'ZONE_PRICE_SENSITIVE') zoneModifier = -0.02;

            const finalCalculatedMargin = margin + zoneModifier;

            const laborCost = laborHours * REAL_HOURLY_COST;
            const materials = laborCost * materialsPercent;
            const overhead = laborCost * OVERHEAD_RATE;

            const operatingCost = laborCost + materials + overhead + optionalFees;
            const basePrice = operatingCost / (1 - finalCalculatedMargin);

            // Transport Logic (Post-Address Only)
            const calculateTransport = (dist) => {
                const d = parseFloat(dist) || 0;
                if (d === 0) return 0;
                if (d <= 10) return 0;
                if (d <= 20) return 25;
                if (d > 20) return 40;
                return 0;
            };

            const user_address_verified = !!address;
            const transportFee = user_address_verified ? calculateTransport(distance) : 0;

            // INTERNAL VALIDATION AUDIT
            let validationError = null;
            if (mainService === 'residential') {
                const p = Math.round(basePrice); // Validate base price before transport
                if (subService === 'deep') {
                    if (sqftNum === 1200 && bedCount === 2 && bathCount === 2) {
                        if (p < 340 || p > 380) validationError = "Deep Productivity Calibration Error";
                    } else if (sqftNum === 2200 && bedCount === 4 && bathCount === 3) {
                        if (p < 600 || p > 750) validationError = "Deep Productivity Calibration Error";
                    }
                }
                else {
                    if (sqftNum === 900 && bedCount === 1 && bathCount === 1 && subService === 'standard' && !isRecurring) {
                        if (p < 190 || p > 230) validationError = "Productivity Calibration Warning";
                    } else if (sqftNum === 1200 && bedCount === 2 && bathCount === 2 && subService === 'standard' && !isRecurring) {
                        if (p < 270 || p > 300) validationError = "Productivity Calibration Warning";
                    } else if (sqftNum === 1800 && bedCount === 3 && bathCount === 2 && isRecurring) {
                        if (p < 320 || p > 380) validationError = "Productivity Calibration Warning";
                    }
                }
            }

            const finalPriceBeforeConversion = basePrice + transportFee;
            const recurringFactor = isRecurringConverted ? 0.88 : 1.0;
            const finalPrice = finalPriceBeforeConversion * recurringFactor;

            setDiagnostics({
                engine: engineName,
                base_labor_hours: engineResult.base_hours || engineResult.base_labor_hours,
                operational_adjusted_hours: engineResult.operational_adjusted_hours,
                basement_adjusted_hours: engineResult.basement_adjusted_hours,
                basementLabel,
                laborHours: laborHours.toFixed(2),
                crewSize: crewSize,
                duration: durationHours.toFixed(1),
                laborCost: laborCost.toFixed(2),
                materials: materials.toFixed(2),
                overhead: overhead.toFixed(2),
                transport: transportFee.toFixed(2),
                operatingCost: operatingCost.toFixed(2),
                marginApplied: (margin * 100).toFixed(0) + '%',
                basePrice: basePrice.toFixed(2),
                finalPrice: finalPrice.toFixed(2),
                pricePerSqft: sqftNum > 0 ? (finalPrice / sqftNum).toFixed(2) : '0',
                calibrationStatus: validationError,
                isTravelIncluded: user_address_verified
            });


            setEstimatedPrice({
                total: Math.ceil(finalPrice),
                base: Math.ceil(basePrice),
                transport: transportFee,
                deposit: Math.ceil(finalPrice * 0.35),
                duration: `${durationHours.toFixed(1)} Hours`,
                personnel: crewSize > 1 ? `${crewSize} Pro Cleaners` : "1 Pro Cleaner",
                confidence: 98,
                warning: validationError,
                travelNote: !user_address_verified ? "Final price before travel fee (calculated after address confirmation)." : null
            });

            setIsCalculating(false);
        }, 800); // Reduced delay for better reactivity while maintaining "calculating" feel
    }, [formData, residential_engine, commercial_engine, airbnb_engine]);


    const nextStep = () => {
        if (validateStep(step)) {
            if (step === 3) {
                // 🔒 Security Policy: Lead Quality Quote Limit
                if (quoteCount >= 1 && !hasCompletedBooking) {
                    setErrors({ general: "Your complimentary professional estimate has been used. Please complete your first booking or contact support to unlock unlimited instant pricing." });
                    return;
                }
                setQuoteCount(prev => prev + 1);
            }
            if (step === 4) calculateAdvancedEstimate();
            setStep(step + 1);
            window.scrollTo(0, 0);
        }
    };

    const prevStep = () => {
        setStep(step - 1);
        window.scrollTo(0, 0);
    };

    const handlePrintReceipt = () => {
        const serviceTitle = `${serviceEngines[formData.mainService]?.title} - ${serviceEngines[formData.mainService]?.subcategories[formData.subService]?.title}`;

        // Build area-based line items if applicable
        const areaLines = (formData.quoteMode === 'AREAS' && formData.mainService === 'residential')
            ? Object.entries(formData.roomSelection)
                .filter(([_, count]) => count > 0)
                .map(([id, count]) => {
                    const roomLabels = {
                        kitchen: 'Kitchen Detail', fullBath: 'Full Bath Sanitize',
                        halfBath: 'Half Bath Light', living: 'Living/Common Area',
                        bed: 'Bedroom Detail', office: 'Office/Den Detail',
                        stairs: 'Staircase / High-Traffic'
                    };
                    return { desc: `Room: ${roomLabels[id] || id}`, qty: count, price: 'Incl. in Packages' };
                })
            : [];

        // Build add-on line items with real prices
        const addonLines = formData.mainService === 'short_term'
            ? strAddons.map(id => {
                const catalog = STR_ADDONS.find(a => a.id === id);
                return catalog ? {
                    desc: `Add-on: ${catalog.name}`,
                    qty: 1,
                    price: catalog.price_display.replace('+$~', '~$')  // "~$28" format
                } : null;
            }).filter(Boolean)
            : formData.extras.map(ex => {
                // Residential: show label and note included in labor
                const labelMap = {
                    oven: 'Interior Oven Detail', fridge: 'Interior Fridge Clean',
                    cabinets: 'Interior Cabinets', blinds: 'Window Blinds',
                    windows: 'Interior Windows', pet_light: 'Pet Hair (Light)',
                    pet_heavy: 'Pet Hair Deep-Removal', laundry: 'Laundry Handling',
                    organizing: 'Organizing & Declutter', sofa: 'Deep Sofa Sanitize'
                };
                return { desc: `Add-on: ${labelMap[ex] || ex.replace(/_/g, ' ').toUpperCase()}`, qty: 1, price: 'Incl. in Total' };
            });

        const itemsList = [
            { desc: serviceTitle + (formData.quoteMode === 'AREAS' ? ' (Area-Based Protocol)' : ` (${formData.sqft} SQFT)`), qty: 1, price: estimatedPrice?.base },
            ...areaLines,
            ...addonLines,
            { desc: 'Travel/Logistics Fee', qty: 1, price: estimatedPrice?.transport }
        ];

        const itemsRows = itemsList.map(item => `
            <tr>
                <td style="padding: 16px; border-bottom: 1px solid #e2e8f0; text-align: left; font-size: 13px;">${item.desc}</td>
                <td style="padding: 16px; border-bottom: 1px solid #e2e8f0; text-align: center; font-size: 13px;">${item.qty}</td>
                <td style="padding: 16px; border-bottom: 1px solid #e2e8f0; text-align: right; font-size: 13px;">${typeof item.price === 'number' ? '$' + item.price : item.price}</td>
                <td style="padding: 16px; border-bottom: 1px solid #e2e8f0; text-align: right; font-weight: bold; font-size: 13px; color: var(--azul-corporativo);">${typeof item.price === 'number' ? '$' + item.price : 'Incl. in Total'}</td>
            </tr>
        `).join('');

        const pendingBalance = (estimatedPrice?.total - estimatedPrice?.deposit).toFixed(2);

        const formalHtml = `
            <html>
                <head>
                    <title>Quote - CleanShine Pro LLC</title>
                    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;700;900&display=swap" rel="stylesheet">
                    <style>
                        :root {
                            --azul-corporativo: #002855;
                            --verde-eficiencia: #007A33;
                            --blanco-destello: #FFFFFF;
                            --gris-platino: #F2F4F4;
                            --texto-oscuro: #333333;
                        }

                        body { 
                            font-family: 'Roboto', Arial, sans-serif; 
                            background: white; 
                            margin: 0; 
                            padding: 0;
                            color: var(--texto-oscuro);
                            -webkit-print-color-adjust: exact;
                        }
                        .page {
                            max-width: 850px;
                            margin: 0 auto;
                            background: white;
                            min-height: 100vh;
                            position: relative;
                            padding-bottom: 120px;
                        }
                        .header-bar {
                            height: 14px;
                            background: linear-gradient(90deg, var(--azul-corporativo) 0%, var(--verde-eficiencia) 100%);
                        }
                        .container { padding: 40px 60px; }
                        .top-meta {
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                            margin-bottom: 40px;
                        }
                        .logo-container img {
                            height: 110px;
                            width: auto;
                        }
                        .quote-header {
                            text-align: right;
                        }
                        .quote-header h1 {
                            margin: 0;
                            font-size: 38px;
                            font-weight: 900;
                            color: var(--azul-corporativo);
                            line-height: 1;
                            font-style: italic;
                            letter-spacing: -1px;
                        }
                        .quote-number {
                            color: var(--verde-eficiencia);
                            font-weight: 900;
                            font-size: 24px;
                            margin: 5px 0;
                        }
                        .info-grid {
                            display: grid;
                            grid-template-cols: 1fr 1fr;
                            gap: 40px;
                            margin-bottom: 30px;
                        }
                        .info-title {
                            margin: 0;
                            color: var(--azul-corporativo);
                            text-transform: uppercase;
                            letter-spacing: 2px;
                            font-size: 11px;
                            font-weight: 900;
                            border-bottom: 2px solid var(--verde-eficiencia);
                            padding-bottom: 8px;
                            margin-bottom: 15px;
                        }
                        .info-details {
                            font-size: 14px;
                            line-height: 1.5;
                        }
                        .customer-name {
                            font-weight: 900;
                            font-size: 20px;
                            color: #000;
                            margin-bottom: 5px;
                        }
                        table {
                            width: 100%;
                            border-collapse: collapse;
                            margin: 40px 0;
                        }
                        th {
                            background: var(--azul-corporativo);
                            color: white;
                            padding: 16px;
                            font-size: 11px;
                            text-transform: uppercase;
                            text-align: left;
                            letter-spacing: 1.5px;
                        }
                        .totals-section {
                            margin-left: auto;
                            width: 380px;
                        }
                        .total-item {
                            display: flex;
                            justify-content: space-between;
                            padding: 12px 0;
                            border-bottom: 1px solid #e2e8f0;
                            font-size: 14px;
                        }
                        .grand-total {
                            color: var(--azul-corporativo);
                            font-size: 36px;
                            font-weight: 900;
                            border-bottom: 6px solid var(--azul-corporativo);
                            padding: 20px 0;
                            margin-top: 10px;
                        }
                        .status-box {
                            text-align: right;
                            margin-top: 25px;
                            background: #f0fdf4;
                            padding: 24px;
                            border-radius: 12px;
                            border: 1px solid #dcfce7;
                        }
                        .status-badge {
                            background: var(--verde-eficiencia);
                            color: white;
                            padding: 4px 12px;
                            border-radius: 6px;
                            font-weight: 900;
                            text-transform: uppercase;
                            font-size: 12px;
                            display: inline-block;
                            margin-bottom: 10px;
                        }
                        .terms-container {
                            margin-top: 60px;
                            background: var(--gris-platino);
                            padding: 40px;
                            border-radius: 20px;
                            font-size: 12px;
                            line-height: 1.8;
                        }
                        .terms-container h4 {
                            margin: 0 0 15px;
                            font-weight: 900;
                            text-transform: uppercase;
                            letter-spacing: 2px;
                            color: var(--azul-corporativo);
                        }
                        .signature-block {
                            margin-top: 80px;
                            display: grid;
                            grid-template-cols: 1.4fr 1fr;
                            gap: 60px;
                            align-items: end;
                        }
                        .signature-pad {
                            border: 2px dashed #cbd5e1;
                            padding: 50px;
                            text-align: center;
                            border-radius: 24px;
                            background: white;
                        }
                        .footer-note {
                            position: absolute;
                            bottom: 0;
                            left: 0;
                            right: 0;
                            background: var(--azul-corporativo);
                            color: white;
                            padding: 30px;
                            text-align: center;
                            font-size: 11px;
                            letter-spacing: 1px;
                        }
                        @media print {
                            body { background: white; }
                            .page { margin: 0; }
                        }
                    </style>
                </head>
                <body onload="window.print()">
                    <div class="page">
                        <div class="header-bar"></div>
                        <div class="container">
                            <div class="top-meta">
                                <div class="logo-container">
                                    <img src="/logo.png" alt="CleanShine Pro Logo">
                                    <p style="font-size: 11px; color: #64748b; font-weight: 900; text-transform: uppercase; letter-spacing: 2px; margin: 8px 0;">Premium Detail Service</p>
                                </div>
                                <div class="quote-header">
                                    <h1>QUOTE</h1>
                                    <p class="quote-number">#${quoteId}</p>
                                    <p style="font-size: 14px; color: #64748b; margin: 0;">Date: ${new Date().toLocaleDateString('en-US')}</p>
                                </div>
                            </div>

                            <table style="width: 100%; border-collapse: collapse; margin-bottom: 30px; table-layout: fixed;">
                                <tr>
                                    <td style="vertical-align: top; width: 50%; padding-right: 20px;">
                                        <h4 class="info-title">Prepared For:</h4>
                                        <div class="info-details">
                                            <div class="customer-name">${formData.name}</div>
                                            <div style="color: #475569; font-weight: 600;">${formData.address}</div>
                                            <div style="color: #64748b; margin-top: 4px;">${formData.email}</div>
                                            <div style="color: #64748b;">${formData.phone}</div>
                                        </div>
                                    </td>
                                    <td style="vertical-align: top; width: 50%; text-align: right; padding-left: 20px;">
                                        <h4 class="info-title" style="text-align: right;">Our Information:</h4>
                                        <div class="info-details">
                                            <div style="font-weight: 900; font-size: 18px; color: var(--azul-corporativo); margin-bottom: 5px;">CleanShine Pro Operations</div>
                                            <div style="color: #475569;">www.cleanshinepro.com</div>
                                            <div style="color: #64748b;">contact@cleanshinepro.com</div>
                                            <div style="color: #64748b;">Woodstock, Georgia</div>
                                        </div>
                                    </td>
                                </tr>
                            </table>

                            <table>
                                <thead>
                                    <tr>
                                        <th>Service Description</th>
                                        <th style="text-align: center;">Qty</th>
                                        <th style="text-align: right;">Unit Price</th>
                                        <th style="text-align: right;">Subtotal</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${itemsRows}
                                </tbody>
                            </table>

                            <div class="totals-section">
                                <div class="total-item">
                                    <span style="font-weight: 700; color: #64748b; text-transform: uppercase; font-size: 11px;">Quote Amount:</span>
                                    <span style="font-weight: 700;">$${estimatedPrice?.total}</span>
                                </div>
                                ${isRecurringConverted ? `
                                <div class="total-item" style="color: var(--verde-eficiencia); font-weight: 900;">
                                    <span style="text-transform: uppercase; font-size: 11px;">Maintenance Plan (-12%):</span>
                                    <span>Applied</span>
                                </div>` : ''}
                                <div class="total-item grand-total">
                                    <span>TOTAL:</span>
                                    <span>$${estimatedPrice?.total}</span>
                                </div>
                                
                                <div class="status-box">
                                    <div class="status-badge">DEPOSIT RECEIVED</div>
                                    <div style="margin: 5px 0 10px; font-size: 20px; color: var(--verde-eficiencia); font-weight: 900;">
                                        $${estimatedPrice?.deposit} Paid Today
                                    </div>
                                    <div style="font-size: 14px; color: #b91c1c; font-weight: 900; padding: 8px; border-top: 2px solid #fee2e2;">
                                        PENDING BALANCE: $${pendingBalance}
                                    </div>
                                    <p style="margin: 8px 0 0; font-size: 11px; color: #166534; opacity: 0.8;">
                                        Remaining balance to be paid after service completion.
                                    </p>
                                </div>
                            </div>

                            <div class="terms-container">
                                <h4>📜 Warranty & Terms</h4>
                                <div style="display: grid; grid-template-cols: 1fr 1fr; gap: 40px;">
                                    <div>
                                        <strong>48-Hour Guarantee:</strong> If you are not 100% satisfied with our service, we will return at no extra cost to fix any issues within the first 48 hours.
                                    </div>
                                    <div>
                                        <strong>Price Adjustment:</strong> Quote is based on standard living conditions. Extreme dirt, excessive clutter, or undeclared pets may result in additional charges upon arrival.
                                    </div>
                                </div>
                            </div>

                            <div class="signature-block">
                                <div class="signature-pad">
                                    <div style="font-family: 'Brush Script MT', cursive; font-size: 48px; color: var(--azul-corporativo); opacity: 0.8; margin-bottom: 10px;">
                                        ${formData.name}
                                    </div>
                                    <div style="border-top: 3px solid var(--azul-corporativo); padding-top: 10px; font-weight: 900; text-transform: uppercase; font-size: 11px; color: var(--azul-corporativo);">
                                        Authorized Client Signature
                                    </div>
                                    <div style="margin-top: 15px; font-size: 9px; color: #94a3b8; font-family: monospace;">
                                        TX-ID: ${quoteId} | TIMESTAMP: ${new Date().toLocaleString('en-US')} | STATUS: VERIFIED
                                    </div>
                                </div>
                                <div style="text-align: center;">
                                    <div style="display: inline-flex; align-items: center; gap: 10px; margin-bottom: 25px; color: var(--verde-eficiencia); font-weight: 900; text-transform: uppercase; font-size: 12px; letter-spacing: 1.5px;">
                                        <div style="width: 22px; height: 22px; background: var(--verde-eficiencia); border-radius: 6px; display: flex; align-items: center; justify-content: center; color: white; font-size: 14px;">✓</div>
                                        Digitally Signed
                                    </div>
                                    <div style="background: var(--azul-corporativo); color: white; padding: 25px; border-radius: 80px; font-weight: 900; font-size: 14px; letter-spacing: 2px; text-transform: uppercase; box-shadow: 0 20px 40px rgba(0,40,85,0.3);">
                                        Quote Accepted
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="footer-note">
                            Providing protection, hygiene, and superior shine in every detail.<br>
                            Powered by <strong>CleaningIQ</strong> | www.cleanshinepro.com
                        </div>
                    </div>
                </body>
            </html>
        `;

        const printWindow = window.open('', '_blank');
        printWindow.document.write(formalHtml);
        printWindow.document.close();
    };

    const handleDepositClick = (e) => {
        e.preventDefault();
        if (!acceptedTerms) return; // Button is already disabled without terms
        if (!validateStep(6)) return;

        // Show inline confirmation (step 7) — no browser alert
        track_event("deposit_confirmed");
        setStep(7);
    };




    return (
        <div className="min-h-screen pt-24 pb-12 bg-[#020617] text-white font-sans">
            <div className="container mx-auto px-6 max-w-4xl">

                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-6xl font-black mb-4 tracking-tight">Professional <span className="text-emerald-400">Booking</span></h1>
                    <p className="text-slate-400 max-w-xl mx-auto">Get an instant, data-driven estimate based on professional standards and personnel logistics.</p>
                </div>

                <div className="flex justify-between mb-12 relative max-w-2xl mx-auto">
                    <div className="absolute top-1/2 left-0 w-full h-1 bg-white/5 -z-10 -translate-y-1/2 rounded-full"></div>
                    <div className="absolute top-1/2 left-0 h-1 bg-emerald-500 -z-10 -translate-y-1/2 transition-all duration-700 rounded-full" style={{ width: `${((step - 1) / 6) * 100}%` }}></div>
                    {[1, 2, 3, 4, 5, 6].map(num => (
                        <div key={num} className={`w-12 h-12 rounded-full flex items-center justify-center font-bold transition-all duration-500 border-4 bg-[#020617] ${step >= num ? 'border-emerald-500 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.3)]' : 'border-white/5 text-slate-700'}`}>
                            {step > num ? <Check className="w-6 h-6" /> : num}
                        </div>
                    ))}
                </div>


                <div className="bg-[#0B1121] border border-white/5 p-8 md:p-12 rounded-[2rem] shadow-2xl relative overflow-hidden">
                    {step > 1 && step < 7 && (
                        <div className="mb-8 p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-2xl flex flex-wrap gap-4 items-center">
                            <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-widest"><Shield className="w-3.5 h-3.5" /> Your Config:</div>
                            <div className="flex flex-wrap gap-3 text-xs text-slate-300">
                                <span className="flex items-center gap-1"><Check className="w-3 h-3 text-emerald-500" /> {serviceEngines[formData.mainService]?.title || 'Select Engine'}</span>
                                {formData.subService && <span className="flex items-center gap-1"><Check className="w-3 h-3 text-emerald-500" /> {serviceEngines[formData.mainService]?.subcategories[formData.subService]?.title}</span>}
                                {formData.sqft && <span className="flex items-center gap-1"><Check className="w-3 h-3 text-emerald-500" /> {formData.sqft} SQFT</span>}
                            </div>
                        </div>
                    )}


                    <div className="min-h-[400px]">
                        {step === 1 && (
                            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-5 duration-500">
                                <h3 className="text-2xl font-bold flex items-center gap-3"><Bot className="text-emerald-400 w-8 h-8" /> Choose Primary Engine</h3>
                                <div className="grid md:grid-cols-3 gap-6">
                                    {Object.values(serviceEngines).map((engine) => (
                                        <div
                                            key={engine.id}
                                            onClick={() => setFormData({ ...formData, mainService: engine.id, subService: '' })}
                                            className={`p-6 rounded-3xl border-2 transition-all cursor-pointer group relative overflow-hidden ${formData.mainService === engine.id ? 'border-emerald-500 bg-emerald-500/5 shadow-[0_0_30px_rgba(16,185,129,0.1)]' : 'border-white/5 bg-white/5 hover:border-white/20'}`}
                                        >
                                            <div className="flex justify-between items-start mb-4">
                                                <div className={`p-4 rounded-2xl ${formData.mainService === engine.id ? 'bg-emerald-500 text-[#020617]' : 'bg-white/10 text-white'}`}>
                                                    <engine.icon className="w-8 h-8" />
                                                </div>
                                            </div>
                                            <h4 className="text-xl font-black mb-2">{engine.title}</h4>
                                            <p className="text-slate-400 text-xs leading-relaxed">{engine.desc}</p>
                                        </div>
                                    ))}
                                </div>
                                {errors.mainService && <p className="text-red-500 text-sm mt-2 font-bold">{errors.mainService}</p>}
                            </div>
                        )}

                        {step === 2 && (
                            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-5 duration-500">
                                <h3 className="text-2xl font-bold flex items-center gap-3"><Sparkles className="text-emerald-500 w-8 h-8" /> Specialized Configuration</h3>
                                <div className="grid md:grid-cols-2 gap-6">
                                    {Object.values(serviceEngines[formData.mainService]?.subcategories || {}).map((sub) => (
                                        <div
                                            key={sub.id}
                                            onClick={() => setFormData({ ...formData, subService: sub.id })}
                                            className={`p-6 rounded-3xl border-2 transition-all cursor-pointer group relative overflow-hidden ${formData.subService === sub.id ? 'border-emerald-400 bg-emerald-400/5 shadow-[0_0_30px_rgba(16,185,129,0.1)]' : 'border-white/5 bg-white/5 hover:border-white/20'}`}
                                        >
                                            <div className="flex justify-between items-start mb-4">
                                                <div className={`p-3 rounded-2xl ${formData.subService === sub.id ? 'bg-emerald-400 text-[#020617]' : 'bg-white/10 text-white'}`}>
                                                    <Check className="w-5 h-5" />
                                                </div>
                                            </div>
                                            <h4 className="text-lg font-bold mb-1">{sub.title}</h4>
                                            <p className="text-slate-500 text-[11px] leading-relaxed">{sub.desc}</p>
                                        </div>
                                    ))}
                                </div>
                                {errors.subService && <p className="text-red-500 text-sm mt-2 font-bold">{errors.subService}</p>}
                            </div>
                        )}


                        {step === 3 && (
                            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-5 duration-500">
                                <div className="flex justify-between items-center">
                                    <h3 className="text-2xl font-bold flex items-center gap-3"><Package className="text-emerald-500 w-8 h-8" /> Project Dimensions</h3>
                                    {formData.mainService === 'residential' && hasCompletedBooking && (
                                        <div className="flex bg-white/5 rounded-2xl p-1 border border-white/10">
                                            <button
                                                onClick={() => setFormData({ ...formData, quoteMode: 'SQFT' })}
                                                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${formData.quoteMode === 'SQFT' ? 'bg-emerald-500 text-[#020617]' : 'text-slate-400 hover:text-white'}`}
                                            >
                                                By SqFt
                                            </button>
                                            <button
                                                onClick={() => setFormData({ ...formData, quoteMode: 'AREAS' })}
                                                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${formData.quoteMode === 'AREAS' ? 'bg-emerald-500 text-[#020617]' : 'text-slate-400 hover:text-white'}`}
                                            >
                                                By Areas
                                            </button>
                                        </div>
                                    )}
                                </div>

                                {formData.quoteMode === 'AREAS' && formData.mainService === 'residential' ? (
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6 animate-in fade-in zoom-in-95 duration-300">
                                        {[
                                            { id: 'kitchen', label: 'Kitchens', icon: '🍳' },
                                            { id: 'fullBath', label: 'Full Baths', icon: '🚿' },
                                            { id: 'halfBath', label: 'Half Baths', icon: '🚽' },
                                            { id: 'living', label: 'Living/Common', icon: '📺' },
                                            { id: 'bed', label: 'Bedrooms', icon: '🛏️' },
                                            { id: 'office', label: 'Offices', icon: '🖥️' },
                                            { id: 'stairs', label: 'Staircases', icon: '🪜' }
                                        ].map((room) => (
                                            <div key={room.id} className="bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col items-center justify-center gap-3">
                                                <span className="text-2xl">{room.icon}</span>
                                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{room.label}</span>
                                                <div className="flex items-center gap-4 mt-2">
                                                    <button
                                                        onClick={() => {
                                                            const current = formData.roomSelection[room.id] || 0;
                                                            if (current > 0) {
                                                                setFormData({
                                                                    ...formData,
                                                                    roomSelection: { ...formData.roomSelection, [room.id]: current - 1 }
                                                                });
                                                            }
                                                        }}
                                                        className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                                                    >
                                                        -
                                                    </button>
                                                    <span className="text-xl font-black text-emerald-400">{formData.roomSelection[room.id] || 0}</span>
                                                    <button
                                                        onClick={() => {
                                                            const current = formData.roomSelection[room.id] || 0;
                                                            setFormData({
                                                                ...formData,
                                                                roomSelection: { ...formData.roomSelection, [room.id]: current + 1 }
                                                            });
                                                        }}
                                                        className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="grid md:grid-cols-2 gap-8">
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-slate-400 uppercase tracking-tighter">Approximate Square Footage</label>
                                            <input type="number" name="sqft" value={formData.sqft} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 focus:ring-2 focus:ring-emerald-500/50 outline-none transition-all text-xl font-bold" placeholder="e.g. 2500" />
                                            {errors.sqft && <p className="text-red-400 text-xs font-bold">{errors.sqft}</p>}
                                        </div>

                                        {(formData.mainService === 'residential' || formData.mainService === 'short_term') && (
                                            <>
                                                <div className="space-y-2">
                                                    <label className="text-sm font-bold text-slate-400 uppercase tracking-tighter">Bedrooms</label>
                                                    <select name="beds" value={formData.beds} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 focus:ring-2 focus:ring-emerald-500/50 outline-none text-white font-bold">
                                                        <option className="bg-[#0B1121] text-white" value="">Select Count</option>
                                                        {[1, 2, 3, 4, 5, 6].map(n => <option key={n} value={n} className="bg-[#0B1121] text-white">{n} Bedrooms</option>)}
                                                    </select>
                                                    {errors.beds && <p className="text-red-400 text-xs font-bold">{errors.beds}</p>}
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-sm font-bold text-slate-400 uppercase tracking-tighter">Bathrooms</label>
                                                    <select name="baths" value={formData.baths} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 focus:ring-2 focus:ring-emerald-500/50 outline-none text-white font-bold">
                                                        <option className="bg-[#0B1121] text-white" value="">Select Count</option>
                                                        {[1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5].map(n => <option key={n} value={n} className="bg-[#0B1121] text-white">{n} Bathrooms</option>)}
                                                    </select>
                                                    {errors.baths && <p className="text-red-400 text-xs font-bold">{errors.baths}</p>}
                                                </div>
                                            </>
                                        )}
                                    </div>
                                )}

                                <div className="space-y-2 md:col-span-2">
                                    <label className="text-sm font-bold text-slate-400 uppercase tracking-tighter">Service Frequency</label>
                                    <select name="frequency" value={formData.frequency} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 focus:ring-2 focus:ring-emerald-500/50 outline-none text-white appearance-none">
                                        <option className="bg-[#0B1121] text-white" value="one-time">Professional One-Time</option>
                                        <option className="bg-[#0B1121] text-white" value="weekly">Weekly (Recurring Discount)</option>
                                        <option className="bg-[#0B1121] text-white" value="bi-weekly">Bi-Weekly (Recurring Discount)</option>
                                        <option className="bg-[#0B1121] text-white" value="monthly">Monthly Maintenance</option>
                                    </select>
                                </div>

                                {formData.quoteMode === 'SQFT' && formData.mainService === 'residential' && (
                                    <div className="space-y-4 md:col-span-2">
                                        <label className="text-sm font-bold text-slate-400 uppercase tracking-tighter text-emerald-400 flex items-center gap-2">
                                            <Building2 className="w-4 h-4" /> Structural Layout Adjustment
                                        </label>
                                        <div className="grid grid-cols-3 gap-4">
                                            {[
                                                { id: 'none', label: 'No Basement' },
                                                { id: 'unfinished', label: 'Unfinished / Storage' },
                                                { id: 'finished', label: 'Finished Basement' }
                                            ].map((type) => (
                                                <button
                                                    key={type.id}
                                                    type="button"
                                                    onClick={() => setFormData({ ...formData, basementType: type.id })}
                                                    className={`p-4 rounded-xl border text-[10px] font-bold transition-all ${formData.basementType === type.id ? 'bg-emerald-500/20 border-emerald-500 text-white shadow-[0_0_15px_rgba(16,185,129,0.1)]' : 'bg-white/5 border-white/10 text-slate-400 hover:border-white/20'}`}
                                                >
                                                    {type.label}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {formData.mainService === 'short_term' && (
                                    <div className="space-y-4 md:col-span-2">
                                        <label className="text-sm font-bold text-slate-400 uppercase tracking-tighter text-emerald-400 flex items-center gap-2">
                                            <Layers className="w-4 h-4" /> Property Levels / Floors
                                        </label>
                                        <div className="flex gap-4">
                                            {[1, 2, 3].map((l) => (
                                                <button
                                                    key={l}
                                                    type="button"
                                                    onClick={() => setFormData({ ...formData, levels: l })}
                                                    className={`flex-1 p-4 rounded-xl border text-sm font-bold transition-all ${formData.levels === l ? 'bg-emerald-500/20 border-emerald-500 text-white shadow-[0_0_15px_rgba(16,185,129,0.1)]' : 'bg-white/5 border-white/10 text-slate-400 hover:border-white/20'}`}
                                                >
                                                    {l} {l === 1 ? 'Level' : 'Levels'}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                                {errors.general && (
                                    <div className="p-6 bg-red-500/10 border border-red-500/30 rounded-3xl animate-in shake duration-500 mt-6">
                                        <p className="text-sm font-black text-red-400 uppercase tracking-widest leading-relaxed">{errors.general}</p>
                                        <button onClick={() => window.location.href = 'mailto:contact@cleanshinepro.com'} className="mt-4 text-[10px] font-black text-white underline uppercase tracking-widest">Contact Office for Manual Quote</button>
                                    </div>
                                )}
                            </div>
                        )}


                        {step === 4 && (
                            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-5 duration-500">
                                <h3 className="text-2xl font-bold flex items-center gap-3"><Calendar className="text-emerald-500 w-8 h-8" /> Schedule Arrival</h3>
                                <div className="grid md:grid-cols-2 gap-8">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-400 uppercase tracking-tighter">Desired Date</label>
                                        <input type="date" name="date" value={formData.date} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 focus:ring-2 focus:ring-emerald-500/50 outline-none text-white [color-scheme:dark]" />
                                        {errors.date && <p className="text-red-400 text-xs font-bold">{errors.date}</p>}
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-400 uppercase tracking-tighter">Arrival Window</label>
                                        <select name="time" value={formData.time} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 focus:ring-2 focus:ring-emerald-500/50 outline-none text-white">
                                            <option className="bg-[#0B1121] text-white" value="">Select Time Window</option>
                                            <option className="bg-[#0B1121] text-white" value="morning">Morning Arrival (8am - 10am)</option>
                                            <option className="bg-[#0B1121] text-white" value="mid-day">Mid-Day Arrival (11am - 1pm)</option>
                                            <option className="bg-[#0B1121] text-white" value="afternoon">Afternoon Arrival (2pm - 4pm)</option>
                                        </select>
                                        {errors.time && <p className="text-red-400 text-xs font-bold">{errors.time}</p>}
                                    </div>
                                </div>
                            </div>
                        )}

                        {step === 5 && (

                            <div className="space-y-10 animate-in fade-in zoom-in-95 duration-700">
                                {isCalculating ? (
                                    <div className="flex flex-col items-center justify-center min-h-[400px] space-y-6">
                                        <div className="w-20 h-20 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin"></div>
                                        <div className="text-xl font-bold text-emerald-400 animate-pulse tracking-widest">CALCULATING PRO ESTIMATE...</div>
                                        <p className="text-slate-500 text-sm">Mapping personnel requirements and material consumption...</p>
                                    </div>
                                ) : estimatedPrice && (
                                    <div className="space-y-10">
                                        <div className="space-y-10">
                                            {!isEmailVerified ? (
                                                <div className="grid lg:grid-cols-2 gap-10">
                                                    <div className="bg-gradient-to-br from-slate-900 to-[#020617] border border-white/10 rounded-[2.5rem] p-10 relative overflow-hidden shadow-2xl">
                                                        <div className="relative z-10 space-y-8">
                                                            <div className="space-y-2">
                                                                <h4 className="text-sm font-black text-emerald-400 uppercase tracking-widest flex items-center gap-2">
                                                                    <Lock className="w-4 h-4" /> Projected Investment Range
                                                                </h4>
                                                                <div className="text-5xl font-black text-white tracking-tighter italic">
                                                                    ${Math.round(estimatedPrice.total * 0.9)} – ${Math.round(estimatedPrice.total * 1.1)}
                                                                </div>
                                                                <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mt-2 italic">
                                                                    Verify ownership to unlock fixed pricing.
                                                                </p>
                                                            </div>

                                                            <div className="bg-white/5 p-6 rounded-3xl border border-white/5 space-y-4">
                                                                <div className="space-y-4">
                                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                                        <div className="space-y-1">
                                                                            <label className="text-[9px] font-black text-slate-500 uppercase">Your Name</label>
                                                                            <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full bg-[#020617] border border-white/10 rounded-xl px-4 py-3 text-sm font-bold text-white focus:border-emerald-500 outline-none" placeholder="John Doe" />
                                                                        </div>
                                                                        <div className="space-y-1">
                                                                            <label className="text-[9px] font-black text-slate-500 uppercase">Email Address</label>
                                                                            <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full bg-[#020617] border border-white/10 rounded-xl px-4 py-3 text-sm font-bold text-white focus:border-emerald-500 outline-none" placeholder="john@example.com" />
                                                                        </div>
                                                                    </div>
                                                                    <div className="space-y-1">
                                                                        <label className="text-[9px] font-black text-slate-500 uppercase">Phone Number</label>
                                                                        <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full bg-[#020617] border border-white/10 rounded-xl px-4 py-3 text-sm font-bold text-white focus:border-emerald-500 outline-none" placeholder="(123) 456-7890" />
                                                                    </div>

                                                                    {isVerifying && (
                                                                        <div className="space-y-1 animate-in zoom-in duration-300">
                                                                            <label className="text-[9px] font-black text-emerald-500 uppercase">Enter Verification Code</label>
                                                                            <input id="verification-code-input" type="text" maxLength="6" className="w-full bg-emerald-500/10 border border-emerald-500 rounded-xl px-4 py-3 text-2xl font-black text-center tracking-[0.5em] text-white focus:outline-none" placeholder="000000" />
                                                                        </div>
                                                                    )}

                                                                    <button
                                                                        type="button"
                                                                        onClick={async () => {
                                                                            if (!isVerifying) {
                                                                                if (!formData.email && !formData.phone) {
                                                                                    setErrors(prev => ({ ...prev, general: "Email or Phone required for verification" }));
                                                                                    return;
                                                                                }

                                                                                setIsCalculating(true);
                                                                                try {
                                                                                    const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-verification-csp`, {
                                                                                        method: 'POST',
                                                                                        headers: {
                                                                                            'Content-Type': 'application/json',
                                                                                            'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`
                                                                                        },
                                                                                        body: JSON.stringify({ email: formData.email, phone: formData.phone })
                                                                                    });
                                                                                    const result = await response.json();
                                                                                    if (result.success) {
                                                                                        setIsVerifying(true);
                                                                                        track_event("identity_verification_sent");
                                                                                        setErrors(prev => {
                                                                                            const next = { ...prev };
                                                                                            delete next.general;
                                                                                            return {
                                                                                                ...next,
                                                                                                verificationNote: result.method === 'email' ? `Check your inbox at ${formData.email}` : `Check your messages at ${formData.phone}`
                                                                                            };
                                                                                        });
                                                                                    } else {
                                                                                        setErrors(prev => ({ ...prev, general: result.error || "Failed to send code" }));
                                                                                    }
                                                                                } catch (e) {
                                                                                    setErrors(prev => ({ ...prev, general: "Connection error with verification server" }));
                                                                                } finally {
                                                                                    setIsCalculating(false);
                                                                                }
                                                                            } else {
                                                                                const codeInput = document.getElementById('verification-code-input')?.value;
                                                                                if (!codeInput || codeInput.length < 6) {
                                                                                    setErrors(prev => ({ ...prev, general: "Please enter the 6-digit code" }));
                                                                                    return;
                                                                                }

                                                                                setIsCalculating(true);
                                                                                try {
                                                                                    const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/verify-code-csp`, {
                                                                                        method: 'POST',
                                                                                        headers: {
                                                                                            'Content-Type': 'application/json',
                                                                                            'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`
                                                                                        },
                                                                                        body: JSON.stringify({
                                                                                            email: formData.email,
                                                                                            phone: formData.phone,
                                                                                            code: codeInput
                                                                                        })
                                                                                    });
                                                                                    const result = await response.json();
                                                                                    if (result.success) {
                                                                                        setIsEmailVerified(true);
                                                                                        setErrors({});
                                                                                        track_event("identity_verification_success");
                                                                                    } else {
                                                                                        setErrors(prev => ({ ...prev, general: result.error || "Invalid code" }));
                                                                                    }
                                                                                } catch (e) {
                                                                                    setErrors(prev => ({ ...prev, general: "Verification server unreachable" }));
                                                                                } finally {
                                                                                    setIsCalculating(false);
                                                                                }
                                                                            }
                                                                        }}
                                                                        className="w-full py-4 bg-emerald-500 text-[#020617] font-black rounded-xl uppercase tracking-widest shadow-[0_10px_30px_rgba(16,185,129,0.3)] active:scale-95 transition-all text-sm mb-4"
                                                                    >
                                                                        {isVerifying ? "Confirm Verification Code" : "Verify Identity to Unlock Fixed Price"}
                                                                    </button>
                                                                    {errors.general && (
                                                                        <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-xl mb-4 text-center">
                                                                            <p className="text-[10px] font-bold text-red-400 uppercase tracking-widest">{errors.general}</p>
                                                                        </div>
                                                                    )}
                                                                    {errors.verificationNote && (
                                                                        <p className="text-[10px] text-emerald-400 text-center font-bold animate-pulse mt-2">{errors.verificationNote}</p>
                                                                    )}
                                                                    <p className="text-[8px] text-slate-500 text-center uppercase tracking-tighter">🔒 Secure identity verification required (Sent via {formData.email ? "Email" : "SMS"}) before revealing labor formulas.</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="flex flex-col justify-center space-y-6">
                                                        <div className="p-8 bg-indigo-500/5 border border-indigo-500/20 rounded-3xl space-y-4">
                                                            <div className="flex items-center gap-3 text-indigo-400">
                                                                <ShieldCheck className="w-6 h-6" />
                                                                <h4 className="font-black uppercase tracking-widest text-sm">Security Layer Locked</h4>
                                                            </div>
                                                            <p className="text-xs text-slate-400 leading-relaxed">To protect our proprietary labor-projected pricing model and prevent automated scraping, we require identity verification.</p>
                                                            <ul className="space-y-3">
                                                                {["Unlock Detailed Breakdown", "View Crew Size Allocation", "Reveal Arrival Timelines", "Access Fixed Price Guarantee"].map((item, i) => (
                                                                    <li key={i} className="flex items-center gap-2 text-[10px] font-bold text-slate-500">
                                                                        <Lock className="w-3 h-3 opacity-50" /> {item}
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="grid lg:grid-cols-2 gap-10">
                                                    <div className="bg-gradient-to-br from-indigo-900/40 to-slate-900 border border-indigo-500/30 rounded-[2.5rem] p-10 relative overflow-hidden shadow-2xl">
                                                        <div className="relative z-10 space-y-6">
                                                            <span className="px-3 py-1 bg-indigo-500/20 text-indigo-300 text-[10px] font-bold uppercase tracking-widest rounded-full border border-indigo-500/30 font-mono italic">UNLOCKED: {diagnostics?.engine} Cost-Based Quote</span>
                                                            <div className="space-y-1">
                                                                <h4 className="text-6xl font-black text-white tracking-tighter">${estimatedPrice.total}</h4>
                                                                <p className="text-[10px] text-emerald-400 font-black uppercase tracking-[0.2em] animate-pulse">
                                                                    Verified Fixed-Price Guarantee
                                                                </p>
                                                            </div>

                                                            <div className="space-y-3 pt-6 border-t border-white/10">
                                                                <div className="flex justify-between items-center bg-white/5 p-4 rounded-2xl border border-white/5">
                                                                    <div className="flex items-center gap-3 text-[10px] font-black font-mono uppercase text-slate-400"><Clock className="w-4 h-4 text-emerald-400" /> Project Duration</div>
                                                                    <div className="text-sm font-black text-slate-200">{estimatedPrice.duration} Hours</div>
                                                                </div>
                                                                <div className="flex justify-between items-center bg-white/5 p-4 rounded-2xl border border-white/5">
                                                                    <div className="flex items-center gap-3 text-[10px] font-black font-mono uppercase text-slate-400"><User className="w-4 h-4 text-emerald-400" /> Deployed Workforce</div>
                                                                    <div className="text-sm font-black text-slate-200">{estimatedPrice.personnel} Professional Crew</div>
                                                                </div>
                                                                {diagnostics?.engine === 'Commercial' && (
                                                                    <div className="flex justify-between items-center bg-emerald-500/5 p-4 rounded-2xl border border-emerald-500/10">
                                                                        <div className="flex items-center gap-3 text-xs font-black uppercase text-emerald-400">Yield/SQFT</div>
                                                                        <div className="text-sm font-black text-white">${diagnostics?.pricePerSqft}</div>
                                                                    </div>
                                                                )}
                                                            </div>

                                                            {/* Add-ons Section Unlocked */}
                                                            {formData.mainService === 'short_term' ? (
                                                                <div className="grid grid-cols-2 gap-2 pt-4">
                                                                    {STR_ADDONS.map(addon => (
                                                                        <button key={addon.id} onClick={() => {
                                                                            const next = strAddons.includes(addon.id) ? strAddons.filter(id => id !== addon.id) : [...strAddons, addon.id];
                                                                            setStrAddons(next);
                                                                            calculateAdvancedEstimate({ ...formData, strAddonsOverride: next });
                                                                        }} className={`p-3 rounded-xl border text-[10px] font-black transition-all flex justify-between items-center ${strAddons.includes(addon.id) ? 'bg-emerald-500/20 border-emerald-500 text-white shadow-[0_0_15px_rgba(16,185,129,0.1)]' : 'bg-white/5 border-white/10 text-slate-400 hover:border-white/20'}`}>
                                                                            <span>{addon.label}</span>
                                                                            <span className="text-emerald-400">✓</span>
                                                                        </button>
                                                                    ))}
                                                                </div>
                                                            ) : (
                                                                <div className="grid grid-cols-2 gap-2 pt-4">
                                                                    {[
                                                                        { id: 'fridge', label: 'Int. Fridge' },
                                                                        { id: 'oven', label: 'Int. Oven' },
                                                                        { id: 'cabinets', label: 'Int. Cabinets' },
                                                                        { id: 'blinds', label: 'Full Blinds' }
                                                                    ].map(extra => (
                                                                        <button key={extra.id} onClick={() => {
                                                                            const newExtras = formData.extras.includes(extra.id) ? formData.extras.filter(e => e !== extra.id) : [...formData.extras, extra.id];
                                                                            const nextState = { ...formData, extras: newExtras };
                                                                            setFormData(nextState);
                                                                            calculateAdvancedEstimate(nextState);
                                                                        }} className={`p-3 rounded-xl border text-[10px] font-black transition-all flex justify-between items-center ${formData.extras.includes(extra.id) ? 'bg-emerald-500/20 border-emerald-500 text-white shadow-[0_0_15px_rgba(16,185,129,0.1)]' : 'bg-white/5 border-white/10 text-slate-400 hover:border-white/20'}`}>
                                                                            {extra.label} <Zap className="w-3 h-3 text-emerald-400 ml-1" />
                                                                        </button>
                                                                    ))}
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>

                                                    <div className="space-y-6 flex flex-col justify-center">
                                                        <h4 className="text-sm font-black flex items-center gap-2 text-emerald-400 uppercase tracking-widest"><ListChecks className="w-4 h-4" /> Final Task Consensus</h4>
                                                        <div className="bg-white/5 border border-white/5 rounded-3xl p-8 space-y-4">
                                                            {subServiceInfo?.checklist.map((task, idx) => (
                                                                <div key={idx} className="flex items-start gap-4 text-xs font-bold">
                                                                    <div className="p-1 bg-emerald-500/20 rounded-lg text-emerald-400 mt-0.5"><Check className="w-3 h-3" /></div>
                                                                    <span className="text-slate-300 leading-tight">{task}</span>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>


                                        {isEmailVerified && (
                                            <div className="bg-[#020617]/50 border border-emerald-500/30 rounded-[2.5rem] p-8 space-y-6 animate-in slide-in-from-top-4 duration-700">
                                                <h4 className="text-sm font-black text-emerald-400 uppercase tracking-widest flex items-center gap-2">
                                                    <BarChart3 className="w-4 h-4" /> Multi-Engine Cost Breakdown (UNLOCKED)
                                                </h4>

                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-[11px] font-mono">
                                                    {diagnostics?.basementLabel && (
                                                        <div className="md:col-span-2 bg-indigo-500/10 border border-indigo-500/20 p-4 rounded-2xl flex items-center gap-4 text-indigo-300 font-bold">
                                                            <Sparkles className="w-5 h-5" />
                                                            <div className="flex flex-col">
                                                                <span className="text-[8px] uppercase tracking-widest opacity-70">Structural Engineering Adjustment</span>
                                                                <span className="text-sm">{diagnostics.basementLabel}</span>
                                                            </div>
                                                        </div>
                                                    )}
                                                    {diagnostics?.calibrationStatus && (

                                                        <div className="md:col-span-2 bg-red-500/10 border border-red-500/20 p-4 rounded-2xl flex items-center gap-4 text-red-400 font-bold animate-pulse">
                                                            <Bot className="w-6 h-6" />
                                                            <div className="flex flex-col">
                                                                <span className="text-[8px] uppercase tracking-widest opacity-70">Internal Systems Check</span>
                                                                <span className="text-sm">{diagnostics.calibrationStatus}</span>
                                                            </div>
                                                        </div>
                                                    )}
                                                    <div className="space-y-3">
                                                        <div className="flex justify-between border-b border-white/5 pb-1"><span className="text-slate-500">Base Labor Hours:</span> <span className="text-white font-bold">{diagnostics?.base_labor_hours}h</span></div>
                                                        <div className="flex justify-between border-b border-white/5 pb-1"><span className="text-slate-500">Adj. Labor Hours:</span> <span className="text-white font-bold">{diagnostics?.basement_adjusted_hours}h</span></div>
                                                        <div className="flex justify-between border-b border-white/5 pb-1"><span className="text-slate-500">Crew Size / Duration:</span> <span className="text-white font-bold">{diagnostics?.crewSize}p / {diagnostics?.duration}h</span></div>
                                                        <div className="flex justify-between border-b border-white/5 pb-1"><span className="text-slate-500">Labor Cost (Real):</span> <span className="text-white font-bold">${diagnostics?.laborCost}</span></div>
                                                        <div className="flex justify-between border-b border-white/5 pb-1"><span className="text-slate-500">Materials & Consumables:</span> <span className="text-white">${diagnostics?.materials}</span></div>
                                                    </div>
                                                    <div className="space-y-3">
                                                        <div className="flex justify-between border-b border-white/5 pb-1"><span className="text-slate-500">Operational Overhead (15%):</span> <span className="text-white">${diagnostics?.overhead}</span></div>
                                                        <div className="flex justify-between border-b border-white/5 pb-1"><span className="text-slate-500">Gross Operating Cost:</span> <span className="text-white font-bold">${diagnostics?.operatingCost}</span></div>
                                                        <div className="flex justify-between border-b border-indigo-500/30 pb-1"><span className="text-indigo-400 font-black">Base Price (Before Travel):</span> <span className="text-indigo-400 font-black">${diagnostics?.basePrice}</span></div>
                                                        <div className="flex justify-between border-b border-white/5 pb-1">
                                                            <span className="text-slate-500">Travel Fee {diagnostics?.isTravelIncluded ? `(${formData.distance} mi)` : '(Post-Address capture)'}:</span>
                                                            <span className={`font-bold ${diagnostics?.isTravelIncluded ? 'text-emerald-400' : 'text-slate-600'}`}>+${diagnostics?.transport}</span>
                                                        </div>
                                                    </div>

                                                </div>

                                                <div className="pt-2 flex justify-between items-center bg-emerald-500/5 p-4 rounded-2xl border border-emerald-500/10">
                                                    <div className="flex flex-col">
                                                        <span className="text-[8px] text-emerald-500 font-bold tracking-[0.2em]">ENGINE TYPE</span>
                                                        <span className="text-xs font-black text-white">{diagnostics?.engine} V4.0 (True Margin Model)</span>
                                                    </div>
                                                    <div className="text-right">
                                                        <div className="text-[8px] text-slate-500 font-bold uppercase tracking-widest">Calculated Final Price</div>
                                                        <div className="text-2xl font-black text-white">${diagnostics?.finalPrice}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        )}

                        {step === 6 && (
                            <div className="space-y-10 animate-in fade-in slide-in-from-bottom-5 duration-500">
                                <div className="text-center space-y-3">
                                    <h3 className="text-3xl md:text-4xl font-black text-white italic tracking-tighter">⏳ Time Slot Reserved — Awaiting Deposit Confirmation</h3>
                                    <p className="text-slate-400">Your cleaning team is temporarily assigned. Confirm below to lock your crew.</p>
                                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/10 border border-red-500/20 rounded-full text-red-500 font-mono text-xs font-bold">
                                        <Clock className="w-4 h-4" /> RELEASES IN: {formatTime(timeLeft)}
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-8">
                                    <div className="space-y-6">
                                        <div className="space-y-4">
                                            <h4 className="text-sm font-black text-emerald-400 uppercase tracking-widest flex items-center gap-2"><User className="w-4 h-4" /> Deployment Data</h4>
                                            <div className="grid gap-4">
                                                <div className="space-y-1">
                                                    <label className="text-[10px] font-black text-slate-500 uppercase">Contact Name</label>
                                                    <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm font-bold outline-none focus:ring-2 focus:ring-emerald-500/50" />
                                                </div>
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div className="space-y-1">
                                                        <label className="text-[10px] font-black text-slate-500 uppercase">Email</label>
                                                        <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-emerald-500/50" />
                                                    </div>
                                                    <div className="space-y-1">
                                                        <label className="text-[10px] font-black text-slate-500 uppercase">Phone</label>
                                                        <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-emerald-500/50" />
                                                    </div>
                                                </div>
                                                <div className="space-y-1">
                                                    <label className="text-[10px] font-black text-slate-500 uppercase">Service Address</label>
                                                    <input type="text" name="address" value={formData.address} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-emerald-500/50" placeholder="Street, Woodstock, GA" />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="p-6 bg-emerald-500/5 border border-emerald-500/20 rounded-3xl space-y-4">
                                            <h4 className="text-sm font-black text-emerald-400 uppercase tracking-widest flex items-center gap-2"><Sparkles className="w-4 h-4" /> Optional Service Enhancements</h4>
                                            <div className="space-y-2">
                                                {formData.mainService === 'short_term' ? (
                                                    // STR toggle add-ons — use str_ IDs to match the engine catalog
                                                    [
                                                        { id: 'str_windows', label: 'Interior Window Cleaning', price: '~28' },
                                                        { id: 'str_pet', label: 'Pet Hair & Dander Treatment', price: '~34' },
                                                        { id: 'str_cabinets', label: 'Interior Cabinet Wipe-Down', price: '~32' }
                                                    ].map(upsell => {
                                                        const isSelected = strAddons.includes(upsell.id);
                                                        return (
                                                            <button
                                                                key={upsell.id}
                                                                onClick={() => {
                                                                    track_event("upsell_toggled");
                                                                    const next = isSelected
                                                                        ? strAddons.filter(id => id !== upsell.id)
                                                                        : [...strAddons, upsell.id];
                                                                    setStrAddons(next);
                                                                    calculateAdvancedEstimate({ ...formData, strAddonsOverride: next });
                                                                }}
                                                                className={`w-full p-3 rounded-xl border flex justify-between items-center transition-all group ${isSelected ? 'bg-emerald-500/15 border-emerald-500 text-white' : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10 hover:border-white/20'}`}
                                                            >
                                                                <span className="text-xs font-bold flex items-center gap-2">
                                                                    {isSelected && <Check className="w-3 h-3 text-emerald-400" />}
                                                                    {upsell.label}
                                                                </span>
                                                                <span className={`text-xs font-black ${isSelected ? 'text-emerald-400' : 'text-emerald-500'}`}>
                                                                    {isSelected ? '✓ Added' : `+$${upsell.price}`}
                                                                </span>
                                                            </button>
                                                        );
                                                    })
                                                ) : (
                                                    // Residential/Commercial toggle add-ons
                                                    [
                                                        { id: 'windows', label: 'Interior Windows (10-15)', price: '65' },
                                                        { id: 'pet_heavy', label: 'Pet Hair Deep-Removal', price: '45' },
                                                        { id: 'sofa', label: 'Deep Sofa Sanitize', price: '55' }
                                                    ].map(upsell => {
                                                        const isSelected = formData.extras.includes(upsell.id);
                                                        return (
                                                            <button
                                                                key={upsell.id}
                                                                onClick={() => {
                                                                    track_event("upsell_toggled");
                                                                    const newExtras = isSelected
                                                                        ? formData.extras.filter(e => e !== upsell.id)
                                                                        : [...formData.extras, upsell.id];
                                                                    const nextState = { ...formData, extras: newExtras };
                                                                    setFormData(nextState);
                                                                    calculateAdvancedEstimate(nextState);
                                                                }}
                                                                className={`w-full p-3 rounded-xl border flex justify-between items-center transition-all group ${isSelected ? 'bg-emerald-500/15 border-emerald-500 text-white' : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10 hover:border-white/20'}`}
                                                            >
                                                                <span className="text-xs font-bold flex items-center gap-2">
                                                                    {isSelected && <Check className="w-3 h-3 text-emerald-400" />}
                                                                    {upsell.label}
                                                                </span>
                                                                <span className={`text-xs font-black ${isSelected ? 'text-emerald-400' : 'text-emerald-500'}`}>
                                                                    {isSelected ? '✓ Added' : `+$${upsell.price}`}
                                                                </span>
                                                            </button>
                                                        );
                                                    })
                                                )}
                                            </div>
                                            <p className="text-[9px] text-slate-500 italic">Tap to add or remove — price updates instantly.</p>
                                        </div>
                                    </div>

                                    <div className="space-y-6">
                                        <div className={`p-8 rounded-[2.5rem] border transition-all duration-500 ${isRecurringConverted ? 'bg-indigo-500/10 border-indigo-500 shadow-[0_0_30px_rgba(79,70,229,0.15)]' : 'bg-[#020617] border-white/10'}`}>
                                            {!isRecurringConverted ? (
                                                <div className="space-y-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="p-2 bg-indigo-500/20 rounded-lg text-indigo-400"><Lock className="w-5 h-5" /></div>
                                                        <h4 className="font-bold text-indigo-400">Save 12% With a Maintenance Plan</h4>
                                                    </div>
                                                    <p className="text-xs text-slate-400 leading-relaxed">Keep your home consistently clean and reduce future deep-clean costs.</p>
                                                    <div className="grid grid-cols-2 gap-2 text-[10px] text-slate-300">
                                                        <span className="flex items-center gap-1"><Check className="w-3 h-3 text-emerald-500" /> Locked crew</span>
                                                        <span className="flex items-center gap-1"><Check className="w-3 h-3 text-emerald-500" /> Priority slots</span>
                                                    </div>
                                                    <button
                                                        onClick={() => {
                                                            track_event("recurring_clicked");
                                                            setIsRecurringConverted(true);
                                                            const nextState = { ...formData, frequency: 'biweekly' };
                                                            setFormData(nextState);
                                                            calculateAdvancedEstimate(nextState);
                                                        }}
                                                        className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-black text-xs uppercase tracking-widest transition-all"
                                                    >
                                                        Convert to Biweekly & Save
                                                    </button>
                                                </div>
                                            ) : (
                                                <div className="text-center space-y-4">
                                                    <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-2">
                                                        <Check className="w-6 h-6 text-white stroke-[3]" />
                                                    </div>
                                                    <h4 className="font-black text-emerald-400 uppercase tracking-widest">Maintenance Plan Activated</h4>
                                                    <p className="text-xs text-slate-300">12% Loyalty Discount Applied to all future cleans.</p>
                                                </div>
                                            )}
                                        </div>

                                        <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-[2.5rem] p-8 space-y-6 text-center shadow-[0_20px_50px_rgba(16,185,129,0.1)]">
                                            <div className="space-y-4">
                                                <label className="flex items-start gap-4 cursor-pointer group text-left">
                                                    <input
                                                        type="checkbox"
                                                        checked={acceptedTerms}
                                                        onChange={(e) => setAcceptedTerms(e.target.checked)}
                                                        className="mt-1 w-5 h-5 rounded border-white/20 bg-white/5 text-emerald-500 focus:ring-emerald-500/50 cursor-pointer"
                                                    />
                                                    <span className="text-[10px] text-slate-400 group-hover:text-slate-200 transition-colors leading-tight uppercase font-bold">
                                                        Acepto los términos de garantía y acuerdo de precios finales descritos en el presupuesto formal.
                                                    </span>
                                                </label>

                                                <div className="pt-4 border-t border-white/10">
                                                    <span className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.2em]">DEPOSIT REQUIRED TODAY</span>
                                                    <div className="text-5xl font-black text-white tracking-tighter">${estimatedPrice?.deposit}</div>
                                                </div>
                                            </div>

                                            <button
                                                onClick={handleDepositClick}
                                                disabled={!acceptedTerms}
                                                className={`w-full py-5 rounded-3xl font-black text-lg transition-all flex items-center justify-center gap-3 active:scale-95 ${acceptedTerms ? 'bg-emerald-500 hover:bg-emerald-400 text-[#020617] shadow-[0_10px_30px_rgba(16,185,129,0.3)]' : 'bg-white/5 text-slate-500 cursor-not-allowed'}`}
                                            >
                                                {`Confirm & Lock Crew — $${estimatedPrice?.deposit} Deposit`}
                                            </button>

                                            <div className="pt-4 flex flex-col items-center gap-2">
                                                <div className="flex items-center gap-2 text-[10px] font-black text-emerald-500 uppercase">
                                                    <Shield className="w-4 h-4" /> 48-Hour Satisfaction Guarantee
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}




                        {step === 7 && (
                            <div className="text-center py-12 space-y-10 animate-in zoom-in duration-700">
                                <div className="space-y-6">
                                    <div className="w-24 h-24 bg-emerald-500 rounded-full flex items-center justify-center mx-auto shadow-[0_0_50px_rgba(16,185,129,0.5)]">
                                        <Check className="w-12 h-12 text-white stroke-[4]" />
                                    </div>
                                    <div className="space-y-2">
                                        <h2 className="text-5xl font-black text-white tracking-tighter italic">✅ Booking Confirmed!</h2>
                                        <p className="text-slate-400 text-lg">We've locked your professional crew for Woodstock, GA.</p>
                                    </div>
                                </div>

                                <div className="max-w-xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
                                    <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                                        <div className="text-[10px] text-slate-500 font-black uppercase mb-1">Service Date</div>
                                        <div className="text-sm font-bold text-white">{formData.date}</div>
                                    </div>
                                    <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                                        <div className="text-[10px] text-slate-500 font-black uppercase mb-1">Crew Size</div>
                                        <div className="text-sm font-bold text-white">{estimatedPrice?.personnel}</div>
                                    </div>
                                    <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                                        <div className="text-[10px] text-slate-500 font-black uppercase mb-1">Deposit Paid</div>
                                        <div className="text-sm font-bold text-emerald-400 font-mono">${estimatedPrice?.deposit}</div>
                                    </div>
                                    <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                                        <div className="text-[10px] text-slate-500 font-black uppercase mb-1">Balance</div>
                                        <div className="text-sm font-bold text-white font-mono">${estimatedPrice?.total - estimatedPrice?.deposit}</div>
                                    </div>
                                </div>

                                <div className="bg-[#020617] border border-white/10 rounded-[2.5rem] p-8 max-w-lg mx-auto space-y-6 relative overflow-hidden shadow-2xl">
                                    <div className="relative z-10 space-y-4 text-center">
                                        <h4 className="text-sm font-black text-emerald-400 uppercase tracking-[0.3em]">Deployment Success</h4>
                                        <p className="text-sm text-slate-300 leading-relaxed">
                                            A full confirmation with your service checklist and team arrival window has been sent to **{formData.email}**.
                                        </p>
                                        <div className="pt-4 flex justify-center gap-4">
                                            <button onClick={handlePrintReceipt} className="px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-white/10 transition-all">Print Receipt</button>
                                            <button onClick={() => window.location.href = '/'} className="px-6 py-3 bg-emerald-500 text-[#020617] rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-emerald-400 transition-all">Return Home</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                    </div>

                    {step < 7 && (
                        <div className="flex justify-between items-center mt-12 pt-8 border-t border-white/5">
                            {step > 1 ? (
                                <button onClick={prevStep} className="flex items-center gap-2 text-slate-500 hover:text-white transition-all font-bold uppercase text-xs tracking-widest">
                                    <ChevronLeft className="w-5 h-5" /> Back
                                </button>
                            ) : <div />}

                            <button
                                onClick={step === 6 ? handleDepositClick : nextStep}
                                disabled={isSubmitting || isCalculating}
                                className={`flex items-center gap-3 px-10 py-4 rounded-2xl font-black transition-all ${step === 6 ? 'bg-emerald-600 hover:bg-emerald-500 text-white' : 'bg-white text-[#020617] hover:bg-emerald-400'} shadow-lg disabled:opacity-30 uppercase text-sm tracking-widest`}
                            >
                                {isSubmitting ? 'PROCESSING...' : step === 5 ? 'LOCK QUOTE & CONTINUE' : step === 6 ? 'CONFIRM BOOKING' : 'NEXT STEP'} <ChevronRight className="w-5 h-5" />
                            </button>
                        </div>
                    )}

                </div>
            </div>
        </div >
    );
};

export default BookingPage;
