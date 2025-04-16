import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import RoomJoin from "./components/RoomJoin";
import SudokuGame from "./components/SudokuGame";
import WordGridGame from "./components/WordGridGame";
import Chat from "./components/Chat";
import Leaderboard from "./components/Leaderboard";
import GameResult from "./components/GameResult";

// Create socket connection with environment-aware URL
const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:3001';




// Initialize socket connection
const socket = io(SOCKET_URL);

function App() {
  const [connected, setConnected] = useState(false);
  const [room, setRoom] = useState("");
  const [username, setUsername] = useState("");
  const [gameType, setGameType] = useState(""); // 'sudoku' or 'wordgrid'
  const [gameState, setGameState] = useState(null);
  const [players, setPlayers] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState(null);
  const [messages, setMessages] = useState([]);
  const [activeRooms, setActiveRooms] = useState([]);

  useEffect(() => {
    // Socket connection event
    socket.on("connect", () => {
      setConnected(true);
      console.log("Connected to server");
      // Request active rooms list immediately after connecting
      socket.emit("get_active_rooms");
    });

    // Socket disconnection event
    socket.on("disconnect", () => {
      setConnected(false);
      console.log("Disconnected from server");
    });

    // Room join confirmation
    socket.on("room_joined", (data) => {
      setRoom(data.room);
      setGameType(data.gameType);
      setGameState(data.gameState);
      setPlayers(data.players);
    });

    // Player list update
    socket.on("players_update", (updatedPlayers) => {
      setPlayers(updatedPlayers);
    });

    // Game state update
    socket.on("game_update", (updatedGameState) => {
      setGameState(updatedGameState);
    });

    // Leaderboard update
    socket.on("leaderboard_update", (updatedLeaderboard) => {
      setLeaderboard(updatedLeaderboard);
    });

    // Game over event
    socket.on("game_over", (result) => {
      setGameOver(true);
      setWinner(result.winner);
    });

    // New chat message
    socket.on("chat_message", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    // Receive active rooms list
    socket.on("active_rooms", (rooms) => {
      setActiveRooms(rooms);
    });

    // Set up polling for active rooms every 10 seconds
    const roomsInterval = setInterval(() => {
      if (connected && !room) {
        socket.emit("get_active_rooms");
      }
    }, 10000);

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("room_joined");
      socket.off("players_update");
      socket.off("game_update");
      socket.off("leaderboard_update");
      socket.off("game_over");
      socket.off("chat_message");
      socket.off("active_rooms");
      clearInterval(roomsInterval);
    };
  }, [connected, room]);

  const joinRoom = (roomName, playerName, selectedGameType) => {
    setUsername(playerName);
    socket.emit("join_room", {
      room: roomName,
      username: playerName,
      gameType: selectedGameType,
    });
  };

  const sendChatMessage = (message) => {
    const messageData = {
      room,
      sender: username,
      text: message,
      timestamp: new Date().toISOString(),
    };
    socket.emit("send_message", messageData);
    setMessages((prevMessages) => [...prevMessages, messageData]);
  };

  const updateSudokuCell = (row, col, value) => {
    socket.emit("cell_update", { room, row, col, value, player: username });
  };

  const submitWord = (word, path) => {
    socket.emit("word_submit", { room, word, path, player: username });
  };

  return (
    <div className="min-h-screen p-4 bg-background">
      {!room ? (
        <RoomJoin
          onJoinRoom={joinRoom}
          connected={connected}
          activeRooms={activeRooms}
        />
      ) : gameOver ? (
        <GameResult winner={winner} room={room} players={players} />
      ) : (
        <div className="grid max-w-6xl grid-cols-1 gap-4 mx-auto lg:grid-cols-3">
          <div className="lg:col-span-2">
            {/* Room name display banner */}
            <div className="flex items-center justify-between p-3 mb-4 text-white rounded-lg bg-primary">
              <h1 className="text-xl font-bold">Room: {room}</h1>
              <div className="text-sm">
                {gameType === "sudoku" ? "Sudoku Puzzle" : "Word Grid Puzzle"}
              </div>
            </div>

            {gameType === "sudoku" && gameState && (
              <SudokuGame
                gameState={gameState}
                onCellUpdate={updateSudokuCell}
                currentPlayer={username}
                roomName={room}
              />
            )}
            {gameType === "wordgrid" && gameState && (
              <WordGridGame
                gameState={gameState}
                onWordSubmit={submitWord}
                currentPlayer={username}
                roomName={room}
              />
            )}
          </div>
          <div className="space-y-4">
            <Leaderboard
              leaderboard={leaderboard}
              players={players}
              roomName={room}
            />
            <Chat
              messages={messages}
              onSendMessage={sendChatMessage}
              username={username}
              roomName={room}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;