# 🤝 Contributing Guide

Thank you for contributing to the MERN monorepo project!

---

## 1. Development Workflow

1. **Branching Strategy**:
   - `main`: Production-ready code.
   - `develop`: Integration branch for ongoing work.
   - `feature/<feature-name>`: Dedicated feature branch.
   - `fix/<bug-name>`: Bugfix branch.

2. **Workspaces Quick Commands**:
   - `npm run dev`: Runs all packages concurrently.
   - `npm run dev:client`: Runs only client.
   - `npm run dev:server`: Runs only server.
   - `npm test`: Runs integration tests.
   - `npm run typecheck`: Runs TypeScript checks on all workspaces.

---

## 2. Adding a New Feature Slice

When adding a new feature slice:
1. Define the schema in `server/src/models/<feature>.model.ts`.
2. Implement business logic and validation in `server/src/controllers/<feature>.controller.ts`.
3. Register routes in `server/src/routes/<feature>.routes.ts` and mount in `server/src/app.ts`.
4. Mirror TypeScript contracts in `client/src/types/<feature>.ts`.
5. Create client API methods in `client/src/services/<feature>Service.ts`.
6. Implement frontend components in `client/src/components/`.
7. Add integration test coverage in `test/integration/<feature>.test.ts`.
8. Update `docs/api-spec.md` with new endpoint schemas.
