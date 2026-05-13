"use client";

import FinancialDeliverablesSection from "@/components/FinancialDeliverablesSectionWithModals";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  TrendingUp, BarChart2, PieChart, AlertTriangle,
  CheckCircle, ArrowRight, ChevronDown, Menu, X,
  DollarSign, Target, Shield, Zap
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
    icon: <BarChart2 size={24} />,
    title: "Revenue & Margin Analysis",
    desc: "Detailed breakdown of revenue streams, gross margins, and contribution margins by product, service line, or customer segment.",
  },
  {
    icon: <TrendingUp size={24} />,
    title: "Cash Flow Forecasting",
    desc: "Rolling 13-week and 12-month cash flow models that show exactly where your money is going and when pressure points will occur.",
  },
  {
    icon: <PieChart size={24} />,
    title: "Expense Intelligence",
    desc: "Categorized expense analysis with variance reporting against budget, identifying waste and optimization opportunities.",
  },
  {
    icon: <AlertTriangle size={24} />,
    title: "Risk Flag Reports",
    desc: "Automated alerts when key financial ratios move outside acceptable thresholds — before small problems become large ones.",
  },
  {
    icon: <Target size={24} />,
    title: "KPI Dashboard",
    desc: "A live, always-current financial dashboard tracking your most critical metrics, delivered on your preferred BI platform.",
  },
  {
    icon: <Shield size={24} />,
    title: "Scenario Modeling",
    desc: "Best case, base case, and worst case financial models so you can make decisions with full awareness of downside risk.",
  },
];

const problems = [
  "Making pricing decisions based on gut feeling rather than margin data",
  "Discovering cash flow problems only when they become emergencies",
  "Unable to identify which products or clients are actually profitable",
  "Spending hours in spreadsheets instead of running your business",
  "No early warning system when financial trends turn negative",
  "Presenting financials to investors or lenders without confidence",
];

