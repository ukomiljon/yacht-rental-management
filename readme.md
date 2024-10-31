 

![image](https://github.com/user-attachments/assets/dfd953b5-2963-4fb8-9778-6f60be73937b)

# Yacht Rental Management System

## Project Overview
The Yacht Rental Management architecture addresses scalability, modularity, and performance by distributing functionality across multiple specialized services. Each microservice manages its domain independently, enhancing operational flexibility and fault isolation.

## Architecture & Technologies
- **API Gateway**: The entry point for all services, consolidating multiple endpoints and managing traffic.
  
- **Microservices**:
  - **Authentication Service**: Manages user authentication and authorization.
  - **User Management Service**: Handles user data and profiles.
  - **Booking Service**: Manages reservations, cancellations, and availability.
  - **Payment Processing Service**: Integrates with payment gateways for transactions.
  - **Inventory Service**: Manages yacht listings and availability using PostgreSQL with Prisma.
  - **OpenAI Service**: Integrates ChatGPT to assist users with queries in natural language.

- **Asynchronous Communication**: Utilizes RabbitMQ for reliable, non-blocking service communication.

## Database Choices
- **PostgreSQL with Prisma**: Structured management of user data and bookings.
- **MongoDB (TypeORM)**: Flexible handling of payment data.

## Security Measures
- **OAuth2 with JWT**: Secure, stateless user authentication.
- **Input Validation**: Mitigates SQL injection vulnerabilities.
- **CSRF Protection**: Ensures authenticated requests.
- **XSS Mitigation**: Input sanitization to prevent harmful scripts.

## Features
### Authentication Service
- **User Signup**: Create new accounts with personal details.
- **User Signin**: Access accounts for registered customers.
- **Password Management**: Securely reset and update passwords.
- **User Session Management**: Maintains secure access to protected resources.

### Booking Service
- **Ticket Booking**: Enables users to book travel tickets.
- **Ticket Cancellation**: Allows users to cancel booked tickets.
- **Ticket Update**: Allows users to update booked tickets.

### Additional Features
- **RabbitMQ Communication**: Reliable and asynchronous message processing.
- **CQRS Implementation**: Separates read/write operations for scalability.
- **Stripe Integration**: Secure payment processing (In progress).
- **Redis Caching**: Enhances response times and reduces database load.
- **Compression**: Reduces payload sizes for optimized bandwidth.
- **Helmet**: Sets security-related HTTP headers.
- **Rate Limiting**: Prevents abuse and maintains performance.
- **CORS**: Enables secure cross-origin requests.
- **Dockerization**: Ensures consistent service deployment.
- **Husky for Development**: Streamlines development workflows.
- **Inter-service Communication (Intersop)**: Enhances performance and fault tolerance.
- **Error Filtering**: Centralizes error handling for better user experience.
- **OpenAI Service**: Integrates ChatGPT for optimal user assistance (Not started yet).

## Summary Table of Technologies and Rationale
| Component                  | Technology            | Rationale                                                                                | Status         |
|----------------------------|-----------------------|-----------------------------------------------------------------------------------------|----------------|
| API Gateway                | NestJS                | Unified access and security enforcement.                                               | ✔️             |
| Messaging                  | RabbitMQ              | Enables asynchronous communication.                                                    | ✔️             |
| User & Booking Database     | PostgreSQL + Prisma   | Ensures relational integrity with easy querying.                                       | ✔️             |
| Payment Database           | MongoDB               | Flexible schema-less storage for high transaction volume.                              | ✔️ (In progress) |
| Authentication & Security  | JWT, Redis, bcrypt    | Secure authentication with session caching.                                           | ✔️             |
| Framework                  | NestJS                | Modular framework optimized for microservices.                                        | ✔️             |
| ORM                        | Prisma & TypeORM      | Type-safe SQL queries and simplified database access.                                 | ✔️             |



## Technologies Used
- **TypeScript**
- **Node.js**
- **Nest.js**
- **MongoDB (TypeORM)**
- **PostgreSQL (Prisma)**
- **RabbitMQ (Message Queue)**
- **JSON Web Tokens (JWT)**
- **bcrypt.js**
- **Google Gmail (for Notification Service)**




1. docker compose down   

2. docker compose up --build
