/* ============================================================
   DIGITAL MONTH 2026 — script.js
   Handles: Circuit Canvas · Gallery · Countdown · Calendar
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── 1. ANIMATED CIRCUIT CANVAS BACKGROUND ── */
  const canvas  = document.getElementById('circuitCanvas');
  const ctx     = canvas.getContext('2d');
  let W, H, nodes = [], lines = [], particles = [];
  const CYAN    = '#00d4ff';
  const ORANGE  = '#ff7c2a';

  function resizeCanvas() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
    initNodes();
  }

  function initNodes() {
    nodes = [];
    lines = [];
    particles = [];
    const count = Math.floor((W * H) / 22000);
    for (let i = 0; i < count; i++) {
      nodes.push({
        x: Math.random() * W,
        y: Math.random() * H,
        r: Math.random() * 2.5 + 1,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        color: Math.random() > 0.8 ? ORANGE : CYAN
      });
    }
    // Static circuit-like grid lines
    for (let i = 0; i < 18; i++) {
      const x1 = Math.random() * W;
      const y1 = Math.random() * H;
      const horizontal = Math.random() > 0.5;
      const len = Math.random() * 200 + 80;
      lines.push({
        x1, y1,
        x2: horizontal ? x1 + len : x1,
        y2: horizontal ? y1 : y1 + len,
        alpha: Math.random() * 0.2 + 0.05,
        color: Math.random() > 0.7 ? ORANGE : CYAN
      });
    }
  }

  function spawnParticle() {
    const node = nodes[Math.floor(Math.random() * nodes.length)];
    if (!node) return;
    particles.push({
      x: node.x, y: node.y,
      vx: (Math.random() - 0.5) * 1.5,
      vy: (Math.random() - 0.5) * 1.5,
      life: 1,
      decay: Math.random() * 0.015 + 0.008,
      r: Math.random() * 2 + 0.5,
      color: node.color
    });
  }

  function drawFrame() {
    ctx.clearRect(0, 0, W, H);

    // Draw static circuit lines
    lines.forEach(l => {
      ctx.beginPath();
      ctx.moveTo(l.x1, l.y1);
      ctx.lineTo(l.x2, l.y2);
      ctx.strokeStyle = l.color;
      ctx.globalAlpha = l.alpha;
      ctx.lineWidth = 1;
      ctx.stroke();
      // Circuit node dot at end
      ctx.beginPath();
      ctx.arc(l.x2, l.y2, 3, 0, Math.PI * 2);
      ctx.fillStyle = l.color;
      ctx.globalAlpha = l.alpha * 2;
      ctx.fill();
    });

    // Draw connections between nearby nodes
    ctx.globalAlpha = 1;
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 160) {
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.strokeStyle = CYAN;
          ctx.globalAlpha = (1 - dist / 160) * 0.18;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }

    // Draw & update nodes
    nodes.forEach(n => {
      n.x += n.vx; n.y += n.vy;
      if (n.x < 0 || n.x > W) n.vx *= -1;
      if (n.y < 0 || n.y > H) n.vy *= -1;
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
      ctx.fillStyle = n.color;
      ctx.globalAlpha = 0.5;
      ctx.fill();
      // Glow
      ctx.shadowColor = n.color;
      ctx.shadowBlur = 8;
      ctx.fill();
      ctx.shadowBlur = 0;
    });

    // Draw & update particles
    particles = particles.filter(p => {
      p.x += p.vx; p.y += p.vy;
      p.life -= p.decay;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.life * 0.7;
      ctx.fill();
      return p.life > 0;
    });

    ctx.globalAlpha = 1;
    if (Math.random() < 0.08) spawnParticle();
    requestAnimationFrame(drawFrame);
  }

  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();
  drawFrame();


  /* ── 2. HERO STATS COUNTER ── */
  const statNums = document.querySelectorAll('.stat-number[data-target]');
  const countObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el     = entry.target;
        const target = parseInt(el.dataset.target, 10);
        let current  = 0;
        const step   = Math.ceil(target / 40);
        const timer  = setInterval(() => {
          current = Math.min(current + step, target);
          el.textContent = current;
          if (current >= target) clearInterval(timer);
        }, 40);
        countObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  statNums.forEach(el => countObserver.observe(el));


  /* ── 3. CALENDAR TOOLTIP, FILTER & DETAIL POPUP ── */
  const tooltip   = document.getElementById('calTooltip');
  const eventDays = document.querySelectorAll('.cal-day.event-day, .cal-day.weekend');
  const allDays   = document.querySelectorAll('.cal-day');
  let   activeFilter = null;

  if (tooltip) {
    eventDays.forEach(day => {
      day.addEventListener('mouseenter', () => {
        const tip = day.dataset.tip;
        if (!tip) return;
        tooltip.textContent = tip;
        tooltip.classList.add('visible');
      });
      day.addEventListener('mousemove', (e) => {
        tooltip.style.left = (e.clientX + 14) + 'px';
        tooltip.style.top  = (e.clientY - 32) + 'px';
      });
      day.addEventListener('mouseleave', () => {
        tooltip.classList.remove('visible');
      });
    });
  }

  // ── Event Detail Modal ──
  const modal           = document.getElementById('eventModal');
  const modalCard       = document.getElementById('eventModalCard');
  const modalWeekText   = modal ? modal.querySelector('.event-modal-week-text') : null;
  const modalTitle      = document.getElementById('eventModalTitle');
  const modalCount      = document.getElementById('eventModalCount');
  const modalSessions   = document.getElementById('eventModalSessions');
  const modalEmpty      = document.getElementById('eventModalEmpty');

  // ─── SESSION DATA ──────────────────────────────────────────────
  // Edit this object to update session details, times, descriptions,
  // tags, and join links. Every entry maps a date key (YYYY-MM-DD)
  // to a day record. Sessions array can have any number of items.
  const SESSION_DATA = {
    // ─ WEEK 1 ─ Digital Foundations ─
    '2026-05-11': {
      week: 'Week 1 · Digital Foundations', accent: 'w1', date: 'Monday, May 11, 2026',
      sessions: [
        { time: '10:30 AM - 11:00 AM', title: 'Digital Month Kickoff Ceremony',
          desc: "Launch of Digital Awareness Month 2026 with \n\n\n leadership keynote, Agenda of the month.",
          tags: ['Opening', 'Keynote'], icon: '🎯',
          link: 'https://teams.microsoft.com/l/meetup-join/19%3ameeting_ZTJiMGVkYjUtNThjMC00ZWRhLThiOGItMDJiNWQ5YjVkMTQy%40thread.v2/0?context=%7b%22Tid%22%3a%22c94c51d1-3250-471a-9bf9-71e5e167a223%22%2c%22Oid%22%3a%22ec091456-74ca-42b2-8910-8bea2e26bf3d%22%7d' },
        { time: '11:00 AM - 11:30 AM', title: 'Success Story',
          desc: 'Success story of JUI - 01A leveraging Digital Project Delivery practices to improve project outcomes',
          tags: ['Digital Project Delivery', 'Project Management'], icon: '☁️',
          link: 'https://teams.microsoft.com/l/meetup-join/19%3ameeting_ZTJiMGVkYjUtNThjMC00ZWRhLThiOGItMDJiNWQ5YjVkMTQy%40thread.v2/0?context=%7b%22Tid%22%3a%22c94c51d1-3250-471a-9bf9-71e5e167a223%22%2c%22Oid%22%3a%22ec091456-74ca-42b2-8910-8bea2e26bf3d%22%7d' }
      ]
    },
    '2026-05-12': {
      week: 'Week 1 · Digital Foundations', accent: 'w1', date: 'Tuesday, May 12, 2026',
      sessions: [
        { time: ' ', title: 'Tech In Action',
          desc: 'Post selfies with the digital technologies at the sites and win exciting prizes, Join the Viva engage channel for more updates ',
          tags: ['Contest', 'Prizes'], icon: '🛡️',
          link: 'https://engage.cloud.microsoft/main/org/tataprojects.com/threads/eyJfdHlwZSI6IlRocmVhZCIsImlkIjoiMzg1MTk1NjM0NjAzNjIyNCJ9?trk_copy_link=V2' },
             ]
    },
    '2026-05-13': {
      week: 'Week 1 · Digital Foundations', accent: 'w1', date: 'Wednesday, May 13, 2026',
      sessions: [
        { time: '10:30 - 11:00', title: 'Win on Wednesday',
          desc: 'Challenge yourself with riddles on DX Store and unlock exciting prizes!',
          tags: ['DX Store','Riddle'], icon: '💡',
          link: 'https://forms.office.com/Pages/ResponsePage.aspx?id=0VFMyVAyGkeb-XHl4WeiI7xxzkR8DdVIi5FgjhnC5zZUOU1NOUhDMUZSS0g5WU1JR01QRVM2UFBITC4u' }      ]
    },
    '2026-05-14': {
      week: 'Week 1 · Digital Foundations', accent: 'w1', date: 'Thursday, May 14, 2026',
      sessions: [
        { time: '10:30 AM - 11:00 AM', title: 'Know your DX Store',
          desc: 'Discover DX Store applications and empower your projects with smarter tools',
          tags: ['DX Store'], icon: '⚙️',
          link: 'https://dx.tataprojects.com/welcome' },
        { time: '10:30 AM - 11:00 AM', title: 'Ideathon',
          desc: 'Have an idea to improve efficiency, visibility, or decision-making through digital? Share it in our Digital Month Ideation Challenge—the best ideas get showcased with the leadership and fast-tracked for development by Digital & IT, visit the viva engage channel for more details.',
          tags: ['Challenge', 'Innovation'], icon: '🚀',
          link: 'https://teams.microsoft.com/l/meetup-join/placeholder-may14-2' },
        { time: '', title: 'Digital Treasure Hunt : Registration',
          desc: 'Wanna experience treasure hunt - Digitally, then participate in our immersive digital treasure hunt to harness your digital skills and win exciting prizes, Registrations will be open from today',
          tags: ['Registration','BIM', 'Cloud'], icon: '🚀',
          link: 'https://forms.office.com/Pages/ResponsePage.aspx?id=0VFMyVAyGkeb-XHl4WeiIzA9ejA3_MFLtp23nK1E0nBUNE9HWjBDQUIxWTRGOE5UV0FHRlRKVzRJSS4u' }
      ]
    },
    '2026-05-15': {
      week: 'Week 1 · Digital Foundations', accent: 'w1', date: 'Friday, May 15, 2026',
      sessions: [{ time: '10:30 - 11:00', title: 'Fun Friday activity: Word Search',
          desc: ' Think fast, scan faster! Spot the hidden words, challenge your mind, and win exciting prizes',
          tags: ['Fundamentals'], icon: '💡',
          link: 'https://forms.office.com/Pages/ResponsePage.aspx?id=0VFMyVAyGkeb-XHl4WeiIzA9ejA3_MFLtp23nK1E0nBUMTNKMzZWMjI0WDNURVZNREUyNjlVMjZDTy4u' },
        { time: '', title: 'Digital Treasure Hunt : Registration',
          desc: 'Wanna experience treasure hunt - Digitally, then participate in our immersive digital treasure hunt to harness your digital skills and win exciting prizes, Today is the last day to register',
          tags: ['Registration','BIM', 'Cloud'], icon: '🚀',
          link: 'https://forms.office.com/Pages/ResponsePage.aspx?id=0VFMyVAyGkeb-XHl4WeiIzA9ejA3_MFLtp23nK1E0nBUNE9HWjBDQUIxWTRGOE5UV0FHRlRKVzRJSS4u' }

      ]
    },
    '2026-05-16': { week: 'Week 1 · Digital Foundations', accent: 'w1', date: 'Saturday, May 16, 2026', sessions: [] },
    '2026-05-17': { week: 'Week 1 · Digital Foundations', accent: 'w1', date: 'Sunday, May 17, 2026',   sessions: [] },

    // ─ WEEK 2 ─ Design & Engineering Tech ─
    '2026-05-18': {
      week: 'Week 2 · Design & Engineering Tech', accent: 'w2', date: 'Monday, May 18, 2026',
      sessions: [

      ]
    },
    '2026-05-19': {
      week: 'Week 2 · Design & Engineering Tech', accent: 'w2', date: 'Tuesday, May 19, 2026',
      sessions: [
        { time: '10:00 - 11:00', title: 'Experts session on AEC by Autodesk',
          desc: 'Dive into Autodesk’s AEC solutions to streamline design management, enabling smoother collaboration, accurate quantity take-offs, and early clash detection that speeds up design cycles and reduces rework. Learn how the interactive dashboards help take data driven decision making. Grab the participation goodies and win exciting gifts by participating in the live quiz',
          tags: ['AEC', 'VDC','BIM','Digital'], icon: '⚙️',
          link: 'https://apc01.safelinks.protection.outlook.com/ap/t-59584e83/?url=https%3A%2F%2Fteams.microsoft.com%2Fmeet%2F48855844095556%3Fp%3DX6lgxRkIujbRW1a59W&data=05%7C02%7Cvprashanth%40tataprojects.com%7Cddf9cd72c013444ad9b808deb0bd505d%7Cc94c51d13250471a9bf971e5e167a223%7C0%7C0%7C639142524707624427%7CUnknown%7CTWFpbGZsb3d8eyJFbXB0eU1hcGkiOnRydWUsIlYiOiIwLjAuMDAwMCIsIlAiOiJXaW4zMiIsIkFOIjoiTWFpbCIsIldUIjoyfQ%3D%3D%7C0%7C%7C%7C&sdata=gJ%2FyI94uFcBZiR1PP9l7tO%2FqyduwL971U8IudGjnNlE%3D&reserved=0' },
        { time: '11:00 - 13:00', title: 'Technology Booths',
          desc: 'Interact with the technical experts to get more insights on the latest technology trends and innovations in AEC',
          tags: ['Booth'], icon: '⌨️',
          link: '' }
      ]
    },
    '2026-05-20': {
      week: 'Week 2 · Design & Engineering Tech', accent: 'w2', date: 'Wednesday, May 20, 2026',
      sessions: [
        { time: '10:30 - 11:00', title: 'Win on Wednesday',
          desc: 'Challenge yourself with riddles on DX Store and unlock exciting prizes!',
          tags: ['DX Store'], icon: '💡',
          link: 'https://forms.office.com/Pages/ResponsePage.aspx?id=0VFMyVAyGkeb-XHl4WeiI7xxzkR8DdVIi5FgjhnC5zZUOU1NOUhDMUZSS0g5WU1JR01QRVM2UFBITC4u' } 
      ]
    },
    '2026-05-21': {
      week: 'Week 2 · Design & Engineering Tech', accent: 'w2', date: 'Thursday, May 21, 2026',
      sessions: [
        { time: '10:30 AM - 11:00 AM', title: 'Know your DX Store',
          desc: 'Discover DX Store applications and empower your projects with smarter tools',
          tags: [''], icon: '⚙️',
          link: 'https://dx.tataprojects.com/welcome' },
        { time: '11:00 AM- 8:00 PM', title: 'Digital Treasure Hunt',
          desc: 'Participate in the immersive digital treasure hunt to harness your digital skills and win exciting prizes. Hunt the hidden elements in the 3D model by unlocking clues at each finding: Finish early to climb the leaderboard',
          tags: ['Early winners','3D BIM','Cloud','Treasure Hunt Challenge','Exciting prizes'], icon: '🛠️',
          link: '' }
      ]
    },
    '2026-05-22': {

      week: 'Week 2 · Design & Engineering Tech', accent: 'w2', date: 'Friday, May 22, 2026',
      sessions: [      
 { time: '10:30 - 11:00', title: 'Fun Friday activity: Unscramble',
          desc: ' Think fast, scan faster! Spot the hidden words, challenge your mind, and win exciting prizes',
          tags: ['Fundamentals'], icon: '💡',
          link: 'https://forms.office.com/Pages/ResponsePage.aspx?id=0VFMyVAyGkeb-XHl4WeiIzA9ejA3_MFLtp23nK1E0nBUMEFaVUpFSVhTR0k3Q09IVk5YTUNVTVFYTC4u' }
      ]
    },
    '2026-05-23': { week: 'Week 2 · Design & Engineering Tech', accent: 'w2', date: 'Saturday, May 23, 2026', sessions: [] },
    '2026-05-24': { week: 'Week 2 · Design & Engineering Tech', accent: 'w2', date: 'Sunday, May 24, 2026',   sessions: [] },

    // ─ WEEK 3 ─ Construction & Monitoring Tech ─
    '2026-05-25': {
      week: 'Week 3 · Construction & Monitoring Tech', accent: 'w3', date: 'Monday, May 25, 2026',
      sessions: [
      ]
    },
    '2026-05-26': {
      week: 'Week 3 · Construction & Monitoring Tech', accent: 'w3', date: 'Tuesday, May 26, 2026',
      sessions: [
        { time: '10:00 - 11:00', title: 'Construction Management',
          desc: 'Learn how Lean construction tools can deliver smoother execution with stronger planning and project controls. See live demos of 4D simulations, automated DPRs, drone-based progress capture, and dashboards that improve project intelligence and enable faster decision-making.',
          tags: ['Lean Construction', 'DPR','4D Simulations','Schedule','Dashboards','Live construction Monitoring', 'Planned vs Actual'], icon: '🛩️',
          link: 'https://teams.microsoft.com/l/meetup-join/placeholder-may26-1' },
        { time: '10:30 - 11:00', title: 'Quiz',
          desc: 'Participate in the live quiz during the session',
          tags: ['Survey', 'Data'], icon: '🗺️',
          link: 'https://teams.microsoft.com/l/meetup-join/placeholder-may26-2' }
      ]
    },
    '2026-05-27': {
      week: 'Week 3 · Construction & Monitoring Tech', accent: 'w3', date: 'Wednesday, May 27, 2026',
      sessions: [
        { time: '10:30 - 11:00', title: 'Win on Wednesday',
          desc: 'Challenge yourself with riddles on DX Store and unlock exciting prizes!',
          tags: ['DX Store'], icon: '💡',
          link: 'https://forms.office.com/Pages/ResponsePage.aspx?id=0VFMyVAyGkeb-XHl4WeiI7xxzkR8DdVIi5FgjhnC5zZUOU1NOUhDMUZSS0g5WU1JR01QRVM2UFBITC4u' } 
      ]
    },
    '2026-05-28': {
      week: 'Week 3 · Construction & Monitoring Tech', accent: 'w3', date: 'Thursday, May 28, 2026',
      sessions: [
        { time: '10:30 AM - 11:00 AM', title: 'Know your DX Store',
          desc: 'Discover DX Store applications and empower your projects with smarter tools',
          tags: ['DX Store'], icon: '⚙️',
          link: 'https://dx.tataprojects.com/welcome' },
        { time: '11:00 - 12:00', title: 'Dashboard Challenge',
          desc: 'Participate in the digital Month Dashboard Challenge, Decode project plans, quantities & cost trends straight from the dashboards. Your data-driven decisions start here.',
          tags: ['Dashboard','Data driven decision making','Analytics','Project Management'], icon: '📱',
          link: 'https://teams.microsoft.com/l/meetup-join/placeholder-may28-2' }
      ]
    },
    '2026-05-29': {
      week: 'Week 3 · Construction & Monitoring Tech', accent: 'w3', date: 'Friday, May 29, 2026',
      sessions: [
         { time: '10:30 - 11:00', title: 'Fun Friday activity-Tech Crossword to win exciting prizes',
          desc: ' Dive into our Digital Month Tech Crossword Challenge—crack the clues, connect the dots, and complete the grid',
          tags: ['Fundamentals'], icon: '💡',
          link: 'https://forms.office.com/Pages/ResponsePage.aspx?id=0VFMyVAyGkeb-XHl4WeiIzA9ejA3_MFLtp23nK1E0nBURVBIRTFZTjZZUzI1S1lNREpKV1BBUUhLTS4u' }
      ]
    },
    '2026-05-30': { week: 'Week 3 · Construction & Monitoring Tech', accent: 'w3', date: 'Saturday, May 30, 2026', sessions: [] },
    '2026-05-31': { week: 'Week 3 · Construction & Monitoring Tech', accent: 'w3', date: 'Sunday, May 31, 2026',   sessions: [] },

    // ─ WEEK 4 ─ Smart Project Delivery & Data Analytics ─
    '2026-06-01': {
      week: 'Week 4 · Smart Project Delivery & Data Analytics', accent: 'w4', date: 'Monday, June 1, 2026',
      sessions: [
      ]
    },
    '2026-06-02': {
      week: 'Week 4 · Smart Project Delivery & Data Analytics', accent: 'w4', date: 'Tuesday, June 2, 2026',
      sessions: [

      ]
    },
    '2026-06-03': {
      week: 'Week 4 · Smart Project Delivery & Data Analytics', accent: 'w4', date: 'Wednesday, June 3, 2026',
      sessions: [
        { time: '10:00 AM - 10:30 AM', title: 'Frontline Worker Management System (FWMS)',
          desc: 'FWMS is more than an attendance system. It is a digital foundation that brings structure, validation, and compliance to frontline workforce management — while supporting sites in executing work with clarity and confidence. Join the session to know how FWMS is revolutionising the way we operate with our workforce at sites',
          tags: ['DLR','Workforce Management','Biometric'], icon: '🧪',
          link: 'https://teams.microsoft.com/l/meetup-join/placeholder-jun02-2' },
        { time: '10:30 AM - 11:00 AM', title: 'Win on Wednesday',
          desc: 'Challenge yourself with riddles on DX Store and unlock exciting prizes!',
          tags: ['DX Store'], icon: '💡',
          link: 'https://forms.office.com/Pages/ResponsePage.aspx?id=0VFMyVAyGkeb-XHl4WeiI7xxzkR8DdVIi5FgjhnC5zZUOU1NOUhDMUZSS0g5WU1JR01QRVM2UFBITC4u' } 

      ]
    },
    '2026-06-04': {
      week: 'Week 4 · Smart Project Delivery & Data Analytics', accent: 'w4', date: 'Thursday, June 4, 2026',
      sessions: [
        { time: '10:30 AM - 11:00 AM', title: 'Know your DX Store',
          desc: 'Discover DX Store applications and empower your projects with smarter tools',
          tags: ['DX Store'], icon: '⚙️',
          link: 'https://dx.tataprojects.com/welcome' },
        { time: '14:00 - 15:30', title: 'AR, VR and Digital Twin',
          desc: '',
          tags: ['AR','VR','Digital Twin','Live Monitoring','IoT sensors'], icon: '🏆',
          link: 'https://teams.microsoft.com/l/meetup-join/placeholder-jun04-2' }
      ]
    },
    '2026-06-05': {
      week: 'Week 4 · Smart Project Delivery & Data Analytics', accent: 'w4', date: 'Friday, June 5, 2026',
      sessions: [
        { time: '10:30 - 11:00', title: 'Fun Friday activity',
          desc: '',
          tags: ['Challenge'], icon: '💡',
          link: 'https://teams.microsoft.com/l/meetup-join/placeholder-may15-1' },
        { time: '10:30 - 11:30', title: 'Closing Ceremony and awards(Ideathon, Quizzes, Challenges)',
          desc: 'Grand closing of Digital Month 2026 with reflections, key takeaways, and a look ahead. Celebrating the people and teams who powered Digital Month — awards, recognitions, and applause',
          tags: ['Ideathon winners','Quiz winners','Closing', 'Keynote'], icon: '🎬',
          link: 'https://teams.microsoft.com/l/meetup-join/placeholder-jun05-1' }
      ]
    }
  };

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, m => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    }[m]));
  }

  function renderSessionCard(s) {
    const tags = (s.tags || []).map(t =>
      `<span class="session-tag">${escapeHtml(t)}</span>`
    ).join('');
    const linkHtml = s.link
      ? `<a class="session-link" href="${escapeHtml(s.link)}" target="_blank" rel="noopener">
           <span>Joining Link</span>
           <span class="link-arrow">→</span>
         </a>`
      : '';
    return `
      <div class="session-card">
        <div class="session-icon">${escapeHtml(s.icon || '✦')}</div>
        <div class="session-body">
          <div class="session-time">${escapeHtml(s.time || '')}</div>
          <h4 class="session-title">${escapeHtml(s.title || '')}</h4>
          <p class="session-desc">${escapeHtml(s.desc || '')}</p>
          ${tags ? `<div class="session-tags">${tags}</div>` : ''}
          ${linkHtml}
        </div>
      </div>
    `;
  }

  function openEventModal(day) {
    if (!modal) return;
    const key = day.dataset.key;
    const data = SESSION_DATA[key];
    if (!data) return;

    modalCard.classList.remove('acc-w1', 'acc-w2', 'acc-w3', 'acc-w4');
    if (data.accent) modalCard.classList.add('acc-' + data.accent);

    if (modalWeekText) modalWeekText.textContent = data.week || '';
    modalTitle.textContent = data.date || '';

    const count = (data.sessions || []).length;
    modalCount.textContent = count === 0
      ? 'No sessions scheduled'
      : `${count} ${count === 1 ? 'Session' : 'Sessions'} Today`;

    if (count === 0) {
      modalSessions.innerHTML = '';
      modalEmpty.hidden = false;
    } else {
      modalEmpty.hidden = true;
      modalSessions.innerHTML = data.sessions.map(renderSessionCard).join('');
    }

    modal.classList.add('visible');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
    if (tooltip) tooltip.classList.remove('visible');
  }

  function closeEventModal() {
    if (!modal) return;
    modal.classList.remove('visible');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
  }

  eventDays.forEach(day => {
    day.addEventListener('click', () => {
      if (day.dataset.key) openEventModal(day);
    });
  });

  if (modal) {
    modal.querySelectorAll('[data-close-modal]').forEach(el => {
      el.addEventListener('click', closeEventModal);
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('visible')) closeEventModal();
    });
  }

  // Legend filter click
  const legendItems = document.querySelectorAll('.legend-item[data-filter]');
  legendItems.forEach(item => {
    item.addEventListener('click', () => {
      const weekNum = item.dataset.filter;
      if (activeFilter === weekNum) {
        // Clear filter
        activeFilter = null;
        allDays.forEach(d => {
          d.classList.remove('filtered-out', 'filtered-in');
        });
        legendItems.forEach(li => li.style.opacity = '1');
      } else {
        activeFilter = weekNum;
        allDays.forEach(d => {
          if (d.dataset.week === weekNum) {
            d.classList.add('filtered-in');
            d.classList.remove('filtered-out');
          } else if (d.classList.contains('event-day') || d.classList.contains('weekend')) {
            d.classList.add('filtered-out');
            d.classList.remove('filtered-in');
          }
        });
        legendItems.forEach(li => {
          li.style.opacity = li.dataset.filter === weekNum ? '1' : '0.4';
        });
      }
    });
  });

  // Weekly themes panel — scroll to corresponding week
  const themeRows = document.querySelectorAll('.theme-row[data-scroll-week], .cal-theme-label[data-scroll-week]');
  themeRows.forEach(row => {
    row.addEventListener('click', () => {
      const targetId = row.dataset.scrollWeek;
      const target = document.getElementById(targetId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'center' });
        // Brief highlight pulse
        target.style.transition = 'box-shadow 0.4s ease, transform 0.4s ease';
        target.style.boxShadow = '0 0 32px 4px rgba(255,255,255,0.4)';
        target.style.transform = 'scale(1.18)';
        setTimeout(() => {
          target.style.boxShadow = '';
          target.style.transform = '';
        }, 1100);
      }
    });
  });

  // Week card click → scroll to matching week in calendar
  const weekCards = document.querySelectorAll('.week-card[data-week]');
  weekCards.forEach(card => {
    card.style.cursor = 'pointer';
    card.addEventListener('click', () => {
      const weekNum = card.dataset.week;
      const target = document.getElementById('week-' + weekNum);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'center' });
        target.style.transition = 'box-shadow 0.4s ease, transform 0.4s ease';
        target.style.boxShadow = '0 0 32px 4px rgba(255,255,255,0.4)';
        target.style.transform = 'scale(1.18)';
        setTimeout(() => {
          target.style.boxShadow = '';
          target.style.transform = '';
        }, 1100);
      }
    });
  });


  /* ── 4. PHOTO GALLERY ── */
  const track      = document.getElementById('galleryTrack');
  const allSlides  = document.querySelectorAll('.gallery-slide:not(.clone)');
  const dotsWrap   = document.getElementById('galleryDots');
  const prevBtn    = document.getElementById('prevBtn');
  const nextBtn    = document.getElementById('nextBtn');
  const pauseBtn   = document.getElementById('pauseBtn');
  const pauseIcon  = document.getElementById('pauseIcon');

  const SLIDE_COUNT = allSlides.length;
  let   currentSlide = 0;
  let   autoTimer    = null;
  let   isPaused     = false;
  const AUTO_INTERVAL = 4000;

  // Build dots
  allSlides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.classList.add('gallery-dot');
    if (i === 0) dot.classList.add('active');
    dot.setAttribute('aria-label', `Slide ${i + 1}`);
    dot.addEventListener('click', () => goTo(i));
    dotsWrap.appendChild(dot);
  });

  function updateDots() {
    document.querySelectorAll('.gallery-dot').forEach((d, i) => {
      d.classList.toggle('active', i === currentSlide);
    });
  }

  function goTo(index) {
    currentSlide = ((index % SLIDE_COUNT) + SLIDE_COUNT) % SLIDE_COUNT;
    track.style.transform = `translateX(-${currentSlide * 100}%)`;
    updateDots();
  }

  function next() { goTo(currentSlide + 1); }
  function prev() { goTo(currentSlide - 1); }

  function startAuto() {
    clearInterval(autoTimer);
    if (!isPaused) autoTimer = setInterval(next, AUTO_INTERVAL);
  }

  prevBtn.addEventListener('click', () => { prev(); startAuto(); });
  nextBtn.addEventListener('click', () => { next(); startAuto(); });

  pauseBtn.addEventListener('click', () => {
    isPaused = !isPaused;
    pauseIcon.textContent = isPaused ? '▶' : '⏸';
    pauseBtn.title = isPaused ? 'Play slideshow' : 'Pause slideshow';
    startAuto();
  });

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') { next(); startAuto(); }
    if (e.key === 'ArrowLeft')  { prev(); startAuto(); }
  });

  // Touch / swipe support
  let touchStartX = 0;
  track.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
  track.addEventListener('touchend',   e => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) { diff > 0 ? next() : prev(); startAuto(); }
  }, { passive: true });

  startAuto();


  /* ── 5. COUNTDOWN TIMER ── */
  const TARGET_DATE = new Date('2026-05-11T09:00:00');

  function updateCountdown() {
    const now  = new Date();
    const diff = TARGET_DATE - now;

    const dEl = document.getElementById('cDays');
    const hEl = document.getElementById('cHours');
    const mEl = document.getElementById('cMins');
    const sEl = document.getElementById('cSecs');
    const cSec = document.querySelector('.countdown-section');

    if (diff <= 0) {
      // Event has started!
      if (dEl) dEl.textContent = '00';
      if (hEl) hEl.textContent = '00';
      if (mEl) mEl.textContent = '00';
      if (sEl) sEl.textContent = '00';
      const lbl = document.querySelector('.countdown-label');
      if (lbl) lbl.textContent = '🚀 Digital Month is LIVE!';
      return;
    }

    const days  = Math.floor(diff / 86400000);
    const hours = Math.floor((diff % 86400000) / 3600000);
    const mins  = Math.floor((diff % 3600000) / 60000);
    const secs  = Math.floor((diff % 60000) / 1000);

    if (dEl) dEl.textContent = String(days).padStart(2, '0');
    if (hEl) hEl.textContent = String(hours).padStart(2, '0');
    if (mEl) mEl.textContent = String(mins).padStart(2, '0');
    if (sEl) sEl.textContent = String(secs).padStart(2, '0');
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);


  /* ── 6. SCROLL-IN ANIMATIONS ── */
  const animEls = document.querySelectorAll('.week-card, .cal-month-block, .stat-card, .theme-item, .countdown-unit');

  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        fadeObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  animEls.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = `opacity 0.5s ease ${i * 0.07}s, transform 0.5s ease ${i * 0.07}s`;
    fadeObserver.observe(el);
  });


  /* ── 7. ACTIVE NAV HIGHLIGHT ── */
  const sections  = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('.nav-links a');

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.style.color = '';
          link.style.textShadow = '';
        });
        const id = entry.target.id;
        const active = document.querySelector(`.nav-links a[href="#${id}"]`);
        if (active) {
          active.style.color = '#00d4ff';
          active.style.textShadow = '0 0 12px #00d4ff';
        }
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => navObserver.observe(s));

});
