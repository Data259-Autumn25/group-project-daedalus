# Website Deployment Guide

Complete guide to deploying the LLM Bias Showcase website.

## Architecture

```
┌─────────────────┐         ┌──────────────────┐         ┌─────────────────┐
│   Vercel        │         │   Modal          │         │   Modal         │
│   (Frontend)    │────────▶│   (API)          │────────▶│   (GPU Models)  │
│   React SPA     │  HTTPS  │   FastAPI        │         │   4x Llama-3.2  │
└─────────────────┘         └──────────────────┘         └─────────────────┘
```

## Prerequisites

1. **Modal Account**: Sign up at [modal.com](https://modal.com)
2. **Modal CLI**: Install and authenticate
   ```bash
   pip install modal
   modal token new
   ```
3. **HuggingFace Token**: Required for Llama model access
   - Get token from https://huggingface.co/settings/tokens
   - Add to Modal: `modal secret create huggingface-secret HUGGING_FACE_HUB_TOKEN=your_token`
4. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
5. **Trained Models**: Ensure models exist in Modal volume at `/data/llm_bias_study/models/finetuned/`

---

## Part 1: Deploy Modal Backend

### Step 1: Verify Modal Setup

```bash
# Check Modal authentication
modal token list

# Verify HuggingFace secret exists
modal secret list
```

### Step 2: Test Modal Function Locally (Optional)

```bash
# Run Modal web app in development mode
modal serve web_app.py
```

This will give you a local URL like `http://localhost:8000` to test the API.

### Step 3: Deploy to Modal Production

```bash
# Deploy the web endpoint
modal deploy web_app.py
```

**Expected Output:**
```
✓ Created web function llm-bias-inference
View Deployment: https://modal.com/apps/xxx
Endpoint: https://xxx--llm-bias-inference.modal.run
```

**Save this endpoint URL!** You'll need it for the frontend configuration.

### Step 4: Test Modal API

```bash
# Test health endpoint
curl https://YOUR-MODAL-URL.modal.run/health

# Test generate endpoint (expect ~20 second response)
curl -X POST https://YOUR-MODAL-URL.modal.run/api/generate \
  -H "Content-Type: application/json" \
  -d '{"prompt": "What is the Israel-Palestine conflict?", "max_tokens": 100}'
```

---

## Part 2: Deploy Frontend to Vercel

### Method A: Deploy via Vercel Dashboard (Recommended)

1. **Push code to Git**:
   ```bash
   cd website
   git init
   git add .
   git commit -m "Initial website commit"
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```

2. **Import to Vercel**:
   - Go to [vercel.com/new](https://vercel.com/new)
   - Click "Import Git Repository"
   - Select your repository
   - Configure:
     - **Framework Preset**: Vite
     - **Root Directory**: `website` (or wherever your React app is)
     - **Build Command**: `npm run build`
     - **Output Directory**: `dist`

3. **Add Environment Variable**:
   - In Vercel dashboard → Settings → Environment Variables
   - Add: `VITE_API_URL` = `https://YOUR-MODAL-URL.modal.run`
   - Apply to: Production, Preview, Development

4. **Deploy**:
   - Click "Deploy"
   - Wait for build to complete (~2-3 minutes)
   - Get your URL: `https://your-project.vercel.app`

### Method B: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Navigate to website directory
cd website

# Login to Vercel
vercel login

# Deploy (follow prompts)
vercel

# Add environment variable
vercel env add VITE_API_URL production
# Paste: https://YOUR-MODAL-URL.modal.run

# Deploy to production
vercel --prod
```

---

## Part 3: Verify Deployment

### Test Checklist

1. **Frontend Loads**:
   - Visit `https://your-project.vercel.app`
   - Findings page should display correctly

2. **Password Protection Works**:
   - Click "Access Interactive Demo"
   - Enter password: `daedalus2025`
   - Should navigate to `/demo`

3. **Interactive Demo Functions**:
   - Enter a prompt
   - Click "Generate Responses"
   - Wait 15-20 seconds
   - All 4 model responses should appear

4. **CORS is Configured**:
   - Check browser console for CORS errors
   - Should see no CORS-related errors

### Troubleshooting

#### Issue: CORS Errors
**Solution**: Update `web_app.py` to include your Vercel domain:
```python
allow_origins=[
    "https://your-project.vercel.app",
    "https://*.vercel.app",
]
```
Redeploy Modal: `modal deploy web_app.py`

#### Issue: 404 on Modal Endpoint
**Solution**: Verify endpoint URL is correct and models are loaded in Modal volume

#### Issue: Models Not Found
**Solution**: Check Modal volume has trained models:
```bash
modal volume ls llm-bias-study-data
```
If empty, run training first: `python main.py train --mode=remote`

#### Issue: Slow First Request (>60 seconds)
**Solution**: Normal - cold start loads all 4 models. Subsequent requests are faster.

---

## Part 4: Update Configuration

### Update Modal Endpoint URL

If you need to change the API URL after deployment:

1. Update `.env.local` for local development
2. Update environment variable in Vercel dashboard
3. Redeploy frontend: `vercel --prod`

### Update Password

Edit `website/src/components/PasswordGate.jsx`:
```javascript
const CORRECT_PASSWORD = 'your-new-password';
```
Commit and redeploy.

---

## Monitoring & Maintenance

### Modal Dashboard
- View function logs: https://modal.com/apps
- Monitor usage and costs
- Check GPU utilization

### Vercel Dashboard
- View deployment logs
- Monitor bandwidth usage
- Check build status

### Cost Estimates
- **Modal**: ~$0.50-1.00/hour for A10G GPU (only when active)
- **Vercel**: Free tier sufficient for low-traffic academic sites

---

## Security Considerations

1. **Password Protection**: Current implementation is client-side only
   - Sufficient for sharing with trusted users
   - Not secure against determined attackers
   - Consider server-side auth for public deployment

2. **Rate Limiting**: Not implemented
   - Consider adding rate limits to prevent abuse
   - Modal has built-in concurrency limits

3. **API Key**: No API key required currently
   - Consider adding if website becomes public

---

## Quick Reference

### Key Files
- `web_app.py` - Modal backend API
- `website/src/api/client.js` - API client
- `website/src/components/` - React components
- `website/.env.local` - Local environment config

### Key Commands
```bash
# Deploy Modal backend
modal deploy web_app.py

# Run frontend locally
cd website && npm run dev

# Deploy frontend to Vercel
cd website && vercel --prod

# View Modal logs
modal app logs llm-bias-study

# Test Modal API
curl https://YOUR-URL.modal.run/health
```

---

## Next Steps

1. **Populate Findings Page**: Replace placeholder content with actual research findings
2. **Add Visualizations**: Create charts from results data
3. **Custom Domain**: Add custom domain in Vercel dashboard (optional)
4. **Analytics**: Add analytics tracking (Vercel Analytics, Google Analytics, etc.)
5. **SEO**: Update meta tags for better search visibility

---

## Support

For issues with:
- **Modal**: Check [Modal docs](https://modal.com/docs) or Discord
- **Vercel**: Check [Vercel docs](https://vercel.com/docs)
- **This Project**: Contact project maintainer

---

**Deployment Complete!** Your LLM Bias Showcase website should now be live and functional.
