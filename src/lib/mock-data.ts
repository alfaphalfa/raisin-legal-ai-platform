export const mockJurisdictions = [
  { code: 'DE', name: 'Germany', regulations: ['MiFID II', 'GDPR', 'BaFin'], risk: 'low' },
  { code: 'GB', name: 'United Kingdom', regulations: ['FCA', 'GDPR-UK', 'PSD2'], risk: 'medium' },
  { code: 'US', name: 'United States', regulations: ['SEC', 'FINRA', 'State Regs'], risk: 'high' },
  { code: 'FR', name: 'France', regulations: ['AMF', 'GDPR', 'MiFID II'], risk: 'low' },
  { code: 'ES', name: 'Spain', regulations: ['CNMV', 'GDPR', 'PSD2'], risk: 'low' },
  { code: 'IT', name: 'Italy', regulations: ['CONSOB', 'GDPR', 'MiFID II'], risk: 'medium' },
  { code: 'NL', name: 'Netherlands', regulations: ['AFM', 'GDPR', 'PSD2'], risk: 'low' },
  { code: 'AT', name: 'Austria', regulations: ['FMA', 'GDPR', 'MiFID II'], risk: 'low' },
  { code: 'PL', name: 'Poland', regulations: ['KNF', 'GDPR', 'MiFID II'], risk: 'medium' },
  { code: 'NO', name: 'Norway', regulations: ['FSA', 'GDPR', 'MiFID II'], risk: 'low' }
]

export const mockAlerts = [
  {
    id: 1,
    severity: 'high' as const,
    title: 'EU AI Act Update',
    description: 'New requirements for credit scoring algorithms',
    jurisdictions: ['DE', 'FR', 'ES'],
    timestamp: new Date('2024-09-20T10:00:00'),
    impact: '127 partner banks affected'
  },
  {
    id: 2,
    severity: 'medium' as const,
    title: 'FCA Consumer Duty Review',
    description: 'Enhanced customer outcome requirements',
    jurisdictions: ['GB'],
    timestamp: new Date('2024-09-19T14:30:00'),
    impact: '42 partner banks affected'
  },
  {
    id: 3,
    severity: 'low' as const,
    title: 'GDPR Cookie Policy Update',
    description: 'Clarification on consent requirements',
    jurisdictions: ['DE', 'FR', 'ES', 'IT', 'NL', 'AT', 'PL'],
    timestamp: new Date('2024-09-18T09:15:00'),
    impact: '312 partner banks affected'
  },
  {
    id: 4,
    severity: 'high' as const,
    title: 'US State Banking Regulation Change',
    description: 'New York introduces digital asset guidelines',
    jurisdictions: ['US'],
    timestamp: new Date('2024-09-17T16:45:00'),
    impact: '18 partner banks affected'
  }
]

export const mockContracts = [
  {
    id: 1,
    type: 'partner_agreement',
    bank: 'Deutsche Bank',
    jurisdiction: 'DE',
    uploadDate: new Date('2024-09-19T11:00:00'),
    status: 'pending_review' as const,
    riskFlags: [
      { clause: '7.2', issue: 'GDPR data retention exceeds limits', severity: 'high' as const },
      { clause: '12.1', issue: 'Liability cap below threshold', severity: 'medium' as const }
    ]
  },
  {
    id: 2,
    type: 'terms_update',
    bank: 'Barclays',
    jurisdiction: 'GB',
    uploadDate: new Date('2024-09-18T15:30:00'),
    status: 'approved' as const,
    riskFlags: []
  },
  {
    id: 3,
    type: 'regulatory_filing',
    bank: 'BNP Paribas',
    jurisdiction: 'FR',
    uploadDate: new Date('2024-09-17T10:00:00'),
    status: 'in_review' as const,
    riskFlags: [
      { clause: '3.5', issue: 'MiFID II disclosure missing', severity: 'low' as const }
    ]
  },
  {
    id: 4,
    type: 'partner_agreement',
    bank: 'Wells Fargo',
    jurisdiction: 'US',
    uploadDate: new Date('2024-09-16T14:20:00'),
    status: 'escalated' as const,
    riskFlags: [
      { clause: '5.1', issue: 'SEC reporting timeline conflict', severity: 'high' as const },
      { clause: '8.3', issue: 'State regulation compliance gap', severity: 'high' as const },
      { clause: '15.2', issue: 'Indemnification clause unclear', severity: 'medium' as const }
    ]
  }
]

export const mockMetrics = {
  documentsProcessedToday: 487,
  averageProcessingTime: '3.2',
  accuracyScore: 96.8,
  complianceAlerts: 7,
  contractsInReview: 12,
  humanReviewsToday: 23,
  timeToResolution: '18',
  costSavingsMonth: 142000
}

export const mockActivityFeed = [
  {
    id: 1,
    action: 'Contract Approved',
    details: 'Barclays partnership agreement cleared all checks',
    timestamp: new Date('2024-09-20T10:30:00'),
    type: 'success' as const
  },
  {
    id: 2,
    action: 'Regulatory Alert',
    details: 'EU AI Act update requires immediate attention',
    timestamp: new Date('2024-09-20T10:00:00'),
    type: 'alert' as const
  },
  {
    id: 3,
    action: 'Review Requested',
    details: 'Deutsche Bank contract flagged for GDPR compliance',
    timestamp: new Date('2024-09-19T11:00:00'),
    type: 'warning' as const
  },
  {
    id: 4,
    action: 'Customer Query Resolved',
    details: 'Automated response to KYC documentation request',
    timestamp: new Date('2024-09-19T09:45:00'),
    type: 'info' as const
  }
]

export const mockCustomerQueries = [
  {
    id: 1,
    customer: 'Hans Mueller',
    bank: 'Deutsche Bank',
    query: 'What documents do I need for account opening?',
    category: 'KYC',
    status: 'resolved' as const,
    confidence: 98,
    timestamp: new Date('2024-09-20T09:15:00')
  },
  {
    id: 2,
    customer: 'Sophie Dubois',
    bank: 'BNP Paribas',
    query: 'How long does international transfer take?',
    category: 'Payments',
    status: 'pending_review' as const,
    confidence: 72,
    timestamp: new Date('2024-09-20T10:45:00')
  },
  {
    id: 3,
    customer: 'John Smith',
    bank: 'Barclays',
    query: 'Interest rate calculation error in my account',
    category: 'Technical',
    status: 'escalated' as const,
    confidence: 45,
    timestamp: new Date('2024-09-20T11:30:00')
  }
]