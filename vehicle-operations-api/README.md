# Vehicle Operations API

A REST API for managing vehicle operations. This API allows you to categorize vehicles by type and associate each type with daily schedules that specify routes the vehicles must follow.

## Technologies Used

-  Node.js
-  TypeScript
-  Fastify (REST framework)
-  Prisma (ORM)
-  PostgreSQL (Database)
-  Zod (Validation)
-  Docker

## Database Schema

The database schema includes the following models:

-  **Vehicle**: Individual vehicle details
-  **VehicleOperation**: Operations that require specific vehicles
-  **VehicleType**: Categories of vehicles
-  **VehicleAllocation**: Association of vehicle types with operations
-  **Route**: Routes that vehicles follow
-  **Schedule**: Daily schedules for vehicle types

## Setup

### Prerequisites

-  Node.js (v18 or higher)
-  Docker and Docker Compose
-  PostgreSQL (if running without Docker)

### Installation

1. Clone the repository:
