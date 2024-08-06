"use client";
import Link from "next/link";
import { useAuth } from "@/app/(utils)/context/AuthContext";

const Header = () => {
  const { isLoggedIn, logout } = useAuth();
  const handleChangeLogout = () => {
    logout();
  };
  return (
    <>
      <nav className="bg-white border-gray-200 dark:bg-gray-900">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-2xl p-4">
          <Link
            href="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              className="h-8"
              alt="Flowbite Logo"
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              My Blog
            </span>
          </Link>
          {!isLoggedIn ? (
            <div className="flex items-center space-x-6 rtl:space-x-reverse">
              <Link
                href="/login"
                className="text-sm  text-blue-600 dark:text-blue-500 hover:underline"
              >
                Login
              </Link>
            </div>
          ) : (
            <div className="flex items-center space-x-6 rtl:space-x-reverse">
              <Link
                href="/dashboard"
                className="text-sm  text-blue-600 dark:text-blue-500 hover:underline"
              >
                Dashboard
              </Link>
              <button
                className="text-sm  text-blue-600 dark:text-blue-500 hover:underline"
                onClick={handleChangeLogout}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default Header;
