import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Pet from './pages/Pet';
import Profile from './pages/Profile';
import Login from "./pages/Login";
import Register from "./pages/Register";
import Header from './components/Header';
import { useAuth } from './auth/AuthContext';

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/pet"
          element={isAuthenticated ? <Pet /> : <Navigate to="/login" />}
        />
        <Route
          path="/profile"
          element={isAuthenticated ? <Profile /> : <Navigate to="/login" />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;



