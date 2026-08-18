# ADR-007 Local Pre-Commit Linting with Husky and lint-staged

## Status

Accepted

## Context

The project is structured as a multi-application, multi-service repository containing:

- 2 React frontend applications
- 1 API Gateway
- 8 backend microservices

Each application and service is an independent npm project with its own `package.json`, dependencies, and ESLint configuration.

Linting is already enforced in the CI pipeline. However, relying exclusively on CI means that developers may only discover linting errors after committing and pushing their changes to the remote repository.

This creates unnecessary feedback time and can result in avoidable CI failures.

Running the linter against every application and microservice before every commit would provide local validation, but would also be inefficient because a developer may only be working on one or two projects.

We therefore need a local mechanism that:

1. Runs automatically before a commit.
2. Prevents commits containing linting errors.
3. Runs linting only against files staged for the commit.
4. Works across all applications and microservices in the repository.
5. Keeps the configuration explicit and easy for developers to understand.
6. Does not replace CI-based linting.

## Decision

We will use **Husky** to manage Git hooks and **lint-staged** to execute ESLint against staged files before creating a commit.

The Git workflow will be:

    Developer changes code
            ↓
        git add
            ↓
        git commit
            ↓
        Husky pre-commit hook
            ↓
        lint-staged
            ↓
        ESLint on staged files
            ↓
       ┌────┴────┐
       │         │
      FAIL      PASS
       │         │
    Block      Commit
    commit

Husky is configured at the repository root because Git hooks are a repository-level concern.

The `.husky/pre-commit` hook executes:

    npx lint-staged

The root `lint-staged` configuration explicitly maps files belonging to each application or service to the ESLint installation of that project.

For example:

    services/auth-service/**/*.js
        ↓
    npm --prefix services/auth-service exec eslint --

This allows each project to keep its own ESLint configuration and dependencies while still participating in a repository-level pre-commit workflow.

## CI Relationship

Local pre-commit linting does not replace CI linting.

The two mechanisms have different responsibilities:

### Local validation

Husky + lint-staged:

- Provides fast developer feedback.
- Runs only against staged files.
- Prevents common linting errors from entering Git history.

### Remote validation

GitHub Actions:

- Runs in a clean CI environment.
- Executes the complete linting checks for the relevant applications and services.
- Acts as the authoritative quality gate.
- Protects the repository even if local hooks are unavailable, misconfigured, or bypassed.

The resulting workflow is:

    Local development
          ↓
    Husky + lint-staged
          ↓
    git commit
          ↓
    git push
          ↓
    GitHub Actions
          ↓
    Full lint validation

## Consequences

### Positive

- Linting errors are detected before code is pushed to the remote repository.
- Developers receive immediate feedback.
- Only staged files are linted locally, reducing unnecessary execution time.
- Each application and microservice retains ownership of its own ESLint configuration.
- The repository does not require a shared ESLint configuration for unrelated applications and services.
- The configuration is explicit and easy to understand.
- CI remains an independent safety net.
- The development workflow becomes more consistent across the team.
- Preventable linting failures are less likely to reach pull requests.

### Negative

- Developers must install the repository dependencies for the Git hooks to work.
- Pre-commit hooks add a small amount of time to the commit operation.
- The root repository contains additional tooling configuration.
- Developers can technically bypass Git hooks using Git's hook-bypass mechanisms.
- lint-staged configuration must be updated when new applications or services are added to the repository.

## Alternatives Considered

### 1. Rely exclusively on CI linting

Rejected.

Although CI provides reliable enforcement, developers would discover linting errors only after pushing their changes. This creates unnecessary feedback latency and avoidable CI failures.

### 2. Run `npm run lint` for every project before every commit

Rejected.

This would lint all applications and services regardless of what the developer changed.

For a repository containing multiple independent projects, this creates unnecessary local execution time.

### 3. Run ESLint manually before every commit

Rejected.

This relies entirely on developer discipline and is therefore inconsistent and easy to forget.

### 4. Run linting on every `git push`

Rejected.

Linting before commit provides earlier feedback than linting before push. A developer should ideally discover and fix linting issues before creating the commit rather than after completing the work and attempting to push it.

## Rationale

The chosen approach provides a balance between developer experience and repository quality.

Local validation is optimized for speed by checking only staged files, while CI performs comprehensive validation independently.

This follows the principle:

> Fast feedback locally, authoritative validation remotely.

Husky is responsible for integrating the check into the Git workflow, while lint-staged is responsible for limiting the check to the files that are actually part of the commit.

This keeps responsibilities separated and avoids coupling the Git workflow to a single application's build or linting configuration.

## Future Considerations

If the number of applications and services grows significantly, the lint-staged configuration may become repetitive.

At that point, the repository may consider:

- npm workspaces;
- shared development tooling;
- centralized ESLint configuration where appropriate;
- a task runner such as Turborepo or Nx;
- more advanced affected-project detection.

These options are intentionally deferred until the complexity of the repository justifies them.
