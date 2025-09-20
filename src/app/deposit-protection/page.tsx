'use client'

import { motion } from 'framer-motion'
import { ArrowLeft, Shield, Info, Globe, AlertTriangle } from 'lucide-react'
import Link from 'next/link'
import { DepositProtectionValidator } from '@/components/compliance/DepositProtectionValidator'

export default function DepositProtectionPage() {
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
              <h1 className="text-xl font-semibold">Deposit Protection Validator</h1>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-2 bg-green-100 text-green-700 rounded-lg">
                <Shield className="w-4 h-4" />
                <span className="text-sm font-medium">FSCS/FDIC/EU DGS</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 bg-blue-100 text-blue-700 rounded-lg">
                <Globe className="w-4 h-4" />
                <span className="text-sm font-medium">7 Jurisdictions</span>
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
          className="mb-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            Cross-Border Deposit Protection Analysis
          </h2>
          <p className="text-gray-700 mb-4">
            Validate deposit protection coverage across multiple jurisdictions for Raisin's customers.
            Ensure compliance with FSCS (UK), FDIC (US), and EU Deposit Guarantee Schemes while
            optimizing deposit distribution for maximum protection.
          </p>

          <div className="grid md:grid-cols-4 gap-4 mt-6">
            <div className="bg-white rounded-lg p-4">
              <div className="text-2xl font-bold text-green-600">€100k</div>
              <div className="text-sm text-gray-600">EU Protection</div>
            </div>
            <div className="bg-white rounded-lg p-4">
              <div className="text-2xl font-bold text-blue-600">£85k</div>
              <div className="text-sm text-gray-600">UK FSCS</div>
            </div>
            <div className="bg-white rounded-lg p-4">
              <div className="text-2xl font-bold text-purple-600">$250k</div>
              <div className="text-sm text-gray-600">US FDIC</div>
            </div>
            <div className="bg-white rounded-lg p-4">
              <div className="text-2xl font-bold text-indigo-600">7-20</div>
              <div className="text-sm text-gray-600">Days Payout</div>
            </div>
          </div>
        </motion.div>

        {/* Main Validator Component */}
        <DepositProtectionValidator />

        {/* Additional Information Cards */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-8 grid md:grid-cols-2 gap-6"
        >
          {/* Key Features */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Info className="w-5 h-5 text-blue-600" />
              Key Protection Features
            </h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-1.5"></div>
                <div>
                  <h4 className="font-medium text-gray-900">Per Depositor, Per Bank</h4>
                  <p className="text-sm text-gray-600">
                    Protection limits apply to each depositor at each separate banking institution
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-1.5"></div>
                <div>
                  <h4 className="font-medium text-gray-900">Joint Account Coverage</h4>
                  <p className="text-sm text-gray-600">
                    Joint accounts typically receive double the standard protection limit
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-1.5"></div>
                <div>
                  <h4 className="font-medium text-gray-900">Temporary High Balances</h4>
                  <p className="text-sm text-gray-600">
                    Special events like property sales may qualify for enhanced protection up to €500k
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-1.5"></div>
                <div>
                  <h4 className="font-medium text-gray-900">Fast Payout</h4>
                  <p className="text-sm text-gray-600">
                    Most schemes guarantee reimbursement within 7-20 working days
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Common Exclusions */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
              Common Exclusions
            </h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-amber-600 rounded-full mt-1.5"></div>
                <div>
                  <h4 className="font-medium text-gray-900">Financial Institutions</h4>
                  <p className="text-sm text-gray-600">
                    Deposits by other banks, investment firms, or insurance companies
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-amber-600 rounded-full mt-1.5"></div>
                <div>
                  <h4 className="font-medium text-gray-900">Investment Products</h4>
                  <p className="text-sm text-gray-600">
                    Stocks, bonds, mutual funds, and crypto assets are not covered
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-amber-600 rounded-full mt-1.5"></div>
                <div>
                  <h4 className="font-medium text-gray-900">Anonymous Deposits</h4>
                  <p className="text-sm text-gray-600">
                    Bearer deposits or accounts without proper identification
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-amber-600 rounded-full mt-1.5"></div>
                <div>
                  <h4 className="font-medium text-gray-900">Illegal Activities</h4>
                  <p className="text-sm text-gray-600">
                    Deposits linked to money laundering or criminal activities
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Use Cases */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8 bg-white rounded-xl shadow-sm border border-gray-200 p-6"
        >
          <h3 className="text-lg font-semibold mb-4">Raisin-Specific Use Cases</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">Customer Onboarding</h4>
              <p className="text-sm text-gray-600">
                Educate new customers about deposit protection limits and help them optimize
                their savings distribution across partner banks.
              </p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">Large Deposit Advisory</h4>
              <p className="text-sm text-gray-600">
                Guide high-value customers on splitting deposits across multiple banks
                to maximize protection coverage.
              </p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">Cross-Border Planning</h4>
              <p className="text-sm text-gray-600">
                Help customers understand protection differences when moving funds
                between EU, UK, and US partner banks.
              </p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">Risk Assessment</h4>
              <p className="text-sm text-gray-600">
                Evaluate customer portfolios to identify unprotected deposits
                and recommend reallocation strategies.
              </p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">Regulatory Compliance</h4>
              <p className="text-sm text-gray-600">
                Ensure proper disclosure of protection limits and exclusions
                in marketing materials and customer communications.
              </p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">Partner Bank Vetting</h4>
              <p className="text-sm text-gray-600">
                Verify that new partner banks participate in appropriate
                deposit guarantee schemes for their jurisdiction.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}