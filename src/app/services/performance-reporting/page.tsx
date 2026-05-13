"use client";

import DeliverablesSection from "@/components/PerformanceReportingDeliverablesSection";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FileText, BarChart2, Calendar, Users, Clock,
  CheckCircle, ArrowRight, Layers, Bell, Filter,
  TrendingUp, Shield, Menu, X, Zap
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
    icon: <BarChart2 size={22} />,
    title: "Executive Dashboard Reports",
    desc: "High-level performance summaries formatted for leadership consumption — clear, visual, and opinionated. Decision-ready in under five minutes of reading time.",
  },
  {
    icon: <Layers size={22} />,
    title: "Board-Level Presentation Packs",
    desc: "Professionally structured decks that translate operational metrics into strategic narrative. The story your board needs to hear, backed by the numbers that prove it.",
  },
  {
    icon: <Calendar size={22} />,
    title: "Cadenced Delivery — Your Schedule",
    desc: "Weekly, monthly, or quarterly — reports arrive on your chosen cadence without you chasing them. Automated delivery pipelines with zero manual effort on your end.",
  },
  {
    icon: <Filter size={22} />,
    title: "KPI Variance & Trend Analysis",
    desc: "Every report includes a variance breakdown against prior period and target, with trend commentary that explains what moved, why it moved, and what it means.",
  },
  {
    icon: <Bell size={22} />,
    title: "Exception & Alert Reporting",
    desc: "Out-of-threshold metrics are flagged automatically so leadership attention goes to the signals that require action — not the noise that doesn't.",
  },
  {
    icon: <Users size={22} />,
    title: "Department & Segment Cuts",
    desc: "Roll-up and drill-down views across business units, product lines, or geographies. The right level of detail for every audience — from the board to the team lead.",
  },
];

const problems = [
  "Executives spending hours in spreadsheets every reporting cycle instead of acting on the data",
  "Board meetings where numbers are presented without context, narrative, or clear takeaways",
  "Reports that arrive late, inconsistently, or formatted differently every time",
  "Leadership making decisions in the gap between reporting cycles without reliable data",
  "No standardized view of performance — every department tells a different story",
  "Investor or lender reporting that's reactive, rushed, and confidence-eroding",
];

const cadences = [
  {
    label: "Weekly",
    icon: <Zap size={20} />,
    desc: "Operational pulse reports for teams and managers. Fast, focused, and formatted for immediate action.",
    items: ["Sales pipeline movement", "Operational throughput", "Week-over-week KPI delta", "Exception flags"],
  },
  {
    label: "Monthly",
    icon: <BarChart2 size={20} />,
    desc: "Strategic performance review for senior leadership. Full-picture analysis with trend and variance commentary.",
    items: ["P&L and margin review", "Departmental performance", "Target vs. actuals", "Rolling forecast update"],
  },
  {
    label: "Quarterly",
    icon: <Layers size={20} />,
    desc: "Board-ready narrative packages. Structured for governance, investor, and lender audiences.",
    items: ["Board pack production", "Investor-grade summaries", "Quarterly business review", "Strategic KPI assessment"],
  },
];

