import { Box, Chip, Paper, Stack, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { listShiftTemplates } from "../api/shifts";
import { PageHeader } from "../ui/PageHeader";
import { useState } from "react";

export default function Shifts() {
  const [teamType, setTeamType] = useState<string>("");

  const { data, isLoading } = useQuery({
    queryKey: ["shiftTemplates", teamType],
    queryFn: () => listShiftTemplates(teamType || undefined)
  });

  const items = data?.items ?? [];

  return (
    <Box>
      <PageHeader title="Shifts" subtitle="View shift templates (configurable later by HR)." />

      <Paper sx={{ p: 2, mt: 2 }}>
        <Stack direction="row" spacing={1}>
          {["", "FINANCE", "IT", "HR"].map((t) => (
            <Chip key={t || "ALL"} label={t || "All"} color={teamType === t ? "primary" : "default"} onClick={() => setTeamType(t)} />
          ))}
        </Stack>
      </Paper>

      <Paper sx={{ p: 2, mt: 2 }}>
        {isLoading ? (
          <Typography>Loading...</Typography>
        ) : (
          <Stack spacing={1}>
            {items.map((s) => (
              <Paper key={s._id} variant="outlined" sx={{ p: 2, borderRadius: 3 }}>
                <Typography fontWeight={900}>{s.name}</Typography>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  {s.teamType} • {s.start} → {s.end}
                </Typography>
              </Paper>
            ))}
          </Stack>
        )}
      </Paper>
    </Box>
  );
}