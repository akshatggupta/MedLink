import { NextResponse } from "next/server";

export async function GET() {
    // Disable in production
    if (process.env.NODE_ENV === "production") {
        return NextResponse.json(
            { error: "Not available in production" },
            { status: 403 }
        );
    }

    try {
        const apiKey = process.env.GROQ_API_KEY;

        if (!apiKey) {
            return NextResponse.json(
                { error: "GROQ_API_KEY not configured" },
                { status: 500 }
            );
        }

        const response = await fetch(
            "https://api.groq.com/openai/v1/models",
            {
                headers: {
                    "Authorization": `Bearer ${apiKey}`
                }
            }
        );

        const data = await response.json();

        if (!response.ok) {
            return NextResponse.json(
                { error: data },
                { status: response.status }
            );
        }

        return NextResponse.json({
            success: true,
            models: data.data,
            modelNames: data.data?.map((m: any) => m.id),
        });
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );
    }
}
