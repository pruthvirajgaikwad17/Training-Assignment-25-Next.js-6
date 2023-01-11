import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

const Navbar = () => {
  const { data: session, status: loading } = useSession();
  console.log(session, loading);
  return (
    <nav className="header">
      <h1 className="logo">
        <a href="#">Online Store</a>
      </h1>
      <ul className={`main-nav`}>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/Store">Store</Link>
        </li>
        <li>
          <Link href="/handbag">Handbag</Link>
        </li>
        {loading === "unauthenticated" && session === null && (
          <li>
            <Link
              href=""
              onClick={(e) => {
                e.preventDefault();
                signIn();
              }}
            >
              Sign In
            </Link>
          </li>
        )}
        {loading === "authenticated" && (
          <li>
            <Link
              href=""
              onClick={(e) => {
                e.preventDefault();
                signOut({ callbackUrl: "http://localhost:3000" });
              }}
            >
              Sign Out
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
