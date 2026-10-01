# 📡 REST API Specification

Base URL: `http://localhost:5000/api/v1`

All responses are formatted in JSON with `Content-Type: application/json`.

---

## 1. System Health

### `GET /api/health`
Checks server and database connection health.

#### Response `200 OK`
```json
{
  "success": true,
  "data": {
    "status": "ok",
    "timestamp": "2026-10-02T04:30:00.000Z",
    "uptime": 12.34,
    "database": "connected"
  }
}
```

---

## 2. Items Resource (`/api/v1/items`)

### `GET /api/v1/items`
Retrieves a list of all items.

#### Query Parameters
- `completed` (optional, boolean): Filter by completed status (`true` or `false`).
- `priority` (optional, string): Filter by priority (`low`, `medium`, `high`).

#### Response `200 OK`
```json
{
  "success": true,
  "data": [
    {
      "_id": "651f89c02b1f8b3c94a501a1",
      "title": "Setup Monorepo Structure",
      "description": "Initialize client, server, docs, and test packages",
      "completed": false,
      "priority": "high",
      "createdAt": "2026-10-02T04:00:00.000Z",
      "updatedAt": "2026-10-02T04:00:00.000Z"
    }
  ],
  "count": 1
}
```

---

### `GET /api/v1/items/:id`
Retrieves a single item by its MongoDB ObjectId.

#### Response `200 OK`
```json
{
  "success": true,
  "data": {
    "_id": "651f89c02b1f8b3c94a501a1",
    "title": "Setup Monorepo Structure",
    "description": "Initialize client, server, docs, and test packages",
    "completed": false,
    "priority": "high",
    "createdAt": "2026-10-02T04:00:00.000Z",
    "updatedAt": "2026-10-02T04:00:00.000Z"
  }
}
```

#### Response `404 Not Found`
```json
{
  "success": false,
  "error": {
    "message": "Item not found"
  }
}
```

---

### `POST /api/v1/items`
Creates a new item.

#### Request Body
```json
{
  "title": "Configure ESLint and Prettier",
  "description": "Standardize code formatting across workspaces",
  "priority": "medium",
  "completed": false
}
```

#### Response `201 Created`
```json
{
  "success": true,
  "data": {
    "_id": "651f89c02b1f8b3c94a501a2",
    "title": "Configure ESLint and Prettier",
    "description": "Standardize code formatting across workspaces",
    "completed": false,
    "priority": "medium",
    "createdAt": "2026-10-02T04:32:00.000Z",
    "updatedAt": "2026-10-02T04:32:00.000Z"
  },
  "message": "Item created successfully"
}
```

#### Response `400 Bad Request`
```json
{
  "success": false,
  "error": {
    "message": "Title is required"
  }
}
```

---

### `PUT /api/v1/items/:id`
Updates an existing item.

#### Request Body (Partial or Full)
```json
{
  "completed": true
}
```

#### Response `200 OK`
```json
{
  "success": true,
  "data": {
    "_id": "651f89c02b1f8b3c94a501a2",
    "title": "Configure ESLint and Prettier",
    "description": "Standardize code formatting across workspaces",
    "completed": true,
    "priority": "medium",
    "createdAt": "2026-10-02T04:32:00.000Z",
    "updatedAt": "2026-10-02T04:35:00.000Z"
  },
  "message": "Item updated successfully"
}
```

---

### `DELETE /api/v1/items/:id`
Deletes an item by ID.

#### Response `200 OK`
```json
{
  "success": true,
  "message": "Item deleted successfully"
}
```
