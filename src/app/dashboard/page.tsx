'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Activity,
  AlertCircle,
  FileText,
  Clock,
  TrendingUp,
  Users,
  Shield,
  CheckCircle,
  ArrowRight,
  Globe
} from 'lucide-react'
import Link from 'next/link'
import { MetricsCard } from '@/components/shared/MetricsCard'
import { JurisdictionBadge } from '@/components/shared/JurisdictionBadge'
import { mockMetrics, mockActivityFeed, mockJurisdictions, mockAlerts } from '@/lib/mock-data'
import { formatDate } from '@/lib/utils'

export default function DashboardPage() {
  const [selectedJurisdiction, setSelectedJurisdiction] = useState<string | null>(null)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/" className="text-2xl font-bold text-primary">
                Raisin Legal AI
              </Link>
              <span className="text-gray-400">|</span>
              <h1 className="text-xl font-semibold">Command Center</h1>
            </div>

            <nav className="flex items-center gap-4 text-sm">
              <Link
                href="/compliance-radar"
                className="text-gray-600 hover:text-primary transition-colors"
              >
                Compliance
              </Link>
              <Link
                href="/contract-intel"
                className="text-gray-600 hover:text-primary transition-colors"
              >
                Contracts
              </Link>
              <Link
                href="/product-analyzer"
                className="text-gray-600 hover:text-primary transition-colors font-semibold"
              >
                Products
              </Link>
              <Link
                href="/deposit-protection"
                className="text-gray-600 hover:text-primary transition-colors font-semibold"
              >
                Protection
              </Link>
              <Link
                href="/legal-assistant"
                className="text-gray-600 hover:text-primary transition-colors"
              >
                Assistant
              </Link>
              <Link
                href="/quality-loop"
                className="text-gray-600 hover:text-primary transition-colors"
              >
                Quality
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="p-6">
        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricsCard
            title="Documents Processed Today"
            value={mockMetrics.documentsProcessedToday}
            trend="up"
            trendValue="+12%"
            icon={<FileText className="w-5 h-5" />}
          />
          <MetricsCard
            title="Average Processing Time"
            value={`${mockMetrics.averageProcessingTime} min`}
            trend="down"
            trendValue="-18%"
            icon={<Clock className="w-5 h-5" />}
          />
          <MetricsCard
            title="Accuracy Score"
            value={`${mockMetrics.accuracyScore}%`}
            trend="up"
            trendValue="+2.1%"
            icon={<CheckCircle className="w-5 h-5" />}
          />
          <MetricsCard
            title="Active Alerts"
            value={mockMetrics.complianceAlerts}
            trend="neutral"
            trendValue="0"
            icon={<AlertCircle className="w-5 h-5" />}
          />
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Compliance Status Map */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <Globe className="w-5 h-5 text-primary" />
                Compliance Status Map
              </h2>
              <span className="text-sm text-gray-500">
                {mockJurisdictions.length} markets monitored
              </span>
            </div>

            <div className="grid grid-cols-5 gap-3 mb-6">
              {mockJurisdictions.map((jurisdiction) => (
                <motion.button
                  key={jurisdiction.code}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedJurisdiction(jurisdiction.code)}
                  className={`p-3 rounded-lg border transition-all ${
                    selectedJurisdiction === jurisdiction.code
                      ? 'border-primary bg-primary/10'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <JurisdictionBadge
                    code={jurisdiction.code}
                    size="md"
                    showName={false}
                    className="bg-transparent px-0"
                  />
                  <div className="mt-2">
                    <div className="text-xs font-medium">{jurisdiction.code}</div>
                    <div
                      className={`text-xs mt-1 ${
                        jurisdiction.risk === 'high'
                          ? 'text-red-600'
                          : jurisdiction.risk === 'medium'
                          ? 'text-amber-600'
                          : 'text-green-600'
                      }`}
                    >
                      {jurisdiction.risk}
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>

            {selectedJurisdiction && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-gray-50 rounded-lg"
              >
                {(() => {
                  const jurisdiction = mockJurisdictions.find(
                    (j) => j.code === selectedJurisdiction
                  )
                  return (
                    <>
                      <h3 className="font-semibold mb-2">{jurisdiction?.name}</h3>
                      <div className="flex flex-wrap gap-2">
                        {jurisdiction?.regulations.map((reg) => (
                          <span
                            key={reg}
                            className="px-2 py-1 bg-white border border-gray-200 rounded text-xs"
                          >
                            {reg}
                          </span>
                        ))}
                      </div>
                    </>
                  )
                })()}
              </motion.div>
            )}

            {/* Compliance Alerts */}
            <div className="mt-6 space-y-3">
              <h3 className="text-sm font-semibold text-gray-600">Recent Alerts</h3>
              {mockAlerts.slice(0, 3).map((alert) => (
                <div
                  key={alert.id}
                  className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg"
                >
                  <div
                    className={`p-1 rounded ${
                      alert.severity === 'high'
                        ? 'bg-red-100'
                        : alert.severity === 'medium'
                        ? 'bg-amber-100'
                        : 'bg-gray-100'
                    }`}
                  >
                    <AlertCircle
                      className={`w-4 h-4 ${
                        alert.severity === 'high'
                          ? 'text-red-600'
                          : alert.severity === 'medium'
                          ? 'text-amber-600'
                          : 'text-gray-600'
                      }`}
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-medium">{alert.title}</h4>
                    <p className="text-xs text-gray-600 mt-1">{alert.description}</p>
                    <div className="flex items-center gap-4 mt-2">
                      <span className="text-xs text-gray-500">{alert.impact}</span>
                      <span className="text-xs text-gray-400">
                        {formatDate(alert.timestamp)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Metrics & Activity */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <Activity className="w-5 h-5 text-primary" />
                Real-time Activity
              </h2>
              <span className="text-sm text-gray-500">Live</span>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Contracts in Review</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {mockMetrics.contractsInReview}
                    </p>
                  </div>
                  <FileText className="w-8 h-8 text-green-600" />
                </div>
              </div>

              <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Human Reviews</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {mockMetrics.humanReviewsToday}
                    </p>
                  </div>
                  <Users className="w-8 h-8 text-blue-600" />
                </div>
              </div>
            </div>

            {/* Activity Feed */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-gray-600">Activity Feed</h3>
              <div className="max-h-96 overflow-y-auto space-y-3">
                {mockActivityFeed.map((activity) => (
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div
                      className={`p-1 rounded ${
                        activity.type === 'success'
                          ? 'bg-green-100'
                          : activity.type === 'alert'
                          ? 'bg-red-100'
                          : activity.type === 'warning'
                          ? 'bg-amber-100'
                          : 'bg-blue-100'
                      }`}
                    >
                      {activity.type === 'success' ? (
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      ) : activity.type === 'alert' ? (
                        <AlertCircle className="w-4 h-4 text-red-600" />
                      ) : activity.type === 'warning' ? (
                        <Shield className="w-4 h-4 text-amber-600" />
                      ) : (
                        <Activity className="w-4 h-4 text-blue-600" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium">{activity.action}</h4>
                      <p className="text-xs text-gray-600 mt-1">{activity.details}</p>
                      <span className="text-xs text-gray-400 mt-1">
                        {formatDate(activity.timestamp)}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h3 className="text-sm font-semibold text-gray-600 mb-3">Quick Actions</h3>
              <div className="grid grid-cols-2 gap-3">
                <Link
                  href="/contract-intel"
                  className="flex items-center justify-between p-3 bg-primary/10 rounded-lg text-primary hover:bg-primary/20 transition-colors"
                >
                  <span className="text-sm font-medium">Upload Contract</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/compliance-radar"
                  className="flex items-center justify-between p-3 bg-amber-50 rounded-lg text-amber-700 hover:bg-amber-100 transition-colors"
                >
                  <span className="text-sm font-medium">View Alerts</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}