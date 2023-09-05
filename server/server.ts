import { createServer } from "http";
import { Server } from "socket.io";
import { Game, GameStats } from "./models";
import * as fs from "fs";

const httpServer = createServer();

const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

const PORT = process.env.PORT || 3001;

//Timer Options
const timerOptions = [30, 60, 180, 300];

//Map to store all timers
const roomTimers = new Map<string, NodeJS.Timeout>();

//Map to store the time taken
const roomTimeTaken = new Map<string, number>();

//Map to store all the concurrent games
const activeRooms = new Map<string, Game>();

//Map to store player:room data for ease of search
const playerRoomMap = new Map<string, string>();

// Generating the wordlist's hashmap from JSON for WORDS validation
const wordMap = new Map<string, boolean>();
const wordsData: Buffer = fs.readFileSync("data/words.json");
const words = JSON.parse(wordsData.toString());
for (const word in words) {
  if (words.hasOwnProperty(word)) {
    wordMap.set(word.toUpperCase(), true);
  }
}

//RoomCodeGenerator
const generateRoomCode = (): string => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890";
  let code = "";
  for (let i = 0; i < 5; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    code += characters.charAt(randomIndex);
  }

  //If the generated code already exists then we recursively generate it until we get a unique code
  return activeRooms.has(code) ? generateRoomCode() : code;
};

//Timer Function
const startTimer = (roomCode: string, timerOption: number) => {
  if (roomTimers.has(roomCode)) {
    clearInterval(roomTimers.get(roomCode));
  }

  //To keep track of the time taken
  if (!roomTimeTaken.has(roomCode)) {
    roomTimeTaken.set(roomCode, 0);
  }

  let timeRemaining = timerOption;

  const game = activeRooms.get(roomCode)!;
  const timer = setInterval(() => {
    if (timeRemaining > 0) {
      timeRemaining -= 1;
      roomTimeTaken.set(roomCode, timerOption - timeRemaining);
      io.to(roomCode).emit("timer-update", timeRemaining);
    } else {
      //Incrementing total time taken for players (this is a statistic)
      if (game.turn) {
        game.playerA!.timeTaken! += timerOption;
      } else {
        game.playerB!.timeTaken! += timerOption;
      }

      //Skipping player's turn incase the time runs out
      game.turn = !game.turn;

      //Turn Update
      io.to(roomCode).emit("turn-update", game.turn);
      activeRooms.set(roomCode, game);

      //Need this recursion incase players skip consecutively through timeouts
      startTimer(roomCode, timerOption);
    }
  }, 1000);

  //Storing the timer
  roomTimers.set(roomCode, timer);
};

