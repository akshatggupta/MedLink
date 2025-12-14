"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Send, MessageCircle } from "lucide-react"

interface Message {
  id: string
  text: string
  sender: "user" | "bot"
  timestamp: Date
}

const botResponses: Record<string, string> = {
  hello: "Hello! I'm your health assistant. How can I help you today?",
  hi: "Hi there! Feel free to ask me any health-related questions.",
  "how are you": "I'm doing great, thank you for asking! How can I assist you with your health?",
  appointment:
    "You can book an appointment by visiting our 'Find Doctors' page or using the booking form on a doctor's profile.",
  symptoms: "If you're experiencing symptoms, try our Symptom Checker tool to get personalized doctor recommendations.",
  emergency: "If this is a medical emergency, please call 911 or visit your nearest emergency room immediately.",
  fever:
    "A fever can indicate various conditions. Stay hydrated, rest, and monitor your temperature. If it persists, consult a doctor.",
  headache:
    "For headaches, try resting in a quiet, dark room, staying hydrated, and applying a cold compress. If severe, seek medical attention.",
  cough:
    "A cough can have many causes. Stay hydrated, use honey or cough drops, and rest. If it persists for more than a week, see a doctor.",
  default:
    "I'm here to help with health-related questions. You can ask about symptoms, appointments, or general health advice. What would you like to know?",
}

export function HealthChatbotRedesigned() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! I'm your health assistant. How can I help you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const getBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase()
    for (const [key, response] of Object.entries(botResponses)) {
      if (lowerMessage.includes(key)) {
        return response
      }
    }
    return botResponses.default
  }

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    const userInput = input.trim()
    setInput("")
    setIsLoading(true)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userInput }),
      })

      const data = await response.json()

      if (!response.ok || data.error) {
        throw new Error(data.error || "Failed to get response")
      }

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: data.response || "Sorry, I couldn't generate a response. Please try again.",
        sender: "bot",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botMessage])
    } catch (error: any) {
      console.error("Failed to send message:", error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: error.message || "Sorry, I encountered an error. Please make sure your GEMINI_API_KEY is configured and try again.",
        sender: "bot",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="flex flex-col h-full bg-white border-border rounded-2xl soft-shadow overflow-hidden">
      {/* Header */}
      <div className="bg-primary text-primary-foreground p-6 flex items-center gap-3">
        <MessageCircle size={24} />
        <h3 className="font-bold text-lg">Health Assistant</h3>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-timberwolf/5">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-xs px-4 py-3 rounded-2xl smooth-transition ${
                message.sender === "user"
                  ? "bg-accent text-accent-foreground rounded-br-none"
                  : "bg-white text-foreground border border-border rounded-bl-none soft-shadow"
              }`}
            >
              <p className="text-sm leading-relaxed">{message.text}</p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white border border-border px-4 py-3 rounded-2xl rounded-bl-none soft-shadow">
              <div className="flex gap-2">
                <div className="w-2 h-2 bg-muted rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-muted rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                <div className="w-2 h-2 bg-muted rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSendMessage} className="border-t border-border p-6 flex gap-3 bg-white">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask a health question..."
          className="flex-1 px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-accent text-sm smooth-transition"
          disabled={isLoading}
        />
        <Button
          type="submit"
          size="sm"
          disabled={isLoading || !input.trim()}
          className="bg-accent hover:bg-accent/90 rounded-xl"
        >
          <Send size={18} />
        </Button>
      </form>
    </Card>
  )
}
