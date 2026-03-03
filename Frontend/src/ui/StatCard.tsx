import { Paper, Typography } from "@mui/material";

export function StatCard({ title, value, hint }: { title: string; value: string; hint: string }) {
  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="body2" sx={{ color: "text.secondary" }}>{title}</Typography>
      <Typography variant="h6" fontWeight={900} sx={{ mt: 0.5 }}>{value}</Typography>
      <Typography variant="body2" sx={{ color: "text.secondary", mt: 0.5 }}>{hint}</Typography>
    </Paper>
  );
}