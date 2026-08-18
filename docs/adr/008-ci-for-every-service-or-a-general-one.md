### ADR-008 CI for individual service vs general CI pipeline for every service

## Status

Accepted

## Context

We have multiple independend apps in the same repo. When we make a change in one app/service we can run a CI to test all the apps, or test only the app where we made changes.

Main implications are execution speed and complexity of implementing such a CI pipeline.

##### Decision: We will use a TEST EVERYTHING strategy, on push/PR creation.

## Consequences

### Positive

- It is simpler to implement, since is the 1st time I am doing this
- Tests all the system, which helps us against regression bugs

### Negative

- Can become slow after developing many functionalities.
