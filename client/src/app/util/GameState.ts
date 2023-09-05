export type GuessType = {
  sender: boolean
  text: string
  result: number
}

export type MessageType = {
  sender: boolean
  text: string
}

export class GameState {
  private static instance: GameState
  public name: string
  public opp: string
  public roomCode: string
  public secretWord: string
  public oppSecretWord: string
  public isPartyLeader: boolean
  public isOppReady: boolean
  public settings: {
    revealWord: boolean
    timer: number
  }
  public turn: boolean
  public messages: MessageType[]
  public guesses: GuessType[]
  public result: boolean
  public stats: number[]

  private constructor(
    name?: string,
    opp?: string,
    roomCode?: string,
    secretWord?: string,
    oppSecretWord?: string,
    isPartyLeader?: boolean,
    isOppReady?: boolean,
    settings?: { revealWord: false; timer: 0 },
    turn?: boolean,
    messages?: [],
    guesses?: [],
    result?: boolean,
    stats?: number[]
  ) {
    this.name = name || ''
    this.opp = opp || ''
    this.roomCode = roomCode || ''
    this.secretWord = secretWord || ''
    this.isPartyLeader = isPartyLeader || false
    this.isOppReady = isOppReady || false
    this.settings = settings || { revealWord: false, timer: 0 }
    this.turn = turn || false
    this.messages = messages || []
    this.guesses = guesses || []
    this.result = result || false
    this.stats = stats || []
    this.oppSecretWord = oppSecretWord || ''
  }

  public static getInstance(
    name?: string,
    opp?: string,
    roomCode?: string,
    secretWord?: string,
    oppSecretWord?: string,
    isPartyLeader?: boolean,
    isOppReady?: boolean,
    settings?: { revealWord: false; timer: 0 },
    turn?: boolean,
    messages?: [],
    guesses?: [],
    result?: boolean,
    stats?: number[]
  ): GameState {
    if (!GameState.instance) {
      GameState.instance = new GameState(
        name,
        opp,
        secretWord,
        oppSecretWord,
        roomCode,
        isPartyLeader,
        isOppReady,
        settings,
        turn,
        messages,
        guesses,
        result,
        stats
      )
    }

    return GameState.instance
  }

  public static getInitial(
    name?: string,
    opp?: string,
    roomCode?: string,
    secretWord?: string,
    oppSecretWord?: string,
    isPartyLeader?: boolean,
    isOppReady?: boolean,
    settings?: { revealWord: false; timer: 0 },
    turn?: boolean,
    messages?: [],
    guesses?: [],
    result?: boolean,
    stats?: number[]
  ): GameState {
    GameState.instance = new GameState(
      name,
      opp,
      secretWord,
      oppSecretWord,
      roomCode,
      isPartyLeader,
      isOppReady,
      settings,
      turn,
      messages,
      guesses,
      result,
      stats
    )
    return GameState.instance
  }
}
