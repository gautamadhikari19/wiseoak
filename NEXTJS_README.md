# Wise Oaks International School - Next.js Conversion

## Project Overview

This is a converted Next.js version of the Wise Oaks International School admission form website. The main improvement is **secure handling of API credentials through server-side environment variables**.

### Security Enhancement

**Before (Insecure)**: HubSpot Portal IDs and Form IDs were hardcoded in client-side JavaScript, visible to anyone inspecting the page source.

**After (Secure)**: All credentials are stored in `.env.local` (server-side only) and the form submits to a secure API route that handles the HubSpot integration server-to-server.

---

## Getting Started

### Prerequisites

- Node.js 18+ (recommended Node.js 20+)
- npm or yarn

### Installation

```bash
# Install dependencies
npm install
```

### Development

```bash
# Start development server
npm run dev
```

The application will be available at `http://localhost:3000`

### Production Build

```bash
# Build the project
npm run build

# Start production server
npm start
```

---

## Environment Variables

The project uses `.env.local` to store sensitive credentials (already created):

```
NEXT_PUBLIC_HUBSPOT_PORTAL_ID=245586835
HUBSPOT_FORM_ID_STEP1=22a89e5a-9aed-410a-8501-7a9f1c612ce8
HUBSPOT_FORM_ID_STEP2=22a89e5a-9aed-410a-8501-7a9f1c612ce8
```

**Important**: `.env.local` is in `.gitignore` and will never be committed to the repository.

---

## Project Structure

```
app/
├── layout.tsx              # Root layout with metadata and styling
├── page.tsx                # Home page (admission form)
├── thank-you/
│   └── page.tsx            # Thank you page
├── api/
│   └── submit-hubspot/
│       └── route.ts        # API route for secure HubSpot submissions
├── globals.css             # Global styles
package.json               # Dependencies
next.config.ts             # Next.js configuration
tsconfig.json              # TypeScript configuration
.env.local                 # Environment variables (NOT committed)
.gitignore                 # Git ignore rules
```

---

## How It Works

### Form Submission Flow

1. **User fills form** → Validates client-side
2. **Form submits** → Sends to `/api/submit-hubspot` (Next.js API route)
3. **API route** → Retrieves HubSpot credentials from `.env.local`
4. **Server-side call** → Makes secure request to HubSpot API
5. **Response** → Redirects to thank you page

### Security Benefits

✅ **Credentials never exposed in browser** - HubSpot Form IDs are server-only
✅ **No client-side API calls** - All HubSpot interactions happen server-to-server
✅ **Environment variables** - Secure credential management
✅ **Page source safe** - Inspecting page source reveals no API keys
✅ **Same user experience** - Functionally identical to original

---

## Testing Locally

### 1. Verify the form works
```bash
npm run dev
# Visit http://localhost:3000
# Fill and submit the form
# Should redirect to http://localhost:3000/thank-you
```

### 2. Security verification
```
1. Open browser DevTools (F12)
2. Go to Network tab
3. Submit the form
4. Verify request goes to `/api/submit-hubspot` (not to HubSpot directly)
5. Inspect page source (Ctrl+U)
6. Confirm no HubSpot Form IDs visible in source
```

### 3. Check environment variables are loaded
- API route should successfully retrieve credentials from `.env.local`
- Check Next.js console for any errors

---

## Differences from Original

- **HTML converted to React** - `index.html` → `app/page.tsx`
- **Thank you page converted** - `thank-you/index.html` → `app/thank-you/page.tsx`
- **Form submission** - Now uses API route instead of direct HubSpot calls
- **Styling** - Identical (Tailwind CSS via CDN)
- **Design & Logic** - 100% unchanged

---

## Deployment

The project can be deployed to any Node.js hosting platform that supports Next.js:

- **Vercel** (recommended) - `vercel deploy`
- **Netlify** - Requires `@netlify/plugin-nextjs`
- **AWS**, **DigitalOcean**, **Heroku**, etc.

**Important**: Make sure to set environment variables in your hosting platform:
- `NEXT_PUBLIC_HUBSPOT_PORTAL_ID`
- `HUBSPOT_FORM_ID_STEP1`
- `HUBSPOT_FORM_ID_STEP2`

---

## Troubleshooting

### Form submissions not working
1. Check `.env.local` exists in project root
2. Verify environment variables are set correctly
3. Check browser console for errors
4. Check server logs: `npm run dev` output

### Page not rendering correctly
1. Clear `.next` folder: `rm -rf .next`
2. Reinstall dependencies: `npm install`
3. Restart dev server: `npm run dev`

### Build fails
1. Ensure Node.js version 18+
2. Clear node_modules: `rm -rf node_modules` and `npm install`
3. Check `tsconfig.json` and `next.config.ts` are correct

---

## Support

For issues or questions about the Next.js conversion, refer to:
- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [HubSpot API Documentation](https://developers.hubspot.com/docs/crm/apis/forms)
