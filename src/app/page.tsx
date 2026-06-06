"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText,
  Mail,
  Globe,
  Cpu,
  Layers,
  Copy,
  Check,
  ExternalLink
} from "lucide-react";

// Inline Custom SVGs for Brands
const GithubIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

// Centralized Bento Configuration Data
const DATA = {
  PROFILE: {
    title: "Full-Stack Developer // Python Developer",
    status: "STATUS: ACTIVE // MISSION_CAPABLE",
    location: "ORIGIN // INDIA",
    institution: "SRM UNIVERSITY-AP"
  },
  SOCIALS: {
    github: "https://github.com/JCharith",
    linkedin: "https://www.linkedin.com/in/charith-j-5a53012a3/",
    email: "mailto:charithjangam05@gmail.com",
    dossier: "/Charith_J_Personnel_Dossier.pdf"
  },
  ABOUT_ME: "Computer Science undergraduate specializing in full-stack backend development, high-performance Python infrastructure, and distributed systems. Engineered to build robust software services, optimize database schemas, and deploy secure, low-latency REST APIs. Focused on core data structures, algorithmic performance, and scalable system execution.",
  TECH_STACK: [
    {
      category: "PROGRAMMING LANGUAGES",
      items: ["JavaScript/TypeScript", "Python", "Bash"]
    },
    {
      category: "FRAMEWORKS // CORE",
      items: ["Next.js App Router", "React / Redux", "Tailwind CSS", "Node.js / Express.js"]
    },
    {
      category: "SYSTEMS // DATABASE",
      items: ["PostgreSQL / Prisma", "MongoDB / Mongoose", "Docker / Linux", "REST API Engine"]
    }
  ],
  PUBLICATIONS: [
    {
      id: "PUB_ETAACT_2026",
      title: "SECURE BIOMETRIC TEMPLATE GENERATION AND CRYPTOGRAPHIC KEY EXTRACTION",
      authors: "Charith J., Academic Mentors & Co-Authors",
      conference: "1st International Conference on Emerging Trends in Advancements and Applications of Computational Intelligence Techniques (ETAACT 2026)",
      indexing: "VERIFIED // INDEXED ON IEEE XPLORE & SCOPUS",
      source_url: "https://ieeexplore.ieee.org/document/11542175/",
      abstract: "Development of a deep learning-based framework for secure cryptographic key extraction directly from fingerprint minutiae maps. This architecture effectively mitigates biometric template leakage risks and thwarts reverse-engineering attack vectors while maintaining ultra-fast, high-precision verification alignment metrics. Performance benchmarks verified across rigorous cross-examination testing cycles.",
      datasets: ["CASIA V5", "FVC2000", "FVC2004"],
      bibtex: `@INPROCEEDINGS{charith2026biometric,
  author={J., Charith and Mentors, Academic},
  booktitle={2026 International Conference on Emerging Trends in Advancements and Applications of Computational Intelligence Techniques (ETAACT)},
  title={Secure Biometric Template Generation and Cryptographic Key Extraction},
  year={2026},
  volume={},
  number={},
  pages={},
  doi={10.1109/ETAACT11542175},
  publisher={IEEE}
}`
    }
  ],
  PROJECTS: [
    {
      id: "PROJ_AIM_SYNC",
      title: "AIM_SYNC // ACTIVE_DEVELOPMENT",
      is_active_focus: true,
      description: "Full-stack simulation platform engineered to analyze user precision metrics, bullet spraying, and tactical recoil physics for elite tactical shooters. Developed as a high-performance training environment built to bridge the gap between web mechanics and tactical shooter physics.",
      tech_stack: ["React (TypeScript)", "Node.js", "Express.js", "PostgreSQL", "Prisma ORM", "Canvas API"],
      status: "STATUS: ACTIVE // CURRENT BUILD",
      github_link: "https://github.com/LogicArchitectDS/AimSync",
      live_link: "#",
      features: {
        current_implementation: [
          "Interactive, low-latency HTML5 Canvas-based training drills supporting multiple modular training modes.",
          "Secure JSON Web Token (JWT) session authentication and strict user account management workflows.",
          "Precision metric telemetry tracking player progress and raw accuracy analytics visualization dashboards."
        ],
        future_expansions: [
          "Implementation of 3D spatial alignment vectors utilizing modern client-side rendering engines.",
          "Advanced algorithmic recoil configuration modules matching specific tactical shooter weapon profiles.",
          "Global real-time competitive matchmaking leaderboards driven by synchronized low-latency database queries."
        ]
      }
    },
    {
      id: "PROJ_FINANCES_FORU",
      title: "FINANCES_FORU // REAL-TIME ANALYTICS DASHBOARD",
      is_active_focus: false,
      description: "Responsive, high-throughput financial command interface monitoring live stock market asset price fluctuations. Integrated external REST APIs to efficiently process external data feeds. Implemented dynamic, high-performance visualization charts and backend processing routines optimized for efficient system memory handling.",
      tech_stack: ["React.js", "Node.js", "Express.js", "MongoDB", "REST APIs"],
      status: "COMPLETED_STANDBY",
      github_link: "https://github.com/JCharith/FinancesForU",
      live_link: "#"
    }
  ]
};

