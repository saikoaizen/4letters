export class GameState {
  private static instance: GameState
  public name: string
  public opp: string
  public roomCode: string
  public secretWord: string
  public isPartyLeader: boolean
  public settings: {
    revealWord: boolean
    timer: number
  }

  private constructor(
    name?: string,
    opp?: string,
    roomCode?: string,
    secretWord?: string,
    isPartyLeader?: boolean,
    settings?: { revealWord: false; timer: 0 }
  ) {
    this.name = name || ''
    this.opp = opp || ''
    this.roomCode = roomCode || ''
    this.secretWord = secretWord || ''
    this.isPartyLeader = isPartyLeader || false
    this.settings = settings || { revealWord: false, timer: 0 }
  }

  public static getInstance(
    name?: string,
    opp?: string,
    roomCode?: string,
    secretWord?: string,
    isPartyLeader?: boolean,
    settings?: { revealWord: false; timer: 0 }
  ): GameState {
    if (!GameState.instance) {
      GameState.instance = new GameState(
        name,
        opp,
        secretWord,
        roomCode,
        isPartyLeader,
        settings
      )
    }
    return GameState.instance
  }
}
