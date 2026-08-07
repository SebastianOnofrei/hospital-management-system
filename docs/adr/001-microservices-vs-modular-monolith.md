### ADR-001 Microservices vs Modular Monolith

##### Decision: I chose MICROSERVICES approach wiht bounded context (Patient, Appointment, Billing etc.)

Pros:

- Independent scaling of services
- Independent deployment of services
- Fault tolerance isolation - just a service may fail instead of the whole app
- Teams can work in parallel without breaking the app, this speeds up development and bug fixing

Cons:

- The operational complexity is increased, meaning that the observability must be distributed across services, networks
- Needs matured DevOps
