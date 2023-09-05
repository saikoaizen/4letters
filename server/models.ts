type Player = {
  name?: string;
  socketID?: string;
  secretWord?: string;
  isPartyLeader?: boolean;
  isReady?: boolean;
  guessCount?: number;
  timeTaken?: number;
};

type Settings = {
  revealWord: boolean;
  timer: number;
};

export type GameStats = {
  revealWord: boolean | undefined;
  timeTakenA: number | undefined;
  guessCountA: number | undefined;
  timeTakenB: number | undefined;
  guessCountB: number | undefined;
  secretWordA: string | undefined;
  secretWordB: string | undefined;
};

export type Game = {
  playerA?: Player;
  playerB?: Player;
  settings?: Settings;
  roomCode?: string;
  timers?: [number];
  isRoomJoinable?: boolean;
  result?: boolean;
  turn?: boolean;
  isPlaying?: boolean;
};
