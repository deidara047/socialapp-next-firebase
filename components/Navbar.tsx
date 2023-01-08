import Link from 'next/link';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { rdxSignOut, selectUserData } from '../redux/reducers/usersSlice';
import { AppDispatch } from '../redux/store';

export default function Navbar() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector(selectUserData)

  const handleSignOut = () => {
    window.location.href = "/"
    dispatch(rdxSignOut());
  }

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
            {user.logged &&
            <li className="nav-item">
              <Link className={`nav-link ${(router.pathname === "/[userid]") ? "active" : ""}`} href="/me">
                My User
              </Link>
            </li>}
            <li className="nav-item">
              <Link className={`nav-link ${router.pathname === "/about" ? "active" : ""}`} href="/about">
                About
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <ul className="navbar-nav">
            {!user.logged && <><li className="nav-item">
              <Link className={`nav-link ${router.pathname === "/login" ? "active" : ""}`} href={"/login"}>Log In</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${router.pathname === "/signup" ? "active" : ""}`} href={"/signup"}>Sign Up</Link>
            </li></>}
            {user.logged && <li className='nav-item'>
              <button onClick={handleSignOut} className='nav-link' style={{backgroundColor: "transparent", border: "none"}}>Sign Out</button>
            </li>}
          </ul>
        </div>
      </div>
    </nav>
  );
}
