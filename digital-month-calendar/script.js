// ═══════════════════════════════════════════════════════
//  Digital Month Calendar — Tata Projects Ltd IT&Digital
//  script.js
// ═══════════════════════════════════════════════════════

// ── Week meta ──────────────────────────────────────────
const WEEKS = {
  1: { label: 'Week 1', theme: 'Digital Foundations',             cls: 'w1', color: '#00b4ff', dotColor: '#00b4ff' },
  2: { label: 'Week 2', theme: 'Design & Engineering Tech',       cls: 'w2', color: '#a855f7', dotColor: '#a855f7' },
  3: { label: 'Week 3', theme: 'Construction & Monitoring Tech',  cls: 'w3', color: '#fb923c', dotColor: '#fb923c' },
  4: { label: 'Week 4', theme: 'Smart Project Delivery & Analytics', cls: 'w4', color: '#22d3a5', dotColor: '#22d3a5' },
};

// ── EPC SVG Icons ─────────────────────────────────────
const ICONS = {
  chip: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" width="22" height="22">
    <rect x="7" y="7" width="10" height="10" rx="1"/><path d="M9 7V4M12 7V4M15 7V4M9 17v3M12 17v3M15 17v3M7 9H4M7 12H4M7 15H4M17 9h3M17 12h3M17 15h3"/>
  </svg>`,

  blueprint: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" width="22" height="22">
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
  </svg>`,

  crane: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" width="22" height="22">
    <path d="M5 21V10"/><path d="M19 21V10"/><path d="M2 10h20"/><path d="M12 2v8"/><path d="M12 2l6 6"/><path d="M12 2L6 8"/><path d="M8 21h8"/><rect x="9" y="15" width="6" height="6" rx="1"/>
  </svg>`,

  analytics: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" width="22" height="22">
    <path d="M3 3v18h18"/><path d="M7 16l4-4 4 4 5-5"/><circle cx="7" cy="16" r="1.2" fill="currentColor"/><circle cx="11" cy="12" r="1.2" fill="currentColor"/><circle cx="15" cy="16" r="1.2" fill="currentColor"/><circle cx="20" cy="11" r="1.2" fill="currentColor"/>
  </svg>`,

  cloud: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" width="22" height="22">
    <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/>
  </svg>`,

  shield: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" width="22" height="22">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/>
  </svg>`,

  robot: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" width="22" height="22">
    <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M12 2v4"/><circle cx="12" cy="6" r="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/><circle cx="9" cy="16" r="1"/><circle cx="15" cy="16" r="1"/>
  </svg>`,

  drone: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" width="22" height="22">
    <path d="M12 12m-2 0a2 2 0 1 0 4 0a2 2 0 1 0-4 0"/><path d="M4 4l3 3"/><path d="M17 4l3 3"/><path d="M4 20l3-3"/><path d="M17 20l3-3"/><path d="M4 4a2 2 0 1 1 4 0 2 2 0 0 1-4 0"/><path d="M16 4a2 2 0 1 1 4 0 2 2 0 0 1-4 0"/><path d="M4 16a2 2 0 1 1 4 0 2 2 0 0 1-4 0"/><path d="M16 16a2 2 0 1 1 4 0 2 2 0 0 1-4 0"/>
  </svg>`,

  sensor: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" width="22" height="22">
    <path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><circle cx="12" cy="20" r="1" fill="currentColor"/>
  </svg>`,

  dashboard: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" width="22" height="22">
    <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/>
  </svg>`,

  bim: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" width="22" height="22">
    <path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>
  </svg>`,

  power: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" width="22" height="22">
    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
  </svg>`,

  safety: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" width="22" height="22">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M12 8v4"/><path d="M12 16h.01"/>
  </svg>`,

  ai: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" width="22" height="22">
    <circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/>
  </svg>`,

  hackathon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" width="22" height="22">
    <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/><line x1="15" y1="9" x2="9" y2="15"/>
  </svg>`,

  award: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" width="22" height="22">
    <circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/>
  </svg>`,
};

