import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { message } = await req.json();

        if (!message || typeof message !== "string") {
            return NextResponse.json(
                { error: "Message is required" },
                { status: 400 }
            );
        }

        const apiKey = process.env.GROQ_API_KEY;

        if (!apiKey) {
            return NextResponse.json(
                { error: "GROQ_API_KEY not configured" },
                { status: 500 }
            );
        }

        // Check if the message is medical-related
        const medicalKeywords = [
            'symptom', 'pain', 'fever', 'headache', 'sick', 'disease', 'treatment',
            'medicine', 'doctor', 'health', 'injury', 'hurt', 'ache', 'infection',
            'cough', 'cold', 'flu', 'nausea', 'vomit', 'diarrhea', 'rash', 'swelling',
            'bleeding', 'dizzy', 'fatigue', 'tired', 'weak', 'medication', 'prescription',
            'diagnosis', 'condition', 'chest', 'stomach', 'throat', 'ear', 'eye',
            'allergy', 'breathing', 'heart', 'blood', 'pressure', 'diabetes', 'cancer',
            'covid', 'vaccine', 'virus', 'bacteria', 'medical', 'hospital', 'clinic',
            'should i see', 'what causes', 'how to treat', 'is it normal', 'remedy'
        ];

        const messageLower = message.toLowerCase();
        const isMedicalQuery = medicalKeywords.some(keyword =>
            messageLower.includes(keyword)
        );

        if (!isMedicalQuery) {
            return NextResponse.json({
                response: "I'm a medical assistant and can only help with health-related questions. Please ask me about symptoms, conditions, or general health concerns."
            });
        }

        const groqRes = await fetch(
            "https://api.groq.com/openai/v1/chat/completions",
            {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${apiKey}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    model: "llama-3.1-8b-instant",
                    messages: [
                        {
                            role: "system",
                            content: `You are a strict medical assistant. Follow these rules:

STRICT RULES:
1. ONLY answer medical and health-related questions
2. If asked about jokes, stories, code, math, or anything non-medical, respond EXACTLY with: "I can only help with medical and health questions."
3. Keep medical responses SHORT (3-5 sentences max)
4. Use simple, clear language
5. Always end with: "⚠️ Consult a healthcare professional for proper diagnosis and treatment."
6. Never diagnose or prescribe specific medications
7. DO NOT engage with non-medical topics under any circumstances

If the question is not about health, symptoms, conditions, treatments, or medical concerns, refuse politely.`
                        },
                        {
                            role: "user",
                            content: message,
                        },
                    ],
                    temperature: 0.3,
                    max_tokens: 200,
                }),
            }
        );

        if (!groqRes.ok) {
            const errText = await groqRes.text();
            console.error("❌ Groq API failed:", groqRes.status, errText);

            return NextResponse.json(
                {
                    error: "Groq API error",
                    details: errText,
                    statusCode: groqRes.status
                },
                { status: 500 }
            );
        }

        const data = await groqRes.json();
        const text = data?.choices?.[0]?.message?.content;

        if (!text) {
            return NextResponse.json({
                response: "No response received. Please try again.",
            });
        }

        return NextResponse.json({ response: text });

    } catch (error: any) {
        console.error("❌ Server Error:", error.message);
        return NextResponse.json(
            {
                error: "Internal server error",
                message: error.message
            },
            { status: 500 }
        );
    }
}