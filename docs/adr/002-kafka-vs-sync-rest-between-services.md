### ADR-002 Kafka vs Sync communication (REST) between services

##### Decision: I chose Kafka because there are some events which don't need immediate response from our requests - example is AppointmendConfirmed, which can generate a notification. Those events will be through Kafka

Pros:

- Services Decoupling
- Resilience to temporary downtime of a consumner
- Easy to add new consumers to Kafka (ex an analytics module) without modifying the Kafka Producer

Cons:

- Eventual consistency - some notifications may be delayed for a few seconds
- The consumer lag needs to be monitorized
