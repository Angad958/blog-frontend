"use client";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useMemo,
} from "react";
import { navigate } from "../navigation/navigation";
import Cookies from "js-cookie";

interface AuthContextProps {
  isLoggedIn: boolean;
  login: (id: string) => void;
  logout: () => void;
  authorId: string;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authorId, setAuthorId] = useState("");

  useEffect(() => {
    // Check if the token and authorId are stored in cookies on initial load
    const storedToken = Cookies.get("idToken");
    const storedAuthorId = Cookies.get("authorId");
    if (storedToken) {
      setIsLoggedIn(true);
      if (storedAuthorId) {
        setAuthorId(storedAuthorId);
      }
    }
  }, []);

  const login = (id: string) => {
    setIsLoggedIn(true);
    setAuthorId(id);
    Cookies.set("authorId", id, {
      expires: 7,
      secure: true,
      sameSite: "Strict",
    }); // Store authorId in cookies
    navigate("/dashboard");
  };

  const logout = () => {
    Cookies.remove("idToken");
    Cookies.remove("authorId");
    setIsLoggedIn(false);
    setAuthorId("");
    navigate("/login");
  };

  const contextValue = useMemo(
    () => ({
      isLoggedIn,
      login,
      logout,
      authorId,
    }),
    [isLoggedIn, authorId]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
