import React from 'react'
import './Common.css'

export default function CustomBox({ children }: { children: React.ReactNode }) {
  return <div className="customBox">{children}</div>
}
