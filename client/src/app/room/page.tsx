'use client'

import Image from 'next/image'
import colors from '../util/colors'
import PlayerDisplay from '../components/PlayerDisplay'
import SecretIcon from '../../../public/SecretIcon.svg'
import Title from '../components/Title'
import '../components/primitive/Common.css'
import CustomButton from '../components/primitive/CustomButton'
import LinkDisplay from '../components/LinkDisplay'
import Settings from '../components/Settings'
import { GameState } from '../util/GameState'
import useSocket from '../util/useSocket'
import { useState } from 'react'
import SecretWordInput from '../components/primitive/SecretWordInput'
import { useRouter } from 'next/navigation'

export default function RoomPage() {
  const gameState = GameState.getInstance()
  const socket = useSocket()
  const router = useRouter()

  const [opp, setOpp] = useState(gameState.opp)
  const [secretWord, setSecretWord] = useState('')
  const [info, setInfo] = useState('')
  const [color, setColor] = useState('red')
  const [inputActive, setInputActive] = useState(true)
  const [oppReady, setOppReady] = useState(false)
  const [playerReady, setPlayerReady] = useState(false)

  const handleSecretWordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSecretWord(e.target.value)
  }

  const startGameHandle = () => {
    if (!gameState.secretWord && secretWord.length == 4) {
      socket.emit('secret-word-submission', { secretWord })
    }

    if (gameState.secretWord) {
      socket.emit('start-game')
    }
  }

  socket.on('opp-joined-room', (oppName) => {
    gameState.opp = oppName
    setOpp(oppName)
  })

  socket.on('player-left', () => {
    setOpp('')
    gameState.opp = ''
    gameState.isPartyLeader = true
  })

  socket.on('invalid-secret-word', () => {
    setSecretWord('')
    gameState.secretWord = ''
    setInfo('Invalid word! Please use a valid secret word.')
    setTimeout(() => {
      setInfo('')
    }, 1000)
    setColor('red')
  })

  socket.on('secret-word-submission-success', (message) => {
    setSecretWord(message)
    gameState.secretWord = message
    setInfo('Success!')
    setPlayerReady(true)
    setTimeout(() => {
      if (!gameState.isPartyLeader) {
        setInfo(
          'Waiting for ' +
            gameState.opp +
            (oppReady ? ' to start the game' : '')
        )
      } else {
        setInfo(!oppReady ? 'Waiting for ' + gameState.opp : '')
      }
      setColor('white')
    }, 1000)
    setColor(colors.green)
    setInputActive(false)
  })

  socket.on('opp-ready', () => {
    setInfo('')
    setOppReady(true)
  })

  //Starting the game
  socket.on('start-game-success', () => {
    console.log('STARTING GAME!')
    router.push('/game')
  })

  //Handling back event (specifically for room page)
  window.onpopstate = () => {
    socket.emit('leave-room')
  }

  return (
    <div className="pageWrapper">
      <Title />
      {gameState.isPartyLeader && !opp && (
        <LinkDisplay link={gameState.roomCode} />
      )}
      <div className="menuBox">
        <p className="simpleText">Players Active:</p>
        <div className="wrapper">
          {gameState.name && (
            <PlayerDisplay
              name={gameState.name}
              isPartyLeader={gameState.isPartyLeader}
              ready={playerReady}
            />
          )}
          {opp && (
            <PlayerDisplay
              name={opp}
              isPartyLeader={!gameState.isPartyLeader}
              ready={oppReady}
            />
          )}
        </div>
      </div>
      <Settings />
      <div className="wrapperHorizontal">
        <Image src={SecretIcon} alt="SecretIcon" width={30} height={30} />
        <SecretWordInput
          placeHolder="SECRET WORD?"
          maxLength={4}
          customStyle={{
            textTransform: 'uppercase',
            maxWidth: 'fit-content',
            background: colors.black,
          }}
          value={secretWord}
          onChange={handleSecretWordChange}
          interactable={inputActive}
        />
      </div>
      {info && <p style={{ color: color }}>{info}</p>}
      {(!gameState.secretWord || gameState.isPartyLeader) && (
        <CustomButton
          color={colors.green}
          text={gameState.isPartyLeader ? 'Start Game' : 'Ready!'}
          onClick={startGameHandle}
        />
      )}
    </div>
  )
}
