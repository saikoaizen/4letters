'use client'

import Title from '../components/Title'
import colors from '../util/colors'
import '../components/Common.css'
import CustomButton from '../components/CustomButton'
import CustomInput from '../components/CustomInput'
import useSocket from '../util/useSocket'
import { useState } from 'react'
import { GameState } from '../util/GameState'
import { useRouter } from 'next/navigation'

export default function HomePage() {
  const gameState = GameState.getInitial()
  const router = useRouter()
  const socket = useSocket()

  const [name, setName] = useState('')

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  }

  // MATCHMAKING OR AGAINST A BOT
  // const handleStartGame = () => {
  //   if (socket && name) {
  //     gameState.name = name
  //     socket.emit('create-room', gameState.name)
  //     socket.on('created-room', (roomCode: string) => {
  //       setName(roomCode)
  //     })
  //   }
  // }

  const handleCreateNewRoom = () => {
    if (socket && name) {
      gameState.name = name
      socket.emit('create-room', gameState.name)

      socket.on('created-room', (data: { roomCode: string }) => {
        socket.off('created-room')
        gameState.roomCode = data['roomCode']
        gameState.isPartyLeader = true
        router.push('/room')
      })
    }
  }

  return (
    <div className="menuPageWrapper">
      <Title />
      <div className="menuBox">
        <CustomInput
          placeHolder="Enter your name..."
          maxLength={20}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleNameChange(e)
          }
          onSubmit={handleCreateNewRoom}
        />
        <div className="wrapper">
          {
            //<CustomButton color={colors.grey} text="Start Game" />
          }
          <CustomButton
            color={colors.blue}
            text="Create Private Room"
            onClick={handleCreateNewRoom}
          />
        </div>
      </div>
    </div>
  )
}
