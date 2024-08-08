# Petrol Stations API

This is a REST API for managing petrol stations, built with NestJS and TypeORM. The API allows you to create, read, update, and delete Points of Interest (POI), which include petrol stations, their opening hours, and their pumps.

## Table of Contents

- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Endpoints](#endpoints)
- [Running Tests](#running-tests)
- [Database Migrations](#database-migrations)
- [Seed Data](#seed-data)
- [Docker Setup](#docker-setup)

## Getting Started

### Prerequisites

- Node.js (v16 or later)
- Docker and Docker Compose

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/your-repo/petrol-stations-api.git
    cd petrol-stations-api
    ```

2. Install the dependencies:
    ```bash
    npm install
    ```

3. Create a `.env` file in the root of the project and add the following variables:
    ```env
    DATABASE_HOST=petrol-postgres
    DATABASE_PORT=5432
    DATABASE_USER=postgres
    DATABASE_PASSWORD=petr0l3uM
    DATABASE_NAME=petrol_stations
    DATABASE_NAME_TEST=petrol_stations_test
    ```

4. Build and run the Docker containers: (DOCKER IS IN EXPERIMENTAL STAGES, MAKE SURE YOU USE ONLY THE POSTGRES SERVICE AND POINT YOUR ENV VARS ACCORDINGLY)
    ```bash
    docker-compose --env-file .env up --build --force-recreate
    ```

## Environment Variables

- `DATABASE_HOST`: Host of the PostgreSQL database.
- `DATABASE_PORT`: Port of the PostgreSQL database.
- `DATABASE_USER`: Username for the PostgreSQL database.
- `DATABASE_PASSWORD`: Password for the PostgreSQL database.
- `DATABASE_NAME`: Name of the PostgreSQL database.
- `DATABASE_NAME_TEST`: Name of the test PostgreSQL database.

## Endpoints

### POI Endpoints

- **GET /poi**: Retrieve a list of POIs.
- **GET /poi/:id**: Retrieve a single POI by ID.
- **POST /poi**: Create a new POI.
- **PUT /poi/:id**: Update a POI by ID.
- **DELETE /poi/:id**: Delete a POI by ID.

### Example Requests

#### GET /poi
```sh
curl -X GET http://localhost:3000/poi