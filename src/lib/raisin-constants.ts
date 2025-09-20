export const RAISIN_STATS = {
  banks: 400,
  markets: 10,
  customersMillions: 1,
  documentsPerDay: 1000,
  complianceRegimes: 30,
  languageSupport: 12
}

export const SUPPORTED_LANGUAGES = [
  'English', 'German', 'French', 'Spanish', 'Italian', 'Dutch',
  'Polish', 'Portuguese', 'Swedish', 'Norwegian', 'Danish', 'Finnish'
]

export const DOCUMENT_TYPES = [
  'Partner Agreement',
  'Terms of Service',
  'Regulatory Filing',
  'Compliance Report',
  'Customer Contract',
  'Data Processing Agreement',
  'Service Level Agreement',
  'Privacy Policy'
]

export const RISK_LEVELS = {
  low: { label: 'Low Risk', color: 'text-green-600 bg-green-100' },
  medium: { label: 'Medium Risk', color: 'text-amber-600 bg-amber-100' },
  high: { label: 'High Risk', color: 'text-red-600 bg-red-100' }
}

export const CONTRACT_STATUSES = {
  pending_review: { label: 'Pending Review', color: 'bg-gray-100 text-gray-800' },
  in_review: { label: 'In Review', color: 'bg-blue-100 text-blue-800' },
  approved: { label: 'Approved', color: 'bg-green-100 text-green-800' },
  escalated: { label: 'Escalated', color: 'bg-red-100 text-red-800' }
}

export const COMPLIANCE_FRAMEWORKS = [
  'MiFID II',
  'GDPR',
  'PSD2',
  'EU AI Act',
  'FCA Consumer Duty',
  'SEC Regulations',
  'FINRA Rules',
  'BaFin Requirements',
  'AMF Guidelines',
  'CNMV Directives'
]

export const ROI_FACTORS = {
  manualReviewHours: 2.5,
  averageHourlyRate: 150,
  automationAccuracy: 0.968,
  processingSpeedIncrease: 10,
  complianceRiskReduction: 0.85
}