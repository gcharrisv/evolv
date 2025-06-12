import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import "../Header.css";

function Header() {
    const { isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();

    function toggleDarkMode() {
        document.body.classList.toggle("dark");
    }

    function handleLogout() {
        logout();
        navigate("/");
    }

    return (
        <header className="site-header">
            <nav>
                <Link to="/">Home</Link>
                {isAuthenticated && <Link to="/pet">Pet</Link>}
                {isAuthenticated && <Link to="/profile">Profile</Link>}
            </nav>

            <div className="header-actions">
                <button onClick={toggleDarkMode} className="dark-mode-toggle">
                    🌓
                </button>
                {isAuthenticated && (
                    <button onClick={handleLogout} className="logout-button">
                        Logout
                    </button>
                )}
            </div>
        </header>
    );
}

export default Header;
