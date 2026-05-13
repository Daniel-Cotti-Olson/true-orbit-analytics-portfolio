"use client";

import DeliverablesSection from "@/components/IntegrationDeliverablesSection";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Link2, Database, Layers, Zap, Shield,
  CheckCircle, ArrowRight, GitMerge, RefreshCw,
  Settings, Cpu, BarChart2, Menu, X
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
    icon: <GitMerge size={24} />,
    title: "CRM Integration",
    desc: "Connect Salesforce, HubSpot, Pipedrive, or any CRM to your analytics environment. Customer data flows directly into your dashboards — no exports, no manual syncing.",
  },
  {
    icon: <Database size={24} />,
    title: "ERP & Accounting Connections",
    desc: "Bridge your ERP or accounting platform — QuickBooks, NetSuite, SAP, Xero — directly into your reporting infrastructure. Financial data unified without duplication.",
  },
  {
    icon: <Zap size={24} />,
    title: "Marketing Stack Integration",
    desc: "Pull live data from your ad platforms, email tools, and web analytics into a single environment. See acquisition cost, conversion rates, and ROI across every channel in one view.",
  },
  {
    icon: <RefreshCw size={24} />,
    title: "Automated Data Pipelines",
    desc: "Scheduled ETL pipelines that extract, transform, and load data from every source on your cadence. Fresh, clean data waiting when you need it — without anyone pressing a button.",
  },
  {
    icon: <Shield size={24} />,
    title: "Data Normalization & Governance",
    desc: "Cross-system data cleaned, deduplicated, and standardized into a single source of truth. One definition of revenue. One definition of a customer. Everywhere.",
  },
  {
    icon: <BarChart2 size={24} />,
    title: "Unified Analytics Environment",
    desc: "All integrated sources surfaced inside your preferred BI platform — Power BI, Looker, Tableau, or Metabase. One place for every number your business runs on.",
  },
];

const problems = [
  "Sales, finance, and marketing each using different numbers for the same metric",
  "Hours wasted every week manually exporting data from five systems into one spreadsheet",
  "Decisions delayed because the right data lives in the wrong tool — or hasn't been pulled yet",
  "No single view of the customer across CRM, billing, support, and product",
  "Reporting that's always one system behind because integrations break and nobody notices",
  "Analytics investment that can't be fully leveraged because the data isn't connected",
];

const platforms = [
  { category: "CRM", tools: ["Salesforce", "HubSpot", "Pipedrive", "Zoho"] },
  { category: "Finance", tools: ["QuickBooks", "Xero", "NetSuite", "SAP"] },
  { category: "Marketing", tools: ["Google Ads", "Meta Ads", "Klaviyo", "Mailchimp"] },
  { category: "Analytics", tools: ["Google Analytics", "Mixpanel", "Segment", "Amplitude"] },
  { category: "BI Platforms", tools: ["Power BI", "Looker", "Tableau", "Metabase"] },
  { category: "Infrastructure", tools: ["Snowflake", "BigQuery", "Postgres", "MySQL"] },
];

