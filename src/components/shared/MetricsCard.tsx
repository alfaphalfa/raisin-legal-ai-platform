'use client'

import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown, Minus } from 'lucide-react'
import { cn } from '@/lib/utils'

interface MetricsCardProps {
  title: string
  value: string | number
  trend?: 'up' | 'down' | 'neutral'
  trendValue?: string
  icon?: React.ReactNode
  className?: string
}

export function MetricsCard({
  title,
  value,
  trend = 'neutral',
  trendValue,
  icon,
  className
}: MetricsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "bg-white rounded-lg shadow-sm p-6 border border-gray-200",
        className
      )}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-gray-600">{title}</h3>
        {icon && <div className="text-gray-400">{icon}</div>}
      </div>

      <div className="flex items-end justify-between">
        <div className="text-2xl font-bold text-gray-900">{value}</div>

        {trendValue && (
          <div className={cn(
            "flex items-center text-sm font-medium",
            trend === 'up' && "text-green-600",
            trend === 'down' && "text-red-600",
            trend === 'neutral' && "text-gray-500"
          )}>
            {trend === 'up' && <TrendingUp className="w-4 h-4 mr-1" />}
            {trend === 'down' && <TrendingDown className="w-4 h-4 mr-1" />}
            {trend === 'neutral' && <Minus className="w-4 h-4 mr-1" />}
            {trendValue}
          </div>
        )}
      </div>
    </motion.div>
  )
}