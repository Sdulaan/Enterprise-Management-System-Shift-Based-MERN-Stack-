import { connectDb } from "../config/db.js";
import { Employee } from "../models/Employee.js";
import { User } from "../models/User.js";
import { ShiftTemplate } from "../models/ShiftTemplate.js";
import { hashPassword } from "../utils/password.js";

await connectDb();

await User.deleteMany({});
await Employee.deleteMany({});
await ShiftTemplate.deleteMany({});

const hrEmp = await Employee.create({
  employeeCode: "HR001",
  fullName: "HR Admin",
  teamType: "HR",
  tlId: null,
  offDayWeekday: 0,
  salary: { dayRate: 5000 }
});

const tlEmp = await Employee.create({
  employeeCode: "ITTL01",
  fullName: "IT Team Lead",
  teamType: "IT",
  tlId: null,
  offDayWeekday: 2,
  salary: { dayRate: 4500 }
});

const emp = await Employee.create({
  employeeCode: "IT1001",
  fullName: "IT Employee",
  teamType: "IT",
  tlId: tlEmp._id,
  offDayWeekday: 4,
  salary: { dayRate: 3500 }
});

await User.create([
  {
    email: "hr@ems.com",
    passwordHash: await hashPassword("Password@123"),
    role: "HR",
    employeeId: hrEmp._id
  },
  {
    email: "tl@ems.com",
    passwordHash: await hashPassword("Password@123"),
    role: "TL",
    employeeId: tlEmp._id
  },
  {
    email: "emp@ems.com",
    passwordHash: await hashPassword("Password@123"),
    role: "EMPLOYEE",
    employeeId: emp._id
  }
]);

await ShiftTemplate.create([
  { teamType: "FINANCE", name: "Finance Morning", start: "06:00", end: "14:00" },
  { teamType: "FINANCE", name: "Finance Evening", start: "14:00", end: "22:00" },
  { teamType: "FINANCE", name: "Finance Night", start: "22:00", end: "06:00" },

  { teamType: "IT", name: "IT Morning", start: "08:00", end: "16:00" },
  { teamType: "IT", name: "IT Night", start: "16:00", end: "00:00" },

  { teamType: "IT", name: "IT TL Shift", start: "12:00", end: "20:00" }
]);

// eslint-disable-next-line no-console
console.log("✅ Seeded users: hr@ems.com / tl@ems.com / emp@ems.com (Password@123)");
process.exit(0);