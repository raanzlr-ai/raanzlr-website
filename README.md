# Raanzlr — AI Solutions, Automation & Software Engineering

> Engineering intelligent software for ambitious teams worldwide.

## Tech Stack

- **React 19** — UI framework
- **Tailwind CSS** — styling
- **Framer Motion** — animations
- **React Router v7** — client-side routing
- **Axios** — HTTP requests
- **n8n** — form submission webhooks (contact & service requests)

---

## Project Structure

```
/
├── public/
│   ├── index.html
│   ├── robots.txt
│   └── sitemap.xml
├── src/
│   ├── components/       # Reusable UI components
│   ├── contexts/         # Language context (EN/AR)
│   ├── hooks/            # Custom hooks
│   ├── lib/              # Translations & utilities
│   └── pages/            # Home, Services, About, Contact
├── .env.example          # Required environment variables
├── vercel.json           # Vercel deployment config
└── package.json
```

---

## Deploy on Vercel

### 1. Connect the repo

1. Go to [vercel.com](https://vercel.com) → **Add New Project**
2. Import this repository (`raanzlr-ai/raanzlr-website`)
3. Set **Root Directory** to `frontend`
4. Vercel will auto-detect the build settings from `vercel.json`

### 2. Set Environment Variables

In your Vercel project → **Settings → Environment Variables**, add:

| Variable | Description |
|---|---|
| `REACT_APP_N8N_CONTACT_WEBHOOK` | n8n webhook URL for the general contact form |
| `REACT_APP_N8N_SERVICE_WEBHOOK` | n8n webhook URL for the service request form |

### 3. Deploy

Push to `main` — Vercel will build and deploy automatically.

---

## n8n Webhook Setup

The contact forms POST JSON directly to your n8n webhooks.

### General Contact Form payload
```json
{
  "name": "string",
  "email": "string",
  "whatsapp": "string",
  "subject": "string",
  "message": "string"
}
```

### Service Request Form payload
```json
{
  "service": "string",
  "full_name": "string",
  "email": "string",
  "whatsapp": "string",
  "role": "string",
  "company_type": "string",
  "company_size": "string",
  "budget_range": "string",
  "best_time": "string",
  "challenge": "string"
}
```

In n8n, create two **Webhook** trigger nodes (HTTP Method: `POST`) and connect them to your notification/CRM workflows. Copy each webhook URL into the Vercel environment variables above.

---

## Local Development

```bash
cd frontend
cp .env.example .env.local
# Fill in your n8n webhook URLs in .env.local
npm install --legacy-peer-deps
npm start
```

---

## License

Private — All rights reserved © Raanzlr
