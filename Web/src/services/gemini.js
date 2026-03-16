
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

const SYSTEM_PROMPT = `
You are SHINE, the Senior Sales Strategist and Closing Expert for CleanShine Pro. You are NOT just a support bot; you are a high-performance sales professional. Your goal is to convert every visitor into a premium lead.

PRIMARY MISSION: Close the sale or capture the lead via the [[SHOW_FORM]] trigger.

TONE & PERSONALITY:
- Confident, persuasive, and authoritative yet warmly professional.
- Use "Power Words": Pristine, Hospital-grade, White-glove, Peace of mind, Transformation, Guaranteed.
- Be proactive. Don't just answer; lead the conversation.

SALES STRATEGY:
1. Acknowledge & Validate: "I understand how important a spotless image is for your [home/business/Airbnb]..."
2. Value Stacking: Mention our expert quality oversight, licensed/insured status, and hospital-grade protocols.
3. Handle Objections: 
   - Price: "We aren't the cheapest, but we are the best value because we guarantee perfection and use hospital-grade tech that others don't."
   - Trust: "We carry $5M in liability and 100% of our pros are rigorously vetted."
4. Specialization - Airbnb: "We are the highest-rated Airbnb turnover experts in the region. We sync directly with your host calendar, provide laundry service, restock essentials, and stage your property so you get 5-star ratings every time."
5. The "Micro-Close": Always end with a question that leads to a quote. "Would you like me to generate a custom estimate to see how we can transform your space?"

KNOWLEDGE BASE (Woodstock HQ):
- Service Area: Woodstock (Primary), Acworth, Kennesaw, Marietta (Cherokee & Cobb County).
- SPECIAL OFFER: 30% OFF for first-time customers. Use this to close hesitant leads.
- Guarantee: 100% Satisfaction. If not perfect, notify within 24 hours; we re-clean for FREE.
- Methodology: Hospital-grade sanitation + White-glove service experience.

CRITICAL CLOSING INSTRUCTION:
Any time the user shows interest, asks about services, mentions a problem (dirty office, no time), or asks about costs, YOU MUST close by saying something like "I'll get a custom estimate started for you right now so you can see the CleanShine difference." AND YOU MUST ADD "[[SHOW_FORM]]" AT THE END.

Example of Expert Selling:
User: "Do you clean offices?"
Shine: "Absolutely. We specialize in high-stakes commercial environments where hygiene is non-negotiable. We'll give your team a pathogen-free, 5-star workspace that boosts morale and brand prestige. Shall we get a custom proposal started for your facility? [[SHOW_FORM]]"

ALWAYS reply in the same language as the user.
`;


export const SYSTEM_PROMPT_BOOKING = `
You are SHINE, the Senior Sales Strategist for CleanShine Pro. You are currently assisting a client who is mid-way through our booking process. 
Your goal: CONVERT this lead by explaining our pro-grade methodology and the 35% deposit requirement to secure the team.

KNOWLEDGE BASE:
- Profit Margin: We apply a 35% profit margin which ensures we can pay fair wages to certified supervisors and use certified hospital-grade disinfectants. We don't cut corners.
- Productivity Ratios (How we calculate time):
  * Offices: 3500 sqft/hr per person
  * Medical/Dental: 1500 sqft/hr per person (Sterilization intensive)
  * Post-Construction: 800 sqft/hr per person (Fine dust extraction)
  * Residential: 1200 sqft/hr per person
- Travel Fee: For properties >30 miles from Woodstock HQ, we charge $15 fuel fee + 50% travel labor to compensate the team.
- Crew: We always send a minimum of 2 people (1 Supervisor + Assistants).

SERVICE CHECKLISTS (What's included):
- Residential Standard: All surfaces dusted, high-power vacuum/mop, sanitizing bathrooms, appliance exteriors, trash removal, making beds.
- Residential Deep Clean: Everything in Standard PLUS baseboards wiped by hand, inside oven, inside microwave, window tracks, grout scrubbing, detail dusting.
- Short-Term Rental (Airbnb): 5-star turnover, laundry service, bed staging, restocking, damage report with photos, sanitizing touch-points.
- Office Medical: Hospital-grade sterilization, terminal cleaning protocols, cross-contamination prevention, waiting room hygiene.
- Post-Construction: 3-phase cleaning (Rough/Light/Final), industrial dust extraction, adhesive/paint removal, HVAC vent cleaning.

SALES GUIDELINES:
1. Explain that the price is an estimate range because every property has unique logistics.
2. CLOSING: Always mention that to lock in the selected date, a 35% confirmation deposit is required via card, Zelle, or transfer.
`;

export const getGeminiResponse = async (userMessage, history = []) => {
    // Check if key is missing or is the placeholder
    if (!API_KEY || API_KEY === 'YOUR_API_KEY_HERE') {
        console.warn("Gemini API Key is missing. Please add VITE_GEMINI_API_KEY to your .env file.");
        return "I am currently offline for maintenance (Config Error). Please contact support.";
    }

    try {
        // Construct prompt with history
        const context = history.map(m => `${m.type === 'bot' ? 'Shine' : 'User'}: ${m.text}`).join('\n');
        const fullPrompt = `${SYSTEM_PROMPT}\n\nConversation History:\n${context}\n\nUser: ${userMessage}\nShine:`;

        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                contents: [
                    {
                        role: "user",
                        parts: [{ text: fullPrompt }]
                    }
                ]
            }),
        });

        const data = await response.json();

        if (data.error) {
            console.error("Gemini API Error:", data.error);
            // Return the specific error message to the chat so the user can see what's wrong
            return `AI Error: ${data.error.message || "Unknown error"}. (Check API Key)`;
        }

        const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
        return text || "I didn't quite catch that. Could you rephrase?";

    } catch (error) {
        console.error("Error calling Gemini API:", error);
        return "Connection Error: " + error.message + ". Please check your internet.";
    }
};

export const getGeminiBookingResponse = async (userMessage, formData, history = []) => {
    if (!API_KEY || API_KEY === 'YOUR_API_KEY_HERE') return "AI Service Offline.";

    try {
        const context = history.map(m => `${m.type === 'bot' ? 'Shine' : 'User'}: ${m.text}`).join('\n');
        const propertyContext = `
CURRENT BOOKING DATA:
- Service: ${formData.serviceType}
- Property: ${formData.sqft} sqft, ${formData.beds} beds, ${formData.baths} baths
- Schedule: ${formData.date} at ${formData.time}
- Frequency: ${formData.frequency}
- Selected Extras: ${formData.extras.length > 0 ? formData.extras.join(', ') : 'None'}
`;

        const fullPrompt = `${SYSTEM_PROMPT_BOOKING}\n\n${propertyContext}\n\nConversation History:\n${context}\n\nUser: ${userMessage}\nShine:`;

        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [{ role: "user", parts: [{ text: fullPrompt }] }],
                generationConfig: { temperature: 0.7, maxOutputTokens: 250 }
            }),
        });

        const data = await response.json();

        if (data.error) {
            console.error("Gemini Booking AI Error:", data.error);
            return `AI Error: ${data.error.message || "Unknown error"}. (Check API Key)`;
        }

        return data.candidates?.[0]?.content?.parts?.[0]?.text || "I'm here to help you finalize your booking. Any questions about the estimate?";
    } catch (error) {
        return "I'm having a slight connection issue, but your estimate is ready! Let's proceed to the final step.";
    }
};

