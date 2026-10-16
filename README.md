# Naughty Mulaqat — Premium 18+ Adult Model Directory

A luxury, responsive 18+ adult model directory built with **Next.js App Router**, **JavaScript**, **Tailwind CSS**, **Firebase Firestore**, and **Framer Motion**.

---

## Features

- **Luxury Aesthetics**: Pastel pink, ivory, and soft lavender design palette with glassmorphism, subtle glows, and editorial typography (Playfair Display & Plus Jakarta Sans).
- **Strict Logo-Only Header**: The top navigation contains exclusively the centered brand logo without menus or extra links.
- **18+ Age Verification Modal**: Gatekeeper modal requiring visitors to certify they are 18 or older before viewing content (with persistent session storage).
- **Bangalore & Pune Exclusive**:
  - No city selected by default.
  - Interactive city selection banner and cards.
  - Content displays dynamically only after a city is selected.
  - Dedicated dynamic city pages: `/city/bangalore` and `/city/pune`.
- **Nightlife Banner**: Panoramic Neon Nightlife Street Scene banner showcased directly above the search section.
- **Firebase-Powered Search & Filters**:
  - City dropdown (Bangalore, Pune)
  - Category dropdown (VIP Escorts, College Girls, Independent Models, Elite Companions, Air Hostess)
  - Age range dropdown (18-21, 22-25, 26-29, 30-35)
  - Full-text search by model name, area/locality, or service keywords.
  - Localized area chips (Indiranagar, Koramangala, Whitefield, MG Road, Koregaon Park, Baner, Kalyani Nagar, etc.).
- **Privacy Controls**:
  - **Blurred Photos by Default**: Clean privacy blur with an interactive "Unblur Photo" / "Tap to Reveal" toggle.
  - **Blurred / Masked Phone Numbers**: Displayed as `+91 98••• •••89` with a "Reveal" button.
  - Direct WhatsApp and phone call buttons with pre-filled booking messages.
- **Detailed Model Profiles**: Modal dialog showing full photo preview, hourly & overnight tariffs, physical attributes, spoken languages, verified badges, and services list.
- **Dual-Layer Firestore Integration**: Fetches directly from Firestore with automatic, resilient fallback to rich seeded local data if permissions are locked or offline.

---

## Project Structure

```
escort/
├── app/
│   ├── city/
│   │   └── [slug]/
│   │       ├── CityClientView.js       # Client interactive view for city page
│   │       └── page.js                 # Dynamic SEO city route (/city/bangalore, /city/pune)
│   ├── globals.css                     # Tailwind CSS v4 & luxury theme tokens
│   ├── layout.js                       # Root layout with Logo-only header & footer
│   └── page.js                         # Main home directory with interactive filters
├── components/
│   ├── AgeVerificationModal.js         # 18+ age confirmation modal
│   ├── CitySelectorPrompt.js           # Prompt displayed when no city is selected
│   ├── HeroBanner.js                   # Neon nightlife banner above search
│   ├── ModelCard.js                    # Model card with blurred photo & masked number
│   ├── ModelDetailModal.js             # Detailed model profile popup
│   └── SearchFilterBar.js              # City, Category, Age dropdowns and search
├── data/
│   └── seedData.js                     # 35 Indian profiles, categories, age ranges, locations
├── lib/
│   ├── firebase.js                     # Firebase app, Firestore & Storage initialization
│   └── firestoreService.js             # Firestore queries with error handling & fallback
├── public/
│   └── images/
│       ├── logo.png                    # Brand logo
│       ├── nightlife-banner.png        # Nightlife street scene
│       └── models/                     # 35 model photos (model-1.jpeg to model-35.jpeg)
├── scripts/
│   └── seed-firestore.mjs              # Node.js script to seed Firestore database
├── firestore.indexes.json              # Composite index definitions
├── firestore.rules                     # Firestore security rules
└── package.json
```

---

## Installation & Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build for Production
```bash
npm run build
npm start
```

---

## Firebase Firestore Setup & Rules

### Firestore Security Rules
In your [Firebase Console](https://console.firebase.google.com/project/escort-7d56f/firestore/rules), paste the rules from `firestore.rules`:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read: if true;
      allow write: if request.auth != null; // or allow write: if true; during initial setup
    }
  }
}
```

### Seeding Data to Firestore
Once rules allow writes (or in test mode), run the automated seed script:
```bash
npm run seed
```
This script will automatically populate:
- `cities` (Bangalore, Pune)
- `categories` (VIP Escorts, College Girls, Independent Models, Elite Companions, Air Hostess)
- `ageRanges` (18-21, 22-25, 26-29, 30-35)
- `locations` (Bangalore & Pune localities)
- `profiles` (All 35 verified model profiles with photos, rates, and bios)
