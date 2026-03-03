import { Route, Routes, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Employees from "./pages/Employees";
import Leaves from "./pages/Leaves";
import LeaveApprovals from "./pages/LeaveApprovals";
import Shifts from "./pages/Shifts";
import { RequireAuth } from "./auth/RequireAuth";
import { AppShell } from "./layout/AppShell";

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route
        path="/"
        element={
          <RequireAuth>
            <AppShell>
              <Dashboard />
            </AppShell>
          </RequireAuth>
        }
      />

      <Route
        path="/employees"
        element={
          <RequireAuth roles={["HR", "TL"]}>
            <AppShell>
              <Employees />
            </AppShell>
          </RequireAuth>
        }
      />

      <Route
        path="/leaves"
        element={
          <RequireAuth>
            <AppShell>
              <Leaves />
            </AppShell>
          </RequireAuth>
        }
      />

      <Route
        path="/leave-approvals"
        element={
          <RequireAuth roles={["TL"]}>
            <AppShell>
              <LeaveApprovals />
            </AppShell>
          </RequireAuth>
        }
      />

      <Route
        path="/shifts"
        element={
          <RequireAuth>
            <AppShell>
              <Shifts />
            </AppShell>
          </RequireAuth>
        }
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}