import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";

export function RequireAuth({ children, roles }: { children: React.ReactNode; roles?: Array<"HR" | "TL" | "EMPLOYEE"> }) {
  const { auth } = useAuth();
  if (!auth.token) return <Navigate to="/login" replace />;
  if (roles && auth.role && !roles.includes(auth.role)) return <Navigate to="/" replace />;
  return <>{children}</>;
}