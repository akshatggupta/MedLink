import { NextResponse } from "next/server";

export async function GET() {
    // Only allow in development for security
    if (process.env.NODE_ENV === 'production') {
        return NextResponse.json({ error: "Not available in production" }, { status: 403 });
    }

    try {
        // Get API key - Next.js automatically loads .env.local
        const apiKey = process.env.GEMINI_API_KEY;

        if (!apiKey) {
            return NextResponse.json({ error: "API key not configured. Please set GEMINI_API_KEY in your environment variables." }, { status: 500 });
        }

        // List models using the REST API directly
        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`
        );
        
        if (!response.ok) {
            const errorText = await response.text();
            let errorData;
            try {
                errorData = JSON.parse(errorText);
            } catch {
                errorData = { message: errorText || response.statusText };
            }
            return NextResponse.json({
                error: errorData.message || "Failed to list models",
                details: errorData
            }, { status: response.status });
        }
        
        const data = await response.json();
        
        return NextResponse.json({
            success: true,
            models: data.models || [],
            modelNames: data.models?.map((m: any) => m.name) || []
        });
    } catch (error: any) {
        return NextResponse.json({
            error: error.message || "Failed to list models",
            details: error.toString()
        }, { status: 500 });
    }
}



