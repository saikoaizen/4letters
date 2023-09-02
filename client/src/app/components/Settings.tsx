'use client'

import { useEffect, useState } from 'react'
import CustomButton from './CustomButton'
import useSocket from '../util/useSocket'
import { GameState } from '../util/GameState'

export default function Settings() {
  const socket = useSocket()
  const gameState = GameState.getInstance()

  const [revealWord, setRevealWord] = useState(gameState.settings.revealWord)
  const [selectedTime, setSelectedTime] = useState(gameState.settings.timer)

  const revealOptions = ['Yes', 'No']
  const timeOptions = ['30 sec', '1 min', '3 mins', '5 mins']

  const handleRevealOptionClick = (option: boolean) => {
    if (gameState.isPartyLeader) {
      setRevealWord(option)
    }
  }

  const handleTimeOptionClick = (option: number) => {
    if (gameState.isPartyLeader) {
      setSelectedTime(option)
    }
  }

  useEffect(() => {
    socket.emit('update-settings', {
      revealWordOption: revealWord,
      selectedTimeOption: selectedTime,
    })
  }, [socket, revealWord, selectedTime])

  if (socket) {
    socket.on('settings-update', (updatedSettings) => {
      setRevealWord(updatedSettings.revealWordOption)
      setSelectedTime(updatedSettings.selectedTimeOption)
    })
  }

  useEffect(() => {
    return () => {
      socket.off('settings-update')
    }
  }, [socket])

  return (
    <div className="menuBox">
      <div className="wrapper">
        <p className="simpleText">Reveal Winners Word?</p>
        <div className="wrapperHorizontal">
          {revealOptions.map((option, index) => (
            <CustomButton
              key={index}
              text={option}
              selected={
                (revealWord && index == 0) || (!revealWord && index == 1)
              }
              onClick={() => handleRevealOptionClick(index == 0)}
            />
          ))}
        </div>
      </div>
      <div className="wrapper">
        <p className="simpleText">Time Per Turn?</p>
        <div className="wrapperHorizontal">
          {timeOptions.map((option, index) => (
            <CustomButton
              key={index}
              text={option}
              selected={selectedTime === index}
              onClick={() => handleTimeOptionClick(index)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
