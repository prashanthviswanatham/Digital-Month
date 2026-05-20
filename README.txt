============================================================
  DIGITAL MONTH 2026 — IT & Digital | Tata Projects Ltd.
  Website Package — README
============================================================

FILES INCLUDED:
  index.html    → Main webpage
  style.css     → All styling (dark tech blueprint theme)
  script.js     → Interactivity (gallery, countdown, calendar)
  images/       → Put your photos HERE (see below)
  README.txt    → This file

------------------------------------------------------------
HOW TO ADD YOUR PHOTOS (Previous Year Gallery)
------------------------------------------------------------
1. Create a folder called  images/  next to index.html
   (the folder should already be present)

2. Add your photos to the images/ folder with these names:
     images/photo1.jpg   → Opening Ceremony / Kickoff
     images/photo2.jpg   → Workshop or Session photo
     images/photo3.jpg   → Demo / Activity photo
     images/photo4.jpg   → Hackathon or Competition
     images/photo5.jpg   → Team / Awards photo
     images/photo6.jpg   → Any other highlight

3. You can use .jpg, .jpeg, or .png files.

4. To ADD MORE photos, open index.html and find the
   gallery-slide divs (look for the comment block
   "HOW TO ADD YOUR PHOTOS"). Copy-paste a slide block:

     <div class="gallery-slide">
       <img src="images/photo7.jpg" alt="Description" 
            onerror="this.parentElement.classList.add('placeholder')" />
       <div class="slide-caption">Your Caption Here</div>
       <div class="img-placeholder-msg">📷 Add your photo here<br/>
         <small>images/photo7.jpg</small></div>
     </div>

5. To change a caption, edit the text inside:
     <div class="slide-caption">YOUR CAPTION</div>

NOTE: The gallery will show placeholder boxes (with a 📷 icon)
for any photos that are missing. This is intentional so
you can preview the site before adding all photos.

------------------------------------------------------------
HOW TO OPEN THE WEBSITE
------------------------------------------------------------
Option A (Easiest): Double-click index.html to open in
  your browser. Works for local viewing.

Option B (For sharing on intranet/server): Upload the
  entire folder to your web server. All 3 files + images/
  folder must be in the same directory.

Option C (Live server): Use VS Code + Live Server extension
  for a proper local development server.

------------------------------------------------------------
CUSTOMISATION TIPS
------------------------------------------------------------
• Change event dates: Edit index.html — search for
  "May 11" or "June 5" and update as needed.
  Also update the countdown date in script.js:
    const TARGET_DATE = new Date('2026-05-11T09:00:00');

• Change week themes/topics: Find the .topic-tag spans
  inside each week-card div in index.html.

• Change colours: Edit the CSS variables at the top of
  style.css (inside the :root { } block).

• Add/remove calendar days: The calendar days are HTML
  divs with classes like w1, w2, w3, w4, event-day.
  Add data-week="N" and data-tip="Theme Name" to make
  them interactive.

• Slideshow speed: In script.js, change:
    const AUTO_INTERVAL = 4000;
  (value is in milliseconds; 4000 = 4 seconds per slide)

------------------------------------------------------------
FEATURES OF THIS WEBSITE
------------------------------------------------------------
✅ Animated circuit board background (canvas)
✅ Interactive calendar with hover tooltips
✅ Click legend items to highlight specific week days
✅ Click week cards to jump to & filter calendar
✅ Auto-scrolling photo gallery with controls
✅ Keyboard arrow key navigation (← →) for gallery
✅ Touch/swipe support for mobile gallery
✅ Live countdown timer to May 11, 2026
✅ Animated number counters on scroll
✅ Scroll-triggered fade-in animations
✅ EPC-themed SVG icons for each week
✅ Fully responsive (mobile-friendly)
✅ Pause/play button for gallery

------------------------------------------------------------
BROWSER COMPATIBILITY
------------------------------------------------------------
Works in all modern browsers:
  ✅ Chrome / Edge (recommended)
  ✅ Firefox
  ✅ Safari
  ✅ Mobile browsers (iOS Safari, Chrome Android)

------------------------------------------------------------
  Designed for IT & Digital Team, Tata Projects Ltd.
  Digital Month 2026 — Building the Future, Digitally.
============================================================
