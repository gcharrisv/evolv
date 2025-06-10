import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Habits from './pages/Habits';
import Pet from './pages/Pet';
import Leaderboard from './pages/Leaderboard';
import Insights from './pages/Insights';
import Profile from './pages/Profile';
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <div>
      <nav>
        <Link to="/">Home</Link> | <Link to="/habits">Habits</Link> | <Link to="/pet">Pet</Link> |
        <Link to="/leaderboard">Leaderboard</Link> | <Link to="/insights">Insights</Link> |
        <Link to="/profile">Profile</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/habits" element={<Habits />} />
        <Route path="/pet" element={<Pet />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/insights" element={<Insights />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;

