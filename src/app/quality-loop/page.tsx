'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  ArrowLeft,
  ThumbsUp,
  ThumbsDown,
  AlertTriangle,
  Save,
  BarChart3,
  TrendingUp,
  Users,
  CheckCircle
} from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

interface ReviewItem {
  id: number
  type: 'contract_clause' | 'compliance_brief' | 'customer_response'
  confidence: number
  aiGenerated: string
  humanEdited: string
  feedback?: {
    category: string
    issue: string
    severity: 'low' | 'medium' | 'high'
  }
}

const mockReviewItems: ReviewItem[] = [
  {
    id: 1,
    type: 'contract_clause',
    confidence: 92,
    aiGenerated: `The liability limitation clause states that neither party shall be liable for indirect, incidental, or consequential damages arising from this agreement, with total liability capped at €50,000.`,
    humanEdited: `The liability limitation clause states that neither party shall be liable for indirect, incidental, or consequential damages arising from this agreement, with total liability capped at €50,000. This limitation does not apply to breaches of confidentiality or data protection obligations.`,
    feedback: {
      category: 'Missing Context',
      issue: 'Failed to mention exceptions to liability cap',
      severity: 'medium'
    }
  },
  {
    id: 2,
    type: 'customer_response',
    confidence: 78,
    aiGenerated: `To open an account with our partner bank in Germany, you will need: 1) Valid passport or ID, 2) Proof of address, 3) Tax identification number.`,
    humanEdited: `To open an account with our partner bank in Germany, you will need: 1) Valid passport or EU ID card, 2) Proof of address (not older than 3 months), 3) Tax identification number (TIN), 4) For non-EU residents: proof of legal residence status.`,
    feedback: {
      category: 'Incomplete Information',
      issue: 'Missing requirements for non-EU residents',
      severity: 'high'
    }
  },
  {
    id: 3,
    type: 'compliance_brief',
    confidence: 95,
    aiGenerated: `MiFID II requires enhanced disclosure of costs and charges to retail clients, including all explicit and implicit costs associated with investment products.`,
    humanEdited: `MiFID II requires enhanced disclosure of costs and charges to retail clients, including all explicit and implicit costs associated with investment products.`,
    feedback: undefined
  }
]

