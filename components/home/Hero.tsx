"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as random from "maath/random/dist/maath-random.esm";
import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";

import Image from "next/image";
import { useTheme } from "next-themes";


function Particles(props: any) {
  const ref = useRef<any>(null);
  const { resolvedTheme } = useTheme(); // ✅ IMPORTANT: use resolvedTheme
  const [mounted, setMounted] = useState(false);

  const [sphere] = useState(() =>
    random.inSphere(new Float32Array(5000), { radius: 1.5 })
  );

  useEffect(() => {
    setMounted(true); // ✅ prevent hydration mismatch
  }, []);

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
  });

  // ✅ TRUE dark vs light detection
  const particleColor =
    mounted && resolvedTheme === "dark"
      ? "#4ADE80" // Dark Mode Color (Mint Glow)
      : "#14532D"; // Light Mode Color (Deep Green)

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points
        ref={ref}
        positions={sphere}
        stride={3}
        frustumCulled={false}
        {...props}
      >
        <PointMaterial
          transparent
          color={particleColor}   // ✅ NOW IT WILL CHANGE
          size={0.003}
          sizeAttenuation
          depthWrite={false}
        />
        
      </Points>
     

    </group>
    
  );
}



export function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-32 pb-20 overflow-hidden bg-slate-50">
      {/* Mesh Gradient Background */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-[#4ADE80] rounded-full blur-[130px]" />
        <div className="absolute top-[10%] right-[-10%] w-[40%] h-[40%] bg-[#DCFCE7] rounded-full blur-[130px]" />
        <div className="absolute bottom-[-10%] left-[20%] w-[60%] h-[40%] bg-[#14532D] rounded-full blur-[150px]" />
      </div>

      {/* 3D Particles Layer */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 1] }}>
          <Particles />
        </Canvas>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-slate-900 mb-8 leading-[1.1] font-serif">
            Healthcare <br />
            <span
  className="animate-gradient-x font-sans italic"
  style={{
    backgroundImage: "linear-gradient(to right, #4ADE80, #6EE7B7, #ECFDF5)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    color: "transparent",
  }}
>
  Reimagined.
</span>

          </h1>

          <p className="text-xl md:text-2xl text-slate-600 max-w-2xl mx-auto mb-12 leading-relaxed">
            Check your symptoms, find doctors, book appointments, and access
              medical records all in one place with Med-link.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
            <Link
              href="/doctors"
              className="px-8 py-4 rounded-full bg-[#22C55E] hover:bg-[#16A34A]
text-white shadow-lg shadow-green-500/30
 transition-all hover:scale-105 shadow-lg shadow-blue-500/30 flex items-center gap-2"
            >
              Get Started
              <ArrowRight className="w-4 h-4" />
            </Link>
            <button className="px-8 py-4 rounded-full bg-white text-slate-700 font-semibold border border-slate-200 hover:bg-slate-50 transition-all hover:scale-105 flex items-center gap-2 shadow-sm">
              <Play className="w-4 h-4 fill-current" />
              Watch Demo
            </button>
          </div>

          {/* Glassmorphism Interface Preview */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="relative mx-auto max-w-4xl rounded-2xl border border-white/40 bg-white/40 backdrop-blur-xl shadow-2xl overflow-hidden p-2"
          >
            <div className="rounded-xl overflow-hidden bg-white shadow-inner border border-slate-100 aspect-[16/9] relative">
              {/* Abstract UI Representation */}
              <div className="absolute inset-0 bg-slate-50 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full mx-auto mb-4 flex items-center justify-center animate-pulse">
                    <div className="w-8 h-8 bg-blue-500 rounded-full" />
                  </div>
                  <p className="text-slate-400 font-medium">
                    Dashboard Preview
                  </p>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute top-10 left-10 bg-white p-4 rounded-xl shadow-lg border border-slate-100 animate-float-slow">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                    ✓
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">
                      Appointment Confirmed
                    </p>
                    <p className="font-bold text-slate-800">
                      Dr. Sarah Johnson
                    </p>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-10 right-10 bg-white p-4 rounded-xl shadow-lg border border-slate-100 animate-float-delayed">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                    💊
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Prescription Ready</p>
                    <p className="font-bold text-slate-800">
                      Amoxicillin 500mg
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
