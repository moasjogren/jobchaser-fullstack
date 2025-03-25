"use client";

import Link from "next/link";
import Nav from "./Nav";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  return (
    <header className="header">
      <div className="header-content">
        <Link href="/">
          <h1 className="header-logo">
            Job<span>Chaser</span>
          </h1>
        </Link>
        <Nav />
        <ThemeToggle />
      </div>
    </header>
  );
}
