"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  BarChart2, TrendingUp, Database, PieChart, LineChart,
  FileSpreadsheet, ChevronDown, ChevronUp, Menu, X,
  ArrowRight, Check, Mail, Phone, MapPin, Star
} from "lucide-react";

// ── Colour tokens ──────────────────────────────────────────────
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

// ── Pricing data (edit here, nowhere else) ──────────────────────
const plans = [
  {
    name: "Starter Orbit",
    tagline: "For small businesses ready to launch their data journey",
    price: "$499",
    period: "/ month",
    features: [
      "Up to 3 data sources",
      "Monthly reporting dashboard",
      "Power BI report (1 workspace)",
      "Email support",
      "Quarterly strategy call",
    ],
    cta: "Start with Starter",
    popular: false,
  },
  {
    name: "Growth Orbit",
    tagline: "For scaling businesses that need real-time intelligence",
    price: "$1,199",
    period: "/ month",
    features: [
      "Up to 10 data sources",
      "Weekly reporting dashboard",
      "Power BI (unlimited workspaces)",
      "Custom KPI tracking",
      "Monthly strategy call",
      "Priority support",
      "Competitor benchmarking",
    ],
    cta: "Accelerate Growth",
    popular: true,
  },
  {
    name: "Elite Orbit",
    tagline: "Full-service analytics partnership for enterprise ambition",
    price: "Custom",
    period: "",
    features: [
      "Unlimited data sources",
      "Real-time live dashboards",
      "Full BI stack management",
      "Predictive analytics & AI insights",
      "Dedicated analyst",
      "Weekly strategy sessions",
      "Custom integrations",
      "SLA guarantee",
    ],
    cta: "Inquire for Elite",
    popular: false,
  },
];

// ── Services ────────────────────────────────────────────────────
const services = [
  {
    icon: <BarChart2 size={28} />,
    title: "Business Intelligence",
    desc: "Transform raw data into executive-ready dashboards using Power BI and leading BI platforms. See your entire operation at a glance.",
    wide: false,
  },
  {
    icon: <TrendingUp size={28} />,
    title: "Financial Analytics",
    desc: "Deep-dive analysis of revenue, margins, cash flow, and investment performance. Make money decisions backed by math, not intuition.",
    wide: false,
  },
  {
    icon: <Database size={28} />,
    title: "Data Pipeline Architecture",
    desc: "Clean, structured, reliable data pipelines from source to insight. Your data arrives accurate, on time, every time.",
    wide: false,
  },
  {
    icon: <LineChart size={28} />,
    title: "Predictive Modeling",
    desc: "Forward-looking analytics that forecast demand, flag risk, and surface opportunity before your competitors see it coming.",
    wide: true,
  },
  {
    icon: <PieChart size={28} />,
    title: "Performance Reporting",
    desc: "Scheduled reporting suites delivered on your cadence — weekly, monthly, quarterly — formatted for leadership and board-level review.",
    wide: false,
  },
  {
    icon: <FileSpreadsheet size={28} />,
    title: "Custom Integrations",
    desc: "Connect your CRM, ERP, marketing stack, and financial tools into one unified analytics environment.",
    wide: false,
  },
];

// ── Portfolio cases ─────────────────────────────────────────────
const portfolio = [
  {
    label: "Investment Portfolio Optimization",
    category: "Financial Analytics",
    summary: "Applied multi-factor quantitative analysis across a diversified investment portfolio spanning equities, ETFs, and retirement accounts. Identified allocation inefficiencies and rebalanced positions to maximize risk-adjusted returns.",
    tools: ["Power BI", "Excel", "Python"],
    outcome: "Consistent outperformance vs. standard advisory benchmarks over a 5-year period.",
  },
  {
    label: "Roth IRA Growth Analysis",
    category: "Retirement Analytics",
    summary: "Built a custom tracking dashboard to monitor Roth IRA contribution efficiency, asset allocation drift, and long-term compounding trajectory. Automated monthly variance reporting against target allocation.",
    tools: ["Power BI", "Excel"],
    outcome: "Identified rebalancing opportunities that improved projected retirement value by measurable margin.",
  },
  {
    label: "Personal Brokerage Performance Dashboard",
    category: "Trading Analytics",
    summary: "Designed a live brokerage performance tracker that consolidated position data, sector exposure, and P&L across holdings. Enabled data-driven entry/exit decisions based on statistical thresholds rather than sentiment.",
    tools: ["Power BI", "Excel", "SQL"],
    outcome: "Eliminated emotional decision-making from trading with systematic, rules-based analytics.",
  },
];

