import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Navbar() {
  const router = useRouter();

  return (
    <nav className="navbar navbar-expand-lg bg-light">
      <div className="container">
        <Link className={" navbar-brand"} href="/">
          SocialReact
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
            <li className="nav-item">
              {/* I could wrap this into a custom link tag but whatever */}
              <Link className={`nav-link ${router.pathname === "/" ? "active": ""}`} href="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${(router.pathname === "/[userid]") ? "active" : ""}`} href="/me">
                My User
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${router.pathname === "/about" ? "active" : ""}`} href="/about">
                About
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className={`nav-link ${router.pathname === "/login" ? "active" : ""}`} href={"/login"}>Log In</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${router.pathname === "/signup" ? "active" : ""}`} href={"/signup"}>Sign Up</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
