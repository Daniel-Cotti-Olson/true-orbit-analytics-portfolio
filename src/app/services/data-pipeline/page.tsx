"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Database, GitBranch, Zap, Shield, RefreshCw, AlertCircle,
  CheckCircle, ArrowRight, Menu, X, Activity, Lock, Layers
} from "lucide-react";

const C = {
  bg:      "#080d1a",
  surface: "#0d1425",
  border:  "#1a2540",
  gold:    "#c9a84c",
  goldLt:  "#e8c96d",
  goldDim: "#7a5f2a",
  text:    "#f1f5f9",
  muted:   "#94a3b8",
  dim:     "#475569",
};

const deliverables = [
  {
    icon: <GitBranch size={24} />,
    title: "Source-to-Destination Pipelines",
    desc: "Fully automated data flows connecting every source system — CRM, ERP, accounting, marketing, operations — to a centralized destination your analytics layer can trust.",
  },
  {
    icon: <RefreshCw size={24} />,
    title: "Scheduled & Event-Driven Refresh",
    desc: "Pipelines that run on your schedule — hourly, daily, or triggered by upstream events — so your dashboards and reports always reflect the current state of your business.",
  },
  {
    icon: <Shield size={24} />,
    title: "Data Cleaning & Normalization",
    desc: "Automated transformation logic that catches duplicates, resolves conflicts, standardizes formats, and enforces business rules before data reaches your reports.",
  },
  {
    icon: <Activity size={24} />,
    title: "Pipeline Monitoring & Alerting",
    desc: "Real-time monitoring of every pipeline run with automated alerts when something breaks, stalls, or produces anomalous output — before it contaminates your reporting.",
  },
  {
    icon: <Layers size={24} />,
    title: "Centralized Data Warehouse",
    desc: "A single, structured destination for all your business data — modeled logically, documented clearly, and optimized for the queries your BI tools need to run fast.",
  },
  {
    icon: <Lock size={24} />,
    title: "Access Control & Auditability",
    desc: "Role-based access policies and full audit trails so sensitive data stays protected, compliance requirements are met, and every data change is traceable.",
  },
];

const problems = [
  "Analysts spending hours manually exporting and merging files every week",
  "Reports built on data that was accurate last Tuesday — but not today",
  "Three systems giving three different numbers for the same metric",
  "A single missed export breaking an entire downstream dashboard",
  "No visibility into whether your data pipeline is running or silently failing",
  "Growing data volumes making manual processes completely unsustainable",
];

const techStack = [
  { name: "Airbyte", desc: "Open-source ELT platform for connecting hundreds of data sources with minimal configuration" },
  { name: "dbt", desc: "SQL-based transformation layer that makes your data modeling version-controlled and testable" },
  { name: "BigQuery", desc: "Google's serverless data warehouse — scalable, fast, and cost-effective for most business sizes" },
  { name: "Snowflake", desc: "Cloud data platform optimized for performance at scale with strong separation of storage and compute" },
  { name: "Apache Airflow", desc: "Workflow orchestration for complex, multi-step pipelines that require scheduling and dependency management" },
  { name: "Your Stack", desc: "Already invested in specific tools? We integrate with your existing infrastructure wherever possible" },
];

const forWho = [
  { label: "Businesses with multiple disconnected systems", desc: "CRM, ERP, accounting, and marketing tools that have never spoken to each other" },
  { label: "Teams drowning in manual reporting prep", desc: "If someone is spending hours a week pulling and combining data, the pipeline is missing" },
  { label: "Organizations scaling their data operations", desc: "Growing data volumes and use cases that manual processes simply can't keep up with" },
  { label: "Companies building a BI or analytics layer", desc: "Clean, reliable pipeline infrastructure is the prerequisite to any serious analytics investment" },
];

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

