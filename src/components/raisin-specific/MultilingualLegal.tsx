'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Languages,
  FileText,
  AlertTriangle,
  CheckCircle,
  Globe,
  Shield,
  Copy,
  Download,
  Flag,
  Info,
  Eye,
  ChevronDown,
  ChevronRight,
  Clock
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface TranslatedTerm {
  language: string
  languageCode: string
  flag: string
  translation: string
  complianceNotes: string[]
  jurisdictionRequirements: string[]
  lastReviewed: Date
  reviewedBy: string
  status: 'approved' | 'pending' | 'review_required'
}

interface LegalTerm {
  id: string
  category: 'privacy' | 'terms_conditions' | 'deposit_guarantee' | 'fee_disclosure' | 'withdrawal_terms'
  originalText: string
  translations: TranslatedTerm[]
  criticalTerm: boolean
  lastUpdated: Date
}

interface ConsistencyCheck {
  term: string
  inconsistencies: Array<{
    languages: string[]
    issue: string
    severity: 'high' | 'medium' | 'low'
  }>
}

const languages = [
  { code: 'EN', name: 'English', flag: '🇬🇧' },
  { code: 'DE', name: 'German', flag: '🇩🇪' },
  { code: 'FR', name: 'French', flag: '🇫🇷' },
  { code: 'ES', name: 'Spanish', flag: '🇪🇸' },
  { code: 'IT', name: 'Italian', flag: '🇮🇹' },
  { code: 'NL', name: 'Dutch', flag: '🇳🇱' },
  { code: 'PL', name: 'Polish', flag: '🇵🇱' },
  { code: 'FI', name: 'Finnish', flag: '🇫🇮' }
]

const mockLegalTerms: LegalTerm[] = [
  {
    id: '1',
    category: 'deposit_guarantee',
    originalText: 'Your eligible deposits are protected up to €100,000 per depositor per bank by the relevant European deposit guarantee scheme.',
    criticalTerm: true,
    lastUpdated: new Date('2024-09-01'),
    translations: [
      {
        language: 'English',
        languageCode: 'EN',
        flag: '🇬🇧',
        translation: 'Your eligible deposits are protected up to €100,000 per depositor per bank by the relevant European deposit guarantee scheme.',
        complianceNotes: ['Clear and unambiguous', 'Specifies protection limit', 'References EU scheme'],
        jurisdictionRequirements: ['UK: Must also mention FSCS for UK banks'],
        lastReviewed: new Date('2024-09-01'),
        reviewedBy: 'Legal Team UK',
        status: 'approved'
      },
      {
        language: 'German',
        languageCode: 'DE',
        flag: '🇩🇪',
        translation: 'Ihre Einlagen sind bis zu 100.000 € pro Einleger und Bank durch die jeweilige europäische Einlagensicherung geschützt.',
        complianceNotes: ['BaFin compliant', 'Uses official terminology', 'Clear amount specification'],
        jurisdictionRequirements: ['Must reference Entschädigungseinrichtung deutscher Banken (EdB)'],
        lastReviewed: new Date('2024-09-01'),
        reviewedBy: 'Legal Team DE',
        status: 'approved'
      },
      {
        language: 'French',
        languageCode: 'FR',
        flag: '🇫🇷',
        translation: 'Vos dépôts éligibles sont protégés jusqu\'à 100 000 € par déposant et par banque par le système de garantie des dépôts européen concerné.',
        complianceNotes: ['Complies with Code monétaire', 'Clear legal language', 'Amount in euros'],
        jurisdictionRequirements: ['Must mention FGDR for French banks'],
        lastReviewed: new Date('2024-09-01'),
        reviewedBy: 'Legal Team FR',
        status: 'approved'
      },
      {
        language: 'Spanish',
        languageCode: 'ES',
        flag: '🇪🇸',
        translation: 'Sus depósitos elegibles están protegidos hasta 100.000 € por depositante y banco por el sistema de garantía de depósitos europeo correspondiente.',
        complianceNotes: ['Banco de España approved language', 'Clear and concise'],
        jurisdictionRequirements: ['Reference to Fondo de Garantía de Depósitos required'],
        lastReviewed: new Date('2024-09-01'),
        reviewedBy: 'Legal Team ES',
        status: 'approved'
      }
    ]
  },
  {
    id: '2',
    category: 'withdrawal_terms',
    originalText: 'Fixed term deposits cannot be withdrawn before maturity except in cases of exceptional hardship as defined by applicable law.',
    criticalTerm: true,
    lastUpdated: new Date('2024-09-05'),
    translations: [
      {
        language: 'English',
        languageCode: 'EN',
        flag: '🇬🇧',
        translation: 'Fixed term deposits cannot be withdrawn before maturity except in cases of exceptional hardship as defined by applicable law.',
        complianceNotes: ['Clear conditions', 'References legal exceptions'],
        jurisdictionRequirements: ['UK: FCA requires clear disclosure of penalties'],
        lastReviewed: new Date('2024-09-05'),
        reviewedBy: 'Legal Team UK',
        status: 'approved'
      },
      {
        language: 'German',
        languageCode: 'DE',
        flag: '🇩🇪',
        translation: 'Festgeldanlagen können vor Fälligkeit nicht gekündigt werden, außer in Härtefällen gemäß geltendem Recht.',
        complianceNotes: ['BGB § 314 compliant', 'Härtefallregelung mentioned'],
        jurisdictionRequirements: ['German law requires specific hardship definitions'],
        lastReviewed: new Date('2024-09-05'),
        reviewedBy: 'Legal Team DE',
        status: 'approved'
      }
    ]
  },
  {
    id: '3',
    category: 'privacy',
    originalText: 'We process your personal data in accordance with GDPR and applicable national data protection laws.',
    criticalTerm: false,
    lastUpdated: new Date('2024-09-10'),
    translations: [
      {
        language: 'Polish',
        languageCode: 'PL',
        flag: '🇵🇱',
        translation: 'Przetwarzamy Państwa dane osobowe zgodnie z RODO i obowiązującymi krajowymi przepisami o ochronie danych.',
        complianceNotes: ['UODO compliant', 'References RODO (Polish GDPR term)'],
        jurisdictionRequirements: ['Must reference Polish Data Protection Act'],
        lastReviewed: new Date('2024-09-10'),
        reviewedBy: 'Legal Team PL',
        status: 'pending'
      }
    ]
  }
]

