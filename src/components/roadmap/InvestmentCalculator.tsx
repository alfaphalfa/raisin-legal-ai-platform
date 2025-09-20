'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Calculator,
  Euro,
  TrendingUp,
  Users,
  Clock,
  Server,
  GraduationCap,
  Headphones,
  CheckCircle
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface CostBreakdown {
  category: string
  icon: React.ReactNode
  amount: number
  description: string
  details: string[]
}

export function InvestmentCalculator() {
  const [selectedOption, setSelectedOption] = useState<'pilot' | 'full' | 'ongoing'>('full')
  const [showDetails, setShowDetails] = useState(false)

  const options = {
    pilot: {
      title: 'Pilot Program',
      duration: '6 weeks',
      total: 65000,
      monthly: 0,
      breakdown: [
        {
          category: 'Development & Setup',
          icon: <Server className="w-5 h-5" />,
          amount: 35000,
          description: 'Core platform deployment',
          details: [
            'Compliance Radar for 3 markets',
            'API integration setup',
            'Security configuration',
            'Data migration scripts'
          ]
        },
        {
          category: 'Customization',
          icon: <Users className="w-5 h-5" />,
          amount: 15000,
          description: 'Raisin-specific features',
          details: [
            'Custom compliance rules',
            'Partner bank templates',
            'Workflow automation',
            'Dashboard configuration'
          ]
        },
        {
          category: 'Training & Support',
          icon: <GraduationCap className="w-5 h-5" />,
          amount: 10000,
          description: 'Team enablement',
          details: [
            '40 hours of training',
            'Documentation package',
            'Admin certification',
            'Quick-start guides'
          ]
        },
        {
          category: 'Project Management',
          icon: <Clock className="w-5 h-5" />,
          amount: 5000,
          description: 'Delivery coordination',
          details: [
            'Dedicated project manager',
            'Weekly status updates',
            'Risk management',
            'Stakeholder communication'
          ]
        }
      ]
    },
    full: {
      title: 'Full Implementation',
      duration: '4 months',
      total: 340000,
      monthly: 10000,
      breakdown: [
        {
          category: 'Complete Platform Build',
          icon: <Server className="w-5 h-5" />,
          amount: 180000,
          description: 'All 6 AI modules',
          details: [
            'Compliance Radar (10 markets)',
            'Contract Intelligence',
            'Legal Assistant AI',
            'Quality Loop System',
            'Rate Change Monitor',
            'Deposit Protection Validator'
          ]
        },
        {
          category: 'Integration & Migration',
          icon: <Users className="w-5 h-5" />,
          amount: 60000,
          description: 'Seamless system connection',
          details: [
            'CRM integration',
            'Document management sync',
            'Partner portal APIs',
            'Historical data migration',
            'Workflow automation'
          ]
        },
        {
          category: 'Training & Change Management',
          icon: <GraduationCap className="w-5 h-5" />,
          amount: 50000,
          description: 'Comprehensive enablement',
          details: [
            '120 hours of training',
            'Role-based certifications',
            'Change management program',
            'Champion network setup',
            'Success metrics tracking'
          ]
        },
        {
          category: '90-Day Support',
          icon: <Headphones className="w-5 h-5" />,
          amount: 50000,
          description: 'Dedicated support team',
          details: [
            '24/7 priority support',
            'Weekly optimization reviews',
            'Model fine-tuning',
            'Performance monitoring',
            'Escalation management'
          ]
        }
      ]
    },
    ongoing: {
      title: 'Ongoing Partnership',
      duration: 'Monthly',
      total: 0,
      monthly: 22000,
      breakdown: [
        {
          category: 'Platform Maintenance',
          icon: <Server className="w-5 h-5" />,
          amount: 8000,
          description: 'System optimization',
          details: [
            'Regular updates & patches',
            'Performance optimization',
            'Security monitoring',
            'Backup management'
          ]
        },
        {
          category: 'AI Model Enhancement',
          icon: <TrendingUp className="w-5 h-5" />,
          amount: 7000,
          description: 'Continuous improvement',
          details: [
            'Weekly model retraining',
            'Accuracy improvements',
            'New regulation updates',
            'Language model updates'
          ]
        },
        {
          category: 'Dedicated Support',
          icon: <Headphones className="w-5 h-5" />,
          amount: 5000,
          description: 'Priority assistance',
          details: [
            '24/7 support access',
            'Dedicated account manager',
            'Monthly reviews',
            'Custom feature requests'
          ]
        },
        {
          category: 'Innovation Credits',
          icon: <Calculator className="w-5 h-5" />,
          amount: 2000,
          description: 'Future enhancements',
          details: [
            'New feature development',
            'Custom integrations',
            'Advanced analytics',
            'R&D collaboration'
          ]
        }
      ]
    }
  }

  const currentOption = options[selectedOption]

  const calculateROI = () => {
    const monthlySavings = 200000
    const investment = currentOption.total || currentOption.monthly * 12
    const yearOneSavings = monthlySavings * (selectedOption === 'pilot' ? 10 : 12)
    const roi = ((yearOneSavings - investment) / investment * 100).toFixed(0)
    const paybackMonths = (investment / monthlySavings).toFixed(1)

    return { roi, paybackMonths, yearOneSavings }
  }

  const { roi, paybackMonths, yearOneSavings } = calculateROI()

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <Calculator className="w-6 h-6 text-indigo-600" />
          Investment Calculator
        </h3>
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="text-sm text-indigo-600 hover:text-indigo-700 font-medium"
        >
          {showDetails ? 'Hide' : 'Show'} Cost Breakdown
        </button>
      </div>

      {/* Option Selector */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {(['pilot', 'full', 'ongoing'] as const).map((option) => (
          <button
            key={option}
            onClick={() => setSelectedOption(option)}
            className={cn(
              "p-4 rounded-lg border-2 transition-all",
              selectedOption === option
                ? 'border-indigo-500 bg-indigo-50'
                : 'border-gray-200 hover:border-gray-300'
            )}
          >
            <div className="text-sm font-medium text-gray-900">
              {options[option].title}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {options[option].duration}
            </div>
            <div className="text-lg font-bold text-indigo-600 mt-2">
              {options[option].total > 0
                ? `€${options[option].total.toLocaleString()}`
                : `€${options[option].monthly.toLocaleString()}/mo`
              }
            </div>
          </button>
        ))}
      </div>

      {/* Cost Breakdown */}
      {showDetails && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="mb-6 space-y-3"
        >
          {currentOption.breakdown.map((item: CostBreakdown, index: number) => (
            <div key={index} className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="text-indigo-600">
                    {item.icon}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{item.category}</div>
                    <div className="text-sm text-gray-600">{item.description}</div>
                  </div>
                </div>
                <div className="text-lg font-bold text-gray-900">
                  €{item.amount.toLocaleString()}
                  {selectedOption === 'ongoing' && '/mo'}
                </div>
              </div>
              <div className="ml-8 mt-2">
                <ul className="text-xs space-y-1">
                  {item.details.map((detail, i) => (
                    <li key={i} className="flex items-start gap-1 text-gray-600">
                      <CheckCircle className="w-3 h-3 text-green-500 mt-0.5" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </motion.div>
      )}

      {/* ROI Metrics */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4 border border-green-200">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-green-600">
              {roi}%
            </div>
            <div className="text-xs text-gray-600">Year 1 ROI</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-indigo-600">
              {paybackMonths}
            </div>
            <div className="text-xs text-gray-600">Months to Break-even</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-purple-600">
              €{(yearOneSavings / 1000).toFixed(0)}K
            </div>
            <div className="text-xs text-gray-600">Year 1 Savings</div>
          </div>
        </div>
      </div>

      {/* Key Benefits */}
      <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
        <div className="text-sm text-blue-900">
          <strong>Key Benefit:</strong>{' '}
          {selectedOption === 'pilot'
            ? 'Prove value with minimal risk before scaling'
            : selectedOption === 'full'
            ? 'Complete transformation with maximum ROI'
            : 'Continuous improvement with predictable costs'
          }
        </div>
      </div>
    </div>
  )
}