// ── Stat strip ──────────────────────────────────────────────────
const stats = [
  { value: "5+", label: "Years Experience" },
  { value: "100%", label: "Data-Driven Decisions" },
  { value: "3+", label: "BI Platforms" },
  { value: "∞", label: "Insights Possible" },
];

// ── useInView hook ──────────────────────────────────────────────
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

// ── AnimSection wrapper ─────────────────────────────────────────
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

// ══════════════════════════════════════════════════════════════════
export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openCase, setOpenCase] = useState<number | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const response = await fetch("/api/contact", {
      method: "POST",
      body: data,
    });
    const result = await response.json();
    if (result.success) {
      setSubmitted(true);
    } else {
      alert("Something went wrong. Please email us directly at contact@trueorbitanalytics.com");
    }
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
        }

        /* ── Gold grain overlay ── */
        body::before {
          content: '';
          position: fixed;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
          pointer-events: none;
          z-index: 0;
          opacity: 0.4;
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
          transition: background 0.3s, border-color 0.3s, backdrop-filter 0.3s;
        }
        .nav.scrolled {
          background: rgba(8,13,26,0.92);
          border-bottom: 1px solid ${C.border};
          backdrop-filter: blur(12px);
        }
        .nav-logo { height: 44px; width: auto; cursor: pointer; }
        .nav-links { display: flex; gap: 36px; list-style: none; }
        .nav-links a {
          font-size: 13px;
          font-weight: 500;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: ${C.muted};
          text-decoration: none;
          cursor: pointer;
          transition: color 0.2s;
        }
        .nav-links a:hover { color: ${C.gold}; }
        .nav-cta {
          background: transparent;
          border: 1px solid ${C.gold};
          color: ${C.gold};
          font-family: 'DM Sans', sans-serif;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          padding: 10px 24px;
          border-radius: 2px;
          cursor: pointer;
          transition: background 0.2s, color 0.2s;
        }
        .nav-cta:hover { background: ${C.gold}; color: ${C.bg}; }
        .nav-hamburger {
          display: none;
          background: none;
          border: none;
          color: ${C.gold};
          cursor: pointer;
        }

        /* ── Hero ── */
        .hero {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 120px 24px 80px;
          position: relative;
          overflow: hidden;
        }
        .hero-bg-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(201,168,76,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(201,168,76,0.04) 1px, transparent 1px);
          background-size: 60px 60px;
          mask-image: radial-gradient(ellipse 80% 60% at 50% 50%, black, transparent);
        }
        .hero-glow {
          position: absolute;
          width: 600px; height: 600px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(201,168,76,0.08) 0%, transparent 70%);
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          pointer-events: none;
        }
        .hero-eyebrow {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: ${C.gold};
          margin-bottom: 24px;
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 12px;
        }
        .hero-eyebrow::before, .hero-eyebrow::after {
          content: '';
          width: 40px; height: 1px;
          background: ${C.goldDim};
        }
        .hero-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(3rem, 8vw, 6rem);
          font-weight: 700;
          line-height: 1.05;
          letter-spacing: -0.01em;
          color: ${C.text};
          margin-bottom: 12px;
          position: relative;
        }
        .hero-title span {
          background: linear-gradient(135deg, ${C.goldDim} 0%, ${C.goldLt} 50%, ${C.goldDim} 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .hero-sub {
          font-size: clamp(1rem, 2vw, 1.2rem);
          color: ${C.muted};
          max-width: 520px;
          margin: 0 auto 48px;
          line-height: 1.7;
          font-weight: 300;
          position: relative;
        }
        .hero-actions { display: flex; gap: 16px; justify-content: center; flex-wrap: wrap; position: relative; }
        .btn-primary {
          background: linear-gradient(135deg, ${C.goldDim}, ${C.gold});
          color: ${C.bg};
          border: none;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          padding: 16px 36px;
          border-radius: 2px;
          cursor: pointer;
          transition: opacity 0.2s, transform 0.2s, box-shadow 0.2s;
          display: inline-flex; align-items: center; gap: 8px;
        }
        .btn-primary:hover {
          opacity: 0.9;
          transform: translateY(-2px);
          box-shadow: 0 8px 32px rgba(201,168,76,0.3);
        }
        .btn-ghost {
          background: transparent;
          color: ${C.muted};
          border: 1px solid ${C.border};
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          font-weight: 500;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          padding: 16px 36px;
          border-radius: 2px;
          cursor: pointer;
          transition: color 0.2s, border-color 0.2s;
        }
        .btn-ghost:hover { color: ${C.gold}; border-color: ${C.goldDim}; }

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
          text-align: center;
          padding: 0 24px;
          border-right: 1px solid ${C.border};
        }
        .stat-item:last-child { border-right: none; }
        .stat-value {
          font-family: 'Cormorant Garamond', serif;
          font-size: 3rem;
          font-weight: 700;
          color: ${C.gold};
          line-height: 1;
          margin-bottom: 6px;
        }
        .stat-label {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: ${C.dim};
        }

        /* ── Sections ── */
        .section { padding: 100px 48px; max-width: 1200px; margin: 0 auto; }
        .section-full { padding: 100px 0; }
        .section-inner { max-width: 1200px; margin: 0 auto; padding: 0 48px; }

        .section-label {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: ${C.gold};
          margin-bottom: 16px;
          display: flex; align-items: center; gap: 12px;
        }
        .section-label::after {
          content: '';
          flex: 1;
          max-width: 60px;
          height: 1px;
          background: ${C.goldDim};
        }
        .section-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2rem, 4vw, 3.25rem);
          font-weight: 700;
          line-height: 1.1;
          color: ${C.text};
          margin-bottom: 16px;
          letter-spacing: -0.01em;
        }
        .section-title span { color: ${C.gold}; }
        .section-body {
          font-size: 1rem;
          color: ${C.muted};
          line-height: 1.75;
          max-width: 560px;
          font-weight: 300;
        }

        /* ── Bento services grid ── */
        .bento-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1px;
          background: ${C.border};
          border: 1px solid ${C.border};
          margin-top: 64px;
        }
        .bento-cell {
          background: ${C.surface};
          padding: 40px 36px;
          transition: background 0.25s;
          position: relative;
          overflow: hidden;
        }
        .bento-cell.wide { grid-column: span 2; }
        .bento-cell::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(201,168,76,0.04), transparent);
          opacity: 0;
          transition: opacity 0.3s;
        }
        .bento-cell:hover::before { opacity: 1; }
        .bento-icon {
          width: 52px; height: 52px;
          border: 1px solid ${C.border};
          border-radius: 8px;
          display: flex; align-items: center; justify-content: center;
          color: ${C.gold};
          margin-bottom: 20px;
          transition: border-color 0.2s, background 0.2s;
        }
        .bento-cell:hover .bento-icon {
          border-color: ${C.goldDim};
          background: rgba(201,168,76,0.06);
        }
        .bento-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.35rem;
          font-weight: 600;
          color: ${C.text};
          margin-bottom: 10px;
        }
        .bento-desc { font-size: 14px; color: ${C.muted}; line-height: 1.7; font-weight: 300; }

        /* ── About ── */
        .about-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: center;
          margin-top: 0;
        }
        .about-values { margin-top: 40px; display: flex; flex-direction: column; gap: 20px; }
        .about-value {
          display: flex; gap: 16px; align-items: flex-start;
          padding: 20px 24px;
          border: 1px solid ${C.border};
          border-radius: 4px;
          background: ${C.surface};
          transition: border-color 0.2s;
        }
        .about-value:hover { border-color: ${C.goldDim}; }
        .about-value-dot {
          width: 8px; height: 8px; border-radius: 50%;
          background: ${C.gold};
          margin-top: 6px; flex-shrink: 0;
        }
        .about-value-title {
          font-weight: 600; font-size: 14px;
          color: ${C.text}; margin-bottom: 4px;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          font-size: 12px;
        }
        .about-value-desc { font-size: 14px; color: ${C.muted}; line-height: 1.6; font-weight: 300; }
        .about-visual {
          background: ${C.surface};
          border: 1px solid ${C.border};
          border-radius: 4px;
          aspect-ratio: 4/5;
          display: flex; align-items: center; justify-content: center;
          position: relative;
          overflow: hidden;
        }
        .about-visual-inner {
          text-align: center;
          padding: 40px;
        }
        .about-visual-stat {
          font-family: 'Cormorant Garamond', serif;
          font-size: 5rem;
          font-weight: 700;
          color: ${C.gold};
          line-height: 1;
          display: block;
        }
        .about-visual-stat-label {
          font-size: 12px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: ${C.dim};
          margin-top: 8px;
          display: block;
        }
        .about-visual-divider {
          width: 40px; height: 1px;
          background: ${C.goldDim};
          margin: 32px auto;
        }

        /* ── Portfolio ── */
        .portfolio-list { margin-top: 48px; display: flex; flex-direction: column; gap: 2px; }
        .portfolio-item {
          border: 1px solid ${C.border};
          background: ${C.surface};
          overflow: hidden;
          transition: border-color 0.2s;
        }
        .portfolio-item.open { border-color: ${C.goldDim}; }
        .portfolio-trigger {
          width: 100%;
          padding: 28px 32px;
          display: flex; align-items: center; justify-content: space-between;
          background: none; border: none; cursor: pointer;
          text-align: left;
          gap: 16px;
        }
        .portfolio-trigger-left { display: flex; align-items: center; gap: 20px; }
        .portfolio-cat {
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: ${C.gold};
          background: rgba(201,168,76,0.08);
          border: 1px solid rgba(201,168,76,0.2);
          padding: 4px 10px;
          border-radius: 2px;
          white-space: nowrap;
        }
        .portfolio-label {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.2rem;
          font-weight: 600;
          color: ${C.text};
        }
        .portfolio-chevron { color: ${C.gold}; transition: transform 0.3s; flex-shrink: 0; }
        .portfolio-item.open .portfolio-chevron { transform: rotate(180deg); }
        .portfolio-body {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.4s ease;
        }
        .portfolio-item.open .portfolio-body { max-height: 400px; }
        .portfolio-content {
          padding: 0 32px 32px;
          border-top: 1px solid ${C.border};
          padding-top: 28px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 32px;
        }
        .portfolio-summary { font-size: 14px; color: ${C.muted}; line-height: 1.75; font-weight: 300; }
        .portfolio-meta { display: flex; flex-direction: column; gap: 16px; }
        .portfolio-tools { display: flex; flex-wrap: wrap; gap: 8px; }
        .portfolio-tool {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: ${C.dim};
          border: 1px solid ${C.border};
          padding: 4px 10px;
          border-radius: 2px;
        }
        .portfolio-outcome {
          font-size: 14px;
          color: ${C.gold};
          line-height: 1.6;
          font-style: italic;
          padding-left: 16px;
          border-left: 2px solid ${C.goldDim};
        }

        /* ── Pricing ── */
        .pricing-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1px;
          background: ${C.border};
          border: 1px solid ${C.border};
          margin-top: 64px;
        }
        .pricing-card {
          background: ${C.surface};
          padding: 40px 32px;
          display: flex;
          flex-direction: column;
          position: relative;
          transition: background 0.25s;
        }
        .pricing-card.popular {
          background: #0f1d35;
        }
        .pricing-card.popular::before {
          content: 'Most Recommended';
          position: absolute;
          top: -1px; left: 50%;
          transform: translateX(-50%);
          background: linear-gradient(135deg, ${C.goldDim}, ${C.gold});
          color: ${C.bg};
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          padding: 5px 16px;
          white-space: nowrap;
        }
        .pricing-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.5rem;
          font-weight: 700;
          color: ${C.text};
          margin-bottom: 6px;
        }
        .pricing-tagline { font-size: 13px; color: ${C.dim}; margin-bottom: 32px; line-height: 1.5; font-weight: 300; }
        .pricing-price {
          font-family: 'Cormorant Garamond', serif;
          font-size: 3.5rem;
          font-weight: 700;
          color: ${C.gold};
          line-height: 1;
          margin-bottom: 4px;
        }
        .pricing-period { font-size: 13px; color: ${C.dim}; margin-bottom: 32px; }
        .pricing-divider { height: 1px; background: ${C.border}; margin-bottom: 28px; }
        .pricing-features { list-style: none; display: flex; flex-direction: column; gap: 12px; flex: 1; margin-bottom: 32px; }
        .pricing-feature {
          display: flex; align-items: flex-start; gap: 10px;
          font-size: 14px; color: ${C.muted}; font-weight: 300; line-height: 1.5;
        }
        .pricing-check {
          width: 18px; height: 18px; border-radius: 50%;
          background: rgba(201,168,76,0.1);
          display: flex; align-items: center; justify-content: center;
          color: ${C.gold}; flex-shrink: 0; margin-top: 1px;
        }
        .pricing-btn {
          width: 100%;
          padding: 14px;
          border: 1px solid ${C.goldDim};
          background: transparent;
          color: ${C.gold};
          font-family: 'DM Sans', sans-serif;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          cursor: pointer;
          border-radius: 2px;
          transition: background 0.2s, color 0.2s;
        }
        .pricing-btn:hover, .pricing-card.popular .pricing-btn {
          background: linear-gradient(135deg, ${C.goldDim}, ${C.gold});
          color: ${C.bg};
          border-color: transparent;
        }
        .pricing-card.popular .pricing-btn:hover { opacity: 0.88; }

        /* ── Contact ── */
        .contact-grid {
          display: grid;
          grid-template-columns: 1fr 1.6fr;
          gap: 80px;
          align-items: start;
        }
        .contact-info { display: flex; flex-direction: column; gap: 24px; margin-top: 40px; }
        .contact-item {
          display: flex; gap: 14px; align-items: flex-start;
        }
        .contact-icon {
          width: 40px; height: 40px;
          border: 1px solid ${C.border};
          border-radius: 4px;
          display: flex; align-items: center; justify-content: center;
          color: ${C.gold}; flex-shrink: 0;
        }
        .contact-item-label { font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase; color: ${C.dim}; margin-bottom: 2px; }
        .contact-item-value { font-size: 14px; color: ${C.muted}; }
        .contact-form { display: flex; flex-direction: column; gap: 16px; margin-top: 40px; }
        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .form-field { display: flex; flex-direction: column; gap: 6px; }
        .form-label { font-size: 11px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: ${C.dim}; }
        .form-input, .form-select, .form-textarea {
          background: ${C.surface};
          border: 1px solid ${C.border};
          color: ${C.text};
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          padding: 12px 16px;
          border-radius: 2px;
          outline: none;
          transition: border-color 0.2s;
          width: 100%;
        }
        .form-input:focus, .form-select:focus, .form-textarea:focus {
          border-color: ${C.goldDim};
        }
        .form-select { appearance: none; cursor: pointer; }
        .form-textarea { resize: vertical; min-height: 120px; }
        .form-submit {
          align-self: flex-start;
        }

        /* ── Footer ── */
        .footer {
          border-top: 1px solid ${C.border};
          background: ${C.surface};
          padding: 48px;
        }
        .footer-inner {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 2fr 1fr 1fr;
          gap: 64px;
          margin-bottom: 48px;
        }
        .footer-logo { height: 48px; width: auto; margin-bottom: 16px; }
        .footer-tagline { font-size: 13px; color: ${C.dim}; line-height: 1.7; max-width: 280px; font-weight: 300; }
        .footer-col-title {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: ${C.gold};
          margin-bottom: 20px;
        }
        .footer-links { list-style: none; display: flex; flex-direction: column; gap: 10px; }
        .footer-links a {
          font-size: 13px;
          color: ${C.dim};
          text-decoration: none;
          cursor: pointer;
          transition: color 0.2s;
        }
        .footer-links a:hover { color: ${C.gold}; }
        .footer-bottom {
          max-width: 1200px;
          margin: 0 auto;
          padding-top: 24px;
          border-top: 1px solid ${C.border};
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 12px;
          color: ${C.dim};
        }

        /* ── Mobile ── */
        @media (max-width: 900px) {
          .nav { padding: 0 24px; }
          .nav-links, .nav-cta { display: none; }
          .nav-hamburger { display: block; }
          .mobile-menu {
            position: fixed;
            inset: 0;
            background: ${C.bg};
            z-index: 99;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 32px;
          }
          .mobile-menu a {
            font-size: 1.5rem;
            font-family: 'Cormorant Garamond', serif;
            color: ${C.text};
            text-decoration: none;
            cursor: pointer;
          }
          .section { padding: 64px 24px; }
          .bento-grid { grid-template-columns: 1fr; }
          .bento-cell.wide { grid-column: span 1; }
          .stat-strip { grid-template-columns: repeat(2,1fr); padding: 32px 24px; }
          .stat-item { border-right: none; border-bottom: 1px solid ${C.border}; padding: 20px 0; }
          .stat-item:last-child, .stat-item:nth-child(even) { border-bottom: none; }
          .about-grid { grid-template-columns: 1fr; gap: 40px; }
          .about-visual { display: none; }
          .pricing-grid { grid-template-columns: 1fr; }
          .contact-grid { grid-template-columns: 1fr; gap: 40px; }
          .portfolio-content { grid-template-columns: 1fr; }
          .footer-inner { grid-template-columns: 1fr; gap: 32px; }
          .footer-bottom { flex-direction: column; gap: 8px; text-align: center; }
          .form-row { grid-template-columns: 1fr; }
        }

        /* ── Hero animation ── */
        @keyframes spin-slow {
  from { transform: translate(-50%, -50%) rotate(0deg); }
  to   { transform: translate(-50%, -50%) rotate(-360deg); }
}
        .hero-eyebrow { animation: fadeUp 0.7s ease 0.2s both; }
        .hero-title    { animation: fadeUp 0.7s ease 0.4s both; }
        .hero-sub      { animation: fadeUp 0.7s ease 0.6s both; }
        .hero-actions  { animation: fadeUp 0.7s ease 0.8s both; }

        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        .hero-orbit-ring {
          position: absolute;
          border-radius: 50%;
          border: 1px solid rgba(201,168,76,0.08);
          pointer-events: none;
        }
      `}</style>

      {/* ── NAV ────────────────────────────────────── */}
      <nav className={`nav${scrolled ? " scrolled" : ""}`}>
        <Image
          src="/noBgColor.png"
          alt="True Orbit Analytics"
          width={160}
          height={44}
          className="nav-logo"
          onClick={() => scrollTo("hero")}
          style={{ objectFit: "contain" }}
        />
        <ul className="nav-links">
          {["services","about","portfolio","pricing","contact"].map(id => (
            <li key={id}>
              <a onClick={() => scrollTo(id)}>
                {id.charAt(0).toUpperCase() + id.slice(1)}
              </a>
            </li>
          ))}
        </ul>
        <button 
  className="nav-hamburger" 
  onClick={() => setMenuOpen(!menuOpen)}
  style={{ visibility: menuOpen ? "hidden" : "visible" }}
>
  <Menu size={24} />
</button>
        </nav>

      {/* ── MOBILE MENU ─────────────────────────────── */}
      {menuOpen && (
        <div className="mobile-menu">
          <button
            onClick={() => setMenuOpen(false)}
            style={{ 
              position: "absolute", 
              top: 16, 
              right: 16, 
              background: "none", 
              border: "none", 
              color: C.gold, 
              cursor: "pointer",
              padding: 50,
              zIndex: 110
            }}
          >
            <X size={28} />
          </button>
          {["services","about","portfolio","pricing","contact"].map(id => (
            <a key={id} onClick={() => scrollTo(id)}>
              {id.charAt(0).toUpperCase() + id.slice(1)}
            </a>
          ))}
        </div>
      )}

      {/* ── HERO ────────────────────────────────────── */}
      <section id="hero" className="hero">
        <div className="hero-glow" />
        <div style={{
  position: "absolute",
  width: "66vw",
  height: "66vw",
  maxWidth: "800px",
  maxHeight: "800px",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  opacity: 0.12,
  animation: "spin-slow 20s linear infinite",
  pointerEvents: "none",
  zIndex: 0,
}}>
  <Image
    src="/symbol.svg"
    alt=""
    fill
    style={{ objectFit: "contain" }}
  />
</div>
{/* Orbit rings */}
{[320,480,640].map((size, i) => (
  <div key={i} className="hero-orbit-ring" style={{
    width: size, height: size,
    top: "200%", left: "200%",
    marginTop: -size/2, marginLeft: -size/2,
    opacity: 0.4 - i * 0.1,
  }} />
))}

<Image
  src="/noBgColor.png"
  alt="True Orbit Analytics"
  width={480}
  height={160}
  style={{ objectFit: "contain", marginBottom: 16, position: "relative" }}
  priority
/>
        
        <h1 className="hero-title">
          Your Data Is<br />
          <span>Telling a Story.</span><br />
          Are You Listening?
        </h1>
        <p className="hero-sub">
          We transform raw business data into clear, actionable intelligence —
          so you make smarter decisions, faster than your competition.
        </p>
        <div className="hero-actions">
          <button className="btn-primary" onClick={() => scrollTo("contact")}>
            Start Accelerating <ArrowRight size={16} />
          </button>
          <button className="btn-ghost" onClick={() => scrollTo("services")}>
            Explore Services
          </button>
        </div>
      </section>

      {/* ── STAT STRIP ──────────────────────────────── */}
      <div className="stat-strip">
        {stats.map((s, i) => (
          <div key={i} className="stat-item">
            <div className="stat-value">{s.value}</div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      {/* ── SERVICES ────────────────────────────────── */}
      <section id="services">
        <div className="section">
          <AnimSection>
            <div className="section-label">What We Do</div>
            <h2 className="section-title">
              Analytics That <span>Move the Needle</span>
            </h2>
            <p className="section-body">
              Every service we offer is built around one goal: turning your data
              into decisions that give you a measurable competitive edge.
            </p>
          </AnimSection>

          <div className="bento-grid">
            {services.map((s, i) => (
              <AnimSection key={i} delay={i * 80} className={`bento-cell${s.wide ? " wide" : ""}`}>
                <div className="bento-icon">{s.icon}</div>
                <div className="bento-title">{s.title}</div>
                <div className="bento-desc">{s.desc}</div>
              </AnimSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT ───────────────────────────────────── */}
      <section id="about" style={{ background: C.surface, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}` }}>
        <div className="section">
          <div className="about-grid">
            <div>
              <AnimSection>
                <div className="section-label">About</div>
                <h2 className="section-title">
                  Data Intelligence<br />
                  <span>With Skin in the Game</span>
                </h2>
                <p className="section-body">
                  True Orbit Analytics was built on a simple conviction: data
                  analytics should be accessible to every ambitious business,
                  not just enterprises with nine-figure budgets.
                </p>
                <p className="section-body" style={{ marginTop: 16 }}>
                  With 5+ years of applied analytics experience — including
                  managing and optimizing investment portfolios to consistently
                  outperform standard benchmarks — we bring the same discipline
                  and rigor to your business data that institutional analysts
                  bring to Wall Street.
                </p>
              </AnimSection>
              <div className="about-values">
                {[
                  { title: "Precision Over Assumption", desc: "We let the data lead. Every recommendation is grounded in evidence, not gut feeling." },
                  { title: "Mission Driven", desc: "Your growth is our metric. We don't measure success in deliverables — we measure it in your outcomes." },
                  { title: "Uncompromising Integrity", desc: "We tell you what your data says, even when it's uncomfortable. You deserve the truth." },
                ].map((v, i) => (
                  <AnimSection key={i} delay={i * 100}>
                    <div className="about-value">
                      <div className="about-value-dot" />
                      <div>
                        <div className="about-value-title">{v.title}</div>
                        <div className="about-value-desc">{v.desc}</div>
                      </div>
                    </div>
                  </AnimSection>
                ))}
              </div>
            </div>

            <AnimSection delay={200}>
              <div className="about-visual">
                <div className="about-visual-inner">
                  <Image
                    src="/symbol.svg"
                    alt="True Orbit Analytics symbol"
                    width={120}
                    height={120}
                    style={{ marginBottom: 32 }}
                  />
                  <div className="about-visual-divider" />
                  <span className="about-visual-stat">5+</span>
                  <span className="about-visual-stat-label">Years Applied Experience</span>
                  <div className="about-visual-divider" />
                  <span className="about-visual-stat" style={{ fontSize: "2rem" }}>
                    Accelerate
                  </span>
                  <span className="about-visual-stat-label">With Analytics</span>
                </div>
              </div>
            </AnimSection>
          </div>
        </div>
      </section>

      {/* ── PORTFOLIO ───────────────────────────────── */}
      <section id="portfolio">
        <div className="section">
          <AnimSection>
            <div className="section-label">Our Work</div>
            <h2 className="section-title">
              Proven <span>In Practice</span>
            </h2>
            <p className="section-body">
              Real analytics. Real decisions. Real outcomes. Explore our case
              studies to see the methodology behind the results.
            </p>
          </AnimSection>

          <div className="portfolio-list">
            {portfolio.map((item, i) => (
              <AnimSection key={i} delay={i * 80}>
                <div className={`portfolio-item${openCase === i ? " open" : ""}`}>
                  <button
                    className="portfolio-trigger"
                    onClick={() => setOpenCase(openCase === i ? null : i)}
                  >
                    <div className="portfolio-trigger-left">
                      <span className="portfolio-cat">{item.category}</span>
                      <span className="portfolio-label">{item.label}</span>
                    </div>
                    <span className="portfolio-chevron">
                      {openCase === i ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </span>
                  </button>
                  <div className="portfolio-body">
                    <div className="portfolio-content">
                      <div>
                        <p className="portfolio-summary">{item.summary}</p>
                      </div>
                      <div className="portfolio-meta">
                        <div>
                          <div className="form-label" style={{ marginBottom: 8 }}>Tools Used</div>
                          <div className="portfolio-tools">
                            {item.tools.map(t => (
                              <span key={t} className="portfolio-tool">{t}</span>
                            ))}
                          </div>
                        </div>
                        <p className="portfolio-outcome">{item.outcome}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </AnimSection>
            ))}
          </div>
        </div>
      </section>

    {/* ── PRICING ─────────────────────────────────── */}
      <section id="pricing" style={{ background: C.surface, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}` }}>
        <div className="section">
          <AnimSection>
            <div className="section-label">Pricing</div>
            <h2 className="section-title">
              Select Your <span>Orbit</span>
            </h2>
            <p className="section-body">
              Transparent pricing. No surprises. Every plan includes a free
              discovery call so we can understand your data before we begin.
            </p>
          </AnimSection>

          <div className="pricing-grid">
            {plans.map((plan, i) => (
              <AnimSection key={i} delay={i * 80}>
                <div className={`pricing-card${plan.popular ? " popular" : ""}`}>
                  <div className="pricing-name">{plan.name}</div>
                  <div className="pricing-tagline">{plan.tagline}</div>
                  <div className="pricing-price">{plan.price}</div>
                  {plan.period && <div className="pricing-period">{plan.period}</div>}
                  <div className="pricing-divider" />
                  <ul className="pricing-features">
                    {plan.features.map((f, j) => (
                      <li key={j} className="pricing-feature">
                        <span className="pricing-check">
                          <Check size={11} strokeWidth={3} />
                        </span>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <button
                    className="pricing-btn"
                    onClick={() => scrollTo("contact")}
                  >
                    {plan.cta}
                  </button>
                </div>
              </AnimSection>
            ))}
          </div>
        </div>
      </section>

{/* ── CONTACT ─────────────────────────────────── */}
      <section id="contact">
        <div className="section">
          <div className="contact-grid">
            <div>
              <AnimSection>
                <div className="section-label">Contact</div>
                <h2 className="section-title">
                  Ready to<br />
                  <span>Accelerate?</span>
                </h2>
                <p className="section-body">
                  Start with a free discovery call. We'll look at your data
                  landscape and tell you exactly where the opportunities are —
                  no obligation, no fluff.
                </p>
              </AnimSection>
              <div className="contact-info">
                {[
                  { icon: <Mail size={16} />, label: "Email", value: "contact@trueorbitanalytics.com" },
                  { icon: <Phone size={16} />, label: "Phone", value: "Available upon inquiry" },
                  { icon: <MapPin size={16} />, label: "Location", value: "Remote — Nationwide" },
                ].map((item, i) => (
                  <AnimSection key={i} delay={i * 80}>
                    <div className="contact-item">
                      <div className="contact-icon">{item.icon}</div>
                      <div>
                        <div className="contact-item-label">{item.label}</div>
                        <div className="contact-item-value">{item.value}</div>
                      </div>
                    </div>
                  </AnimSection>
                ))}
              </div>
            </div>

            <AnimSection delay={200}>
  {submitted ? (
    <div style={{ textAlign: "center", padding: "80px 0" }}>
      <div style={{ fontSize: "3rem", color: C.gold, marginBottom: 16 }}>✓</div>
      <h3 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "2rem", color: C.text, marginBottom: 8 }}>Message Received</h3>
      <p style={{ color: C.muted }}>We'll be in touch shortly.</p>
    </div>
  ) : (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <div className="form-field">
          <label className="form-label">First Name</label>
          <input className="form-input" type="text" name="firstName" placeholder="Jane" />
        </div>
        <div className="form-field">
          <label className="form-label">Last Name</label>
          <input className="form-input" type="text" name="lastName" placeholder="Smith" />
        </div>
      </div>
      <div className="form-field">
        <label className="form-label">Business Email</label>
        <input className="form-input" type="email" name="email" placeholder="jane@company.com" />
      </div>
      <div className="form-field">
        <label className="form-label">Service Interest</label>
        <select className="form-select" name="service">
          <option value="">Select a service...</option>
          <option>Business Intelligence</option>
          <option>Financial Analytics</option>
          <option>Data Pipeline Architecture</option>
          <option>Predictive Modeling</option>
          <option>Performance Reporting</option>
          <option>Custom Integration</option>
        </select>
      </div>
      <div className="form-field">
        <label className="form-label">Message</label>
        <textarea
          className="form-textarea"
          name="message"
          placeholder="Tell us about your data challenges and what you're trying to achieve..."
        />
      </div>
      <div className="form-submit">
        <button type="submit" className="btn-primary">
          Send Message <ArrowRight size={16} />
        </button>
      </div>
    </form>
  )}
</AnimSection>
          </div>
        </div>
      </section>

{/* ── FOOTER ──────────────────────────────────── */}
      <footer className="footer">
        <div className="footer-inner">
          <div>
            <Image
              src="/noBgColor.png"
              alt="True Orbit Analytics"
              width={160}
              height={48}
              className="footer-logo"
              style={{ objectFit: "contain" }}
            />
            <p className="footer-tagline">
              Elite data intelligence and strategic reporting for ambitious
              enterprises. We transform your raw data into decisive action.
            </p>
          </div>
          <div>
            <div className="footer-col-title">Navigation</div>
            <ul className="footer-links">
              {["services","about","portfolio","pricing","contact"].map(id => (
                <li key={id}>
                  <a onClick={() => scrollTo(id)}>
                    {id.charAt(0).toUpperCase() + id.slice(1)}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="footer-col-title">Contact</div>
            <ul className="footer-links">
              <li><a>contact@trueorbitanalytics.com</a></li>
              <li><a>Remote — Nationwide</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} True Orbit Analytics. All rights reserved.</span>
          <span style={{ color: C.goldDim }}>Accelerate With Analytics</span>
        </div>
      </footer>
    </>
  );
}
