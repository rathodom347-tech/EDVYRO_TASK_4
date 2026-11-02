# Engineering Decisions — Om Career Hub

## Architecture
Single Express application serves static assets and `/api` routes. This keeps local setup simple and allows same-origin requests.

## Data persistence
Applications are persisted to `data/applications.json`. This is suitable for a learning/demo deployment with a persistent filesystem, not a horizontally scaled production service. A managed SQL database is the recommended next step.

## Validation and errors
Client-side constraints improve the form experience. Zod performs authoritative server-side validation. API responses use consistent `success`, `data`, `message` and `error` fields. Duplicate application requests return HTTP 409.

## Security
Helmet headers, request body size limit, CORS middleware and API rate limiting are enabled. Do not store secrets in source control. Production deployment should use HTTPS and an explicit allowed-origin list.

## Operational readiness
Structured request logs record method, path, status, duration and timestamp. `/api/health` reports service health. Regression tests cover health, list, validation, successful application and duplicate prevention.
