'use client'

import { useEffect, useState } from 'react'
import { io, Socket } from 'socket.io-client'

let globalSocket: Socket

export default function useSocket() {
  const [socket, setSocket] = useState<Socket>(globalSocket)

  useEffect(() => {
    if (!globalSocket) {
      globalSocket = io(process.env.NEXT_PUBLIC_SOCKET_SERVER_URL as string)
      setSocket(globalSocket)
    }
  }, [])

  return socket
}
