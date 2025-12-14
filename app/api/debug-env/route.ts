import { NextResponse } from "next/server";

export async function GET() {
    // Only allow in development for security
    if (process.env.NODE_ENV === 'production') {
        return NextResponse.json({ error: "Not available in production" }, { status: 403 });
    }

    // Next.js automatically loads .env.local
    const geminiKey = process.env.GEMINI_API_KEY;
    
    return NextResponse.json({
        hasGeminiKey: !!geminiKey,
        geminiKeyLength: geminiKey?.length || 0,
        geminiKeyPrefix: geminiKey ? geminiKey.substring(0, 10) + "..." : "NOT SET",
        nodeEnv: process.env.NODE_ENV,
        allEnvKeysWithGemini: Object.keys(process.env)
            .filter(key => key.includes('GEMINI') || key.includes('API'))
            .map(key => ({
                key,
                hasValue: !!process.env[key],
                length: process.env[key]?.length || 0
            }))
    });
}

