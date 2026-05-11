"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  LineChart, BarChart2, Activity, TrendingUp, AlertOctagon,
  CheckCircle, ArrowRight, Brain, Cpu, Target,
  Layers, Zap, Eye, Menu, X
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
    icon: <TrendingUp size={24} />,
    title: "Demand Forecasting Models",
    desc: "Statistical and ML-driven models that project future demand across products, services, or customer segments — so you plan inventory, staffing, and spend ahead of the curve.",
  },
  {
    icon: <AlertOctagon size={24} />,
    title: "Risk Probability Scoring",
    desc: "Quantified risk scores for clients, suppliers, or market positions. Know the probability of churn, default, or disruption before it becomes a crisis.",
  },
  {
    icon: <Eye size={24} />,
    title: "Opportunity Surface Detection",
    desc: "Pattern recognition across your data that surfaces untapped revenue opportunities, underperforming segments, and timing windows your competitors aren't watching.",
  },
  {
    icon: <Activity size={24} />,
    title: "Anomaly & Trend Alerts",
    desc: "Automated detection of statistical anomalies and emerging trends in your operational data — delivered as real-time alerts before they move the needle in the wrong direction.",
  },
  {
    icon: <Layers size={24} />,
    title: "Scenario Simulation Engine",
    desc: "Monte Carlo and sensitivity models that simulate thousands of futures based on your inputs. Stress-test decisions before committing capital or resources.",
  },
  {
    icon: <Target size={24} />,
    title: "Predictive KPI Dashboards",
    desc: "Forward-looking dashboards that show not just where you are, but where your metrics are headed — giving leadership a 30, 60, and 90-day visibility horizon.",
  },
];

const problems = [
  "Reacting to market shifts after the damage is already done",
  "Setting revenue targets based on historical averages rather than real projections",
  "No early warning when a key client is trending toward churn",
  "Inventory and staffing decisions made on gut feeling rather than forecast data",
  "Losing competitive ground to companies that see trends before they break",
  "Presenting projections to investors or boards without statistical backing",
];

const forWho = [
  { label: "Operations-heavy businesses", desc: "With inventory, logistics, or workforce planning that demands accurate forward visibility" },
  { label: "Revenue-driven growth companies", desc: "That need defensible forecasts for fundraising, board reviews, or strategic planning" },
  { label: "Customer-facing enterprises", desc: "Seeking to predict churn, lifetime value, and next-best-action at scale" },
  { label: "Data-mature organizations", desc: "Ready to move beyond descriptive analytics into models that actively drive decisions" },
];

