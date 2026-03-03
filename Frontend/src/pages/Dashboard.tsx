import { Box, Grid, Paper, Typography } from "@mui/material";
import { StatCard } from "../ui/StatCard";
import { useAuth } from "../auth/AuthProvider";

export default function Dashboard() {
  const { auth } = useAuth();

  return (
    <Box>
      <Typography variant="h5" fontWeight={900}>Dashboard</Typography>
      <Typography sx={{ color: "text.secondary", mt: 0.5 }}>
        Quick overview for your role.
      </Typography>

      <Grid container spacing={2} sx={{ mt: 1 }}>
        <Grid item xs={12} md={4}><StatCard title="Role" value={auth.role ?? "—"} hint="Access controlled by role" /></Grid>
        <Grid item xs={12} md={4}><StatCard title="Leaves" value="TL approvals" hint="TL approves team requests" /></Grid>
        <Grid item xs={12} md={4}><StatCard title="Shifts" value="Templates" hint="Finance/IT/HR shift templates" /></Grid>
      </Grid>

      <Paper sx={{ mt: 2, p: 3 }}>
        <Typography fontWeight={800}>What’s next?</Typography>
        <Typography sx={{ color: "text.secondary", mt: 0.5 }}>
          Add roster + attendance import + payroll extras (1.5× / 2×) as the next milestone.
        </Typography>
      </Paper>
    </Box>
  );
}