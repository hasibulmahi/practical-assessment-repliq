"use client";
import { useTanstack } from "@/providers/TanstackProvider";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const { user, logout, cart } = useTanstack(); // Include cart from useTanstack
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push("/login"); // Redirect to login page after logout
  };

  return (
    <nav className="fixed z-50 w-full bg-white md:absolute md:bg-transparent">
      <div className="container m-auto px-2 md:px-12 lg:px-7">
        <div className="flex flex-wrap items-center justify-between py-3 gap-6 md:py-4 md:gap-0">
          <div className="w-full px-6 flex justify-between lg:w-max md:px-0 z-30">
            <Link href="/" aria-label="logo" className="flex space-x-2 items-center">
              <span className="text-2xl font-bold text-yellow-900">
                Tailus <span className="text-yellow-700">Feedus</span>
              </span>
            </Link>
          </div>

          <div className="hidden flex-col lg:flex lg:flex-row justify-end z-30 items-center gap-y-6 p-6 rounded-xl bg-white lg:gap-8 lg:bg-transparent lg:p-0">
            <Link href="/all-recipes" className="text-yellow-900 hover:text-yellow-600 transition">
              All Recipes
            </Link>
            <Link href="/cart" className="flex items-center gap-2 text-yellow-900 hover:text-yellow-600 transition">
              Cart
              {cart.length > 0 && (
                <span className="bg-yellow-400 text-black font-bold rounded-full w-6 h-6 flex items-center justify-center text-sm">
                  {cart.length}
                </span>
              )}
            </Link>
            {user ? (
              <button 
                onClick={handleLogout} 
                className="bg-yellow-400 text-black font-bold py-2 px-4 rounded hover:bg-yellow-500"
              >
                Logout
              </button>
            ) : (
              <>
                <Link href="/login" className="text-yellow-900 hover:text-yellow-600 transition">
                  Login
                </Link>
                <Link href="/signup" className="bg-yellow-400 text-black font-bold py-2 px-4 rounded hover:bg-yellow-500">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