// ── Event Data (June 2026 — Mon 1 Jun is Day 1) ────────
// Each key = "YYYY-M-D"
const EVENTS = {
  // ── WEEK 1: Digital Foundations ──────────────────────
  '2026-6-1': [
    {
      time: '09:00 – 12:00',
      name: 'Digital Month Inauguration',
      desc: 'Grand kickoff ceremony with leadership address, digital roadmap unveiling, and vision presentation by IT&Digital Head.',
      icon: 'chip',
      tags: ['Flagship Event', 'All Hands'],
      tagColor: 'w1',
    },
    {
      time: '14:00 – 17:00',
      name: 'Digital Landscape: Where We Stand',
      desc: 'Overview of Tata Projects\' digital journey — current tools, platforms, and the road ahead for enterprise digitalization.',
      icon: 'dashboard',
      tags: ['Leadership Talk', 'Strategy'],
      tagColor: 'w1',
    },
  ],
  '2026-6-2': [
    {
      time: '10:00 – 12:00',
      name: 'Digital Literacy & Tooling Workshop',
      desc: 'Hands-on session covering M365 productivity suite, collaboration tools, and digital work habits for modern EPC professionals.',
      icon: 'chip',
      tags: ['Workshop', 'All Employees'],
      tagColor: 'w1',
    },
    {
      time: '14:00 – 15:30',
      name: 'Cloud Computing Essentials',
      desc: 'Introduction to Azure cloud infrastructure — IaaS, PaaS, SaaS — and how Tata Projects leverages cloud for project management.',
      icon: 'cloud',
      tags: ['Tech Talk', 'Beginner Friendly'],
      tagColor: 'w1',
    },
  ],
  '2026-6-3': [
    {
      time: '10:00 – 12:00',
      name: 'Cybersecurity Awareness Program',
      desc: 'Practical session on data protection, phishing awareness, secure remote access, and IT security protocols on construction sites.',
      icon: 'shield',
      tags: ['Mandatory', 'Workshop'],
      tagColor: 'w1',
    },
    {
      time: '14:00 – 16:00',
      name: 'ISMS & IT Policy Deep Dive',
      desc: 'Understanding Information Security Management System (ISMS) compliance, IT policies, and data governance at Tata Projects.',
      icon: 'safety',
      tags: ['Compliance', 'Policy'],
      tagColor: 'w1',
    },
  ],
  '2026-6-4': [
    {
      time: '10:00 – 13:00',
      name: 'AI & Automation in EPC Projects',
      desc: 'Explore how Generative AI, RPA, and intelligent automation are transforming project workflows in the engineering and construction domain.',
      icon: 'ai',
      tags: ['Innovation', 'GenAI'],
      tagColor: 'w1',
    },
    {
      time: '14:30 – 16:30',
      name: 'Digital Tools Showcase',
      desc: 'Live demo of key enterprise platforms: SAP S4HANA, Power Platform, and collaboration tools used across Tata Projects business units.',
      icon: 'dashboard',
      tags: ['Demo', 'Hands-On'],
      tagColor: 'w1',
    },
  ],
  '2026-6-5': [
    {
      time: '10:00 – 12:00',
      name: 'ERP & SAP S4HANA Overview',
      desc: 'Understand how SAP S4HANA supports project financials, procurement, and resource management across EPC project lifecycles.',
      icon: 'chip',
      tags: ['ERP', 'Finance'],
      tagColor: 'w1',
    },
    {
      time: '14:00 – 17:00',
      name: 'Digital Foundations Quiz & Hackathon Kickoff',
      desc: 'Interactive knowledge quiz on Week 1 topics. Official kickoff of the inter-team digital hackathon challenge running through the month.',
      icon: 'hackathon',
      tags: ['Quiz', 'Competition'],
      tagColor: 'w1',
    },
  ],
  '2026-6-6': [
    {
      time: '10:00 – 16:00',
      name: 'Hackathon – Day 1: Problem Framing',
      desc: 'Teams identify digital challenges in ongoing EPC projects and define solution approaches using design thinking methodology.',
      icon: 'hackathon',
      tags: ['Hackathon', 'Ideation'],
      tagColor: 'w1',
    },
  ],

  // ── WEEK 2: Design & Engineering Tech ────────────────
  '2026-6-8': [
    {
      time: '09:30 – 12:30',
      name: 'BIM Level 2 & 3D Modeling Workshop',
      desc: 'Deep dive into Building Information Modeling — Level 2 workflows, clash detection, and collaborative BIM execution plans on live projects.',
      icon: 'bim',
      tags: ['BIM', 'Workshop'],
      tagColor: 'w2',
    },
    {
      time: '14:00 – 16:00',
      name: 'AutoCAD & Civil 3D Masterclass',
      desc: 'Advanced CAD techniques for civil and structural engineers — from 2D drafting to 3D grading models and corridor design.',
      icon: 'blueprint',
      tags: ['CAD', 'Engineering'],
      tagColor: 'w2',
    },
  ],
  '2026-6-9': [
    {
      time: '10:00 – 12:30',
      name: 'Digital Twin Technology in Infrastructure',
      desc: 'How digital twins create real-time virtual replicas of physical assets — case studies from power plants, highways, and smart buildings.',
      icon: 'bim',
      tags: ['Digital Twin', 'Innovation'],
      tagColor: 'w2',
    },
    {
      time: '14:00 – 16:30',
      name: 'GIS & Spatial Data in Project Planning',
      desc: 'Leveraging GIS platforms for route alignment, land acquisition, and site feasibility studies in large infrastructure projects.',
      icon: 'blueprint',
      tags: ['GIS', 'Planning'],
      tagColor: 'w2',
    },
  ],
  '2026-6-10': [
    {
      time: '10:00 – 13:00',
      name: 'Structural Analysis Software Bootcamp',
      desc: 'Hands-on training on ETABS, STAAD.Pro, and SAFE for structural design verification and code compliance in civil projects.',
      icon: 'crane',
      tags: ['Structural', 'Bootcamp'],
      tagColor: 'w2',
    },
    {
      time: '14:30 – 16:30',
      name: 'Computational Fluid Dynamics (CFD) Intro',
      desc: 'Introduction to CFD simulation for HVAC, fire & smoke modeling, and process plant thermal analysis in EPC project design.',
      icon: 'power',
      tags: ['CFD', 'Simulation'],
      tagColor: 'w2',
    },
  ],
  '2026-6-11': [
    {
      time: '10:00 – 12:00',
      name: 'P&ID Digitalization & AVEVA E3D',
      desc: 'Moving from paper P&IDs to intelligent piping and instrumentation diagrams — AVEVA E3D workflows for process plant projects.',
      icon: 'blueprint',
      tags: ['AVEVA', 'Process Plants'],
      tagColor: 'w2',
    },
    {
      time: '14:00 – 16:00',
      name: 'Prefab & Modular Construction Technology',
      desc: 'Digital design approaches enabling off-site prefabrication, modular construction scheduling, and factory-controlled quality.',
      icon: 'bim',
      tags: ['Modular', 'Prefab'],
      tagColor: 'w2',
    },
  ],
  '2026-6-12': [
    {
      time: '10:00 – 12:00',
      name: 'Engineering Simulation & Virtual Prototyping',
      desc: 'Using Ansys, MATLAB, and simulation platforms for virtual testing of engineering designs before physical implementation.',
      icon: 'ai',
      tags: ['Simulation', 'Engineering'],
      tagColor: 'w2',
    },
    {
      time: '14:00 – 17:00',
      name: 'Design Sprint Challenge — Live',
      desc: 'Teams compete in a 3-hour design challenge to solve a real engineering problem using digital tools learned during the week.',
      icon: 'hackathon',
      tags: ['Challenge', 'Competition'],
      tagColor: 'w2',
    },
  ],
  '2026-6-13': [
    {
      time: '10:00 – 16:00',
      name: 'Hackathon – Day 2: Solution Build',
      desc: 'Cross-functional teams prototype their digital solutions using BIM, GIS, or simulation tools under mentorship from IT experts.',
      icon: 'hackathon',
      tags: ['Hackathon', 'Build'],
      tagColor: 'w2',
    },
  ],

  // ── WEEK 3: Construction & Monitoring Tech ───────────
  '2026-6-15': [
    {
      time: '09:30 – 12:00',
      name: 'IoT on Construction Sites',
      desc: 'Sensor networks, connected equipment, environmental monitors — how IoT creates smarter, safer EPC construction sites.',
      icon: 'sensor',
      tags: ['IoT', 'Smart Sites'],
      tagColor: 'w3',
    },
    {
      time: '14:00 – 16:30',
      name: 'Smart Concrete & Material Monitoring',
      desc: 'Embedded sensors for real-time concrete curing, structural health monitoring, and corrosion detection in civil infrastructure.',
      icon: 'crane',
      tags: ['Materials', 'Sensors'],
      tagColor: 'w3',
    },
  ],
  '2026-6-16': [
    {
      time: '10:00 – 13:00',
      name: 'Drone Surveying & LiDAR Mapping',
      desc: 'UAV-based photogrammetry and LiDAR for site surveys, volumetric calculations, earthwork monitoring, and progress tracking.',
      icon: 'drone',
      tags: ['Drones', 'LiDAR'],
      tagColor: 'w3',
    },
    {
      time: '14:30 – 16:30',
      name: 'AI-Based Progress Monitoring',
      desc: 'Computer vision and AI tools for automated site progress tracking — comparing drone imagery to BIM models for schedule variance.',
      icon: 'ai',
      tags: ['AI', 'Progress'],
      tagColor: 'w3',
    },
  ],
  '2026-6-17': [
    {
      time: '10:00 – 12:00',
      name: 'Wearable Tech & Worker Safety',
      desc: 'Smart helmets, GPS wristbands, fatigue sensors, and proximity alerts — protecting workers on complex EPC construction sites.',
      icon: 'safety',
      tags: ['Safety', 'Wearables'],
      tagColor: 'w3',
    },
    {
      time: '14:00 – 16:00',
      name: 'Command Centre & CCTV Analytics',
      desc: 'Setting up integrated project monitoring command centres with AI-powered CCTV analytics for safety and productivity.',
      icon: 'dashboard',
      tags: ['Monitoring', 'Command Centre'],
      tagColor: 'w3',
    },
  ],
  '2026-6-18': [
    {
      time: '10:00 – 12:30',
      name: 'Remote Site Monitoring Dashboard',
      desc: 'Live walkthrough of Tata Projects\' integrated site monitoring platform — KPI tracking, alert management, and escalation workflows.',
      icon: 'sensor',
      tags: ['Dashboard', 'Live Demo'],
      tagColor: 'w3',
    },
    {
      time: '14:00 – 16:30',
      name: 'Predictive Maintenance in Plant Projects',
      desc: 'Vibration analysis, thermal imaging, and ML-based predictive maintenance for rotating equipment in EPC plant construction.',
      icon: 'ai',
      tags: ['Predictive', 'Maintenance'],
      tagColor: 'w3',
    },
  ],
  '2026-6-19': [
    {
      time: '10:00 – 12:00',
      name: 'Digital Compliance & Site Inspection Apps',
      desc: 'Mobile-first inspection apps replacing paper checklists — NCR management, snag tracking, and QA/QC digital workflows.',
      icon: 'shield',
      tags: ['Compliance', 'Mobile'],
      tagColor: 'w3',
    },
    {
      time: '14:00 – 17:00',
      name: 'Site Tech Demo Day',
      desc: 'Live demonstration area with drones, wearables, IoT sensors, and AR/VR headsets. All project teams invited to experience the tech.',
      icon: 'drone',
      tags: ['Demo', 'Experiential'],
      tagColor: 'w3',
    },
  ],
  '2026-6-20': [
    {
      time: '10:00 – 16:00',
      name: 'Hackathon – Day 3: Presentation Prep',
      desc: 'Teams finalize solutions, prepare presentations, and submit deliverables for the hackathon judging panel. Mentor sessions available.',
      icon: 'hackathon',
      tags: ['Hackathon', 'Presentation'],
      tagColor: 'w3',
    },
  ],

  // ── WEEK 4: Smart Project Delivery & Data Analytics ──
  '2026-6-22': [
    {
      time: '09:30 – 12:30',
      name: 'Power BI for Project Analytics',
      desc: 'Building executive dashboards, project KPI trackers, and cost performance reports using Power BI connected to SAP & P6 data.',
      icon: 'analytics',
      tags: ['Power BI', 'Workshop'],
      tagColor: 'w4',
    },
    {
      time: '14:00 – 16:00',
      name: 'Data Governance & Master Data Management',
      desc: 'Establishing data quality standards, master data governance, and metadata management across EPC project data assets.',
      icon: 'dashboard',
      tags: ['Data Governance', 'MDM'],
      tagColor: 'w4',
    },
  ],
  '2026-6-23': [
    {
      time: '10:00 – 12:30',
      name: 'Predictive Analytics in Project Management',
      desc: 'Using machine learning to predict cost overruns, schedule delays, and resource conflicts — models built on Tata Projects\' historical data.',
      icon: 'ai',
      tags: ['ML', 'Predictive'],
      tagColor: 'w4',
    },
    {
      time: '14:00 – 16:30',
      name: 'Primavera P6 & Advanced Scheduling',
      desc: 'Risk-based scheduling, Monte Carlo simulation, and resource-loaded schedules in Primavera P6 for mega EPC projects.',
      icon: 'analytics',
      tags: ['P6', 'Scheduling'],
      tagColor: 'w4',
    },
  ],
  '2026-6-24': [
    {
      time: '10:00 – 12:00',
      name: 'Digital PMO & Integrated Project Controls',
      desc: 'Designing a Digital PMO — integrating cost, schedule, procurement, and risk data for end-to-end project visibility.',
      icon: 'dashboard',
      tags: ['PMO', 'Project Controls'],
      tagColor: 'w4',
    },
    {
      time: '14:00 – 16:00',
      name: 'Earned Value Management (EVM) with Digital Tools',
      desc: 'EVM methodology automated through digital integrations — real-time CPI, SPI reporting and trend analysis across portfolios.',
      icon: 'analytics',
      tags: ['EVM', 'Finance'],
      tagColor: 'w4',
    },
  ],
  '2026-6-25': [
    {
      time: '10:00 – 12:30',
      name: 'AI in Project Management — Use Cases',
      desc: 'GPT-powered RFI responses, AI document review, automated meeting minutes, and intelligent risk register management.',
      icon: 'ai',
      tags: ['AI', 'GenAI'],
      tagColor: 'w4',
    },
    {
      time: '14:00 – 16:30',
      name: 'Supply Chain Digitalization & Procurement Tech',
      desc: 'E-procurement, vendor portals, digital tendering, and supply chain visibility tools transforming EPC procurement operations.',
      icon: 'chip',
      tags: ['Procurement', 'Supply Chain'],
      tagColor: 'w4',
    },
  ],
  '2026-6-26': [
    {
      time: '10:00 – 12:00',
      name: 'Data-Driven Decision Making in EPC',
      desc: 'Panel discussion: senior project leaders share how data analytics changed their decision-making on complex infrastructure projects.',
      icon: 'analytics',
      tags: ['Panel', 'Leadership'],
      tagColor: 'w4',
    },
    {
      time: '14:00 – 17:00',
      name: 'Hackathon Finals & Awards Ceremony',
      desc: 'Final presentations by hackathon teams to a panel of judges. Winner announcement, prizes, and recognition for digital champions.',
      icon: 'award',
      tags: ['Grand Finale', 'Awards'],
      tagColor: 'w4',
    },
  ],
  '2026-6-27': [
    {
      time: '10:00 – 13:00',
      name: 'Digital Month Closing Ceremony',
      desc: 'Recap of the month\'s highlights, announcement of Digital Champions, roadmap for next steps, and leadership closing address.',
      icon: 'award',
      tags: ['Closing', 'Celebration'],
      tagColor: 'w4',
    },
  ],
};

