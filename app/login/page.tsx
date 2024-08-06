"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Header from "@/app/(components)/Header";
import { useAuth } from "../(utils)/context/AuthContext";
import { apiHandler } from "@/app/(utils)/api/APIHandler";
import { toast } from "react-toastify";
import { redirect } from "next/navigation";

const Login = () => {
  const { login, isLoggedIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  useEffect(() => {
    if (isLoggedIn) {
      redirect("/");
    }
  }, [isLoggedIn]);
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = await apiHandler<any>("POST", "/login", {
        email: email,
        password: password,
      });
      if (data.success === false) {
        toast.error(data.error.error);
      } else {
        toast.success("User Logged In Successfully");
        login(data?.data.authorId); // No need to pass token, it will be handled by cookies
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
            Login
          </h2>
          <form onSubmit={handleLogin} className="space-y-4">
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
            <button
              type="submit"
              className="w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Login
            </button>
            <div className="text-sm">
              New user?{" "}
              <Link href="/signup">
                <span className="text-blue-500 hover:text-blue-700 cursor-pointer">
                  Signup
                </span>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
