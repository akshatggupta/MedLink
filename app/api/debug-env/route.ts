import { NextResponse } from "next/server";

export async function GET() {
    // Only allow in development for security
    if (process.env.NODE_ENV === 'production') {
        return NextResponse.json({ error: "Not available in production" }, { status: 403 });
    }

    // Next.js automatically loads .env.local
    const groqKey = process.env.GROQ_API_KEY;

    return NextResponse.json({
        hasGroqKey: !!groqKey,
        groqKeyLength: groqKey?.length || 0,
        groqKeyPrefix: groqKey ? groqKey.substring(0, 10) + "..." : "NOT SET",
        nodeEnv: process.env.NODE_ENV,
        allEnvKeysWithGroq: Object.keys(process.env)
            .filter(key => key.includes('GROQ') || key.includes('API'))
            .map(key => ({
                key,
                hasValue: !!process.env[key],
                length: process.env[key]?.length || 0
            }))
    });
}

