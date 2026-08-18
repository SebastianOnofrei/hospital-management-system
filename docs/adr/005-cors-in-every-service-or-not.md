### ADR-005 CORS per service versus only in API Gateway

##### Decision: CORS will be configured only at the API Gateway level. The microservices will not expose browser-facing APIs and will be accessible only through the API Gateway within the private service network.

##### This decision is based on the current architecture and intended usage: the application frontend communicates exclusively with the API Gateway, while the microservices are internal components.

##### If a microservice is later exposed directly to browser-based clients or becomes a browser-facing API for another application, CORS will be configured at that service's boundary as part of the exposure of that API. Authentication and authorization will also be enforced independently of CORS.

Pros:

- Clear security boundary. The API Gateway is the single browser-facing entry point, while microservices remain internal and are not directly exposed to the internet.
- Reduced configuration duplication. CORS configuration, allowed origins, credentials policy, and preflight handling are maintained in one place instead of being duplicated across every service.
- Lower operational complexity. Adding or removing a frontend origin requires changing the Gateway configuration rather than updating every microservice.
- Consistent browser access policy. All browser requests go through the same CORS policy, reducing the risk of inconsistent CORS configurations between services.
- Smaller attack surface. Microservices do not need to expose browser-facing endpoints and can remain accessible only through the internal network.
- Clear separation of responsibilities. The Gateway handles external HTTP concerns such as CORS, while individual services focus on authentication/authorization, validation, business logic, and data access.
- Easier evolution of internal services. Since clients do not access services directly, internal service endpoints can evolve without becoming public API contracts.

Cons:

- The Gateway becomes a critical component. If the Gateway is unavailable, browser clients cannot access any of the services, even if the individual services are healthy.
- Less flexibility for direct browser access. If a microservice later needs to be consumed directly by a browser-based application, it will require its own CORS configuration and potentially a different exposure architecture.
- Potential Gateway bottleneck. All browser traffic passes through the Gateway, so its capacity, rate limiting, timeouts, and availability must be designed appropriately.
- Additional configuration when exposing a service externally. A service that becomes browser-facing must be explicitly configured with its own CORS policy, authentication, authorization, rate limiting, and other API security controls.
- CORS does not provide API security. Preventing direct browser access through CORS does not prevent clients such as curl or Postman from calling an exposed service. Network isolation and authentication/authorization are therefore still required.
