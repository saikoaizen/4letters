import { createServer } from "http";
import { Server } from "socket.io";
import { Game } from "./models";
import * as fs from "fs";

const httpServer = createServer();

const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

const PORT = process.env.PORT || 3001;

// Generating the wordlist's hashmap from JSON for WORDS validation
const wordMap = new Map<string, boolean>();
const wordsData: Buffer = fs.readFileSync("data/words.json");
const words = JSON.parse(wordsData.toString());
for (const word in words) {
  if (words.hasOwnProperty(word)) {
    wordMap.set(word.toUpperCase(), true);
  }
}

//Map to store all the concurrent games
const activeRooms = new Map<string, Game>();

//Map to store player:room data for ease of search
const playerRoomMap = new Map<string, string>();

//RoomCodeGenerator
const generateRoomCode = (): string => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
  let code = "";
  for (let i = 0; i < 5; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    code += characters.charAt(randomIndex);
  }
  return activeRooms.has(code) ? generateRoomCode() : code;
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
        socketID: socket.id,
      },
      playerB: {
        isPartyLeader: false,
      },
      settings: {
        revealWord: false,
        timer: 0.5,
      },
      roomCode: roomCode,
      isRoomJoinable: true,
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
          io.to(game.playerB!.socketID!).emit("opp-ready");
        }
      } else {
        if (game.playerB!.secretWord) return;

        game.playerB!.secretWord = secretWord;
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
        io.to(roomCode).emit("start-game-success");
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
