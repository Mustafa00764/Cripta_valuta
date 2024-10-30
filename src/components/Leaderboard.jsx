const Leaderboard = ({ users }) => {
  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-md text-white mt-8">
      <h2 className="text-xl font-bold">Leaderboard</h2>
      <table className="w-full mt-4">
        <thead>
          <tr>
            <th className="text-left">Rank</th>
            <th className="text-left">User</th>
            <th className="text-right">Points</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.id}>
              <td>{index + 1}</td>
              <td>{user.name}</td>
              <td className="text-right">{user.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
