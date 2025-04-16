function Leaderboard({ leaderboard, players, roomName }) {
  return (
    <div className="p-4 rounded-lg shadow bg-card">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-bold">Leaderboard</h3>
        <span className="text-sm text-gray-600">Room: {roomName}</span>
      </div>

      {leaderboard.length === 0 ? (
        <p className="text-sm text-gray-500">
          The game has just started. Scores will appear here.
        </p>
      ) : (
        <div className="space-y-1">
          {leaderboard.map((player, index) => (
            <div key={index} className="flex justify-between leaderboard-item">
              <span className="font-medium">{player.username}</span>
              <span className="font-bold text-primary">{player.score}</span>
            </div>
          ))}
        </div>
      )}

      <h3 className="mt-4 mb-2 font-bold">Players Online</h3>
      <div className="space-y-1">
        {players.map((player, index) => (
          <div key={index} className="flex items-center py-1 text-sm">
            <div className="w-2 h-2 mr-2 bg-green-500 rounded-full"></div>
            {player}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Leaderboard;
