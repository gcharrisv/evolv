import "../Leaderboard.css";

const mockUsers = [
  { rank: 1, name: "SkyPilot", pet: "green", streak: 42 },
  { rank: 2, name: "CodeRunner", pet: "red", streak: 35 },
  { rank: 3, name: "MindBender", pet: "blue", streak: 30 },
  { rank: 4, name: "Dreamer", pet: "green", streak: 27 },
  { rank: 5, name: "HabitHero", pet: "red", streak: 24 },
];

function Leaderboard() {
  return (
    <div className="leaderboard-container">
      <h1>🏆 Leaderboard</h1>
      <table className="leaderboard-table">
        <thead>
          <tr>
            <th>#</th>
            <th>User</th>
            <th>Pet</th>
            <th>Streak</th>
          </tr>
        </thead>
        <tbody>
          {mockUsers.map((user) => (
            <tr key={user.rank}>
              <td>{user.rank}</td>
              <td>{user.name}</td>
              <td>
                <img
                  src={`${import.meta.env.BASE_URL}assets/${user.pet}_egg.png`}
                  alt={`${user.pet} egg`}
                  className="pet-icon"
                />
              </td>
              <td>{user.streak} days</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Leaderboard;
