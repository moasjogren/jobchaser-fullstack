import { useContext } from "react";
import { AuthContext } from "../_context/AuthContext";
import Link from "next/link";

export default function Nav() {
  const { user, logout } = useContext(AuthContext)!;
  return (
    <nav className="nav">
      {user ? (
        <>
          <Link href={"/jobs"}>
            <button className="nav-button">Jobs</button>
          </Link>
          <Link href={`/account/${user.id}`}>
            <button className="nav-button">Account</button>
          </Link>
          <button className="nav-button" onClick={logout}>
            Sign Out
          </button>
        </>
      ) : (
        <>
          <Link href="/logIn">
            <button className="nav-button">Sign In</button>
          </Link>
          <Link href="/signUp">
            <button className="nav-button">Sign Up</button>
          </Link>
        </>
      )}
    </nav>
  );
}