export function MultilingualLegal() {
  const [selectedTerm, setSelectedTerm] = useState<LegalTerm | null>(null)
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>(['EN', 'DE', 'FR'])
  const [showConsistencyCheck, setShowConsistencyCheck] = useState(false)
  const [expandedTerms, setExpandedTerms] = useState<string[]>([])
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedTranslations, setGeneratedTranslations] = useState<TranslatedTerm[]>([])

  const categories = {
    privacy: { label: 'Privacy & Data', icon: <Shield className="w-4 h-4" />, color: 'blue' },
    terms_conditions: { label: 'Terms & Conditions', icon: <FileText className="w-4 h-4" />, color: 'purple' },
    deposit_guarantee: { label: 'Deposit Guarantee', icon: <Shield className="w-4 h-4" />, color: 'green' },
    fee_disclosure: { label: 'Fee Disclosure', icon: <Info className="w-4 h-4" />, color: 'amber' },
    withdrawal_terms: { label: 'Withdrawal Terms', icon: <Clock className="w-4 h-4" />, color: 'red' }
  }

  const toggleLanguage = (code: string) => {
    setSelectedLanguages(prev =>
      prev.includes(code) ? prev.filter(c => c !== code) : [...prev, code]
    )
  }

  const toggleExpanded = (termId: string) => {
    setExpandedTerms(prev =>
      prev.includes(termId) ? prev.filter(id => id !== termId) : [...prev, termId]
    )
  }

  const generateTranslations = (term: LegalTerm) => {
    setIsGenerating(true)
    setSelectedTerm(term)

    setTimeout(() => {
      const newTranslations: TranslatedTerm[] = selectedLanguages
        .filter(lang => !term.translations.some(t => t.languageCode === lang))
        .map(lang => {
          const language = languages.find(l => l.code === lang)!

          // Simulate AI translation with jurisdiction-specific requirements
          let translation = ''
          let jurisdictionRequirements: string[] = []

          switch (lang) {
            case 'IT':
              translation = 'I suoi depositi idonei sono protetti fino a 100.000 € per depositante per banca dal sistema di garanzia dei depositi europeo pertinente.'
              jurisdictionRequirements = ['Must reference FITD for Italian banks', 'Banca d\'Italia compliance required']
              break
            case 'NL':
              translation = 'Uw in aanmerking komende deposito\'s zijn beschermd tot € 100.000 per deposant per bank door het relevante Europese depositogarantiestelsel.'
              jurisdictionRequirements = ['DNB requirements', 'Must mention Dutch DGS']
              break
            case 'FI':
              translation = 'Talletuksesi on suojattu 100 000 euroon asti tallettajaa ja pankkia kohden asiaankuuluvan eurooppalaisen talletussuojajärjestelmän kautta.'
              jurisdictionRequirements = ['Finnish FSA requirements', 'Reference to Talletussuojarahasto']
              break
            default:
              translation = term.originalText
          }

          return {
            language: language.name,
            languageCode: lang,
            flag: language.flag,
            translation,
            complianceNotes: [
              'AI-generated - requires legal review',
              'Terminology aligned with local regulations',
              'Consistent with source text meaning'
            ],
            jurisdictionRequirements,
            lastReviewed: new Date(),
            reviewedBy: 'AI Translation System',
            status: 'pending' as const
          }
        })

      setGeneratedTranslations(newTranslations)
      setIsGenerating(false)
    }, 2000)
  }

  const performConsistencyCheck = () => {
    setShowConsistencyCheck(true)
    // Simulate consistency analysis
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-700'
      case 'pending': return 'bg-amber-100 text-amber-700'
      case 'review_required': return 'bg-red-100 text-red-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const copyTranslation = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const exportTranslations = () => {
    // Simulate export functionality
    const data = {
      terms: mockLegalTerms,
      languages: selectedLanguages,
      exportDate: new Date().toISOString()
    }

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'legal-translations.json'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-6">
      {/* Language Selector */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
      >
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Languages className="w-5 h-5 text-primary" />
          Language Configuration
        </h3>

        <div className="grid grid-cols-8 gap-3 mb-4">
          {languages.map(lang => (
            <button
              key={lang.code}
              onClick={() => toggleLanguage(lang.code)}
              className={cn(
                "p-3 rounded-lg border transition-all text-center",
                selectedLanguages.includes(lang.code)
                  ? "bg-primary text-white border-primary"
                  : "bg-white border-gray-300 hover:border-gray-400"
              )}
            >
              <div className="text-2xl mb-1">{lang.flag}</div>
              <div className="text-xs font-medium">{lang.code}</div>
              <div className="text-xs opacity-75">{lang.name}</div>
            </button>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-600">
            {selectedLanguages.length} languages selected
          </div>
          <div className="flex gap-2">
            <button
              onClick={performConsistencyCheck}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <CheckCircle className="w-4 h-4" />
              Check Consistency
            </button>
            <button
              onClick={exportTranslations}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Export Translations
            </button>
          </div>
        </div>
      </motion.div>

      {/* Legal Terms List */}
      <div className="grid lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
        >
          <h3 className="text-lg font-semibold mb-4">Legal Terms Library</h3>

          <div className="space-y-3 max-h-[600px] overflow-y-auto">
            {mockLegalTerms.map(term => (
              <div
                key={term.id}
                className="border border-gray-200 rounded-lg overflow-hidden"
              >
                <button
                  onClick={() => toggleExpanded(term.id)}
                  className="w-full p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 text-left">
                      <div className={cn(
                        "p-1 rounded",
                        categories[term.category].color === 'blue' ? 'bg-blue-100' :
                        categories[term.category].color === 'green' ? 'bg-green-100' :
                        categories[term.category].color === 'amber' ? 'bg-amber-100' :
                        categories[term.category].color === 'purple' ? 'bg-purple-100' :
                        'bg-red-100'
                      )}>
                        {categories[term.category].icon}
                      </div>
                      <div>
                        <h4 className="font-medium text-sm">{categories[term.category].label}</h4>
                        {term.criticalTerm && (
                          <span className="text-xs text-red-600 font-medium">Critical Term</span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-500">
                        {term.translations.length} translations
                      </span>
                      {expandedTerms.includes(term.id) ? (
                        <ChevronDown className="w-4 h-4 text-gray-400" />
                      ) : (
                        <ChevronRight className="w-4 h-4 text-gray-400" />
                      )}
                    </div>
                  </div>
                </button>

                <AnimatePresence>
                  {expandedTerms.includes(term.id) && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: 'auto' }}
                      exit={{ height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="p-4 border-t border-gray-200">
                        <div className="mb-3">
                          <p className="text-sm text-gray-700">{term.originalText}</p>
                        </div>

                        <div className="space-y-2 mb-3">
                          {term.translations
                            .filter(t => selectedLanguages.includes(t.languageCode))
                            .map((translation, idx) => (
                              <div
                                key={idx}
                                className="p-3 bg-gray-50 rounded-lg border border-gray-200"
                              >
                                <div className="flex items-center justify-between mb-2">
                                  <div className="flex items-center gap-2">
                                    <span className="text-lg">{translation.flag}</span>
                                    <span className="font-medium text-sm">{translation.language}</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <span className={cn(
                                      "text-xs px-2 py-1 rounded",
                                      getStatusColor(translation.status)
                                    )}>
                                      {translation.status}
                                    </span>
                                    <button
                                      onClick={() => copyTranslation(translation.translation)}
                                      className="p-1 hover:bg-white rounded transition-colors"
                                    >
                                      <Copy className="w-3 h-3 text-gray-500" />
                                    </button>
                                  </div>
                                </div>
                                <p className="text-sm text-gray-600 mb-2">{translation.translation}</p>
                                {translation.jurisdictionRequirements.length > 0 && (
                                  <div className="text-xs text-amber-600">
                                    ⚠️ {translation.jurisdictionRequirements[0]}
                                  </div>
                                )}
                              </div>
                            ))}
                        </div>

                        <button
                          onClick={() => generateTranslations(term)}
                          className="w-full px-3 py-2 bg-primary text-white text-sm rounded-lg hover:bg-indigo-700 transition-colors"
                        >
                          Generate Missing Translations
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Translation Details */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
        >
          <h3 className="text-lg font-semibold mb-4">Translation Analysis</h3>

          {isGenerating ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"
                />
                <p className="text-gray-600">Generating translations...</p>
              </div>
            </div>
          ) : generatedTranslations.length > 0 ? (
            <div className="space-y-4">
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">AI-Generated Translations</h4>
                <p className="text-sm text-blue-700">
                  The following translations have been generated and require legal review before approval.
                </p>
              </div>

              {generatedTranslations.map((translation, idx) => (
                <div key={idx} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{translation.flag}</span>
                      <span className="font-medium">{translation.language}</span>
                    </div>
                    <span className={cn(
                      "text-xs px-2 py-1 rounded",
                      getStatusColor(translation.status)
                    )}>
                      {translation.status}
                    </span>
                  </div>

                  <div className="bg-white p-3 rounded text-sm text-gray-700 mb-3">
                    {translation.translation}
                  </div>

                  <div className="space-y-2">
                    <div>
                      <h5 className="text-xs font-medium text-gray-600 mb-1">Compliance Notes:</h5>
                      {translation.complianceNotes.map((note, noteIdx) => (
                        <p key={noteIdx} className="text-xs text-gray-500 flex items-start gap-1">
                          <CheckCircle className="w-3 h-3 text-green-500 mt-0.5" />
                          {note}
                        </p>
                      ))}
                    </div>

                    {translation.jurisdictionRequirements.length > 0 && (
                      <div>
                        <h5 className="text-xs font-medium text-gray-600 mb-1">Jurisdiction Requirements:</h5>
                        {translation.jurisdictionRequirements.map((req, reqIdx) => (
                          <p key={reqIdx} className="text-xs text-amber-600 flex items-start gap-1">
                            <AlertTriangle className="w-3 h-3 mt-0.5" />
                            {req}
                          </p>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="flex gap-2 mt-3">
                    <button className="flex-1 px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition-colors">
                      Approve
                    </button>
                    <button className="flex-1 px-3 py-1 bg-amber-600 text-white text-sm rounded hover:bg-amber-700 transition-colors">
                      Request Review
                    </button>
                    <button className="flex-1 px-3 py-1 bg-gray-600 text-white text-sm rounded hover:bg-gray-700 transition-colors">
                      Edit
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">
              <Globe className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p>Select a term and generate translations to see analysis</p>
            </div>
          )}
        </motion.div>
      </div>

      {/* Consistency Check Results */}
      {showConsistencyCheck && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
        >
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            Cross-Language Consistency Check
          </h3>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <h4 className="font-medium text-green-900 mb-2">Consistent Terms</h4>
              <ul className="space-y-1">
                <li className="text-sm text-green-700 flex items-start gap-1">
                  <CheckCircle className="w-3 h-3 mt-0.5" />
                  €100,000 protection limit consistent across all languages
                </li>
                <li className="text-sm text-green-700 flex items-start gap-1">
                  <CheckCircle className="w-3 h-3 mt-0.5" />
                  "Per depositor per bank" concept properly translated
                </li>
                <li className="text-sm text-green-700 flex items-start gap-1">
                  <CheckCircle className="w-3 h-3 mt-0.5" />
                  Legal entity references match jurisdiction requirements
                </li>
              </ul>
            </div>

            <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
              <h4 className="font-medium text-amber-900 mb-2">Potential Issues</h4>
              <ul className="space-y-1">
                <li className="text-sm text-amber-700 flex items-start gap-1">
                  <AlertTriangle className="w-3 h-3 mt-0.5" />
                  Polish translation pending legal review
                </li>
                <li className="text-sm text-amber-700 flex items-start gap-1">
                  <AlertTriangle className="w-3 h-3 mt-0.5" />
                  Finnish terminology may need local expert validation
                </li>
                <li className="text-sm text-amber-700 flex items-start gap-1">
                  <AlertTriangle className="w-3 h-3 mt-0.5" />
                  UK-specific FSCS references needed for GB market
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-center gap-2 text-blue-900">
              <Info className="w-4 h-4" />
              <span className="font-medium text-sm">Recommendation</span>
            </div>
            <p className="text-sm text-blue-700 mt-1">
              Schedule legal review for Polish and Finnish translations before publication.
              All other translations meet consistency requirements for immediate use.
            </p>
          </div>
        </motion.div>
      )}
    </div>
  )
}