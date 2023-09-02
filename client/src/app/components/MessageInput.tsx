'use client'

import React, { useEffect, useState } from 'react'
import styles from './CustomInput.module.css'

interface Props {
  placeHolder?: string
  maxLength?: number
  customStyle?: object
  value?: string
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  onSubmit?: () => void
}

export default function MessageInput({
  placeHolder = 'abcd...',
  maxLength = 20,
  customStyle = {},
  value = '',
  onChange = () => {},
  onSubmit = () => {},
}: Props) {
  const [inputValue, setInputValue] = useState(value)
  useEffect(() => {
    setInputValue(value)
  }, [value])

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
      value={inputValue}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value)
        onChange(e)
      }}
      onKeyDown={handleKeyPress}
    />
  )
}
