"use client";

import DeliverablesSection from "@/components/DeliverablesSectionWithModals";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  BarChart2, TrendingUp, Database, PieChart, LineChart,
  FileSpreadsheet, ArrowRight, Check, CheckCircle,
  Monitor, Layers, Zap, Eye, RefreshCw, Users
} from "lucide-react";
import { Menu, X } from "lucide-react";

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
    icon: <Monitor size={24} />,
    title: "Executive Dashboard",
    desc: "A single-screen command center showing your most critical business metrics in real time. Designed for decision-makers, not data scientists.",
  },
  {
    icon: <Layers size={24} />,
    title: "Departmental Views",
    desc: "Separate dashboards tailored to each function — sales, operations, finance, marketing — each showing only what's relevant to that team.",
  },
  {
    icon: <RefreshCw size={24} />,
    title: "Automated Data Refresh",
    desc: "Your dashboards update automatically on a schedule you define. No manual exports, no stale data, no weekend spreadsheet sessions.",
  },
  {
    icon: <Eye size={24} />,
    title: "Trend & Anomaly Detection",
    desc: "Visual trend lines and anomaly flags that surface unusual patterns before they become problems — or before you miss an opportunity.",
  },
  {
    icon: <Zap size={24} />,
    title: "KPI Scorecards",
    desc: "Color-coded performance scorecards that show at a glance whether each key metric is on track, at risk, or in the red.",
  },
  {
    icon: <Users size={24} />,
    title: "Multi-User Access",
    desc: "Role-based access control so leadership sees the full picture, managers see their domain, and sensitive data stays protected.",
  },
];

const problems = [
  "Spending hours each week manually compiling reports from multiple systems",
  "Leadership making decisions based on data that is days or weeks old",
  "Different departments using different numbers for the same metric",
  "No visibility into which parts of the business are performing or struggling",
  "Drowning in raw data with no way to extract what actually matters",
  "Expensive BI tools that nobody knows how to use or actually logs into",
];

const platforms = [
  { name: "Power BI", desc: "Microsoft's enterprise BI platform — ideal for businesses already in the Microsoft ecosystem" },
  { name: "Tableau", desc: "Industry-leading visualization for complex, multi-dimensional data analysis" },
  { name: "Looker", desc: "Google's cloud-native BI platform with strong SQL modeling capabilities" },
  { name: "Metabase", desc: "Lightweight, user-friendly option ideal for smaller teams and faster deployment" },
  { name: "Qlik Sense", desc: "Associative analytics engine that lets users explore data freely without predefined queries" },
  { name: "Your Platform", desc: "Already using something else? We work with your existing stack wherever possible" },
];

