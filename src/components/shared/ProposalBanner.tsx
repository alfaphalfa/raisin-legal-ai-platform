'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  X,
  ChevronUp,
  CheckCircle,
  Zap,
  TrendingUp,
  Calendar,
  Euro,
  Phone,
  Mail,
  Download,
  ArrowRight,
  Users
} from 'lucide-react'
import { cn } from '@/lib/utils'

export function ProposalBanner() {
  const [expanded, setExpanded] = useState(false)
  const [minimized, setMinimized] = useState(false)
  const [showPulse, setShowPulse] = useState(true)

  useEffect(() => {
    // Stop pulsing after first interaction
    if (expanded) {
      setShowPulse(false)
    }
  }, [expanded])

  if (minimized) {
    return (
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        onClick={() => {
          setMinimized(false)
          setExpanded(true)
        }}
        className="fixed bottom-4 right-4 z-50 w-12 h-12 bg-indigo-600 text-white rounded-full shadow-lg flex items-center justify-center"
      >
        💼
      </motion.button>
    )
  }

  return (
    <motion.div
      className="fixed bottom-4 right-4 z-50 max-h-[90vh]"
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 2, duration: 0.5 }}
    >
      <AnimatePresence mode="wait">
        {!expanded ? (
          <motion.button
            key="collapsed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setExpanded(true)}
            className={cn(
              "bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-lg shadow-xl hover:shadow-2xl transition-all flex items-center gap-3",
              showPulse && "animate-pulse"
            )}
          >
            <span className="text-xl">💼</span>
            <div className="text-left">
              <p className="font-semibold">View Investment Options</p>
              <p className="text-xs text-indigo-200">3 flexible engagement models</p>
            </div>
            <ChevronUp className="w-4 h-4" />
          </motion.button>
        ) : (
          <motion.div
            key="expanded"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="bg-white rounded-xl shadow-2xl max-w-lg border border-gray-200 flex flex-col max-h-[85vh]"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-4 rounded-t-xl">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-lg">Investment Options for Raisin</h3>
                  <p className="text-indigo-200 text-sm">Choose your transformation path</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setMinimized(true)}
                    className="p-1 hover:bg-white/20 rounded transition-colors"
                    title="Minimize"
                  >
                    <ChevronUp className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setExpanded(false)}
                    className="p-1 hover:bg-white/20 rounded transition-colors"
                    title="Close"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-4 overflow-y-auto flex-1">
              {/* Option 1: Pilot Program */}
              <motion.div
                whileHover={{ x: 4 }}
                className="border-l-4 border-green-500 pl-3 py-2 bg-green-50 rounded-r-lg cursor-pointer hover:bg-green-100 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Zap className="w-4 h-4 text-green-600" />
                      <p className="font-semibold text-gray-900">Pilot Program</p>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-700 mb-2">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        6 weeks
                      </span>
                      <span className="flex items-center gap-1">
                        <Euro className="w-3 h-3" />
                        65,000
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">
                      Start with Contract Intelligence or Compliance Radar
                    </p>
                    <ul className="mt-2 space-y-1">
                      <li className="text-xs text-green-700 flex items-start gap-1">
                        <CheckCircle className="w-3 h-3 mt-0.5" />
                        Prove ROI quickly with single use case
                      </li>
                      <li className="text-xs text-green-700 flex items-start gap-1">
                        <CheckCircle className="w-3 h-3 mt-0.5" />
                        Full production deployment
                      </li>
                      <li className="text-xs text-green-700 flex items-start gap-1">
                        <CheckCircle className="w-3 h-3 mt-0.5" />
                        Option to expand after success
                      </li>
                    </ul>
                  </div>
                </div>
              </motion.div>

              {/* Option 2: Full Implementation */}
              <motion.div
                whileHover={{ x: 4 }}
                className="border-l-4 border-blue-500 pl-3 py-2 bg-blue-50 rounded-r-lg cursor-pointer hover:bg-blue-100 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <TrendingUp className="w-4 h-4 text-blue-600" />
                      <p className="font-semibold text-gray-900">Full Implementation</p>
                      <span className="text-xs bg-blue-200 text-blue-800 px-2 py-0.5 rounded-full">
                        RECOMMENDED
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-700 mb-2">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        4 months
                      </span>
                      <span className="flex items-center gap-1">
                        <Euro className="w-3 h-3" />
                        340,000
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">
                      Complete legal operations transformation
                    </p>
                    <ul className="mt-2 space-y-1">
                      <li className="text-xs text-blue-700 flex items-start gap-1">
                        <CheckCircle className="w-3 h-3 mt-0.5" />
                        All 6 modules deployed and integrated
                      </li>
                      <li className="text-xs text-blue-700 flex items-start gap-1">
                        <CheckCircle className="w-3 h-3 mt-0.5" />
                        €200k+ monthly savings from month 5
                      </li>
                      <li className="text-xs text-blue-700 flex items-start gap-1">
                        <CheckCircle className="w-3 h-3 mt-0.5" />
                        Full team training and support
                      </li>
                    </ul>
                  </div>
                </div>
              </motion.div>

              {/* Option 3: Ongoing Partnership */}
              <motion.div
                whileHover={{ x: 4 }}
                className="border-l-4 border-purple-500 pl-3 py-2 bg-purple-50 rounded-r-lg cursor-pointer hover:bg-purple-100 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Users className="w-4 h-4 text-purple-600" />
                      <p className="font-semibold text-gray-900">Ongoing Partnership</p>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-700 mb-2">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        Monthly
                      </span>
                      <span className="flex items-center gap-1">
                        <Euro className="w-3 h-3" />
                        22,000/month
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">
                      Dedicated AI legal operations team
                    </p>
                    <ul className="mt-2 space-y-1">
                      <li className="text-xs text-purple-700 flex items-start gap-1">
                        <CheckCircle className="w-3 h-3 mt-0.5" />
                        Continuous platform improvements
                      </li>
                      <li className="text-xs text-purple-700 flex items-start gap-1">
                        <CheckCircle className="w-3 h-3 mt-0.5" />
                        Priority support and updates
                      </li>
                      <li className="text-xs text-purple-700 flex items-start gap-1">
                        <CheckCircle className="w-3 h-3 mt-0.5" />
                        Custom feature development
                      </li>
                    </ul>
                  </div>
                </div>
              </motion.div>

              {/* ROI Highlight */}
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white p-3 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs opacity-90">Expected ROI</p>
                    <p className="text-xl font-bold">588% Year 1</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs opacity-90">Break-even</p>
                    <p className="text-xl font-bold">8 weeks</p>
                  </div>
                </div>
              </div>

              {/* Contact CTA */}
              <div className="border-t pt-4">
                <p className="text-xs text-gray-600 mb-3">Ready to discuss?</p>
                <div className="flex gap-2">
                  <a
                    href="mailto:k3vin.andrews1@gmail.com"
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm"
                  >
                    <Mail className="w-4 h-4" />
                    Email
                  </a>
                  <a
                    href="tel:516-864-6096"
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
                  >
                    <Phone className="w-4 h-4" />
                    Call
                  </a>
                </div>
              </div>

              {/* Footer */}
              <div className="text-center pt-2">
                <p className="text-xs text-gray-500">
                  Kevin Andrews, JD • Legal Tech Specialist
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}