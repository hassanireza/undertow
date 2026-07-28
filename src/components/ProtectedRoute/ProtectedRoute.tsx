import type { ReactElement } from "react";
import { Navigate, Outlet } from "react-router-dom";

import { AuthService } from "@/services/AuthService";

const authService = new AuthService();

export function ProtectedRoute(): ReactElement {
  if (!authService.isAuthenticated()) {
    return <Navigate to="/portal/login" replace />;
  }
  return <Outlet />;
}
