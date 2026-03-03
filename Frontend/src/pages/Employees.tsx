import { Box, Chip, Paper, Stack, TextField, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { listEmployees } from "../api/employees";
import { useState } from "react";
import { PageHeader } from "../ui/PageHeader";
import { EmptyState } from "../ui/EmptyState";

export default function Employees() {
  const [q, setQ] = useState("");
  const [teamType, setTeamType] = useState<string>("");

  const { data, isLoading } = useQuery({
    queryKey: ["employees", q, teamType],
    queryFn: () => listEmployees({ q, teamType })
  });

  const items = data?.items ?? [];

  return (
    <Box>
      <PageHeader title="Employees" subtitle="Search and filter employees quickly (1000+ friendly)." />

      <Paper sx={{ p: 2, mt: 2 }}>
        <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
          <TextField fullWidth label="Search (name or code)" value={q} onChange={(e) => setQ(e.target.value)} />
          <Stack direction="row" spacing={1}>
            {["", "IT", "FINANCE", "HR"].map((t) => (
              <Chip
                key={t || "ALL"}
                label={t || "All"}
                color={teamType === t ? "primary" : "default"}
                onClick={() => setTeamType(t)}
              />
            ))}
          </Stack>
        </Stack>
      </Paper>

      <Paper sx={{ p: 2, mt: 2 }}>
        {isLoading ? (
          <Typography>Loading...</Typography>
        ) : items.length === 0 ? (
          <EmptyState title="No employees found" subtitle="Try changing filters or search text." />
        ) : (
          <Stack spacing={1}>
            {items.map((e) => (
              <Paper key={e._id} variant="outlined" sx={{ p: 2, borderRadius: 3 }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Box>
                    <Typography fontWeight={800}>{e.fullName}</Typography>
                    <Typography variant="body2" sx={{ color: "text.secondary" }}>
                      {e.employeeCode} • {e.teamType} • Day Rate: {e.salary.dayRate}
                    </Typography>
                  </Box>
                  <Chip label="Active" />
                </Stack>
              </Paper>
            ))}
          </Stack>
        )}
      </Paper>
    </Box>
  );
}