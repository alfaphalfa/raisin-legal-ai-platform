'use client'

import Flag from 'react-world-flags'
import { cn } from '@/lib/utils'

interface JurisdictionBadgeProps {
  code: string
  name?: string
  risk?: 'low' | 'medium' | 'high'
  size?: 'sm' | 'md' | 'lg'
  showName?: boolean
  showRisk?: boolean
  className?: string
}

export function JurisdictionBadge({
  code,
  name,
  risk,
  size = 'md',
  showName = true,
  showRisk = false,
  className
}: JurisdictionBadgeProps) {
  const sizeMap = {
    sm: '20',
    md: '24',
    lg: '32'
  }

  const riskColors = {
    low: 'bg-green-100 text-green-800',
    medium: 'bg-yellow-100 text-yellow-800',
    high: 'bg-red-100 text-red-800'
  }

  return (
    <div className={cn(
      "inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border",
      className
    )}>
      <Flag code={code} width={sizeMap[size]} />
      {showName && name && (
        <span className="font-medium text-gray-700">{name}</span>
      )}
      {showRisk && risk && (
        <span className={cn(
          "px-2 py-0.5 text-xs rounded-full font-medium",
          riskColors[risk]
        )}>
          {risk.toUpperCase()}
        </span>
      )}
    </div>
  )
}