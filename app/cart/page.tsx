"use client";

import { useCart } from "@/lib/cart-context";
import { Button } from "@/components/ui/button";

export default function CartPage() {
  const { cart, increaseQty, decreaseQty, removeItem, clearCart } = useCart();

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Your cart is empty</h1>
        <p className="text-slate-500">Add some medicines from the Pharmacy page.</p>
      </div>
    );
  }

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-4xl">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-slate-900">Your Cart</h1>
          <Button variant="outline" onClick={clearCart}>
            Clear Cart
          </Button>
        </div>

        <div className="space-y-4 mb-8">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between bg-white border border-slate-200 rounded-xl p-4"
            >
              <div>
                <h2 className="font-semibold text-slate-900">{item.name}</h2>
                <p className="text-sm text-slate-500">₹{item.price.toFixed(2)}</p>
              </div>

              <div className="flex items-center gap-3">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => decreaseQty(item.id)}   // 🔻 decrease
                >
                  -
                </Button>

                <span className="w-6 text-center font-medium">{item.quantity}</span>

                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => increaseQty(item.id)}   // 🔺 increase
                >
                  +
                </Button>

                <Button
                  size="sm"
                  variant="ghost"
                  className="text-red-500"
                  onClick={() => removeItem(item.id)}
                >
                  Remove
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between bg-white border border-slate-200 rounded-xl px-6 py-4">
          <span className="text-lg font-semibold text-slate-900">Total</span>
          <span className="text-xl font-bold text-emerald-600">₹{totalPrice.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}
