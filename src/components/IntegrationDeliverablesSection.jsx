"use client";

import { useState, useCallback } from "react";
import {
  GitMerge, Database, Zap, RefreshCw, Shield, BarChart2,
  X, ArrowRight, Check, CheckCircle, AlertCircle, Clock
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

// ── data ───────────────────────────────────────────────────────────────────

const deliverables = [
  {
    icon: <GitMerge size={24} />,
    title: "CRM Integration",
    desc: "Connect Salesforce, HubSpot, Pipedrive, or any CRM to your analytics environment. Customer data flows directly into your dashboards — no exports, no manual syncing.",
    modal: {
      tagline: "Your customer data, always current, always connected.",
      overview:
        "Your CRM holds the most valuable commercial data in your business — pipeline stages, deal values, contact history, conversion rates. CRM Integration pulls that data directly into your analytics environment on a live schedule, so every dashboard and report reflects what's actually happening in your sales motion right now.",
      visual: {
        type: "crm-flow",
        sources: ["Salesforce", "HubSpot", "Pipedrive", "Zoho CRM"],
        metrics: [
          { label: "Pipeline Value",   value: "$2.4M",  delta: "+12%", up: true  },
          { label: "Open Deals",       value: "184",    delta: "+8",   up: true  },
          { label: "Avg Deal Cycle",   value: "24 days",delta: "-3d",  up: true  },
          { label: "Win Rate",         value: "38%",    delta: "+4pp", up: true  },
        ],
        stages: [
          { name: "Prospecting", count: 62, pct: 100 },
          { name: "Qualified",   count: 41, pct: 66  },
          { name: "Proposal",    count: 27, pct: 44  },
          { name: "Negotiation", count: 14, pct: 23  },
          { name: "Closed Won",  count: 9,  pct: 15  },
        ],
      },
      bullets: [
        "Live sync from Salesforce, HubSpot, Pipedrive, Zoho, and custom CRMs",
        "Pipeline stage data, deal values, and contact history all connected",
        "Sales performance metrics surfaced directly in your BI platform",
        "No more manual exports — data refreshes on your defined schedule",
      ],
    },
  },
  {
    icon: <Database size={24} />,
    title: "ERP & Accounting Connections",
    desc: "Bridge your ERP or accounting platform — QuickBooks, NetSuite, SAP, Xero — directly into your reporting infrastructure. Financial data unified without duplication.",
    modal: {
      tagline: "Your financial truth in one place — not four.",
      overview:
        "ERPs and accounting platforms are the source of record for your business's financial reality. ERP & Accounting Connections bridges those systems directly into your analytics environment — so revenue, costs, payables, and receivables are always current, always consistent, and never require a manual export to see.",
      visual: {
        type: "erp-reconciliation",
        platforms: ["QuickBooks", "NetSuite", "SAP", "Xero"],
        accounts: [
          { name: "Revenue (GL)",        before: "Manual pull — weekly", after: "Live sync",  status: "resolved" },
          { name: "COGS",                before: "3 sources, conflicting", after: "Unified",  status: "resolved" },
          { name: "Accounts Payable",    before: "ERP only, no dashboard", after: "Integrated",status: "resolved"},
          { name: "Accounts Receivable", before: "Spreadsheet export",   after: "Automated", status: "resolved" },
          { name: "Payroll Expenses",    before: "Manual entry",         after: "Pipeline",  status: "resolved" },
        ],
      },
      bullets: [
        "QuickBooks, NetSuite, SAP, Xero, and custom ERP systems supported",
        "GL accounts, P&L, balance sheet, and cash flow all connected",
        "Eliminates duplicate data entry and conflicting financial figures",
        "Financial reports always reflect the same number, everywhere",
      ],
    },
  },
  {
    icon: <Zap size={24} />,
    title: "Marketing Stack Integration",
    desc: "Pull live data from your ad platforms, email tools, and web analytics into a single environment. See acquisition cost, conversion rates, and ROI across every channel in one view.",
    modal: {
      tagline: "See every channel's ROI. In one view.",
      overview:
        "Marketing data is scattered across the most platforms of any function in the business. Marketing Stack Integration consolidates your ad spend, email performance, web analytics, and conversion data into one unified environment — so you can see true cross-channel ROI without toggling between six dashboards.",
      visual: {
        type: "marketing-channels",
        channels: [
          { name: "Google Ads",    spend: "$18.4K", leads: 142, cpl: "$130", roas: "3.8x", color: "#4285F4" },
          { name: "Meta Ads",     spend: "$12.1K", leads: 89,  cpl: "$136", roas: "2.9x", color: "#1877F2" },
          { name: "Email (Klaviyo)", spend: "$1.2K", leads: 204, cpl: "$6",  roas: "14.2x",color: "#FFB300"},
          { name: "Organic / SEO", spend: "$0",     leads: 67,  cpl: "$0",  roas: "∞",    color: C.gold   },
        ],
        totals: { spend: "$31.7K", leads: 502, blendedCPL: "$63", blendedROAS: "5.1x" },
      },
      bullets: [
        "Google Ads, Meta, LinkedIn, TikTok, and email platforms all connected",
        "Web analytics (GA4, Mixpanel, Segment) pulled alongside ad data",
        "True blended CPL and ROAS calculated across every channel",
        "Attribution model applied consistently — one source of marketing truth",
      ],
    },
  },
  {
    icon: <RefreshCw size={24} />,
    title: "Automated Data Pipelines",
    desc: "Scheduled ETL pipelines that extract, transform, and load data from every source on your cadence. Fresh, clean data waiting when you need it — without anyone pressing a button.",
    modal: {
      tagline: "Data that's always ready. No one pressing buttons.",
      overview:
        "Manual data work doesn't scale. Automated Data Pipelines replace every scheduled export, copy-paste operation, and manual refresh with a reliable, monitored ETL process. Data is extracted from your sources, transformed to your schema, and loaded into your analytics environment on your schedule — automatically, every time.",
      visual: {
        type: "pipeline-status",
        pipelines: [
          { name: "CRM → Data Warehouse",        schedule: "Every 15 min", lastRun: "4 min ago",   status: "healthy", records: "12,840" },
          { name: "QuickBooks → Analytics DB",    schedule: "Daily 2:00 AM", lastRun: "6 hrs ago",  status: "healthy", records: "4,210"  },
          { name: "Google Ads → Reporting Layer", schedule: "Every 1 hr",   lastRun: "48 min ago",  status: "healthy", records: "8,030"  },
          { name: "ERP → Finance Schema",         schedule: "Daily 3:00 AM", lastRun: "5 hrs ago",  status: "healthy", records: "22,400" },
          { name: "Email Platform → CRM Sync",    schedule: "Every 30 min", lastRun: "12 min ago",  status: "warning", records: "—"      },
        ],
      },
      bullets: [
        "Fully automated ETL — extract, transform, and load on your schedule",
        "Pipeline health monitoring with alerts if any job fails or stalls",
        "Incremental loads minimize processing time and infrastructure cost",
        "Schema versioning ensures transforms don't break when sources change",
      ],
    },
  },
  {
    icon: <Shield size={24} />,
    title: "Data Normalization & Governance",
    desc: "Cross-system data cleaned, deduplicated, and standardized into a single source of truth. One definition of revenue. One definition of a customer. Everywhere.",
    modal: {
      tagline: "One definition of everything. No exceptions.",
      overview:
        "Different systems have different field names, different schemas, and different definitions for the same concepts. Data Normalization & Governance resolves those conflicts at the data layer — before they reach your reports. One canonical definition for every metric, enforced across every system that touches your data.",
      visual: {
        type: "normalization-map",
        conflicts: [
          {
            metric: "Revenue",
            systems: [
              { source: "Salesforce",  raw: "Amount",          normalized: "total_revenue" },
              { source: "QuickBooks",  raw: "TotalAmt",        normalized: "total_revenue" },
              { source: "Stripe",      raw: "amount_received", normalized: "total_revenue" },
            ],
          },
          {
            metric: "Customer",
            systems: [
              { source: "HubSpot",     raw: "Contact / Company",  normalized: "customer_id" },
              { source: "NetSuite",    raw: "Entity",             normalized: "customer_id" },
              { source: "Intercom",    raw: "User",               normalized: "customer_id" },
            ],
          },
        ],
      },
      bullets: [
        "Field mapping and schema normalization across every connected system",
        "Duplicate records identified and merged using configurable match rules",
        "Canonical metric definitions documented and enforced at the pipeline layer",
        "Data quality scores tracked per source so you know what you can trust",
      ],
    },
  },
  {
    icon: <BarChart2 size={24} />,
    title: "Unified Analytics Environment",
    desc: "All integrated sources surfaced inside your preferred BI platform — Power BI, Looker, Tableau, or Metabase. One place for every number your business runs on.",
    modal: {
      tagline: "Every number your business runs on. One place.",
      overview:
        "The Unified Analytics Environment is the end state all the integration work builds toward — a single BI platform where every data source your business depends on is available, current, and consistent. Built on the platform you already have or the one we recommend for your scale, with dashboards designed for every stakeholder who needs to see it.",
      visual: {
        type: "unified-dashboard",
        platforms: ["Power BI", "Looker", "Tableau", "Metabase"],
        views: [
          { role: "CEO",        metrics: ["ARR", "Gross Margin", "Burn Rate", "Runway"],          refresh: "Daily"    },
          { role: "Sales",      metrics: ["Pipeline", "Win Rate", "Quota Attainment", "Churn"],   refresh: "15 min"   },
          { role: "Finance",    metrics: ["Revenue", "COGS", "AP/AR", "Cash Position"],           refresh: "Daily"    },
          { role: "Marketing",  metrics: ["CAC", "ROAS", "Leads by Channel", "Blended CPL"],      refresh: "Hourly"   },
        ],
      },
      bullets: [
        "Deployed on Power BI, Looker, Tableau, Metabase, or your existing platform",
        "Role-based views so each stakeholder sees exactly what they need",
        "All sources in one place — no toggling between tools to reconcile numbers",
        "Pipeline health monitoring ensures dashboards are always current",
      ],
    },
  },
];

// ── visual sub-components ────────────────────────────────────────────────────

function CrmFlowVisual({ v }) {
  return (
    <div style={{ background: C.bg, border: `1px solid ${C.border}`, borderRadius: 4, padding: 20 }}>
      {/* KPI row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8, marginBottom: 20 }}>
        {v.metrics.map((m, i) => (
          <div key={i} style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 4, padding: "12px 14px" }}>
            <div style={{ fontSize: 11, color: C.dim, marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.1em" }}>{m.label}</div>
            <div style={{ fontSize: 18, fontFamily: "'Cormorant Garamond', serif", color: C.text, fontWeight: 700 }}>{m.value}</div>
            <div style={{ fontSize: 11, color: m.up ? "#4ade80" : "#f87171", marginTop: 2 }}>{m.delta}</div>
          </div>
        ))}
      </div>
      {/* Pipeline funnel */}
      <div style={{ fontSize: 10, color: C.dim, textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 10 }}>Pipeline Funnel</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {v.stages.map((s, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 100, fontSize: 12, color: C.muted, flexShrink: 0 }}>{s.name}</div>
            <div style={{ flex: 1, background: C.surface, borderRadius: 2, height: 20, overflow: "hidden" }}>
              <div style={{
                width: `${s.pct}%`, height: "100%",
                background: `linear-gradient(90deg, ${C.goldDim}, ${C.gold})`,
                opacity: 0.5 + (i * 0.1),
                borderRadius: 2,
                transition: "width 0.8s ease",
              }} />
            </div>
            <div style={{ width: 28, fontSize: 12, color: C.dim, textAlign: "right", flexShrink: 0 }}>{s.count}</div>
          </div>
        ))}
      </div>
      {/* Source pills */}
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 16 }}>
        {v.sources.map((s, i) => (
          <div key={i} style={{ fontSize: 10, color: C.goldDim, border: `1px solid ${C.goldDim}`, borderRadius: 2, padding: "3px 8px", letterSpacing: "0.08em" }}>
            {s}
          </div>
        ))}
        <div style={{ fontSize: 10, color: C.dim, padding: "3px 8px", letterSpacing: "0.08em", alignSelf: "center" }}>+ custom CRMs</div>
      </div>
    </div>
  );
}

