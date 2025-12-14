"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

// ---------------- TYPES ----------------

type SignupRole = "patient" | "doctor";

// Mocking the Firebase User interface to avoid breaking other components
export interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signup: (
    email: string,
    password: string,
    name: string,
    role: SignupRole
  ) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

// ---------------- CONTEXT ----------------

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// ---------------- PROVIDER ----------------

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // ✅ Check for existing session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("medlink_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // ✅ MOCK SIGNUP
  const signup = async (
    email: string,
    password: string,
    name: string,
    role: SignupRole
  ) => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    const newUser: User = {
      uid: "mock-uid-" + Math.random().toString(36).substr(2, 9),
      email,
      displayName: name,
      photoURL: null,
    };

    // Save user and role
    localStorage.setItem("medlink_user", JSON.stringify(newUser));
    localStorage.setItem(
      "medlink_user_role",
      JSON.stringify({
        uid: newUser.uid,
        role,
      })
    );

    setUser(newUser);
  };

  // ✅ MOCK LOGIN
  const login = async (email: string, password: string) => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    // For hardcoded demo, we'll accept any valid input, 
    // or you could enforce specific credentials like:
    // if (email !== "admin@medlink.com" || password !== "admin") throw new Error("Invalid credentials");

    const mockUser: User = {
      uid: "mock-user-123",
      email,
      displayName: "Demo User",
      photoURL: null,
    };

    // Check if we have a stored role, if not default to patient
    const storedRole = localStorage.getItem("medlink_user_role");
    if (!storedRole) {
      localStorage.setItem(
        "medlink_user_role",
        JSON.stringify({
          uid: mockUser.uid,
          role: "patient",
        })
      );
    }

    localStorage.setItem("medlink_user", JSON.stringify(mockUser));
    setUser(mockUser);
  };

  // ✅ LOGOUT
  const logout = async () => {
    localStorage.removeItem("medlink_user");
    localStorage.removeItem("medlink_user_role");
    setUser(null);
  };

  const value: AuthContextType = {
    user,
    loading,
    signup,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// ---------------- HOOK ----------------

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}
