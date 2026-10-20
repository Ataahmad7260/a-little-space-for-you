# A Little Space for You ♡

> *A private, handcrafted digital universe filled with poetry, starlight, and quiet warmth, dedicated to someone truly special.*

---

## ✨ Features & Experiences

1. **The Beginning (Homepage)**
   - Ambient celestial night sky with floating stars, subtle glowing nebulae, and shooting stars.
   - Smooth typewriter reveal:
     > *"In a world of passing faces,*  
     > *Some souls feel like familiar places."*
   - Glowing CTA button: *"There's Something for You ♡"* with starlight burst and gentle scroll transition.

2. **Words I Never Said (Poetry Section)**
   - 4 Interactive 3D flip poetry cards with glassmorphism styling:
     - **Somewhere Between Us** (*"Not every bond demands a name..."*)
     - **A Little Reminder** (*"When days grow heavy, skies turn grey..."*)
     - **Unspoken** (*"Some words are better left unsaid..."*)
     - **Your Existence** (*"You need not shine like distant stars..."*)
   - Each card can be flipped with a tap, features a **Copy Stanza** button, and a **Cherish ♡** starlight interaction.

3. **Interactive Surprises**
   - **💌 Open When You're Sad**: A 3D wax-sealed envelope that opens to reveal a comforting letter and an optional 10-second guided breathing circle.
   - **✨ Catch a Star**: Floating constellation stars across an observation sky. Clicking a star bursts into starlight and reveals a heartwarming affirmation (8 unique stars, counter, and a celestial wish celebration).
   - **📷 Memory Wall**: Polaroid-style glass memory cards. Includes a photo viewer lightbox and an **Add a Personal Memory** modal supporting file uploads, custom captions, dates, locations, and tags (saved in browser memory).

4. **Before You Leave (Final Page)**
   - A single, bioluminescent glowing flower with animated breathing petals.
   - Slow, line-by-line reveal of the closing verse:
     > *"If life were a book of endless pages,*  
     > *And people were words I came across,*  
     > *You'd be the line I'd read twice,*  
     > *Afraid its meaning might get lost."*
   - Signoff: *"Made with words, especially for you. ♡"*
   - **"Read It Again"** button to restart the journey smoothly from the beginning.

5. **Subtle Details & Performance**
   - **Ambient Piano Music**: Built-in, zero-dependency Web Audio API synthesizer generating relaxing Erik Satie-style piano and celesta chords. Non-autoplay by default with an accessible header toggle.
   - **Custom Starlight Cursor**: Smooth spring-physics cursor with hover reaction and starlight trail (desktop only).
   - **Floating Hearts**: Soft romantic heart bubbles float up when interacting.
   - **Accessibility & Mobile-First**: Adaptive star count for low-end devices, GPU-accelerated CSS, and full support for `prefers-reduced-motion`.

---

## 📁 Project Architecture

```
bella/
├── public/
│   ├── images/              # Memory wall curated images (lake, cafe, hills)
│   └── starlight.svg        # Celestial favicon
├── src/
│   ├── components/
│   │   ├── surprises/
│   │   │   ├── CatchAStar.tsx     # Floating constellation stars
│   │   │   ├── MemoryWall.tsx     # Polaroid gallery & lightbox
│   │   │   └── OpenWhenSad.tsx    # Unfolding 3D envelope & breathing guide
│   │   ├── CustomCursor.tsx       # Desktop glowing starlight cursor
│   │   ├── FinalSection.tsx       # Glowing flower & line-by-line poem
│   │   ├── HeaderNav.tsx          # Floating glass header & music toggle
│   │   ├── HeroSection.tsx        # Typewriter text & glowing CTA
│   │   ├── InteractiveHeartsOverlay.tsx # Floating hearts on tap
│   │   ├── LoadingScreen.tsx      # Atmospheric intro preloader
│   │   ├── PoetrySection.tsx      # 4 interactive 3D flip poetry cards
│   │   ├── StarfieldCanvas.tsx    # Canvas starry night & shooting stars
│   │   └── SurpriseSection.tsx    # Tabbed surprises container
│   ├── data/
│   │   └── content.ts             # 📝 EDIT ALL POEMS, TEXTS & MEMORIES HERE
│   ├── utils/
│   │   ├── ambientMusic.ts        # Web Audio procedural piano synthesizer
│   │   ├── burstEffect.ts         # Starlight confetti & sparkles
│   │   └── soundEffects.ts        # Ethereal chimes & tactile taps
│   ├── App.tsx                    # Main orchestrator
│   ├── index.css                  # Custom tokens, glassmorphism & typography
│   └── main.tsx                   # Entry point
├── vercel.json                    # Vercel deployment configuration
├── vite.config.ts                 # Vite + Tailwind configuration
└── package.json
```

---

## 🎨 How to Personalize the Content

All poems, personal notes, recipient name, and memory cards are located in a single file:
**`src/data/content.ts`**

- **Change Recipient Name**: Modify `siteConfig.recipientName`.
- **Change Poems**: Edit the `poems` array in `poetrySection`.
- **Add Your Own Songs**: Provide a direct audio URL in `siteConfig.customAudioUrl` (or leave empty to use the built-in ambient piano synthesizer).
- **Edit Initial Memories**: Edit `surpriseSection.memoryWall.initialMemories` with your own titles, dates, and photos!

---

## 🚀 Running Locally

1. **Clone or open the directory**:
   ```bash
   cd /home/adnan/Desktop/bella
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser.

4. **Create a production build**:
   ```bash
   npm run build
   npm run preview
   ```

---

## 🌐 Deploying to Vercel

You can deploy this website to Vercel in just a few minutes using either method below:

### Option A: Deploy via Vercel Web Dashboard (Recommended)

1. Push your project to a GitHub repository:
   ```bash
   git init
   git add .
   git commit -m "A Little Space for You ♡"
   git remote add origin https://github.com/<your-username>/<your-repo-name>.git
   git push -u origin main
   ```
2. Go to [vercel.com](https://vercel.com) and log in.
3. Click **"Add New..."** → **"Project"**.
4. Import your GitHub repository.
5. Vercel will automatically detect **Vite**:
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
6. Click **"Deploy"**. Within ~30 seconds, your personal digital universe will be live on a custom `.vercel.app` domain!

### Option B: Deploy via Vercel CLI

1. Install the Vercel CLI (if not already installed):
   ```bash
   npm i -g vercel
   ```
2. In the project directory (`/home/adnan/Desktop/bella`), run:
   ```bash
   vercel
   ```
3. Follow the quick prompts to link and deploy your project.
4. For production deployment:
   ```bash
   vercel --prod
   ```

---

*Made with words, starlight, and quiet warmth.* ♡
