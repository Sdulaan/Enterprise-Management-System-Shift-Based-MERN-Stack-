import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { login } from "../api/auth";
import { useAuth } from "../auth/AuthProvider";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("hr@ems.com");
  const [password, setPassword] = useState("Password@123");
  const [err, setErr] = useState<string | null>(null);
  const { setAuth } = useAuth();
  const nav = useNavigate();

  const onSubmit = async () => {
    setErr(null);
    try {
      const data = await login(email, password);
      localStorage.setItem("ems_token", data.token);
      localStorage.setItem("ems_role", data.role);
      setAuth({ token: data.token, role: data.role });
      nav("/");
    } catch (e: any) {
      setErr(e?.response?.data?.message ?? "Login failed");
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", display: "grid", placeItems: "center", bgcolor: "grey.50", p: 2 }}>
      <Paper sx={{ width: "min(520px, 92vw)", p: 4 }}>
        <Typography variant="h5" fontWeight={900}>Welcome back</Typography>
        <Typography sx={{ color: "text.secondary", mt: 0.5 }}>
          Sign in to manage shifts, leaves, and employees.
        </Typography>

        <Box sx={{ mt: 3, display: "grid", gap: 2 }}>
          <TextField label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <TextField label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          {err && <Typography color="error">{err}</Typography>}
          <Button size="large" variant="contained" onClick={onSubmit}>Sign In</Button>

          <Box sx={{ mt: 1, bgcolor: "grey.100", p: 2, borderRadius: 3 }}>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              Seeded users: <b>hr@ems.com</b>, <b>tl@ems.com</b>, <b>emp@ems.com</b> (Password@123)
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}