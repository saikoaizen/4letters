'use client'

import { useState } from 'react'
import CustomButton from './primitive/CustomButton'
import MenuBox from './primitive/MenuBox'
import Wrapper from './primitive/Wrapper'
import WrapperHorizontal from './primitive/WrapperHorizontal'

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
    <MenuBox>
      <Wrapper>
        <p className="simpleText">Reveal Winners Word?</p>
        <WrapperHorizontal>
          {revealOptions.map((option) => (
            <CustomButton
              key={option}
              text={option}
              selected={revealWord === option}
              onClick={() => handleRevealOptionClick(option)}
            />
          ))}
        </WrapperHorizontal>
      </Wrapper>
      <Wrapper>
        <p className="simpleText">Time Per Turn?</p>
        <WrapperHorizontal>
          {timeOptions.map((option) => (
            <CustomButton
              key={option}
              text={option}
              selected={selectedTime === option}
              onClick={() => handleTimeOptionClick(option)}
            />
          ))}
        </WrapperHorizontal>
      </Wrapper>
    </MenuBox>
  )
}
