'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Upload,
  FileText,
  AlertCircle,
  CheckCircle,
  Clock,
  ArrowLeft,
  Download,
  Eye,
  Flag,
  ChevronRight,
  X,
  Loader2
} from 'lucide-react'
import Link from 'next/link'
import { JurisdictionBadge } from '@/components/shared/JurisdictionBadge'
import { mockContracts, mockJurisdictions } from '@/lib/mock-data'
import { CONTRACT_STATUSES, DOCUMENT_TYPES } from '@/lib/raisin-constants'
import { formatDate, cn } from '@/lib/utils'

export default function ContractIntelPage() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [selectedContract, setSelectedContract] = useState<typeof mockContracts[0] | null>(null)
  const [activeStep, setActiveStep] = useState<'upload' | 'analyze' | 'review'>('upload')
  const [dragActive, setDragActive] = useState(false)

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setUploadedFile(e.dataTransfer.files[0])
      handleAnalyze()
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFile(e.target.files[0])
      handleAnalyze()
    }
  }

  const handleAnalyze = () => {
    setIsAnalyzing(true)
    setActiveStep('analyze')

    // Simulate analysis
    setTimeout(() => {
      setIsAnalyzing(false)
      setActiveStep('review')
      // Use first mock contract as the analyzed result
      setSelectedContract(mockContracts[0])
    }, 3000)
  }

  const renderUploadZone = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-sm border border-gray-200 p-8"
    >
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">
          Upload Contract for Analysis
        </h2>
        <p className="text-gray-600">
          Support for PDF, DOCX, and TXT files up to 50MB
        </p>
      </div>

      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={cn(
          "border-2 border-dashed rounded-lg p-12 text-center transition-all",
          dragActive
            ? "border-primary bg-primary/5"
            : "border-gray-300 hover:border-gray-400"
        )}
      >
        <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <p className="text-lg font-medium text-gray-700 mb-2">
          Drag and drop your contract here
        </p>
        <p className="text-sm text-gray-500 mb-4">or</p>
        <label className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-indigo-700 transition-colors cursor-pointer">
          <FileText className="w-4 h-4" />
          Browse Files
          <input
            type="file"
            className="hidden"
            accept=".pdf,.docx,.txt"
            onChange={handleFileChange}
          />
        </label>
      </div>

      {/* Recent Contracts */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-4">Recent Contracts</h3>
        <div className="space-y-3">
          {mockContracts.map((contract) => (
            <motion.div
              key={contract.id}
              whileHover={{ x: 4 }}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
              onClick={() => {
                setSelectedContract(contract)
                setActiveStep('review')
              }}
            >
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="font-medium text-gray-900">{contract.bank}</p>
                  <p className="text-sm text-gray-500">{contract.type.replace(/_/g, ' ')}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <JurisdictionBadge
                  code={contract.jurisdiction}
                  size="sm"
                  showName={false}
                />
                <span className={cn(
                  "text-xs px-2 py-1 rounded font-medium",
                  CONTRACT_STATUSES[contract.status].color
                )}>
                  {CONTRACT_STATUSES[contract.status].label}
                </span>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )

  const renderAnalyzing = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white rounded-xl shadow-sm border border-gray-200 p-12"
    >
      <div className="text-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          className="inline-block mb-6"
        >
          <Loader2 className="w-16 h-16 text-primary" />
        </motion.div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          Analyzing Contract...
        </h2>
        <div className="max-w-md mx-auto space-y-3">
          {[
            'Extracting text content',
            'Identifying key clauses',
            'Checking compliance requirements',
            'Flagging potential risks'
          ].map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.5 }}
              className="flex items-center gap-3 text-left"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: idx * 0.5 + 0.3 }}
              >
                <CheckCircle className="w-5 h-5 text-green-500" />
              </motion.div>
              <span className="text-gray-700">{step}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )

  const renderReview = () => (
    <div className="grid lg:grid-cols-2 gap-6">
      {/* Original Document View */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Original Document</h2>
          <button className="flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
            <Eye className="w-4 h-4" />
            View Full
          </button>
        </div>

        <div className="bg-gray-50 rounded-lg p-4 h-96 overflow-y-auto">
          <div className="prose prose-sm max-w-none">
            <h3>PARTNERSHIP AGREEMENT</h3>
            <p className="text-gray-600">
              This Partnership Agreement ("Agreement") is entered into as of September 20, 2024,
              between Raisin GmbH ("Raisin") and {selectedContract?.bank} ("Partner Bank").
            </p>
            <h4>1. SCOPE OF SERVICES</h4>
            <p className="text-gray-600">
              Partner Bank agrees to offer deposit products through Raisin's platform...
            </p>
            <h4>7.2 DATA RETENTION</h4>
            <p className="text-gray-600 bg-red-100 p-2 rounded">
              Customer data shall be retained for a period of 10 years following account closure...
            </p>
            <h4>12.1 LIABILITY</h4>
            <p className="text-gray-600 bg-amber-100 p-2 rounded">
              The total liability of either party shall not exceed €50,000...
            </p>
          </div>
        </div>
      </motion.div>

      {/* Analysis Results */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Analysis Results</h2>
          <button className="flex items-center gap-2 px-3 py-1 bg-primary text-white rounded-lg hover:bg-indigo-700 transition-colors">
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>

        {selectedContract && (
          <div className="space-y-4">
            {/* Contract Info */}
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Partner Bank</p>
                  <p className="font-semibold">{selectedContract.bank}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Jurisdiction</p>
                  <JurisdictionBadge
                    code={selectedContract.jurisdiction}
                    name={mockJurisdictions.find(j => j.code === selectedContract.jurisdiction)?.name}
                  />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Document Type</p>
                  <p className="font-semibold">{selectedContract.type.replace(/_/g, ' ')}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Status</p>
                  <span className={cn(
                    "inline-block px-2 py-1 rounded text-xs font-medium",
                    CONTRACT_STATUSES[selectedContract.status].color
                  )}>
                    {CONTRACT_STATUSES[selectedContract.status].label}
                  </span>
                </div>
              </div>
            </div>

            {/* Risk Flags */}
            <div>
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Flag className="w-5 h-5 text-red-500" />
                Risk Flags ({selectedContract.riskFlags.length})
              </h3>
              <div className="space-y-2">
                {selectedContract.riskFlags.length > 0 ? (
                  selectedContract.riskFlags.map((flag, idx) => (
                    <div
                      key={idx}
                      className={cn(
                        "p-3 rounded-lg border",
                        flag.severity === 'high'
                          ? 'bg-red-50 border-red-200'
                          : flag.severity === 'medium'
                          ? 'bg-amber-50 border-amber-200'
                          : 'bg-gray-50 border-gray-200'
                      )}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-medium text-sm">
                            Clause {flag.clause}
                          </p>
                          <p className="text-sm text-gray-600 mt-1">
                            {flag.issue}
                          </p>
                        </div>
                        <span className={cn(
                          "text-xs px-2 py-1 rounded font-medium",
                          flag.severity === 'high'
                            ? 'bg-red-100 text-red-700'
                            : flag.severity === 'medium'
                            ? 'bg-amber-100 text-amber-700'
                            : 'bg-gray-100 text-gray-700'
                        )}>
                          {flag.severity.toUpperCase()}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-green-700 flex items-center gap-2">
                      <CheckCircle className="w-5 h-5" />
                      No compliance risks detected
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Key Clauses */}
            <div>
              <h3 className="font-semibold mb-3">Extracted Key Clauses</h3>
              <div className="space-y-2">
                {[
                  { label: 'Term', value: '3 years, auto-renewal' },
                  { label: 'Termination', value: '90 days notice required' },
                  { label: 'Governing Law', value: 'German Law' },
                  { label: 'Dispute Resolution', value: 'Arbitration in Frankfurt' }
                ].map((clause, idx) => (
                  <div key={idx} className="flex justify-between p-2 bg-gray-50 rounded">
                    <span className="text-sm text-gray-600">{clause.label}</span>
                    <span className="text-sm font-medium">{clause.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Panel */}
            <div className="pt-4 border-t border-gray-200">
              <h3 className="font-semibold mb-3">Actions</h3>
              <div className="flex gap-3">
                <button className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                  Approve
                </button>
                <button className="flex-1 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors">
                  Flag for Review
                </button>
                <button className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                  Escalate
                </button>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  )

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
              <h1 className="text-xl font-semibold">Contract Intelligence</h1>
            </div>

            {/* Step Indicator */}
            <div className="flex items-center gap-4">
              {[
                { id: 'upload', label: 'Upload', icon: <Upload className="w-4 h-4" /> },
                { id: 'analyze', label: 'Analyze', icon: <Loader2 className="w-4 h-4" /> },
                { id: 'review', label: 'Review', icon: <Eye className="w-4 h-4" /> }
              ].map((step, idx) => (
                <div key={step.id} className="flex items-center">
                  <div className={cn(
                    "flex items-center gap-2 px-3 py-1 rounded-lg",
                    activeStep === step.id
                      ? "bg-primary text-white"
                      : "bg-gray-100 text-gray-500"
                  )}>
                    {step.icon}
                    <span className="text-sm font-medium">{step.label}</span>
                  </div>
                  {idx < 2 && <ChevronRight className="w-4 h-4 text-gray-400 mx-2" />}
                </div>
              ))}
            </div>
          </div>
        </div>
      </header>

      <div className="p-6">
        {activeStep === 'upload' && renderUploadZone()}
        {activeStep === 'analyze' && isAnalyzing && renderAnalyzing()}
        {activeStep === 'review' && renderReview()}
      </div>
    </div>
  )
}