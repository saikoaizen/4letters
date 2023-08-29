type Player = {
  name?: string;
  socketID?: string;
  secretWord?: string;
  isPartyLeader?: boolean;
  isReady?: boolean;
  guesses?: [string];
};

type Settings = {
  revealWord: boolean;
  timer: number;
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
