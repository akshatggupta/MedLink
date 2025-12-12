"use client"

import { motion } from "framer-motion"
import { Calendar, Activity, Pill, Clock, TrendingUp } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/hooks/useAuth";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const healthData = [
  { name: "Mon", heartRate: 72, steps: 4000 },
  { name: "Tue", heartRate: 75, steps: 7000 },
  { name: "Wed", heartRate: 71, steps: 5500 },
  { name: "Thu", heartRate: 78, steps: 8000 },
  { name: "Fri", heartRate: 74, steps: 6000 },
  { name: "Sat", heartRate: 70, steps: 9000 },
  { name: "Sun", heartRate: 69, steps: 4500 },
]

const appointments = [
  { id: 1, doctor: "Dr. Sarah Johnson", specialty: "Cardiology", date: "Today, 2:00 PM", status: "Upcoming" },
  { id: 2, doctor: "Dr. Michael Chen", specialty: "Dermatology", date: "Nov 15, 10:00 AM", status: "Completed" },
]

export default function DashboardPage() {
  const { user } = useAuth();

const roleData =
  typeof window !== "undefined"
    ? localStorage.getItem("medlink_user_role")
    : null;

const role = roleData ? JSON.parse(roleData).role : "Not assigned";

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-6xl">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Welcome back, {user?.displayName}</h1>
            <p className="text-slate-500">Here's your health overview for today.</p>
          </div>
          <Link
              href="/doctors"
              className="px-8 py-4 rounded-full bg-[#22C55E] hover:bg-[#16A34A]
text-white shadow-lg shadow-green-500/30
 transition-all hover:scale-105 shadow-lg shadow-green-500/30 flex items-center gap-2"
            >
              Book Appointment
              <ArrowRight className="w-4 h-4" />
            </Link>
        </div>
        {/* ✅ USER DETAILS GRID */}
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
  <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
    <p className="text-xs text-slate-500 mb-1">Full Name</p>
    <p className="text-lg font-bold text-slate-900">
      {user?.displayName || "Not provided"}
    </p>
  </div>

  <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
    <p className="text-xs text-slate-500 mb-1">Email</p>
    <p className="text-sm font-medium text-slate-900 break-all">
      {user?.email}
    </p>
  </div>

  <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
    <p className="text-xs text-slate-500 mb-1">User ID</p>
    <p className="text-xs font-mono text-slate-700 break-all">
      {user?.uid}
    </p>
  </div>

  <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
    <p className="text-xs text-slate-500 mb-1">Account Type</p>
    <p className="text-lg font-bold text-green-600 capitalize">
      {role}
    </p>
  </div>
</div>


        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { label: "Heart Rate", value: "72 bpm", icon: Activity, color: "text-red-500", bg: "bg-red-50" },
            { label: "Steps", value: "8,432", icon: TrendingUp, color: "text-green-500", bg: "bg-green-50" },
            { label: "Sleep", value: "7h 20m", icon: Clock, color: "text-purple-500", bg: "bg-purple-50" },
            { label: "Medications", value: "2 Pending", icon: Pill, color: "text-green-500", bg: "bg-green-50" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm"
            >
              <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-xl ${stat.bg}`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">+2.5%</span>
              </div>
              <h3 className="text-2xl font-bold text-slate-900">{stat.value}</h3>
              <p className="text-sm text-slate-500">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Health Chart */}
          <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 mb-6">Activity Trends</h3>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={healthData}>
                  <defs>
                    <linearGradient id="colorSteps" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} />
                  <Tooltip
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Area type="monotone" dataKey="steps" stroke="#3b82f6" fillOpacity={1} fill="url(#colorSteps)" strokeWidth={3} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Upcoming Appointments */}
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 mb-6">Upcoming Appointments</h3>
            <div className="space-y-4">
              {appointments.map((apt) => (
                <div key={apt.id} className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                    <Calendar className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900">{apt.doctor}</h4>
                    <p className="text-sm text-slate-500">{apt.specialty}</p>
                    <div className="flex items-center gap-2 mt-2 text-xs text-slate-600">
                      <Clock className="w-3 h-3" />
                      {apt.date}
                    </div>
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full mt-4">View All History</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
