import { Box, Typography } from "@mui/material";

export function EmptyState({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <Box sx={{ p: 4, textAlign: "center" }}>
      <Typography fontWeight={900}>{title}</Typography>
      <Typography sx={{ color: "text.secondary", mt: 0.5 }}>{subtitle}</Typography>
    </Box>
  );
}