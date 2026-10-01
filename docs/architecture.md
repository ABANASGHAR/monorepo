# 🏗️ Architecture Design & System Boundaries

This document outlines the detailed system architecture, layering principles, data contracts, and design boundaries of this MERN monorepo.

---

## 1. System Context & Overview

The system is structured as a decoupled full-stack TypeScript application composed of:
1. **Single Page Application (`client`)**: Built on React 18+ and Vite.
2. **REST API Service (`server`)**: Built on Express.js and Node.js.
3. **Data Persistence Tier**: MongoDB document database interacted with through Mongoose ODM.
4. **Integration Test Suite (`test`)**: Verifies the API contracts and service boundaries.

```
+-------------------------------------------------------------+
|                         Browser Client                      |
|                React 18 + Vite + TypeScript                 |
+------------------------------+------------------------------+
                               |
                        HTTPS / JSON REST
                               |
+------------------------------v------------------------------+
|                         Express API                         |
|   +-----------------------------------------------------+   |
|   |                  Middleware Layer                   |   |
|   |          (CORS, Morgan Logging, JSON Body)          |   |
|   +--------------------------+--------------------------+   |
|                              |                              |
|   +--------------------------v--------------------------+   |
|   |                    Route Handlers                   |   |
|   |           (/api/v1/items, /api/health)              |   |
|   +--------------------------+--------------------------+   |
|                              |                              |
|   +--------------------------v--------------------------+   |
|   |                  Controller Layer                   |   |
|   |         (Business Logic, Input Validation)          |   |
|   +--------------------------+--------------------------+   |
|                              |                              |
|   +--------------------------v--------------------------+   |
|   |                   Data Model Layer                  |   |
|   |                 (Mongoose Schemas)                  |   |
|   +--------------------------+--------------------------+   |
|                              |                              |
|   +--------------------------v--------------------------+   |
|   |              Centralized Error Handler              |   |
|   +-----------------------------------------------------+   |
+------------------------------+------------------------------+
                               |
                        TCP / Mongoose Wire
                               |
+------------------------------v------------------------------+
|                       MongoDB Database                      |
+-------------------------------------------------------------+
```

---

## 2. Core Boundary Rules

To prevent code entanglement and ensure horizontal scalability:

### Rule 1: No Direct Database Access in Handlers
All database interactions must be orchestrated through Mongoose models inside dedicated controller methods or services. Controllers must not expose raw database internal errors or database driver objects directly to the client.

### Rule 2: Unified API Response Contract
All endpoints must conform to a predictable envelope:

```typescript
// Success Response
interface ApiResponseSuccess<T> {
  success: true;
  data: T;
  message?: string;
}

// Error Response
interface ApiResponseError {
  success: false;
  error: {
    message: string;
    details?: unknown;
  };
}
```

### Rule 3: Client Data Access Encapsulation
UI components in `client/src/components` must never invoke `fetch` or `axios` directly. All network calls must pass through `client/src/services/` to enforce caching, base URLs, auth token injection, and typed response validation.

---

## 3. Vertical Feature Slice Pattern

Every domain feature is organized as a complete vertical slice traversing all tiers:

```
Domain Feature (e.g., Items / Tasks)
│
├── Server Tier
│   ├── Model: server/src/models/item.model.ts
│   ├── Controller: server/src/controllers/item.controller.ts
│   └── Route: server/src/routes/item.routes.ts
│
├── Client Tier
│   ├── Types: client/src/types/item.ts
│   ├── Service: client/src/services/itemService.ts
│   └── UI Components: client/src/components/ItemList.tsx, ItemForm.tsx
│
└── Test Tier
    └── Integration Test: test/integration/items.test.ts
```

---

## 4. Error Handling Strategy

- **Client Errors (4xx)**: Handled gracefully by returning structured error messages. Form inputs display inline validation errors.
- **Server Errors (500)**: Caught by the centralized Express `errorHandler` middleware. Stack traces are suppressed in production environments.
- **Database Connection Failures**: Express gracefully logs connection issues and server health endpoint reports `status: "degraded"` or `status: "down"`.
