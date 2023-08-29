'use client'

import Title from '../components/Title'
import '../components/Common.css'
import colors from '../util/colors'
import CustomButton from '../components/CustomButton'
import CustomInput from '../components/CustomInput'
import { GameState } from '../util/GameState'
import useSocket from '../util/useSocket'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'

export default function JoinPage() {
  const gameState = GameState.getInstance()
  const socket = useSocket()
  const router = useRouter()

  const roomCode = useSearchParams().get('roomCode')

  const [name, setName] = useState('')
  const [info, setInfo] = useState('')

  if (roomCode) {
    gameState.roomCode = roomCode
  } else {
    throw new Error()
  }

  const handleJoinRoom = () => {
    if (socket && name) {
      gameState.name = name
      socket.emit('join-room', { name: name, roomCode: gameState.roomCode })

      socket.on('joined-room', (data) => {
        gameState.opp = data['opp']
        gameState.settings = data['settings']
        gameState.isOppReady = data['isOppReady']
        router.push('/room')
      })

      socket.on('error-join-room', () => {
        setInfo('Error join room')
      })
    }
  }

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  }

  return (
    <div className="menuPageWrapper">
      <Title />
      <div className="menuBox">
        <div className="wrapper">
          <p>{info}</p>
          <CustomInput
            placeHolder="Enter your name..."
            maxLength={20}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleNameChange(e)
            }
          />
          <CustomButton
            color={colors.green}
            text="Join Room"
            onClick={handleJoinRoom}
          />
        </div>
      </div>
    </div>
  )
}
