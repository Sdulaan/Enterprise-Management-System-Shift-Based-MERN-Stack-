import { Box, Divider, List, ListItemButton, ListItemIcon, ListItemText, Paper, Typography } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import EventNoteIcon from "@mui/icons-material/EventNote";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { NavLink } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";

const linkStyle = ({ isActive }: any) => ({
  textDecoration: "none",
  color: "inherit",
  opacity: isActive ? 1 : 0.9
});

export function Sidebar() {
  const { auth } = useAuth();
  const role = auth.role;

  const items = [
    { to: "/", label: "Dashboard", icon: <DashboardIcon /> },
    ...(role === "HR" || role === "TL" ? [{ to: "/employees", label: "Employees", icon: <PeopleIcon /> }] : []),
    { to: "/leaves", label: "Leaves", icon: <EventNoteIcon /> },
    ...(role === "TL" ? [{ to: "/leave-approvals", label: "Approvals", icon: <TaskAltIcon /> }] : []),
    { to: "/shifts", label: "Shifts", icon: <AccessTimeIcon /> }
  ];

  return (
    <Paper elevation={0} sx={{ width: 280, borderRight: "1px solid", borderColor: "grey.200", p: 2, display: { xs: "none", md: "block" } }}>
      <Typography variant="h6" fontWeight={900} sx={{ mb: 1 }}>Company EMS</Typography>
      <Typography variant="body2" sx={{ color: "text.secondary", mb: 2 }}>
        Clean • Fast • Role-based
      </Typography>
      <Divider sx={{ mb: 1 }} />
      <List>
        {items.map((it) => (
          <NavLink key={it.to} to={it.to} style={linkStyle}>
            <ListItemButton sx={{ borderRadius: 3, my: 0.5 }}>
              <ListItemIcon>{it.icon}</ListItemIcon>
              <ListItemText primary={it.label} />
            </ListItemButton>
          </NavLink>
        ))}
      </List>
      <Box sx={{ mt: 2, p: 2, bgcolor: "grey.100", borderRadius: 3 }}>
        <Typography variant="caption" sx={{ color: "text.secondary" }}>
          Tip: Use filters + search to manage 1000+ staff quickly.
        </Typography>
      </Box>
    </Paper>
  );
}