// ── Day → Week mapping (June 2026) ───────────────────────
function getWeekForDay(day) {
  if (day >= 1  && day <= 7)  return 1;  // Jun 1–7
  if (day >= 8  && day <= 14) return 2;  // Jun 8–14
  if (day >= 15 && day <= 21) return 3;  // Jun 15–21
  if (day >= 22 && day <= 30) return 4;  // Jun 22–30
  return null;
}

// ── Icon legend data ──────────────────────────────────────
const LEGEND_DATA = [
  { weekNum: 1, svgKey: 'chip',      name: 'Digital Foundations' },
  { weekNum: 2, svgKey: 'blueprint', name: 'Design & Engineering Tech' },
  { weekNum: 3, svgKey: 'crane',     name: 'Construction & Monitoring Tech' },
  { weekNum: 4, svgKey: 'analytics', name: 'Smart Project Delivery & Analytics' },
];

// ── Calendar state ────────────────────────────────────────
let currentYear  = 2026;
let currentMonth = 5; // 0-indexed: May=4, June=5

// ── Build calendar ────────────────────────────────────────
function buildCalendar(year, month) {
  const cal      = document.getElementById('cal-days');
  const monthLbl = document.getElementById('month-label');

  const monthNames = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  monthLbl.textContent = `${monthNames[month]} ${year}`;

  cal.innerHTML = '';

  const firstDay  = new Date(year, month, 1).getDay(); // 0=Sun
  const daysTotal = new Date(year, month + 1, 0).getDate();

  // Offset to Monday-first grid
  const startOffset = (firstDay + 6) % 7;

  const today = new Date();

  // Empty cells before month starts
  for (let i = 0; i < startOffset; i++) {
    const el = document.createElement('div');
    el.className = 'cal-day empty';
    el.innerHTML = `<span class="day-num" style="opacity:0.2">—</span>`;
    cal.appendChild(el);
  }

  // Day cells
  for (let d = 1; d <= daysTotal; d++) {
    const key    = `${year}-${month + 1}-${d}`;
    const events = EVENTS[key] || [];
    const week   = getWeekForDay(d);
    const wMeta  = week ? WEEKS[week] : null;

    const date    = new Date(year, month, d);
    const dotw    = date.getDay(); // 0=Sun, 6=Sat
    const isWknd  = dotw === 0 || dotw === 6;
    const isToday = date.toDateString() === today.toDateString();

    const el = document.createElement('div');
    el.className = `cal-day${wMeta ? ` ${wMeta.cls}` : ''}${events.length ? ' has-event' : ''}${isWknd ? ' weekend-day' : ''}`;
    el.setAttribute('aria-label', `${monthNames[month]} ${d}, ${year}`);
    el.setAttribute('role', events.length ? 'button' : 'gridcell');
    el.setAttribute('tabindex', events.length ? '0' : '-1');

    // Day number
    const numEl = document.createElement('div');
    numEl.className = 'day-num' + (isToday ? ' today-num' : '');
    numEl.textContent = d;
    el.appendChild(numEl);

    // Event tags (max 2)
    const shown = events.slice(0, 2);
    shown.forEach(ev => {
      const tag = document.createElement('div');
      tag.className = 'day-event-tag';
      const iconSpan = document.createElement('span');
      iconSpan.className = 'event-icon-tiny';
      iconSpan.innerHTML = ICONS[ev.icon] ? '●' : '●';
      tag.appendChild(iconSpan);
      const nameSpan = document.createElement('span');
      nameSpan.textContent = ev.name;
      tag.appendChild(nameSpan);
      el.appendChild(tag);
    });

    if (events.length > 2) {
      const more = document.createElement('div');
      more.className = 'more-badge';
      more.textContent = `+${events.length - 2} more`;
      el.appendChild(more);
    }

    if (events.length) {
      el.addEventListener('click', () => openModal(key, d, month, year, events, wMeta));
      el.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openModal(key, d, month, year, events, wMeta);
        }
      });
    }

    cal.appendChild(el);
  }
}