//Managing the connection
io.on("connection", (socket) => {
  socket.on("create-room", (name) => {
    //Generating a new roomCode
    let roomCode = generateRoomCode();

    //Creating a new game and setting the players details
    const game: Game = {
      playerA: {
        name: name,
        isPartyLeader: true,
        isReady: false,
        socketID: socket.id,
        guessCount: 0,
        timeTaken: 0,
      },
      playerB: {
        isPartyLeader: false,
        isReady: false,
        guessCount: 0,
        timeTaken: 0,
      },
      settings: {
        revealWord: false,
        timer: 0,
      },
      roomCode: roomCode,
      isRoomJoinable: true,
      isPlaying: false,
      turn: Math.random() > 0.5 ? true : false,
    };

    //Adding the game to map
    activeRooms.set(roomCode, game);

    //Adding to playerRoomMap
    playerRoomMap.set(socket.id, roomCode);

    //Joining the room
    socket.join(roomCode);
    socket.emit("created-room", { roomCode });
  });

  socket.on("join-room", (data) => {
    //Deconstructing roomCode and name
    const roomCode = data["roomCode"];
    const name = data["name"];

    //Checking roomCode and adding the player to the room
    if (activeRooms.has(data["roomCode"])) {
      const game = activeRooms.get(roomCode)!;

      if (game.isRoomJoinable) {
        game.playerB!.name = name;
        game.playerB!.socketID = socket.id;
        game.isRoomJoinable = false;

        //Updating game data
        activeRooms.set(roomCode, game);

        //Adding to playerRoomMap
        playerRoomMap.set(socket.id, roomCode);

        //Joining the room
        socket.join(roomCode);

        //Letting the client know about the joined room
        socket.emit("joined-room", {
          opp: game.playerA!.name,
          isOppReady: game.playerA!.isReady,
          settings: game.settings,
        });

        //Letting the other player know about the new player
        io.to(game.playerA!.socketID!).emit(
          "opp-joined-room",
          game.playerB!.name
        );
      } else {
        socket.emit("error-join-room");
      }
    } else {
      socket.emit("error-join-room");
    }
  });

  //Updating the settings of the game
  socket.on("update-settings", (settings) => {
    if (playerRoomMap.has(socket.id)) {
      const roomCode = playerRoomMap.get(socket.id)!;
      const game = activeRooms.get(roomCode)!;

      if (game.playerA?.socketID == socket.id) {
        game.settings = {
          revealWord: settings.revealWordOption,
          timer: settings.selectedTimeOption,
        };

        //Updating the game
        activeRooms.set(roomCode, game);

        //Updating the other player's settings if they are in the room
        if (game.playerB?.name) {
          io.to(game.playerB.socketID!).emit("settings-update", settings);
        }
      }
    }
  });

  //Room Submit handle
  socket.on("secret-word-submission", (data) => {
    const secretWord = data.secretWord.toUpperCase();

    if (playerRoomMap.has(socket.id) && wordMap.has(secretWord)) {
      const roomCode = playerRoomMap.get(socket.id)!;
      const game = activeRooms.get(roomCode)!;

      if (game.playerA?.socketID == socket.id) {
        //if leader doesn't have a secretWord then we accept the submission
        if (!game.playerA.secretWord) {
          game.playerA.secretWord = secretWord;
          game.playerA.isReady = true;
          io.to(game.playerB!.socketID!).emit("opp-ready");
        }
      } else if (game.playerB?.socketID == socket.id) {
        if (game.playerB!.secretWord) return;

        game.playerB!.secretWord = secretWord;
        game.playerB!.isReady = true;
        io.to(game.playerA!.socketID!).emit("opp-ready");
      }

      //Updating the game
      activeRooms.set(roomCode, game);

      //Feedback for player
      socket.emit("secret-word-submission-success", secretWord);
    } else {
      socket.emit("invalid-secret-word");
    }
  });

  //When player sends a message
  socket.on("send-message", (message) => {
    if (playerRoomMap.has(socket.id)) {
      const roomCode = playerRoomMap.get(socket.id)!;
      socket.to(roomCode).emit("message-received", message);
    }
  });

  //When player makes a guess
  socket.on("submit-guess", (message) => {
    const guessedWord = message.toUpperCase();
    if (playerRoomMap.has(socket.id) && wordMap.has(guessedWord)) {
      const roomCode = playerRoomMap.get(socket.id)!;
      const game = activeRooms.get(roomCode)!;

      const data = { text: guessedWord, result: 0 };
      let playerSecretWord = "";
      let result = 0;

      if (game.playerA?.socketID == socket.id && game.turn) {
        playerSecretWord = game.playerB!.secretWord!;
      } else if (game.playerB?.socketID == socket.id && !game.turn) {
        playerSecretWord = game.playerA!.secretWord!;
      }

      //Counting the number of matching letters
      for (let i = 0; i < playerSecretWord.length; i++) {
        if (guessedWord.includes(playerSecretWord[i])) {
          result++;
        }
      }

      //Setting the data
      data.result = result;

      //Timer Cleanup
      clearInterval(roomTimers.get(roomCode));

      //Informing the clients
      socket.emit("valid-guess", data);
      socket.to(roomCode).emit("guess-received", data);

      //Incrementing total time taken for players (this is a statistic)
      if (game.turn) {
        game.playerA!.timeTaken! += roomTimeTaken.get(roomCode)!;
        game.playerA!.guessCount! += 1;
      } else {
        game.playerB!.timeTaken! += roomTimeTaken.get(roomCode)!;
        game.playerB!.guessCount! += 1;
      }

      //Updating game state
      game.turn = !game.turn;

      //Turn update
      io.to(roomCode).emit("turn-update", game.turn);

      //We need to start the timer
      let timeRemaining = timerOptions[game.settings!.timer!];
      startTimer(roomCode, timeRemaining);

      activeRooms.set(roomCode, game);

      //Incase the player guessed it correctly, we will declare the result here
      if (guessedWord == playerSecretWord) {
        //Data to send for game stats
        const data: GameStats = {
          revealWord: game.settings?.revealWord,
          timeTakenA: game.playerA?.timeTaken,
          guessCountA: game.playerA?.guessCount,
          timeTakenB: game.playerB?.timeTaken,
          guessCountB: game.playerB?.guessCount,
          secretWordA: "",
          secretWordB: "",
        };

        //If secret word reveal is on
        if (game.settings?.revealWord) {
          data.secretWordA = game.playerA?.secretWord;
          data.secretWordB = game.playerB?.secretWord;
        }

        //Checking whose turn it is to declare the result
        if (!game.turn) {
          io.to(game.playerA?.socketID!).emit("win-game", data);
          io.to(game.playerB?.socketID!).emit("lost-game", data);
        } else {
          io.to(game.playerA?.socketID!).emit("lost-game", data);
          io.to(game.playerB?.socketID!).emit("win-game", data);
        }

        //Removing players
        playerRoomMap.delete(game.playerA?.socketID!);
        playerRoomMap.delete(game.playerB?.socketID!);

        //Cleaning up timers
        roomTimers.delete(roomCode);
        roomTimeTaken.delete(roomCode);

        //Deleting the room because the game has finised (Play Again, can be added later)
        activeRooms.delete(roomCode);

        //Leaving the room
        io.socketsLeave(roomCode);
      }
    } else {
      //if the guess is invalid
      socket.emit("invalid-guess");
    }
  });

  //Starting the game
  socket.on("start-game", () => {
    if (playerRoomMap.has(socket.id)) {
      const roomCode = playerRoomMap.get(socket.id)!;
      const game = activeRooms.get(roomCode)!;

      //if playerB submitted the secretWord then we start the game
      if (
        game.playerB!.secretWord &&
        game.playerA?.socketID == socket.id &&
        !game.isPlaying
      ) {
        game.isPlaying = true;

        //We need to start the timer
        let timeRemaining = timerOptions[game.settings!.timer!];
        startTimer(roomCode, timeRemaining);

        activeRooms.set(roomCode, game);
        io.to(roomCode).emit("start-game-success", game.turn);
      }
    }
  });

  //When a player disconnects
  socket.on("disconnect", () => {
    if (playerRoomMap.has(socket.id)) {
      const roomCode = playerRoomMap.get(socket.id)!;
      const game = activeRooms.get(roomCode)!;

      //If room is joinable then that would mean there is only a single player in the room-
      //and so we can delete the room
      //If not, we remove the player making the request and let the other player know that they left
      if (game.isRoomJoinable) {
        activeRooms.delete(roomCode);
      } else {
        if (socket.id === game.playerA?.socketID) {
          game.playerA = {
            name: game.playerB!.name,
            isPartyLeader: true,
            socketID: game.playerB!.socketID,
          };
        }
        game.playerB = {
          isPartyLeader: false,
        };

        game.isRoomJoinable = true;

        //Updating the game
        activeRooms.set(roomCode, game);
        //Updating the other player
        io.to(game.playerA?.socketID!).emit("player-left");
      }

      //Updating the playerRoomMap
      playerRoomMap.delete(socket.id);
      //Leaving the room
      socket.leave(roomCode);
    }
  });

  //Same as the disconnect but the connection is still active
  socket.on("leave-room", () => {
    if (playerRoomMap.has(socket.id)) {
      const roomCode = playerRoomMap.get(socket.id)!;
      const game = activeRooms.get(roomCode)!;

      if (game.isRoomJoinable) {
        activeRooms.delete(roomCode);
      } else {
        if (socket.id === game.playerA?.socketID) {
          game.playerA = {
            name: game.playerB!.name,
            isPartyLeader: true,
            socketID: game.playerB!.socketID,
          };
        }
        game.playerB = {
          isPartyLeader: false,
        };

        game.isRoomJoinable = true;

        //Updating the game
        activeRooms.set(roomCode, game);
        //Updating the other player
        io.to(game.playerA?.socketID!).emit("player-left");
      }

      //Updating the playerRoomMap
      playerRoomMap.delete(socket.id);
      //Leaving the room
      socket.leave(roomCode);
    }
  });
});

//Starting the server
httpServer.listen(PORT, () => {
  console.log("Server listening on port 3001");
});
