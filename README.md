# Full-Stack Portfolio (Unified Monorepo)

A unified workspace containing both the **React (Vite)** Frontend and **Django REST Framework** Backend in one place.

## 📁 Directory Structure

```text
Backend_Django/
├── backend/                  # Django REST Framework Backend
│   ├── config/               # Django project settings & root URLs
│   ├── visitors/             # Visitor tracking API app
│   ├── manage.py             # Django management CLI
│   ├── requirements.txt      # Python dependencies
│   └── .env                  # Backend environment settings
├── frontend/                 # React (Vite + Tailwind + TypeScript)
│   ├── src/                  # React source code & components
│   ├── vite.config.ts        # Vite configuration (proxies /api to Django)
│   ├── package.json          # Frontend dependencies & scripts
│   └── .env.example          # Frontend environment example
├── venv/                     # Python Virtual Environment
├── package.json              # Root package to run full-stack concurrently
├── dev.bat                   # 1-Click Windows launch script
└── .gitignore                # Root gitignore for Python & Node
```

---

## 🚀 Quick Start (Running Both in One Place)

### Option 1: Using npm (Recommended)
From the root directory (`Backend_Django`):

```bash
npm run dev
```
> This runs both the **Django API** (`http://127.0.0.1:8000`) and the **React Frontend** (`http://localhost:8080`) simultaneously with live reloading and automatic `/api` proxying.

### Option 2: 1-Click Windows Batch Script
Double-click [`dev.bat`](file:///c:/Users/vyza1/OneDrive/Desktop/Backend_Django/dev.bat) or run in terminal:
```cmd
dev.bat
```

---

## 🛠️ Individual Commands

| Command | Description |
| :--- | :--- |
| `npm run dev` | Runs backend + frontend concurrently in one terminal |
| `npm run frontend` | Starts only the React/Vite development server (`:8080`) |
| `npm run backend` | Starts only the Django REST development server (`:8000`) |
| `npm run build` | Builds the React frontend for production (`frontend/dist`) |
| `npm run migrate` | Runs Django database migrations |
| `npm run makemigrations` | Creates new Django database migrations |

---

## 🔌 API & Communication
- **Visitor API Endpoint:** `POST /api/visitors/` or `POST /api/visitor`
- **Proxy:** Vite automatically proxies any frontend request starting with `/api` to `http://127.0.0.1:8000` during development.
- **Telegram Notifications:** Set `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID` in `backend/.env` for instant visitor alerts.

---

## 🐳 Docker Deployment

The entire stack is containerized with Docker & Docker Compose (PostgreSQL + Django/Gunicorn + React/Nginx Reverse Proxy):

### 1. Start All Containers
```bash
docker compose up --build -d
```
*(or `npm run docker:build`)*

### 2. Services Started:
- **Frontend (Nginx SPA + Reverse Proxy):** `http://localhost:80` (or `http://localhost`)
- **Django REST Backend (Gunicorn):** `http://localhost:8000`
- **PostgreSQL Database:** `localhost:5432`

### 3. Docker Management Commands:
| Command | Description |
| :--- | :--- |
| `docker compose up -d` | Start containers in background |
| `docker compose logs -f` | View live logs from all containers |
| `docker compose down` | Stop and remove containers |
| `docker compose down -v` | Stop containers and remove persistent database volume |

