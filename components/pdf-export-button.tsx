"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Download } from "lucide-react"

interface PDFExportButtonProps {
  userName: string
  finalReport: any
  forces: any
  revelations: any[]
}

export default function PDFExportButton({ userName, finalReport, forces, revelations }: PDFExportButtonProps) {
  const [exporting, setExporting] = useState(false)

  const handleExport = async () => {
    setExporting(true)

    try {
      // Dynamic import to reduce bundle size
      const html2canvas = (await import("html2canvas")).default
      const jsPDF = (await import("jspdf")).default

      // Create a temporary container with all report content
      const container = document.createElement("div")
      container.style.position = "absolute"
      container.style.left = "-9999px"
      container.style.width = "800px"
      container.style.background = "#0D1117"
      container.style.color = "white"
      container.style.padding = "40px"
      container.style.fontFamily = "system-ui, -apple-system, sans-serif"

      container.innerHTML = `
        <div style="text-align: center; margin-bottom: 40px;">
          <h1 style="font-size: 36px; font-weight: bold; background: linear-gradient(to right, #60A5FA, #A78BFA, #F472B6); -webkit-background-clip: text; -webkit-text-fill-color: transparent; margin-bottom: 10px;">
            LifeClock Report
          </h1>
          <p style="color: #9CA3AF; font-size: 18px;">${userName}</p>
        </div>

        <div style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 16px; padding: 30px; margin-bottom: 30px; text-align: center;">
          <div style="font-size: 48px; font-weight: bold; color: #60A5FA; margin-bottom: 10px;">
            ${finalReport.lifeIndex.lifeIndex}/100
          </div>
          <div style="font-size: 20px; color: #D1D5DB; margin-bottom: 5px;">
            ${finalReport.lifeIndex.stage}
          </div>
          <div style="font-size: 14px; color: #6B7280; margin-bottom: 20px;">
            It's not your age. It's your inner maturity.
          </div>
          <div style="border-top: 1px solid rgba(255,255,255,0.1); padding-top: 20px; margin-top: 20px;">
            <div style="font-size: 24px; font-weight: 600; color: white; margin-bottom: 5px;">
              ${finalReport.profile.dominantEnergy}
            </div>
            <div style="font-size: 14px; color: #9CA3AF;">
              Your dominant energy
            </div>
          </div>
        </div>

        <div style="margin-bottom: 30px;">
          <h2 style="font-size: 24px; font-weight: bold; margin-bottom: 20px; color: white;">The 3 Hidden Forces</h2>
          
          <div style="background: rgba(255,255,255,0.05); border-radius: 12px; padding: 20px; margin-bottom: 15px;">
            <div style="font-size: 18px; font-weight: 600; margin-bottom: 10px; color: #A78BFA;">
              🌑 Your Shadow
            </div>
            <div style="color: #D1D5DB; margin-bottom: 5px;">${forces.shadow.phase.title}</div>
            <div style="color: #9CA3AF; font-size: 14px;">${forces.shadow.insight}</div>
          </div>

          <div style="background: rgba(255,255,255,0.05); border-radius: 12px; padding: 20px; margin-bottom: 15px;">
            <div style="font-size: 18px; font-weight: 600; margin-bottom: 10px; color: #F472B6;">
              😨 Your Fear
            </div>
            <div style="color: #D1D5DB; margin-bottom: 5px;">${forces.fear.phase.title}</div>
            <div style="color: #9CA3AF; font-size: 14px;">${forces.fear.insight}</div>
          </div>

          <div style="background: rgba(255,255,255,0.05); border-radius: 12px; padding: 20px;">
            <div style="font-size: 18px; font-weight: 600; margin-bottom: 10px; color: #FBBF24;">
              ⚡ Your Power
            </div>
            <div style="color: #D1D5DB; margin-bottom: 5px;">${forces.power.phase.title}</div>
            <div style="color: #9CA3AF; font-size: 14px;">${forces.power.insight}</div>
          </div>
        </div>

        <div style="margin-bottom: 30px;">
          <h2 style="font-size: 24px; font-weight: bold; margin-bottom: 20px; color: white;">Your 47 Revelations</h2>
          ${revelations
            .map(
              (rev, i) => `
            <div style="background: rgba(255,255,255,0.03); border-radius: 8px; padding: 15px; margin-bottom: 10px;">
              <div style="color: #60A5FA; font-size: 12px; font-weight: 600; margin-bottom: 5px;">
                ${rev.category.toUpperCase()}
              </div>
              <div style="color: #D1D5DB; font-size: 14px;">
                ${rev.insight || rev.text || ''}
              </div>
            </div>
          `,
            )
            .join("")}
        </div>

        <div style="text-align: center; margin-top: 40px; padding-top: 30px; border-top: 1px solid rgba(255,255,255,0.1);">
          <p style="font-size: 20px; font-style: italic; color: white; margin-bottom: 10px;">
            "Time is no longer counted. It belongs to you."
          </p>
          <p style="color: #9CA3AF; font-size: 12px;">
            LifeClock - Report generated on ${new Date().toLocaleDateString("en-US")}
          </p>
        </div>
      `

      document.body.appendChild(container)

      // Generate canvas from HTML
      const canvas = await html2canvas(container, {
        scale: 2,
        backgroundColor: "#0D1117",
        logging: false,
      })

      document.body.removeChild(container)

      // Create PDF
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      })

      const imgWidth = 210 // A4 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width

      let heightLeft = imgHeight
      let position = 0

      pdf.addImage(canvas.toDataURL("image/png"), "PNG", 0, position, imgWidth, imgHeight)
      heightLeft -= 297 // A4 height

      while (heightLeft > 0) {
        position = heightLeft - imgHeight
        pdf.addPage()
        pdf.addImage(canvas.toDataURL("image/png"), "PNG", 0, position, imgWidth, imgHeight)
        heightLeft -= 297
      }

      pdf.save(`LifeClock-${userName}-${Date.now()}.pdf`)
    } catch (error) {
      console.error("[v0] PDF export error:", error)
      alert("Error exporting PDF. Please try again in a few moments.")
    } finally {
      setExporting(false)
    }
  }

  return (
    <motion.button
      onClick={handleExport}
      disabled={exporting}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="w-full rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 px-6 py-4 font-semibold text-white shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
    >
      <Download className="w-5 h-5" />
      {exporting ? "Generating PDF..." : "Download my report as PDF"}
    </motion.button>
  )
}
