import { Box, Button, Paper, Stack, TextField, Typography } from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { tlInbox, tlDecide } from "../api/leaves";
import { PageHeader } from "../ui/PageHeader";
import { useState } from "react";

export default function LeaveApprovals() {
  const qc = useQueryClient();
  const { data } = useQuery({ queryKey: ["tlInbox"], queryFn: tlInbox });
  const items = data?.items ?? [];

  const [note, setNote] = useState("");

  const m = useMutation({
    mutationFn: (payload: { id: string; decision: "APPROVED" | "REJECTED" }) => tlDecide({ ...payload, note }),
    onSuccess: () => {
      setNote("");
      qc.invalidateQueries({ queryKey: ["tlInbox"] });
    }
  });

  return (
    <Box>
      <PageHeader title="Approvals" subtitle="Approve or reject your team leave requests." />

      <Paper sx={{ p: 2, mt: 2 }}>
        <Stack direction={{ xs: "column", md: "row" }} spacing={2} alignItems="center">
          <TextField fullWidth label="Decision note (optional)" value={note} onChange={(e) => setNote(e.target.value)} />
          <Typography sx={{ color: "text.secondary" }}>{items.length} pending</Typography>
        </Stack>
      </Paper>

      <Stack spacing={1} sx={{ mt: 2 }}>
        {items.map((it: any) => (
          <Paper key={it._id} sx={{ p: 2, borderRadius: 3 }}>
            <Typography fontWeight={900}>{it.employeeId?.fullName ?? "Employee"}</Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              {new Date(it.from).toLocaleString()} → {new Date(it.to).toLocaleString()}
            </Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>{it.reason}</Typography>
            <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
              <Button variant="contained" onClick={() => m.mutate({ id: it._id, decision: "APPROVED" })}>Approve</Button>
              <Button variant="outlined" color="error" onClick={() => m.mutate({ id: it._id, decision: "REJECTED" })}>Reject</Button>
            </Stack>
          </Paper>
        ))}
        {items.length === 0 && (
          <Paper sx={{ p: 3 }}>
            <Typography sx={{ color: "text.secondary" }}>No pending approvals.</Typography>
          </Paper>
        )}
      </Stack>
    </Box>
  );
}