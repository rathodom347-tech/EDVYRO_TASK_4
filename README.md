# Om Career Hub — Production-Ready Capstone
**EdVyro · Full Stack Development · Task 4**

A polished yellow-and-charcoal internship portal with a complete discovery-to-application journey, responsive layout, server-side validation, persistent application records, operational logging, health checks and automated regression tests.

## Run locally
Requirements: Node.js 20 or 22 LTS and npm.
```powershell
npm install
Copy-Item .env.example .env
npm run check
npm test
npm run dev
```
Open `http://localhost:5000`.

## Product journey
1. Browse seeded internship opportunities.
2. Search by role, company, domain or skill.
3. Filter by Remote, Hybrid or On-site.
4. Open an application form for a selected role.
5. Submit details; the server validates and stores the application.
6. Receive success, validation, duplicate or server feedback.

## API
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/health` | Health check |
| GET | `/api/internships` | List and search opportunities |
| GET | `/api/internships/:id` | Get one opportunity |
| POST | `/api/applications` | Submit an application |

Search example: `/api/internships?q=react&mode=Remote`

## Engineering decisions
- Express serves the frontend and API from one origin, avoiding unnecessary client configuration.
- Zod validates every application on the server; browser validation improves usability but is not trusted as a security boundary.
- JSON persistence keeps setup beginner-friendly and avoids native database compilation; the storage module can be replaced with PostgreSQL/SQLite for a multi-user production deployment.
- Duplicate applications are rejected using internship ID and normalized email.
- Helmet, CORS, a 20 KB JSON body limit and rate limiting reduce common API risks.
- Request logs include method, route, status and duration; errors are logged as structured JSON.
- `/api/health` provides a lightweight operational health check.

## Accessibility and responsive checks
- Semantic landmarks, labelled inputs, visible focus styles and skip link.
- Live status announcements for loading, empty, error and form outcomes.
- Keyboard-operable buttons and native dialog.
- Reduced-motion preference respected.
- Mobile layout adapts navigation, cards, filters and form.

## Quality checks
```powershell
npm run check
npm test
```
Manual release checklist:
- [ ] Test search and each work-mode filter.
- [ ] Submit a valid application.
- [ ] Submit invalid email / missing fields and confirm server rejects it.
- [ ] Submit the same email for the same role and confirm HTTP 409.
- [ ] Check mobile layout at 375px and 768px widths.
- [ ] Check keyboard-only navigation and visible focus.
- [ ] Inspect browser console and `/api/health`.
- [ ] Run an accessibility audit (Lighthouse or axe) and record actual results.
- [ ] Run Lighthouse performance and security checks; report measured scores rather than assumed scores.
- [ ] Add screenshots and a short engineering-decision summary before submission.

## Deployment
Set `PORT` and `DATA_DIR` in the hosting environment. For deployment with ephemeral filesystems, use a managed database or persistent volume before accepting real applications. Configure HTTPS and restrict CORS to the deployed frontend origin.

## Project structure
```text
public/                 responsive yellow/charcoal frontend
  index.html
  styles.css
  app.js
src/
  app.js
  server.js
  store.js
  middleware/errors.js
  routes/api.js
tests/api.test.js
docs/                   (API notes can be added here)
```