const models = [
  { label: "Time-Series Forecasting", sub: "ARIMA, Prophet, ETS" },
  { label: "Classification Models", sub: "Churn, risk, segmentation" },
  { label: "Regression Analysis", sub: "Demand, pricing, revenue" },
  { label: "Anomaly Detection", sub: "Statistical & ML-based" },
  { label: "Monte Carlo Simulation", sub: "Scenario & sensitivity" },
  { label: "Clustering & Segmentation", sub: "Customer & operational" },
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

export default function PredictiveModelingPage() {
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

        /* ── Mobile menu ── */
        .mobile-menu {
          display: none;
          position: fixed; inset: 0; z-index: 99;
          background: ${C.bg};
          flex-direction: column; align-items: center; justify-content: center;
          gap: 32px;
        }
        .mobile-menu.open { display: flex; }
        .mobile-menu a {
          font-size: 22px; font-weight: 500;
          letter-spacing: 0.06em; text-transform: uppercase;
          color: ${C.text}; text-decoration: none; cursor: pointer;
          transition: color 0.2s;
        }
        .mobile-menu a:hover { color: ${C.gold}; }

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
          position: absolute; width: 900px; height: 900px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(201,168,76,0.07) 0%, transparent 65%);
          top: 50%; left: 50%; transform: translate(-50%, -50%);
          pointer-events: none;
        }
        /* Animated pulse rings unique to this page */
        .hero-pulse {
          position: absolute;
          border-radius: 50%;
          border: 1px solid rgba(201,168,76,0.12);
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          animation: pulse-expand 4s ease-out infinite;
          pointer-events: none;
        }
        .hero-pulse:nth-child(1) { width: 300px; height: 300px; animation-delay: 0s; }
        .hero-pulse:nth-child(2) { width: 500px; height: 500px; animation-delay: 1.2s; }
        .hero-pulse:nth-child(3) { width: 700px; height: 700px; animation-delay: 2.4s; }
        @keyframes pulse-expand {
          0%   { opacity: 0.6; transform: translate(-50%,-50%) scale(0.92); }
          100% { opacity: 0;   transform: translate(-50%,-50%) scale(1.06); }
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
        .breadcrumb-sep { color: ${C.goldDim}; }

        .hero-eyebrow {
          font-size: 11px; font-weight: 600;
          letter-spacing: 0.25em; text-transform: uppercase;
          color: ${C.gold}; margin-bottom: 20px;
          display: flex; align-items: center; gap: 10px;
          justify-content: center; position: relative;
        }

        .hero-eyebrow::before, .hero-eyebrow::after {
          content: ''; display: block; width: 40px; height: 1px;
          background: ${C.goldDim};
        }
        .hero-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(3rem, 7vw, 5.5rem);
          font-weight: 700; line-height: 1.05;
          color: ${C.text}; margin-bottom: 24px;
          position: relative;
        }
        .hero-title span { color: ${C.gold}; }
        .hero-sub {
          font-size: clamp(1rem, 2vw, 1.15rem);
          color: ${C.muted}; max-width: 640px;
          line-height: 1.7; margin-bottom: 48px;
          position: relative;
        }
        .hero-ctas {
          display: flex; gap: 16px; flex-wrap: wrap;
          justify-content: center; position: relative;
        }
        .btn-primary {
          display: inline-flex; align-items: center; gap: 10px;
          background: ${C.gold}; color: ${C.bg};
          font-family: 'DM Sans', sans-serif;
          font-size: 13px; font-weight: 700;
          letter-spacing: 0.08em; text-transform: uppercase;
          padding: 16px 32px; border-radius: 2px;
          border: none; cursor: pointer;
          transition: background 0.2s, transform 0.15s;
        }
        .btn-primary:hover { background: ${C.goldLt}; transform: translateY(-1px); }
        .btn-secondary {
          display: inline-flex; align-items: center; gap: 10px;
          background: transparent; color: ${C.text};
          font-family: 'DM Sans', sans-serif;
          font-size: 13px; font-weight: 600;
          letter-spacing: 0.08em; text-transform: uppercase;
          padding: 16px 32px; border-radius: 2px;
          border: 1px solid ${C.border}; cursor: pointer;
          transition: border-color 0.2s, color 0.2s;
        }
        .btn-secondary:hover { border-color: ${C.gold}; color: ${C.gold}; }

        /* ── Stat strip ── */
        .stat-strip {
          border-top: 1px solid ${C.border};
          border-bottom: 1px solid ${C.border};
          background: ${C.surface};
          padding: 40px 48px;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 0;
        }
        .stat-item {
          padding: 0 32px;
          border-right: 1px solid ${C.border};
          display: flex; flex-direction: column;
          align-items: center; text-align: center;
        }
        .stat-item:first-child { border-left: none; padding-left: 0; }
        .stat-item:last-child  { border-right: none; }
        .stat-value {
          font-family: 'Cormorant Garamond', serif;
          font-size: 2.8rem; font-weight: 700;
          color: ${C.gold}; line-height: 1;
          margin-bottom: 8px;
        }
        .stat-label {
          font-size: 11px; font-weight: 600;
          letter-spacing: 0.14em; text-transform: uppercase;
          color: ${C.dim};
        }

        /* ── Shared section ── */
        .section {
          max-width: 1100px; margin: 0 auto;
          padding: 100px 48px;
        }
        .section-label {
          font-size: 11px; font-weight: 600;
          letter-spacing: 0.2em; text-transform: uppercase;
          color: ${C.gold}; margin-bottom: 16px;
          display: flex; align-items: center; gap: 12px;
        }
        .section-label::after {
          content: ''; display: block; height: 1px;
          width: 48px; background: ${C.goldDim};
        }
        .section-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 700; line-height: 1.15;
          color: ${C.text}; margin-bottom: 20px;
        }
        .section-title span { color: ${C.gold}; }
        .section-body {
          font-size: 1rem; color: ${C.muted};
          line-height: 1.75; max-width: 600px;
          margin-bottom: 56px;
        }

        /* ── Problem section ── */
        .problem-section {
          background: ${C.surface};
          border-top: 1px solid ${C.border};
          border-bottom: 1px solid ${C.border};
        }
        .problem-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 48px; align-items: start;
        }
        .problem-list {
          display: flex; flex-direction: column; gap: 16px;
        }
        .problem-item {
          display: flex; align-items: flex-start; gap: 14px;
          padding: 18px 20px;
          background: ${C.bg};
          border: 1px solid ${C.border};
          border-radius: 4px;
          transition: border-color 0.2s;
        }
        .problem-item:hover { border-color: ${C.goldDim}; }
        .problem-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: ${C.gold}; flex-shrink: 0;
          margin-top: 7px;
        }
        .problem-text {
          font-size: 0.9rem; color: ${C.muted}; line-height: 1.5;
        }
        .solution-box {
          position: sticky; top: 100px;
          border: 1px solid ${C.border};
          border-radius: 4px; padding: 40px;
          background: ${C.bg};
        }
        .solution-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.75rem; font-weight: 700;
          color: ${C.text}; margin-bottom: 16px;
          line-height: 1.2;
        }
        .solution-title span { color: ${C.gold}; }
        .solution-body {
          font-size: 0.95rem; color: ${C.muted}; line-height: 1.75;
        }

        /* ── Deliverables grid ── */
        .deliverables-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1px;
          background: ${C.border};
          border: 1px solid ${C.border};
          border-radius: 4px;
          overflow: hidden;
        }
        .deliverable-cell {
          background: ${C.surface};
          padding: 36px 32px;
          transition: background 0.2s;
        }
        .deliverable-cell:hover { background: #111a2e; }
        .deliverable-icon {
          color: ${C.gold}; margin-bottom: 16px;
        }
        .deliverable-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.15rem; font-weight: 600;
          color: ${C.text}; margin-bottom: 10px;
        }
        .deliverable-desc {
          font-size: 0.875rem; color: ${C.muted}; line-height: 1.65;
        }

        /* ── Model tags ── */
        .models-section {
          background: ${C.surface};
          border-top: 1px solid ${C.border};
          border-bottom: 1px solid ${C.border};
        }
        .models-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }
        .model-tag {
          border: 1px solid ${C.border};
          border-radius: 4px;
          padding: 24px 28px;
          background: ${C.bg};
          display: flex; flex-direction: column;
          gap: 6px;
          transition: border-color 0.2s, transform 0.2s;
        }
        .model-tag:hover { border-color: ${C.goldDim}; transform: translateY(-2px); }
        .model-label {
          font-size: 0.9rem; font-weight: 600;
          color: ${C.text}; letter-spacing: 0.02em;
        }
        .model-sub {
          font-size: 0.78rem; color: ${C.dim};
          letter-spacing: 0.04em;
        }
        .model-bar {
          height: 2px; background: ${C.border};
          border-radius: 1px; margin-top: 10px;
          position: relative; overflow: hidden;
        }
        .model-bar::after {
          content: '';
          position: absolute; left: 0; top: 0; bottom: 0;
          width: 60%; background: ${C.gold};
          border-radius: 1px;
        }

        /* ── Methodology steps ── */
        .methodology-section {
          background: ${C.bg};
          padding: 100px 0;
        }
        .steps {
          display: flex; flex-direction: column;
          gap: 0;
          border: 1px solid ${C.border};
          border-radius: 4px; overflow: hidden;
        }
        .step {
          display: flex; gap: 40px;
          padding: 40px 48px;
          border-bottom: 1px solid ${C.border};
          background: ${C.surface};
          transition: background 0.2s;
          align-items: flex-start;
        }
        .step:last-child { border-bottom: none; }
        .step:hover { background: #111a2e; }
        .step-number {
          font-family: 'Cormorant Garamond', serif;
          font-size: 3rem; font-weight: 700;
          color: ${C.goldDim}; line-height: 1;
          flex-shrink: 0; min-width: 56px;
          transition: color 0.2s;
        }
        .step:hover .step-number { color: ${C.gold}; }
        .step-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.3rem; font-weight: 600;
          color: ${C.text}; margin-bottom: 10px;
        }
        .step-desc {
          font-size: 0.9rem; color: ${C.muted}; line-height: 1.7;
        }

        /* ── For who ── */
        .for-who-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
        }
        .for-who-card {
          border: 1px solid ${C.border};
          border-radius: 4px;
          padding: 28px 32px;
          background: ${C.surface};
          display: flex; gap: 16px; align-items: flex-start;
          transition: border-color 0.2s;
        }
        .for-who-card:hover { border-color: ${C.goldDim}; }
        .for-who-label {
          font-size: 0.95rem; font-weight: 600;
          color: ${C.text}; margin-bottom: 6px;
        }
        .for-who-desc { font-size: 0.875rem; color: ${C.muted}; line-height: 1.6; }
        }
        .for-who-card {
          border: 1px solid ${C.border};
          border-radius: 4px;
          padding: 28px 32px;
          background: ${C.surface};
          display: flex; gap: 16px; align-items: flex-start;
          transition: border-color 0.2s;
        }
        .for-who-card:hover { border-color: ${C.goldDim}; }
        .for-who-label {
          font-size: 0.95rem; font-weight: 600;
          color: ${C.text}; margin-bottom: 6px;
        }
        .for-who-desc { font-size: 0.875rem; color: ${C.muted}; line-height: 1.6; }

        /* ── Case study ── */
        .case-study {
          background: ${C.surface};
          border-top: 1px solid ${C.border};
          border-bottom: 1px solid ${C.border};
          padding: 100px 0;
        }
        .case-study-inner {
          max-width: 1100px; margin: 0 auto;
          padding: 0 48px;
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 80px; align-items: start;
        }
        .case-tag {
          display: inline-block;
          font-size: 10px; font-weight: 700;
          letter-spacing: 0.2em; text-transform: uppercase;
          color: ${C.bg}; background: ${C.gold};
          padding: 4px 12px; border-radius: 2px;
          margin-bottom: 24px;
        }
        .case-study-card {
          border: 1px solid ${C.border};
          border-radius: 4px; padding: 36px;
          background: ${C.bg};
        }
        .case-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.4rem; font-weight: 700;
          color: ${C.text}; margin-bottom: 16px;
        }
        .case-body {
          font-size: 0.9rem; color: ${C.muted};
          line-height: 1.75; margin-bottom: 20px;
        }
        .case-outcome {
          font-size: 0.875rem; color: ${C.gold};
          font-weight: 500; line-height: 1.6;
          padding-top: 20px;
          border-top: 1px solid ${C.border};
        }
        .case-stats {
          display: flex; flex-direction: column; gap: 32px;
          padding-top: 60px;
        }
        .case-stat-item {
          border-left: 2px solid ${C.gold};
          padding-left: 24px;
        }
        .case-stat-value {
          font-family: 'Cormorant Garamond', serif;
          font-size: 3rem; font-weight: 700;
          color: ${C.gold}; line-height: 1;
          margin-bottom: 6px;
        }
        .case-stat-label {
          font-size: 11px; font-weight: 600;
          letter-spacing: 0.14em; text-transform: uppercase;
          color: ${C.dim};
        }

        /* ── CTA section ── */
        .cta-section {
          text-align: center;
          padding: 120px 48px;
          position: relative; overflow: hidden;
        }
        .cta-glow {
          position: absolute; width: 700px; height: 700px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(201,168,76,0.06) 0%, transparent 70%);
          top: 50%; left: 50%; transform: translate(-50%, -50%);
          pointer-events: none;
        }
        .cta-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2.2rem, 5vw, 3.5rem);
          font-weight: 700; line-height: 1.1;
          color: ${C.text}; margin-bottom: 20px;
          position: relative;
        }
        .cta-title span { color: ${C.gold}; }
        .cta-sub {
          font-size: 1rem; color: ${C.muted};
          max-width: 520px; margin: 0 auto 40px;
          line-height: 1.75; position: relative;
        }

        /* ── Footer ── */
        .footer {
          background: ${C.surface};
          border-top: 1px solid ${C.border};
          padding: 28px 48px;
        }

        /* ── Responsive ── */
        @media (max-width: 900px) {
          .nav { padding: 0 24px; }
          .nav-links, .nav-cta { display: none; }
          .nav-hamburger { display: block; }
          .hero { padding: 100px 24px 64px; }
          .stat-strip { grid-template-columns: repeat(2,1fr); padding: 32px 24px; gap: 24px; }
          .stat-item { border-right: none; padding: 16px; }
          .section { padding: 72px 24px; }
          .problem-grid { grid-template-columns: 1fr; gap: 32px; }
          .solution-box { position: static; }
          .deliverables-grid { grid-template-columns: 1fr; }
          .models-grid { grid-template-columns: repeat(2,1fr); }
          .for-who-grid { grid-template-columns: 1fr; }
          .case-study-inner { grid-template-columns: 1fr; gap: 48px; padding: 0 24px; }
          .methodology-section { padding: 72px 0; }
          .step { padding: 32px 24px; gap: 24px; }
          .cta-section { padding: 80px 24px; }
          .footer { padding: 24px; }
          .footer-inner { flex-direction: column; gap: 8px; text-align: center; }
        }

        @media (max-width: 600px) {
          .models-grid { grid-template-columns: 1fr; }
          .hero-ctas { flex-direction: column; align-items: center; }
          .stat-strip { grid-template-columns: 1fr 1fr; }
        }
      `}</style>

      {/* ── NAV ── */}
      <nav className={`nav${scrolled ? " scrolled" : ""}`}>
        <Link href="/">
          <Image
            src="/noBgColor.png"
            alt="True Orbit Analytics"
            width={140}
            height={42}
            style={{ objectFit: "contain", cursor: "pointer" }}
          />
        </Link>
        <ul className="nav-links">
          {["services","about","portfolio","pricing","contact"].map(id => (
            <li key={id}>
              <a onClick={() => window.location.href = `/#${id}`}>
                {id.charAt(0).toUpperCase() + id.slice(1)}
              </a>
            </li>
          ))}
        </ul>
        <button className="nav-cta" onClick={() => window.location.href = "/#contact"}>
          Get Started
        </button>
        <button className="nav-hamburger" onClick={() => setMenuOpen(true)}>
          <Menu size={24} />
        </button>
      </nav>

      {/* ── MOBILE MENU ── */}
      <div className={`mobile-menu${menuOpen ? " open" : ""}`}>
        <button
          onClick={() => setMenuOpen(false)}
          style={{ position: "absolute", top: 24, right: 24, background: "none", border: "none", color: C.gold, cursor: "pointer" }}
        >
          <X size={28} />
        </button>
        {["services","about","portfolio","pricing","contact"].map(id => (
          <a key={id} onClick={() => { setMenuOpen(false); window.location.href = `/#${id}`; }}>
            {id.charAt(0).toUpperCase() + id.slice(1)}
          </a>
        ))}
      </div>

      {/* ── HERO ── */}
      <section className="hero">
        <div className="hero-grid" />
        <div className="hero-glow" />
        <div className="hero-pulse" />
        <div className="hero-pulse" />
        <div className="hero-pulse" />

        <AnimSection>
          <div className="breadcrumb">
            <a href="/">Home</a>
            <span className="breadcrumb-sep">›</span>
            <a href="/#services">Services</a>
            <span className="breadcrumb-sep">›</span>
            Predictive Modeling
          </div>
          <div className="hero-eyebrow">Predictive Modeling</div>
          <h1 className="hero-title">
            See What's Coming<br />
            <span>Before It Arrives</span>
          </h1>
          <p className="hero-sub">
            Stop reacting. Start predicting. We build statistical and machine-learning
            models that give your business a 30, 60, and 90-day view of demand,
            risk, and opportunity — so every decision is made with forward intelligence.
          </p>
          <div className="hero-ctas">
            <button className="btn-primary" onClick={() => window.location.href = "/#contact"}>
              Book a Discovery Call <ArrowRight size={16} />
            </button>
            <button className="btn-secondary" onClick={() => document.getElementById("deliverables")?.scrollIntoView({ behavior: "smooth" })}>
              See What You Get
            </button>
          </div>
        </AnimSection>
      </section>

      {/* ── STAT STRIP ── */}
      <div className="stat-strip">
        {[
          { value: "30–90", label: "Day Forward Visibility" },
          { value: "6+", label: "Model Types Deployed" },
          { value: "5+", label: "Years Applied Experience" },
          { value: "100%", label: "Evidence-Based Decisions" },
        ].map((s, i) => (
          <div key={i} className="stat-item">
            <div className="stat-value">{s.value}</div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      {/* ── PROBLEM ── */}
      <section className="problem-section">
        <div className="section">
          <div className="problem-grid">
            <div>
              <AnimSection>
                <div className="section-label">The Problem</div>
                <h2 className="section-title">
                  Are You Running<br />
                  <span>Blind Into the Future?</span>
                </h2>
                <p className="section-body">
                  Most businesses operate on lagging data — reports that describe
                  what already happened. By the time a problem shows up in your
                  dashboard, you've already lost margin, customers, or competitive
                  position. These are the situations predictive modeling is built to prevent.
                </p>
              </AnimSection>
              <div className="problem-list">
                {problems.map((p, i) => (
                  <AnimSection key={i} delay={i * 60}>
                    <div className="problem-item">
                      <div className="problem-dot" />
                      <div className="problem-text">{p}</div>
                    </div>
                  </AnimSection>
                ))}
              </div>
            </div>

            <AnimSection delay={150}>
              <div className="solution-box">
                <div className="section-label" style={{ marginBottom: 16 }}>The Solution</div>
                <div className="solution-title">
                  Models That Think<br />
                  <span>Ahead of Your Business</span>
                </div>
                <p className="solution-body">
                  Predictive modeling transforms your historical data into a
                  forward-looking intelligence system. Instead of waiting for
                  trends to emerge, you see the signal before the noise —
                  and position accordingly.
                  <br /><br />
                  True Orbit Analytics builds models calibrated specifically to
                  your business patterns, data infrastructure, and decision
                  cadence. The output isn't a report — it's a competitive
                  advantage that compounds over time.
                </p>
              </div>
            </AnimSection>
          </div>
        </div>
      </section>

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
              Each deliverable is a working intelligence tool — not a
              static report. Built to be used, updated, and relied upon.
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

      {/* ── MODEL TYPES ── */}
      <section className="models-section">
        <div className="section">
          <AnimSection>
            <div className="section-label">Our Toolkit</div>
            <h2 className="section-title">
              Models We <span>Deploy</span>
            </h2>
            <p className="section-body">
              We select and calibrate the right statistical and machine-learning
              approach for your specific business question — not a one-size-fits-all
              template.
            </p>
          </AnimSection>

          <div className="models-grid">
            {models.map((m, i) => (
              <AnimSection key={i} delay={i * 60}>
                <div className="model-tag">
                  <div className="model-label">{m.label}</div>
                  <div className="model-sub">{m.sub}</div>
                  <div className="model-bar" />
                </div>
              </AnimSection>
            ))}
          </div>
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
              From your raw historical data to a live predictive intelligence
              system — a structured four-step process.
            </p>
          </AnimSection>

          <div className="steps">
            {[
              {
                n: "01",
                title: "Data Discovery & Signal Audit",
                desc: "We start by auditing your historical data for depth, quality, and predictive signal. We identify which variables carry forward-looking information — and which are noise. A model is only as good as the data it's trained on.",
              },
              {
                n: "02",
                title: "Model Selection & Architecture",
                desc: "Based on your business question and data structure, we select the appropriate modeling approach. Demand forecasting, churn prediction, anomaly detection — each requires a different statistical architecture. We build the right one, not the fashionable one.",
              },
              {
                n: "03",
                title: "Training, Validation & Calibration",
                desc: "We train the model on your historical data, validate it against holdout periods, and calibrate for your specific error tolerance. Every model is stress-tested before it goes anywhere near a business decision.",
              },
              {
                n: "04",
                title: "Deployment, Dashboard & Ongoing Monitoring",
                desc: "The model is integrated into a live dashboard — delivering forward-looking outputs on your preferred cadence. We monitor model drift and recalibrate as your business evolves, so accuracy stays high over time.",
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
              Predictive Modeling delivers the most value to businesses that
              already have data and are ready to put it to work prospectively.
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
              Predictive Intelligence<br />
              <span>Applied to Real Capital</span>
            </h2>
            <p className="section-body" style={{ marginBottom: 32 }}>
              Our predictive methodology has been pressure-tested against real
              market conditions — not simulated environments — with measurable
              results sustained over multiple years.
            </p>
            <div className="case-study-card">
              <span className="case-tag">Case Study</span>
              <div className="case-title">Personal Brokerage Performance Dashboard</div>
              <p className="case-body">
                Built a predictive performance tracker consolidating position
                data, sector exposure, and P&amp;L across live holdings. Applied
                statistical thresholds and signal-based rules to flag entry and
                exit conditions before they were confirmed by price action —
                removing emotional lag from every decision.
              </p>
              <p className="case-outcome">
                Eliminated reactive decision-making through systematic,
                model-driven analytics — the same rigor we bring to your
                operational forecasting.
              </p>
            </div>
          </AnimSection>

          <AnimSection delay={200}>
            <div className="case-stats">
              {[
                { value: "5+", label: "Years of Model-Driven Applied Experience" },
                { value: "30–90d", label: "Standard Forward Visibility Horizon" },
                { value: "0%", label: "Gut-Feeling in Our Recommendations" },
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
            Ready to Stop Reacting<br />
            <span>and Start Predicting?</span>
          </h2>
          <p className="cta-sub">
            Start with a free discovery call. We'll assess your data and
            identify exactly which predictive models will create immediate
            leverage for your business. No obligation, no fluff.
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
