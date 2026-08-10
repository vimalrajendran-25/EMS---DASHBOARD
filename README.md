# Enterprise EMS Portal

A full-stack **Enterprise Employee Management System (EMS)** with role-based dashboards for Super Admin, HR, Finance, and Employees. It covers employee management, attendance tracking, leave management, payroll, notifications, and audit logging — all secured with JWT authentication.

## Features

- **Role-based access** — Super Admin, HR Admin, Finance, Employee
- **Authentication** — JWT-based login with Spring Security
- **Dashboards** — dedicated overview for Admin, HR, and Employee
- **Employee Management** — CRUD, profiles, and directory
- **Attendance** — punch in / punch out, work hours, late & overtime tracking
- **Leave Management** — apply, approve / reject with comments
- **Payroll** — salary slips, earnings, and deduction breakdowns
- **Notifications** — system, leave, and payroll alerts
- **Audit Logs** — track key system actions
- **API Docs** — interactive Swagger UI
- **Seeded Demo Data** — sample users, attendance, leave, payroll, and notifications on first boot

## Tech Stack

### Frontend
- React 18 + TypeScript
- Vite 5
- Tailwind CSS 3
- React Router 6
- Axios
- Recharts
- Lucide React Icons

### Backend
- Java 17
- Spring Boot 3.2
- Spring Security + JWT (jjwt)
- Spring Data JPA
- H2 (default, in-memory) / PostgreSQL (optional)
- Lombok
- springdoc (Swagger UI)

## Project Structure

```
EMS P/
├── backend/                 # Spring Boot REST API
│   ├── pom.xml
│   └── src/main/java/com/ems/portal/
│       ├── config/          # Security, JWT, user details
│       ├── controller/      # REST endpoints
│       ├── service/         # Business logic
│       ├── repository/      # JPA repositories
│       ├── model/           # Entities
│       ├── dto/             # Request/response DTOs
│       └── data/            # Demo data initializer
├── frontend/                # React + Vite SPA
│   └── src/
│       ├── pages/           # Route pages / dashboards
│       ├── components/      # Layout, sidebar, navbar, cards
│       ├── context/         # Auth context
│       ├── services/        # API client
│       └── types/           # TypeScript types
├── run-ems.bat              # Start frontend + backend together
├── run-backend.bat          # Start backend only
└── README.md
```

## How to Run

### Prerequisites
- Java 17+
- Maven 3.6+
- Node.js 18+

### Option 1 — One-click (Windows)
Double-click `run-ems.bat` (starts the Vite dev server on port 3000 and the backend on port 8080).

### Option 2 — Manually

1. **Start the backend**
   ```bash
   cd backend
   mvn spring-boot:run
   ```
   The API runs at `http://localhost:8080`.

2. **Start the frontend**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
   The app runs at `http://localhost:3000` and proxies `/api` to the backend.

### Useful URLs
- Frontend App: `http://localhost:3000`
- Backend API: `http://localhost:8080`
- Swagger UI: `http://localhost:8080/swagger-ui.html`
- H2 Console: `http://localhost:8080/h2-console` (JDBC URL: `jdbc:h2:mem:emsdb`, user: `sa`)

## Demo Credentials

Demo data is seeded automatically on first boot. All accounts use the password `password123`.

| Role        | Email                 |
|-------------|-----------------------|
| Super Admin | admin@ems.com         |
| HR Admin    | hr.admin@ems.com      |
| Finance     | finance@ems.com       |
| Employee    | employee@ems.com      |

> Note: The H2 in-memory database is used by default. To use PostgreSQL, update the datasource settings in `backend/src/main/resources/application.yml`.