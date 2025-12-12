"use client";

import { ReactNode } from "react";
import { AuthProvider } from "@/hooks/useAuth";
import { CartProvider } from "@/lib/cart-context";

export default function Providers({ children }: { children: ReactNode }) {
  return <AuthProvider><CartProvider>{children}</CartProvider></AuthProvider>;
}
