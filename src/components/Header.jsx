"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import logo from "../../public/images/logo.svg";
import { FaSignInAlt, FaUser, FaBuilding, FaSignOutAlt } from "react-icons/fa";
import { useRouter, usePathname } from "next/navigation";
import destroySession from "@/app/actions/destroySession";
import { toast } from "react-toastify";
import { useAuth } from "@/context/authContext";

const Header = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, setIsAuthenticated } = useAuth();

  const handleLogout = async () => {
    const { success, error } = await destroySession();
    if (success) {
      setIsAuthenticated(false);
      router.push("/login");
    }
    if (error) toast.error(error);
  };

  const linkCls = (href) =>
    `whitespace-nowrap rounded-lg px-3.5 py-2 text- font-medium transition-colors ${
      pathname === href
       ? "bg-zinc-900 text-white"
        : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900"
    }`;

  return (
    <header className="sticky py-2 top-0 z-50 w-full border-b border-zinc-200 bg-white/90 backdrop-blur">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image width={26} height={26} className="h-6 w-6" src={logo} alt="Bookit" />
            <span className="text- font-semibold tracking-tight text-zinc-900">Bookit</span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            <Link href="/" className={linkCls("/")}>Rooms</Link>
            {isAuthenticated && (
              <>
                <Link href="/bookings" className={linkCls("/bookings")}>Bookings</Link>
                <Link href="/rooms/add" className={linkCls("/rooms/add")}>Add Room</Link>
                <Link href="/rooms/my" className={linkCls("/rooms/my")}>My Rooms</Link>
              </>
            )}
          </div>

          <div className="flex items-center gap-1.5">
            {!isAuthenticated? (
              <>
                <Link href="/login" className="hidden sm:inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm text-zinc-600 hover:bg-zinc-100">
                  <FaSignInAlt className="text-" /> Login
                </Link>
                <Link href="/register" className="inline-flex items-center gap-1.5 rounded-lg bg-zinc-900 px-3 py-1.5 text-sm font-medium text-white hover:bg-black">
                  <FaUser className="text-" /> Register
                </Link>
              </>
            ) : (
              <button onClick={handleLogout} className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium text-red-600 hover:bg-red-50">
                <FaSignOutAlt className="text-" /> Sign Out
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="border-t border-zinc-100 md:hidden">
        <div className="mx-auto max-w-6xl px-2">
          <div className="flex gap-1.5 overflow-x-auto py-2 scrollbar-hide">
            <Link href="/" className={linkCls("/")}>Rooms</Link>
            {isAuthenticated && (
              <>
                <Link href="/bookings" className={linkCls("/bookings")}>Bookings</Link>
                <Link href="/rooms/add" className={linkCls("/rooms/add")}>Add Room</Link>
                <Link href="/rooms/my" className={linkCls("/rooms/my")}>My Rooms</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;