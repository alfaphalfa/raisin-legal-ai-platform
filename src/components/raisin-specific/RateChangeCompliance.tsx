'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Bell,
  Mail,
  FileText,
  Globe,
  Clock,
  Shield,
  Info,
  X,
  Copy,
  Eye,
  Users
} from 'lucide-react'
import { JurisdictionBadge } from '@/components/shared/JurisdictionBadge'
import { cn } from '@/lib/utils'

interface RateChange {
  bankPartner: string
  productName: string
  productType: 'fixed_deposit' | 'savings_account' | 'notice_account'
  jurisdiction: string
  previousRate: number
  newRate: number
  changeType: 'increase' | 'decrease'
  effectiveDate: Date
  affectedCustomers: number
  notificationRequired: boolean
  regulatoryRequirements: string[]
}

interface ComplianceCheck {
  category: string
  status: 'compliant' | 'warning' | 'violation'
  message: string
  action?: string
}

interface MarketingMessage {
  channel: 'email' | 'website' | 'app' | 'sms'
  template: string
  complianceNotes: string[]
  requiresApproval: boolean
  approvalStatus?: 'pending' | 'approved' | 'rejected'
}

// Mock data for demonstration
const mockRateChanges: RateChange[] = [
  {
    bankPartner: 'Deutsche Bank',
    productName: 'FlexSave Plus',
    productType: 'savings_account',
    jurisdiction: 'DE',
    previousRate: 2.5,
    newRate: 3.0,
    changeType: 'increase',
    effectiveDate: new Date('2024-10-01'),
    affectedCustomers: 1250,
    notificationRequired: false,
    regulatoryRequirements: ['MiFID II transparency']
  },
  {
    bankPartner: 'Barclays',
    productName: '12-Month Fixed',
    productType: 'fixed_deposit',
    jurisdiction: 'GB',
    previousRate: 4.2,
    newRate: 3.8,
    changeType: 'decrease',
    effectiveDate: new Date('2024-09-25'),
    affectedCustomers: 890,
    notificationRequired: true,
    regulatoryRequirements: ['FCA PRIN 7', 'TCF Outcome 4']
  },
  {
    bankPartner: 'BNP Paribas',
    productName: 'Notice Account 90',
    productType: 'notice_account',
    jurisdiction: 'FR',
    previousRate: 2.8,
    newRate: 3.2,
    changeType: 'increase',
    effectiveDate: new Date('2024-09-28'),
    affectedCustomers: 567,
    notificationRequired: false,
    regulatoryRequirements: ['Code monétaire et financier']
  }
]

