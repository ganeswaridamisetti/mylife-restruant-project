# My Life Restaurant & Dhaba — Full Stack Project

A portfolio-ready starter project based on the supplied project brief:
- Backend: Java 17+, Spring Boot 3.5, Spring Web, Spring Data JPA, Validation, MySQL
- Frontend: React + Vite + Bootstrap + Axios + React Router
- Features: restaurant home, menu search/filter, cart, checkout/order placement, order list/status, reviews, admin menu/order management.
- Demo login/register endpoints are included. For real deployment, replace the demo auth with Spring Security/JWT and role-based authorization.

## Requirements
- JDK 17 or newer
- Maven 3.9+ (or use your IDE's Maven support)
- Node.js 20+
- MySQL 8+

## 1. Create database
Run in MySQL:
```sql
CREATE DATABASE mylife_restaurant;
```

## 2. Configure backend
Edit `backend/src/main/resources/application.properties` and set your MySQL username/password.

Run:
```bash
cd backend
mvn spring-boot:run
```
API runs at `http://localhost:9090`.

On startup, the app creates tables and inserts sample menu items if the menu is empty. Sample prices are examples only, not verified restaurant prices.

## 3. Run frontend
Open a second terminal:
```bash
cd frontend
npm install
npm run dev
```
Open the URL printed by Vite (usually `http://localhost:5173`).

## Main API routes
- `GET /api/menu`, `GET /api/menu/{id}`, `POST /api/menu`, `PUT /api/menu/{id}`, `DELETE /api/menu/{id}`
- `POST /api/orders`, `GET /api/orders`, `GET /api/orders/{id}`, `PATCH /api/orders/{id}/status`
- `GET /api/reviews`, `POST /api/reviews`
- `POST /api/auth/register`, `POST /api/auth/login`

## Notes
- This is a learning/portfolio project, not a production-ready payment or security system.
- Demo authentication checks credentials but does not create a persistent session/token. Admin routes are not secured in this starter. Add Spring Security/JWT, password hashing, and server-side authorization before public deployment.
- Orders calculate prices on the backend from the current menu data.
