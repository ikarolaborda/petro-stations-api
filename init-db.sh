#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" <<-EOSQL
    DO \$\$
    BEGIN
        IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'myuser') THEN
            CREATE ROLE myuser WITH LOGIN PASSWORD 'password';
        END IF;
    END
    \$\$;

    DO \$\$
    BEGIN
        IF NOT EXISTS (SELECT 1 FROM pg_database WHERE datname = 'petrol_stations') THEN
            CREATE DATABASE petrol_stations;
        END IF;
    END
    \$\$;

    GRANT ALL PRIVILEGES ON DATABASE petrol_stations TO myuser;
EOSQL