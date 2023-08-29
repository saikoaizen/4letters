'use client'

import { GameState } from '../util/GameState'
import '../components/Common.css'

export default function ResultPage() {
  const gameState = GameState.getInstance()
  const resultText = gameState.result ? 'YOU WON!' : 'YOU LOST!'

  return (
    <div className="menuPageWrapper">
      <h1>{resultText}</h1>
    </div>
  )
}
