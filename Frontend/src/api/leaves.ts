import { api } from "./client";

export type Leave = {
  _id: string;
  from: string;
  to: string;
  reason: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  decisionNote?: string;
};

export async function myLeaves() {
  const { data } = await api.get("/leaves/mine");
  return data as { items: Leave[] };
}

export async function requestLeave(payload: { from: string; to: string; reason?: string }) {
  const { data } = await api.post("/leaves/request", payload);
  return data as { item: Leave };
}

export async function tlInbox() {
  const { data } = await api.get("/leaves/tl/inbox");
  return data as { items: any[] };
}

export async function tlDecide(payload: { id: string; decision: "APPROVED" | "REJECTED"; note?: string }) {
  const { data } = await api.post("/leaves/tl/decide", payload);
  return data as { item: any };
}