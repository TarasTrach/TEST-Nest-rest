<p align="center">
  <a href="https://nestjs.com/" target="_blank">
    <img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" />
  </a>
</p>

# TEST Task with Several Endpoints

A small demo project showcasing multiple REST endpoints built with NestJS and TypeORM, running in Docker.

---

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Installation](#installation)
3. [Running the Project](#running-the-project)
4. [Configuration](#configuration)
5. [Testing](#testing)
6. [Database Viewer](#database-viewer)

---

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** v23
- **Docker** (for running the database container)
- **npm** (comes with Node.js)

---

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/TarasTrach/TEST-Nest-rest.git
   cd <your-project-folder>
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

---

## Running the Project

Make sure your Docker daemon is running, then start the application:

```bash
npm run start:dev
```

The server will be available at `http://localhost:3001` (or as defined by `API_URL`).

---

## Configuration

An `.env` file is in the project root but example:

```env
PORT=3001

DB_HOST=localhost
DB_PORT=5433
DB_USER=nest
DB_PASSWORD=nest
DB_NAME=test_db
```

---

## Testing

Import the provided Postman collection to test the endpoints:

```
/test/postman_collection.json
```

Use `{{API_URL}}` as the base URL in your Postman environment.

---

## Database Viewer

To browse your database tables, you can use any SQL client. We recommend **TablePlus** for a seamless experience:

- [TablePlus](https://tableplus.com/)

Alternatively, feel free to use **DBeaver**, **DataGrip**, or **Beekeeper Studio**.

---

— Enjoy testing the endpoints!
