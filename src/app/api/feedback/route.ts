import { NextRequest, NextResponse } from 'next/server'

interface FeedbackRequest {
  itemId: string
  itemType: 'contract_clause' | 'compliance_brief' | 'customer_response'
  category: string
  issue: string
  severity: 'low' | 'medium' | 'high'
  aiGenerated: string
  humanEdited: string
  confidence: number
}

export async function POST(request: NextRequest) {
  try {
    const body: FeedbackRequest = await request.json()

    // Simulate saving feedback
    await new Promise(resolve => setTimeout(resolve, 500))

    const result = {
      id: Math.floor(Math.random() * 10000),
      itemId: body.itemId,
      itemType: body.itemType,
      feedbackReceived: true,
      patternDetected: Math.random() > 0.7,
      similarIssuesCount: Math.floor(Math.random() * 10),
      modelUpdateScheduled: Math.random() > 0.5,
      timestamp: new Date().toISOString()
    }

    return NextResponse.json(result)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to save feedback' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    // Return feedback statistics
    const stats = {
      totalFeedback: 1234,
      todaysFeedback: 23,
      averageConfidence: 88.5,
      patternsDetected: 7,
      modelUpdatesApplied: 3,
      improvementRate: 12.3,
      feedbackByCategory: {
        'missing_context': 45,
        'incorrect_info': 12,
        'incomplete': 28,
        'formatting': 8,
        'tone': 15
      },
      feedbackBySeverity: {
        'low': 62,
        'medium': 38,
        'high': 8
      }
    }

    return NextResponse.json(stats)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to retrieve feedback statistics' },
      { status: 500 }
    )
  }
}