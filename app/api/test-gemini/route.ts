import { NextResponse } from "next/server";

export async function GET() {
    try {
        // Get API key - Next.js automatically loads .env.local
        const apiKey = process.env.GEMINI_API_KEY;

        if (!apiKey) {
            return NextResponse.json({ error: "API key not found. Please set GEMINI_API_KEY in your environment variables." }, { status: 500 });
        }

        // Test with multiple model variations
        const modelsToTry = [
            'gemini-1.5-flash-latest',
            'gemini-1.5-flash',
            'gemini-1.5-pro-latest',
            'gemini-1.5-pro'
        ];

        let lastError: any = null;
        let lastStatusCode = 0;
        let successfulModel: string | null = null;
        let testData: any = null;

        for (const modelName of modelsToTry) {
            try {
                console.log(`Testing model: ${modelName}`);
                const testResponse = await fetch(
                    `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`,
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            contents: [{
                                parts: [{
                                    text: "Say hello in one word"
                                }]
                            }]
                        })
                    }
                );

                if (testResponse.ok) {
                    testData = await testResponse.json();
                    successfulModel = modelName;
                    break;
                } else {
                    const errorText = await testResponse.text();
                    try {
                        lastError = JSON.parse(errorText);
                    } catch {
                        lastError = { message: errorText || testResponse.statusText };
                    }
                    lastStatusCode = testResponse.status;
                    console.log(`✗ ${modelName} failed: ${lastError.error?.message || lastError.message}`);
                }
            } catch (fetchError: any) {
                console.error(`Error testing ${modelName}:`, fetchError.message);
                lastError = { message: fetchError.message };
            }
        }

        if (successfulModel && testData) {
            return NextResponse.json({
                apiKeyFound: true,
                apiKeyLength: apiKey.length,
                testStatus: 200,
                successfulModel: successfulModel,
                testResponse: testData,
                success: true
            });
        }

        // All models failed
        return NextResponse.json({
            apiKeyFound: true,
            apiKeyLength: apiKey.length,
            testStatus: lastStatusCode || 500,
            error: lastError,
            modelsTried: modelsToTry,
            success: false,
            suggestion: "Check available models at https://aistudio.google.com/app/models"
        }, { status: lastStatusCode || 500 });
    } catch (error: any) {
        return NextResponse.json({
            error: error.message,
            stack: error.stack
        }, { status: 500 });
    }
}