export default function QualityLoopPage() {
  const [currentItemIndex, setCurrentItemIndex] = useState(0)
  const [feedbackCategory, setFeedbackCategory] = useState('')
  const [feedbackIssue, setFeedbackIssue] = useState('')
  const [feedbackSeverity, setFeedbackSeverity] = useState<'low' | 'medium' | 'high'>('medium')

  const currentItem = mockReviewItems[currentItemIndex]
  const progressPercentage = ((currentItemIndex + 1) / mockReviewItems.length) * 100

  const handleApprove = () => {
    if (currentItemIndex < mockReviewItems.length - 1) {
      setCurrentItemIndex(currentItemIndex + 1)
      resetFeedback()
    }
  }

  const handleFlag = () => {
    // Save feedback and move to next
    console.log('Flagged with feedback:', { feedbackCategory, feedbackIssue, feedbackSeverity })
    if (currentItemIndex < mockReviewItems.length - 1) {
      setCurrentItemIndex(currentItemIndex + 1)
      resetFeedback()
    }
  }

  const resetFeedback = () => {
    setFeedbackCategory('')
    setFeedbackIssue('')
    setFeedbackSeverity('medium')
  }

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return 'text-green-600 bg-green-100'
    if (confidence >= 70) return 'text-amber-600 bg-amber-100'
    return 'text-red-600 bg-red-100'
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
              <h1 className="text-xl font-semibold">Quality Loop</h1>
            </div>

            <div className="flex items-center gap-4">
              {/* Progress Bar */}
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-600">Review Progress</span>
                <div className="w-48 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPercentage}%` }}
                    className="h-full bg-primary"
                  />
                </div>
                <span className="text-sm font-medium">
                  {currentItemIndex + 1} / {mockReviewItems.length}
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="p-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-4 rounded-lg shadow-sm border border-gray-200"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Reviews Today</p>
                <p className="text-2xl font-bold">23</p>
              </div>
              <Users className="w-8 h-8 text-blue-500" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white p-4 rounded-lg shadow-sm border border-gray-200"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg Confidence</p>
                <p className="text-2xl font-bold">88.5%</p>
              </div>
              <BarChart3 className="w-8 h-8 text-green-500" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white p-4 rounded-lg shadow-sm border border-gray-200"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Patterns Detected</p>
                <p className="text-2xl font-bold">7</p>
              </div>
              <TrendingUp className="w-8 h-8 text-purple-500" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white p-4 rounded-lg shadow-sm border border-gray-200"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Approval Rate</p>
                <p className="text-2xl font-bold">76%</p>
              </div>
              <CheckCircle className="w-8 h-8 text-emerald-500" />
            </div>
          </motion.div>
        </div>

        {/* Review Interface */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* AI Generated Content */}
          <motion.div
            key={`ai-${currentItemIndex}`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">AI Generated</h2>
              <div className={cn(
                "px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2",
                getConfidenceColor(currentItem.confidence)
              )}>
                <div className="relative w-16 h-2 bg-gray-200 rounded-full">
                  <div
                    className="absolute top-0 left-0 h-full bg-current rounded-full"
                    style={{ width: `${currentItem.confidence}%` }}
                  />
                </div>
                {currentItem.confidence}%
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <span className="text-xs text-gray-500 uppercase font-medium">
                Type: {currentItem.type.replace(/_/g, ' ')}
              </span>
            </div>

            <div className="prose prose-sm max-w-none">
              <p className="text-gray-700 leading-relaxed">{currentItem.aiGenerated}</p>
            </div>

            {currentItem.feedback && (
              <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-600 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-amber-800">
                      Previous Feedback: {currentItem.feedback.category}
                    </p>
                    <p className="text-sm text-amber-700 mt-1">
                      {currentItem.feedback.issue}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </motion.div>

          {/* Human Edited Version */}
          <motion.div
            key={`human-${currentItemIndex}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Human Edited</h2>
              <span className="text-sm text-gray-500">Reference Version</span>
            </div>

            <div className="bg-green-50 rounded-lg p-4 mb-4">
              <span className="text-xs text-green-700 uppercase font-medium">
                Verified & Approved
              </span>
            </div>

            <div className="prose prose-sm max-w-none">
              <p className="text-gray-700 leading-relaxed">{currentItem.humanEdited}</p>
            </div>

            {/* Highlight differences */}
            {currentItem.aiGenerated !== currentItem.humanEdited && (
              <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-700">
                  <strong>Key Differences:</strong> The human version includes additional
                  clarifications and context not present in the AI-generated content.
                </p>
              </div>
            )}
          </motion.div>
        </div>

        {/* Feedback Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 bg-white rounded-xl shadow-sm border border-gray-200 p-6"
        >
          <h3 className="text-lg font-semibold mb-4">Provide Feedback</h3>

          <div className="grid lg:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                value={feedbackCategory}
                onChange={(e) => setFeedbackCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">Select category...</option>
                <option value="missing_context">Missing Context</option>
                <option value="incorrect_info">Incorrect Information</option>
                <option value="incomplete">Incomplete Response</option>
                <option value="formatting">Formatting Issue</option>
                <option value="tone">Tone/Style Issue</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Severity
              </label>
              <div className="flex gap-2">
                {(['low', 'medium', 'high'] as const).map((level) => (
                  <button
                    key={level}
                    onClick={() => setFeedbackSeverity(level)}
                    className={cn(
                      "flex-1 py-2 rounded-lg border transition-all capitalize",
                      feedbackSeverity === level
                        ? level === 'high'
                          ? 'bg-red-100 border-red-300 text-red-700'
                          : level === 'medium'
                          ? 'bg-amber-100 border-amber-300 text-amber-700'
                          : 'bg-green-100 border-green-300 text-green-700'
                        : 'bg-white border-gray-300 text-gray-600 hover:border-gray-400'
                    )}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Pattern Detection
              </label>
              <div className="flex items-center gap-2 px-3 py-2 bg-purple-50 border border-purple-200 rounded-lg">
                <TrendingUp className="w-4 h-4 text-purple-600" />
                <span className="text-sm text-purple-700">
                  Similar issue found 3 times today
                </span>
              </div>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Issue Description
            </label>
            <textarea
              value={feedbackIssue}
              onChange={(e) => setFeedbackIssue(e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Describe the issue or improvement needed..."
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={handleApprove}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <ThumbsUp className="w-4 h-4" />
              Approve
            </button>
            <button
              onClick={handleFlag}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
            >
              <AlertTriangle className="w-4 h-4" />
              Flag with Feedback
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
              <Save className="w-4 h-4" />
              Save for Later
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}