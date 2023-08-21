'use client'

import React, { useState } from 'react'
import styles from './CustomInput.module.css'

interface Props {
  placeHolder?: string
  maxLength?: number
  customStyle?: object
  interactable?: boolean
  initialValue?: string
  value?: string
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export default function SecretWordInput({
  placeHolder = 'abcd...',
  maxLength = 20,
  customStyle = {},
  interactable = true,
  initialValue = '',
  value = '',
  onChange = () => {},
}: Props) {
  const [inputValue, setInputValue] = useState(initialValue)

  return (
    <input
      className={styles.customInput}
      placeholder={placeHolder}
      maxLength={maxLength}
      style={customStyle}
      readOnly={!interactable}
      value={initialValue ? inputValue : value}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value)
        onChange(e)
      }}
    />
  )
}
