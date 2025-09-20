'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  CheckCircle,
  Circle,
  Trophy,
  Target,
  Flag,
  AlertCircle,
  ChevronRight,
  Calendar,
  Users,
  Shield,
  Zap
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface ChecklistItem {
  id: string
  label: string
  description: string
  phase: 1 | 2 | 3
  category: 'technical' | 'team' | 'business' | 'compliance'
  deadline: string
  owner: string
  dependencies?: string[]
}

export function SuccessChecklist() {
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set())
  const [expandedCategory, setExpandedCategory] = useState<string | null>('technical')

  const checklistItems: ChecklistItem[] = [
    // Phase 1: Foundation (Days 0-30)
    {
      id: 'tech-1',
      label: 'System architecture approved',
      description: 'Integration blueprint reviewed and signed off by CTO',
      phase: 1,
      category: 'technical',
      deadline: 'Day 5',
      owner: 'CTO'
    },
    {
      id: 'tech-2',
      label: 'API access granted',
      description: 'All necessary system credentials and endpoints configured',
      phase: 1,
      category: 'technical',
      deadline: 'Day 3',
      owner: 'IT Team'
    },
    {
      id: 'tech-3',
      label: 'Test environment ready',
      description: 'Staging environment with sample data configured',
      phase: 1,
      category: 'technical',
      deadline: 'Day 7',
      owner: 'DevOps'
    },
    {
      id: 'team-1',
      label: 'Legal team onboarded',
      description: 'Core legal team completed initial training',
      phase: 1,
      category: 'team',
      deadline: 'Day 14',
      owner: 'Head of Legal'
    },
    {
      id: 'team-2',
      label: 'Champions identified',
      description: 'Early adopters selected from each department',
      phase: 1,
      category: 'team',
      deadline: 'Day 10',
      owner: 'HR'
    },
    {
      id: 'business-1',
      label: 'Success metrics defined',
      description: 'KPIs and measurement criteria agreed',
      phase: 1,
      category: 'business',
      deadline: 'Day 2',
      owner: 'COO'
    },
    {
      id: 'compliance-1',
      label: 'First compliance alert automated',
      description: 'Regulatory monitoring live for primary market',
      phase: 1,
      category: 'compliance',
      deadline: 'Day 21',
      owner: 'Compliance Officer',
      dependencies: ['tech-1', 'tech-2']
    },

    // Phase 2: Expansion (Days 31-60)
    {
      id: 'tech-4',
      label: 'All markets integrated',
      description: '10 jurisdictions connected and monitoring',
      phase: 2,
      category: 'technical',
      deadline: 'Day 45',
      owner: 'Tech Lead'
    },
    {
      id: 'team-3',
      label: '50% reduction in review time achieved',
      description: 'Contract review time cut by half',
      phase: 2,
      category: 'team',
      deadline: 'Day 50',
      owner: 'Legal Ops'
    },
    {
      id: 'business-2',
      label: 'First partner onboarded via AI',
      description: 'Complete partner onboarding using new system',
      phase: 2,
      category: 'business',
      deadline: 'Day 40',
      owner: 'Partnerships'
    },
    {
      id: 'compliance-2',
      label: 'Multi-language compliance active',
      description: 'All 8 languages validated and operational',
      phase: 2,
      category: 'compliance',
      deadline: 'Day 55',
      owner: 'Compliance Team'
    },

    // Phase 3: Optimization (Days 61-90)
    {
      id: 'tech-5',
      label: '96% accuracy achieved',
      description: 'AI model performance meets target threshold',
      phase: 3,
      category: 'technical',
      deadline: 'Day 75',
      owner: 'AI Team'
    },
    {
      id: 'team-4',
      label: 'Team fully self-sufficient',
      description: 'Internal team managing system independently',
      phase: 3,
      category: 'team',
      deadline: 'Day 85',
      owner: 'Head of Legal'
    },
    {
      id: 'business-3',
      label: '€200K monthly savings verified',
      description: 'Cost savings targets achieved and documented',
      phase: 3,
      category: 'business',
      deadline: 'Day 90',
      owner: 'CFO'
    },
    {
      id: 'compliance-3',
      label: 'Regulatory audit passed',
      description: 'System approved by compliance auditors',
      phase: 3,
      category: 'compliance',
      deadline: 'Day 88',
      owner: 'Chief Compliance'
    }
  ]

  const categories = [
    {
      id: 'technical',
      label: 'Technical Setup',
      icon: <Shield className="w-5 h-5" />,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      id: 'team',
      label: 'Team Enablement',
      icon: <Users className="w-5 h-5" />,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      id: 'business',
      label: 'Business Metrics',
      icon: <Target className="w-5 h-5" />,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      id: 'compliance',
      label: 'Compliance Goals',
      icon: <Flag className="w-5 h-5" />,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50'
    }
  ]

  const toggleItem = (id: string) => {
    const newChecked = new Set(checkedItems)
    if (newChecked.has(id)) {
      newChecked.delete(id)
    } else {
      newChecked.add(id)
    }
    setCheckedItems(newChecked)
  }

  const getPhaseProgress = (phase: 1 | 2 | 3) => {
    const phaseItems = checklistItems.filter(item => item.phase === phase)
    const checkedPhaseItems = phaseItems.filter(item => checkedItems.has(item.id))
    return {
      completed: checkedPhaseItems.length,
      total: phaseItems.length,
      percentage: Math.round((checkedPhaseItems.length / phaseItems.length) * 100)
    }
  }

  const getCategoryItems = (categoryId: string) => {
    return checklistItems.filter(item => item.category === categoryId)
  }

  const overallProgress = Math.round((checkedItems.size / checklistItems.length) * 100)

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Trophy className="w-6 h-6 text-yellow-500" />
            Success Criteria Checklist
          </h3>
          <div className="text-sm text-gray-600">
            Track implementation milestones
          </div>
        </div>

        {/* Overall Progress */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Overall Progress</span>
            <span className="text-sm font-bold text-indigo-600">{overallProgress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${overallProgress}%` }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="bg-gradient-to-r from-indigo-500 to-purple-500 h-3 rounded-full"
            />
          </div>
        </div>

        {/* Phase Progress */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {[1, 2, 3].map((phase) => {
            const progress = getPhaseProgress(phase as 1 | 2 | 3)
            return (
              <div key={phase} className="text-center">
                <div className="text-xs text-gray-500 mb-1">
                  Phase {phase} (Days {phase === 1 ? '0-30' : phase === 2 ? '31-60' : '61-90'})
                </div>
                <div className="text-2xl font-bold text-gray-900">
                  {progress.completed}/{progress.total}
                </div>
                <div className="text-xs text-gray-600">
                  {progress.percentage}% complete
                </div>
              </div>
            )
          })}
        </div>

        {/* Category Tabs */}
        <div className="grid grid-cols-4 gap-2 mb-6">
          {categories.map((category) => {
            const items = getCategoryItems(category.id)
            const completedCount = items.filter(item => checkedItems.has(item.id)).length
            return (
              <button
                key={category.id}
                onClick={() => setExpandedCategory(
                  expandedCategory === category.id ? null : category.id
                )}
                className={cn(
                  "p-3 rounded-lg border transition-all",
                  expandedCategory === category.id
                    ? `${category.bgColor} border-current`
                    : 'bg-white border-gray-200 hover:border-gray-300'
                )}
              >
                <div className={cn("flex justify-center mb-2", category.color)}>
                  {category.icon}
                </div>
                <div className="text-xs font-medium text-gray-900">{category.label}</div>
                <div className="text-xs text-gray-500 mt-1">
                  {completedCount}/{items.length}
                </div>
              </button>
            )
          })}
        </div>

        {/* Checklist Items */}
        <AnimatePresence mode="wait">
          {expandedCategory && (
            <motion.div
              key={expandedCategory}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-2"
            >
              {getCategoryItems(expandedCategory).map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={cn(
                    "p-4 rounded-lg border transition-all cursor-pointer",
                    checkedItems.has(item.id)
                      ? 'bg-green-50 border-green-300'
                      : 'bg-white border-gray-200 hover:border-gray-300'
                  )}
                  onClick={() => toggleItem(item.id)}
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5">
                      {checkedItems.has(item.id) ? (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      ) : (
                        <Circle className="w-5 h-5 text-gray-400" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <div className={cn(
                          "font-medium",
                          checkedItems.has(item.id) ? 'text-green-900 line-through' : 'text-gray-900'
                        )}>
                          {item.label}
                        </div>
                        <div className="flex items-center gap-2 text-xs">
                          <Calendar className="w-3 h-3 text-gray-400" />
                          <span className="text-gray-500">{item.deadline}</span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-xs">
                          <Users className="w-3 h-3 text-gray-400" />
                          <span className="text-gray-500">Owner: {item.owner}</span>
                        </div>
                        <div className={cn(
                          "text-xs px-2 py-1 rounded-full",
                          item.phase === 1 ? 'bg-blue-100 text-blue-700' :
                          item.phase === 2 ? 'bg-indigo-100 text-indigo-700' :
                          'bg-purple-100 text-purple-700'
                        )}>
                          Phase {item.phase}
                        </div>
                      </div>
                      {item.dependencies && item.dependencies.length > 0 && (
                        <div className="mt-2 pt-2 border-t border-gray-200">
                          <div className="flex items-center gap-1 text-xs text-gray-500">
                            <AlertCircle className="w-3 h-3" />
                            Dependencies: {item.dependencies.join(', ')}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Success Message */}
        {overallProgress === 100 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-6 p-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg text-center"
          >
            <Trophy className="w-8 h-8 mx-auto mb-2" />
            <div className="font-bold text-lg">Implementation Complete!</div>
            <div className="text-sm opacity-90">All success criteria achieved</div>
          </motion.div>
        )}
      </div>
    </div>
  )
}