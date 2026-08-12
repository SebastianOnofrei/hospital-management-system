### ADR-007 Continuous Integration and Continuous Delivery pipeline - PART 1 CI

## Status

Accepted

## Context

The system consists of muiltiple independently developed applications and services, including 2 React frontend apps, an API Gateway, and multiple backend microservices.

As the number of applications and services increase, manually verifying changes becomes increasingly error-prone. A change in one component may also introduce regression bugs that are not immediately visible to the developer.

We need a consisten and automated mechanism for verifying changes BEFORE they are merged into the main branches.

##### Decision: We will use GitHub Actions as the CI/CD automation platform.

Initially, the pipeline will implement only a minimal Continuous Integration (CI) process:

1. Checkout the repository.
2. Install dependencies using the lock files.
3. Run linting.
4. Run automated tests (if any).

This initial implementation WILL NOT include Docker, artifact publishing, deployment, or production infrastructure.

Continuopus Delivery/Deployment will be introduces as a separate evolution once the CI foundation is established.

CI workflows will run on pull requests and on pushes to the main development branches.

## Rationale

Automated CI provides a consistent verification process independent of the developer's local environment.

Using the same automated checks for every change reduces the probability of merging code that does not satisfy the project's quality requirements.

GitHub Actions was selected because the source code is already hosted on GitHub, eliminating the need for a separate CI platform and keeping source control and CI configuration in the same system.

The pipeline is intentionally kept minimal at this Stage to establish a reliable feedback loop before introducing deployment infrastructure.

## Consequences

### Positive

- Every pull request is automatically validated.
- Regressions are detected earlier.
- Developers receive consistent feedback.
- CI behavior is version-controlled alongside the source code.
- The process does not depend on a developer's local environment.
- The foundation for future automated deployment is established.

### Negative

- CI introduces execution time for pull requests and pushes.
- CI configuration itself requires maintenance.
- The project becomes dependent on GitHub Actions.
- Poorly designed pipelines can become slow or unnecessarily complex.
