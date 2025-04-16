function GameResult({ winner, room, players }) {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-8 text-center rounded-lg shadow-lg bg-card">
        <h1 className="mb-6 text-2xl font-bold">Game Over!</h1>

        <div className="mb-8">
          <div className="flex items-center justify-center w-24 h-24 mx-auto mb-4 rounded-full bg-primary/10">
            <span className="text-4xl">🏆</span>
          </div>

          <h2 className="mb-2 text-xl font-bold text-primary">
            {winner ? `${winner} wins!` : "Game completed!"}
          </h2>

          <p className="text-gray-600">Room: {room}</p>
        </div>

        <div className="mb-6">
          <h3 className="mb-2 font-bold">Players</h3>
          <div className="flex flex-wrap justify-center gap-2">
            {players.map((player, index) => (
              <div
                key={index}
                className={`px-3 py-1 rounded ${
                  player === winner
                    ? "bg-green-100 text-green-800"
                    : "bg-gray-100"
                }`}
              >
                {player}
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={() => window.location.reload()}
          className="px-6 py-2 text-white transition rounded-md bg-primary hover:bg-primary/90"
        >
          Play Again
        </button>
      </div>
    </div>
  );
}

export default GameResult;
