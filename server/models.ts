type Player = {
  name?: string;
  socketID?: string;
  secretWord?: string;
  isPartyLeader?: boolean;
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
  isPlaying?: boolean;
  timers?: [number];
  isRoomJoinable?: boolean;
  result?: boolean;
  guesses?: [string];
  messages?: [string];
  turn?: boolean;
};
