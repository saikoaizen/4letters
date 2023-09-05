'use client'

import Image from 'next/image'
import colors from '../util/colors'
import PlayerDisplay from '../components/PlayerDisplay'
import SecretIcon from '../../../public/SecretIcon.svg'
import Title from '../components/Title'
import '../components/Common.css'
import CustomButton from '../components/CustomButton'
import LinkDisplay from '../components/LinkDisplay'
import Settings from '../components/Settings'
import { GameState } from '../util/GameState'
import useSocket from '../util/useSocket'
import { useEffect, useState } from 'react'
import SecretWordInput from '../components/SecretWordInput'
import { useRouter } from 'next/navigation'
import MessagingComponent from '../components/MessagingComponent'

export default function RoomPage() {
  const gameState = GameState.getInstance()
  const socket = useSocket()
  const router = useRouter()

  const [opp, setOpp] = useState(gameState.opp)
  const [secretWord, setSecretWord] = useState('')
  const [info, setInfo] = useState('')
  const [color, setColor] = useState('red')
  const [inputActive, setInputActive] = useState(true)
  const [oppReady, setOppReady] = useState(gameState.isOppReady)
  const [playerReady, setPlayerReady] = useState(false)

  const handleSecretWordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSecretWord(e.target.value)
  }

  const startGameHandle = () => {
    //Checking whether the secret word submission is done or not
    if (!playerReady && secretWord.length == 4) {
      socket.emit('secret-word-submission', { secretWord })
    }

    //Starting the game if everyone's ready
    if (playerReady && oppReady) {
      socket.emit('start-game')
    }
  }

  if (socket) {
    //When the opp joins the room
    socket.on('opp-joined-room', (oppName) => {
      gameState.opp = oppName
      setOpp(oppName)
      if (playerReady) {
        setInfo(!oppReady ? 'Waiting for ' + gameState.opp : '')
      }
    })

    //When a opp leaves
    socket.on('player-left', () => {
      setOpp('')
      gameState.opp = ''
      gameState.isPartyLeader = true
    })

    //On entering invalid secret word
    socket.on('invalid-secret-word', () => {
      setSecretWord('')
      gameState.secretWord = ''
      setInfo('Invalid word! Please use a valid secret word.')
      setTimeout(() => {
        setInfo('')
      }, 1000)
      setColor('red')
    })

    //On secret word submission success
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

    //When Opp is ready
    socket.on('opp-ready', () => {
      if (playerReady && !gameState.isPartyLeader) {
        setInfo('Waiting for ' + gameState.opp + ' to start the game')
      } else {
        setInfo('')
      }
      setOppReady(true)
    })

    //Starting the game
    socket.on('start-game-success', (turn) => {
      gameState.turn = turn == gameState.isPartyLeader ? true : false
      router.push('/game')
    })
  }

  //Cleanup
  useEffect(() => {
    return () => {
      socket.off('opp-joined-room')
      socket.off('player-left')
      socket.off('invalid-secret-word')
      socket.off('secret-word-submission-success')
      socket.off('opp-ready')
      socket.off('start-game-success')
    }
  }, [socket])

  if (typeof window !== 'undefined') {
    //Handling back event (specifically for room page)
    window.onpopstate = (event) => {
      socket.emit('leave-room')
      history.pushState(event.state, document.title, location.href)
    }
  }

  return (
    <div style={{ display: 'flex', width: '100%', justifyContent: 'center' }}>
      <div className="roomWrapper">
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
              placeholder="SECRET WORD?"
              maxLength={4}
              value={secretWord}
              onChange={handleSecretWordChange}
              interactable={inputActive}
              onSubmit={startGameHandle}
            />
          </div>
          {info && <p style={{ color: color }}>{info}</p>}
          {(!gameState.secretWord || gameState.isPartyLeader) && (
            <CustomButton
              color={colors.green}
              text={
                gameState.isPartyLeader
                  ? playerReady
                    ? 'Start Game'
                    : 'Submit'
                  : 'Ready!'
              }
              onClick={startGameHandle}
            />
          )}
        </div>
        <MessagingComponent />
      </div>
    </div>
  )
}
