import React, { createContext, useContext, useMemo, useState } from "react";

type Role = "HR" | "TL" | "EMPLOYEE";
type AuthState = { role: Role | null; token: string | null };

const AuthCtx = createContext<{
  auth: AuthState;
  setAuth: (a: AuthState) => void;
  logout: () => void;
} | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [auth, setAuth] = useState<AuthState>(() => ({
    token: localStorage.getItem("ems_token"),
    role: (localStorage.getItem("ems_role") as Role | null) ?? null
  }));

  const logout = () => {
    localStorage.removeItem("ems_token");
    localStorage.removeItem("ems_role");
    setAuth({ token: null, role: null });
  };

  const value = useMemo(() => ({ auth, setAuth, logout }), [auth]);
  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthCtx);
  if (!ctx) throw new Error("AuthProvider missing");
  return ctx;
}