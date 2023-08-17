import React from 'react'
import './Common.css'

export default function WrapperHorizontal({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className="wrapperHorizontal">{children}</div>
}
