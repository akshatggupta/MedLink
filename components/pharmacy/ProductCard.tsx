"use client"

import { motion } from "framer-motion"
import { ShoppingCart, Plus, Star } from "lucide-react"
import { Medicine } from "@/lib/mock-data"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useCart } from "@/lib/cart-context"  

interface ProductCardProps {
    product: Medicine
    index?: number
}

    export function ProductCard({ product, index = 0 }: ProductCardProps) {
    const { addToCart } = useCart();
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}  
            viewport={{ once: true }}
            transition={{ delay: index * 0.05, duration: 0.4 }}
            className="bg-white rounded-2xl p-4 border border-slate-100 hover:shadow-xl hover:border-green-100 transition-all duration-300 group"
        >
            <div className="relative h-48 mb-4 rounded-xl overflow-hidden bg-slate-50 flex items-center justify-center">
                {/* Placeholder for product image */}
                <div className="w-full h-full bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
                    <div className="text-4xl">💊</div>
                </div>

                {!product.inStock && (
                    <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                        Out of Stock
                    </div>
                )}
            </div>

            <div className="space-y-2">
                <div className="flex justify-between items-start">
                    <div>
                        <p className="text-xs text-green-600 font-medium mb-1">{product.category}</p>
                        <h3 className="font-bold text-slate-900 line-clamp-1">{product.name}</h3>
                    </div>
                    <div className="flex items-center gap-1 text-yellow-500 text-xs font-medium">
                        <Star className="w-3 h-3 fill-current" />
                        {product.rating}
                    </div>
                </div>

                <p className="text-xs text-slate-500 line-clamp-2 h-8">
                    {product.description}
                </p>

                <div className="pt-3 flex items-center justify-between">
                    <span className="text-lg font-bold text-slate-900">${product.price.toFixed(2)}</span>
                    <Button
                        size="sm"
                        className="rounded-full w-8 h-8 p-0 bg-green-50 text-green-600 hover:bg-green-600 hover:text-white transition-colors"
                        disabled={!product.inStock}
                        onClick={() =>
    addToCart({
      id: String(product.id),           // ensure string
      name: product.name,
      price: product.price,
      image: undefined,                 // you can pass real image later
    })
  }
                    >
                        <Plus className="w-4 h-4" />
                    </Button>
                </div>
            </div>
        </motion.div>
    )
}
