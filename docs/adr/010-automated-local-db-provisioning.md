# ADR-010 Automated Local Database Provisioning

## Status

Accepted

## Context

The Hospital Management System consists of multiple independent backend microservices.

Each microservice owns its own database:

- Auth Service → `hospital_auth`
- Patient Service → `hospital_patients`
- Doctor Service → `hospital_doctors`
- Appointment Service → `hospital_appointments`
- Billing Service → `hospital_billing`
- Pharmacy Service → `hospital_pharmacy`
- Notification Service → `hospital_notifications`

PostgreSQL is installed locally as a single PostgreSQL instance during development, with separate databases for each microservice.

Creating these databases manually through a graphical database management tool would make the local development setup dependent on manual steps and developer knowledge.

A new developer should be able to configure the required databases through a simple, repeatable command.

## Decision

We will provide a repository-level Node.js script responsible for creating the project's required PostgreSQL databases.

The script is located at:

    scripts/setup-databases.js

It is exposed through the root `package.json`:

    "db:setup": "node scripts/setup-databases.js"

Developers can therefore initialize the required databases by running:

    npm run db:setup

The script connects to the local PostgreSQL instance and checks whether each required database already exists.

If a database exists, it is left unchanged.

If it does not exist, the script creates it.

The operation is therefore idempotent and safe to execute multiple times.

## Database Architecture

The project uses one PostgreSQL instance during local development.

Each microservice has an isolated database:

    PostgreSQL
    │
    ├── hospital_auth
    ├── hospital_patients
    ├── hospital_doctors
    ├── hospital_appointments
    ├── hospital_billing
    ├── hospital_pharmacy
    └── hospital_notifications

The API Gateway does not own a database.

## Rationale

Automating database creation provides a consistent development environment without introducing additional infrastructure or containerization at this stage.

The approach is intentionally simple because the project is currently in development and the team does not yet require containerized database infrastructure.

The database provisioning script is also version-controlled alongside the application, making the required local infrastructure explicit and discoverable.

## Consequences

### Positive

- New developers can initialize the database environment with one command.
- Database setup becomes reproducible.
- Manual pgAdmin configuration is no longer required.
- The required databases are explicitly documented in source control.
- The script can safely be executed multiple times.
- No Docker knowledge or additional container infrastructure is required.
- The approach is simple to understand and maintain.

### Negative

- PostgreSQL must already be installed and running locally.
- Developers must provide valid PostgreSQL credentials.
- The script currently targets a local PostgreSQL instance.
- Database schema and table creation are not handled by this script.

## Alternatives Considered

### Manual database creation through pgAdmin

Rejected.

Manual database creation introduces unnecessary setup steps and requires developers to understand the database administration interface.

### SQL initialization scripts

Rejected for the current stage.

SQL scripts could create the required databases, but would require an additional mechanism for executing those scripts against the PostgreSQL server.

The Node.js approach allows the existing JavaScript/Node.js development environment to handle the setup directly.

### Dockerized PostgreSQL

Deferred.

Docker would provide a highly reproducible infrastructure environment, but introducing Docker at this stage would add infrastructure complexity that is not currently required.

Containerization may be reconsidered when the project moves toward standardized environments, integration testing, or deployment.

## Future Considerations

This script is responsible only for database provisioning.

Database schemas, tables, indexes, and schema evolution should be managed separately through a database migration mechanism.

If the project adopts Docker or another infrastructure provisioning solution in the future, the database provisioning strategy may be revisited.

The goal is to maintain a clear separation between:

    Database provisioning
            ↓
    Database schema/migrations
            ↓
    Application data
