// src/types/react-world-flags.d.ts

declare module 'react-world-flags' {
  import React from 'react'

  interface FlagProps {
    code: string
    width?: string | number
    height?: string | number
    fallback?: React.ReactNode
    alt?: string
    className?: string
  }

  const Flag: React.FC<FlagProps>
  export default Flag
}