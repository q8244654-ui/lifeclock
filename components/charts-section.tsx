"use client"

import { motion } from "framer-motion"
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts"
import type { EnergyProfile } from "@/lib/types"

interface ChartsSectionProps {
  energyProfile: EnergyProfile
  lifeCurve: Array<{ phase: string; value: number }>
}

export default function ChartsSection({ energyProfile, lifeCurve }: ChartsSectionProps) {
  const radarData = [
    { energy: "Mind", value: energyProfile.averages.Mind },
    { energy: "Heart", value: energyProfile.averages.Heart },
    { energy: "Drive", value: energyProfile.averages.Drive },
    { energy: "Spirit", value: energyProfile.averages.Spirit },
  ]

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-white">Ta Signature Énergétique</h2>
        <p className="text-gray-400 text-sm italic">"Ta vie n'est pas une ligne. C'est une pulsation."</p>
      </div>

      {/* Radar Chart */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="rounded-2xl bg-white/5 border border-white/10 p-6 backdrop-blur-sm"
      >
        <h3 className="text-lg font-semibold text-white mb-4 text-center">Les 4 Énergies</h3>
        <ResponsiveContainer width="100%" height={300}>
          <RadarChart data={radarData}>
            <PolarGrid stroke="rgba(255,255,255,0.1)" />
            <PolarAngleAxis dataKey="energy" stroke="rgba(255,255,255,0.7)" tick={{ fill: "rgba(255,255,255,0.7)" }} />
            <PolarRadiusAxis stroke="rgba(255,255,255,0.3)" domain={[0, 100]} />
            <Radar name="Énergies" dataKey="value" stroke="#60a5fa" fill="#60a5fa" fillOpacity={0.6} />
          </RadarChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Life Curve */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4 }}
        className="rounded-2xl bg-white/5 border border-white/10 p-6 backdrop-blur-sm"
      >
        <h3 className="text-lg font-semibold text-white mb-4 text-center">Ta Courbe de Vie</h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={lifeCurve}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis
              dataKey="phase"
              stroke="rgba(255,255,255,0.5)"
              tick={{ fill: "rgba(255,255,255,0.7)", fontSize: 10 }}
            />
            <YAxis
              stroke="rgba(255,255,255,0.5)"
              tick={{ fill: "rgba(255,255,255,0.7)", fontSize: 10 }}
              domain={[0, 30]}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(0,0,0,0.9)",
                border: "1px solid rgba(255,255,255,0.2)",
                borderRadius: "8px",
                color: "white",
              }}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#60a5fa"
              strokeWidth={2}
              dot={{ fill: "#60a5fa", r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
        <p className="text-xs text-center text-gray-500 mt-4">Ton évolution à travers les 10 phases</p>
      </motion.div>
    </motion.div>
  )
}
