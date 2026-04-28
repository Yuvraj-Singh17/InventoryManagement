# Inventory Management System for Small Business

Full-stack Inventory Management System built with React.js frontend and Java Spring Boot backend.

## Features

- JWT authentication and role-based access control
- Product, stock, sales, purchase, supplier, invoice, and report management
- Responsive premium dashboard UI
- RESTful APIs with Spring Data JPA and MySQL
- Charts for revenue analytics

## Structure

- `/backend` - Spring Boot application
- `/frontend` - React application

## Setup

### Backend

1. Configure database credentials in `backend/src/main/resources/application.properties`
2. Run `mvn clean package` from `/backend`
3. Start the app with `mvn spring-boot:run`

### Frontend

1. Install dependencies: `npm install` from `/frontend`
2. Run `npm run dev`

## Notes

This project is designed for small businesses to manage inventory, suppliers, sales, purchases, invoices, and analytics in a modern SaaS-style interface.
