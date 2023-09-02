'use client'

import CircleButton from '../components/CircleButton'
import colors from '../util/colors'
import '../components/Common.css'
import Title from '../components/Title'
import GuessComponent from '../components/GuessComponent'
import GuessMessage from '../components/GuessMessage'
import Message from '../components/Message'
import Timer from '../components/Timer'
import { useEffect, useRef, useState } from 'react'
import { GameState, MessageType, GuessType } from '../util/GameState'
import useSocket from '../util/useSocket'
import MessageInput from '../components/MessageInput'
import { useRouter } from 'next/navigation'

export default function GamePage() {
  const socket = useSocket()
  const gameState = GameState.getInstance()
  const router = useRouter()

  const [playerTimerValue, setPlayerTimerValue] = useState(0)
  const [oppTimerValue, setOppTimerValue] = useState(0)
  const [messageInput, setMessageInput] = useState('')
  const [guessInput, setGuessInput] = useState('')
  const [guessesList, setGuessesList] = useState<GuessType[]>(gameState.guesses)
  const [messagesList, setMessagesList] = useState<MessageType[]>(
    gameState.messages
  )

  //Used to scroll the messages and guesses to the bottom when they update
  const guessesBottomRef = useRef<null | HTMLDivElement>(null)
  const messagesBottomRef = useRef<null | HTMLDivElement>(null)

  //serverTurn=true will always mean that it's the 1st player's turn (PartyLeader)
  //serverTurn=false will always mean that it's the 2nd player's turn (not PartyLeader)
  //NOTE: Server will only return a single boolean value for turn-
  //      which is then used to figure out which player's turn it is using the method below
  const [turn, setTurn] = useState<boolean>(
    !gameState.turn == !gameState.isPartyLeader ? true : false
  )

  //Converting server turn update to local turn value
  //Since the server just gives a boolean value, we have to figure out the turn value using this method
  const setServerToLocalTurn = (value: boolean) => {
    if (value == gameState.isPartyLeader) {
      setTurn(true)
    } else {
      setTurn(false)
    }
  }

  //Send Message Handler
  const handleSendMessage = () => {
    if (messageInput) {
      socket.emit('send-message', messageInput)
      setMessagesList((prevMessages) => [
        ...prevMessages,
        { sender: true, text: messageInput },
      ])
      setMessageInput('')
    }
  }

  //Guess submition handler
  const handleSendGuess = () => {
    if (turn && guessInput && guessInput.length == 4) {
      socket.emit('submit-guess', guessInput)
      setGuessInput('')
    }
  }

  //Message change handler
  const handleMessageInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessageInput(e.target.value)
  }

  //Guess input change handler
  const handleGuessInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGuessInput(e.target.value)
  }

  useEffect(() => {
    //Updating messagesList on receiving new message entry
    socket.on('message-received', (message) => {
      setMessagesList((prevMessages) => [
        ...prevMessages,
        { sender: false, text: message },
      ])
    })

    //Updating guessesList on receiving new guess entry
    socket.on('guess-received', (data) => {
      setGuessesList((prevGuesses) => [
        ...prevGuesses,
        { sender: false, text: data.text, result: data.result },
      ])
      setTurn(true)
    })

    //On entering an invalid guess
    socket.on('invalid-guess', () => {
      setTurn(true)
    })

    //On entering a valid guess
    socket.on('valid-guess', (data) => {
      setTurn(false)
      setGuessesList((prevGuesses) => [
        ...prevGuesses,
        { sender: true, text: data.text, result: data.result },
      ])
    })

    //Turn Updates
    socket.on('turn-update', (value) => {
      setOppTimerValue(0)
      setPlayerTimerValue(0)
      setServerToLocalTurn(value)
    })

    //Updating the timer
    socket.on('timer-update', (time) => {
      if (turn) {
        setPlayerTimerValue(time)
      } else {
        setOppTimerValue(time)
      }
    })

    //Skipping turn
    socket.on('skip-turn', () => {
      setTurn(!turn)
    })

    //On winning the game
    socket.on('win-game', () => {
      console.log('WON!')
      gameState.result = true
      router.push('/result')
    })

    //On losing the game
    socket.on('lost-game', () => {
      console.log('LOST!')
      gameState.result = false
      router.push('/result')
    })

    return () => {
      socket.off('message-received')
      socket.off('guess-received')
      socket.off('valid-guess')
      socket.off('invalid-guess')
      socket.off('skip-turn')
      socket.off('timer-update')
      socket.off('turn-update')
      socket.off('win-game')
      socket.off('lost-game')
    }
  }, [socket, gameState, router, setServerToLocalTurn, turn])

  useEffect(() => {
    messagesBottomRef.current!.scrollIntoView({ behavior: 'smooth' })
  }, [messagesList])

  useEffect(() => {
    guessesBottomRef.current!.scrollIntoView({ behavior: 'smooth' })
  }, [guessesList])

  return (
    <div className="pageWrapper">
      <Title isGamePage={true} />
      <div className="horizontalGamePage">
        <div className="chatBox">
          <Timer
            name={gameState.opp}
            selected={!turn}
            timerValue={oppTimerValue}
          />
          <div className="guessMessagesBox">
            <div className="guessMessagesWrapper">
              {guessesList.map((guess, index) => (
                <GuessMessage
                  key={index}
                  guessWord={guess.text}
                  result={guess.result}
                  alignment={guess.sender}
                />
              ))}
              <div ref={guessesBottomRef} />
            </div>
          </div>
          <div className="bottomHorizontalGuessBox">
            <GuessComponent
              active={turn}
              value={guessInput}
              onClick={handleSendGuess}
              onChange={handleGuessInputChange}
            />
            <Timer
              name={gameState.name}
              selected={turn}
              timerValue={playerTimerValue}
            />
          </div>
        </div>
        <div className="chatBox">
          <div className="messagesBox">
            {messagesList.map((message, index) => (
              <Message
                key={index}
                text={message.text}
                alignment={message.sender}
              />
            ))}
            <div ref={messagesBottomRef} />
          </div>
          <div className="wrapperHorizontal">
            <MessageInput
              maxLength={100}
              value={messageInput}
              onChange={handleMessageInputChange}
              onSubmit={handleSendMessage}
            />
            <CircleButton
              color={colors.blue}
              text=">"
              onClick={handleSendMessage}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
