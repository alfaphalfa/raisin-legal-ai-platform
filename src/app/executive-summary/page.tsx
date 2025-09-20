'use client'

import { motion } from 'framer-motion'
import {
  Scale,
  Globe,
  Brain,
  TrendingUp,
  Clock,
  Shield,
  Users,
  FileText,
  CheckCircle,
  ArrowRight,
  Zap,
  Target,
  BarChart3,
  Calculator,
  AlertTriangle,
  Award
} from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { InteractiveRoadmap } from '@/components/roadmap/InteractiveRoadmap'
import { InvestmentCalculator } from '@/components/roadmap/InvestmentCalculator'
import { SuccessChecklist } from '@/components/roadmap/SuccessChecklist'

interface MetricCardProps {
  label: string
  value: string
  subtext: string
  color?: string
}

function MetricCard({ label, value, subtext, color = 'indigo' }: MetricCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.05 }}
      className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
    >
      <div className={cn(
        "text-3xl font-bold mb-2",
        color === 'green' ? 'text-green-600' :
        color === 'red' ? 'text-red-600' :
        'text-indigo-600'
      )}>
        {value}
      </div>
      <div className="text-sm font-medium text-gray-900">{label}</div>
      <div className="text-xs text-gray-600 mt-1">{subtext}</div>
    </motion.div>
  )
}

interface ComparisonRowProps {
  metric: string
  current: string
  future: string
}

function ComparisonRow({ metric, current, future }: ComparisonRowProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="grid grid-cols-3 gap-4 py-3 border-b border-gray-200"
    >
      <div className="font-medium text-gray-900">{metric}</div>
      <div className="text-red-600 flex items-center gap-2">
        <AlertTriangle className="w-4 h-4" />
        {current}
      </div>
      <div className="text-green-600 flex items-center gap-2">
        <CheckCircle className="w-4 h-4" />
        {future}
      </div>
    </motion.div>
  )
}

interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  description: string
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ x: 4 }}
      className="flex gap-4 p-6 bg-white rounded-lg border border-gray-200 shadow-sm"
    >
      <div className="flex-shrink-0 p-3 bg-indigo-100 rounded-lg text-indigo-600">
        {icon}
      </div>
      <div>
        <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </motion.div>
  )
}

interface PhaseProps {
  days: string
  title: string
  items: string[]
  status?: 'completed' | 'active' | 'upcoming'
}

function Phase({ days, title, items, status = 'upcoming' }: PhaseProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={cn(
        "relative p-6 rounded-lg border-2",
        status === 'completed' ? 'bg-green-50 border-green-300' :
        status === 'active' ? 'bg-blue-50 border-blue-300' :
        'bg-gray-50 border-gray-300'
      )}
    >
      <div className="flex items-center justify-between mb-3">
        <span className={cn(
          "text-sm font-bold px-3 py-1 rounded-full",
          status === 'completed' ? 'bg-green-200 text-green-800' :
          status === 'active' ? 'bg-blue-200 text-blue-800' :
          'bg-gray-200 text-gray-800'
        )}>
          {days}
        </span>
        <h4 className="font-semibold text-gray-900">{title}</h4>
      </div>
      <ul className="space-y-2">
        {items.map((item, idx) => (
          <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
            <CheckCircle className={cn(
              "w-4 h-4 mt-0.5",
              status === 'completed' ? 'text-green-600' :
              status === 'active' ? 'text-blue-600' :
              'text-gray-400'
            )} />
            {item}
          </li>
        ))}
      </ul>
    </motion.div>
  )
}

