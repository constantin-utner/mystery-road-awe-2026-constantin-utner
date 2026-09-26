# Development Guidelines

## Project context

- This is an existing browser-based investigation application built with vanilla
  JavaScript and Vite. TypeScript is configured for incremental adoption.
- Preserve existing behavior unless the task explicitly requires changing it.
- Use npm and the existing `package-lock.json`.
- Treat `package.json`, the lockfile, and configuration files as the source of
  truth for tooling and versions. Do not assume README instructions are current.
- Do not introduce a framework or perform a broad TypeScript migration unless
  the task requires it.

## Before making changes

- Read the relevant code, configuration, and any more specific `AGENTS.md` files.
- Check the working tree and preserve unrelated user changes.
- Identify the affected behavior and choose the smallest coherent change that
  addresses the task.
- Follow existing conventions where they are appropriate. Do not reproduce an
  unsafe or incorrect pattern solely for consistency.
- Keep unrelated refactoring, formatting, and dependency upgrades out of scope.

## Documentation first

Before using an unfamiliar API or changing behavior that depends on an external
library, framework, tool, or configuration:

1. Determine the applicable version from the lockfile and project configuration.
   A version range in `package.json` is not the exact installed version.
2. Consult current official documentation applicable to that version. Do not
   assume documentation for the latest release applies to this project.
3. Prefer Context7 when it is available and covers the relevant version;
   otherwise use official documentation directly.
4. If official documentation is insufficient, consult authoritative sources such
   as the project's source code, release notes, or maintainer discussions.
5. Check that APIs, examples, and configuration options match the project before
   applying them. Do not guess APIs when they can be verified.
6. If documentation cannot be accessed, state the limitation and distinguish
   verified facts from assumptions.

Keep research proportional to the task. Purely local refactoring, text edits,
and formatting do not require external research unless they raise an API or
compatibility question. Reuse documentation already verified in the current task.

## Code quality

- Prefer descriptive names, small cohesive functions, and simple control flow.
- Use early returns when they improve readability and avoid deep nesting.
- Avoid duplicated logic and speculative abstractions. Extract shared behavior
  when there is a concrete benefit.
- Add dependencies only when they provide a clear benefit that existing code or
  platform APIs cannot reasonably provide. Explain the reason for additions.
- Comment on intent, constraints, and non-obvious decisions; do not restate code.
- Handle expected failures explicitly. Do not silently swallow errors.
- Keep changes readable and maintainable rather than optimizing for cleverness.

## TypeScript

- Use explicit domain types at meaningful boundaries and inference where types
  are obvious. Avoid redundant annotations.
- Prefer `unknown` for untrusted values and narrow or validate them before use.
- Avoid `any`, non-null assertions, and type assertions that bypass checks.
  When unavoidable, keep them local and document the reason.
- Handle nullable values, optional properties, and potentially missing indexed
  values explicitly.
- Remember that TypeScript types do not validate JSON or stored data at runtime.
- Do not weaken compiler settings or disable lint rules to make checks pass.
- JavaScript checking is currently disabled (`checkJs: false`); a passing
  typecheck does not establish the correctness of existing JavaScript files.

## Browser behavior and data

- Preserve case-data loading, links between records, and persisted investigator
  workspace data when changing related code.
- Treat fetched JSON and local storage contents as untrusted input. Handle
  missing, malformed, or outdated data at the relevant boundaries.
- Avoid inserting untrusted content through `innerHTML`; use safe DOM APIs for
  plain text.
- For UI changes, preserve semantic HTML, keyboard operation, visible focus,
  and accessible names for controls.
- Edit source files rather than generated output in `dist/`.

## Verification

For code or configuration changes, run the checks relevant to the affected scope:

1. Format changed files with the project's Prettier configuration:
   `npx --no-install prettier --write <changed-files>`.
   Avoid `npm run format` for a focused change because it formats the entire repo.
2. Run `npm run lint`.
3. Run `npm run typecheck`.
4. Run `npm run build` for application or build-related changes.
5. Run relevant automated tests when available. There is currently no test
   script; do not claim tests passed or introduce a test framework solely to
   satisfy this checklist.
6. For behavior changes, exercise the affected flow through the Vite development
   server (`npm run dev`) when browser access is available. Check the console and
   verify reload/persistence behavior when storage is affected.

For documentation-only changes, check formatting and accuracy; application
checks are unnecessary unless executable code or configuration also changed.

Fix issues introduced by the change. If a check fails because of a pre-existing
problem, report it separately and avoid unrelated fixes or suppressed checks.
If a check cannot run, explain why and what remains unverified.

## Completion report

- Summarize what changed and why.
- State which checks actually ran and their results.
- Mention material limitations, remaining failures, or unverified behavior.
- Do not claim a change works solely because it compiles or passes linting.
