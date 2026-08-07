### ADR-003 Database per service versus Shared database

##### Decision: I chose database per service since I try to apply microservices best practices.

Pros:

- Complete isolation, each team can change the schema without affecting other services.
- Elimination of coupling at data level.
- Fault tolerance is increased. If the DB server fails for a service, only that service is affected, the rest of the app will work unaffected.

Cons:

- Cross domain interogations - sometimes we may need to get data from different services, meaning different DBs and show them in the UI
- It is with a greater cost for sure, since we have more databases :)
- Observability of such a system is harder than that of having only 1 DB.