const forWho = [
  { label: "Leadership teams", desc: "Who need reliable performance visibility without spending hours building it themselves" },
  { label: "Board-governed organizations", desc: "Where governance, transparency, and professional presentation are non-negotiable" },
  { label: "Investor-backed companies", desc: "That owe regular, credible reporting to shareholders, lenders, or fund managers" },
  { label: "Multi-department businesses", desc: "Needing standardized reporting across divisions with consistent methodology and format" },
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

export default function PerformanceReportingPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeCadence, setActiveCadence] = useState(0);

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
          display: flex; align-items: center;
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

        /* ── Mobile menu ── */
        .mobile-menu {
          display: none; position: fixed; inset: 0;
          background: ${C.bg}; z-index: 99;
          flex-direction: column;
          align-items: center; justify-content: center; gap: 32px;
        }
        .mobile-menu.open { display: flex; }
        .mobile-menu a {
          font-size: 1.5rem;
          font-family: 'Cormorant Garamond', serif;
          color: ${C.text}; text-decoration: none; cursor: pointer;
          transition: color 0.2s;
        }
        .mobile-menu a:hover { color: ${C.gold}; }

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
          top: 50%; left: 50%; transform: translate(-50%,-50%);
          pointer-events: none;
        }
        /* Unique hero element: stacked document lines that animate in */
        .hero-doc {
          position: absolute;
          right: 8%; top: 50%; transform: translateY(-50%);
          display: flex; flex-direction: column; gap: 10px;
          opacity: 0.18; pointer-events: none;
        }
        .hero-doc-line {
          height: 2px; background: linear-gradient(90deg, transparent, ${C.gold}, transparent);
          border-radius: 1px; animation: doc-slide 3s ease-in-out infinite;
        }
        .hero-doc-line:nth-child(1) { width: 180px; animation-delay: 0s; }
        .hero-doc-line:nth-child(2) { width: 140px; animation-delay: 0.3s; }
        .hero-doc-line:nth-child(3) { width: 160px; animation-delay: 0.6s; }
        .hero-doc-line:nth-child(4) { width: 100px; animation-delay: 0.9s; }
        .hero-doc-line:nth-child(5) { width: 170px; animation-delay: 1.2s; }
        .hero-doc-line:nth-child(6) { width: 120px; animation-delay: 1.5s; }
        .hero-doc-line:nth-child(7) { width: 150px; animation-delay: 1.8s; }
        .hero-doc-line:nth-child(8) { width: 80px;  animation-delay: 2.1s; }
        @keyframes doc-slide {
          0%, 100% { opacity: 0.5; transform: scaleX(0.92); }
          50%       { opacity: 1;   transform: scaleX(1); }
        }

        .hero-doc-left {
          position: absolute;
          left: 6%; top: 50%; transform: translateY(-50%);
          display: flex; flex-direction: column; gap: 10px;
          opacity: 0.11; pointer-events: none;
        }
        .hero-doc-left .hero-doc-line { animation-direction: reverse; }

        .breadcrumb {
          font-size: 11px; font-weight: 600;
          letter-spacing: 0.2em; text-transform: uppercase;
          color: ${C.dim}; margin-bottom: 24px;
          display: flex; align-items: center; gap: 8px;
          position: relative;
        }
        .breadcrumb a { color: ${C.dim}; text-decoration: none; transition: color 0.2s; }
        .breadcrumb a:hover { color: ${C.gold}; }
        .breadcrumb span { color: ${C.goldDim}; }
        .hero-eyebrow {
          font-size: 11px; font-weight: 600;
          letter-spacing: 0.25em; text-transform: uppercase;
          color: ${C.gold}; margin-bottom: 20px;
          display: inline-flex; align-items: center; gap: 12px;
          position: relative; animation: fadeUp 0.7s ease 0.2s both;
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
          animation: fadeUp 0.7s ease 0.4s both;
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
          animation: fadeUp 0.7s ease 0.6s both;
        }
        .hero-actions {
          display: flex; gap: 16px; justify-content: center;
          flex-wrap: wrap; position: relative;
          animation: fadeUp 0.7s ease 0.8s both;
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

        /* ── Shared section ── */
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
          display: grid; grid-template-columns: 1fr 1fr;
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
          background: ${C.bg};
          border: 1px solid ${C.border};
          border-radius: 4px; padding: 48px;
          position: relative; overflow: hidden;
        }
        .solution-card::before {
          content: '';
          position: absolute; top: 0; left: 0; right: 0; height: 2px;
          background: linear-gradient(90deg, ${C.goldDim}, ${C.gold}, ${C.goldDim});
        }
        .solution-number {
          font-family: 'Cormorant Garamond', serif;
          font-size: 6rem; font-weight: 700;
          color: rgba(201,168,76,0.08); line-height: 1;
          margin-bottom: 16px; display: block;
        }
        .solution-headline {
          font-family: 'Cormorant Garamond', serif;
          font-size: 2rem; font-weight: 700;
          color: ${C.text}; margin-bottom: 16px; line-height: 1.2;
        }
        .solution-headline span { color: ${C.gold}; }
        .solution-body {
          font-size: 14px; color: ${C.muted};
          line-height: 1.75; font-weight: 300;
        }

        /* ── Deliverables grid ── */
        .deliverables-grid {
          display: grid; grid-template-columns: repeat(3,1fr);
          gap: 1px; background: ${C.border};
          border: 1px solid ${C.border};
          margin-top: 64px;
        }
        .deliverable-cell {
          background: ${C.surface}; padding: 36px 32px;
          transition: background 0.25s;
          position: relative; overflow: hidden;
        }
        .deliverable-cell::before {
          content: ''; position: absolute; inset: 0;
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

        /* ── Cadence tabs — unique to this page ── */
        .cadence-section {
          background: ${C.surface};
          border-top: 1px solid ${C.border};
          border-bottom: 1px solid ${C.border};
          padding: 100px 0;
        }
        .cadence-tabs {
          display: flex; gap: 0;
          border: 1px solid ${C.border};
          border-radius: 4px; overflow: hidden;
          margin-top: 48px; margin-bottom: 0;
        }
        .cadence-tab {
          flex: 1; padding: 18px 0;
          background: ${C.bg}; border: none;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px; font-weight: 600;
          letter-spacing: 0.1em; text-transform: uppercase;
          color: ${C.dim}; cursor: pointer;
          transition: background 0.2s, color 0.2s;
          border-right: 1px solid ${C.border};
          display: flex; align-items: center;
          justify-content: center; gap: 10px;
        }
        .cadence-tab:last-child { border-right: none; }
        .cadence-tab.active {
          background: rgba(201,168,76,0.08);
          color: ${C.gold};
        }
        .cadence-tab:hover:not(.active) { color: ${C.muted}; }
        .cadence-panel {
          border: 1px solid ${C.border};
          border-top: none; border-radius: 0 0 4px 4px;
          background: ${C.bg}; padding: 48px;
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 48px; align-items: start;
        }
        .cadence-desc {
          font-size: 0.95rem; color: ${C.muted};
          line-height: 1.75; font-weight: 300;
          margin-bottom: 24px;
        }
        .cadence-items {
          list-style: none;
          display: flex; flex-direction: column; gap: 12px;
        }
        .cadence-item {
          display: flex; align-items: center; gap: 12px;
          font-size: 14px; color: ${C.text}; font-weight: 400;
        }
        .cadence-check {
          width: 20px; height: 20px; border-radius: 50%;
          background: rgba(201,168,76,0.1);
          border: 1px solid ${C.goldDim};
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }
        .cadence-visual {
          display: flex; flex-direction: column; gap: 10px;
        }
        .cadence-bar-row {
          display: flex; align-items: center; gap: 12px;
        }
        .cadence-bar-label {
          font-size: 11px; color: ${C.dim}; letter-spacing: 0.06em;
          text-transform: uppercase; width: 72px; flex-shrink: 0;
          text-align: right;
        }
        .cadence-bar-track {
          flex: 1; height: 6px;
          background: ${C.border}; border-radius: 3px;
          overflow: hidden;
        }
        .cadence-bar-fill {
          height: 100%; border-radius: 3px;
          background: linear-gradient(90deg, ${C.goldDim}, ${C.gold});
          transition: width 0.6s ease;
        }

        /* ── Methodology steps ── */
        .methodology-section {
          background: ${C.bg};
          padding: 100px 0;
        }
        .steps {
          display: flex; flex-direction: column; gap: 2px;
          margin-top: 48px;
        }
        .step {
          display: grid; grid-template-columns: 80px 1fr;
          gap: 32px; align-items: start; padding: 32px;
          background: ${C.surface}; border: 1px solid ${C.border};
          transition: border-color 0.2s;
        }
        .step:hover { border-color: ${C.goldDim}; }
        .step-number {
          font-family: 'Cormorant Garamond', serif;
          font-size: 3rem; font-weight: 700;
          color: rgba(201,168,76,0.25); line-height: 1;
          transition: color 0.2s;
        }
        .step:hover .step-number { color: ${C.gold}; }
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
          display: grid; grid-template-columns: repeat(2,1fr);
          gap: 16px; margin-top: 48px;
        }
        .for-who-card {
          border: 1px solid ${C.border}; border-radius: 4px;
          padding: 28px 32px; background: ${C.surface};
          display: flex; gap: 16px; align-items: flex-start;
          transition: border-color 0.2s;
        }
        .for-who-card:hover { border-color: ${C.goldDim}; }
        .for-who-label {
          font-size: 0.95rem; font-weight: 600;
          color: ${C.text}; margin-bottom: 6px;
        }
        .for-who-desc { font-size: 13px; color: ${C.muted}; line-height: 1.6; font-weight: 300; }

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
          gap: 80px; align-items: start;
        }
        .case-tag {
          display: inline-block;
          font-size: 10px; font-weight: 700;
          letter-spacing: 0.2em; text-transform: uppercase;
          color: ${C.bg}; background: ${C.gold};
          padding: 4px 12px; border-radius: 2px; margin-bottom: 24px;
        }
        .case-study-card {
          border: 1px solid ${C.border}; border-radius: 4px;
          padding: 36px; background: ${C.bg};
        }
        .case-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.4rem; font-weight: 700;
          color: ${C.text}; margin-bottom: 16px;
        }
        .case-body {
          font-size: 14px; color: ${C.muted};
          line-height: 1.75; font-weight: 300; margin-bottom: 24px;
        }
        .case-outcome {
          font-size: 14px; color: ${C.gold};
          font-style: italic; line-height: 1.6;
          padding-left: 16px; border-left: 2px solid ${C.goldDim};
        }
        .case-stats { display: flex; flex-direction: column; gap: 24px; }
        .case-stat-item {
          padding: 24px 28px; border: 1px solid ${C.border};
          background: ${C.bg}; border-radius: 4px;
        }
        .case-stat-value {
          font-family: 'Cormorant Garamond', serif;
          font-size: 3rem; font-weight: 700;
          color: ${C.gold}; line-height: 1; margin-bottom: 4px;
        }
        .case-stat-label {
          font-size: 11px; font-weight: 600;
          letter-spacing: 0.15em; text-transform: uppercase; color: ${C.dim};
        }

        /* ── CTA ── */
        .cta-section {
          padding: 120px 48px; text-align: center;
          position: relative; overflow: hidden;
        }
        .cta-glow {
          position: absolute; width: 600px; height: 600px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(201,168,76,0.06) 0%, transparent 70%);
          top: 50%; left: 50%; transform: translate(-50%,-50%);
          pointer-events: none;
        }
        .cta-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2.5rem, 5vw, 4rem);
          font-weight: 700; color: ${C.text};
          margin-bottom: 16px; position: relative; line-height: 1.1;
        }
        .cta-title span { color: ${C.gold}; }
        .cta-sub {
          font-size: 1rem; color: ${C.muted};
          max-width: 480px; margin: 0 auto 48px;
          line-height: 1.75; font-weight: 300; position: relative;
        }

        /* ── Footer ── */
        .footer {
          background: ${C.surface};
          border-top: 1px solid ${C.border};
          padding: 28px 48px;
        }
        .footer-inner {
          max-width: 1200px; margin: 0 auto;
          display: flex; justify-content: space-between; align-items: center;
          font-size: 12px; color: ${C.dim}; letter-spacing: 0.05em;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* ── Responsive ── */
        @media (max-width: 900px) {
          .nav { padding: 0 24px; }
          .nav-links, .nav-cta { display: none; }
          .nav-hamburger { display: block; }
          .hero { padding: 100px 24px 60px; }
          .hero-doc, .hero-doc-left { display: none; }
          .section { padding: 64px 24px; }
          .problem-section { padding: 64px 0; }
          .problem-grid { grid-template-columns: 1fr; gap: 40px; }
          .deliverables-grid { grid-template-columns: 1fr; }
          .cadence-section { padding: 64px 0; }
          .cadence-panel { grid-template-columns: 1fr; gap: 32px; padding: 32px 24px; }
          .methodology-section { padding: 64px 0; }
          .step { grid-template-columns: 60px 1fr; gap: 16px; padding: 24px; }
          .for-who-grid { grid-template-columns: 1fr; }
          .case-study { padding: 64px 0; }
          .case-study-inner { grid-template-columns: 1fr; gap: 40px; padding: 0 24px; }
          .cta-section { padding: 80px 24px; }
          .footer { padding: 24px; }
          .footer-inner { flex-direction: column; gap: 8px; text-align: center; }
        }
        @media (max-width: 600px) {
          .cadence-tabs { flex-direction: column; }
          .cadence-tab { border-right: none; border-bottom: 1px solid ${C.border}; }
          .cadence-tab:last-child { border-bottom: none; }
        }
      `}</style>

      {/* ── NAV ── */}
      <nav className={`nav${scrolled ? " scrolled" : ""}`}>
        <Link href="/">
          <Image
            src="/noBgColor.png"
            alt="True Orbit Analytics"
            width={160} height={44}
            style={{ objectFit: "contain", cursor: "pointer" }}
          />
        </Link>
        <ul className="nav-links">
          {["services","about","portfolio","pricing","contact"].map(id => (
            <li key={id}>
              <Link href={`/#${id}`} style={{ color: C.muted, textDecoration: "none", fontSize: 13, fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase" }}>
                {id.charAt(0).toUpperCase() + id.slice(1)}
              </Link>
            </li>
          ))}
        </ul>
        <button className="nav-cta" onClick={() => window.location.href = "/#contact"}>
          Get Started
        </button>
        <button className="nav-hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          <Menu size={24} />
        </button>
      </nav>

      {/* ── MOBILE MENU ── */}
      <div className={`mobile-menu${menuOpen ? " open" : ""}`}>
        <button
          onClick={() => setMenuOpen(false)}
          style={{ position: "absolute", bottom: 48, left: "50%", transform: "translateX(-50%)", background: "none", border: "none", color: C.gold, cursor: "pointer", padding: 20 }}
        >
          <X size={28} />
        </button>
        {["services","about","portfolio","pricing","contact"].map(id => (
          <a key={id} onClick={() => { window.location.href = `/#${id}`; setMenuOpen(false); }}>
            {id.charAt(0).toUpperCase() + id.slice(1)}
          </a>
        ))}
      </div>

      {/* ── HERO ── */}
      <section className="hero">
        <div className="hero-grid" />
        <div className="hero-glow" />
        {/* Decorative document-line motifs */}
        <div className="hero-doc">
          {[1,2,3,4,5,6,7,8].map(i => <div key={i} className="hero-doc-line" />)}
        </div>
        <div className="hero-doc-left">
          {[1,2,3,4,5,6,7,8].map(i => <div key={i} className="hero-doc-line" />)}
        </div>

        <div className="breadcrumb">
          <a href="/">Home</a>
          <span>›</span>
          <a href="/#services">Services</a>
          <span>›</span>
          <span style={{ color: C.muted }}>Performance Reporting</span>
        </div>
        <p className="hero-eyebrow">Performance Reporting</p>
        <h1 className="hero-title">
          The Right Numbers.<br />
          <span>Every Time. On Time.</span>
        </h1>
        <p className="hero-sub">
          Scheduled reporting suites delivered on your cadence — weekly, monthly,
          quarterly — formatted for leadership and board-level review. No chasing,
          no formatting, no guesswork. Just clarity when it matters.
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
                Reporting Shouldn't<br />
                <span>Cost You a Week.</span>
              </h2>
              <p className="section-body">
                For most businesses, generating a reporting cycle means days
                of manual spreadsheet work, inconsistent formats, and a final
                product that barely tells the story the data actually contains.
                Leadership time is too valuable for that.
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
                <span className="solution-number">05</span>
                <div className="solution-headline">
                  Intelligence delivered.<br />
                  <span>Automatically.</span>
                </div>
                <p className="solution-body">
                  Performance Reporting replaces your manual reporting cycle
                  with a structured, automated delivery system. Every report
                  is formatted for its audience — operational detail for
                  managers, strategic narrative for leadership, governance
                  clarity for the board.
                  <br /><br />
                  You stop building reports. You start reading them — and
                  acting on them.
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
              A complete reporting infrastructure — built once, delivered
              continuously, formatted for every audience that needs it.
            </p>
          </AnimSection>

          <DeliverablesSection />
        </div>
      </section>

      {/* ── CADENCE TABS ── */}
      <section className="cadence-section">
        <div className="section" style={{ padding: "0 48px" }}>
          <AnimSection>
            <div className="section-label">Reporting Cadence</div>
            <h2 className="section-title">
              Built Around<br />
              <span>Your Schedule</span>
            </h2>
            <p className="section-body">
              Every reporting tier is scoped for a specific audience and
              decision horizon. Select the cadence — or combine all three.
            </p>
          </AnimSection>

          <AnimSection delay={100}>
            <div className="cadence-tabs">
              {cadences.map((c, i) => (
                <button
                  key={i}
                  className={`cadence-tab${activeCadence === i ? " active" : ""}`}
                  onClick={() => setActiveCadence(i)}
                >
                  {c.icon}
                  {c.label}
                </button>
              ))}
            </div>
            <div className="cadence-panel">
              <div>
                <p className="cadence-desc">{cadences[activeCadence].desc}</p>
                <ul className="cadence-items">
                  {cadences[activeCadence].items.map((item, i) => (
                    <li key={i} className="cadence-item">
                      <div className="cadence-check">
                        <CheckCircle size={11} color={C.gold} />
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="cadence-visual">
                {[
                  { label: "Clarity", pct: activeCadence === 0 ? "75%" : activeCadence === 1 ? "88%" : "100%" },
                  { label: "Depth", pct: activeCadence === 0 ? "55%" : activeCadence === 1 ? "78%" : "95%" },
                  { label: "Audience", pct: activeCadence === 0 ? "60%" : activeCadence === 1 ? "82%" : "100%" },
                  { label: "Narrative", pct: activeCadence === 0 ? "40%" : activeCadence === 1 ? "70%" : "92%" },
                ].map((bar, i) => (
                  <div key={i} className="cadence-bar-row">
                    <div className="cadence-bar-label">{bar.label}</div>
                    <div className="cadence-bar-track">
                      <div className="cadence-bar-fill" style={{ width: bar.pct }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </AnimSection>
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
              From audit to automated delivery — a structured four-step
              process that gets your reporting infrastructure built and
              running without disrupting your operations.
            </p>
          </AnimSection>

          <div className="steps">
            {[
              {
                n: "01",
                title: "Reporting Audit & Stakeholder Mapping",
                desc: "We start by understanding who needs what information, at what frequency, and in what format. Every audience — board, leadership, department heads — has different requirements. We map them all before touching a single data source.",
              },
              {
                n: "02",
                title: "KPI Definition & Metric Architecture",
                desc: "We work with you to define the metrics that will anchor each reporting tier. This isn't a list of every number you track — it's a deliberate selection of the indicators that actually drive decisions at each level of the organization.",
              },
              {
                n: "03",
                title: "Data Connection & Automated Pipeline",
                desc: "We connect your data sources into a structured pipeline that feeds each report automatically. No manual exports, no copy-paste, no version control issues. When the cycle runs, the data is already there.",
              },
              {
                n: "04",
                title: "Template Build, Delivery & Ongoing Iteration",
                desc: "Each report template is built to your brand standards and stakeholder preferences. Delivery is automated on your chosen cadence. We review and iterate quarterly to ensure format and content stay aligned with how your business evolves.",
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
              Performance Reporting delivers the most value to organizations
              where leadership time is expensive and reporting consistency is
              non-negotiable.
            </p>
          </AnimSection>

          <div className="for-who-grid">
            {forWho.map((item, i) => (
              <AnimSection key={i} delay={i * 80}>
                <div className="for-who-card">
                  <CheckCircle size={18} color={C.gold} style={{ flexShrink: 0, marginTop: 2 }} />
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
              Reporting That<br />
              <span>Drives Real Decisions</span>
            </h2>
            <p className="section-body" style={{ marginBottom: 32 }}>
              Our reporting methodology has been developed and refined against
              real investment and operational data — not simulated environments.
              The discipline we bring to our own reporting is the same we bring
              to yours.
            </p>
            <div className="case-study-card">
              <span className="case-tag">Case Study</span>
              <div className="case-title">Roth IRA Growth & Portfolio Reporting Dashboard</div>
              <p className="case-body">
                Built a structured monthly reporting dashboard to track
                contribution efficiency, allocation drift, and compounding
                trajectory across a live retirement account. Automated variance
                reporting against target allocation with clear exception flags
                when rebalancing thresholds were breached.
              </p>
              <p className="case-outcome">
                Identified rebalancing opportunities and improved projected
                retirement value by a measurable margin — through disciplined
                reporting cadence, not guesswork.
              </p>
            </div>
          </AnimSection>

          <AnimSection delay={200}>
            <div className="case-stats">
              {[
                { value: "3+", label: "BI Platforms Supported" },
                { value: "W/M/Q", label: "All Cadences Available" },
                { value: "0hrs", label: "Manual Effort Per Cycle Once Built" },
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
          <div className="section-label" style={{ justifyContent: "center" }}>Get Started</div>
          <h2 className="cta-title">
            Stop Building Reports.<br />
            <span>Start Reading Them.</span>
          </h2>
          <p className="cta-sub">
            Start with a free discovery call. We'll assess your current
            reporting landscape and show you exactly what a structured,
            automated system would look like for your organization.
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
          <span style={{ color: C.goldDim }}>Accelerate With Analytics</span>
        </div>
      </footer>
    </>
  );
}

      