const forWho = [
  { label: "Data-rich but insight-poor businesses", desc: "You have the data in your systems — you just can't see it clearly" },
  { label: "Multi-location or multi-department operations", desc: "Needing a unified view across distributed teams and locations" },
  { label: "Leadership teams tired of waiting for reports", desc: "Who need answers now, not at the end of the month" },
  { label: "Businesses preparing for scale", desc: "Building the data infrastructure to support rapid growth without chaos" },
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

export default function BusinessIntelligencePage() {
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
        .two-col {
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 64px; align-items: center;
        }
        .problem-list {
          list-style: none;
          display: flex; flex-direction: column; gap: 14px;
          margin-top: 32px;
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

        .platforms-grid {
          display: grid; grid-template-columns: repeat(3, 1fr);
          gap: 16px; margin-top: 48px;
        }
        .platform-card {
          padding: 28px 24px; border: 1px solid ${C.border};
          background: ${C.bg}; border-radius: 4px;
          transition: border-color 0.2s;
        }
        .platform-card:hover { border-color: ${C.goldDim}; }
        .platform-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.2rem; font-weight: 700;
          color: ${C.gold}; margin-bottom: 8px;
        }
        .platform-desc { font-size: 13px; color: ${C.muted}; line-height: 1.6; font-weight: 300; }

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

        .footer {
          border-top: 1px solid ${C.border};
          background: ${C.surface}; padding: 32px 48px;
        }
        .footer-inner {
          max-width: 1200px; margin: 0 auto;
          display: flex; justify-content: space-between;
          align-items: center; font-size: 12px; color: ${C.dim};
        }

        .mobile-menu {
          display: none;
        }

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
          .platforms-grid { grid-template-columns: 1fr; }
          .for-who-grid { grid-template-columns: 1fr; }
          .step { grid-template-columns: 60px 1fr; gap: 16px; }
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
          <span>Business Intelligence</span>
        </div>
        <p className="hero-eyebrow">Service</p>
        <h1 className="hero-title">
          See Your Business<br />
          <span>With Clarity.</span>
        </h1>
        <p className="hero-sub">
          Business Intelligence turns the data already living in your systems
          into a real-time command center that tells you exactly what's
          happening — and what to do about it.
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

      {/* ── PROBLEM ── */}
      <div className="alt-section">
        <div className="section" style={{ padding: "0 48px" }}>
          <div className="two-col">
            <AnimSection>
              <div className="section-label">The Problem</div>
              <h2 className="section-title">
                Your Data Exists.<br />
                <span>Your Visibility Doesn't.</span>
              </h2>
              <p className="section-body">
                Most businesses are generating more data than ever — and
                understanding less of it. The problem isn't the data.
                It's the lack of a system to make it visible and actionable.
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
                <span className="solution-number">01</span>
                <div className="solution-headline">
                  One dashboard.<br />
                  <span>Every answer.</span>
                </div>
                <p className="solution-body">
                  Business Intelligence done right means you never have to
                  wonder how the business is performing. You know. In real
                  time. With the context to act on it.
                  <br /><br />
                  We design, build, and maintain BI environments that pull
                  every relevant data source into a single, coherent picture
                  of your business — accessible to the right people, at the
                  right level of detail, at any time.
                </p>
              </div>
            </AnimSection>
          </div>
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
              A complete BI environment built around your business —
              not a generic template you have to adapt yourself.
            </p>
          </AnimSection>
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
        A complete BI environment built around your business —
        not a generic template you have to adapt yourself.
      </p>
    </AnimSection>
    <DeliverablesSection />
  </div>
</section>

      {/* ── PLATFORMS ── */}
      <div className="alt-section">
        <div className="section" style={{ padding: "0 48px" }}>
          <AnimSection>
            <div className="section-label">Platform Agnostic</div>
            <h2 className="section-title">
              Your Platform.<br />
              <span>Our Expertise.</span>
            </h2>
            <p className="section-body">
              We don't lock you into a single tool. We work across the
              leading BI platforms and recommend the right one for your
              specific needs, team size, and budget.
            </p>
          </AnimSection>
          <div className="platforms-grid">
            {platforms.map((p, i) => (
              <AnimSection key={i} delay={i * 60}>
                <div className="platform-card">
                  <div className="platform-name">{p.name}</div>
                  <div className="platform-desc">{p.desc}</div>
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
              From Data Chaos<br />
              <span>To Command Center</span>
            </h2>
            <p className="section-body">
              A proven four-step process that takes you from scattered
              data to a unified intelligence environment.
            </p>
          </AnimSection>
          <div className="steps">
            {[
              {
                n: "01",
                title: "Requirements & Data Discovery",
                desc: "We start by understanding what decisions you need to make and what data you have available. We audit every data source — CRM, ERP, accounting, marketing, operations — and map what's usable.",
              },
              {
                n: "02",
                title: "Data Modeling & Pipeline Setup",
                desc: "We connect and normalize your data sources, build the logical data model, and establish automated pipelines so your dashboards always have fresh, accurate data without manual intervention.",
              },
              {
                n: "03",
                title: "Dashboard Design & Build",
                desc: "We design and build your BI environment on your preferred platform — executive dashboards, departmental views, KPI scorecards, and automated alerts — all tailored to how your team actually works.",
              },
              {
                n: "04",
                title: "Training, Handover & Ongoing Support",
                desc: "We train your team to use and interpret the dashboards confidently. On ongoing engagements we maintain, update, and evolve the environment as your business grows and your data needs change.",
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
              Business Intelligence is for organizations that are serious
              about replacing guesswork with clarity at every level.
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
            Ready to See Your Business<br />
            <span>As It Really Is?</span>
          </h2>
          <p className="cta-sub">
            Start with a free discovery call. We'll assess your current
            data landscape and show you what a proper BI environment
            would look like for your business.
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
      
