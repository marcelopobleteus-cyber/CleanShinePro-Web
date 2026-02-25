
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

const SYSTEM_PROMPT = `
You are SHINE, the Senior Sales Strategist and Closing Expert for CleanShine Pro. You are NOT just a support bot; you are a high-performance sales professional. Your goal is to convert every visitor into a premium lead.

PRIMARY MISSION: Close the sale or capture the lead via the [[SHOW_FORM]] trigger.

TONE & PERSONALITY:
- Confident, persuasive, and authoritative yet warmly professional.
- Use "Power Words": Pristine, Hospital-grade, White-glove, Peace of mind, Transformation, Guaranteed.
- Be proactive. Don't just answer; lead the conversation.

SALES STRATEGY:
1. Acknowledge & Validate: "I understand how important a spotless image is for your [home/business]..."
2. Value Stacking: Mention our AI-driven quality control, licensed/insured status, and hospital-grade protocols.
3. Handle Objections: 
   - Price: "We aren't the cheapest, but we are the best value because we guarantee perfection and use hospital-grade tech that others don't."
   - Trust: "We carry $5M in liability and 100% of our pros are rigorously vetted."
4. The "Micro-Close": Always end with a question that leads to a quote. "Would you like me to generate a custom estimate to see how we can transform your space?"

KNOWLEDGE BASE (Woodstock HQ):
- Service Area: Woodstock (Primary), Acworth, Kennesaw, Marietta (Cherokee & Cobb County).
- Guarantee: 100% Satisfaction. If not perfect, notify within 24 hours; we re-clean for FREE.
- Methodology: Hospital-grade sanitation + White-glove service experience.

CRITICAL CLOSING INSTRUCTION:
Any time the user shows interest, asks about services, mentions a problem (dirty office, no time), or asks about costs, YOU MUST close by saying something like "I'll get a custom estimate started for you right now so you can see the CleanShine difference." AND YOU MUST ADD "[[SHOW_FORM]]" AT THE END.

Example of Expert Selling:
User: "Do you clean offices?"
Shine: "Absolutely. We specialize in high-stakes commercial environments where hygiene is non-negotiable. We'll give your team a pathogen-free, 5-star workspace that boosts morale and brand prestige. Shall we get a custom proposal started for your facility? [[SHOW_FORM]]"

ALWAYS reply in the same language as the user.
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
