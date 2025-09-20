'use client'

import { motion } from 'framer-motion'
import { ArrowLeft, TrendingUp, Shield, Globe, Calculator } from 'lucide-react'
import Link from 'next/link'
import { SavingsProductAnalyzer } from '@/components/raisin-specific/SavingsProductAnalyzer'

export default function ProductAnalyzerPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/dashboard"
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <h1 className="text-xl font-semibold">Savings Product Analyzer</h1>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-2 bg-indigo-100 text-indigo-700 rounded-lg">
                <Globe className="w-4 h-4" />
                <span className="text-sm font-medium">10 Markets</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 bg-green-100 text-green-700 rounded-lg">
                <Shield className="w-4 h-4" />
                <span className="text-sm font-medium">€100k Protected</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="p-6">
        {/* Page Introduction */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl p-6 border border-indigo-100"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            Cross-Border Savings Product Compliance
          </h2>
          <p className="text-gray-700 mb-4">
            Analyze savings products from Raisin's 400+ bank partners for cross-border distribution.
            Ensure compliance with deposit guarantees, GDPR, consumer protection, and marketing regulations
            across all target markets.
          </p>

          <div className="grid md:grid-cols-4 gap-4 mt-6">
            <div className="bg-white rounded-lg p-4">
              <div className="text-2xl font-bold text-indigo-600">400+</div>
              <div className="text-sm text-gray-600">Bank Partners</div>
            </div>
            <div className="bg-white rounded-lg p-4">
              <div className="text-2xl font-bold text-green-600">€100k</div>
              <div className="text-sm text-gray-600">Deposit Protection</div>
            </div>
            <div className="bg-white rounded-lg p-4">
              <div className="text-2xl font-bold text-blue-600">10</div>
              <div className="text-sm text-gray-600">EU Markets</div>
            </div>
            <div className="bg-white rounded-lg p-4">
              <div className="text-2xl font-bold text-purple-600">30+</div>
              <div className="text-sm text-gray-600">Regulations</div>
            </div>
          </div>
        </motion.div>

        {/* Main Analyzer Component */}
        <SavingsProductAnalyzer />

        {/* Additional Information */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-8 grid md:grid-cols-3 gap-6"
        >
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-indigo-100 rounded-lg">
                <Calculator className="w-5 h-5 text-indigo-600" />
              </div>
              <h3 className="font-semibold">Interest Rate Analysis</h3>
            </div>
            <p className="text-sm text-gray-600">
              AI analyzes competitive positioning and regulatory limits for interest rates
              across different markets, ensuring optimal pricing strategy.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Shield className="w-5 h-5 text-green-600" />
              </div>
              <h3 className="font-semibold">Deposit Guarantee</h3>
            </div>
            <p className="text-sm text-gray-600">
              Verifies €100,000 EU deposit guarantee scheme compliance and ensures
              proper customer disclosure across all jurisdictions.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Globe className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="font-semibold">Market Compatibility</h3>
            </div>
            <p className="text-sm text-gray-600">
              Checks product eligibility for distribution in target markets based on
              local regulations and consumer protection requirements.
            </p>
          </div>
        </motion.div>

        {/* Use Cases */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8 bg-white rounded-xl shadow-sm border border-gray-200 p-6"
        >
          <h3 className="text-lg font-semibold mb-4">Common Use Cases</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">New Partner Onboarding</h4>
              <p className="text-sm text-gray-600">
                Validate new bank partner products for compliance before platform listing.
                Ensure all regulatory requirements are met for cross-border distribution.
              </p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">Market Expansion</h4>
              <p className="text-sm text-gray-600">
                Assess existing products for eligibility in new markets. Identify
                required modifications for compliance with local regulations.
              </p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">Product Updates</h4>
              <p className="text-sm text-gray-600">
                Review changes to interest rates, terms, or conditions for continued
                compliance across all active markets.
              </p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">Regulatory Changes</h4>
              <p className="text-sm text-gray-600">
                Re-evaluate product portfolio when new regulations are introduced
                to ensure ongoing compliance and market access.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}