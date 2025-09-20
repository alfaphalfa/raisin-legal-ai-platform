'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Shield,
  AlertTriangle,
  CheckCircle,
  Info,
  Globe,
  Calculator,
  FileText,
  TrendingUp,
  XCircle,
  Clock
} from 'lucide-react'
import { JurisdictionBadge } from '@/components/shared/JurisdictionBadge'
import { cn } from '@/lib/utils'

interface DepositProtection {
  jurisdiction: string
  scheme: string
  limit: number
  currency: string
  perDepositor: boolean
  perBank: boolean
  coverageDetails: string[]
  exclusions: string[]
  timeframe: string // for reimbursement
}

interface ValidationResult {
  isProtected: boolean
  protectedAmount: number
  unprotectedAmount: number
  warnings: string[]
  recommendations: string[]
  schemeDetails: DepositProtection
}

const protectionSchemes: Record<string, DepositProtection> = {
  DE: {
    jurisdiction: 'Germany',
    scheme: 'EdB (Entschädigungseinrichtung deutscher Banken)',
    limit: 100000,
    currency: 'EUR',
    perDepositor: true,
    perBank: true,
    coverageDetails: [
      'Covers all deposits up to €100,000',
      'Additional temporary high balances up to €500,000',
      'Covers current accounts, savings accounts, and fixed deposits'
    ],
    exclusions: [
      'Deposits by financial institutions',
      'Deposits by governments',
      'Anonymous deposits',
      'Debt securities issued by the bank'
    ],
    timeframe: '7 working days (20 days until 2024)'
  },
  GB: {
    jurisdiction: 'United Kingdom',
    scheme: 'FSCS (Financial Services Compensation Scheme)',
    limit: 85000,
    currency: 'GBP',
    perDepositor: true,
    perBank: true,
    coverageDetails: [
      'Covers up to £85,000 per person per institution',
      'Temporary high balances up to £1 million for 6 months',
      'Joint accounts covered up to £170,000'
    ],
    exclusions: [
      'Deposits by credit institutions',
      'Deposits by investment firms',
      'Deposits by insurance companies',
      'Deposits by collective investment schemes'
    ],
    timeframe: '7 working days (complex cases up to 15 days)'
  },
  US: {
    jurisdiction: 'United States',
    scheme: 'FDIC (Federal Deposit Insurance Corporation)',
    limit: 250000,
    currency: 'USD',
    perDepositor: true,
    perBank: true,
    coverageDetails: [
      'Standard coverage of $250,000 per depositor, per bank',
      'Separate coverage for different ownership categories',
      'Joint accounts insured up to $250,000 per co-owner'
    ],
    exclusions: [
      'Stock investments',
      'Bond investments',
      'Mutual funds',
      'Crypto assets',
      'Contents of safe deposit boxes'
    ],
    timeframe: 'Within 2 business days of bank failure'
  },
  FR: {
    jurisdiction: 'France',
    scheme: 'FGDR (Fonds de Garantie des Dépôts et de Résolution)',
    limit: 100000,
    currency: 'EUR',
    perDepositor: true,
    perBank: true,
    coverageDetails: [
      'Coverage up to €100,000 per depositor per bank',
      'Temporary high balances up to €500,000 for 3 months',
      'All types of deposits in euros and other currencies'
    ],
    exclusions: [
      'Financial institution deposits',
      'Insurance company deposits',
      'Pension fund deposits',
      'Deposits from public authorities'
    ],
    timeframe: '7 working days (up to 20 days in exceptional cases)'
  },
  ES: {
    jurisdiction: 'Spain',
    scheme: 'FGD (Fondo de Garantía de Depósitos)',
    limit: 100000,
    currency: 'EUR',
    perDepositor: true,
    perBank: true,
    coverageDetails: [
      'Guaranteed up to €100,000 per depositor per entity',
      'Securities guaranteed up to €100,000',
      'Covers deposits in any EU currency'
    ],
    exclusions: [
      'Deposits by credit institutions',
      'Deposits by investment services companies',
      'Government deposits',
      'Deposits linked to money laundering'
    ],
    timeframe: '7 working days (maximum 20 working days)'
  },
  IT: {
    jurisdiction: 'Italy',
    scheme: 'FITD (Fondo Interbancario di Tutela dei Depositi)',
    limit: 100000,
    currency: 'EUR',
    perDepositor: true,
    perBank: true,
    coverageDetails: [
      'Maximum coverage of €100,000 per depositor per bank',
      'Covers deposits in all EU currencies',
      'Joint accounts divided equally among holders'
    ],
    exclusions: [
      'Bearer deposits',
      'Banks and financial institutions deposits',
      'Insurance companies deposits',
      'Deposits arising from illegal transactions'
    ],
    timeframe: '7 working days (extended to 20 in special circumstances)'
  },
  NL: {
    jurisdiction: 'Netherlands',
    scheme: 'DGS (Dutch Deposit Guarantee Scheme)',
    limit: 100000,
    currency: 'EUR',
    perDepositor: true,
    perBank: true,
    coverageDetails: [
      'Guarantees up to €100,000 per account holder per bank',
      'Temporary coverage up to €500,000 for special life events',
      'Covers all deposit accounts including savings and current accounts'
    ],
    exclusions: [
      'Deposits from financial enterprises',
      'Deposits from governments',
      'Anonymous accounts',
      'Deposits related to criminal activities'
    ],
    timeframe: '7 working days (15 days maximum)'
  }
}

