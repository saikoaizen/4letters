'use client'

import { useState } from 'react'
import CustomButton from './primitive/CustomButton'

export default function Settings() {
  const [revealWord, setRevealWord] = useState('')
  const [selectedTime, setSelectedTime] = useState('')

  const revealOptions = ['Yes', 'No']
  const timeOptions = ['30 sec', '1 min', '3 mins', '5 mins']

  const handleRevealOptionClick = (option: string) => {
    setRevealWord(option)
  }

  const handleTimeOptionClick = (option: string) => {
    setSelectedTime(option)
  }

  return (
    <div className="menuBox">
      <div className="wrapper">
        <p className="simpleText">Reveal Winners Word?</p>
        <div className="wrapperHorizontal">
          {revealOptions.map((option) => (
            <CustomButton
              key={option}
              text={option}
              selected={revealWord === option}
              onClick={() => handleRevealOptionClick(option)}
            />
          ))}
        </div>
      </div>
      <div className="wrapper">
        <p className="simpleText">Time Per Turn?</p>
        <div className="wrapperHorizontal">
          {timeOptions.map((option) => (
            <CustomButton
              key={option}
              text={option}
              selected={selectedTime === option}
              onClick={() => handleTimeOptionClick(option)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