// ── Modal ─────────────────────────────────────────────────
function openModal(key, day, month, year, events, wMeta) {
  const overlay = document.getElementById('modal-overlay');
  const content = document.getElementById('modal-content');

  const dayNames   = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  const monthNames = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  const date       = new Date(year, month, day);
  const dayName    = dayNames[date.getDay()];

  const wColor = wMeta ? wMeta.color : '#00b4ff';
  const wLabel = wMeta ? wMeta.label : '';
  const wTheme = wMeta ? wMeta.theme : '';

  const eventCards = events.map(ev => {
    const iconSvg = ICONS[ev.icon] || ICONS['chip'];
    const chips   = (ev.tags || []).map(t => `
      <span class="event-chip" style="color:${wColor};border-color:${wColor}33;background:${wColor}11">${t}</span>
    `).join('');

    return `
      <div class="event-card">
        <div class="event-icon-box" style="background:${wColor}18;color:${wColor}">
          ${iconSvg}
        </div>
        <div class="event-info">
          <div class="event-time" style="color:${wColor}">${ev.time}</div>
          <div class="event-name">${ev.name}</div>
          <div class="event-desc">${ev.desc}</div>
          <div class="event-chips">${chips}</div>
        </div>
      </div>
    `;
  }).join('');

  content.innerHTML = `
    <div class="modal-header">
      <div class="modal-week-tag" style="color:${wColor}">
        <span class="modal-week-dot" style="background:${wColor};box-shadow:0 0 8px ${wColor}"></span>
        ${wLabel} · ${wTheme}
      </div>
      <div class="modal-date-title">${dayName}, ${monthNames[month]} ${day}, ${year}</div>
      <div class="modal-theme">${events.length} Session${events.length > 1 ? 's' : ''} Today</div>
      <button class="modal-close" id="modal-close-btn" aria-label="Close">✕</button>
    </div>
    <div class="modal-body">
      <div class="events-list">${eventCards}</div>
    </div>
  `;

  // Style the modal top border
  content.style.borderTop = `3px solid ${wColor}`;
  content.style.boxShadow = `0 24px 80px rgba(0,0,0,0.7), 0 0 40px ${wColor}22`;

  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';

  document.getElementById('modal-close-btn').addEventListener('click', closeModal);
}