function AnimSection({ children, delay = 0, className = "" }: {
  children: React.ReactNode; delay?: number; className?: string;
}) {
  const { ref, visible } = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

export default function DataPipelinePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=DM+Sans:wght@300;400;500;600&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body {
          background: ${C.bg};
          color: ${C.text};
          font-family: 'DM Sans', sans-serif;
          -webkit-font-smoothing: antialiased;
          overflow-x: hidden;
        }

        /* ── Nav ── */
        .nav {
          position: fixed; top: 0; left: 0; right: 0;
          z-index: 100; padding: 0 48px; height: 72px;
          display: flex; align-items: center; justify-content: space-between;
          transition: background 0.3s, border-color 0.3s;
        }
        .nav.scrolled {
          background: rgba(8,13,26,0.92);
          border-bottom: 1px solid ${C.border};
          backdrop-filter: blur(12px);
        }
        .nav-links { display: flex; gap: 20px; list-style: none; }
        .nav-links a {
          font-size: 13px; font-weight: 500;
          letter-spacing: 0.08em; text-transform: uppercase;
          color: ${C.muted}; text-decoration: none; cursor: pointer;
          transition: color 0.2s;
        }
        .nav-links a:hover { color: ${C.gold}; }
        .nav-cta {
          background: transparent; border: 1px solid ${C.gold};
          color: ${C.gold}; font-family: 'DM Sans', sans-serif;
          font-size: 12px; font-weight: 600; letter-spacing: 0.1em;
          text-transform: uppercase; padding: 10px 24px;
          border-radius: 2px; cursor: pointer;
          transition: background 0.2s, color 0.2s;
        }
        .nav-cta:hover { background: ${C.gold}; color: ${C.bg}; }
        .nav-hamburger {
          display: none; background: none; border: none;
          color: ${C.gold}; cursor: pointer;
        }

        /* ── Hero ── */
        .hero {
          min-height: 100vh;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          text-align: center; padding: 120px 48px 80px;
          position: relative; overflow: hidden;
        }
        .hero-grid {
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(201,168,76,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(201,168,76,0.04) 1px, transparent 1px);
          background-size: 60px 60px;
          mask-image: radial-gradient(ellipse 80% 60% at 50% 50%, black, transparent);
        }
        .hero-glow {
          position: absolute; width: 800px; height: 800px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(201,168,76,0.06) 0%, transparent 70%);
          top: 50%; left: 50%; transform: translate(-50%, -50%);
          pointer-events: none;
        }
        .breadcrumb {
          font-size: 11px; font-weight: 600;
          letter-spacing: 0.2em; text-transform: uppercase;
          color: ${C.dim}; margin-bottom: 24px;
          display: flex; align-items: center; gap: 8px;
          position: relative;
        }
        .breadcrumb a { color: ${C.dim}; text-decoration: none; transition: color 0.2s; }
        .breadcrumb a:hover { color: ${C.gold}; }
        .breadcrumb span { color: ${C.gold}; }
        .hero-eyebrow {
          font-size: 11px; font-weight: 600;
          letter-spacing: 0.25em; text-transform: uppercase;
          color: ${C.gold}; margin-bottom: 20px;
          display: inline-flex; align-items: center; gap: 12px;
          position: relative;
        }
        .hero-eyebrow::before, .hero-eyebrow::after {
          content: ''; width: 40px; height: 1px; background: ${C.goldDim};
        }
        .hero-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2.5rem, 6vw, 5rem);
          font-weight: 700; line-height: 1.05;
          color: ${C.text}; margin-bottom: 24px;
          position: relative; letter-spacing: -0.01em;
        }
        .hero-title span {
          background: linear-gradient(135deg, ${C.goldDim} 0%, ${C.goldLt} 50%, ${C.goldDim} 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .hero-sub {
          font-size: clamp(1rem, 2vw, 1.15rem);
          color: ${C.muted}; max-width: 580px;
          margin: 0 auto 48px; line-height: 1.75;
          font-weight: 300; position: relative;
        }
        .hero-actions {
          display: flex; gap: 16px; justify-content: center;
          flex-wrap: wrap; position: relative;
        }
        .btn-primary {
          background: linear-gradient(135deg, ${C.goldDim}, ${C.gold});
          color: ${C.bg}; border: none;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px; font-weight: 700;
          letter-spacing: 0.08em; text-transform: uppercase;
          padding: 16px 36px; border-radius: 2px; cursor: pointer;
          transition: opacity 0.2s, transform 0.2s, box-shadow 0.2s;
          display: inline-flex; align-items: center; gap: 8px;
        }
        .btn-primary:hover {
          opacity: 0.9; transform: translateY(-2px);
          box-shadow: 0 8px 32px rgba(201,168,76,0.3);
        }
        .btn-ghost {
          background: transparent; color: ${C.muted};
          border: 1px solid ${C.border};
          font-family: 'DM Sans', sans-serif;
          font-size: 13px; font-weight: 500;
          letter-spacing: 0.06em; text-transform: uppercase;
          padding: 16px 36px; border-radius: 2px; cursor: pointer;
          transition: color 0.2s, border-color 0.2s;
        }
        .btn-ghost:hover { color: ${C.gold}; border-color: ${C.goldDim}; }

        /* ── Sections ── */
        .section { padding: 100px 48px; max-width: 1200px; margin: 0 auto; }
        .section-label {
          font-size: 11px; font-weight: 600;
          letter-spacing: 0.2em; text-transform: uppercase;
          color: ${C.gold}; margin-bottom: 16px;
          display: flex; align-items: center; gap: 12px;
        }
        .section-label::after {
          content: ''; flex: 1; max-width: 60px;
          height: 1px; background: ${C.goldDim};
        }
        .section-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 700; line-height: 1.1;
          color: ${C.text}; margin-bottom: 16px;
          letter-spacing: -0.01em;
        }
        .section-title span { color: ${C.gold}; }
        .section-body {
          font-size: 1rem; color: ${C.muted};
          line-height: 1.75; max-width: 560px; font-weight: 300;
        }
        .alt-section {
          background: ${C.surface};
          border-top: 1px solid ${C.border};
          border-bottom: 1px solid ${C.border};
          padding: 100px 0;
        }
        .problem-item {
          display: flex; gap: 14px; align-items: flex-start;
          padding: 14px 20px;
          border: 1px solid ${C.border}; border-radius: 4px;
          background: ${C.bg};
          font-size: 14px; color: ${C.muted};
          line-height: 1.5; font-weight: 300;
          transition: border-color 0.2s;
        }
        .problem-item:hover { border-color: rgba(248,113,113,0.3); }
        .problem-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: rgba(248,113,113,0.7);
          margin-top: 5px; flex-shrink: 0;
        }
        .solution-card {
          background: ${C.bg}; border: 1px solid ${C.border};
          border-radius: 4px; padding: 48px; position: relative; overflow: hidden;
        }
        .solution-card::before {
          content: ''; position: absolute; top: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, ${C.goldDim}, ${C.gold}, ${C.goldDim});
        }
        .solution-number {
          font-family: 'Cormorant Garamond', serif;
          font-size: 6rem; font-weight: 700;
          color: rgba(201,168,76,0.08); line-height: 1; margin-bottom: 16px; display: block;
        }
        .solution-headline {
          font-family: 'Cormorant Garamond', serif;
          font-size: 2rem; font-weight: 700;
          color: ${C.text}; margin-bottom: 16px; line-height: 1.2;
        }
        .solution-headline span { color: ${C.gold}; }
        .solution-body { font-size: 14px; color: ${C.muted}; line-height: 1.75; font-weight: 300; }

        /* ── Deliverables ── */
        .deliverables-grid {
          display: grid; grid-template-columns: repeat(3, 1fr);
          gap: 1px; background: ${C.border};
          border: 1px solid ${C.border}; margin-top: 64px;
        }
        .deliverable-cell {
          background: ${C.surface}; padding: 36px 32px;
          transition: background 0.25s; position: relative; overflow: hidden;
        }
        .deliverable-cell::before {
          content: ''; position: absolute; inset: 0;
          background: linear-gradient(135deg, rgba(201,168,76,0.04), transparent);
          opacity: 0; transition: opacity 0.3s;
        }
        .deliverable-cell:hover::before { opacity: 1; }
        .deliverable-icon {
          width: 48px; height: 48px; border: 1px solid ${C.border};
          border-radius: 8px; display: flex; align-items: center; justify-content: center;
          color: ${C.gold}; margin-bottom: 20px; transition: border-color 0.2s, background 0.2s;
        }
        .deliverable-cell:hover .deliverable-icon {
          border-color: ${C.goldDim}; background: rgba(201,168,76,0.06);
        }
        .deliverable-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.2rem; font-weight: 600; color: ${C.text}; margin-bottom: 10px;
        }
        .deliverable-desc { font-size: 13px; color: ${C.muted}; line-height: 1.7; font-weight: 300; }

        /* ── Pipeline diagram ── */
        .pipeline-visual {
          margin-top: 80px;
          border: 1px solid ${C.border};
          background: ${C.bg};
          border-radius: 4px;
          padding: 48px;
          position: relative;
          overflow: hidden;
        }
        .pipeline-visual::before {
          content: '';
          position: absolute; top: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, ${C.goldDim}, ${C.gold}, ${C.goldDim}, transparent);
        }
        .pipeline-label {
          font-size: 11px; font-weight: 600; letter-spacing: 0.2em;
          text-transform: uppercase; color: ${C.dim};
          text-align: center; margin-bottom: 40px;
        }
        .pipeline-row {
          display: flex; align-items: center; justify-content: center;
          gap: 0; flex-wrap: nowrap; overflow-x: auto;
        }
        .pipeline-node {
          display: flex; flex-direction: column; align-items: center; gap: 10px;
          flex-shrink: 0;
        }
        .pipeline-node-box {
          width: 96px; height: 64px;
          border: 1px solid ${C.border}; border-radius: 4px;
          background: ${C.surface};
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          gap: 6px; padding: 8px;
          transition: border-color 0.2s;
        }
        .pipeline-node-box:hover { border-color: ${C.goldDim}; }
        .pipeline-node-icon { color: ${C.gold}; }
        .pipeline-node-name {
          font-size: 10px; font-weight: 600;
          letter-spacing: 0.08em; text-transform: uppercase;
          color: ${C.dim}; text-align: center; line-height: 1.3;
        }
        .pipeline-arrow {
          width: 40px; height: 1px; background: ${C.goldDim};
          flex-shrink: 0; position: relative;
        }
        .pipeline-arrow::after {
          content: '';
          position: absolute; right: -1px; top: -3px;
          border: 3px solid transparent;
          border-left: 5px solid ${C.goldDim};
        }
        .pipeline-node-label {
          font-size: 10px; color: ${C.dim};
          letter-spacing: 0.1em; text-transform: uppercase;
        }

        /* ── Tech stack ── */
        .tech-grid {
          display: grid; grid-template-columns: repeat(3, 1fr);
          gap: 16px; margin-top: 48px;
        }
        .tech-card {
          padding: 28px 24px; border: 1px solid ${C.border};
          background: ${C.bg}; border-radius: 4px;
          transition: border-color 0.2s;
        }
        .tech-card:hover { border-color: ${C.goldDim}; }
        .tech-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.2rem; font-weight: 700;
          color: ${C.gold}; margin-bottom: 8px;
        }
        .tech-desc { font-size: 13px; color: ${C.muted}; line-height: 1.6; font-weight: 300; }

        /* ── Steps ── */
        .steps {
          display: flex; flex-direction: column; gap: 2px; margin-top: 48px;
        }
        .step {
          display: grid; grid-template-columns: 80px 1fr;
          gap: 32px; align-items: start; padding: 32px;
          background: ${C.bg}; border: 1px solid ${C.border};
          transition: border-color 0.2s;
        }
        .step:hover { border-color: ${C.goldDim}; }
        .step-number {
          font-family: 'Cormorant Garamond', serif;
          font-size: 3rem; font-weight: 700;
          color: rgba(201,168,76,0.25); line-height: 1;
        }
        .step-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.3rem; font-weight: 600; color: ${C.text}; margin-bottom: 8px;
        }
        .step-desc { font-size: 14px; color: ${C.muted}; line-height: 1.7; font-weight: 300; }

        * ── For who ── */
        .for-who-grid {
          display: grid; grid-template-columns: repeat(2, 1fr);
          gap: 16px; margin-top: 48px;
        }
        .for-who-card {
          padding: 28px 32px; border: 1px solid ${C.border};
          background: ${C.surface}; border-radius: 4px;
          transition: border-color 0.2s; display: flex; gap: 16px; align-items: flex-start;
        }
        .for-who-card:hover { border-color: ${C.goldDim}; }
        .for-who-label {
          font-size: 14px; font-weight: 600; color: ${C.text}; margin-bottom: 4px;
        }
        .for-who-desc { font-size: 13px; color: ${C.muted}; line-height: 1.6; font-weight: 300; }

        /* ── CTA ── */
        .cta-section {
          padding: 120px 48px; text-align: center; position: relative; overflow: hidden;
        }
        .cta-glow {
          position: absolute; width: 600px; height: 600px; border-radius: 50%;
          background: radial-gradient(circle, rgba(201,168,76,0.06) 0%, transparent 70%);
          top: 50%; left: 50%; transform: translate(-50%, -50%); pointer-events: none;
        }
        .cta-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2.5rem, 5vw, 4rem);
          font-weight: 700; color: ${C.text}; margin-bottom: 16px;
          position: relative; line-height: 1.1;
        }
        .cta-title span { color: ${C.gold}; }
        .cta-sub {
          font-size: 1rem; color: ${C.muted}; max-width: 480px;
          margin: 0 auto 48px; line-height: 1.75; font-weight: 300; position: relative;
        }

        /* ── Footer ── */
        .footer {
          border-top: 1px solid ${C.border};
          background: ${C.surface}; padding: 32px 48px;
        }
        .footer-inner {
          max-width: 1200px; margin: 0 auto;
          display: flex; justify-content: space-between;
          align-items: center; font-size: 12px; color: ${C.dim};
        }

        .mobile-menu { display: none; }

        @media (max-width: 900px) {
          .nav { padding: 0 24px; }
          .nav-links, .nav-cta { display: none; }
          .nav-hamburger { display: block; }
          .mobile-menu {
            display: flex; position: fixed; inset: 0;
            background: ${C.bg}; z-index: 99;
            flex-direction: column; align-items: center; justify-content: center; gap: 32px;
          }
          .mobile-menu a {
            font-size: 1.5rem; font-family: 'Cormorant Garamond', serif;
            color: ${C.text}; text-decoration: none; cursor: pointer;
          }
          .section { padding: 64px 24px; }
          .hero { padding: 100px 24px 60px; }
          .two-col { grid-template-columns: 1fr; gap: 40px; }
          .deliverables-grid { grid-template-columns: 1fr; }
          .tech-grid { grid-template-columns: 1fr; }
          .for-who-grid { grid-template-columns: 1fr; }
          .step { grid-template-columns: 60px 1fr; gap: 16px; }
          .pipeline-visual { padding: 32px 24px; }
          .pipeline-row { gap: 0; }
          .pipeline-node-box { width: 72px; height: 56px; }
          .pipeline-arrow { width: 20px; }
          .footer-inner { flex-direction: column; gap: 8px; text-align: center; }
          .cta-section { padding: 80px 24px; }
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .hero-eyebrow { animation: fadeUp 0.7s ease 0.2s both; }
        .hero-title   { animation: fadeUp 0.7s ease 0.4s both; }
        .hero-sub     { animation: fadeUp 0.7s ease 0.6s both; }
        .hero-actions { animation: fadeUp 0.7s ease 0.8s both; }
      `}</style>

      {/* ── NAV ── */}
      <nav className={`nav${scrolled ? " scrolled" : ""}`}>
        <Link href="/">
          <Image
            src="/noBgColor.png"
            alt="True Orbit Analytics"
            width={160}
            height={44}
            style={{ objectFit: "contain", cursor: "pointer" }}
          />
        </Link>
        <ul className="nav-links">
          {["services","about","portfolio","pricing","contact"].map(id => (
            <li key={id}>
              <Link href={`/#${id}`} style={{ color: "#94a3b8", textDecoration: "none", fontSize: 13, fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase" }}>
                {id.charAt(0).toUpperCase() + id.slice(1)}
              </Link>
            </li>
          ))}
        </ul>
        <button className="nav-cta" onClick={() => window.location.href = "/#contact"}>
          Get Started
        </button>
        <button
          className="nav-hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{ visibility: menuOpen ? "hidden" : "visible" }}
        >
          <Menu size={24} />
        </button>
      </nav>

      {menuOpen && (
        <div className="mobile-menu">
          <button
            onClick={() => setMenuOpen(false)}
            style={{
              position: "absolute", bottom: 48, left: "50%",
              transform: "translateX(-50%)", background: "none", border: "none",
              color: "#c9a84c", cursor: "pointer", padding: 20, zIndex: 110
            }}
          >
            <X size={28} />
          </button>
          {["services","about","portfolio","pricing","contact"].map(id => (
            <a key={id} onClick={() => { window.location.href = `/#${id}`; setMenuOpen(false); }}>
              {id.charAt(0).toUpperCase() + id.slice(1)}
            </a>
          ))}
        </div>
      )}

      {/* ── HERO ── */}
      <section className="hero">
        <div className="hero-grid" />
        <div className="hero-glow" />
        <div className="breadcrumb">
          <a href="/">Home</a>
          <span>→</span>
          <span>Data Pipeline Architecture</span>
        </div>
        <p className="hero-eyebrow">Service</p>
        <h1 className="hero-title">
          Data That Arrives<br />
          <span>On Time. Every Time.</span>
        </h1>
        <p className="hero-sub">
          Your analytics are only as good as the data feeding them. We design
          and build the pipeline infrastructure that ensures every dashboard,
          every report, and every decision runs on clean, current, reliable data.
        </p>
        <div className="hero-actions">
          <button className="btn-primary" onClick={() => window.location.href = "/#contact"}>
            Start Free Discovery Call <ArrowRight size={16} />
          </button>
          <button className="btn-ghost" onClick={() => document.getElementById("deliverables")?.scrollIntoView({ behavior: "smooth" })}>
            See Deliverables
          </button>
        </div>
      </section>

      {/* ── PROBLEM / SOLUTION ── */}
      <div className="alt-section">
        <div className="section" style={{ padding: "0 48px" }}>
          <div className="two-col">
            <AnimSection>
              <div className="section-label">The Problem</div>
              <h2 className="section-title">
                Your Data Exists.<br />
                <span>Your Pipeline Doesn't.</span>
              </h2>
              <p className="section-body">
                Most businesses are sitting on a goldmine of data spread
                across a dozen disconnected systems — none of which talk to
                each other. The result is manual work, stale reports, and
                decisions made on data that may already be wrong.
              </p>
              <ul className="problem-list">
                {problems.map((p, i) => (
                  <li key={i} className="problem-item">
                    <div className="problem-dot" />
                    {p}
                  </li>
                ))}
              </ul>
            </AnimSection>

            <AnimSection delay={200}>
              <div className="solution-card">
                <span className="solution-number">03</span>
                <div className="solution-headline">
                  One flow.<br />
                  <span>Zero surprises.</span>
                </div>
                <p className="solution-body">
                  A well-architected data pipeline is invisible when it
                  works — and it should always work. Data moves from every
                  source system, gets cleaned and structured, and lands
                  exactly where your analytics tools need it.
                  <br /><br />
                  We design, build, and maintain the pipeline infrastructure
                  that makes your reporting reliable by default, not by luck.
                  No more Monday morning fire drills because a weekend export
                  failed.
                </p>
              </div>
            </AnimSection>
          </div>

          {/* ── Pipeline Visual ── */}
          <AnimSection>
            <div className="pipeline-visual">
              <div className="pipeline-label">How Your Data Flows</div>
              <div className="pipeline-row">

                {/* Sources */}
                <div className="pipeline-node">
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {["CRM", "ERP", "Finance", "Marketing"].map(src => (
                      <div key={src} className="pipeline-node-box">
                        <div className="pipeline-node-icon"><Database size={14} /></div>
                        <div className="pipeline-node-name">{src}</div>
                      </div>
                    ))}
                  </div>
                  <div className="pipeline-node-label">Sources</div>
                </div>

                <div className="pipeline-arrow" style={{ alignSelf: "center", marginBottom: 20 }} />

                {/* Extract */}
                <div className="pipeline-node">
                  <div className="pipeline-node-box" style={{ width: 96, height: 96 }}>
                    <div className="pipeline-node-icon"><Zap size={20} /></div>
                    <div className="pipeline-node-name">Extract &amp; Load</div>
                  </div>
                  <div className="pipeline-node-label">ELT</div>
                </div>

                <div className="pipeline-arrow" style={{ alignSelf: "center", marginBottom: 20 }} />

                {/* Transform */}
                <div className="pipeline-node">
                  <div className="pipeline-node-box" style={{ width: 96, height: 96 }}>
                    <div className="pipeline-node-icon"><GitBranch size={20} /></div>
                    <div className="pipeline-node-name">Transform &amp; Model</div>
                  </div>
                  <div className="pipeline-node-label">dbt / SQL</div>
                </div>

                <div className="pipeline-arrow" style={{ alignSelf: "center", marginBottom: 20 }} />

                {/* Warehouse */}
                <div className="pipeline-node">
                  <div className="pipeline-node-box" style={{ width: 96, height: 96, borderColor: "#7a5f2a" }}>
                    <div className="pipeline-node-icon"><Layers size={20} /></div>
                    <div className="pipeline-node-name">Data Warehouse</div>
                  </div>
                  <div className="pipeline-node-label">Single Source</div>
                </div>

                <div className="pipeline-arrow" style={{ alignSelf: "center", marginBottom: 20 }} />

                {/* Outputs */}
                <div className="pipeline-node">
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {["BI Dashboards", "Reports", "Alerts", "APIs"].map(out => (
                      <div key={out} className="pipeline-node-box">
                        <div className="pipeline-node-icon"><Activity size={14} /></div>
                        <div className="pipeline-node-name">{out}</div>
                      </div>
                    ))}
                  </div>
                  <div className="pipeline-node-label">Outputs</div>
                </div>

              </div>
            </div>
          </AnimSection>
        </div>
      </div>

      {/* ── DELIVERABLES ── */}
      <section id="deliverables">
        <div className="section">
          <AnimSection>
            <div className="section-label">What You Get</div>
            <h2 className="section-title">
              Every Engagement<br />
              <span>Includes</span>
            </h2>
            <p className="section-body">
              A complete pipeline infrastructure built for reliability,
              maintainability, and growth — not a fragile script that breaks
              the moment something changes upstream.
            </p>
          </AnimSection>
          <div className="deliverables-grid">
            {deliverables.map((d, i) => (
              <AnimSection key={i} delay={i * 60} className="deliverable-cell">
                <div className="deliverable-icon">{d.icon}</div>
                <div className="deliverable-title">{d.title}</div>
                <div className="deliverable-desc">{d.desc}</div>
              </AnimSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── TECH STACK ── */}
      <div className="alt-section">
        <div className="section" style={{ padding: "0 48px" }}>
          <AnimSection>
            <div className="section-label">Tools & Technology</div>
            <h2 className="section-title">
              Built on the Right<br />
              <span>Stack for You.</span>
            </h2>
            <p className="section-body">
              We work across the modern data stack and recommend the right
              combination of tools for your data volume, team size, and
              long-term roadmap.
            </p>
          </AnimSection>
          <div className="tech-grid">
            {techStack.map((t, i) => (
              <AnimSection key={i} delay={i * 60}>
                <div className="tech-card">
                  <div className="tech-name">{t.name}</div>
                  <div className="tech-desc">{t.desc}</div>
                </div>
              </AnimSection>
            ))}
          </div>
        </div>
      </div>

      {/* ── METHODOLOGY ── */}
      <section>
        <div className="section">
          <AnimSection>
            <div className="section-label">How It Works</div>
            <h2 className="section-title">
              From Scattered Sources<br />
              <span>To Trusted Infrastructure</span>
            </h2>
            <p className="section-body">
              A structured four-step process that maps, connects, and
              automates your entire data flow — with no disruption to
              your existing operations.
            </p>
          </AnimSection>
          <div className="steps">
            {[
              {
                n: "01",
                title: "Data Source Audit & Architecture Design",
                desc: "We map every system generating data in your business — CRM, ERP, accounting, payment processors, marketing platforms — and document what exists, what's usable, and what needs to be connected. We then design the target architecture: where data lands, how it's structured, and how it flows.",
              },
              {
                n: "02",
                title: "Pipeline Build & Source Connections",
                desc: "We build and configure the extraction and loading layer — connecting each source system to your data warehouse using the appropriate tooling. Each connector is tested, documented, and configured with the refresh schedule your reporting cadence requires.",
              },
              {
                n: "03",
                title: "Transformation, Modeling & Quality Rules",
                desc: "Raw data is rarely analysis-ready. We build the transformation layer that cleans, normalizes, joins, and models your data into well-structured tables. Business rules are encoded here so the same logic applies consistently everywhere — no more conflicting numbers across reports.",
              },
              {
                n: "04",
                title: "Monitoring, Handover & Ongoing Maintenance",
                desc: "Every pipeline is instrumented with monitoring and alerting so failures are caught immediately — not discovered when a report looks wrong. We provide full documentation and, on ongoing engagements, maintain the infrastructure as your source systems and data needs evolve.",
              },
            ].map((step, i) => (
              <AnimSection key={i} delay={i * 80}>
                <div className="step">
                  <div className="step-number">{step.n}</div>
                  <div>
                    <div className="step-title">{step.title}</div>
                    <div className="step-desc">{step.desc}</div>
                  </div>
                </div>
              </AnimSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOR WHO ── */}
      <div className="alt-section">
        <div className="section" style={{ padding: "0 48px" }}>
          <AnimSection>
            <div className="section-label">Ideal For</div>
            <h2 className="section-title">
              Is This <span>Right For You?</span>
            </h2>
            <p className="section-body">
              Data Pipeline Architecture is for organizations that are
              serious about making their data reliable — and keeping it
              that way as they scale.
            </p>
          </AnimSection>
          <div className="for-who-grid">
            {forWho.map((item, i) => (
              <AnimSection key={i} delay={i * 80}>
                <div className="for-who-card">
                  <CheckCircle size={18} color="#c9a84c" style={{ flexShrink: 0, marginTop: 2 }} />
                  <div>
                    <div className="for-who-label">{item.label}</div>
                    <div className="for-who-desc">{item.desc}</div>
                  </div>
                </div>
              </AnimSection>
            ))}
          </div>
        </div>
      </div>

      {/* ── CTA ── */}
      <section className="cta-section">
        <div className="cta-glow" />
        <AnimSection>
          <div className="section-label" style={{ justifyContent: "center" }}>Get Started</div>
          <h2 className="cta-title">
            Ready to Build the Foundation<br />
            <span>Your Analytics Deserve?</span>
          </h2>
          <p className="cta-sub">
            Start with a free discovery call. We'll map your current data
            landscape and show you exactly what a reliable pipeline
            architecture would look like for your business.
          </p>
          <button className="btn-primary" onClick={() => window.location.href = "/#contact"}>
            Book Your Free Discovery Call <ArrowRight size={16} />
          </button>
        </AnimSection>
      </section>

      {/* ── FOOTER ── */}
      <footer className="footer">
        <div className="footer-inner">
          <span>© {new Date().getFullYear()} True Orbit Analytics. All rights reserved.</span>
          <span style={{ color: "#7a5f2a" }}>Accelerate With Analytics</span>
        </div>
      </footer>
    </>
  );
}
        
