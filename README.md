# Hospital Management System

A healthcare management platform built using a domain-oriented
microservices architecture.

The system is designed to allow different healthcare business domains
to evolve, deploy, and scale independently while providing a unified API
to the frontend applications.

# Overview

The Hospital Management System (HMS) is a full-stack healthcare
management platform designed around a microservices architecture.

The platform consists of:

- Two independent React frontend applications
- One API Gateway
- Seven backend microservices
- A PostgreSQL database per backend service
- Centralized structured logging
- Automated code quality checks
- Git hooks for local development quality gates
- GitHub Actions for continuous integration

The project is intentionally designed to demonstrate practical
software architecture and engineering practices rather than simply
implementing a monolithic CRUD application.

---

# Business Problem

Healthcare organizations often rely on fragmented systems and manual
workflows.

Appointment management, patient records, billing, pharmacy operations,
and notifications may be handled by separate systems, spreadsheets, or
paper-based processes.

This fragmentation can result in:

- Long patient waiting times
- Communication errors between departments
- Duplicate or inconsistent information
- Limited visibility into the patient's overall journey
- Difficulties integrating different healthcare domains
- Systems that are difficult to evolve independently

A healthcare provider, whether public or private, needs a platform in
which different business domains can evolve independently while still
working together as part of a unified system.

---

# Solution

HMS addresses these problems through a domain-oriented microservices
architecture.

Instead of implementing the entire backend as one application, the
system separates major business capabilities into independently
deployable services.

The frontend applications communicate with the API Gateway, which acts
as the public backend boundary.

The API Gateway routes requests to the appropriate internal service.

Each service owns its own business logic and database boundary.

This reduces coupling between domains and allows individual services to
evolve independently.

The system follows the architectural flow:

Frontend Applications
│
▼
API Gateway
│
▼
Internal Services
│
▼
Service-owned Databases

The frontend applications do not communicate directly with individual
microservices.

Applications
Medical Web Portal

The Medical Web Portal is the primary frontend application for
healthcare professionals.

It provides functionality related to the operational and medical
workflow of the platform.

Technology:

React
JavaScript
i18next
Admin Dashboard

The Admin Dashboard is a separate frontend application intended for
administrative and operational functionality.

It is intentionally kept separate from the Medical Web Portal so that
the two applications can evolve and be deployed independently.

Technology:

React
JavaScript
i18next
Backend Services
API Gateway

The API Gateway is the public entry point into the backend.

Responsibilities include:

Routing requests
Providing the public API boundary
CORS enforcement
Rate limiting
HTTP security configuration
Request validation at the appropriate boundary
Forwarding requests to internal services

Internal services are not directly exposed to the frontend applications.
