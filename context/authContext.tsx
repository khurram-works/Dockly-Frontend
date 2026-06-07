"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useState,
} from "react";
import { logoutUser } from "@/api/auth";
import { clearSessionMarker } from "@/lib/sessionCookie";

interface Company {
  id: string;
  email: string;
}

interface AuthContextType {
  company: Company | null;
  setCompany: (company: Company | null) => void;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [company, setCompanyState] = useState<Company | null>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("company");
      return stored ? JSON.parse(stored) : null;
    }
    return null;
  });

  const setCompany = (companyData: Company | null) => {
    if (companyData) {
      localStorage.setItem("company", JSON.stringify(companyData));
    } else {
      localStorage.removeItem("company");
    }
    setCompanyState(companyData);
  };

  const logout = async () => {
    try {
      await logoutUser();
    } catch {
      // cookies may already be cleared
    }
    clearSessionMarker();
    setCompany(null);
  };

  return (
    <AuthContext.Provider value={{ company, setCompany, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
}
