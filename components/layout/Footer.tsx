import Link from "next/link"
import { Heart } from "lucide-react"

export function Footer() {
    return (
        <footer className="bg-slate-50 text-slate-600 py-12 border-t border-slate-200">
            <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-6">

                {/* Brand */}
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 flex items-center justify-center bg-[#14532D] rounded-lg">
                        <Heart className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-lg font-bold text-slate-900">MedLink</span>
                </div>

                {/* Links */}
                <div className="flex flex-wrap justify-center gap-8 text-sm font-medium">
                    <Link href="#" className="hover:text-[#14532D] transition-colors">Pricing</Link>
                    <Link href="#" className="hover:text-[#14532D] transition-colors">Enterprise</Link>
                    <Link href="#" className="hover:text-[#14532D] transition-colors">Careers</Link>
                    <Link href="#" className="hover:text-[#14532D] transition-colors">Blog</Link>
                </div>

                {/* Copyright */}
                <p className="text-sm text-slate-400">
                    © {new Date().getFullYear()} MedLink Inc.
                </p>
            </div>
        </footer>
    )
}
