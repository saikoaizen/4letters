import { useEffect, useRef, useState } from 'react'
import { GameState, MessageType } from '../util/GameState'
import Message from './Message'
import MessageInput from './MessageInput'
import useSocket from '../util/useSocket'

export default function MessagingComponent() {
  const socket = useSocket()
  const gameState = GameState.getInstance()

  const [messageInput, setMessageInput] = useState('')
  const [messagesList, setMessagesList] = useState<MessageType[]>(
    gameState.messages
  )

  //Used to scroll the messages to the bottom when they update
  const messagesBottomRef = useRef<null | HTMLDivElement>(null)

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

  //Message change handler
  const handleMessageInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessageInput(e.target.value)
  }

  useEffect(() => {
    //Updating messagesList on receiving new message entry
    socket.on('message-received', (message) => {
      setMessagesList((prevMessages) => [
        ...prevMessages,
        { sender: false, text: message },
      ])
    })

    //Cleanup
    return () => {
      socket.off('message-received')
    }
  }, [socket])

  useEffect(() => {
    messagesBottomRef.current!.scrollIntoView({ behavior: 'smooth' })
  }, [messagesList])

  return (
    <div className="chatBox">
      <div className="messagesBox">
        {messagesList.map((message, index) => (
          <Message key={index} text={message.text} alignment={message.sender} />
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
      </div>
    </div>
  )
}
