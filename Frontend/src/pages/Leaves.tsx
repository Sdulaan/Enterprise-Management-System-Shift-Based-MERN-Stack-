import { Box, Button, Paper, Stack, TextField, Typography } from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { myLeaves, requestLeave } from "../api/leaves";
import { PageHeader } from "../ui/PageHeader";
import { useState } from "react";

export default function Leaves() {
  const qc = useQueryClient();
  const { data } = useQuery({ queryKey: ["myLeaves"], queryFn: myLeaves });
  const items = data?.items ?? [];

  const [from, setFrom] = useState(new Date().toISOString().slice(0, 16));
  const [to, setTo] = useState(new Date().toISOString().slice(0, 16));
  const [reason, setReason] = useState("");

  const m = useMutation({
    mutationFn: () => requestLeave({ from: new Date(from).toISOString(), to: new Date(to).toISOString(), reason }),
    onSuccess: () => {
      setReason("");
      qc.invalidateQueries({ queryKey: ["myLeaves"] });
    }
  });

  return (
    <Box>
      <PageHeader title="Leaves" subtitle="Request leave and track approvals." />

      <Paper sx={{ p: 2, mt: 2 }}>
        <Typography fontWeight={800}>Request Leave</Typography>
        <Stack direction={{ xs: "column", md: "row" }} spacing={2} sx={{ mt: 2 }}>
          <TextField type="datetime-local" label="From" value={from} onChange={(e) => setFrom(e.target.value)} />
          <TextField type="datetime-local" label="To" value={to} onChange={(e) => setTo(e.target.value)} />
          <TextField fullWidth label="Reason" value={reason} onChange={(e) => setReason(e.target.value)} />
          <Button variant="contained" onClick={() => m.mutate()} disabled={m.isPending}>Submit</Button>
        </Stack>
        {m.error && <Typography color="error" sx={{ mt: 1 }}>Failed</Typography>}
      </Paper>

      <Paper sx={{ p: 2, mt: 2 }}>
        <Typography fontWeight={800}>My Requests</Typography>
        <Stack spacing={1} sx={{ mt: 1 }}>
          {items.map((it) => (
            <Paper key={it._id} variant="outlined" sx={{ p: 2, borderRadius: 3 }}>
              <Typography fontWeight={800}>{it.status}</Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                {new Date(it.from).toLocaleString()} → {new Date(it.to).toLocaleString()}
              </Typography>
              {it.decisionNote && <Typography variant="body2" sx={{ mt: 1 }}>{it.decisionNote}</Typography>}
            </Paper>
          ))}
          {items.length === 0 && <Typography sx={{ color: "text.secondary" }}>No leave requests yet.</Typography>}
        </Stack>
      </Paper>
    </Box>
  );
}