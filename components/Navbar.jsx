"use client";
import { useTanstack } from "@/providers/TanstackProvider";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { AiOutlineMenu, AiOutlineClose, AiOutlineLogin } from "react-icons/ai"; // Icons for mobile menu and login

const Navbar = () => {
  const { user, logout, cart } = useTanstack();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="fixed z-50 w-full bg-white shadow-md">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        <Link
          href="/"
          aria-label="logo"
          className="flex space-x-2 items-center"
        >
          <span className="text-2xl font-bold text-yellow-900">
            Tailus <span className="text-yellow-700">Feedus</span>
          </span>
        </Link>

        {/* Mobile Menu Toggle */}
        <div className="lg:hidden">
          <button onClick={toggleMobileMenu} aria-label="Toggle Mobile Menu">
            {isMobileMenuOpen ? (
              <AiOutlineClose size={24} />
            ) : (
              <AiOutlineMenu size={24} />
            )}
          </button>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center space-x-8">
          <Link
            href="/all-recipes"
            className="text-yellow-900 hover:text-yellow-600 transition"
          >
            All Recipes
          </Link>
          <Link
            href="/cart"
            className="flex items-center gap-2 text-yellow-900 hover:text-yellow-600 transition"
          >
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
              <Link
                href="/login"
                className="flex items-center gap-2 text-yellow-900 bg-yellow-400 px-4 py-2 rounded font-bold hover:bg-yellow-500 transition-all duration-200"
              >
                Login
                <AiOutlineLogin size={18} />
              </Link>
              <Link
                href="/signup"
                className="bg-yellow-400 text-black font-bold py-2 px-4 rounded hover:bg-yellow-500"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white shadow-md">
          <div className="flex flex-col items-start space-y-4 p-4">
            <Link
              href="/all-recipes"
              className="text-yellow-900 hover:text-yellow-600 transition"
              onClick={toggleMobileMenu}
            >
              All Recipes
            </Link>
            <Link
              href="/cart"
              className="flex items-center gap-2 text-yellow-900 hover:text-yellow-600 transition"
              onClick={toggleMobileMenu}
            >
              Cart
              {cart.length > 0 && (
                <span className="bg-yellow-400 text-black font-bold rounded-full w-6 h-6 flex items-center justify-center text-sm">
                  {cart.length}
                </span>
              )}
            </Link>
            {user ? (
              <button
                onClick={() => {
                  handleLogout();
                  toggleMobileMenu();
                }}
                className="bg-yellow-400 text-black font-bold py-2 px-4 rounded hover:bg-yellow-500 w-full text-left"
              >
                Logout
              </button>
            ) : (
              <>
                <div className="flex flex-col gap-4">
                  <Link
                    href="/login"
                    className="flex items-center gap-2 text-yellow-900 bg-yellow-400 px-4 py-2 rounded font-bold hover:bg-yellow-500 transition-all duration-200 w-full"
                    onClick={toggleMobileMenu}
                  >
                    <AiOutlineLogin size={18} />
                    Login
                  </Link>
                  <Link
                    href="/signup"
                    className="bg-yellow-400 text-black font-bold py-2 px-4 rounded hover:bg-yellow-500 w-full text-left"
                    onClick={toggleMobileMenu}
                  >
                    Sign Up
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