export function RateChangeCompliance() {
  const [rateChanges, setRateChanges] = useState<RateChange[]>(mockRateChanges)
  const [selectedChange, setSelectedChange] = useState<RateChange | null>(null)
  const [filterJurisdiction, setFilterJurisdiction] = useState<string>('all')
  const [filterType, setFilterType] = useState<string>('all')
  const [showOnlyRequired, setShowOnlyRequired] = useState(false)
  const [generatedMessages, setGeneratedMessages] = useState<MarketingMessage[]>([])
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [complianceChecks, setComplianceChecks] = useState<ComplianceCheck[]>([])

  const jurisdictions = ['all', 'DE', 'GB', 'FR', 'ES', 'IT', 'NL', 'US']
  const changeTypes = ['all', 'increase', 'decrease']

  const filteredChanges = rateChanges.filter(change => {
    if (filterJurisdiction !== 'all' && change.jurisdiction !== filterJurisdiction) return false
    if (filterType !== 'all' && change.changeType !== filterType) return false
    if (showOnlyRequired && !change.notificationRequired) return false
    return true
  })

  const analyzeRateChange = (change: RateChange) => {
    setSelectedChange(change)
    setIsAnalyzing(true)

    setTimeout(() => {
      // Compliance checks
      const checks: ComplianceCheck[] = []

      // Check rate change magnitude
      const changePercentage = Math.abs((change.newRate - change.previousRate) / change.previousRate * 100)
      if (changePercentage > 20) {
        checks.push({
          category: 'Rate Change Magnitude',
          status: 'warning',
          message: `Rate change of ${changePercentage.toFixed(1)}% exceeds 20% threshold`,
          action: 'Consider phased implementation'
        })
      } else {
        checks.push({
          category: 'Rate Change Magnitude',
          status: 'compliant',
          message: `Rate change of ${changePercentage.toFixed(1)}% is within acceptable range`
        })
      }

      // Check notification requirements
      if (change.changeType === 'decrease' && change.affectedCustomers > 100) {
        checks.push({
          category: 'Customer Notification',
          status: change.notificationRequired ? 'compliant' : 'violation',
          message: change.notificationRequired
            ? 'Customer notification correctly flagged as required'
            : 'Customer notification required but not flagged',
          action: change.notificationRequired ? undefined : 'Enable customer notifications immediately'
        })
      }

      // Check advance notice period
      const daysUntilEffective = Math.ceil((change.effectiveDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24))
      if (daysUntilEffective < 30 && change.changeType === 'decrease') {
        checks.push({
          category: 'Advance Notice Period',
          status: 'warning',
          message: `Only ${daysUntilEffective} days notice - may not meet regulatory requirements`,
          action: 'Consider extending effective date to 30+ days'
        })
      } else {
        checks.push({
          category: 'Advance Notice Period',
          status: 'compliant',
          message: `${daysUntilEffective} days advance notice is sufficient`
        })
      }

      // Marketing compliance
      if (change.changeType === 'increase') {
        checks.push({
          category: 'Marketing Compliance',
          status: 'compliant',
          message: 'Rate increase can be promoted with standard disclaimers',
          action: 'Include "rates subject to change" disclaimer'
        })
      }

      // Jurisdiction-specific checks
      if (change.jurisdiction === 'GB') {
        checks.push({
          category: 'FCA Requirements',
          status: 'compliant',
          message: 'Meets FCA Principle 7 (clear communications)',
          action: 'Ensure prominence given to key information'
        })
      }

      if (change.jurisdiction === 'DE') {
        checks.push({
          category: 'BaFin Requirements',
          status: 'compliant',
          message: 'Complies with WpHG transparency requirements'
        })
      }

      setComplianceChecks(checks)

      // Generate marketing messages
      const messages: MarketingMessage[] = []

      if (change.changeType === 'increase') {
        messages.push({
          channel: 'email',
          template: `Subject: Great news! Your ${change.productName} rate is increasing

Dear Customer,

We're pleased to inform you that the interest rate on your ${change.productName} with ${change.bankPartner} will increase from ${change.previousRate}% to ${change.newRate}% effective ${change.effectiveDate.toLocaleDateString()}.

This means you'll earn even more on your savings!

No action is required on your part. The new rate will be applied automatically.

Best regards,
The Raisin Team`,
          complianceNotes: [
            'Positive framing appropriate for rate increase',
            'Clear effective date provided',
            'No misleading statements about returns'
          ],
          requiresApproval: false,
          approvalStatus: 'approved'
        })

        messages.push({
          channel: 'website',
          template: `🎉 Rate Increase Alert: ${change.bankPartner} ${change.productName} now offers ${change.newRate}% p.a. (previously ${change.previousRate}%)`,
          complianceNotes: [
            'Include "p.a." to clarify annual rate',
            'Show both old and new rates for transparency',
            'Add "rates subject to change" disclaimer'
          ],
          requiresApproval: false,
          approvalStatus: 'approved'
        })
      } else {
        messages.push({
          channel: 'email',
          template: `Subject: Important: Rate change for your ${change.productName}

Dear Customer,

We need to inform you of an upcoming change to your ${change.productName} with ${change.bankPartner}.

Current rate: ${change.previousRate}% p.a.
New rate: ${change.newRate}% p.a.
Effective date: ${change.effectiveDate.toLocaleDateString()}

While rates can go down as well as up, you have several options:
1. Keep your funds where they are
2. Switch to another product with a higher rate
3. Withdraw your funds (subject to terms)

Please log into your account to explore alternative products with competitive rates.

The Raisin Team`,
          complianceNotes: [
            'Neutral tone for rate decrease',
            'Clear presentation of options',
            'No pressure to take specific action',
            'Complies with treating customers fairly'
          ],
          requiresApproval: true,
          approvalStatus: 'pending'
        })

        messages.push({
          channel: 'app',
          template: `Rate Update: Your ${change.productName} rate will change to ${change.newRate}% from ${change.effectiveDate.toLocaleDateString()}. View alternatives →`,
          complianceNotes: [
            'Factual presentation',
            'Link to alternatives provided',
            'No misleading omissions'
          ],
          requiresApproval: true,
          approvalStatus: 'pending'
        })
      }

      // SMS for significant changes
      if (Math.abs(changePercentage) > 15) {
        messages.push({
          channel: 'sms',
          template: `Raisin: Your ${change.bankPartner} ${change.productName} rate changes to ${change.newRate}% on ${change.effectiveDate.toLocaleDateString().split('/')[0]}/${change.effectiveDate.toLocaleDateString().split('/')[1]}. Check app for details.`,
          complianceNotes: [
            'Under 160 characters',
            'Essential information only',
            'Directs to app for full details'
          ],
          requiresApproval: true,
          approvalStatus: 'pending'
        })
      }

      setGeneratedMessages(messages)
      setIsAnalyzing(false)
    }, 1500)
  }

  const getChangeIcon = (changeType: 'increase' | 'decrease') => {
    return changeType === 'increase' ? (
      <TrendingUp className="w-4 h-4 text-green-600" />
    ) : (
      <TrendingDown className="w-4 h-4 text-red-600" />
    )
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'compliant': return 'text-green-600 bg-green-100'
      case 'warning': return 'text-amber-600 bg-amber-100'
      case 'violation': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <div className="space-y-6">
      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
      >
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-primary" />
          Rate Change Monitor
        </h3>

        <div className="grid md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Jurisdiction
            </label>
            <select
              value={filterJurisdiction}
              onChange={(e) => setFilterJurisdiction(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            >
              {jurisdictions.map(j => (
                <option key={j} value={j}>{j === 'all' ? 'All Markets' : j}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Change Type
            </label>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            >
              {changeTypes.map(t => (
                <option key={t} value={t}>
                  {t === 'all' ? 'All Changes' : t.charAt(0).toUpperCase() + t.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-end">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={showOnlyRequired}
                onChange={(e) => setShowOnlyRequired(e.target.checked)}
                className="w-4 h-4 text-primary rounded"
              />
              <span className="text-sm font-medium text-gray-700">
                Only Show Required Notifications
              </span>
            </label>
          </div>

          <div className="flex items-end">
            <div className="text-right">
              <div className="text-2xl font-bold text-primary">{filteredChanges.length}</div>
              <div className="text-sm text-gray-600">Active Changes</div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Rate Changes List */}
      <div className="grid lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
        >
          <h3 className="text-lg font-semibold mb-4">Recent Rate Changes</h3>

          <div className="space-y-3 max-h-[600px] overflow-y-auto">
            {filteredChanges.map((change, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.02 }}
                onClick={() => analyzeRateChange(change)}
                className={cn(
                  "p-4 rounded-lg border cursor-pointer transition-all",
                  selectedChange === change
                    ? "border-primary bg-primary/5"
                    : "border-gray-200 hover:border-gray-300"
                )}
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="font-semibold text-gray-900">{change.bankPartner}</h4>
                    <p className="text-sm text-gray-600">{change.productName}</p>
                  </div>
                  <JurisdictionBadge
                    code={change.jurisdiction}
                    size="sm"
                    showName={false}
                  />
                </div>

                <div className="flex items-center gap-4 mb-3">
                  <div className="flex items-center gap-2">
                    {getChangeIcon(change.changeType)}
                    <span className="text-sm font-medium">
                      {change.previousRate}% → {change.newRate}%
                    </span>
                  </div>
                  <span className={cn(
                    "text-xs px-2 py-1 rounded-full",
                    change.changeType === 'increase'
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  )}>
                    {change.changeType === 'increase' ? '+' : '-'}
                    {Math.abs(change.newRate - change.previousRate).toFixed(1)}%
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs text-gray-500">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {change.effectiveDate.toLocaleDateString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      {change.affectedCustomers.toLocaleString()} customers
                    </span>
                  </div>
                  {change.notificationRequired && (
                    <span className="flex items-center gap-1 text-amber-600">
                      <Bell className="w-3 h-3" />
                      Required
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Analysis Panel */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
        >
          <h3 className="text-lg font-semibold mb-4">Compliance Analysis</h3>

          {selectedChange ? (
            <AnimatePresence mode="wait">
              {isAnalyzing ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center justify-center py-12"
                >
                  <div className="text-center">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"
                    />
                    <p className="text-gray-600">Analyzing compliance requirements...</p>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-4"
                >
                  {/* Compliance Checks */}
                  <div className="space-y-2">
                    {complianceChecks.map((check, idx) => (
                      <div
                        key={idx}
                        className="p-3 bg-gray-50 rounded-lg border border-gray-200"
                      >
                        <div className="flex items-start justify-between mb-1">
                          <h5 className="font-medium text-sm">{check.category}</h5>
                          <span className={cn(
                            "text-xs px-2 py-0.5 rounded-full",
                            getStatusColor(check.status)
                          )}>
                            {check.status}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">{check.message}</p>
                        {check.action && (
                          <p className="text-sm text-blue-600 mt-1">
                            → {check.action}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Regulatory Requirements */}
                  {selectedChange.regulatoryRequirements.length > 0 && (
                    <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <h5 className="font-medium text-sm text-blue-900 mb-2">
                        Regulatory Requirements
                      </h5>
                      <ul className="space-y-1">
                        {selectedChange.regulatoryRequirements.map((req, idx) => (
                          <li key={idx} className="text-sm text-blue-700 flex items-start gap-1">
                            <Shield className="w-3 h-3 mt-0.5" />
                            {req}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          ) : (
            <div className="text-center py-12 text-gray-500">
              Select a rate change to analyze compliance requirements
            </div>
          )}
        </motion.div>
      </div>

      {/* Generated Marketing Messages */}
      {generatedMessages.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
        >
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Mail className="w-5 h-5 text-primary" />
            Compliant Marketing Messages
          </h3>

          <div className="grid md:grid-cols-2 gap-4">
            {generatedMessages.map((message, idx) => (
              <div
                key={idx}
                className="p-4 bg-gray-50 rounded-lg border border-gray-200"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className={cn(
                      "text-xs px-2 py-1 rounded font-medium uppercase",
                      message.channel === 'email' ? 'bg-blue-100 text-blue-700' :
                      message.channel === 'website' ? 'bg-green-100 text-green-700' :
                      message.channel === 'app' ? 'bg-purple-100 text-purple-700' :
                      'bg-gray-100 text-gray-700'
                    )}>
                      {message.channel}
                    </span>
                    {message.requiresApproval && (
                      <span className={cn(
                        "text-xs px-2 py-1 rounded",
                        message.approvalStatus === 'approved'
                          ? 'bg-green-100 text-green-700'
                          : message.approvalStatus === 'rejected'
                          ? 'bg-red-100 text-red-700'
                          : 'bg-amber-100 text-amber-700'
                      )}>
                        {message.approvalStatus || 'pending'}
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => copyToClipboard(message.template)}
                    className="p-1 hover:bg-white rounded transition-colors"
                    title="Copy to clipboard"
                  >
                    <Copy className="w-4 h-4 text-gray-500" />
                  </button>
                </div>

                <div className="bg-white p-3 rounded text-sm text-gray-700 mb-3 whitespace-pre-line max-h-32 overflow-y-auto">
                  {message.template}
                </div>

                <div className="space-y-1">
                  <p className="text-xs font-medium text-gray-600">Compliance Notes:</p>
                  {message.complianceNotes.map((note, noteIdx) => (
                    <p key={noteIdx} className="text-xs text-gray-500 flex items-start gap-1">
                      <CheckCircle className="w-3 h-3 text-green-500 mt-0.5" />
                      {note}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Summary Statistics */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl p-6"
      >
        <h3 className="text-lg font-semibold mb-4">Rate Change Summary</h3>

        <div className="grid md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-5 h-5 text-green-600" />
              <span className="text-sm text-gray-600">Rate Increases</span>
            </div>
            <div className="text-2xl font-bold text-green-600">
              {rateChanges.filter(c => c.changeType === 'increase').length}
            </div>
          </div>

          <div className="bg-white rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <TrendingDown className="w-5 h-5 text-red-600" />
              <span className="text-sm text-gray-600">Rate Decreases</span>
            </div>
            <div className="text-2xl font-bold text-red-600">
              {rateChanges.filter(c => c.changeType === 'decrease').length}
            </div>
          </div>

          <div className="bg-white rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Bell className="w-5 h-5 text-amber-600" />
              <span className="text-sm text-gray-600">Notifications Required</span>
            </div>
            <div className="text-2xl font-bold text-amber-600">
              {rateChanges.filter(c => c.notificationRequired).length}
            </div>
          </div>

          <div className="bg-white rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Users className="w-5 h-5 text-blue-600" />
              <span className="text-sm text-gray-600">Customers Affected</span>
            </div>
            <div className="text-2xl font-bold text-blue-600">
              {rateChanges.reduce((sum, c) => sum + c.affectedCustomers, 0).toLocaleString()}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}