# LLM Bias Showcase Website

Interactive website showcasing the results of the LLM bias study, demonstrating how fine-tuning affects model outputs.

## Project Structure

```
website/
├── src/
│   ├── api/
│   │   └── client.js          # API client for Modal backend
│   ├── components/
│   │   ├── FindingsPage.jsx   # Main findings/results page
│   │   ├── InteractivePage.jsx # Interactive demo with 4 models
│   │   ├── PasswordGate.jsx   # Password protection component
│   │   └── ResponseCard.jsx   # Individual model response card
│   ├── App.jsx                # Main app with routing
│   └── index.css              # Global styles with Tailwind
├── .env.example               # Environment variable template
└── .env.local                 # Local environment config
```

## Features

### Page 1: Findings
- Project overview and methodology
- Key findings (placeholder sections for your content)
- Quantitative metrics
- Sample comparisons
- Password-protected link to interactive demo

### Page 2: Interactive Demo
- Text input for custom prompts
- Example prompts to try
- Side-by-side comparison of all 4 model responses:
  - Base Model (unmodified Llama-3.2-1B)
  - Pro-Israeli Model
  - Pro-Palestinian Model
  - Neutral Model
- Real-time inference via Modal API

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Copy `.env.example` to `.env.local` and update with your Modal API URL:

```bash
cp .env.example .env.local
```

Edit `.env.local`:
```
VITE_API_URL=https://your-modal-app.modal.run
```

### 3. Run Development Server

```bash
npm run dev
```

Open http://localhost:5173

## Deployment to Vercel

### 1. Deploy Modal Backend First

From the project root (not website directory):

```bash
# Deploy the Modal web endpoint
modal deploy web_app.py

# Copy the URL that Modal provides (e.g., https://xxx--llm-bias-inference.modal.run)
```

### 2. Deploy Frontend to Vercel

```bash
# Install Vercel CLI if needed
npm install -g vercel

# From the website directory
cd website

# Deploy
vercel
```

### 3. Configure Environment Variable in Vercel

In the Vercel dashboard for your project:

1. Go to **Settings** → **Environment Variables**
2. Add: `VITE_API_URL` = `https://your-modal-url.modal.run`
3. Redeploy: `vercel --prod`

## Password Protection

The demo page is protected with a hardcoded password. Default password: `daedalus2025`

To change it, edit `src/components/PasswordGate.jsx`:
```javascript
const CORRECT_PASSWORD = 'your-new-password';
```

## Development Notes

### API Client
- Located in `src/api/client.js`
- Uses axios for HTTP requests
- 60-second timeout for model inference
- Error handling for network issues

### Routing
- `/` - Findings page
- `/demo` - Interactive demo (requires password)
- Authentication state stored in sessionStorage

### Styling
- Tailwind CSS for all styling
- Responsive design (mobile-friendly)
- Color-coded model responses

## Tech Stack

- **Frontend**: React + Vite
- **Routing**: React Router DOM
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios
- **Backend**: Modal (FastAPI + GPU inference)
- **Hosting**: Vercel (frontend) + Modal (backend)

## Troubleshooting

### CORS Errors
Ensure the Modal web endpoint has CORS configured for your Vercel domain. The `web_app.py` includes CORS middleware that allows Vercel domains.

### Slow Response Times
- First request may take 30-60 seconds (cold start)
- Subsequent requests: 15-20 seconds
- Modal's `keep_warm=1` setting helps reduce cold starts

### Authentication Issues
If redirected back to findings page:
- Check browser console for errors
- Clear sessionStorage: `sessionStorage.clear()`
- Verify password is correct

## License

Educational research project - Data 259
