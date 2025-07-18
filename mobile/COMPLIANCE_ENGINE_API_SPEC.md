# Compliance Engine API Specification

This document describes the backend API endpoints required for the mobile frontend of the Intelligent Compliance Engine. All endpoints are prefixed with `/api`.

---

## Authentication

### Login
- **POST** `/api/auth/login`
- **Request:**
```json
{
  "email": "user@example.com",
  "password": "string"
}
```
- **Response:**
```json
{
  "accessToken": "jwt-token",
  "refreshToken": "optional-refresh-token",
  "user": {
    "id": "user-id",
    "email": "user@example.com",
    "name": "User Name"
  }
}
```

### Get Current User
- **GET** `/api/auth/me`
- **Headers:** `Authorization: Bearer <accessToken>`
- **Response:**
```json
{
  "id": "user-id",
  "email": "user@example.com",
  "name": "User Name"
}
```

---

## Documents

### List Documents
- **GET** `/api/documents`
- **Headers:** `Authorization: Bearer <accessToken>`
- **Response:**
```json
[
  {
    "id": "doc-id",
    "name": "Document.pdf",
    "url": "https://...",
    "uploadedAt": "2024-01-01T00:00:00Z"
  }
]
```

### Upload Document
- **POST** `/api/documents/upload`
- **Headers:** `Authorization: Bearer <accessToken>`
- **Body:** `multipart/form-data` with `file` field
- **Response:**
```json
{
  "id": "doc-id",
  "name": "Document.pdf",
  "url": "https://...",
  "uploadedAt": "2024-01-01T00:00:00Z"
}
```

---

## Compliance Analysis

### Request Analysis
- **POST** `/api/analysis`
- **Headers:** `Authorization: Bearer <accessToken>`
- **Request:**
```json
{
  "documentId": "doc-id"
}
```
- **Response:**
```json
{
  "id": "job-id",
  "documentId": "doc-id",
  "status": "pending",
  "createdAt": "2024-01-01T00:00:00Z"
}
```

### Get Analysis Result
- **GET** `/api/analysis/{jobId}`
- **Headers:** `Authorization: Bearer <accessToken>`
- **Response:**
```json
{
  "id": "job-id",
  "documentId": "doc-id",
  "status": "completed",
  "result": { /* analysis result */ },
  "createdAt": "2024-01-01T00:00:00Z",
  "completedAt": "2024-01-01T01:00:00Z"
}
```

---

## Profile

### Get Profile
- **GET** `/api/profile`
- **Headers:** `Authorization: Bearer <accessToken>`
- **Response:**
```json
{
  "id": "user-id",
  "email": "user@example.com",
  "name": "User Name"
}
```

### Update Profile
- **PUT** `/api/profile`
- **Headers:** `Authorization: Bearer <accessToken>`
- **Request:**
```json
{
  "name": "New Name"
}
```
- **Response:**
```json
{
  "id": "user-id",
  "email": "user@example.com",
  "name": "New Name"
}
```

---

## Notes
- All endpoints require authentication except `/auth/login`.
- Use standard HTTP status codes for errors.
- Timestamps are in ISO 8601 format. 