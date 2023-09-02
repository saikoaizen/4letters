'use client'

import React, { useState } from 'react'
import styles from './CustomInput.module.css'

interface Props {
  placeHolder?: string
  maxLength?: number
  customStyle?: object
  interactable?: boolean
  initialValue?: string
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  onSubmit?: () => void
}

export default function CustomInput({
  placeHolder = 'abcd...',
  maxLength = 20,
  customStyle = {},
  interactable = true,
  initialValue = '',
  onChange = () => {},
  onSubmit = () => {},
}: Props) {
  const [inputValue, setInputValue] = useState(initialValue)

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key == 'Enter') {
      onSubmit()
    }
  }

  return (
    <input
      className={styles.customInput}
      placeholder={placeHolder}
      maxLength={maxLength}
      style={customStyle}
      readOnly={!interactable}
      value={inputValue}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value)
        onChange(e)
      }}
      onKeyDown={handleKeyPress}
    />
  )
}
