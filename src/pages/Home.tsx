import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  return (
    <div className="home">
      <header className="hero">
        <img
          src={`${import.meta.env.BASE_URL}assets/evolv_logo.png`}
          alt="Evolv Logo"
        />
        <h1>Welcome to Evolv</h1>
        <p>
          Your personal growth companion — evolve yourself by building habits
          and leveling up your pet.
        </p>
      </header>

      <section className="mission">
        <h2>Why Evolv?</h2>
        <p>
          Evolv transforms habit tracking into a gamified experience. Instead of
          checking boxes, you’ll raise a virtual companion that grows with your
          progress. Stay consistent, level up your pet, and compete on the
          leaderboard — all while improving yourself.
        </p>
      </section>

      <section className="cta">
        <h3>Ready to start evolving?</h3>
        <Link to="/login" className="button">
          Log In
        </Link>
        <Link to="/register" className="button secondary">
          Register
        </Link>
      </section>
    </div>
  );
}

export default Home;
