import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { message } = await req.json();
        
        if (!message || typeof message !== "string" || message.trim().length === 0) {
            return NextResponse.json(
                { error: "Message is required and must be a non-empty string" },
                { status: 400 }
            );
        }

        // Get API key - Next.js automatically loads .env.local
        const apiKey = process.env.GEMINI_API_KEY;

        if (!apiKey || apiKey.length < 20) {
            return NextResponse.json(
                { error: "API key not configured or invalid. Please set GEMINI_API_KEY in your environment variables." },
                { status: 500 }
            );
        }

        const trimmedApiKey = apiKey.trim();

        // Build the prompt
        const prompt = `You are a knowledgeable and helpful medical AI assistant for MedLink. 
Your goal is to provide clear, accurate, and supportive medical information.

When answering user questions:
1. Provide detailed and helpful information about symptoms, potential causes, and general treatments or home remedies.
2. Be empathetic and professional.
3. Use clear formatting with bullet points if helpful.
4. Focus on general health information and education.

IMPORTANT: You must ALWAYS conclude your response with a brief disclaimer that you are an AI and this is not a substitute for professional medical advice. Always recommend consulting with a healthcare professional for serious or persistent symptoms.

If the user asks about non-medical topics (like coding, sports, entertainment), politely decline and explain you can only assist with health-related queries.

User Question: ${message.trim()}`;

        // Try REST API directly (most reliable method)
        // Try multiple model variations in order of preference
        const modelsToTry = [
            'gemini-1.5-flash-latest',
            'gemini-1.5-flash',
            'gemini-1.5-pro-latest',
            'gemini-1.5-pro'
        ];

        let lastError: any = null;
        let lastStatusCode = 0;

        for (const modelName of modelsToTry) {
            try {
                console.log(`Trying model: ${modelName}`);
                const restResponse = await fetch(
                    `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${trimmedApiKey}`,
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            contents: [{
                                parts: [{
                                    text: prompt
                                }]
                            }],
                            generationConfig: {
                                temperature: 0.7,
                                topP: 0.8,
                                topK: 40,
                            }
                        })
                    }
                );

                if (restResponse.ok) {
                    const data = await restResponse.json();
                    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
                    
                    if (text) {
                        console.log(`✓ Success with ${modelName}`);
                        return NextResponse.json({ response: text });
                    }
                } else {
                    // Capture error for this attempt
                    const errorText = await restResponse.text();
                    try {
                        lastError = JSON.parse(errorText);
                    } catch {
                        lastError = { message: errorText || restResponse.statusText };
                    }
                    lastStatusCode = restResponse.status;
                    console.log(`✗ ${modelName} failed: ${lastError.error?.message || lastError.message || restResponse.statusText}`);
                }
            } catch (fetchError: any) {
                console.error(`Error trying ${modelName}:`, fetchError.message);
                lastError = { message: fetchError.message };
            }
        }

        // If all models failed, return the last error
        const errorMessage = lastError?.error?.message || lastError?.message || "All model attempts failed";
        const statusCode = lastStatusCode || 500;

        console.error("API Error:", {
            status: statusCode,
            message: errorMessage,
            fullError: lastError
        });

        return NextResponse.json(
            { 
                error: `API request failed: ${errorMessage}`,
                status: statusCode,
                details: lastError,
                suggestion: "Please check your API key at https://aistudio.google.com/app/apikey and ensure it has access to Gemini models"
            },
            { status: statusCode || 500 }
        );

    } catch (error: any) {
        console.error("Chat API Error:", error);
        return NextResponse.json(
            { 
                error: error.message || "Failed to process request",
                suggestion: "Check server console for details"
            },
            { status: 500 }
        );
    }
}
