# ADR-004: Introduce Health Checks for Microservices

Date: 2026-08-08
Decision: Implement health checks for each microservice and an aggregated health endpoint in the API Gateway.

#### #Context:

The Hospital Management System is composed of multiple independent microservices:

- Auth Service
- Appointment Service
- Billing Service
- Doctor Service
- Notification Service
- Patient Service
- Pharmacy Service

Because each service runs independently, the system needs a way to determine whether an individual service is operational and whether the overall system is healthy.

Without health checks, failures can only be detected indirectly through failed application requests, making it difficult to identify which service is responsible for an outage.

#### #Decision

Each microservice will expose dedicated health endpoints:

GET /health/live — verifies that the service process is alive.
GET /health/ready — verifies that the service is ready to accept traffic and, where applicable, that critical dependencies such as the database are available.

The API Gateway will expose an aggregated health endpoint:

GET /health/services

This endpoint will query the health endpoints of all registered microservices and aggregate their status into a single response.

Example:

{
"status": "degraded",
"services": {
"auth": "healthy",
"appointment": "healthy",
"billing": "healthy",
"doctor": "unhealthy",
"notification": "healthy",
"patient": "healthy",
"pharmacy": "healthy"
}
}

The Gateway itself will also expose its own liveness/readiness endpoints independently from the aggregated service health.

Benefits

1. Faster failure detection

Health checks allow the system to detect unavailable services without waiting for a normal business request to fail.

2. Easier troubleshooting

The aggregated endpoint identifies which service is unhealthy instead of returning only a generic system-level failure.

3. Better observability

Health status provides a simple operational view of the distributed system and can later be integrated with monitoring and alerting systems.

4. Container orchestration support

The health endpoints can later be used by Docker, Kubernetes, or another orchestration platform for liveness and readiness probes.

5. Service independence

Each microservice remains responsible for determining its own health instead of relying exclusively on the API Gateway.

#### #Trade-offs & #Drawbacks

1. Additional implementation

Every microservice needs to expose and maintain health endpoints.

2. Additional network traffic

The aggregated Gateway health check generates requests to the individual services.

3. Dependency complexity

A readiness check may need to verify databases or other dependencies, which makes the health-check implementation more complex.

4. Aggregated health may become expensive

If the Gateway performs synchronous health checks against every service on every request, the endpoint can become slow or create unnecessary load.

For this reason, the aggregated health endpoint should not be used as the Gateway's own liveness check.

Alternatives Considered
Alternative 1: No health checks

Rejected.

The system would have limited visibility into the state of individual microservices and failures would primarily be detected through failed business requests.

Alternative 2: Health check only on the API Gateway

Rejected.

A healthy Gateway does not imply that the underlying microservices are healthy. The Gateway could be operational while one or more services are unavailable.

Alternative 3: Health checks only on individual services

Partially accepted, but insufficient on its own.

Individual health checks provide good service-level visibility, but an aggregated endpoint provides a convenient system-level view.

Alternative 4: Individual health checks + aggregated Gateway health

Accepted.

This provides both granular service-level diagnostics and a centralized overview of the system.

Consequences

The system will have a clear distinction between:

Liveness: Is the service process alive?
Readiness: Is the service ready to receive traffic?
Aggregated health: What is the current health of the microservice ecosystem?

The API Gateway will not consider itself unhealthy simply because one downstream microservice is unavailable. Instead, the aggregated health endpoint will report the system as degraded or unhealthy depending on the defined health policy.

This approach also keeps the architecture ready for future deployment in a containerized or orchestrated environment.
