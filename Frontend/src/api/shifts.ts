import { api } from "./client";

export async function listShiftTemplates(teamType?: string) {
  const { data } = await api.get("/shifts/templates", { params: { teamType } });
  return data as { items: Array<{ _id: string; teamType: string; name: string; start: string; end: string }> };
}