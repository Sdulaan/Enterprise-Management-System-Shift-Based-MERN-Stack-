# Enterprise Management System (Shift-Based) — MERN Stack

An enterprise-ready **Employee Management System (EMS)** built with the **MERN stack** (MongoDB, Express, React, Node.js) for large organizations (1000+ employees).  
This system focuses on **shift-based workforce operations**, **leave approvals**, and **role-based access** with a clean, user-friendly UI.

> Current Roles: **HR**, **Team Lead (TL)**, **Employee**  
> Manager role is intentionally excluded in V1 (can be added later).

---

## ✨ Key Features

### 🔐 Authentication & Authorization
- JWT-based authentication
- Role-based access control (HR / TL / Employee)
- Protected frontend routes

### 👥 Employee Management
- Employee directory (search + filter)
- Team/type assignment (Finance / IT / HR)
- TL mapping for approval routing

### 🗓 Leave Management
- Employees can request leave
- **TL approves/rejects leave** for team members
- Leave history and approval notes

### ⏱ Shift Templates (Configurable)
- Finance shifts (3): 06:00–14:00, 14:00–22:00, 22:00–06:00
- IT shifts (2): 08:00–16:00, 16:00–00:00
- IT TL shift: 12:00–20:00
- HR shift: configurable (to be confirmed)

### 📌 Planned Enhancements (Next Milestones)
- Monthly rosters + IT shift rotation rules
- Attendance import (fingerprint scanner → CSV)
- Holiday calendar (Poya / Mercantile) & pay multipliers
- Attendance bonus eligibility logic
- Document management (secure uploads + access control)
- Reports & exports (CSV)

---

## 🧱 Tech Stack

**Frontend**
- React + TypeScript (TSX)
- Vite
- Material UI (MUI)
- React Router
- React Query
- Axios

**Backend**
- Node.js + Express
- MongoDB + Mongoose
- Zod validation
- Helmet + CORS

---

## 📁 Project Structure
