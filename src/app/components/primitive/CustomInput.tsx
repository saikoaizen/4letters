'use client'

import React, { useState } from 'react'
import styles from './CustomInput.module.css'

interface Props {
  placeHolder?: string
  maxLength?: number
  customStyle?: object
  interactable?: boolean
  initialValue?: string
}

export default function CustomInput({
  placeHolder = 'abcd...',
  maxLength = 20,
  customStyle = {},
  interactable = true,
  initialValue = '',
}: Props) {
  const [inputValue, setInputValue] = useState(initialValue)

  return (
    <input
      className={styles.customInput}
      placeholder={placeHolder}
      maxLength={maxLength}
      style={customStyle}
      readOnly={!interactable}
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
    />
  )
}
