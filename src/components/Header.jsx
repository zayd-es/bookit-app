"use client";
import Link from "next/link";
import React, { useState } from "react";
import {
  FaSignInAlt,
  FaUser,
  FaBuilding,
  FaSignOutAlt,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { useRouter, usePathname } from "next/navigation";
import destroySession from "@/app/actions/destroySession";
import { toast } from "react-toastify";
import { useAuth } from "@/context/authContext";

const Header = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, setIsAuthenticated } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    const { success, error } = await destroySession();
    if (success) {
      setIsAuthenticated(false);
      router.push("/login");
    }
    if (error) toast.error(error);
  };

  const linkCls = (href) =>
    `whitespace-nowrap rounded-lg px-3.5 py-2 text-sm font-medium transition-colors ${
      pathname === href
        ? "bg-zinc-900 text-white"
        : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900"
    }`;

  const mobileLinkCls = (href) =>
    `whitespace-nowrap rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
      pathname === href
        ? "bg-zinc-900 text-white border-zinc-900"
        : "text-zinc-600 border-zinc-200 hover:bg-zinc-100 hover:text-zinc-900"
    }`;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-200 bg-white/90 backdrop-blur">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex h-14 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-md bg-zinc-900 flex items-center justify-center">
              <span className="text-white text-xs font-bold">B</span>
            </div>
            <span className="text-sm font-semibold tracking-tight text-zinc-900">
              Bookit
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            <Link href="/" className={linkCls("/")}>
              Rooms
            </Link>
            {isAuthenticated && (
              <>
                <Link href="/bookings" className={linkCls("/bookings")}>
                  Bookings
                </Link>
                <Link href="/rooms/add" className={linkCls("/rooms/add")}>
                  Add Room
                </Link>
                <Link href="/rooms/my" className={linkCls("/rooms/my")}>
                  My Rooms
                </Link>
              </>
            )}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-2">
            {!isAuthenticated ? (
              <>
                <Link
                  href="/login"
                  className="hidden sm:inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm text-zinc-600 hover:bg-zinc-100"
                >
                  <FaSignInAlt /> Login
                </Link>
                <Link
                  href="/register"
                  className="inline-flex items-center gap-1.5 rounded-lg bg-zinc-900 px-3 py-1.5 text-sm font-medium text-white hover:bg-black"
                >
                  <FaUser /> Register
                </Link>
              </>
            ) : (
              <button
                onClick={handleLogout}
                className="hidden md:inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium text-red-600 hover:bg-red-50"
              >
                <FaSignOutAlt /> Sign Out
              </button>
            )}

            {/* Hamburger - Mobile only */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden flex items-center justify-center rounded-lg border border-zinc-200 p-2 text-zinc-600 hover:bg-zinc-100"
            >
              {menuOpen ? <FaTimes size={16} /> : <FaBars size={16} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-zinc-100">
          <div className="mx-auto max-w-6xl px-4 py-3 flex flex-wrap gap-2">
            <Link
              href="/"
              className={mobileLinkCls("/")}
              onClick={() => setMenuOpen(false)}
            >
              Rooms
            </Link>
            {isAuthenticated && (
              <>
                <Link
                  href="/bookings"
                  className={mobileLinkCls("/bookings")}
                  onClick={() => setMenuOpen(false)}
                >
                  Bookings
                </Link>
                <Link
                  href="/rooms/add"
                  className={mobileLinkCls("/rooms/add")}
                  onClick={() => setMenuOpen(false)}
                >
                  Add Room
                </Link>
                <Link
                  href="/rooms/my"
                  className={mobileLinkCls("/rooms/my")}
                  onClick={() => setMenuOpen(false)}
                >
                  My Rooms
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setMenuOpen(false);
                  }}
                  className="whitespace-nowrap rounded-full border border-red-200 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
                >
                  <FaSignOutAlt className="inline mr-1" /> Sign Out
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
