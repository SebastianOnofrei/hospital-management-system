# ADR-012: Use REST + JSON instead of SOAP, GraphQL, or Protocol Buffers

## Status

**Accepted**

## Context

HMS services need a standard communication style for exposing APIs between services and external consumers.

The main alternatives considered are:

- **REST + JSON**
- **SOAP + XML**
- **GraphQL**
- **Protocol Buffers (Protobuf), typically with gRPC**

The decision needs to balance interoperability, simplicity, maintainability, tooling, observability, and the expected consumers of the HMS APIs.

HMS APIs are primarily resource-oriented APIs where clients need to perform standard operations such as creating, retrieving, updating, and deleting resources. The APIs are expected to be consumed by a variety of clients and potentially by systems outside the HMS ecosystem.

## Decision

We will use **REST over HTTP with JSON as the data interchange format** for HMS APIs.

REST + JSON is preferred because it provides the best balance between:

- broad client and platform compatibility;
- simplicity of implementation and consumption;
- human-readable payloads;
- mature HTTP tooling and infrastructure;
- straightforward debugging and observability;
- well-understood API semantics;
- ease of integration with external systems.

SOAP, GraphQL, and Protobuf/gRPC were considered but are not selected as the default API communication mechanism for HMS.

## Rationale

### REST + JSON

REST is a natural fit for HMS because the domain is primarily resource-oriented.

HTTP already provides well-established semantics for:

- `GET` — retrieve resources;
- `POST` — create resources or execute operations;
- `PUT` / `PATCH` — update resources;
- `DELETE` — remove resources;
- HTTP status codes — communicate request outcomes;
- HTTP headers — provide metadata, authentication, caching, and content negotiation.

JSON is widely supported across programming languages, frameworks, browsers, mobile applications, API clients, and integration platforms.

A REST + JSON API can also be consumed directly with standard tools such as browsers, `curl`, Postman, HTTP clients, API gateways, and observability platforms.

### Why not SOAP?

SOAP provides a mature contract-based messaging model and can be appropriate for enterprise environments with strong WS-\* requirements.

However, for HMS it introduces unnecessary complexity:

- XML payloads are more verbose than JSON.
- SOAP envelopes and XML schemas increase implementation complexity.
- SOAP-specific tooling and concepts are required in addition to standard HTTP.
- Debugging and manual inspection are less convenient.
- The HMS APIs do not require WS-\* capabilities such as WS-Security, WS-ReliableMessaging, or WS-AtomicTransaction.

Therefore, SOAP would add complexity without providing benefits that justify its use for the primary HMS API model.

### Why not GraphQL?

GraphQL is useful when clients need flexible querying of highly connected data or when different clients require significantly different representations of the same data.

However, HMS does not currently have a strong requirement for arbitrary client-driven queries.

Using GraphQL would introduce additional complexity:

- a separate query language and execution model;
- schema and resolver management;
- more complex authorization considerations;
- additional query-performance and resource-management concerns;
- less direct alignment with standard HTTP resource semantics;
- more complex caching compared with conventional HTTP resource endpoints.

For the current HMS use cases, REST endpoints provide sufficient flexibility without introducing these additional concerns.

GraphQL can be reconsidered later if HMS develops a clear requirement for client-driven aggregation or highly flexible querying.

### Why not Protocol Buffers / gRPC?

Protobuf provides compact, strongly typed, and efficient serialization. gRPC is particularly attractive for high-performance internal service-to-service communication.

However, Protobuf/gRPC is not selected as the default HMS API protocol because:

- payloads are not human-readable;
- consumers need Protobuf definitions and generated clients/tooling;
- browser and general external-client integration is less straightforward than HTTP + JSON;
- debugging requires specialized tooling;
- the performance benefits are not currently a primary HMS requirement;
- it creates stronger coupling between API consumers and the service contract/toolchain.

For HMS, interoperability and accessibility of the APIs are more important than maximizing serialization and RPC performance.

