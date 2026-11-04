/**
 * English copy – the source of truth for the dictionary shape.
 * `uk.ts` must satisfy the same `Dictionary` type.
 */
export const en = {
  langName: "English",

  sections: {
    intro: { label: "Intro", hint: "Who I am" },
    manifesto: { label: "Manifesto", hint: "How I think" },
    experience: { label: "Experience", hint: "Work history" },
    bypass: { label: "Bypass · 4×", hint: "Real impact" },
    syntaxai: { label: "SyntaxAI", hint: "My startup" },
    projects: { label: "Projects", hint: "Key projects & freelance" },
    journey: { label: "Journey", hint: "Education → offer → startup" },
    profile: { label: "Profile", hint: "Stack, books, discipline" },
    contact: { label: "Contact", hint: "Let's talk" },
  },

  nav: {
    menu: "Menu",
    openMenu: "Open navigation",
    backToTop: "Back to top",
    palette: {
      placeholder: "Jump to a section or action…",
      navigate: "Navigate",
      connect: "Connect",
      copyEmail: "Copy email",
      open: "Open",
      nothing: "Nothing found.",
      downloadResume: "Download resume",
    },
    language: "Language",
    resume: "Resume",
    resumeAria: "Download resume (PDF)",
  },

  boot: {
    log: [
      "kernel · systems online",
      "load · profile.oleh",
      "mount · bento.grid",
      "sync · lean + toc models",
      "render · shader.aurora",
      "ready",
    ],
    initialising: "Initialising",
    skip: "Skip ↵",
  },

  hero: {
    status: "Open to work",
    modes: ["Remote", "Hybrid", "On-site"],
    roles: ["Full-Stack Engineer", "Process Optimizer", "Systems Thinker", "Startup Founder"],
    taglineA: "I build software that removes bottlenecks and automates work –",
    taglineB: "one team went from 8 people to 2.",
    ctaCase: "See the Bypass case",
    ctaContact: "Get in touch",
    stats: { years: "Years in IT", leaner: "People in the Bypass frontend team", books: "Books read" },
    ticker: [
      "Lean",
      "Theory of Constraints",
      "Systems thinking",
      "Next.js",
      "TypeScript",
      "Kaizen",
      "PostgreSQL",
      "SyntaxAI",
      "Docker",
      "80+ books",
    ],
    scroll: "Scroll",
    where: "Poltava, Ukraine",
  },

  manifesto: {
    label: "Manifesto",
    text: "I don't just write code. I study how work *flows*, find the single *constraint* holding a system back, and remove it – *process first*, software second. That's how a department of *eight* became *two* – while the output went *up*.",
  },

  experience: {
    label: "Experience",
    titleA: "Where I've worked,",
    titleB: "and what I owned.",
    present: "Present",
    entries: {
      syntaxai: {
        role: "Founder & Lead Engineer",
        type: "Tech startup · own project",
        period: "Sep 2026 — Present",
        highlightLabel: "Founded & built",
        cta: "See the product",
        hats: [
          {
            title: "Product engineering",
            text: "A Chrome & Firefox extension with a quick-note side panel, a right-click capture flow and a full dashboard.",
          },
          {
            title: "AI features",
            text: "Built-in OpenAI detects the language or technology, writes a title and explains the snippet.",
          },
          {
            title: "Analytics",
            text: "Stack breakdown, streaks and an activity matrix of everything you capture.",
          },
        ],
      },
      bypass: {
        role: "Full-Stack Engineer",
        type: "Full-time · my first offer · ~80-person company",
        period: "Jan 2026 — Nov 2026",
        highlightLabel: "people in the frontend team",
        cta: "See how it worked",
        hats: [
          {
            title: "Full-Stack engineering",
            text: "End-to-end web solutions on Next.js, React, TypeScript, Node.js and PostgreSQL – including technical solutions built to raise efficiency.",
          },
          {
            title: "Process optimization",
            text: "Found bottlenecks in internal workflows and optimized the processes behind them, bridging business needs and engineering.",
          },
          {
            title: "Two cases, real results",
            text: "Automated, faster and higher-quality work with far fewer human errors – a frontend department cut from 8 to 2 (including me) and a financial win for the company.",
          },
        ],
      },
    },
  },

  bypass: {
    eyebrow: "Real impact",
    titleA: "A team of 8 became 2.",
    titleB: "Output went up.",
    facts: { company: "People in the company", department: "Frontend department", cases: "Cases delivered" },
    stages: ["Request", "Analysis", "Build", "Review", "Release"],
    steps: [
      {
        kicker: "Starting point",
        title: "A company of ~80. A frontend department of 8.",
        text: "I joined Bypass as a Full-Stack Engineer with a focus on process optimization. Everyone was busy – yet hidden bottlenecks were quietly limiting how fast the department could deliver.",
      },
      {
        kicker: "Analysis",
        title: "Finding the bottlenecks.",
        text: "I mapped how a task really travels through the department – from request to release – and measured where the time was going. One stage swallowed the most time – and everything before it had to wait.",
      },
      {
        kicker: "Case 01",
        title: "Spotted it. Engineered the fix. Shipped it.",
        text: "I found a bottleneck, designed a solution and built it as a real technical, engineering fix – then rolled it out into the live workflow. Work stopped piling up in front of the constraint.",
      },
      {
        kicker: "Flow",
        title: "The pile-up disappears.",
        text: "With less time lost at the bottleneck, work stopped piling up and the earlier stages stopped waiting. The flow evened out and became predictable.",
      },
      {
        kicker: "Case 02",
        title: "Same method, second bottleneck.",
        text: "Another bottleneck, another engineered solution put into production. Together the two cases pushed delivery far beyond what manual work could reach – speed no longer depended on headcount.",
      },
      {
        kicker: "Result",
        title: "8 people became 2 – and the output grew.",
        text: "The frontend department was cut 4×, down to two people including me as lead developer. The work was automated: faster, higher quality and free from human error – with a real financial win for the company.",
      },
    ],
    sim: {
      title: "Bypass · frontend department",
      bottleneck: "Bottleneck active",
      flowing: "Flowing",
      required: "target time",
      waiting: "Queue before bottleneck",
      team: "Team",
      output: "Delivery output",
      held: "demand covered at every step",
      heldFinal: "more output, automated – 4× fewer people",
      smaller: "smaller department",
      win: "a financial win for the company",
      chartTitle: "Path of one task",
      legendBar: "time a task spends in a stage",
      legendLine: "target time",
      legendAlert: "bottleneck – most time is lost here",
      mostTime: "most time",
      reading: [
        "Every task passes five stages, left to right. Bar height is the time a task spends in that stage; the dashed line is the target time.",
        "Build takes the most time – it is the bottleneck. It holds up everything before it, so work piles up in front of it and earlier stages wait.",
        "Case 01 cuts the time lost at the bottleneck – the queue in front of it starts to shrink.",
        "Work no longer stops: earlier stages stop waiting and the flow evens out.",
        "Case 02 brings Build under the target time – delivery no longer depends on headcount.",
        "Every stage fits the target time – automated work, no room for human error, 2 people instead of 8.",
      ],
      note: "Headcount figures are real. Bars and queue illustrate the method.",
    },
  },

  syntaxai: {
    label: "Startup · Founder",
    titleA: "I built",
    titleB: "– a developer notebook that organizes itself.",
    badge: "Beta · Chrome & Firefox",
    visit: "Visit syntaxai.app",
    summary:
      "SyntaxAI is a browser extension for developers. Paste a snippet, a screenshot or a page selection – built-in OpenAI detects the language or technology, writes a title and explains the code. Everything lands in a searchable library with analytics on your stack.",
    features: [
      {
        title: "Quick note",
        text: "Paste code or text, or drop an image of code into the side panel. Save with ⌘/Ctrl + Enter.",
      },
      {
        title: "AI detection",
        text: "OpenAI detects the programming language or technology and adds a title and an explanation automatically.",
      },
      {
        title: "Page context",
        text: "Select code or a paragraph from documentation, right-click, choose Add to SyntaxAI – detection starts and the note is saved.",
      },
      {
        title: "Stack analytics",
        text: "Stack breakdown, streak & momentum and a capture-activity matrix show what you actually learn.",
      },
    ],
    demo: {
      pick: "Pick a snippet",
      pageTitle: "Docs · reference",
      selected: "Selected",
      menuCopy: "Copy",
      menuSearch: "Search the web",
      menuAdd: "Add to SyntaxAI",
      log: ["reading page context", "detecting language", "writing title & explanation"],
      saved: "Saved to library",
      language: "Language",
      replay: "Replay",
      note: "Simulated demo of the capture flow – real screenshots are below.",
      samples: {
        angular: {
          title: "Angular Counter Component",
          explanation:
            "A component that keeps a counter in a signal. The signal updates the view automatically when the value changes.",
        },
        python: {
          title: "Extract vowels from a string",
          explanation:
            "A list comprehension that walks through the text and keeps only the characters that are vowels.",
        },
        sql: {
          title: "Count notes per language",
          explanation:
            "Groups rows by language and counts how many notes each group contains – a basic aggregation query.",
        },
      },
    },
    shotsTitle: "The real product",
    sidepanelSteps: [
      { title: "Drop anything in", text: "Paste a code snippet or text, or drag in a screenshot of code." },
      { title: "AI detects it", text: "The language or technology is recognised, a title and an explanation are written." },
      { title: "Save to library", text: "Press ⌘/Ctrl + Enter – the note lands in your searchable library." },
      { title: "Recent at hand", text: "Your latest notes stay in the panel, one click away." },
    ],
    shots: {
      sidepanel: { tab: "Side panel", caption: "Quick note: paste code, text or an image – the AI does the rest." },
      notes: { tab: "All notes", caption: "A searchable library with detected languages, titles and explanations." },
      stack: { tab: "Stack", caption: "Every note is tagged with a primary technology." },
      analytics: { tab: "Insights", caption: "Stack breakdown, streak & momentum and a capture-activity matrix." },
    },
    openShot: "screenshot",
  },

  projects: {
    label: "Key projects & freelance",
    titleA: "Products I've built",
    titleB: "from the first pixel to the database.",
    moreGithub: "More on GitHub",
    codeAria: "source code on GitHub",
    showShot: "Show screenshot",
    items: {
      kirich: {
        subtitle: "Sewing studio website",
        description:
          "Delivered an end-to-end business solution – design, frontend, backend and marketing. Built the product catalog and order management system, optimized the custom measurement intake workflow and implemented tailored logic for bespoke garments and individual client requests.",
        highlights: [
          "Product catalog with filtering",
          "Custom bespoke order builder",
          "Client & server-side validation",
          "Unified shopping cart",
        ],
        liveLabel: "Visit website",
      },
      "flow-crm": {
        subtitle: "Client & workflow platform",
        description:
          "Full-featured CRM platform with interactive Kanban workflow boards, structured client databases, real-time analytics and performance statistics, and automated task tracking.",
        highlights: ["Kanban workflow boards", "Client databases", "Analytics & statistics", "Automated task tracking"],
        liveLabel: "Live demo",
      },
      "phone-catalog": {
        subtitle: "Apple hardware store",
        description:
          "Full-featured Apple hardware e-commerce store with dynamic model filtering, specs comparison, a responsive product catalog, interactive cart management and seamless UI design.",
        highlights: ["Dynamic model filtering", "Specs comparison", "Interactive cart", "Responsive catalog"],
        liveLabel: "Browse catalog",
      },
    },
  },

  journey: {
    label: "Journey",
    titleA: "From the academy to an offer at",
    age: "16 y.o.",
    titleB: ". Then a frontend team that shrank",
    leaner: "from 8 to 2",
    titleC: "– and my own startup.",
    keepScrolling: "Keep scrolling",
    outroKicker: "Working together",
    outroTitle: "Have something to build or automate?",
    outroText: "Tell me the task – I'll design the solution and build it, from idea to production.",
    outroCta: "Let's talk",
    chapters: {
      itstep: {
        kicker: "Academy",
        period: "2024",
        title: "IT Step Academy",
        text: "Python and JavaScript – the first structured step from curiosity into engineering.",
      },
      mate: {
        kicker: "Academy",
        period: "2025",
        title: "Mate Academy",
        text: "Full-Stack Developer program – building complete products from the database to the interface.",
      },
      offer: {
        kicker: "First offer · Bypass",
        period: "Jan – Nov 2026",
        title: "First offer at 16 y.o. – Bypass",
        text: "My first professional offer, in a company of ~80 people. I joined as a Full-Stack Engineer focused on optimization and delivered two cases:",
        results: [
          "Bottlenecks found, processes optimized",
          "Work automated – faster and with fewer human errors",
          "Frontend department 8 → 2 (4×)",
          "A financial win for the company",
        ],
      },
      syntaxai: {
        kicker: "Founder",
        period: "Sep 2026 – Present",
        title: "SyntaxAI",
        text: "Founded and built an AI browser extension for Chrome & Firefox: it detects the language of any snippet, titles and explains it, and tracks your stack.",
      },
    },
  },

  profile: {
    label: "Profile",
    titleA: "About me:",
    titleB: "a systems person.",
    books: {
      eyebrow: "Library",
      read: "books read",
      aria: "A shelf of 80 books",
      summary: "Systems thinking, business strategy and philosophy – the mental models behind how I work.",
      radarTitle: "Directions I grow in",
      radar: ["Development", "Business", "Optimization", "Self-development", "Philosophy", "Discipline"],
      list: [
        { title: "The Richest Man in Babylon", author: "George S. Clason" },
        { title: "Cashflow Quadrant", author: "Robert Kiyosaki" },
        { title: "Rich Dad Poor Dad", author: "Robert Kiyosaki" },
        { title: "Reality Transurfing", author: "Vadim Zeland" },
        { title: "The Goal (3 parts)", author: "Eliyahu M. Goldratt" },
        { title: "The Toyota Way", author: "Jeffrey K. Liker" },
        { title: "Stoic Philosophy", author: "Marcus Aurelius" },
      ],
      more: "…and many more",
    },
    stack: { eyebrow: "Core stack", text: "TypeScript across the whole stack – from the database to the interface." },
    experience: {
      eyebrow: "Experience",
      years: "years in IT",
      commercial: "year in commercial production",
      offer: "First professional Frontend offer at",
    },
    discipline: {
      eyebrow: "Discipline",
      headline: "Strength training – my discipline system.",
      summary: "Regular training teaches me to work steadily: show up every day, raise the load step by step and finish what I start.",
      principles: ["Consistency", "Gradual progress", "Finishing what I start"],
      heatmapNote: "consistency, week by week",
    },
    education: {
      eyebrow: "Education",
      present: "Present",
      programs: {
        mate: "Full-Stack Developer",
        itstep: "Python | JS",
        college: "Computer-Aided Design of Power Supply Systems",
      },
    },
    location: {
      eyebrow: "Based in",
      place: "Poltava, Ukraine",
      local: "local",
      modes: ["Remote", "Hybrid", "On-site"],
    },
    principles: {
      eyebrow: "Operating principles",
      items: [
        { name: "Constraint first", source: "The Goal", text: "Improve anything but the bottleneck and you improved nothing." },
        { name: "Genchi genbutsu", source: "The Toyota Way", text: "Go and see. Decisions come from the real process, not from slides." },
        { name: "Kaizen", source: "The Toyota Way", text: "Small, continuous improvements compound into an unfair advantage." },
        { name: "Own the outcome", source: "Gym", text: "No excuses between the plan and the result." },
      ],
    },
  },

  contact: {
    label: "Contact",
    titleA: "Let's build",
    titleB: "something that",
    titleC: "compounds.",
    hello: "Get in touch",
    copied: "Email copied",
    ticker: [
      "Available for remote",
      "Hybrid",
      "On-site",
      "Poltava, Ukraine",
      "Full-Stack Engineer",
      "Process Optimization",
    ],
  },

  footer: { rights: "All rights reserved." },
};

export type Dictionary = typeof en;