export function DepositProtectionValidator() {
  const [depositAmount, setDepositAmount] = useState(50000)
  const [selectedJurisdiction, setSelectedJurisdiction] = useState('DE')
  const [numberOfBanks, setNumberOfBanks] = useState(1)
  const [isJointAccount, setIsJointAccount] = useState(false)
  const [validationResults, setValidationResults] = useState<ValidationResult[]>([])
  const [isValidating, setIsValidating] = useState(false)
  const [comparisonMode, setComparisonMode] = useState(false)
  const [selectedJurisdictions, setSelectedJurisdictions] = useState<string[]>(['DE'])

  const validateProtection = () => {
    setIsValidating(true)

    setTimeout(() => {
      const results: ValidationResult[] = []
      const jurisdictionsToValidate = comparisonMode ? selectedJurisdictions : [selectedJurisdiction]

      jurisdictionsToValidate.forEach(jurisdiction => {
        const scheme = protectionSchemes[jurisdiction]
        if (!scheme) return

        const effectiveLimit = isJointAccount ? scheme.limit * 2 : scheme.limit
        const amountPerBank = depositAmount / numberOfBanks
        const protectedPerBank = Math.min(amountPerBank, effectiveLimit)
        const unprotectedPerBank = Math.max(0, amountPerBank - effectiveLimit)

        const warnings: string[] = []
        const recommendations: string[] = []

        // Generate warnings
        if (unprotectedPerBank > 0) {
          warnings.push(`${formatCurrency(unprotectedPerBank, scheme.currency)} exceeds protection limit per bank`)
        }

        if (numberOfBanks === 1 && depositAmount > scheme.limit) {
          warnings.push('Consider splitting deposits across multiple banks')
        }

        if (jurisdiction === 'GB' && scheme.currency === 'GBP') {
          warnings.push('GBP protection limit may vary with exchange rates')
        }

        // Generate recommendations
        if (unprotectedPerBank > 0) {
          const banksNeeded = Math.ceil(depositAmount / effectiveLimit)
          recommendations.push(`Split deposits across ${banksNeeded} banks for full protection`)
        }

        if (depositAmount > 250000 && jurisdiction !== 'US') {
          recommendations.push('Consider US banks for higher protection limits ($250,000)')
        }

        if (isJointAccount) {
          recommendations.push('Ensure all account holders are properly registered')
        }

        // Special temporary high balance check
        if (depositAmount > scheme.limit && depositAmount <= 500000) {
          recommendations.push('May qualify for temporary high balance protection (property sale, inheritance, etc.)')
        }

        results.push({
          isProtected: unprotectedPerBank === 0,
          protectedAmount: protectedPerBank * numberOfBanks,
          unprotectedAmount: unprotectedPerBank * numberOfBanks,
          warnings,
          recommendations,
          schemeDetails: scheme
        })
      })

      setValidationResults(results)
      setIsValidating(false)
    }, 1500)
  }

  const formatCurrency = (amount: number, currency: string) => {
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })
    return formatter.format(amount)
  }

  const getProtectionPercentage = (result: ValidationResult) => {
    const total = result.protectedAmount + result.unprotectedAmount
    return total > 0 ? (result.protectedAmount / total) * 100 : 0
  }

  const getProtectionColor = (percentage: number) => {
    if (percentage === 100) return 'text-green-600'
    if (percentage >= 80) return 'text-amber-600'
    return 'text-red-600'
  }

  return (
    <div className="space-y-6">
      {/* Configuration Panel */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
      >
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Shield className="w-5 h-5 text-primary" />
          Deposit Protection Configuration
        </h3>

        <div className="space-y-4">
          {/* Deposit Amount */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Total Deposit Amount
            </label>
            <div className="flex items-center gap-3">
              <input
                type="range"
                min="1000"
                max="1000000"
                step="1000"
                value={depositAmount}
                onChange={(e) => setDepositAmount(Number(e.target.value))}
                className="flex-1 h-2 bg-indigo-200 rounded-lg appearance-none cursor-pointer"
              />
              <input
                type="number"
                value={depositAmount}
                onChange={(e) => setDepositAmount(Number(e.target.value))}
                className="w-32 px-3 py-2 border border-gray-300 rounded-lg text-right"
              />
            </div>
          </div>

          {/* Comparison Mode Toggle */}
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <label className="text-sm font-medium text-gray-700">
              Compare Multiple Jurisdictions
            </label>
            <button
              onClick={() => setComparisonMode(!comparisonMode)}
              className={cn(
                "relative inline-flex h-6 w-11 items-center rounded-full transition-colors",
                comparisonMode ? "bg-primary" : "bg-gray-300"
              )}
            >
              <span
                className={cn(
                  "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
                  comparisonMode ? "translate-x-6" : "translate-x-1"
                )}
              />
            </button>
          </div>

          {/* Jurisdiction Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {comparisonMode ? 'Select Jurisdictions to Compare' : 'Select Jurisdiction'}
            </label>
            {comparisonMode ? (
              <div className="grid grid-cols-4 gap-2">
                {Object.keys(protectionSchemes).map(code => (
                  <button
                    key={code}
                    onClick={() => {
                      setSelectedJurisdictions(prev =>
                        prev.includes(code)
                          ? prev.filter(c => c !== code)
                          : [...prev, code]
                      )
                    }}
                    className={cn(
                      "p-2 rounded-lg border transition-all",
                      selectedJurisdictions.includes(code)
                        ? "bg-primary text-white border-primary"
                        : "bg-white border-gray-300 hover:border-gray-400"
                    )}
                  >
                    <JurisdictionBadge
                      code={code}
                      name={protectionSchemes[code].jurisdiction}
                      size="sm"
                      showName={false}
                      className="bg-transparent border-0 px-0 justify-center"
                    />
                    <div className="text-xs mt-1">{code}</div>
                  </button>
                ))}
              </div>
            ) : (
              <select
                value={selectedJurisdiction}
                onChange={(e) => setSelectedJurisdiction(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              >
                {Object.entries(protectionSchemes).map(([code, scheme]) => (
                  <option key={code} value={code}>
                    {scheme.jurisdiction} - {scheme.scheme}
                  </option>
                ))}
              </select>
            )}
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {/* Number of Banks */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Number of Banks
              </label>
              <input
                type="number"
                min="1"
                max="10"
                value={numberOfBanks}
                onChange={(e) => setNumberOfBanks(Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
            </div>

            {/* Joint Account */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Account Type
              </label>
              <select
                value={isJointAccount ? 'joint' : 'single'}
                onChange={(e) => setIsJointAccount(e.target.value === 'joint')}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              >
                <option value="single">Single Account</option>
                <option value="joint">Joint Account (2 holders)</option>
              </select>
            </div>
          </div>

          <button
            onClick={validateProtection}
            disabled={isValidating}
            className="w-full px-4 py-2 bg-primary text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50"
          >
            {isValidating ? 'Validating...' : 'Validate Protection'}
          </button>
        </div>
      </motion.div>

      {/* Validation Results */}
      <AnimatePresence>
        {validationResults.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-4"
          >
            {validationResults.map((result, index) => {
              const percentage = getProtectionPercentage(result)
              return (
                <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <JurisdictionBadge
                        code={result.schemeDetails.jurisdiction.slice(0, 2).toUpperCase()}
                        name={result.schemeDetails.jurisdiction}
                        className="bg-gray-50"
                      />
                      <div>
                        <h4 className="font-semibold">{result.schemeDetails.scheme}</h4>
                        <p className="text-sm text-gray-600">
                          Protection limit: {formatCurrency(result.schemeDetails.limit, result.schemeDetails.currency)}
                          {isJointAccount && ' (×2 for joint account)'}
                        </p>
                      </div>
                    </div>
                    <div className={cn("text-2xl font-bold", getProtectionColor(percentage))}>
                      {percentage.toFixed(0)}%
                    </div>
                  </div>

                  {/* Protection Visual */}
                  <div className="mb-4">
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>Protected</span>
                      <span>{formatCurrency(result.protectedAmount, result.schemeDetails.currency)}</span>
                    </div>
                    <div className="relative w-full h-8 bg-gray-200 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${percentage}%` }}
                        transition={{ duration: 0.5, ease: 'easeOut' }}
                        className={cn(
                          "h-full",
                          result.isProtected ? "bg-green-500" : "bg-gradient-to-r from-green-500 to-red-500"
                        )}
                      />
                      {!result.isProtected && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-xs font-medium text-white bg-black/30 px-2 py-1 rounded">
                            {formatCurrency(result.unprotectedAmount, result.schemeDetails.currency)} at risk
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Status */}
                  <div className="flex items-center gap-2 mb-4">
                    {result.isProtected ? (
                      <>
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <span className="text-green-700 font-medium">Fully Protected</span>
                      </>
                    ) : (
                      <>
                        <AlertTriangle className="w-5 h-5 text-amber-600" />
                        <span className="text-amber-700 font-medium">Partial Protection</span>
                      </>
                    )}
                  </div>

                  {/* Warnings */}
                  {result.warnings.length > 0 && (
                    <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                      <h5 className="text-sm font-medium text-amber-800 mb-2">Warnings</h5>
                      {result.warnings.map((warning, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <AlertTriangle className="w-4 h-4 text-amber-600 mt-0.5" />
                          <p className="text-sm text-amber-700">{warning}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Recommendations */}
                  {result.recommendations.length > 0 && (
                    <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <h5 className="text-sm font-medium text-blue-800 mb-2">Recommendations</h5>
                      {result.recommendations.map((rec, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <TrendingUp className="w-4 h-4 text-blue-600 mt-0.5" />
                          <p className="text-sm text-blue-700">{rec}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Scheme Details */}
                  <details className="group">
                    <summary className="cursor-pointer flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-primary">
                      <Info className="w-4 h-4" />
                      Scheme Details
                    </summary>
                    <div className="mt-3 space-y-3">
                      <div>
                        <h6 className="text-xs font-semibold text-gray-600 uppercase">Coverage</h6>
                        <ul className="mt-1 space-y-1">
                          {result.schemeDetails.coverageDetails.map((detail, idx) => (
                            <li key={idx} className="text-sm text-gray-600 flex items-start gap-1">
                              <CheckCircle className="w-3 h-3 text-green-500 mt-0.5" />
                              {detail}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h6 className="text-xs font-semibold text-gray-600 uppercase">Exclusions</h6>
                        <ul className="mt-1 space-y-1">
                          {result.schemeDetails.exclusions.map((exclusion, idx) => (
                            <li key={idx} className="text-sm text-gray-600 flex items-start gap-1">
                              <XCircle className="w-3 h-3 text-red-500 mt-0.5" />
                              {exclusion}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-600">
                          <strong>Reimbursement:</strong> {result.schemeDetails.timeframe}
                        </span>
                      </div>
                    </div>
                  </details>
                </div>
              )
            })}

            {/* Comparison Summary */}
            {comparisonMode && validationResults.length > 1 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 border border-indigo-200"
              >
                <h4 className="text-lg font-semibold mb-4 text-indigo-900">
                  Protection Comparison Summary
                </h4>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-white rounded-lg p-4">
                    <Globe className="w-8 h-8 text-indigo-600 mb-2" />
                    <h5 className="font-medium">Best Protection</h5>
                    <p className="text-2xl font-bold text-indigo-600 mt-1">
                      {validationResults.reduce((best, result) =>
                        result.protectedAmount > best.protectedAmount ? result : best
                      ).schemeDetails.jurisdiction}
                    </p>
                  </div>
                  <div className="bg-white rounded-lg p-4">
                    <Calculator className="w-8 h-8 text-green-600 mb-2" />
                    <h5 className="font-medium">Total Protected</h5>
                    <p className="text-2xl font-bold text-green-600 mt-1">
                      {formatCurrency(
                        Math.max(...validationResults.map(r => r.protectedAmount)),
                        'EUR'
                      )}
                    </p>
                  </div>
                  <div className="bg-white rounded-lg p-4">
                    <Shield className="w-8 h-8 text-purple-600 mb-2" />
                    <h5 className="font-medium">Full Coverage</h5>
                    <p className="text-2xl font-bold text-purple-600 mt-1">
                      {validationResults.filter(r => r.isProtected).length} / {validationResults.length}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}