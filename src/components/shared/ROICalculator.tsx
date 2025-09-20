'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Calculator, TrendingUp } from 'lucide-react'
import { formatCurrency } from '@/lib/utils'
import { ROI_FACTORS } from '@/lib/raisin-constants'

export function ROICalculator() {
  const [documents, setDocuments] = useState(1000)
  const [manualHours, setManualHours] = useState(ROI_FACTORS.manualReviewHours)
  const [hourlyRate, setHourlyRate] = useState(ROI_FACTORS.averageHourlyRate)

  const manualCost = documents * manualHours * hourlyRate
  const aiCost = manualCost * 0.1
  const savings = manualCost - aiCost
  const roi = ((savings - aiCost) / aiCost) * 100

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-gradient-to-br from-indigo-50 to-white p-8 rounded-xl border border-indigo-100"
    >
      <div className="flex items-center mb-6">
        <Calculator className="w-6 h-6 text-indigo-600 mr-2" />
        <h3 className="text-xl font-semibold text-gray-900">ROI Calculator</h3>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Documents per month
          </label>
          <input
            type="range"
            min="100"
            max="5000"
            value={documents}
            onChange={(e) => setDocuments(Number(e.target.value))}
            className="w-full h-2 bg-indigo-200 rounded-lg appearance-none cursor-pointer"
          />
          <div className="text-center mt-2 font-semibold text-indigo-600">
            {documents.toLocaleString()}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Hours per document (manual)
          </label>
          <input
            type="range"
            min="0.5"
            max="5"
            step="0.5"
            value={manualHours}
            onChange={(e) => setManualHours(Number(e.target.value))}
            className="w-full h-2 bg-indigo-200 rounded-lg appearance-none cursor-pointer"
          />
          <div className="text-center mt-2 font-semibold text-indigo-600">
            {manualHours} hours
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Hourly rate
          </label>
          <input
            type="range"
            min="50"
            max="300"
            step="10"
            value={hourlyRate}
            onChange={(e) => setHourlyRate(Number(e.target.value))}
            className="w-full h-2 bg-indigo-200 rounded-lg appearance-none cursor-pointer"
          />
          <div className="text-center mt-2 font-semibold text-indigo-600">
            {formatCurrency(hourlyRate)}/hour
          </div>
        </div>

        <div className="border-t pt-6">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-sm text-gray-600">Manual Cost</p>
              <p className="text-xl font-bold text-gray-900">
                {formatCurrency(manualCost)}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">With Raisin AI</p>
              <p className="text-xl font-bold text-green-600">
                {formatCurrency(aiCost)}
              </p>
            </div>
          </div>

          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-4 rounded-lg"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Monthly Savings</p>
                <p className="text-2xl font-bold">{formatCurrency(savings)}</p>
              </div>
              <div className="text-right">
                <p className="text-sm opacity-90">ROI</p>
                <p className="text-2xl font-bold flex items-center">
                  <TrendingUp className="w-5 h-5 mr-1" />
                  {roi.toFixed(0)}%
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}