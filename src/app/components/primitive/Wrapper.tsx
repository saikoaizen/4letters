import React from 'react'
import './Common.css'

export default function Wrapper({ children }: { children: React.ReactNode }) {
  return <div className="wrapper">{children}</div>
}
