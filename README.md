# Wedding Invitation Web App — H. FARHAN AHAMED & A. ARSHITHA

A luxury digital wedding invitation web app recreated from [invitation-six-tau-49.vercel.app](https://invitation-six-tau-49.vercel.app/), customized with the invitation details from `invitation  details.pdf`.

Built with **React**, **Vite**, **Tailwind CSS**, and **Lucide Icons**, incorporating typography (Amiri, Cormorant Garamond, Plus Jakarta Sans), animations, background violin music with audio fallbacks, live countdown timer, and interactive RSVP.

---

## 💍 Wedding Details

- **Groom**: **H. Farhan Ahamed**
  - Parents: Mr. Hameed & Mrs. Latheefa Beevi
  - Grandparents: Grand S/o. (Late) Syed Mohammed - (Late) Asma Beevi & (Late) Mohammed Mytheen - Salma Beevi
  - Address: 1-82A, Eluppavilai 1st Street, Thiruvithancode
  - Contact: 8220661566
- **Bride**: **A. Arshitha**
  - Parents: Mr. Abdul Gulam Azad & Mrs. Thoulath Nisha
  - Address: 1-97/B, Near IMS, Thiruvithancode
- **Nikkah Ceremony**:
  - **Date**: Thursday, 31st December 2026 (Rajab 22, Hijri 1448)
  - **Time**: 12.00 Noon
  - **Venue**: Light House Auditorium, Azhagiyamandapam, Kanyakumari District, Tamil Nadu
  - **Bridegroom Party Starts from**: Masha Mahal, Thiruvithancode
- **Wedlock Dua**:
  - `بَارَكَ اللَّهُ لَكَ وَبَارَكَ عَلَيْكَ وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ`
  - *"May Allah bless you, and shower His blessings upon you, and bring you together in goodness."*
- **Warm Regards From**:
  - Faizal, Fayas, Mehfin

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build for Production
```bash
npm run build
```
The optimized production bundle will be generated in `dist/`.

### 4. Preview Production Build Locally
```bash
npm run preview
```

---

## 💌 Interactive RSVP Features

- **Private Google Sheet Sync**: Live real-time response capture connected to Google Apps Script.
- **Instant Email Alerts**: Direct email notifications sent to the host's email.
- **1-Tap WhatsApp Confirmation**: Instant confirmation dispatch to host WhatsApp (`8220661566`).
- **Local Storage Fallback**: Browser-level caching so responses are never lost even offline.

---

## 🎨 Configuration

All wedding details are cleanly organized in:
📁 [`src/weddingData.js`](file:///c:/Users/jazee/farhaan%20invitation/src/weddingData.js)

---

## 🌐 Deploy to Production (Vercel / Netlify)

### Option 1: Vercel (Recommended & 1-Click Free Hosting)
1. Push your code to GitHub.
2. Go to [vercel.com](https://vercel.com) and sign in with GitHub.
3. Click **"Add New Project"** and select your wedding repository.
4. Framework Preset will automatically detect **Vite**. Click **Deploy**!

### Option 2: Netlify
1. Go to [netlify.com](https://netlify.com) and connect your GitHub repository.
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Click **Deploy Site**!
