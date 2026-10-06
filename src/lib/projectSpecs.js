// src/lib/projectSpecs.js

export const projectSpecs = {
  tryhackme: {
    slug: 'tryhackme',
    title: 'TryHackMe',
    subtitle: 'Hands-on Cybersecurity Practice',
    icon: 'award',
    tagline: 'Continuous hands-on practice in real-world security labs.',
    intro:
      'TryHackMe is where I build and sharpen practical security skills. Over the past few years, I\'ve completed 237+ rooms covering SOC analysis, web exploitation, Linux privilege escalation, and OWASP vulnerabilities — with 22 badges earned along the way.',
    challenge:
      'Every room is a real challenge — from cracking hashes and reverse engineering binaries to exploiting web vulnerabilities in isolated environments. It\'s not just theory; each room tests whether you can actually find and exploit the bug.',
    build:
      'I focus on rooms that map to real-world roles: SOC analyst tracks, web exploitation, privilege escalation on Linux, and the OWASP Top 10. I also complete seasonal events like Advent of Cyber and side quest challenges.',
    highlights: [
      'Ranked #18,911 globally — top 1% of all TryHackMe users',
      '237+ rooms completed across SOC, web, Linux, and cryptography',
      '22 badges earned including Epic and Rare rarity achievements',
      '77-day streak — consistent daily practice',
    ],
    takeaway:
      'TryHackMe is my gym. The rooms keep skills sharp, expose me to new techniques, and validate what actually works against real targets.',
    specs: [
      { label: 'Focus', value: 'SOC Analysis, Web Exploitation, Linux, OWASP' },
      { label: 'Rank', value: '#18,911 · Top 1%' },
      { label: 'Streak', value: '77 days' },
      { label: 'Badges', value: '22 total' },
    ],
    skills: ['Network Security', 'Web Exploitation', 'Privilege Escalation', 'SOC Analysis'],
    screenshots: [],
    extraSections: [],
  },

  n4yctf: {
    slug: 'n4yctf',
    title: 'N4yCTF',
    subtitle: 'TOCTOU Race Condition',
    icon: 'laptop',
    tagline: 'Teaching developers to exploit — and prevent — real race conditions.',
    intro:
      'Race conditions are one of the most overlooked vulnerabilities in modern web apps. Every tutorial explains them abstractly, but almost nobody lets you actually exploit one safely in a controlled environment.',
    challenge:
      'N4yCTF is built around a deliberately non-atomic balance check in a purchase endpoint. Players use Burp Suite\'s parallel-request tooling to race the check and buy an item they can\'t afford — without waiting five days for a legitimate transaction.',
    build:
      'The rest of the stack is hardened against every other attack path, so the race condition is the only way forward. The application ships with bcrypt password hashing, JWT stored in SameSite=None cookies, Zod request validation, Helmet headers, CORS allowlisting, and layered rate limits.',
    highlights: [
      'Deliberately vulnerable purchase endpoint (the core CTF challenge)',
      'Hardened stack that closes every other attack surface',
      'Real-time score tracking and challenge state',
      'Deployed on Vercel (frontend), Render (API), and Aiven (PostgreSQL)',
    ],
    takeaway:
      'Built as a hands-on way for security engineers to experience a real bug pattern in a safe, guided environment. Currently live and playable.',
    specs: [
      { label: 'Frontend', value: 'React 18, TypeScript, Vite, Tailwind' },
      { label: 'Backend', value: 'Node, Express, Zod, middleware' },
      { label: 'Database', value: 'PostgreSQL, Prisma ORM, migrations, seeding' },
    ],
    skills: ['Security Engineering', 'Full Stack', 'Vulnerability Research'],
    screenshots: ['/projects/n4yctf-1.png'],
  },

  n4yadmin: {
    slug: 'n4yadmin',
    title: 'N4yAdmin',
    subtitle: 'IDOR / Broken Access Control',
    icon: 'laptop',
    tagline:
      'A working example of why sequential IDs and missing access checks break everything.',
    intro:
      'Broken access control is the #1 vulnerability on the OWASP Top 10, and IDOR is its most common form. N4yAdmin is a live admin panel that demonstrates exactly how the vulnerability happens — and how a single missing ownership check can expose an entire system.',
    challenge:
      'The GET /api/users/:id endpoint returns the full user record with no ownership or role verification. Sequential integer IDs make enumeration trivial: change /profile/4 to /profile/1, and you\'re reading the admin\'s private notes.',
    build:
      'The challenge is tiered — first reconnaissance, then exploitation. The admin\'s private note is hashed with SHA-256 at seed time, so players must extract and submit the flag through the CTF interface rather than simply reading the note.',
    highlights: [
      'Intentional IDOR vulnerability in the user-detail endpoint',
      'SHA-256-hashed flag at the database layer',
      'Tiered difficulty: recon → exploitation → submit',
      'Hardened stack using the same foundation as N4yCTF',
    ],
    takeaway:
      'A teaching tool for anyone learning web security — the exact pattern that causes IDOR is baked into the architecture.',
    specs: [
      { label: 'Frontend', value: 'React 18, TypeScript, Vite, Tailwind' },
      { label: 'Backend', value: 'Node, Express, Zod, middleware' },
      { label: 'Database', value: 'PostgreSQL, Prisma ORM, migrations, seeding' },
    ],
    skills: ['Access Control', 'Full Stack', 'CTF Design'],
    screenshots: ['/projects/n4yadmin-1.png'],
  },

  n4yvault: {
    slug: 'n4yvault',
    title: 'N4yVault',
    subtitle: 'Bookmark Manager',
    icon: 'laptop',
    tagline: 'A bookmark manager that quietly teaches the fix for IDOR.',
    intro:
      'N4yVault looks like a normal bookmark manager — public and private lists, tags, shareable profiles. Under the hood, it\'s an exercise in the correct ownership-check pattern that prevents IDOR at the source.',
    challenge:
      'Every query uses findFirst({ where: { id, userId } }), so a user can never access another user\'s data — even if they guess or manipulate the ID in the URL. This is the primitive that most IDOR-prone applications forget.',
    build:
      'The app supports public/private toggles, many-to-many tagging, read-only public profiles, and full authentication with bcrypt-hashed passwords. It\'s deployed across Aiven (database), Render (backend), and Vercel (frontend) — same stack as the other N4y projects, but without any intentional vulnerabilities.',
    highlights: [
      'Correct ownership-check pattern on every query',
      'Public/private list toggle with URL-safe shareable profiles',
      'Many-to-many tags, read-only public view',
      'Deployed on Vercel + Render + Aiven',
    ],
    takeaway:
      'Where N4yCTF teaches exploitation and N4yAdmin teaches reconnaissance, N4yVault teaches prevention — the same bug class, but solved.',
    specs: [
      { label: 'Security', value: 'Race conditions, IDOR, SameSite cookies, bcrypt, JWT, CORS' },
      { label: 'Cloud', value: 'Vercel, Render, Aiven' },
    ],
    skills: ['Secure Coding', 'Full Stack', 'Data Modeling'],
    screenshots: ['/projects/n4yvault-1.png'],
  },

  'clearance-mrs': {
    slug: 'clearance-mrs',
    title: 'Clearance Management & Reporting System',
    subtitle: 'Full-Stack Flask App',
    icon: 'laptop',
    tagline: 'Replacing a manual compliance process with an auditable, automated one.',
    intro:
      'Security clearance workflows at large organizations are still tracked in spreadsheets, then manually turned into weekly executive reports. The process is slow, error-prone, and impossible to audit at scale. This system replaces that entirely.',
    challenge:
      'Building an auditable workflow system isn\'t just about the UI — it\'s about making reports that look and feel native to Excel and PowerPoint, keeping an immutable history of every change, and integrating cleanly with corporate identity systems that don\'t always cooperate.',
    build:
      'The app tracks clearance workflows across five categories, generates native Excel/PowerPoint reports with 3D charts and embedded live workbooks, and stores immutable weekly audit snapshots alongside always-live aggregate data.',
    highlights: [
      'Role-based access control enforced entirely at the backend',
      'Direct OOXML manipulation for features python-pptx doesn\'t support natively (3D charts, legacy OLE object replacement)',
      'Configurable, data-driven business rules engine — no hardcoded per-category logic',
      'LDAP/AD integration with automatic provisioning and a "break-glass" local-account fallback',
      'Append-only audit records that cannot be edited or deleted',
    ],
    takeaway:
      'A production-grade internal tool — the kind of software that saves enterprises hundreds of manual hours a month while staying audit-compliant.',
    specs: [
      { label: 'Frontend', value: 'Flask Templates, Jinja2, Chart.js' },
      { label: 'Backend', value: 'Flask, Python, python-pptx' },
      { label: 'Database', value: 'PostgreSQL, SQLAlchemy' },
      { label: 'Security', value: 'RBAC, LDAP/AD SSO, Break-glass accounts, Append-only audit logs' },
    ],
    skills: ['Backend Engineering', 'Report Automation', 'IAM', 'Compliance'],
    screenshots: ['/projects/clearance-mrs-1.png', '/projects/clearance-mrs-2.png'],
  },

  'expense-tracker': {
    slug: 'expense-tracker',
    title: 'Expense Tracker',
    subtitle: 'Mobile Finance App',
    icon: 'phone',
    tagline: 'A mobile finance app that reads your bank SMS so you don\'t have to.',
    intro:
      'Most expense trackers require manual entry, which means nobody uses them for more than a week. This one reads bank SMS messages in real time, parses them into structured transactions, and gives you instant visibility into where your money goes.',
    challenge:
      'Parsing bank SMS reliably is harder than it looks — every Ethiopian bank (CBE, CBE Birr, Telebirr) uses a different message format. And doing it without an internet connection, while keeping the app responsive, requires careful offline-first architecture.',
    build:
      'The app tracks income and expenses across four payment methods, auto-parses SMS into transactions, and provides rich analytics: cumulative line charts, category donut breakdowns, weekday heatmaps, and monthly budgets with custom start days.',
    highlights: [
      'Real-time SMS parsing across CBE, CBE Birr, and Telebirr formats',
      'Offline-first Flutter architecture with shared_preferences',
      'Custom analytics with fl_chart — cumulative, donut, heatmap',
      'Native Android integration via another_telephony and permission_handler',
    ],
    takeaway:
      'Built for everyday users who want passive tracking without the friction — and a real study in offline-first mobile design.',
    keyFeatures: [
      'Tracks income/expense across Cash, CBE, CBE Birr, Telebirr',
      'Auto-parses bank SMS into transactions',
      'Analytics with cumulative line, donut breakdown, weekday heatmap',
      'Monthly budgets per category with custom start day',
    ],
    techStack: [
      'Flutter 3.47 / Dart 3.13',
      'fl_chart',
      'shared_preferences',
      'another_telephony + permission_handler',
      'Gradle / Android SDK 36',
    ],
    specs: [],
    skills: ['Mobile Development', 'UI/UX', 'Data Visualization'],
    screenshots: ['/projects/expense-tracker-1.png'],
    videos: ['/projects/expense-tracker-demo.mp4'],
  },

  'legal-connect': {
    slug: 'legal-connect',
    title: 'Legal Connect',
    subtitle: 'Client–Lawyer Platform',
    icon: 'laptop',
    tagline: 'A connected legal system for clients and lawyers in Ethiopia.',
    intro:
      'Finding a lawyer in Ethiopia often means asking around, paying too much, and repeating the same story to three different offices. Legal Connect brings clients and lawyers into a single digital platform — reducing cost, removing the manual workflow, and making the whole process transparent.',
    challenge:
      'Legal work is deeply personal and confidential. The platform had to handle sensitive case data, facilitate both client-side and lawyer-side workflows, and still feel simple enough for non-technical users.',
    build:
      'Clients post cases publicly or privately, browse lawyers by specialty, and message them directly. Lawyers get a dedicated dashboard for case management — approval status, deadlines, document uploads, and analytics — with the whole system running on a Node/React/MongoDB stack.',
    highlights: [
      'Client-side case posting with category, deadline, and document uploads',
      'Lawyer dashboard with case approvals, deadlines, and analytics',
      'Role-based access for clients, lawyers, and admins',
      'Full-stack build: Node.js + React + MongoDB + REST API',
    ],
    takeaway:
      'A real-world marketplace problem solved end-to-end — designed with pricing, trust, and workflow in mind.',
    framework: ['Node Js', 'React Js', 'MongoDB', 'Rest Api'],
    specs: [],
    skills: ['Full Stack', 'Product Design', 'Marketplace Systems'],
    screenshots: ['/projects/legal-connect-1.png', '/projects/legal-connect-2.png'],
  },
}

export const findSpec = (slug) => projectSpecs[slug] || null