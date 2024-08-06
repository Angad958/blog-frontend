"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Header from "@/app/(components)/Header";
import { navigate } from "@/app/(utils)/navigation/navigation";
import { toast } from "react-toastify";
import { apiHandler } from "@/app/(utils)/api/APIHandler";
import { useAuth } from "@/app/(utils)/context/AuthContext";

const Signup = () => {
  const [email, setEmail] = useState("");
  const { isLoggedIn } = useAuth();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn]);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    try {
      const data = await apiHandler<any>("POST", "/signup", {
        email: email,
        password: password,
      });
      if (data.success) {
        toast.success(data?.data.message);
        navigate("/login");
      } else {
        console.log(data, "data");
        toast.error(data.error.error);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Header />
      <div className="flex items-center justify-center min-h-screen text-black">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm w-[95%]">
          <h2 className="text-2xl font-bold mb-6 text-center text-black">
            Sign Up
          </h2>
          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value as string)}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value as string)}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter your password"
              />
            </div>
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value as string)}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Confirm your password"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign Up
            </button>
            <div className="text-sm">
              Already a user?{" "}
              <Link href="/login">
                <span className="text-blue-500 hover:text-blue-700 cursor-pointer">
                  Login
                </span>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
