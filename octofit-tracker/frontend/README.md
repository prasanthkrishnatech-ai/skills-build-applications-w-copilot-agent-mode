# OctoFit Tracker Frontend

This frontend uses React 19 with Vite and react-router-dom to navigate between:

- Users
- Teams
- Activities
- Leaderboard
- Workouts

## Environment variable setup

Define `VITE_CODESPACE_NAME` in `.env.local` so the app can build Codespaces API URLs:

```bash
VITE_CODESPACE_NAME=your-codespace-name
```

The frontend builds API endpoints in this format when `VITE_CODESPACE_NAME` is set:

```text
https://${VITE_CODESPACE_NAME}-8000.app.github.dev/api/[component]/
```

Safe fallback behavior is included. If `VITE_CODESPACE_NAME` is unset, the app uses localhost:

```text
http://localhost:8000/api/[component]/
```

## Run the app

```bash
npm run dev
```
