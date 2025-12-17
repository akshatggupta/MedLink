import { NextResponse } from "next/server";

export async function GET() {
    try {
        const apiKey = process.env.GROQ_API_KEY;

        if (!apiKey) {
            return NextResponse.json(
                { error: "GROQ_API_KEY not found" },
                { status: 500 }
            );
        }

        const response = await fetch(
            "https://api.groq.com/openai/v1/chat/completions",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${apiKey}`
                },
                body: JSON.stringify({
                    model: "llama3-70b-8192",
                    messages: [
                        {
                            role: "user",
                            content: "Say hello in one word"
                        }
                    ],
                    max_tokens: 10
                })
            }
        );

        const data = await response.json();

        console.log("Test Groq Response:", JSON.stringify(data, null, 2));

        if (!response.ok) {
            return NextResponse.json(
                { success: false, error: data },
                { status: response.status }
            );
        }

        return NextResponse.json({
            success: true,
            model: "llama3-70b-8192",
            response: data,
        });
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );
    }
}
