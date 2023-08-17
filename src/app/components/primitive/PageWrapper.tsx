import React from 'react'
import './Common.css'

export default function PageWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className="pageWrapper">{children}</div>
}
