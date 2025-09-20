'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowLeft,
  MessageSquare,
  Send,
  Clock,
  CheckCircle,
  AlertTriangle,
  User,
  Bot,
  Filter,
  RefreshCw,
  Zap,
  Languages
} from 'lucide-react'
import Link from 'next/link'
import { JurisdictionBadge } from '@/components/shared/JurisdictionBadge'
import { mockCustomerQueries } from '@/lib/mock-data'
import { formatDate, cn } from '@/lib/utils'

interface Message {
  id: string
  role: 'customer' | 'assistant' | 'system'
  content: string
  timestamp: Date
  confidence?: number
}

export default function LegalAssistantPage() {
  const [selectedQuery, setSelectedQuery] = useState<typeof mockCustomerQueries[0] | null>(null)
  const [responseMessage, setResponseMessage] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [filterCategory, setFilterCategory] = useState<string | null>(null)
  const [filterStatus, setFilterStatus] = useState<string | null>(null)

  const filteredQueries = mockCustomerQueries.filter(query => {
    if (filterCategory && query.category !== filterCategory) return false
    if (filterStatus && query.status !== filterStatus) return false
    return true
  })

  const handleGenerateResponse = (query: typeof mockCustomerQueries[0]) => {
    setSelectedQuery(query)
    setIsGenerating(true)

    // Simulate AI response generation
    setTimeout(() => {
      let response = ''
      if (query.category === 'KYC') {
        response = `Dear ${query.customer},

Thank you for your inquiry about account opening requirements.

To open an account with ${query.bank}, you will need the following documents:

1. **Identity Verification**
   - Valid passport or national ID card
   - For EU citizens: National ID is sufficient
   - For non-EU residents: Passport required

2. **Proof of Address**
   - Utility bill (not older than 3 months)
   - Bank statement from another institution
   - Official government correspondence

3. **Tax Information**
   - Tax Identification Number (TIN)
   - For US citizens: W-9 form required
   - Tax residence declaration

4. **Additional Requirements**
   - Employment verification or income proof
   - Purpose of account opening declaration

The verification process typically takes 2-3 business days once all documents are submitted.

If you have any questions, please don't hesitate to reach out.

Best regards,
Raisin Customer Service`
      } else if (query.category === 'Payments') {
        response = `Dear ${query.customer},

Thank you for your question about international transfers.

International transfer times depend on several factors:

**SEPA Transfers (within EU)**
- Standard: 1-2 business days
- Instant: Available within seconds (for participating banks)
- Cut-off time: 3:00 PM CET

**SWIFT Transfers (outside EU)**
- Standard: 3-5 business days
- Express: 1-2 business days (additional fees apply)
- Factors affecting speed: Correspondent banks, time zones, compliance checks

**Important Notes:**
- Transfers initiated after cut-off times will be processed the next business day
- Additional compliance checks may be required for amounts over €10,000
- Exchange rates are applied at the time of processing

For tracking your specific transfer, please provide your transaction reference number.

Best regards,
Raisin Customer Service`
      } else {
        response = `Dear ${query.customer},

Thank you for reporting this technical issue.

We have escalated your concern to our technical team for immediate investigation.

**Reference Number:** TECH-2024-${Math.floor(Math.random() * 10000)}

Our team will:
1. Review your account details
2. Investigate the reported issue
3. Provide a resolution within 24-48 hours

You will receive an email update once the issue is resolved.

Best regards,
Raisin Technical Support`
      }

      setResponseMessage(response)
      setIsGenerating(false)
    }, 2000)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'resolved':
        return 'bg-green-100 text-green-700'
      case 'pending_review':
        return 'bg-amber-100 text-amber-700'
      case 'escalated':
        return 'bg-red-100 text-red-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return 'text-green-600'
    if (confidence >= 70) return 'text-amber-600'
    return 'text-red-600'
  }

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
              <h1 className="text-xl font-semibold">Legal Assistant</h1>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-2 bg-green-100 text-green-700 rounded-lg">
                <Zap className="w-4 h-4" />
                <span className="text-sm font-medium">98% Accuracy</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 bg-blue-100 text-blue-700 rounded-lg">
                <Languages className="w-4 h-4" />
                <span className="text-sm font-medium">12 Languages</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="p-6">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Query List */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Customer Queries</h2>
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>

              {/* Filters */}
              <div className="mb-4 space-y-2">
                <div className="flex gap-2">
                  <select
                    value={filterCategory || ''}
                    onChange={(e) => setFilterCategory(e.target.value || null)}
                    className="flex-1 px-3 py-1 text-sm border border-gray-300 rounded-lg"
                  >
                    <option value="">All Categories</option>
                    <option value="KYC">KYC</option>
                    <option value="Payments">Payments</option>
                    <option value="Technical">Technical</option>
                  </select>
                  <select
                    value={filterStatus || ''}
                    onChange={(e) => setFilterStatus(e.target.value || null)}
                    className="flex-1 px-3 py-1 text-sm border border-gray-300 rounded-lg"
                  >
                    <option value="">All Status</option>
                    <option value="resolved">Resolved</option>
                    <option value="pending_review">Pending</option>
                    <option value="escalated">Escalated</option>
                  </select>
                </div>
              </div>

              {/* Query Items */}
              <div className="space-y-3 max-h-[600px] overflow-y-auto">
                {filteredQueries.map((query) => (
                  <motion.button
                    key={query.id}
                    whileHover={{ scale: 1.02 }}
                    onClick={() => handleGenerateResponse(query)}
                    className={cn(
                      "w-full text-left p-4 rounded-lg border transition-all",
                      selectedQuery?.id === query.id
                        ? "border-primary bg-primary/10"
                        : "border-gray-200 hover:border-gray-300"
                    )}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="font-medium text-sm">{query.customer}</p>
                        <p className="text-xs text-gray-500">{query.bank}</p>
                      </div>
                      <span className={cn(
                        "text-xs px-2 py-1 rounded",
                        getStatusColor(query.status)
                      )}>
                        {query.status.replace(/_/g, ' ')}
                      </span>
                    </div>

                    <p className="text-sm text-gray-700 mb-2 line-clamp-2">
                      {query.query}
                    </p>

                    <div className="flex items-center justify-between">
                      <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                        {query.category}
                      </span>
                      <div className="flex items-center gap-2">
                        <div className={cn(
                          "text-xs font-medium",
                          getConfidenceColor(query.confidence)
                        )}>
                          {query.confidence}%
                        </div>
                        <Clock className="w-3 h-3 text-gray-400" />
                        <span className="text-xs text-gray-500">
                          {formatDate(query.timestamp)}
                        </span>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Response Interface */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
            >
              {selectedQuery ? (
                <>
                  {/* Query Details Header */}
                  <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-lg">{selectedQuery.customer}</h3>
                        <p className="text-sm text-gray-600 mt-1">{selectedQuery.bank}</p>
                      </div>
                      <div className="text-right">
                        <span className={cn(
                          "inline-block px-3 py-1 rounded text-sm",
                          getStatusColor(selectedQuery.status)
                        )}>
                          {selectedQuery.status.replace(/_/g, ' ')}
                        </span>
                        <p className="text-xs text-gray-500 mt-2">
                          {formatDate(selectedQuery.timestamp)}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Chat Interface */}
                  <div className="space-y-4 mb-6">
                    {/* Customer Message */}
                    <div className="flex gap-3">
                      <div className="p-2 bg-gray-100 rounded-full">
                        <User className="w-5 h-5 text-gray-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-700 mb-1">Customer</p>
                        <div className="bg-gray-100 rounded-lg p-4">
                          <p className="text-gray-800">{selectedQuery.query}</p>
                        </div>
                      </div>
                    </div>

                    {/* AI Response */}
                    <AnimatePresence>
                      {(isGenerating || responseMessage) && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className="flex gap-3"
                        >
                          <div className="p-2 bg-primary/10 rounded-full">
                            <Bot className="w-5 h-5 text-primary" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <p className="text-sm font-medium text-gray-700">AI Assistant</p>
                              {selectedQuery.confidence && (
                                <span className={cn(
                                  "text-xs font-medium",
                                  getConfidenceColor(selectedQuery.confidence)
                                )}>
                                  {selectedQuery.confidence}% confidence
                                </span>
                              )}
                            </div>
                            <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                              {isGenerating ? (
                                <div className="flex items-center gap-2">
                                  <motion.div
                                    animate={{ opacity: [0.4, 1, 0.4] }}
                                    transition={{ duration: 1.5, repeat: Infinity }}
                                  >
                                    <RefreshCw className="w-4 h-4 text-primary" />
                                  </motion.div>
                                  <span className="text-gray-600">Generating response...</span>
                                </div>
                              ) : (
                                <div className="whitespace-pre-wrap text-gray-800">
                                  {responseMessage}
                                </div>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Action Buttons */}
                  {responseMessage && (
                    <div className="flex gap-3">
                      <button className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2">
                        <Send className="w-4 h-4" />
                        Send to Customer
                      </button>
                      <button className="flex-1 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors flex items-center justify-center gap-2">
                        <User className="w-4 h-4" />
                        Request Human Review
                      </button>
                      <button className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
                        Edit
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-12">
                  <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">Select a query to generate a response</p>
                </div>
              )}
            </motion.div>

            {/* Confidence Metrics */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 bg-white rounded-xl shadow-sm border border-gray-200 p-6"
            >
              <h3 className="text-lg font-semibold mb-4">Response Analytics</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-green-700">87%</p>
                  <p className="text-sm text-gray-600">Auto-resolved</p>
                </div>
                <div className="text-center p-4 bg-amber-50 rounded-lg">
                  <AlertTriangle className="w-8 h-8 text-amber-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-amber-700">11%</p>
                  <p className="text-sm text-gray-600">Human review</p>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <Clock className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-blue-700">45s</p>
                  <p className="text-sm text-gray-600">Avg response time</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}