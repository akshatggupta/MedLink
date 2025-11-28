import { ChatInterface } from "@/components/ai/ChatInterface"

export default function AIAssistantPage() {
    return (
        <div className="min-h-screen bg-slate-50 pt-24 pb-20 px-4 sm:px-6 lg:px-8">
            <div className="container mx-auto max-w-4xl">
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-bold text-slate-900 mb-4">AI Health Assistant</h1>
                    <p className="text-slate-600 max-w-2xl mx-auto">
                        Get instant answers to your health queries, check symptoms, and receive personalized wellness recommendations.
                    </p>
                </div>

                <ChatInterface />

                <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                        {
                            title: "Symptom Checker",
                            description: "Describe your symptoms to get a preliminary analysis.",
                        },
                        {
                            title: "Medication Info",
                            description: "Ask about side effects, dosage, and interactions.",
                        },
                        {
                            title: "Wellness Tips",
                            description: "Get advice on diet, exercise, and mental health.",
                        },
                    ].map((item, i) => (
                        <div key={i} className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm text-center">
                            <h3 className="font-semibold text-slate-900 mb-2">{item.title}</h3>
                            <p className="text-sm text-slate-500">{item.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
