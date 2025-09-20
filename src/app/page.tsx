'use client'

import { motion } from 'framer-motion'
import {
  ArrowRight,
  Globe,
  Shield,
  Zap,
  BarChart3,
  FileCheck,
  Users,
  Clock,
  CheckCircle
} from 'lucide-react'
import Link from 'next/link'
import { ROICalculator } from '@/components/shared/ROICalculator'
import { RAISIN_STATS } from '@/lib/raisin-constants'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <section className="px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl lg:text-7xl">
              AI-Powered{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-indigo-700">
                Legal Operations
              </span>
              <br />
              for Global Fintech
            </h1>

            <p className="mt-6 text-xl leading-8 text-gray-600 max-w-3xl mx-auto">
              Transform your legal workflows with intelligent automation. Process {RAISIN_STATS.documentsPerDay}+
              documents daily across {RAISIN_STATS.markets} markets, {RAISIN_STATS.banks}+ partner banks,
              and {RAISIN_STATS.complianceRegimes}+ regulatory frameworks.
            </p>

            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/executive-summary"
                className="rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-4 text-lg font-semibold text-white shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 flex items-center gap-2"
              >
                View Executive Summary
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/dashboard"
                className="rounded-lg bg-white border-2 border-primary px-6 py-3 text-lg font-semibold text-primary shadow-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
              >
                Enter Demo
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-20 grid grid-cols-2 gap-8 sm:grid-cols-4"
          >
            {[
              { label: 'Partner Banks', value: `${RAISIN_STATS.banks}+`, icon: <Users /> },
              { label: 'Markets', value: RAISIN_STATS.markets, icon: <Globe /> },
              { label: 'Accuracy', value: '96.8%', icon: <CheckCircle /> },
              { label: 'Processing Time', value: '< 5 min', icon: <Clock /> }
            ].map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="flex justify-center mb-2 text-primary">{stat.icon}</div>
                <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Problem Statement */}
      <section className="px-6 py-16 lg:px-8 bg-white">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              The Challenge: Legal Complexity at Scale
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Multi-Jurisdiction Compliance',
                description: 'Navigate 30+ regulatory frameworks across 10 markets with constantly changing requirements',
                icon: <Shield className="w-8 h-8" />
              },
              {
                title: 'Document Volume',
                description: 'Process thousands of contracts, agreements, and regulatory filings in 12+ languages daily',
                icon: <FileCheck className="w-8 h-8" />
              },
              {
                title: 'Time-Critical Decisions',
                description: 'Respond to customer queries and compliance updates within tight SLA windows',
                icon: <Zap className="w-8 h-8" />
              }
            ].map((challenge, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-gray-50 p-8 rounded-xl"
              >
                <div className="text-primary mb-4">{challenge.icon}</div>
                <h3 className="text-xl font-semibold mb-3">{challenge.title}</h3>
                <p className="text-gray-600">{challenge.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Intelligent Legal Command Center
            </h2>
            <p className="mt-4 text-xl text-gray-600">
              Four core AI modules working in concert
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12">
            {[
              {
                title: 'Compliance Radar',
                description: 'Real-time monitoring of regulatory changes across all jurisdictions',
                features: ['Automated alerts', 'Impact assessment', 'Compliance briefs'],
                link: '/compliance-radar'
              },
              {
                title: 'Contract Intelligence',
                description: 'AI-powered contract analysis and risk detection',
                features: ['Clause extraction', 'Risk flagging', 'Multi-language support'],
                link: '/contract-intel'
              },
              {
                title: 'Customer Query Assistant',
                description: 'Intelligent routing and response generation for customer inquiries',
                features: ['98% accuracy', 'Multi-channel', 'Context-aware'],
                link: '/legal-assistant'
              },
              {
                title: 'Quality Loop',
                description: 'Human-in-the-loop review and continuous improvement',
                features: ['Side-by-side review', 'Feedback capture', 'Model retraining'],
                link: '/quality-loop'
              }
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="relative bg-white p-8 rounded-xl shadow-lg border border-gray-200 hover:border-primary transition-colors group"
              >
                <h3 className="text-2xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-600 mb-4">{feature.description}</p>
                <ul className="space-y-2 mb-6">
                  {feature.features.map((item, i) => (
                    <li key={i} className="flex items-center text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Link
                  href={feature.link}
                  className="inline-flex items-center text-primary font-semibold group-hover:gap-3 transition-all"
                >
                  Explore
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ROI Calculator Section */}
      <section className="px-6 py-16 lg:px-8 bg-white">
        <div className="mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-6">
                Calculate Your ROI
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                See how much you can save by automating your legal operations with Raisin AI.
              </p>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <BarChart3 className="w-6 h-6 text-primary" />
                  <span className="text-gray-700">Reduce processing time by 90%</span>
                </div>
                <div className="flex items-center gap-3">
                  <Shield className="w-6 h-6 text-primary" />
                  <span className="text-gray-700">Increase compliance accuracy to 96.8%</span>
                </div>
                <div className="flex items-center gap-3">
                  <Zap className="w-6 h-6 text-primary" />
                  <span className="text-gray-700">Scale operations without adding headcount</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <ROICalculator />
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-24 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-4xl text-center"
        >
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-6">
            Ready to Transform Your Legal Operations?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join {RAISIN_STATS.banks}+ banks already using Raisin AI to streamline compliance and legal workflows.
          </p>
          <Link
            href="/dashboard"
            className="inline-flex items-center rounded-lg bg-gradient-to-r from-primary to-indigo-700 px-8 py-4 text-lg font-semibold text-white shadow-lg hover:shadow-xl transition-shadow"
          >
            Explore the Demo
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </motion.div>
      </section>
    </div>
  )
}