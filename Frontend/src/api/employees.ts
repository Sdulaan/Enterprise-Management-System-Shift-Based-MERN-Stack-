import { api } from "./client";

export type Employee = {
  _id: string;
  employeeCode: string;
  fullName: string;
  teamType: "FINANCE" | "IT" | "HR";
  offDayWeekday: number;
  salary: { dayRate: number };
};

export async function listEmployees(params: { q?: string; teamType?: string }) {
  const { data } = await api.get("/employees", { params });
  return data as { items: Employee[] };
}