import { Box, Typography } from "@mui/material";

export function PageHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <Box>
      <Typography variant="h5" fontWeight={900}>{title}</Typography>
      <Typography sx={{ color: "text.secondary", mt: 0.5 }}>{subtitle}</Typography>
    </Box>
  );
}