const forWho = [
  { label: "Data-fragmented businesses", desc: "Running 5+ disconnected tools with no unified view of operations, customers, or performance" },
  { label: "Analytics-ready organizations", desc: "That have invested in BI but can't fully leverage it because the underlying data isn't connected" },
  { label: "Scaling operations teams", desc: "Where manual data work is consuming hours that should be spent on analysis and decision-making" },
  { label: "Multi-system enterprises", desc: "With complex CRM, ERP, and marketing stacks that need to speak to each other reliably" },
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

export default function CustomIntegrationsPage() {
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

        /* Unique hero element: animated node-connection lines */
        .hero-nodes {
          position: absolute; inset: 0;
          pointer-events: none; overflow: hidden;
        }
        .node {
          position: absolute;
          width: 8px; height: 8px; border-radius: 50%;
          background: ${C.goldDim};
          animation: node-pulse 3s ease-in-out infinite;
        }
        .node::after {
          content: '';
          position: absolute; inset: -4px;
          border-radius: 50%;
          border: 1px solid rgba(201,168,76,0.2);
          animation: node-ring 3s ease-in-out infinite;
        }
        @keyframes node-pulse {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50%       { opacity: 0.8; transform: scale(1.3); }
        }
        @keyframes node-ring {
          0%, 100% { transform: scale(1); opacity: 0.4; }
          50%       { transform: scale(2.5); opacity: 0; }
        }
        .connector-line {
          position: absolute;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(201,168,76,0.15), transparent);
          transform-origin: left center;
          animation: line-flow 4s ease-in-out infinite;
        }
        @keyframes line-flow {
          0%, 100% { opacity: 0; }
          30%, 70% { opacity: 1; }
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
          background: ${C.bg}; border: 1px solid ${C.border};
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

        /* ── Platform grid — unique to this page ── */
        .platforms-section {
          background: ${C.surface};
          border-top: 1px solid ${C.border};
          border-bottom: 1px solid ${C.border};
          padding: 100px 0;
        }
        .platforms-grid {
          display: grid; grid-template-columns: repeat(3,1fr);
          gap: 16px; margin-top: 56px;
        }
        .platform-card {
          border: 1px solid ${C.border}; border-radius: 4px;
          background: ${C.bg}; overflow: hidden;
          transition: border-color 0.2s;
        }
        .platform-card:hover { border-color: ${C.goldDim}; }
        .platform-card-header {
          padding: 16px 20px;
          border-bottom: 1px solid ${C.border};
          background: rgba(201,168,76,0.04);
          font-size: 11px; font-weight: 700;
          letter-spacing: 0.18em; text-transform: uppercase;
          color: ${C.gold}; display: flex; align-items: center; gap: 8px;
        }
        .platform-card-header::before {
          content: ''; width: 6px; height: 6px;
          border-radius: 50%; background: ${C.gold};
          flex-shrink: 0;
        }
        .platform-tools {
          padding: 16px 20px;
          display: flex; flex-direction: column; gap: 10px;
        }
        .platform-tool {
          font-size: 13px; color: ${C.muted}; font-weight: 300;
          display: flex; align-items: center; gap: 10px;
          padding: 8px 0;
          border-bottom: 1px solid rgba(26,37,64,0.5);
          transition: color 0.2s;
        }
        .platform-tool:last-child { border-bottom: none; }
        .platform-tool:hover { color: ${C.text}; }
        .platform-tool-dot {
          width: 4px; height: 4px; border-radius: 50%;
          background: ${C.goldDim}; flex-shrink: 0;
        }

        /* ── Methodology steps ── */
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
          .hero-nodes { display: none; }
          .section { padding: 64px 24px; }
          .problem-section { padding: 64px 0; }
          .problem-grid { grid-template-columns: 1fr; gap: 40px; }
          .deliverables-grid { grid-template-columns: 1fr; }
          .platforms-section { padding: 64px 0; }
          .platforms-grid { grid-template-columns: 1fr 1fr; }
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
          .platforms-grid { grid-template-columns: 1fr; }
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

        {/* Animated node-connection decoration */}
        <div className="hero-nodes">
          {[
            { top: "30%", left: "8%",  delay: "0s" },
            { top: "55%", left: "14%", delay: "1s" },
            { top: "70%", left: "6%",  delay: "2s" },
            { top: "25%", right: "10%", delay: "0.5s" },
            { top: "50%", right: "7%",  delay: "1.5s" },
            { top: "75%", right: "12%", delay: "2.5s" },
          ].map((n, i) => (
            <div key={i} className="node" style={{ top: n.top, left: n.left, right: (n as any).right, animationDelay: n.delay }} />
          ))}
          {[
            { top: "42%", left: "8%",  width: "6%",  delay: "0.8s" },
            { top: "62%", left: "14%", width: "5%",  delay: "1.8s" },
            { top: "37%", right: "10%", width: "6%", delay: "1.2s" },
            { top: "62%", right: "7%",  width: "5%", delay: "2.2s" },
          ].map((l, i) => (
            <div key={i} className="connector-line" style={{ top: l.top, left: l.left, right: (l as any).right, width: l.width, animationDelay: l.delay }} />
          ))}
        </div>

        <div className="breadcrumb">
          <a href="/">Home</a>
          <span>›</span>
          <a href="/#services">Services</a>
          <span>›</span>
          <span style={{ color: C.muted }}>Custom Integrations</span>
        </div>
        <p className="hero-eyebrow">Custom Integrations</p>
        <h1 className="hero-title">
          Every Tool You Use.<br />
          <span>One Unified Truth.</span>
        </h1>
        <p className="hero-sub">
          Connect your CRM, ERP, marketing stack, and financial tools into
          one unified analytics environment. No more data silos, no more
          manual exports, no more conflicting numbers from different systems.
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
                Your Data Lives<br />
                <span>Everywhere But Together.</span>
              </h2>
              <p className="section-body">
                The average business runs eight to twelve software tools.
                Each one holds a piece of the truth. None of them talk to
                each other automatically. The result is a fragmented data
                landscape where the full picture never comes into focus.
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
                <span className="solution-number">06</span>
                <div className="solution-headline">
                  One environment.<br />
                  <span>Every source.</span>
                </div>
                <p className="solution-body">
                  Custom Integrations connect every tool your business
                  depends on into a single, structured analytics environment.
                  Your CRM, your financials, your marketing data, your
                  operations — unified under one roof, on one platform, with
                  one definition of every metric that matters.
                  <br /><br />
                  The result isn't just cleaner data. It's a business that
                  makes decisions faster, with more confidence, and with
                  zero time wasted chasing numbers across systems.
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
        End-to-end integration work — from the first data source
        connection to the final unified dashboard. Built to run
        reliably without ongoing manual intervention.
      </p>
    </AnimSection>
    <DeliverablesSection />
  </div>
</section>

      {/* ── PLATFORMS ── */}
      <div className="platforms-section">
        <div className="section" style={{ padding: "0 48px" }}>
          <AnimSection>
            <div className="section-label">Compatibility</div>
            <h2 className="section-title">
              Platforms We <span>Connect</span>
            </h2>
            <p className="section-body">
              We work across the tools your business already runs — no
              platform switching required. If it has an API or a data
              export, we can integrate it.
            </p>
          </AnimSection>

          <div className="platforms-grid">
            {platforms.map((p, i) => (
              <AnimSection key={i} delay={i * 60}>
                <div className="platform-card">
                  <div className="platform-card-header">{p.category}</div>
                  <div className="platform-tools">
                    {p.tools.map((tool, j) => (
                      <div key={j} className="platform-tool">
                        <div className="platform-tool-dot" />
                        {tool}
                      </div>
                    ))}
                  </div>
                </div>
              </AnimSection>
            ))}
          </div>
        </div>
      </div>

      {/* ── METHODOLOGY ── */}
      <div className="methodology-section">
        <div className="section" style={{ padding: "0 48px" }}>
          <AnimSection>
            <div className="section-label">How It Works</div>
            <h2 className="section-title">
              Our <span>Methodology</span>
            </h2>
            <p className="section-body">
              From systems audit to live unified environment — a four-step
              process that eliminates data fragmentation without disrupting
              your operations.
            </p>
          </AnimSection>

          <div className="steps">
            {[
              {
                n: "01",
                title: "Systems Audit & Integration Mapping",
                desc: "We start by cataloguing every tool your business uses and every data source it generates. We map the relationships between systems — what should talk to what, where the overlaps are, and where the critical gaps exist that are costing you visibility.",
              },
              {
                n: "02",
                title: "API & Data Source Connection",
                desc: "We build the direct connections between your tools and your analytics environment using native APIs, webhooks, or custom connectors. Each integration is tested for reliability, latency, and data fidelity before it goes live.",
              },
              {
                n: "03",
                title: "Data Normalization & Single Source of Truth",
                desc: "Raw data from different systems rarely speaks the same language. We normalize field names, resolve definitional conflicts, deduplicate records, and establish the canonical definitions that every report and dashboard will draw from.",
              },
              {
                n: "04",
                title: "Unified Dashboard Deployment & Monitoring",
                desc: "The integrated data environment is surfaced inside your chosen BI platform with dashboards built for each stakeholder audience. We monitor pipeline health continuously and alert you immediately if any integration breaks — before it affects your reporting.",
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
              Custom Integrations delivers the most value to businesses where
              data fragmentation is actively costing time, accuracy, or
              decision quality.
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
              Integration Work<br />
              <span>Built on Real Systems</span>
            </h2>
            <p className="section-body" style={{ marginBottom: 32 }}>
              Our integration methodology comes from hands-on experience
              connecting real data environments — not theoretical architecture.
              We know where integrations break and how to build them so they don't.
            </p>
            <div className="case-study-card">
              <span className="case-tag">Case Study</span>
              <div className="case-title">Multi-Source Analytics Environment Build</div>
              <p className="case-body">
                Designed and built a unified data environment consolidating
                investment account data, transaction history, performance
                metrics, and market reference data from multiple sources into
                a single structured pipeline. Automated daily refresh cycles
                with anomaly detection to flag data integrity issues before
                they propagated into reports.
              </p>
              <p className="case-outcome">
                Eliminated all manual data consolidation work and established
                a single source of truth — the same architecture we replicate
                for your business systems.
              </p>
            </div>
          </AnimSection>

          <AnimSection delay={200}>
            <div className="case-stats">
              {[
                { value: "6+", label: "Platform Categories Supported" },
                { value: "0hrs", label: "Manual Export Work Once Integrated" },
                { value: "1", label: "Source of Truth Across All Systems" },
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
            Ready to Connect<br />
            <span>Your Entire Data Stack?</span>
          </h2>
          <p className="cta-sub">
            Start with a free discovery call. We'll audit your current
            tool landscape and show you exactly what a unified integration
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
          <span style={{ color: C.goldDim }}>Accelerate With Analytics</span>
        </div>
      </footer>
    </>
  );
}