Protobuf/gRPC can still be considered for specific internal communication paths where performance, strict contracts, or high-throughput service-to-service communication justify it.

## Decision Matrix

| Criterion                    |        REST + JSON |               SOAP + XML |     GraphQL |       Protobuf / gRPC |
| ---------------------------- | -----------------: | -----------------------: | ----------: | --------------------: |
| Ease of adoption             |               High |               Medium/Low |      Medium |                Medium |
| Human readability            |               High |                   Medium |        High |                   Low |
| HTTP compatibility           |             Native | Yes, with SOAP semantics |         Yes | Yes, but RPC-oriented |
| Browser/client compatibility |               High |                   Medium |        High |            Medium/Low |
| External integration         |               High |                   Medium |        High |                Medium |
| Debugging                    |               Easy |                   Medium |      Medium |                Harder |
| Tooling maturity             |          Very High |                     High |        High |                  High |
| Strong schema                | Optional / OpenAPI |                      Yes |         Yes |                   Yes |
| Payload efficiency           |             Medium |                      Low |      Medium |                  High |
| Flexible querying            |                Low |                      Low |        High |                   Low |
| Resource-oriented APIs       |          Excellent |              Poor/Medium |      Medium |                  Poor |
| Implementation complexity    |                Low |                     High | Medium/High |           Medium/High |
| Fit for HMS                  |           **High** |                      Low |      Medium |                Medium |

## API Contract

REST APIs should be documented using **OpenAPI**.

JSON request and response models should be explicitly defined and versioned as part of the API contract.

Example:

```http
GET /api/v1/hms/resources/123
Accept: application/json
```

Response:

```json
{
  "id": "123",
  "status": "active",
  "name": "Example"
}
```

HTTP status codes should be used consistently to communicate the outcome of requests.

## Consequences

### Positive

- Simple and familiar API model.
- Broad compatibility with clients and programming languages.
- Easy integration with external systems.
- Easy debugging using standard HTTP tooling.
- Human-readable request and response payloads.
- Strong ecosystem support.
- Straightforward integration with API gateways, monitoring, logging, and tracing infrastructure.
- Lower barrier to entry for HMS API consumers.

### Negative

- JSON payloads are larger than Protobuf payloads.
- REST does not provide the same level of built-in schema enforcement as gRPC/Protobuf.
- Complex aggregation/query requirements may require additional REST endpoints.
- Performance may be lower than a binary RPC protocol for high-throughput internal communication.
- API design requires discipline to maintain consistent resource and error semantics.

## Alternatives

### SOAP + XML

Rejected as the default because it introduces unnecessary protocol and message complexity for HMS and does not provide sufficient additional value for the expected use cases.

### GraphQL

Rejected as the default because HMS currently does not require client-driven query flexibility. It may be reconsidered for dedicated aggregation/read use cases.

### Protobuf + gRPC

Rejected as the default external API protocol because interoperability, human readability, and ease of consumption are more important for HMS than maximum serialization/RPC efficiency.

It remains a potential option for selected internal service-to-service communication.

## Scope

This ADR defines the **default API communication standard for HMS**.

It does not prohibit the use of other protocols for specialized scenarios. Any deviation should be justified by the specific technical requirements of the use case.

## Future Considerations

The decision should be revisited if HMS develops requirements such as:

- very high-throughput or latency-sensitive internal communication;
- large-scale streaming communication;
- complex client-driven data aggregation;
- requirements for advanced enterprise SOAP capabilities;
- significant payload-size or serialization-performance constraints.

In those cases, **gRPC/Protobuf or GraphQL may be introduced selectively**, without replacing REST + JSON as the default HMS API style.

## Decision Summary

**HMS will expose its standard APIs using REST over HTTP with JSON payloads.**

REST + JSON is selected because it provides the best overall combination of interoperability, simplicity, maintainability, observability, and compatibility with the expected HMS consumers.

SOAP, GraphQL, and Protobuf/gRPC remain valid technologies for specialized use cases but are not the default communication mechanism for HMS.