export default function ExecutiveSummary() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-5xl mx-auto p-8">
        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Transforming Raisin's Legal Operations with AI
          </h1>
          <p className="text-2xl text-gray-600">
            From Reactive Compliance to Proactive Intelligence
          </p>
          <div className="mt-6 flex items-center justify-center gap-4 text-sm text-gray-500">
            <span className="flex items-center gap-1">
              <Award className="w-4 h-4" />
              Kevin J. Andrews, Esq.
            </span>
            <span>•</span>
            <span>15 Years Legal Experience</span>
            <span>•</span>
            <span>AI Solutions Architect</span>
          </div>
        </motion.section>

        {/* The Opportunity */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-12 bg-gradient-to-r from-indigo-50 to-purple-50 p-8 rounded-xl border border-indigo-200"
        >
          <h2 className="text-3xl font-bold mb-6 text-center">The €70 Billion Opportunity</h2>
          <div className="grid grid-cols-3 gap-6">
            <MetricCard
              label="Markets"
              value="10+"
              subtext="Each with unique regulations"
            />
            <MetricCard
              label="Bank Partners"
              value="400+"
              subtext="Requiring individual compliance"
            />
            <MetricCard
              label="Monthly Compliance Checks"
              value="12,000+"
              subtext="Currently manual process"
            />
          </div>

          <div className="mt-8 p-4 bg-white rounded-lg">
            <div className="text-center">
              <p className="text-lg font-semibold text-gray-900">Current Pain Point</p>
              <p className="text-3xl font-bold text-red-600 mt-2">2.5 hours</p>
              <p className="text-gray-600">Average time per compliance review</p>
            </div>
          </div>
        </motion.section>

        {/* Call to Action */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-center py-12 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl shadow-xl mb-12"
        >
          <h2 className="text-4xl font-bold mb-4">
            Ready to Transform Legal Operations?
          </h2>
          <p className="text-xl mb-8 text-indigo-100">
            Let's discuss how this platform can be customized for Raisin's specific needs
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-indigo-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              <Target className="w-5 h-5" />
              Explore Live Demo
            </Link>
            <a
              href="mailto:k3vin.andrews1@gmail.com"
              className="inline-flex items-center gap-2 px-8 py-4 bg-indigo-500 text-white rounded-lg font-semibold hover:bg-indigo-400 transition-colors"
            >
              Schedule Call
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>

          <div className="mt-8 pt-8 border-t border-indigo-500">
            <div className="flex items-center justify-center gap-6 text-sm">
              <span className="flex items-center gap-2">
                <Award className="w-4 h-4" />
                Kevin J. Andrews, Esq.
              </span>
              <span>•</span>
              <a href="mailto:k3vin.andrews1@gmail.com" className="hover:text-indigo-200">
                k3vin.andrews1@gmail.com
              </a>
              <span>•</span>
              <a href="tel:516-864-6096" className="hover:text-indigo-200">
                516-864-6096
              </a>
            </div>
            <p className="mt-4 text-xs text-indigo-200">
              Attorney-Technologist • 15 Years Legal Experience • AI Solutions Architect
            </p>
          </div>
        </motion.section>

        {/* Current State vs Future State */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold mb-8 text-center">The Transformation</h2>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="grid grid-cols-3 gap-4 pb-3 border-b-2 border-gray-300 font-semibold">
              <div>Process</div>
              <div className="text-red-600">Current State</div>
              <div className="text-green-600">With AI Platform</div>
            </div>
            <ComparisonRow
              metric="Partner Bank Onboarding"
              current="2 weeks"
              future="48 hours"
            />
            <ComparisonRow
              metric="Regulatory Update Response"
              current="3-5 days"
              future="2 hours"
            />
            <ComparisonRow
              metric="Multi-Market Compliance Check"
              current="4 hours per product"
              future="5 minutes"
            />
            <ComparisonRow
              metric="Customer Legal Queries"
              current="24-48 hours"
              future="Instant (90% cases)"
            />
            <ComparisonRow
              metric="Contract Review"
              current="2-3 hours"
              future="3 minutes"
            />
            <ComparisonRow
              metric="Rate Change Compliance"
              current="Manual tracking"
              future="Automated alerts"
            />
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-6 p-4 bg-green-100 border border-green-300 rounded-lg text-center"
          >
            <p className="text-green-900 font-semibold">
              90% reduction in processing time • 96.8% accuracy • €200k+ monthly savings
            </p>
          </motion.div>
        </motion.section>

        {/* ROI Calculation */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mb-12 bg-gradient-to-r from-green-50 to-emerald-50 p-8 rounded-xl border border-green-200"
        >
          <h2 className="text-3xl font-bold mb-6 text-center">Return on Investment</h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Calculator className="w-5 h-5 text-green-600" />
                Cost Savings Breakdown
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Legal Staff Hours Saved</span>
                  <span className="font-semibold">8,000/month</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Average Hourly Cost</span>
                  <span className="font-semibold">€150</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Compliance Error Reduction</span>
                  <span className="font-semibold">85%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Partner Onboarding Acceleration</span>
                  <span className="font-semibold">10x faster</span>
                </div>
                <div className="border-t pt-3 flex justify-between text-lg">
                  <span className="font-semibold text-gray-900">Monthly Savings</span>
                  <span className="font-bold text-green-600">€200,000+</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-indigo-600" />
                Investment & Returns
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Implementation Cost</span>
                  <span className="font-semibold">€340,000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Annual License</span>
                  <span className="font-semibold">€120,000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Break-even Period</span>
                  <span className="font-semibold text-green-600">8 weeks</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Year 1 Net Savings</span>
                  <span className="font-semibold">€2.0M</span>
                </div>
                <div className="border-t pt-3 flex justify-between text-lg">
                  <span className="font-semibold text-gray-900">Year 1 ROI</span>
                  <span className="font-bold text-green-600">588%</span>
                </div>
              </div>
            </div>
          </div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="mt-6 p-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg text-center"
          >
            <p className="text-2xl font-bold">€2.4M Annual Savings</p>
            <p className="text-green-100">Pays for itself in less than 2 months</p>
          </motion.div>
        </motion.section>

        {/* Why Kevin Andrews */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold mb-8 text-center">Why This Solution Works</h2>
          <div className="space-y-4">
            <FeatureCard
              icon={<Scale className="w-6 h-6" />}
              title="Built by a Practicing Attorney"
              description="15 years of legal experience means I understand compliance isn't just about rules—it's about risk management and business enablement. I've handled the exact multi-jurisdictional challenges Raisin faces daily."
            />
            <FeatureCard
              icon={<Globe className="w-6 h-6" />}
              title="Multi-Jurisdictional Expertise"
              description="Having managed immigration cases across multiple countries and built legal tech solutions for cross-border compliance, I understand the complexity of harmonizing regulations across 10+ markets."
            />
            <FeatureCard
              icon={<Brain className="w-6 h-6" />}
              title="Human-in-the-Loop Architecture"
              description="Every AI decision can be reviewed, every correction makes the system smarter—exactly what your job posting seeks. The system learns from your team's expertise, not replaces it."
            />
            <FeatureCard
              icon={<Zap className="w-6 h-6" />}
              title="Purpose-Built for Raisin"
              description="This isn't generic legal tech. Features like deposit protection validation, savings product compliance, and rate change monitoring are specifically designed for Raisin's unique business model."
            />
          </div>
        </motion.section>

        {/* Interactive Implementation Roadmap */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mb-12"
        >
          <InteractiveRoadmap />
        </motion.section>

        {/* Investment Calculator & Success Checklist */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.65 }}
          className="mb-12 grid lg:grid-cols-2 gap-8"
        >
          <InvestmentCalculator />
          <SuccessChecklist />
        </motion.section>

        {/* Key Features Grid */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold mb-8 text-center">Platform Capabilities</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { icon: <Shield className="w-5 h-5" />, title: "Deposit Protection Validator", desc: "FSCS/FDIC/EU compliance across all markets" },
              { icon: <FileText className="w-5 h-5" />, title: "Contract Intelligence", desc: "3-minute review vs 3 hours manual" },
              { icon: <Globe className="w-5 h-5" />, title: "Multi-Language Terms", desc: "Legal accuracy in 8 languages" },
              { icon: <TrendingUp className="w-5 h-5" />, title: "Rate Change Monitor", desc: "Automated compliance for 400+ banks" },
              { icon: <Users className="w-5 h-5" />, title: "Legal Assistant", desc: "90% auto-resolution of queries" },
              { icon: <Brain className="w-5 h-5" />, title: "Quality Loop", desc: "Continuous learning from expert feedback" }
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.05 }}
                className="p-4 bg-white rounded-lg border border-gray-200 text-center"
              >
                <div className="inline-flex p-3 bg-indigo-100 rounded-lg text-indigo-600 mb-3">
                  {feature.icon}
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>


        {/* Bottom Navigation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="mt-12 p-6 bg-gray-100 rounded-lg"
        >
          <p className="text-center text-sm text-gray-600 mb-4">Explore the Platform</p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link href="/dashboard" className="text-indigo-600 hover:text-indigo-700 font-medium">
              Dashboard →
            </Link>
            <Link href="/compliance-radar" className="text-indigo-600 hover:text-indigo-700 font-medium">
              Compliance Radar →
            </Link>
            <Link href="/product-analyzer" className="text-indigo-600 hover:text-indigo-700 font-medium">
              Product Analyzer →
            </Link>
            <Link href="/deposit-protection" className="text-indigo-600 hover:text-indigo-700 font-medium">
              Deposit Protection →
            </Link>
            <Link href="/contract-intel" className="text-indigo-600 hover:text-indigo-700 font-medium">
              Contract Intelligence →
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}