"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  User,
} from "firebase/auth";
import { auth } from "@/lib/firebase";

// ---------------- TYPES ----------------

type SignupRole = "patient" | "doctor";

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

  // ✅ Track session globally
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // ✅ SIGNUP (with name + role)
  const signup = async (
    email: string,
    password: string,
    name: string,
    role: SignupRole
  ) => {
    const result = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    // ✅ Save name in Firebase profile
    await updateProfile(result.user, {
      displayName: name,
    });

    // ✅ Save role locally in browser (since you're not using DB)
    localStorage.setItem(
      "medlink_user_role",
      JSON.stringify({
        uid: result.user.uid,
        role,
      })
    );

    setUser(result.user);
  };

  // ✅ LOGIN
  const login = async (email: string, password: string) => {
    const result = await signInWithEmailAndPassword(auth, email, password);
    setUser(result.user);
  };

  // ✅ LOGOUT
  const logout = async () => {
    await signOut(auth);
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
