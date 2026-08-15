# ADR-011 Commit Message and Task Traceability Convention

## Status

Accepted

## Context

The project uses Trello for task management and GitHub for source control.

As the project grows, an unstructured commit history makes it harder to understand why a change was introduced and which development task it belongs to.

The project therefore needs a lightweight convention that:

- keeps commit messages consistent;
- identifies the type of change;
- associates commits with a specific development task;
- remains easy for developers to follow;
- can be enforced automatically.

Each Trello task is assigned a unique project identifier, such as:

    HMS-010

The same identifier is used in Git branch names and commit messages to provide traceability between the task management and source control systems.

## Decision

We will use the following convention for branch names:

    <type>/<TASK-ID>-<task-slug>

Examples:

    feature/HMS-010-add-jest
    bugfix/HMS-023-fix-login-validation
    refactor/HMS-031-extract-db-config

Commit messages will use the following format:

    <type>/<TASK-ID>-<task-slug> <commit-message>

Examples:

    feature/HMS-010-add-jest add Jest configuration

    bugfix/HMS-023-fix-login-validation fix invalid credentials handling

    refactor/HMS-031-extract-db-config simplify database configuration

The following change types are currently allowed:

- `feature`
- `bugfix`
- `refactor`
- `chore`
- `docs`
- `test`

## Rationale

The convention provides a lightweight traceability mechanism between task management and source control.

A developer can inspect a commit and immediately determine:

1. what type of change was made;
2. which task motivated the change;
3. what the specific commit changed.

For example:

    feature/HMS-010-add-jest add Jest configuration

communicates that the commit implements a feature related to task `HMS-010` and specifically adds Jest configuration.

The convention intentionally does not depend on a specific project management platform. The identifier represents a project task rather than a Jira-specific concept.

This keeps the development workflow independent of the current task management tool.

## Enforcement

Commit messages are validated using a Husky `commit-msg` hook.

The hook verifies that every commit follows the required format.

Invalid commit messages are rejected before the commit is created.

Example:

    feature/HMS-010-add-jest add Jest configuration

is accepted.

Whereas:

    added Jest configuration

is rejected.

## Consequences

### Positive

- Commit history is consistent and easy to scan.
- Commits can be associated with specific development tasks.
- The workflow provides traceability between planning and implementation.
- Developers receive immediate feedback when a commit violates the convention.
- The convention is enforced automatically rather than relying solely on documentation.
- The convention is independent of Trello and can continue to work if the project management platform changes.
- The convention requires no additional infrastructure or tooling beyond Git and Husky.

### Negative

- Developers must know the task identifier when committing.
- Developers must follow the naming convention for every commit.
- The commit message is slightly longer than an unrestricted commit message.
- Local Git hooks must be installed for immediate enforcement.

## Alternatives Considered

### No commit convention

Rejected.

An unrestricted commit history provides little consistency and makes it harder to associate implementation changes with development tasks.

### Conventional Commits

Considered.

Conventional Commits provides a well-established format such as:

    feat: add authentication
    fix: handle invalid credentials

It is particularly useful for automated changelog generation and semantic versioning.

However, the primary requirement for this project is task traceability rather than release automation. The selected convention explicitly includes the task identifier while remaining simple.

Conventional Commits can be reconsidered if automated releases or semantic versioning become project requirements.

### Task identifier only

Example:

    HMS-010 add Jest configuration

Rejected.

Although this provides task traceability, it does not communicate the type of change.

### Documentation-only convention

Rejected.

A convention that is documented but not automatically enforced is prone to inconsistency.

Husky provides a lightweight quality gate at commit time.

## Future Considerations

If the project introduces automated release management, semantic versioning, or changelog generation, the commit convention may be revisited.

If the task management platform changes from Trello to another system, the convention can remain unchanged as long as tasks continue to provide stable identifiers.

Additional validation may also be introduced at the CI level if commit history needs to be enforced independently of local Git hooks.
