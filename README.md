# Jane Bullies – Website

Custom stud banners ($30), breeding banners ($55) and kennel logos ($80).
Built with **React + Vite + Tailwind CSS v4**.

## 1. Before you publish: edit your details

Open **`src/config.js`** and replace the placeholder contact info:

```js
export const CONTACT = {
  email: 'janebully461@gmail.com',    // ← your real email (order requests go here)
  whatsapp: '',                      // ← e.g. '15551234567' (leave '' to hide)
  facebook: '',
  tiktok: 'janebullies',
}
```

Prices, service features and payment methods are in the same file.

To add more portfolio images: put the `.jpg` in `public/samples/` and add a line in `src/data/samples.js`.

## 2. Run it on your computer (optional)

Requires Node.js 20+.

```bash
npm install
npm run dev
```

Open http://localhost:5173

## 3. Put it on GitHub

```bash
git init
git add .
git commit -m "Jane Bullies website"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/jane-bullies.git
git push -u origin main
```

(Or create the repo on github.com and upload the folder contents — **don't upload `node_modules`**.)

## 4. Deploy on Vercel

1. Go to https://vercel.com → **Add New… → Project**
2. Import your `jane-bullies` GitHub repo
3. Vercel detects **Vite** automatically:
   - Build command: `npm run build`
   - Output directory: `dist`
4. Click **Deploy**

Every time you push to GitHub, Vercel redeploys automatically.
To use your own domain: Vercel project → **Settings → Domains**.

## Project structure

```
index.html              page title, SEO tags, fonts
public/samples/         portfolio images
public/favicon.svg
src/config.js           ← prices, contact, payments (edit me)
src/data/samples.js     ← portfolio list
src/App.jsx             page layout
src/index.css           Tailwind + brand colours/fonts
src/components/         Navbar, Hero, Pricing, Gallery, Lightbox,
                        SketchToLogo, Process, OrderForm, FAQ, Footer
```

## How ordering works

The order form sends each order (with the customer's photos) straight to the email in
`src/config.js` using **FormSubmit** (https://formsubmit.co), a free service that needs no account.

**First time only:** after the first test order, FormSubmit emails that inbox an
**"Activate Form"** message (check Spam too). Click **Activate**, and every order after that is delivered.
You may be asked to activate once more when the live Vercel site sends its first order.