function closeModal() {
  document.getElementById('modal-overlay').classList.remove('active');
  document.body.style.overflow = '';
}

// ── Build week legend cards ───────────────────────────────
function buildLegend() {
  const container = document.getElementById('week-legend');
  container.innerHTML = '';

  LEGEND_DATA.forEach(({ weekNum, svgKey, name }) => {
    const meta = WEEKS[weekNum];
    const card = document.createElement('div');
    card.className = `legend-card ${meta.cls}`;
    card.setAttribute('role', 'button');
    card.setAttribute('tabindex', '0');
    card.title = `Jump to ${meta.label}`;

    card.innerHTML = `
      <div class="legend-icon">${ICONS[svgKey]}</div>
      <div class="legend-text">
        <div class="legend-week">${meta.label}</div>
        <div class="legend-name">${name}</div>
      </div>
    `;

    // Scroll to first week day
    card.addEventListener('click', () => {
      const weekFirstDay = [1, 8, 15, 22][weekNum - 1];
      const dayEls = document.querySelectorAll('.cal-day:not(.empty)');
      dayEls.forEach(el => {
        const num = parseInt(el.querySelector('.day-num')?.textContent);
        if (num === weekFirstDay) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
          el.style.outline = `2px solid ${meta.color}`;
          setTimeout(() => el.style.outline = '', 1800);
        }
      });
    });

    container.appendChild(card);
  });
}

// ── Nav buttons ───────────────────────────────────────────
document.getElementById('nav-prev').addEventListener('click', () => {
  currentMonth--;
  if (currentMonth < 0) { currentMonth = 11; currentYear--; }
  buildCalendar(currentYear, currentMonth);
});

document.getElementById('nav-next').addEventListener('click', () => {
  currentMonth++;
  if (currentMonth > 11) { currentMonth = 0; currentYear++; }
  buildCalendar(currentYear, currentMonth);
});

// ── Modal overlay close ───────────────────────────────────
document.getElementById('modal-overlay').addEventListener('click', e => {
  if (e.target === e.currentTarget) closeModal();
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModal();
});

// ── Init ──────────────────────────────────────────────────
buildLegend();
buildCalendar(currentYear, currentMonth);
