'use client'

import React, { useState } from 'react'
import styles from './SecretWordInput.module.css'

interface Props {
  placeholder?: string
  maxLength?: number
  interactable?: boolean
  gameMode?: boolean
  initialValue?: string
  value?: string
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  onSubmit?: () => void
}

export default function SecretWordInput({
  placeholder = 'abcd...',
  maxLength = 20,
  interactable = true,
  initialValue = '',
  gameMode = false,
  value = '',
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
      className={gameMode ? styles.gameMode : styles.secretWordInput}
      placeholder={placeholder}
      maxLength={maxLength}
      readOnly={!interactable}
      value={initialValue ? inputValue : value}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value)
        onChange(e)
      }}
      onKeyDown={handleKeyPress}
    />
  )
}
