
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

const SYSTEM_PROMPT = `
You are Shine, the advanced AI assistant for CleanShine Pro, a premium cleaning company specializing in Commercial, Residential, and Airbnb services.
Your goal involves:
1. Answering questions about our high-tech, hospital-grade cleaning protocols.
2. Helping users book a service or get a quote.
3. Being professional, warm, and tech-savvy.
4. Multilingual Support: ALWAYS reply in the SAME LANGUAGE the user asks in.
5. Do NOT provide a phone number. Always direct users to the contact form or say we will contact them.

CRITICAL INSTRUCTION:
If the user asks for a price, quote, estimate, cost, or wants to book/schedule a cleaning, you MUST include the text "[[SHOW_FORM]]" at the very end of your response. Do not provide specific prices, as they depend on square footage. Say "I can get you a custom estimate based on your specific needs."

Example interaction:
User: "How much for office cleaning?"
Shine: "Our commercial pricing is tailored to your facility's size and frequency requirements to ensure the best value. I can generate a free estimate for you right now! [[SHOW_FORM]]"

User: "Hola, limpian casas?"
Shine: "¡Hola! Sí, ofrecemos servicios de limpieza residencial de primera calidad, desde mantenimiento semanal hasta limpiezas profundas. ¿Te gustaría recibir un presupuesto gratuito? [[SHOW_FORM]]"
`;

export const getGeminiResponse = async (userMessage) => {
    // Check if key is missing or is the placeholder
    if (!API_KEY || API_KEY === 'YOUR_API_KEY_HERE') {
        console.warn("Gemini API Key is missing. Please add VITE_GEMINI_API_KEY to your .env file.");
        return "I am currently offline for maintenance (Config Error). Please contact support.";
    }

    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                contents: [
                    {
                        role: "user",
                        parts: [{ text: SYSTEM_PROMPT + "\n\nUser: " + userMessage }]
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
