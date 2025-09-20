'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  CheckCircle,
  XCircle,
  AlertTriangle,
  TrendingUp,
  Shield,
  FileText,
  Globe,
  Info,
  Calculator
} from 'lucide-react'
import { JurisdictionBadge } from '@/components/shared/JurisdictionBadge'
import { cn } from '@/lib/utils'

interface SavingsProduct {
  bankPartner: string
  productType: 'fixed_deposit' | 'savings_account' | 'notice_account'
  interestRate: number
  term?: number // in months for fixed deposits
  minDeposit?: number
  maxDeposit?: number
  markets: string[]
  complianceStatus: {
    gdpr: boolean
    depositGuarantee: boolean // €100,000 EU guarantee
    consumerProtection: boolean
    marketingCompliance: boolean // Truth in advertising
  }
}

interface MarketCompatibility {
  market: string
  compatible: boolean
  issues: string[]
  requiredActions: string[]
}

interface SavingsProductAnalyzerProps {
  product?: SavingsProduct
  onAnalysisComplete?: (results: any) => void
}

export function SavingsProductAnalyzer({ product: initialProduct, onAnalysisComplete }: SavingsProductAnalyzerProps) {
  const [product, setProduct] = useState<SavingsProduct>(initialProduct || {
    bankPartner: 'Deutsche Bank',
    productType: 'fixed_deposit',
    interestRate: 3.5,
    term: 12,
    minDeposit: 1000,
    maxDeposit: 100000,
    markets: ['DE', 'FR', 'ES', 'IT'],
    complianceStatus: {
      gdpr: true,
      depositGuarantee: true,
      consumerProtection: true,
      marketingCompliance: true
    }
  })

  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisResults, setAnalysisResults] = useState<{
    overallScore: number
    marketCompatibility: MarketCompatibility[]
    riskFlags: string[]
    recommendations: string[]
  } | null>(null)

  const productTypeLabels = {
    fixed_deposit: 'Fixed Deposit',
    savings_account: 'Savings Account',
    notice_account: 'Notice Account'
  }

  const analyzeProduct = () => {
    setIsAnalyzing(true)

    // Simulate AI analysis
    setTimeout(() => {
      const marketCompatibility: MarketCompatibility[] = product.markets.map(market => {
        const issues: string[] = []
        const requiredActions: string[] = []

        // Market-specific compliance checks
        if (market === 'DE' && product.interestRate > 4.0) {
          issues.push('Interest rate exceeds German market norms')
          requiredActions.push('Review pricing strategy for German market')
        }

        if (market === 'FR' && !product.complianceStatus.consumerProtection) {
          issues.push('French consumer protection requirements not met')
          requiredActions.push('Update terms for Code de la consommation compliance')
        }

        if (market === 'GB' && !product.complianceStatus.depositGuarantee) {
          issues.push('UK FSCS protection not applicable')
          requiredActions.push('Clarify deposit protection scheme for UK customers')
        }

        if ((market === 'ES' || market === 'IT') && product.minDeposit! > 5000) {
          issues.push('Minimum deposit too high for market')
          requiredActions.push('Consider lower entry threshold')
        }

        return {
          market,
          compatible: issues.length === 0,
          issues,
          requiredActions
        }
      })

      const riskFlags: string[] = []

      // Compliance risk assessment
      if (!product.complianceStatus.gdpr) {
        riskFlags.push('GDPR non-compliance blocks all EU markets')
      }
      if (!product.complianceStatus.depositGuarantee) {
        riskFlags.push('Lack of deposit guarantee affects customer trust')
      }
      if (!product.complianceStatus.marketingCompliance) {
        riskFlags.push('Marketing materials need compliance review')
      }
      if (product.interestRate > 5.0) {
        riskFlags.push('High interest rate may trigger regulatory scrutiny')
      }

      const recommendations: string[] = [
        'Obtain legal review for cross-border offering',
        'Prepare localized marketing materials',
        'Set up customer support in local languages',
        'Establish clear fund transfer procedures'
      ]

      if (product.productType === 'fixed_deposit' && product.term! > 36) {
        recommendations.push('Consider shorter term options for market entry')
      }

      const overallScore = 100 - (riskFlags.length * 15) -
        (marketCompatibility.filter(m => !m.compatible).length * 10)

      setAnalysisResults({
        overallScore: Math.max(0, overallScore),
        marketCompatibility,
        riskFlags,
        recommendations
      })

      setIsAnalyzing(false)

      if (onAnalysisComplete) {
        onAnalysisComplete({
          overallScore: Math.max(0, overallScore),
          marketCompatibility,
          riskFlags,
          recommendations
        })
      }
    }, 2000)
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600'
    if (score >= 60) return 'text-amber-600'
    return 'text-red-600'
  }

  const getComplianceIcon = (status: boolean) => {
    return status ? (
      <CheckCircle className="w-4 h-4 text-green-600" />
    ) : (
      <XCircle className="w-4 h-4 text-red-600" />
    )
  }

  return (
    <div className="space-y-6">
      {/* Product Input Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
      >
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Calculator className="w-5 h-5 text-primary" />
          Product Configuration
        </h3>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Bank Partner
            </label>
            <input
              type="text"
              value={product.bankPartner}
              onChange={(e) => setProduct({ ...product, bankPartner: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Product Type
            </label>
            <select
              value={product.productType}
              onChange={(e) => setProduct({ ...product, productType: e.target.value as any })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {Object.entries(productTypeLabels).map(([value, label]) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Interest Rate (% p.a.)
            </label>
            <input
              type="number"
              step="0.1"
              value={product.interestRate}
              onChange={(e) => setProduct({ ...product, interestRate: parseFloat(e.target.value) })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {product.productType === 'fixed_deposit' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Term (months)
              </label>
              <input
                type="number"
                value={product.term || 12}
                onChange={(e) => setProduct({ ...product, term: parseInt(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Min Deposit (€)
            </label>
            <input
              type="number"
              value={product.minDeposit || 1000}
              onChange={(e) => setProduct({ ...product, minDeposit: parseInt(e.target.value) })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Max Deposit (€)
            </label>
            <input
              type="number"
              value={product.maxDeposit || 100000}
              onChange={(e) => setProduct({ ...product, maxDeposit: parseInt(e.target.value) })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        {/* Target Markets */}
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Target Markets
          </label>
          <div className="flex flex-wrap gap-2">
            {['DE', 'FR', 'ES', 'IT', 'GB', 'NL', 'AT', 'PL'].map(market => (
              <button
                key={market}
                onClick={() => {
                  setProduct({
                    ...product,
                    markets: product.markets.includes(market)
                      ? product.markets.filter(m => m !== market)
                      : [...product.markets, market]
                  })
                }}
                className={cn(
                  "px-3 py-1 rounded-lg border transition-all",
                  product.markets.includes(market)
                    ? "bg-primary text-white border-primary"
                    : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
                )}
              >
                {market}
              </button>
            ))}
          </div>
        </div>

        {/* Compliance Status */}
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Compliance Status
          </label>
          <div className="grid grid-cols-2 gap-3">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={product.complianceStatus.gdpr}
                onChange={(e) => setProduct({
                  ...product,
                  complianceStatus: { ...product.complianceStatus, gdpr: e.target.checked }
                })}
                className="w-4 h-4 text-primary rounded"
              />
              <span className="text-sm">GDPR Compliant</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={product.complianceStatus.depositGuarantee}
                onChange={(e) => setProduct({
                  ...product,
                  complianceStatus: { ...product.complianceStatus, depositGuarantee: e.target.checked }
                })}
                className="w-4 h-4 text-primary rounded"
              />
              <span className="text-sm">€100,000 Deposit Guarantee</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={product.complianceStatus.consumerProtection}
                onChange={(e) => setProduct({
                  ...product,
                  complianceStatus: { ...product.complianceStatus, consumerProtection: e.target.checked }
                })}
                className="w-4 h-4 text-primary rounded"
              />
              <span className="text-sm">Consumer Protection</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={product.complianceStatus.marketingCompliance}
                onChange={(e) => setProduct({
                  ...product,
                  complianceStatus: { ...product.complianceStatus, marketingCompliance: e.target.checked }
                })}
                className="w-4 h-4 text-primary rounded"
              />
              <span className="text-sm">Marketing Compliance</span>
            </label>
          </div>
        </div>

        <button
          onClick={analyzeProduct}
          disabled={isAnalyzing}
          className="mt-6 w-full px-4 py-2 bg-primary text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isAnalyzing ? 'Analyzing...' : 'Analyze Product Viability'}
        </button>
      </motion.div>

      {/* Analysis Results */}
      <AnimatePresence>
        {analysisResults && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            {/* Overall Score */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Analysis Results</h3>
                <div className={cn(
                  "text-3xl font-bold",
                  getScoreColor(analysisResults.overallScore)
                )}>
                  {analysisResults.overallScore}%
                </div>
              </div>

              <div className="relative w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${analysisResults.overallScore}%` }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  className={cn(
                    "h-full",
                    analysisResults.overallScore >= 80 ? "bg-green-500" :
                    analysisResults.overallScore >= 60 ? "bg-amber-500" :
                    "bg-red-500"
                  )}
                />
              </div>

              <p className="text-sm text-gray-600 mt-2">
                Product viability score based on compliance, market fit, and regulatory requirements
              </p>
            </div>

            {/* Market Compatibility */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Globe className="w-5 h-5 text-primary" />
                Market Compatibility
              </h3>

              <div className="space-y-3">
                {analysisResults.marketCompatibility.map((market) => (
                  <div
                    key={market.market}
                    className="p-4 bg-gray-50 rounded-lg border border-gray-200"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <JurisdictionBadge
                        code={market.market}
                        name={market.market}
                        showName={true}
                        className="bg-white"
                      />
                      {market.compatible ? (
                        <span className="flex items-center gap-1 text-green-600 font-medium">
                          <CheckCircle className="w-4 h-4" />
                          Compatible
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-amber-600 font-medium">
                          <AlertTriangle className="w-4 h-4" />
                          Issues Found
                        </span>
                      )}
                    </div>

                    {market.issues.length > 0 && (
                      <div className="mt-2 space-y-1">
                        <p className="text-sm font-medium text-gray-700">Issues:</p>
                        {market.issues.map((issue, idx) => (
                          <p key={idx} className="text-sm text-red-600 pl-4">• {issue}</p>
                        ))}
                      </div>
                    )}

                    {market.requiredActions.length > 0 && (
                      <div className="mt-2 space-y-1">
                        <p className="text-sm font-medium text-gray-700">Required Actions:</p>
                        {market.requiredActions.map((action, idx) => (
                          <p key={idx} className="text-sm text-blue-600 pl-4">→ {action}</p>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Risk Flags */}
            {analysisResults.riskFlags.length > 0 && (
              <div className="bg-red-50 rounded-xl border border-red-200 p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-red-800">
                  <Shield className="w-5 h-5" />
                  Risk Flags
                </h3>
                <div className="space-y-2">
                  {analysisResults.riskFlags.map((flag, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-red-600 mt-0.5" />
                      <p className="text-sm text-red-700">{flag}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Recommendations */}
            <div className="bg-blue-50 rounded-xl border border-blue-200 p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-blue-800">
                <FileText className="w-5 h-5" />
                Recommendations
              </h3>
              <div className="space-y-2">
                {analysisResults.recommendations.map((rec, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <TrendingUp className="w-4 h-4 text-blue-600 mt-0.5" />
                    <p className="text-sm text-blue-700">{rec}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Product Summary Card */}
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6">
              <h4 className="font-semibold mb-3 text-indigo-900">Product Summary</h4>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Bank Partner:</span>
                  <span className="ml-2 font-medium">{product.bankPartner}</span>
                </div>
                <div>
                  <span className="text-gray-600">Product Type:</span>
                  <span className="ml-2 font-medium">{productTypeLabels[product.productType]}</span>
                </div>
                <div>
                  <span className="text-gray-600">Interest Rate:</span>
                  <span className="ml-2 font-medium">{product.interestRate}% p.a.</span>
                </div>
                <div>
                  <span className="text-gray-600">Deposit Range:</span>
                  <span className="ml-2 font-medium">€{product.minDeposit?.toLocaleString()} - €{product.maxDeposit?.toLocaleString()}</span>
                </div>
                <div className="md:col-span-2">
                  <span className="text-gray-600">Target Markets:</span>
                  <span className="ml-2 font-medium">{product.markets.join(', ')}</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-indigo-200">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Compliance Status</span>
                  <div className="flex gap-4">
                    <div className="flex items-center gap-1">
                      {getComplianceIcon(product.complianceStatus.gdpr)}
                      <span className="text-xs">GDPR</span>
                    </div>
                    <div className="flex items-center gap-1">
                      {getComplianceIcon(product.complianceStatus.depositGuarantee)}
                      <span className="text-xs">€100k</span>
                    </div>
                    <div className="flex items-center gap-1">
                      {getComplianceIcon(product.complianceStatus.consumerProtection)}
                      <span className="text-xs">Consumer</span>
                    </div>
                    <div className="flex items-center gap-1">
                      {getComplianceIcon(product.complianceStatus.marketingCompliance)}
                      <span className="text-xs">Marketing</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}