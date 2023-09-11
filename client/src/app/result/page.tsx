'use client'

import { GameState } from '../util/GameState'
import '../components/Common.css'

export default function ResultPage() {
  const gameState = GameState.getInstance()
  const statNames = ['Game Time', 'Your Time', gameState.opp + "'s Time"]

  return (
    <div className="menuPageWrapper">
      <div className={gameState.result ? 'resultBoxWon' : 'resultBoxLost'}>
        <h1 className={gameState.result ? 'resultTextWon' : 'resultTextLost'}>
          {gameState.result ? 'You Won!' : 'You Lost!'}
        </h1>
        {gameState.settings.revealWord || gameState.result ? (
          <div className="wordRevealBox">
            {(gameState.settings.revealWord || gameState.result) && (
              <p>{gameState.opp}&apos;s secret word</p>
            )}
            <h1 className="wordRevealTextOn">{gameState.oppSecretWord}</h1>
          </div>
        ) : (
          <div className="wordRevealBox">
            <h1 className="wordRevealTextOff">* * * *</h1>
            <p style={{ fontSize: '0.8rem' }}>
              (Reveal Winner&apos;s Word is off)
            </p>
          </div>
        )}
        <div className="guessCountBox">
          <div className="guessCountText">
            <h1>You: </h1>
            <h1>{gameState.stats[3]} guesses</h1>
          </div>
          <div className="guessCountText">
            <h1>{gameState.opp}: </h1>
            <h1>{gameState.stats[4]} guesses</h1>
          </div>
        </div>
        <div className="statBox">
          {statNames.map((statName, index) => (
            <div className="statText" key={index}>
              <p>{statName}: </p>
              <p>{gameState.stats[index] + ' sec'}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
