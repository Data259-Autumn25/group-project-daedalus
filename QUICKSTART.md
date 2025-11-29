# Quick Start Guide

Get your LLM Bias Showcase website up and running in 3 steps.

---

## Prerequisites

- [ ] Modal account with authentication (`modal token new`)
- [ ] HuggingFace secret configured in Modal
- [ ] Trained models in Modal volume
- [ ] Vercel account

---

## Step 1: Deploy Backend (5 minutes)

```bash
# From project root
modal deploy web_app.py
```

**Expected output:**
```
✓ Created web function llm-bias-inference
Endpoint: https://xxx--llm-bias-inference.modal.run
```

**Copy this URL!** You'll need it next.

---

## Step 2: Test Locally (5 minutes)

```bash
# Navigate to website
cd website

# Configure environment
echo "VITE_API_URL=https://YOUR-MODAL-URL.modal.run" > .env.local

# Install dependencies (if not done)
npm install

# Run dev server
npm run dev
```

Visit **http://localhost:5173** and test:
1. Findings page loads
2. Click "Access Interactive Demo"
3. Enter password: `daedalus2025`
4. Enter a prompt and generate responses
5. Wait ~20 seconds for all 4 model responses

---

## Step 3: Deploy to Vercel (5 minutes)

### Option A: Vercel Dashboard (Easiest)

1. Push code to GitHub
2. Go to https://vercel.com/new
3. Import your repository
4. Set **Root Directory**: `website`
5. Add environment variable:
   - `VITE_API_URL` = `https://YOUR-MODAL-URL.modal.run`
6. Deploy!

### Option B: Vercel CLI

```bash
# Install CLI
npm install -g vercel

# Deploy
cd website
vercel

# Add environment variable
vercel env add VITE_API_URL production
# Paste: https://YOUR-MODAL-URL.modal.run

# Deploy to production
vercel --prod
```

---

## Verify Deployment

✅ Visit your Vercel URL
✅ Findings page displays correctly
✅ Password protection works (password: `daedalus2025`)
✅ Interactive demo generates responses from all 4 models

---

## Troubleshooting

### "Models not found"
Ensure models exist in Modal volume:
```bash
modal volume ls llm-bias-study-data
```

### CORS errors
Update `web_app.py` with your Vercel domain and redeploy:
```bash
modal deploy web_app.py
```

### Build fails
```bash
cd website
rm -rf node_modules package-lock.json
npm install
npm run build
```

---

## Next Steps

1. **Customize findings page**: Edit `website/src/components/FindingsPage.jsx`
2. **Change password**: Edit `website/src/components/PasswordGate.jsx`
3. **Add custom domain**: Configure in Vercel dashboard
4. **Monitor usage**: Check Modal and Vercel dashboards

---

## Key Files

- `web_app.py` - Modal backend
- `website/src/components/FindingsPage.jsx` - Page 1
- `website/src/components/InteractivePage.jsx` - Page 2
- `website/.env.local` - Environment config

---

## Support

- Full deployment guide: `DEPLOYMENT.md`
- Implementation details: `IMPLEMENTATION_SUMMARY.md`
- Website docs: `website/README.md`

---

**That's it!** Your website should now be live at `https://your-project.vercel.app`
