"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Send, Sparkles, User, Bot } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface Message {
    id: string
    role: "user" | "assistant"
    content: string
    timestamp: Date
}

export function ChatInterface() {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: "1",
            role: "assistant",
            content: "Hello! I'm your AI Health Assistant. How can I help you today? You can ask me about symptoms, medications, or general health advice.",
            timestamp: new Date(),
        },
    ])
    const [input, setInput] = useState("")
    const [isTyping, setIsTyping] = useState(false)
    const messagesEndRef = useRef<HTMLDivElement>(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages, isTyping])

    const handleSend = async () => {
        if (!input.trim()) return

        const userMessage: Message = {
            id: Date.now().toString(),
            role: "user",
            content: input,
            timestamp: new Date(),
        }

        setMessages((prev) => [...prev, userMessage])
        setInput("")
        setIsTyping(true)

        // Simulate AI response
        setTimeout(() => {
            const aiMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: "assistant",
                content: "I understand. Please note that I am an AI and not a doctor. However, based on what you've told me, it sounds like you might be experiencing common symptoms. I recommend consulting with a specialist if symptoms persist.",
                timestamp: new Date(),
            }
            setMessages((prev) => [...prev, aiMessage])
            setIsTyping(false)
        }, 1500)
    }

    return (
        <div className="flex flex-col h-[600px] bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-green-600 to-cyan-500 p-4 flex items-center gap-3 text-white">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                    <Sparkles className="w-5 h-5" />
                </div>
                <div>
                    <h3 className="font-bold">MedLink AI</h3>
                    <p className="text-xs text-green-100 flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                        Online
                    </p>
                </div>
            </div>

            {/* Messages */}
            <div className="flex-grow overflow-y-auto p-4 space-y-4 bg-slate-50">
                {messages.map((message) => (
                    <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={cn(
                            "flex gap-3 max-w-[80%]",
                            message.role === "user" ? "ml-auto flex-row-reverse" : ""
                        )}
                    >
                        <div
                            className={cn(
                                "w-8 h-8 rounded-full flex items-center justify-center shrink-0",
                                message.role === "user" ? "bg-green-100" : "bg-cyan-100"
                            )}
                        >
                            {message.role === "user" ? (
                                <User className="w-4 h-4 text-green-600" />
                            ) : (
                                <Bot className="w-4 h-4 text-cyan-600" />
                            )}
                        </div>
                        <div
                            className={cn(
                                "p-3 rounded-2xl text-sm leading-relaxed shadow-sm",
                                message.role === "user"
                                    ? "bg-green-600 text-white rounded-tr-none"
                                    : "bg-white text-slate-700 rounded-tl-none border border-slate-100"
                            )}
                        >
                            {message.content}
                        </div>
                    </motion.div>
                ))}

                {isTyping && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex gap-3 max-w-[80%]"
                    >
                        <div className="w-8 h-8 rounded-full bg-cyan-100 flex items-center justify-center shrink-0">
                            <Bot className="w-4 h-4 text-cyan-600" />
                        </div>
                        <div className="bg-white p-4 rounded-2xl rounded-tl-none border border-slate-100 shadow-sm flex gap-1">
                            <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                            <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                            <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                        </div>
                    </motion.div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 bg-white border-t border-slate-100">
                <form
                    onSubmit={(e) => {
                        e.preventDefault()
                        handleSend()
                    }}
                    className="flex gap-2"
                >
                    <Input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Type your health question..."
                        className="flex-grow rounded-full bg-slate-50 border-slate-200 focus-visible:ring-green-500"
                    />
                    <Button
                        type="submit"
                        size="icon"
                        className="rounded-full bg-green-600 hover:bg-green-700 w-10 h-10 shrink-0"
                        disabled={!input.trim() || isTyping}
                    >
                        <Send className="w-4 h-4" />
                    </Button>
                </form>
            </div>
        </div>
    )
}