const forWho = [
  { label: "Small to mid-size businesses", desc: "Revenue $500K–$10M looking to professionalize their financial operations" },
  { label: "Growth-stage companies", desc: "Scaling fast and needing financial visibility to make smart decisions" },
  { label: "Owner-operators", desc: "Who want institutional-grade financial intelligence without hiring a CFO" },
  { label: "Investment-ready businesses", desc: "Preparing for fundraising, acquisition, or partnership discussions" },
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
export default function FinancialAnalyticsPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

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
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 100;
          padding: 0 48px;
          height: 72px;
          display: flex;
          align-items: center;
          justify-content: space-between;
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
          text-align: center;
          padding: 120px 48px 80px;
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

        /* ── Problem section ── */
        .problem-section {
          background: ${C.surface};
          border-top: 1px solid ${C.border};
          border-bottom: 1px solid ${C.border};
          padding: 100px 0;
        }
        .problem-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 64px; align-items: center;
        }
        .problem-list {
          list-style: none;
          display: flex; flex-direction: column; gap: 16px;
          margin-top: 32px;
        }
        .problem-item {
          display: flex; gap: 14px; align-items: flex-start;
          padding: 16px 20px;
          border: 1px solid ${C.border};
          border-radius: 4px;
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
          background: ${C.bg};
          border: 1px solid ${C.border};
          border-radius: 4px; padding: 48px;
          position: relative; overflow: hidden;
        }
        .solution-card::before {
          content: '';
          position: absolute; top: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, ${C.goldDim}, ${C.gold}, ${C.goldDim});
        }
        .solution-number {
          font-family: 'Cormorant Garamond', serif;
          font-size: 6rem; font-weight: 700;
          color: rgba(201,168,76,0.08);
          line-height: 1; margin-bottom: 16px;
          display: block;
        }
        .solution-headline {
          font-family: 'Cormorant Garamond', serif;
          font-size: 2rem; font-weight: 700;
          color: ${C.text}; margin-bottom: 16px;
          line-height: 1.2;
        }
        .solution-headline span { color: ${C.gold}; }
        .solution-body {
          font-size: 14px; color: ${C.muted};
          line-height: 1.75; font-weight: 300;
        }

        /* ── Deliverables grid ── */
        .deliverables-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1px; background: ${C.border};
          border: 1px solid ${C.border};
          margin-top: 64px;
        }
        .deliverable-cell {
          background: ${C.surface};
          padding: 36px 32px;
          transition: background 0.25s;
          position: relative; overflow: hidden;
        }
        .deliverable-cell::before {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(135deg, rgba(201,168,76,0.04), transparent);
          opacity: 0; transition: opacity 0.3s;
        }
        .deliverable-cell:hover::before { opacity: 1; }
        .deliverable-icon {
          width: 48px; height: 48px;
          border: 1px solid ${C.border}; border-radius: 8px;
          display: flex; align-items: center; justify-content: center;
          color: ${C.gold}; margin-bottom: 20px;
          transition: border-color 0.2s, background 0.2s;
        }
        .deliverable-cell:hover .deliverable-icon {
          border-color: ${C.goldDim};
          background: rgba(201,168,76,0.06);
        }
        .deliverable-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.2rem; font-weight: 600;
          color: ${C.text}; margin-bottom: 10px;
        }
        .deliverable-desc {
          font-size: 13px; color: ${C.muted};
          line-height: 1.7; font-weight: 300;
        }

        /* ── Methodology ── */
        .methodology-section {
          background: ${C.surface};
          border-top: 1px solid ${C.border};
          border-bottom: 1px solid ${C.border};
          padding: 100px 0;
        }
        .steps {
          display: flex; flex-direction: column; gap: 2px;
          margin-top: 48px;
        }
        .step {
          display: grid;
          grid-template-columns: 80px 1fr;
          gap: 32px; align-items: start;
          padding: 32px;
          background: ${C.bg};
          border: 1px solid ${C.border};
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
          font-size: 1.3rem; font-weight: 600;
          color: ${C.text}; margin-bottom: 8px;
        }
        .step-desc {
          font-size: 14px; color: ${C.muted};
          line-height: 1.7; font-weight: 300;
        }

        /* ── For who ── */
        .for-who-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px; margin-top: 48px;
        }
        .for-who-card {
          padding: 28px 32px;
          border: 1px solid ${C.border};
          background: ${C.surface}; border-radius: 4px;
          transition: border-color 0.2s;
          display: flex; gap: 16px; align-items: flex-start;
        }
        .for-who-card:hover { border-color: ${C.goldDim}; }
        .for-who-check {
          color: ${C.gold}; flex-shrink: 0; margin-top: 2px;
        }
        .for-who-label {
          font-size: 14px; font-weight: 600;
          color: ${C.text}; margin-bottom: 4px;
          letter-spacing: 0.02em;
        }
        .for-who-desc {
          font-size: 13px; color: ${C.muted};
          line-height: 1.6; font-weight: 300;
        }

        /* ── Case study ── */
        .case-study {
          background: ${C.surface};
          border-top: 1px solid ${C.border};
          border-bottom: 1px solid ${C.border};
          padding: 100px 0;
        }
        .case-study-inner {
          max-width: 1200px; margin: 0 auto; padding: 0 48px;
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 80px; align-items: center;
        }
        .case-study-card {
          background: ${C.bg};
          border: 1px solid ${C.border};
          border-radius: 4px; padding: 48px;
          position: relative; overflow: hidden;
        }
        .case-study-card::before {
          content: '';
          position: absolute; top: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, ${C.goldDim}, ${C.gold}, ${C.goldDim});
        }
        .case-tag {
          display: inline-block;
          font-size: 10px; font-weight: 700;
          letter-spacing: 0.2em; text-transform: uppercase;
          color: ${C.gold};
          background: rgba(201,168,76,0.08);
          border: 1px solid rgba(201,168,76,0.2);
          padding: 4px 12px; border-radius: 2px;
          margin-bottom: 20px;
        }
        .case-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.5rem; font-weight: 700;
          color: ${C.text}; margin-bottom: 16px;
        }
        .case-body {
          font-size: 14px; color: ${C.muted};
          line-height: 1.75; font-weight: 300;
          margin-bottom: 24px;
        }
        .case-outcome {
          font-size: 14px; color: ${C.gold};
          font-style: italic; line-height: 1.6;
          padding-left: 16px;
          border-left: 2px solid ${C.goldDim};
        }
        .case-stats {
          display: flex; flex-direction: column; gap: 24px;
        }
        .case-stat-item {
          padding: 24px 28px;
          border: 1px solid ${C.border};
          background: ${C.bg}; border-radius: 4px;
        }
        .case-stat-value {
          font-family: 'Cormorant Garamond', serif;
          font-size: 3rem; font-weight: 700;
          color: ${C.gold}; line-height: 1;
          margin-bottom: 4px;
        }
        .case-stat-label {
          font-size: 11px; font-weight: 600;
          letter-spacing: 0.15em; text-transform: uppercase;
          color: ${C.dim};
        }

        /* ── CTA ── */
        .cta-section {
          padding: 120px 48px;
          text-align: center;
          position: relative; overflow: hidden;
        }
        .cta-glow {
          position: absolute; width: 600px; height: 600px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(201,168,76,0.06) 0%, transparent 70%);
          top: 50%; left: 50%; transform: translate(-50%, -50%);
          pointer-events: none;
        }
        .cta-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2.5rem, 5vw, 4rem);
          font-weight: 700; color: ${C.text};
          margin-bottom: 16px; position: relative;
          line-height: 1.1;
        }
        .cta-title span { color: ${C.gold}; }
        .cta-sub {
          font-size: 1rem; color: ${C.muted};
          max-width: 480px; margin: 0 auto 48px;
          line-height: 1.75; font-weight: 300;
          position: relative;
        }

        /* ── Mobile ── */
        .mobile-menu {
          display: none;
        }
        @media (max-width: 900px) {
          .nav { padding: 0 24px; }
          .nav-links, .nav-cta { display: none; }
          .nav-hamburger { display: block; }
          .mobile-menu {
            display: flex;
            position: fixed; inset: 0;
            background: ${C.bg}; z-index: 99;
            flex-direction: column;
            align-items: center; justify-content: center; gap: 32px;
          }
          .mobile-menu a {
            font-size: 1.5rem;
            font-family: 'Cormorant Garamond', serif;
            color: ${C.text}; text-decoration: none; cursor: pointer;
          }
          .section { padding: 64px 24px; }
          .hero { padding: 100px 24px 60px; }
          .problem-grid { grid-template-columns: 1fr; gap: 40px; }
          .deliverables-grid { grid-template-columns: 1fr; }
          .for-who-grid { grid-template-columns: 1fr; }
          .case-study-inner { grid-template-columns: 1fr; gap: 40px; }
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

      {/* ── MOBILE MENU ── */}
      {menuOpen && (
        <div className="mobile-menu">
          <button
            onClick={() => setMenuOpen(false)}
            style={{
              position: "absolute", bottom: 48, left: "50%",
              transform: "translateX(-50%)",
              background: "none", border: "none",
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
          <span>Financial Analytics</span>
        </div>

        <p className="hero-eyebrow">Service</p>
        <h1 className="hero-title">
          Your Finances<br />
          <span>Decoded.</span>
        </h1>
        <p className="hero-sub">
          Most businesses have all the financial data they need to make
          brilliant decisions. They just can't read it. We fix that.
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
      <div className="problem-section">
        <div className="section" style={{ padding: "0 48px" }}>
          <div className="problem-grid">
            <AnimSection>
              <div className="section-label">The Problem</div>
              <h2 className="section-title">
                Flying Blind<br />
                <span>Is Expensive.</span>
              </h2>
              <p className="section-body">
                Most growing businesses are making six and seven-figure decisions
                based on incomplete, delayed, or misunderstood financial data.
                The cost of that isn't always visible — until it is.
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
                  Financial clarity<br />
                  <span>changes everything.</span>
                </div>
                <p className="solution-body">
                  When you can see exactly where your money is coming from,
                  where it's going, and what's about to happen — every decision
                  gets easier. Pricing, hiring, investment, expansion. All of it.
                  <br /><br />
                  True Orbit Analytics takes your raw financial data and turns
                  it into a living, breathing intelligence system that tells you
                  what to do next — and what to avoid.
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
              These aren't reports for the sake of reports. Every deliverable
              is designed to drive a specific decision.
            </p>
          </AnimSection>

          <FinancialDeliverablesSection />
        </div>
      </section>

      {/* ── METHODOLOGY ── */}
      <div className="methodology-section">
        <div className="section" style={{ padding: "0 48px" }}>
          <AnimSection>
            <div className="section-label">How It Works</div>
            <h2 className="section-title">
              Our <span>Methodology</span>
            </h2>
            <p className="section-body">
              A structured process that moves from data chaos to decision
              clarity in four steps.
            </p>
          </AnimSection>

          <div className="steps">
            {[
              {
                n: "01",
                title: "Discovery & Data Audit",
                desc: "We start by understanding your business model, financial goals, and current data landscape. We identify every source of financial data — accounting software, bank feeds, payment processors, payroll — and assess what's usable.",
              },
              {
                n: "02",
                title: "Data Architecture & Connection",
                desc: "We connect your data sources into a unified pipeline, clean and normalize the data, and establish the logical structure for your financial intelligence system. No more manual exports or copy-paste reporting.",
              },
              {
                n: "03",
                title: "Dashboard Build & KPI Definition",
                desc: "Working with you to define the metrics that actually matter for your business, we build your financial dashboard. Every chart, every number, every alert is there for a reason.",
              },
              {
                n: "04",
                title: "Ongoing Reporting & Strategic Review",
                desc: "On your chosen cadence — weekly, monthly, or quarterly — we deliver updated reports and a strategic review session where we walk through the numbers and their implications for your next decisions.",
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
      </div>

      {/* ── FOR WHO ── */}
      <section>
        <div className="section">
          <AnimSection>
            <div className="section-label">Ideal For</div>
            <h2 className="section-title">
              Is This <span>Right For You?</span>
            </h2>
            <p className="section-body">
              Financial Analytics is built for businesses that are serious about
              using data to drive growth — not just to satisfy compliance.
            </p>
          </AnimSection>

          <div className="for-who-grid">
            {forWho.map((item, i) => (
              <AnimSection key={i} delay={i * 80}>
                <div className="for-who-card">
                  <CheckCircle size={18} className="for-who-check" color="#c9a84c" />
                  <div>
                    <div className="for-who-label">{item.label}</div>
                    <div className="for-who-desc">{item.desc}</div>
                  </div>
                </div>
              </AnimSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── CASE STUDY ── */}
      <div className="case-study">
        <div className="case-study-inner">
          <AnimSection>
            <div className="section-label">Proven In Practice</div>
            <h2 className="section-title">
              Results That<br />
              <span>Speak For Themselves</span>
            </h2>
            <p className="section-body" style={{ marginBottom: 32 }}>
              Our financial analytics methodology has been applied and validated
              across real investment portfolios — with measurable results over
              a sustained multi-year period.
            </p>
            <div className="case-study-card">
              <span className="case-tag">Case Study</span>
              <div className="case-title">Investment Portfolio Optimization</div>
              <p className="case-body">
                Applied multi-factor quantitative analysis across a diversified
                portfolio spanning equities, ETFs, and retirement accounts.
                Identified allocation inefficiencies and rebalanced positions
                using data-driven decision frameworks rather than advisory
                intuition.
              </p>
              <p className="case-outcome">
                Consistent outperformance vs. standard advisory benchmarks
                sustained over a 5+ year period — the same methodology we
                bring to your business finances.
              </p>
            </div>
          </AnimSection>

          <AnimSection delay={200}>
            <div className="case-stats">
              {[
                { value: "5+", label: "Years of Applied Experience" },
                { value: "100%", label: "Data-Driven Decision Framework" },
                { value: "3+", label: "BI Platforms Supported" },
              ].map((stat, i) => (
                <div key={i} className="case-stat-item">
                  <div className="case-stat-value">{stat.value}</div>
                  <div className="case-stat-label">{stat.label}</div>
                </div>
              ))}
            </div>
          </AnimSection>
        </div>
      </div>

      {/* ── CTA ── */}
      <section className="cta-section">
        <div className="cta-glow" />
        <AnimSection>
          <div className="section-label" style={{ justifyContent: "center" }}>
            Get Started
          </div>
          <h2 className="cta-title">
            Ready to See What<br />
            <span>Your Data Is Saying?</span>
          </h2>
          <p className="cta-sub">
            Start with a free discovery call. We'll assess your current
            financial data landscape and show you exactly what's possible.
            No obligation, no fluff.
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
