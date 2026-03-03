import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { useAuth } from "../auth/AuthProvider";

export function Topbar() {
  const { auth, logout } = useAuth();

  return (
    <AppBar position="sticky" elevation={0} sx={{ bgcolor: "white", color: "text.primary", borderBottom: "1px solid", borderColor: "grey.200" }}>
      <Toolbar sx={{ display: "flex", gap: 2 }}>
        <Typography fontWeight={800}>EMS</Typography>
        <Box sx={{ flex: 1 }} />
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          Role: {auth.role ?? "—"}
        </Typography>
        <Button variant="outlined" onClick={logout}>Logout</Button>
      </Toolbar>
    </AppBar>
  );
}