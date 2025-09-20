import { NextRequest, NextResponse } from 'next/server'

interface QueryRequest {
  customer: string
  bank: string
  query: string
  category: string
  language?: string
}

export async function POST(request: NextRequest) {
  try {
    const body: QueryRequest = await request.json()

    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 1000))

    let response = ''
    const confidence = 75 + Math.random() * 23 // 75-98% confidence

    switch (body.category) {
      case 'KYC':
        response = `Thank you for your inquiry about account opening requirements.

To open an account with ${body.bank}, you will need:
1. Valid government-issued ID (passport or national ID)
2. Proof of address (utility bill, bank statement - not older than 3 months)
3. Tax Identification Number
4. For non-EU residents: Proof of legal residence status

The verification process typically takes 2-3 business days.`
        break

      case 'Payments':
        response = `International transfer processing times:

SEPA Transfers (EU): 1-2 business days
SWIFT Transfers (non-EU): 3-5 business days

Factors affecting transfer speed:
- Cut-off times (3:00 PM CET for same-day processing)
- Compliance checks for amounts over €10,000
- Correspondent bank processing times

For specific transfer tracking, please provide your transaction reference.`
        break

      case 'Technical':
        response = `We apologize for the technical issue you're experiencing.

Your issue has been escalated to our technical team.
Reference: TECH-${Date.now()}

Expected resolution time: 24-48 hours

You will receive email updates on the progress.`
        break

      default:
        response = `Thank you for your inquiry. We're processing your request and will respond within 24 hours.`
    }

    const result = {
      id: Math.floor(Math.random() * 10000),
      customer: body.customer,
      bank: body.bank,
      query: body.query,
      category: body.category,
      response,
      confidence,
      status: confidence > 85 ? 'auto-resolved' : 'pending-review',
      timestamp: new Date().toISOString(),
      processingTime: 0.8
    }

    return NextResponse.json(result)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to process customer query' },
      { status: 500 }
    )
  }
}