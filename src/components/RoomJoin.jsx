import { useState, useEffect } from "react";

function RoomJoin({ onJoinRoom, connected, activeRooms = [] }) {
  const [roomName, setRoomName] = useState("");
  const [playerName, setPlayerName] = useState("");
  const [gameType, setGameType] = useState("sudoku");
  const [showActiveRooms, setShowActiveRooms] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (roomName.trim() && playerName.trim()) {
      onJoinRoom(roomName, playerName, gameType);
    }
  };

  const handleJoinExistingRoom = (room) => {
    if (playerName.trim()) {
      onJoinRoom(room.name, playerName, room.gameType);
    } else {
      // Focus on player name field if it's empty
      document.getElementById("playerNameInput").focus();
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-8 rounded-lg shadow-lg bg-card">
        <h1 className="mb-6 text-2xl font-bold text-center">
          Multiplayer Puzzle Game
        </h1>

        {!connected ? (
          <p className="mb-4 text-center text-error">Connecting to server...</p>
        ) : (
          <>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Your Name
                </label>
                <input
                  id="playerNameInput"
                  type="text"
                  value={playerName}
                  onChange={(e) => setPlayerName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>

              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Room Name
                </label>
                <input
                  type="text"
                  value={roomName}
                  onChange={(e) => setRoomName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>

              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Game Type
                </label>
                <select
                  value={gameType}
                  onChange={(e) => setGameType(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="sudoku">Sudoku</option>
                  <option value="wordgrid">Word Grid</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full px-4 py-2 text-white transition rounded-md bg-primary hover:bg-primary/90"
              >
                Create/Join Room
              </button>
            </form>

            {activeRooms.length > 0 && (
              <div className="mt-8">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-lg font-semibold">Active Rooms</h2>
                  <button
                    type="button"
                    onClick={() => setShowActiveRooms(!showActiveRooms)}
                    className="text-sm text-primary"
                  >
                    {showActiveRooms ? "Hide" : "Show"}
                  </button>
                </div>

                {showActiveRooms && (
                  <div className="overflow-hidden border rounded-md">
                    <div className="flex px-4 py-2 text-sm font-medium bg-gray-100">
                      <span className="w-1/3">Room</span>
                      <span className="w-1/3">Game</span>
                      <span className="w-1/3">Players</span>
                    </div>
                    <div className="overflow-y-auto max-h-48">
                      {activeRooms.map((room) => (
                        <div
                          key={room.id}
                          className="flex items-center px-4 py-3 border-t cursor-pointer hover:bg-gray-50"
                          onClick={() => handleJoinExistingRoom(room)}
                        >
                          <span className="w-1/3 font-medium truncate">
                            {room.name}
                          </span>
                          <span className="w-1/3 text-sm capitalize">
                            {room.gameType}
                          </span>
                          <span className="w-1/3 text-sm">{room.players}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default RoomJoin;
