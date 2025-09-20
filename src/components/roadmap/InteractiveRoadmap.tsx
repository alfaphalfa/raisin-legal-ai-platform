'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ChevronDown,
  CheckCircle,
  Clock,
  Users,
  Euro,
  Shield,
  Globe,
  AlertTriangle,
  Target,
  Zap,
  BarChart3
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface PhaseDetail {
  week: string
  milestone: string
  deliverables: string[]
  metrics: { label: string; value: string }[]
  requiredFromRaisin: string[]
  risk: string
  mitigation: string
}

export function InteractiveRoadmap() {
  const [expandedPhase, setExpandedPhase] = useState<number | null>(1)

  const phaseDetails: Record<number, PhaseDetail[]> = {
    1: [ // Days 0-30 Details
      {
        week: "Week 1-2: Discovery & Architecture",
        milestone: "Complete system audit and integration mapping",
        deliverables: [
          "Current state assessment document",
          "Integration architecture blueprint",
          "Security & compliance review",
          "API mapping for existing systems"
        ],
        metrics: [
          { label: "Systems mapped", value: "100%" },
          { label: "Stakeholders interviewed", value: "15+" },
          { label: "Compliance gaps identified", value: "All" }
        ],
        requiredFromRaisin: [
          "Access to current legal tech stack",
          "2 hours/day from legal team lead",
          "Sample contracts and workflows",
          "Compliance documentation"
        ],
        risk: "Integration complexity higher than expected",
        mitigation: "Week 1 technical deep-dive with phased integration approach"
      },
      {
        week: "Week 3-4: Pilot Deployment",
        milestone: "Launch Compliance Radar for DE, UK, FR markets",
        deliverables: [
          "Working compliance monitoring for 3 markets",
          "Real-time regulatory alert system",
          "Initial AI model training on Raisin data",
          "Team training materials"
        ],
        metrics: [
          { label: "Alerts automated", value: "75%" },
          { label: "Processing time reduction", value: "60%" },
          { label: "Team members trained", value: "8" }
        ],
        requiredFromRaisin: [
          "Historical compliance data",
          "Access to legal team for training",
          "Test environment setup",
          "Partner bank agreements (sample)"
        ],
        risk: "User adoption resistance",
        mitigation: "Champion program with early adopters + quick wins focus"
      }
    ],
    2: [ // Days 31-60 Details
      {
        week: "Week 5-6: Scale to All Markets",
        milestone: "Deploy across all 10 Raisin markets",
        deliverables: [
          "Complete multi-jurisdiction coverage",
          "Localized compliance rules for each market",
          "Multi-language template system",
          "Automated GDPR/PSD2/MiFID II checking"
        ],
        metrics: [
          { label: "Markets covered", value: "10/10" },
          { label: "Languages supported", value: "8" },
          { label: "Compliance accuracy", value: "96%" }
        ],
        requiredFromRaisin: [
          "Local legal counsel review (each market)",
          "Translation verification",
          "Market-specific test cases",
          "Partner feedback sessions"
        ],
        risk: "Regulatory nuances in new markets",
        mitigation: "Parallel run with manual process for 2 weeks"
      },
      {
        week: "Week 7-8: Contract Intelligence Launch",
        milestone: "Automate partner bank agreement workflow",
        deliverables: [
          "Automated contract analysis engine",
          "Risk scoring algorithm",
          "Clause library (1000+ variants)",
          "Integration with existing CLM"
        ],
        metrics: [
          { label: "Contracts processed", value: "50+" },
          { label: "Average review time", value: "15 min" },
          { label: "Risk flags accuracy", value: "94%" }
        ],
        requiredFromRaisin: [
          "Access to contract repository",
          "Historical risk assessments",
          "Legal team validation (10 hrs)",
          "Preferred clause library"
        ],
        risk: "Complex legacy contracts",
        mitigation: "Manual review option for edge cases + escalation workflow"
      }
    ],
    3: [ // Days 61-90 Details
      {
        week: "Week 9-10: Customer Query Automation",
        milestone: "Launch AI-powered legal help desk",
        deliverables: [
          "Natural language query processor",
          "Multi-language support system",
          "Confidence-based routing logic",
          "Customer-facing API endpoints"
        ],
        metrics: [
          { label: "Queries automated", value: "85%" },
          { label: "Response time", value: "<30 sec" },
          { label: "Customer satisfaction", value: "4.7/5" }
        ],
        requiredFromRaisin: [
          "Historical query database",
          "Customer service integration",
          "Feedback mechanism setup",
          "Escalation process definition"
        ],
        risk: "Incorrect legal advice concerns",
        mitigation: "Conservative confidence thresholds + human review for complex queries"
      },
      {
        week: "Week 11-12: Optimization & Handover",
        milestone: "Achieve 99% accuracy and full automation",
        deliverables: [
          "Fine-tuned AI models",
          "Complete documentation package",
          "Admin dashboard with analytics",
          "30-day support transition plan"
        ],
        metrics: [
          { label: "System accuracy", value: "99.2%" },
          { label: "Monthly savings", value: "€200K" },
          { label: "Team self-sufficiency", value: "100%" }
        ],
        requiredFromRaisin: [
          "Dedicated product owner",
          "Success metrics agreement",
          "Change management support",
          "Executive presentation slot"
        ],
        risk: "Knowledge transfer gaps",
        mitigation: "Comprehensive documentation + recorded training sessions + 30-day support"
      }
    ]
  }

  const phaseColors = {
    1: { bg: 'bg-blue-50', border: 'border-blue-500', text: 'text-blue-600' },
    2: { bg: 'bg-indigo-50', border: 'border-indigo-500', text: 'text-indigo-600' },
    3: { bg: 'bg-purple-50', border: 'border-purple-500', text: 'text-purple-600' }
  }

  return (
    <div className="max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-2 text-center text-gray-900">
        90-Day Implementation Roadmap
      </h2>
      <p className="text-center text-gray-600 mb-8">
        Click each phase to explore detailed milestones, deliverables, and success metrics
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {[
          {
            phase: 1,
            days: "Days 0-30",
            title: "Foundation",
            icon: <Zap className="w-6 h-6" />,
            highlight: "Quick Wins & Pilot"
          },
          {
            phase: 2,
            days: "Days 31-60",
            title: "Expansion",
            icon: <Globe className="w-6 h-6" />,
            highlight: "Scale to All Markets"
          },
          {
            phase: 3,
            days: "Days 61-90",
            title: "Optimization",
            icon: <Target className="w-6 h-6" />,
            highlight: "Full Automation"
          }
        ].map(({ phase, days, title, icon, highlight }) => (
          <motion.button
            key={phase}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setExpandedPhase(expandedPhase === phase ? null : phase)}
            className={cn(
              "p-6 rounded-lg border-2 transition-all relative overflow-hidden",
              expandedPhase === phase
                ? `${phaseColors[phase as keyof typeof phaseColors].border} ${phaseColors[phase as keyof typeof phaseColors].bg}`
                : 'border-gray-200 hover:border-gray-300 bg-white'
            )}
          >
            {expandedPhase === phase && (
              <motion.div
                layoutId="phase-indicator"
                className="absolute top-0 right-0 bg-gradient-to-br from-indigo-500 to-purple-500 text-white text-xs px-2 py-1 rounded-bl-lg"
              >
                ACTIVE
              </motion.div>
            )}

            <div className={cn(
              "flex justify-center mb-3",
              expandedPhase === phase
                ? phaseColors[phase as keyof typeof phaseColors].text
                : 'text-gray-400'
            )}>
              {icon}
            </div>
            <div className="text-sm text-gray-500 mb-1">{days}</div>
            <div className="text-xl font-bold mb-1">{title}</div>
            <div className="text-xs text-gray-600 mb-3">{highlight}</div>
            <div className="flex items-center justify-center text-gray-400">
              <ChevronDown
                className={cn(
                  "transform transition-transform w-5 h-5",
                  expandedPhase === phase ? 'rotate-180' : ''
                )}
              />
            </div>
          </motion.button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {expandedPhase && (
          <motion.div
            key={expandedPhase}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-xl border shadow-sm overflow-hidden"
          >
            <div className="p-6">
              {phaseDetails[expandedPhase].map((detail, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="mb-8 last:mb-0"
                >
                  <div className="mb-6">
                    <div className="flex items-center gap-3 mb-2">
                      <div className={cn(
                        "w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold",
                        expandedPhase === 1 ? 'bg-blue-500' :
                        expandedPhase === 2 ? 'bg-indigo-500' :
                        'bg-purple-500'
                      )}>
                        {index + 1}
                      </div>
                      <h3 className="text-lg font-bold text-gray-900">
                        {detail.week}
                      </h3>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-indigo-600 font-medium ml-11">
                      <Target className="w-4 h-4" />
                      {detail.milestone}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 ml-11">
                    {/* Left Column */}
                    <div className="space-y-5">
                      {/* Deliverables */}
                      <div className="bg-green-50 rounded-lg p-4">
                        <h4 className="font-semibold mb-3 flex items-center text-green-900">
                          <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
                          Deliverables
                        </h4>
                        <ul className="space-y-1.5 text-sm text-gray-700">
                          {detail.deliverables.map((item, i) => (
                            <li key={i} className="flex items-start">
                              <span className="text-green-500 mr-2 mt-1">✓</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Success Metrics */}
                      <div className="bg-blue-50 rounded-lg p-4">
                        <h4 className="font-semibold mb-3 flex items-center text-blue-900">
                          <BarChart3 className="w-4 h-4 mr-2 text-blue-600" />
                          Success Metrics
                        </h4>
                        <div className="grid grid-cols-3 gap-3">
                          {detail.metrics.map((metric, i) => (
                            <div key={i} className="text-center">
                              <div className="text-xl font-bold text-blue-600">
                                {metric.value}
                              </div>
                              <div className="text-xs text-gray-600 mt-1">{metric.label}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-5">
                      {/* Requirements */}
                      <div className="bg-indigo-50 rounded-lg p-4">
                        <h4 className="font-semibold mb-3 flex items-center text-indigo-900">
                          <Users className="w-4 h-4 mr-2 text-indigo-600" />
                          Required from Raisin
                        </h4>
                        <ul className="space-y-1.5 text-sm text-gray-700">
                          {detail.requiredFromRaisin.map((item, i) => (
                            <li key={i} className="flex items-start">
                              <span className="text-indigo-400 mr-2">•</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Risk & Mitigation */}
                      <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
                        <h4 className="font-semibold mb-3 flex items-center text-yellow-900">
                          <AlertTriangle className="w-4 h-4 mr-2 text-yellow-600" />
                          Risk Management
                        </h4>
                        <div className="space-y-2 text-sm">
                          <div>
                            <span className="font-medium text-gray-700">Risk:</span>
                            <p className="text-gray-600 mt-1">{detail.risk}</p>
                          </div>
                          <div>
                            <span className="font-medium text-gray-700">Mitigation:</span>
                            <p className="text-gray-600 mt-1">{detail.mitigation}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {index < phaseDetails[expandedPhase].length - 1 && (
                    <div className="mt-8 border-b border-gray-200" />
                  )}
                </motion.div>
              ))}
            </div>

            {/* Phase Summary */}
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 border-t">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="bg-white rounded-lg p-4">
                  <Euro className="w-6 h-6 mx-auto mb-2 text-indigo-600" />
                  <div className="text-2xl font-bold text-indigo-600">
                    {expandedPhase === 1 ? "€65K" : expandedPhase === 2 ? "€140K" : "€135K"}
                  </div>
                  <div className="text-xs text-gray-500">Investment</div>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <Shield className="w-6 h-6 mx-auto mb-2 text-green-600" />
                  <div className="text-2xl font-bold text-green-600">
                    {expandedPhase === 1 ? "€50K" : expandedPhase === 2 ? "€120K" : "€200K"}
                  </div>
                  <div className="text-xs text-gray-500">Monthly Savings</div>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <Target className="w-6 h-6 mx-auto mb-2 text-purple-600" />
                  <div className="text-2xl font-bold text-purple-600">
                    {expandedPhase === 1 ? "3x" : expandedPhase === 2 ? "5x" : "10x"}
                  </div>
                  <div className="text-xs text-gray-500">ROI Multiple</div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}