function ErpReconciliationVisual({ v }) {
  return (
    <div style={{ background: C.bg, border: `1px solid ${C.border}`, borderRadius: 4, padding: 20 }}>
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 16 }}>
        {v.platforms.map((p, i) => (
          <div key={i} style={{ fontSize: 10, color: C.goldDim, border: `1px solid ${C.goldDim}`, borderRadius: 2, padding: "3px 8px" }}>{p}</div>
        ))}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
        {/* Header */}
        <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1.4fr 1.2fr 80px", gap: 8, padding: "8px 12px", fontSize: 10, color: C.dim, textTransform: "uppercase", letterSpacing: "0.12em" }}>
          <span>Account</span><span>Before</span><span>After</span><span>Status</span>
        </div>
        {v.accounts.map((a, i) => (
          <div key={i} style={{
            display: "grid", gridTemplateColumns: "1.2fr 1.4fr 1.2fr 80px", gap: 8,
            padding: "10px 12px", background: C.surface,
            borderRadius: i === 0 ? "4px 4px 0 0" : i === v.accounts.length - 1 ? "0 0 4px 4px" : 0,
            fontSize: 12,
          }}>
            <span style={{ color: C.text, fontWeight: 500 }}>{a.name}</span>
            <span style={{ color: "#f87171", display: "flex", alignItems: "center", gap: 6 }}>
              <AlertCircle size={11} /> {a.before}
            </span>
            <span style={{ color: "#4ade80" }}>{a.after}</span>
            <span>
              <CheckCircle size={13} color="#4ade80" />
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function MarketingChannelsVisual({ v }) {
  const maxSpend = Math.max(...v.channels.map(c => parseFloat(c.spend.replace(/[$K,]/g, "")) || 0));
  return (
    <div style={{ background: C.bg, border: `1px solid ${C.border}`, borderRadius: 4, padding: 20 }}>
      {/* Totals bar */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8, marginBottom: 20 }}>
        {[
          { label: "Total Spend", value: v.totals.spend },
          { label: "Total Leads",  value: v.totals.leads },
          { label: "Blended CPL",  value: v.totals.blendedCPL },
          { label: "Blended ROAS", value: v.totals.blendedROAS },
        ].map((t, i) => (
          <div key={i} style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 4, padding: "10px 12px" }}>
            <div style={{ fontSize: 10, color: C.dim, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 4 }}>{t.label}</div>
            <div style={{ fontSize: 16, color: C.gold, fontFamily: "'Cormorant Garamond', serif", fontWeight: 700 }}>{t.value}</div>
          </div>
        ))}
      </div>
      {/* Channel rows */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {v.channels.map((ch, i) => {
          const spendNum = parseFloat(ch.spend.replace(/[$K,]/g, "")) || 0;
          const pct = maxSpend > 0 ? (spendNum / maxSpend) * 100 : 0;
          return (
            <div key={i} style={{ background: C.surface, borderRadius: 4, padding: "12px 14px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: ch.color, flexShrink: 0 }} />
                  <span style={{ fontSize: 13, color: C.text, fontWeight: 500 }}>{ch.name}</span>
                </div>
                <div style={{ display: "flex", gap: 16, fontSize: 11, color: C.muted }}>
                  <span>Spend: <b style={{ color: C.text }}>{ch.spend}</b></span>
                  <span>CPL: <b style={{ color: C.text }}>{ch.cpl}</b></span>
                  <span>ROAS: <b style={{ color: C.gold }}>{ch.roas}</b></span>
                </div>
              </div>
              <div style={{ background: C.border, borderRadius: 2, height: 4, overflow: "hidden" }}>
                <div style={{ width: `${pct}%`, height: "100%", background: ch.color, borderRadius: 2 }} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function PipelineStatusVisual({ v }) {
  const statusColors = { healthy: "#4ade80", warning: "#fbbf24", error: "#f87171" };
  const statusLabels = { healthy: "Healthy", warning: "Warning", error: "Error" };
  return (
    <div style={{ background: C.bg, border: `1px solid ${C.border}`, borderRadius: 4, padding: 20 }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.8fr 0.9fr 0.9fr 0.7fr 80px", gap: 8, padding: "8px 12px", fontSize: 10, color: C.dim, textTransform: "uppercase", letterSpacing: "0.1em" }}>
          <span>Pipeline</span><span>Schedule</span><span>Last Run</span><span>Records</span><span>Status</span>
        </div>
        {v.pipelines.map((p, i) => (
          <div key={i} style={{
            display: "grid", gridTemplateColumns: "1.8fr 0.9fr 0.9fr 0.7fr 80px", gap: 8,
            padding: "11px 12px", background: C.surface,
            borderRadius: i === 0 ? "4px 4px 0 0" : i === v.pipelines.length - 1 ? "0 0 4px 4px" : 0,
            alignItems: "center",
          }}>
            <span style={{ fontSize: 12, color: C.text, fontWeight: 500 }}>{p.name}</span>
            <span style={{ fontSize: 11, color: C.muted }}>{p.schedule}</span>
            <span style={{ fontSize: 11, color: C.dim, display: "flex", alignItems: "center", gap: 4 }}>
              <Clock size={10} /> {p.lastRun}
            </span>
            <span style={{ fontSize: 11, color: C.muted }}>{p.records}</span>
            <span style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11, color: statusColors[p.status] }}>
              <div style={{ width: 7, height: 7, borderRadius: "50%", background: statusColors[p.status], flexShrink: 0 }} />
              {statusLabels[p.status]}
            </span>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 14, fontSize: 11, color: C.dim, fontStyle: "italic" }}>
        ↳ All pipelines monitored continuously. Alerts triggered on failure before reports are affected.
      </div>
    </div>
  );
}

function NormalizationMapVisual({ v }) {
  return (
    <div style={{ background: C.bg, border: `1px solid ${C.border}`, borderRadius: 4, padding: 20, display: "flex", flexDirection: "column", gap: 16 }}>
      {v.conflicts.map((conflict, ci) => (
        <div key={ci}>
          <div style={{ fontSize: 10, color: C.gold, textTransform: "uppercase", letterSpacing: "0.18em", marginBottom: 10 }}>
            Metric: <strong>{conflict.metric}</strong>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {conflict.systems.map((s, si) => (
              <div key={si} style={{ display: "grid", gridTemplateColumns: "100px 1fr 16px 1fr", gap: 8, alignItems: "center", background: C.surface, borderRadius: 4, padding: "9px 14px" }}>
                <div style={{ fontSize: 11, color: C.dim }}>{s.source}</div>
                <div style={{ fontSize: 12, color: "#f87171", fontFamily: "monospace", background: "rgba(248,113,113,0.06)", padding: "2px 8px", borderRadius: 2 }}>{s.raw}</div>
                <ArrowRight size={12} color={C.goldDim} style={{ justifySelf: "center" }} />
                <div style={{ fontSize: 12, color: "#4ade80", fontFamily: "monospace", background: "rgba(74,222,128,0.06)", padding: "2px 8px", borderRadius: 2 }}>{s.normalized}</div>
              </div>
            ))}
          </div>
          {ci < v.conflicts.length - 1 && (
            <div style={{ height: 1, background: C.border, marginTop: 16 }} />
          )}
        </div>
      ))}
      <div style={{ fontSize: 11, color: C.dim, fontStyle: "italic" }}>
        ↳ Every field name conflict resolved at the pipeline layer — before it reaches your reports.
      </div>
    </div>
  );
}

function UnifiedDashboardVisual({ v }) {
  return (
    <div style={{ background: C.bg, border: `1px solid ${C.border}`, borderRadius: 4, padding: 20 }}>
      {/* Platform pills */}
      <div style={{ display: "flex", gap: 6, marginBottom: 18, flexWrap: "wrap" }}>
        {v.platforms.map((p, i) => (
          <div key={i} style={{ fontSize: 10, color: C.goldDim, border: `1px solid ${C.goldDim}`, borderRadius: 2, padding: "3px 8px" }}>{p}</div>
        ))}
      </div>
      {/* Role views */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {v.views.map((view, i) => (
          <div key={i} style={{ background: C.surface, borderRadius: 4, padding: "12px 14px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
              <div style={{ fontSize: 12, color: C.text, fontWeight: 600 }}>{view.role} View</div>
              <div style={{ fontSize: 10, color: C.dim, display: "flex", alignItems: "center", gap: 4 }}>
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#4ade80" }} />
                Refreshes {view.refresh}
              </div>
            </div>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {view.metrics.map((m, j) => (
                <div key={j} style={{ fontSize: 11, color: C.muted, background: C.bg, border: `1px solid ${C.border}`, borderRadius: 2, padding: "3px 9px" }}>
                  {m}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ModalVisual({ v }) {
  switch (v.type) {
    case "crm-flow":          return <CrmFlowVisual v={v} />;
    case "erp-reconciliation": return <ErpReconciliationVisual v={v} />;
    case "marketing-channels": return <MarketingChannelsVisual v={v} />;
    case "pipeline-status":    return <PipelineStatusVisual v={v} />;
    case "normalization-map":  return <NormalizationMapVisual v={v} />;
    case "unified-dashboard":  return <UnifiedDashboardVisual v={v} />;
    default: return null;
  }
}

// ── modal ────────────────────────────────────────────────────────────────────

function DeliverableModal({ item, onClose }) {
  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 1000,
        background: "rgba(8,13,26,0.85)",
        backdropFilter: "blur(6px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "24px 16px",
        animation: "fadeInOverlay 0.2s ease",
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: C.surface,
          border: `1px solid ${C.border}`,
          borderRadius: 4,
          width: "100%", maxWidth: 720,
          maxHeight: "90vh", overflowY: "auto",
          animation: "slideUpModal 0.3s ease",
          position: "relative",
        }}
      >
        {/* Top accent line */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, ${C.goldDim}, ${C.gold}, ${C.goldDim})` }} />

        {/* Header */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", padding: "28px 32px 20px", gap: 16 }}>
          <div>
            <div style={{
              width: 44, height: 44, border: `1px solid ${C.goldDim}`,
              borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center",
              color: C.gold, marginBottom: 16,
              background: "rgba(201,168,76,0.08)",
            }}>
              {item.icon}
            </div>
            <div style={{ fontSize: 10, color: C.gold, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 6 }}>Integration Deliverable</div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.9rem", fontWeight: 700, color: C.text, margin: 0, lineHeight: 1.1 }}>
              {item.title}
            </h2>
            <p style={{ fontSize: 13, color: C.gold, fontStyle: "italic", marginTop: 6 }}>{item.modal.tagline}</p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            style={{
              background: "none", border: `1px solid ${C.border}`,
              borderRadius: 4, width: 36, height: 36,
              display: "flex", alignItems: "center", justifyContent: "center",
              color: C.dim, cursor: "pointer",
              transition: "border-color 0.2s, color 0.2s", flexShrink: 0,
            }}
            onMouseOver={e => { e.currentTarget.style.borderColor = C.goldDim; e.currentTarget.style.color = C.gold; }}
            onMouseOut={e  => { e.currentTarget.style.borderColor = C.border;  e.currentTarget.style.color = C.dim;  }}
          >
            <X size={16} />
          </button>
        </div>

        <div style={{ padding: "0 32px 32px" }}>
          <p style={{ fontSize: 14, color: C.muted, lineHeight: 1.8, fontWeight: 300, marginBottom: 24 }}>
            {item.modal.overview}
          </p>

          <div style={{ marginBottom: 24 }}>
            <ModalVisual v={item.modal.visual} />
          </div>

          {/* Bullets */}
          <div style={{
            background: C.bg, border: `1px solid ${C.border}`,
            borderRadius: 4, padding: "16px 20px",
            display: "flex", flexDirection: "column", gap: 10,
          }}>
            {item.modal.bullets.map((b, i) => (
              <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                <div style={{
                  width: 18, height: 18, borderRadius: "50%",
                  background: "rgba(201,168,76,0.12)", border: `1px solid ${C.goldDim}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0, marginTop: 1,
                }}>
                  <Check size={10} color={C.gold} />
                </div>
                <span style={{ fontSize: 13, color: C.muted, lineHeight: 1.6 }}>{b}</span>
              </div>
            ))}
          </div>

          <button
            onClick={() => { window.location.href = "/#contact"; }}
            style={{
              marginTop: 24, width: "100%",
              background: `linear-gradient(135deg, ${C.goldDim}, ${C.gold})`,
              color: C.bg, border: "none",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase",
              padding: "14px 24px", borderRadius: 2, cursor: "pointer",
              display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8,
              transition: "opacity 0.2s, transform 0.2s",
            }}
            onMouseOver={e => { e.currentTarget.style.opacity = "0.9"; e.currentTarget.style.transform = "translateY(-1px)"; }}
            onMouseOut={e  => { e.currentTarget.style.opacity = "1";   e.currentTarget.style.transform = "translateY(0)";   }}
          >
            Discuss This With Us <ArrowRight size={14} />
          </button>
        </div>
      </div>

      <style>{`
        @keyframes fadeInOverlay { from { opacity:0 } to { opacity:1 } }
        @keyframes slideUpModal  { from { opacity:0; transform:translateY(24px) } to { opacity:1; transform:translateY(0) } }
      `}</style>
    </div>
  );
}

// ── grid ─────────────────────────────────────────────────────────────────────

export default function IntegrationDeliverablesSection() {
  const [active, setActive] = useState(null);
  const close = useCallback(() => setActive(null), []);

  return (
    <>
      <style>{`
        .int-deliverable-cell {
          background: ${C.surface};
          padding: 36px 32px;
          transition: background 0.25s;
          position: relative; overflow: hidden;
          cursor: pointer;
        }
        .int-deliverable-cell::before {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(135deg, rgba(201,168,76,0.07), transparent);
          opacity: 0; transition: opacity 0.3s;
        }
        .int-deliverable-cell:hover::before { opacity: 1; }
        .int-deliverable-cell:hover .int-del-icon {
          border-color: ${C.goldDim} !important;
          background: rgba(201,168,76,0.08) !important;
        }
        .int-deliverable-cell:hover .int-del-title { color: ${C.goldLt} !important; }
        .int-cell-hint {
          position: absolute; bottom: 14px; right: 16px;
          font-size: 9px; letter-spacing: 0.15em; text-transform: uppercase;
          color: ${C.goldDim}; opacity: 0; transition: opacity 0.25s;
          display: flex; align-items: center; gap: 4px;
        }
        .int-deliverable-cell:hover .int-cell-hint { opacity: 1; }
      `}</style>

      <div style={{
        display: "grid", gridTemplateColumns: "repeat(3, 1fr)",
        gap: 1, background: C.border,
        border: `1px solid ${C.border}`, marginTop: 64,
      }}>
        {deliverables.map((d, i) => (
          <div
            key={i}
            className="int-deliverable-cell"
            onClick={() => setActive(i)}
            role="button"
            tabIndex={0}
            onKeyDown={e => e.key === "Enter" && setActive(i)}
            aria-label={`Learn more about ${d.title}`}
          >
            <div
              className="int-del-icon"
              style={{
                width: 48, height: 48,
                border: `1px solid ${C.border}`,
                borderRadius: 8,
                display: "flex", alignItems: "center", justifyContent: "center",
                color: C.gold, marginBottom: 20,
                transition: "border-color 0.2s, background 0.2s",
              }}
            >
              {d.icon}
            </div>
            <div
              className="int-del-title"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "1.2rem", fontWeight: 600,
                color: C.text, marginBottom: 10,
                transition: "color 0.2s",
              }}
            >
              {d.title}
            </div>
            <div style={{ fontSize: 13, color: C.muted, lineHeight: 1.7, fontWeight: 300 }}>
              {d.desc}
            </div>
            <div className="int-cell-hint">
              Learn more <ArrowRight size={9} />
            </div>
          </div>
        ))}
      </div>

      {active !== null && (
        <DeliverableModal item={deliverables[active]} onClose={close} />
      )}
    </>
  );
}