export default function Home() {
  const [copied, setCopied] = useState(false);
  const [bibtexOpen, setBibtexOpen] = useState(false);


  // Copy to Clipboard
  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy citation: ", err);
    }
  };

  const renderIcon = (iconName: string) => {
    const className = "w-4 h-4 text-zinc-500 group-hover:text-accent-scarlet transition-colors duration-200";
    switch (iconName) {
      case "Github": return <GithubIcon className={className} />;
      case "Linkedin": return <LinkedinIcon className={className} />;
      case "FileText": return <FileText className={className} />;
      case "Mail": return <Mail className={className} />;
      default: return <Globe className={className} />;
    }
  };

  // Socials Registry List mapping from data object
  const socialsList = [
    { label: "GITHUB_LIAISON", url: DATA.SOCIALS.github, icon: "Github" },
    { label: "LINKEDIN_SIGNAL", url: DATA.SOCIALS.linkedin, icon: "Linkedin" },
    { label: "DOWNLOAD_PERSONNEL_DOSSIER.PDF", url: DATA.SOCIALS.dossier, icon: "FileText" },
    { label: "SECURE_EMAIL_ROUTE", url: DATA.SOCIALS.email, icon: "Mail" }
  ];

  // Framer Motion Grid Orchestration
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 90,
        damping: 14
      }
    }
  };

  return (
    <div className="relative min-h-screen bg-black text-zinc-400 flex flex-col p-4 md:p-8 font-mono select-none overflow-x-hidden selection:bg-accent-scarlet selection:text-black">

      {/* 12-COLUMN ASYMMETRICAL CSS TAC-GRID CONTAINER */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="w-full max-w-7xl mx-auto flex-1 grid grid-cols-1 md:grid-cols-12 gap-px bg-zinc-900 border border-zinc-900 rounded-none mb-8"
      >

        {/* 1. INTEL & ABOUT [IDENTITY DOSSIER] (8 Columns) */}
        <motion.section
          variants={itemVariants}
          className="md:col-span-8 bg-bg-card p-6 md:p-10 flex flex-col justify-between min-h-[350px] rounded-none border-0"
        >
          <div className="flex items-center justify-between border-b border-zinc-900 pb-4 mb-4">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-scarlet opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-scarlet"></span>
              </span>
              <span className="text-[10px] text-accent-scarlet tracking-widest font-bold">
                {DATA.PROFILE.status}
              </span>
            </div>
            <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">
              {DATA.PROFILE.institution}
            </span>
          </div>

          <div className="flex flex-col md:flex-row gap-8 items-start my-6">
            {/* STATIC AVATAR SLOT */}
            <div
              className="w-28 h-32 border border-zinc-900 bg-black/60 flex flex-col items-center justify-center text-center p-2 rounded-none shrink-0 relative group select-none"
            >
              <img src="/avatar.png" alt="Avatar" className="w-full h-full object-cover" />
            </div>

            <div className="flex-1 flex flex-col justify-between h-full">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tighter uppercase leading-tight rounded-none">
                {DATA.PROFILE.title}
              </h1>
              <p className="text-xs md:text-sm text-zinc-400 leading-relaxed mt-4">
                {DATA.ABOUT_ME}
              </p>
            </div>
          </div>

          <div className="space-y-6 border-t border-zinc-900 pt-6">
            {/* TECH GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {DATA.TECH_STACK.map((category, idx) => (
                <div key={idx} className="border border-zinc-900 p-4 hover:opacity-80 transition-opacity rounded-none bg-black/25">
                  <span className="text-[9px] text-zinc-500 font-bold block mb-2 tracking-wider">{category.category}</span>
                  <div className="flex flex-col gap-1">
                    {category.items.map((item, iIdx) => (
                      <span key={iIdx} className="text-[11px] text-zinc-300 font-bold tracking-tight">// {item}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* 2. COMMS LIAISON [SOCIALS REGISTRY] (4 Columns) */}
        <motion.section
          variants={itemVariants}
          className="md:col-span-4 bg-bg-card p-6 md:p-8 flex flex-col justify-between min-h-[350px] rounded-none border-0"
        >
          <div className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider mb-6">
            // COMMS_LIAISON_REGISTRY
          </div>

          <div className="flex flex-col gap-2.5">
            {socialsList.map((social, sIdx) => (
              <a
                key={sIdx}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between border border-zinc-900 bg-black/50 hover:bg-black/90 p-4 text-xs text-zinc-300 hover:text-white transition-all duration-200 group rounded-none"
              >
                <div className="flex items-center gap-3">
                  {renderIcon(social.icon)}
                  <span className="tracking-wider text-[11px]">{social.label}</span>
                </div>
                <span className="text-[10px] text-zinc-500 group-hover:text-accent-scarlet transition-colors duration-200 font-bold">
                  [↗]
                </span>
              </a>
            ))}
          </div>

          <div className="text-[9px] text-zinc-500 mt-6 pt-4 border-t border-zinc-900 flex justify-between">
            <span>SECURE_DATA_LINK: ESTABLISHED</span>
            <span className="text-zinc-600">{DATA.PROFILE.location}</span>
          </div>
        </motion.section>

        {/* 3. OPERATIONAL DEPLOYMENT [RESEARCH & PAPERS] (Full Width) */}
        <motion.section
          variants={itemVariants}
          className="md:col-span-12 bg-bg-card p-6 md:p-8 rounded-none border-0"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">
              // OPERATIONAL_DEPLOYMENTS_&_RECON
            </div>

            <a
              href={DATA.PUBLICATIONS[0].source_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-[9px] border border-accent-green/30 bg-accent-green/10 text-emerald-400 px-3 py-1 font-bold uppercase tracking-wider rounded-none hover:bg-accent-green/20 transition-all"
            >
              {DATA.PUBLICATIONS[0].indexing}
            </a>
          </div>

          {DATA.PUBLICATIONS.map((pub, pIdx) => (
            <div key={pIdx} className="border border-zinc-900 bg-black/35 p-5 md:p-6 flex flex-col gap-5 rounded-none">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

                {/* Horizontal details */}
                <div className="md:col-span-3">
                  <h3 className="text-base md:text-lg font-bold text-white mb-1 uppercase tracking-tight">
                    {pub.title}
                  </h3>
                  <p className="text-[10px] text-zinc-500 mb-4 tracking-tight">
                    {pub.conference} <span className="text-zinc-600">// AUTHORS: {pub.authors}</span>
                  </p>
                  <div className="text-xs text-zinc-400 leading-relaxed bg-black/60 p-4 border border-zinc-900 rounded-none line-clamp-3">
                    <span className="font-bold text-zinc-300 block mb-1.5">// DOSSIER_ABSTRACT:</span>
                    {pub.abstract}
                  </div>
                </div>

                {/* Dataset mapping tags */}
                <div className="border-l border-zinc-900 pl-4 flex flex-col justify-between">
                  <div>
                    <span className="text-[9px] text-zinc-500 font-bold block mb-2 tracking-wider">// TELEMETRY_MAPPING_DATASETS</span>
                    <div className="flex flex-wrap gap-1">
                      {pub.datasets.map((ds, dIdx) => (
                        <span key={dIdx} className="text-[9px] bg-zinc-900 text-zinc-300 border border-zinc-900 px-2 py-0.5 font-bold tracking-tight rounded-none">
                          {ds}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="text-[10px] text-zinc-500 mt-4 font-bold">
                    ID: <span className="text-zinc-300">{pub.id}</span>
                  </div>
                </div>

              </div>

              {/* Accordion bibtex trigger */}
              <div className="flex justify-end gap-3 border-t border-zinc-900 pt-4">
                <button
                  onClick={() => setBibtexOpen(!bibtexOpen)}
                  className="border border-zinc-900 hover:border-zinc-700 bg-black/40 hover:bg-black px-4 py-2 text-[10px] text-zinc-300 hover:text-white flex items-center transition-all duration-200 cursor-pointer rounded-none font-bold"
                >
                  {bibtexOpen ? "HIDE_BIBTEX" : "SHOW_BIBTEX"}
                </button>
                <button
                  onClick={() => handleCopy(pub.bibtex)}
                  className="border border-zinc-900 hover:border-zinc-700 bg-black/40 hover:bg-black px-4 py-2 text-[10px] text-zinc-300 hover:text-white flex items-center transition-all duration-200 min-w-[120px] justify-center cursor-pointer rounded-none font-bold"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 mr-1.5 text-accent-green" /> COPIED!
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 mr-1.5 text-zinc-500" /> COPY_CITATION
                    </>
                  )}
                </button>
              </div>

              <AnimatePresence>
                {bibtexOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <pre className="text-[10px] text-zinc-500 bg-zinc-950 p-4 border border-zinc-900 overflow-x-auto select-text whitespace-pre-wrap leading-normal font-mono rounded-none">
                      {pub.bibtex}
                    </pre>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </motion.section>

        {/* 4. ENGINEERING ARRAY [PROJECTS SHOWCASE] (Full Width) */}
        <motion.section
          variants={itemVariants}
          className="md:col-span-12 bg-bg-card p-6 md:p-8 rounded-none border-0"
        >
          <div className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider mb-6">
            // ENGINEERING_PROJECTS_ARRAY
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {DATA.PROJECTS.map((project, pIdx) => (
              <div
                key={pIdx}
                className={`${project.is_active_focus ? "md:col-span-2" : "md:col-span-1"
                  } border border-zinc-900 bg-black/35 hover:border-zinc-800 transition-all duration-300 p-5 flex flex-col justify-between gap-5 relative rounded-none`}
              >
                <div className="absolute top-4 right-4 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-scarlet pulse-scarlet"></span>
                  <span className="text-[9px] text-accent-scarlet tracking-wider font-bold">{project.status}</span>
                </div>

                <div>
                  <div className="text-[9px] text-zinc-600 font-bold mb-1">REF_{project.id}</div>
                  <h3 className="text-sm font-bold text-white mb-2 hover:text-accent-scarlet transition-colors uppercase">
                    {project.title}
                  </h3>
                  <p className="text-[11px] text-zinc-400 leading-relaxed mb-4">
                    {project.description}
                  </p>

                  {project.is_active_focus && project.features && (
                    <div className="mt-4 pt-4 border-t border-zinc-900 grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <span className="text-[9px] text-zinc-500 font-bold block mb-2 tracking-wider">// [DEPLOYED_FEATURES]</span>
                        <ul className="list-none space-y-1">
                          {project.features.current_implementation.map((feat, fIdx) => (
                            <li key={fIdx} className="text-[10px] text-zinc-400 leading-relaxed">
                              - {feat}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="border-t md:border-t-0 md:border-l border-zinc-900 pt-4 md:pt-0 md:pl-4">
                        <span className="text-[9px] text-zinc-500 font-bold block mb-2 tracking-wider">// [UPCOMING_EXPANSIONS]</span>
                        <ul className="list-none space-y-1">
                          {project.features.future_expansions.map((exp, eIdx) => (
                            <li key={eIdx} className="text-[10px] text-zinc-400 leading-relaxed">
                              - {exp}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-1 mt-4">
                    {project.tech_stack.map((t, tIdx) => (
                      <span key={tIdx} className="text-[9px] text-zinc-500 border border-zinc-900 bg-zinc-950 px-2 py-0.5 rounded-none font-bold">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="border-t border-zinc-900/60 pt-4 text-center">
                  <a
                    href={project.github_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full border border-zinc-900 hover:border-zinc-700 bg-black/40 py-1.5 text-[10px] text-zinc-400 hover:text-white transition-all cursor-pointer rounded-none font-bold"
                  >
                    SOURCE_CODE
                  </a>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

      </motion.div>

      {/* SYSTEM NODES MATRIX FOOTER */}
      <footer className="w-full max-w-7xl mx-auto border-t border-zinc-800 bg-black py-4 px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-zinc-500 font-mono tracking-wider rounded-none">
        <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-scarlet opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-scarlet"></span>
            </span>
            <span>NODE_01 // AIM_SYNC: ACTIVE_BUILD</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-600"></span>
            <span>NODE_02 // FINANCES_FORU: STANDBY // STABLE</span>
          </div>
        </div>
        <div className="text-zinc-600">
          LAST_SECURE_DEPLOYMENT: SUCCESSFUL // JUNE_2026
        </div>
      </footer>

    </div>
  );
}
