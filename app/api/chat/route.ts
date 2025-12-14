import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { message } = await req.json();
        const apiKey = process.env.GEMINI_API_KEY;

        if (!apiKey) {
            return NextResponse.json(
                { error: "Gemini API key not configured" },
                { status: 500 }
            );
        }

        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        const prompt = `
      You are a knowledgeable and helpful medical AI assistant for MedLink. 
      Your goal is to provide clear, accurate, and supportive medical information.
      
      When answering user questions:
      1. Provide detailed and helpful information about symptoms, potential causes, and general treatments or home remedies.
      2. Be empathetic and professional.
      3. Use clear formatting with bullet points if helpful.
      
      IMPORTANT: You must ALWAYS conclude your response with a brief disclaimer that you are an AI and this is not a substitute for professional medical advice.
      
      If the user asks about non-medical topics (like coding, sports, entertainment), politely decline and explain you can only assist with health-related queries.
      
      User Question: ${message}
    `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        return NextResponse.json({ response: text });
    } catch (error) {
        console.error("Error in chat API:", error);
        return NextResponse.json(
            { error: "Failed to process request" },
            { status: 500 }
        );
    }
}
