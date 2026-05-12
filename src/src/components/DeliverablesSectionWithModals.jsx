"use client";

import { useState, useEffect, useCallback } from "react";
import { Monitor, Layers, RefreshCw, Eye, Zap, Users, X, ArrowRight, Check } from "lucide-react";

// ── colour tokens (match parent page) ──────────────────────────────────────
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

// ── modal content for each deliverable ────────────────────────────────────
const deliverables = [
  {
    icon: <Monitor size={24} />,
    title: "Executive Dashboard",
    desc: "A single-screen command center showing your most critical business metrics in real time. Designed for decision-makers, not data scientists.",
    modal: {
      tagline: "One screen. Full picture.",
      overview:
        "The Executive Dashboard is the nerve centre of your BI environment. It condenses every KPI that matters to leadership into a single, beautifully composed view — revenue, margin, pipeline, headcount costs, and more — refreshed automatically so the number you see is always today's number.",
      visual: {
        type: "dashboard-mockup",
        metrics: [
          { label: "Revenue MTD",  value: "$1.24M",  delta: "+8.3%",  up: true },
          { label: "Gross Margin", value: "61.4%",   delta: "+1.1pp", up: true },
          { label: "Active Deals", value: "47",      delta: "-3",     up: false },
          { label: "NPS Score",    value: "72",      delta: "+5",     up: true },
        ],
      },
      bullets: [
        "Fully custom layout built around your actual KPIs",
        "Role-restricted — only leadership sees this view",
        "Mobile-responsive so you can check in from anywhere",
        "Drill-down capability from summary to transaction level",
      ],
    },
  },
  {
    icon: <Layers size={24} />,
    title: "Departmental Views",
    desc: "Separate dashboards tailored to each function — sales, operations, finance, marketing — each showing only what's relevant to that team.",
    modal: {
      tagline: "Every team sees exactly what they need.",
      overview:
        "Departmental Views are purpose-built dashboards for each function in your business. Sales sees pipeline, conversion rates, and rep performance. Operations sees fulfilment times, capacity, and exception flags. Finance sees cash flow, burn, and variance to budget. Nobody gets distracted by data that isn't theirs.",
      visual: {
        type: "dept-tabs",
        tabs: [
          { name: "Sales",      color: "#3b82f6", metrics: ["Pipeline Value $840K", "Win Rate 34%", "Avg Deal Size $18K"] },
          { name: "Operations", color: "#10b981", metrics: ["On-Time Delivery 96%", "Open Exceptions 12", "Avg Lead Time 3.2d"] },
          { name: "Finance",    color: "#c9a84c", metrics: ["Cash Runway 14mo", "Budget Variance -2.1%", "AR Overdue $42K"] },
          { name: "Marketing",  color: "#a855f7", metrics: ["CAC $320", "MQLs This Month 184", "Email Open Rate 28%"] },
        ],
      },
      bullets: [
        "Each dashboard built specifically for that team's decisions",
        "Row-level security so data stays in the right hands",
        "Consistent visual language across all views",
        "Scalable — new departments added without rebuilding",
      ],
    },
  },
  {
    icon: <RefreshCw size={24} />,
    title: "Automated Data Refresh",
    desc: "Your dashboards update automatically on a schedule you define. No manual exports, no stale data, no weekend spreadsheet sessions.",
    modal: {
      tagline: "Set it once. Always current.",
      overview:
        "Every data pipeline we build runs on an automated schedule you control — hourly, daily, or near-real-time. The moment your source systems update, the transformation layer picks it up and your dashboards reflect it. No one is pulling CSVs on a Sunday night ever again.",
      visual: {
        type: "pipeline",
        stages: [
          { label: "Source Systems", icons: ["CRM", "ERP", "GA4", "Xero"] },
          { label: "Pipeline",       icons: ["Extract", "Transform", "Load"] },
          { label: "Dashboards",     icons: ["Exec", "Sales", "Ops", "Fin"] },
        ],
      },
      bullets: [
        "Connects to CRM, ERP, accounting, marketing platforms, and more",
        "Scheduled or event-triggered refresh — your choice",
        "Error alerting so you know before your team does",
        "Historical snapshots preserved for trend analysis",
      ],
    },
  },
  {
    icon: <Eye size={24} />,
    title: "Trend & Anomaly Detection",
    desc: "Visual trend lines and anomaly flags that surface unusual patterns before they become problems — or before you miss an opportunity.",
    modal: {
      tagline: "Know before it becomes a crisis.",
      overview:
        "Buried in a table of numbers, an anomaly is invisible. Surfaced as a flag on a trend chart, it demands attention immediately. We build statistical anomaly detection and visual trend analysis directly into your dashboards so unusual movements — a revenue dip, a cost spike, a conversion drop — are highlighted automatically.",
      visual: {
        type: "trend-chart",
        points: [42, 45, 43, 48, 47, 52, 50, 49, 55, 58, 54, 38, 56, 60],
        anomalyIndex: 11,
      },
      bullets: [
        "Statistical threshold-based anomaly flagging",
        "Rolling averages and trend lines on every key metric",
        "Email or Slack alerts when thresholds are breached",
        "Configurable sensitivity — you define what counts as unusual",
      ],
    },
  },
  {
    icon: <Zap size={24} />,
    title: "KPI Scorecards",
    desc: "Color-coded performance scorecards that show at a glance whether each key metric is on track, at risk, or in the red.",
    modal: {
      tagline: "Green, amber, red. Instant clarity.",
      overview:
        "KPI Scorecards translate complex performance data into an immediate visual signal. Every metric gets a target, a current value, and a status colour. Leadership opens the scorecard and knows in three seconds whether the business is on track — no reading between the lines, no interpretation required.",
      visual: {
        type: "scorecard",
        rows: [
          { kpi: "Monthly Revenue",        target: "$1.2M",   actual: "$1.24M",  status: "green"  },
          { kpi: "Customer Churn Rate",     target: "< 3%",    actual: "2.8%",    status: "green"  },
          { kpi: "Project Delivery On-Time",target: "> 90%",   actual: "87%",     status: "amber"  },
          { kpi: "Support Ticket SLA",      target: "< 4hr",   actual: "5.2hr",   status: "red"    },
          { kpi: "Gross Margin",            target: "> 60%",   actual: "61.4%",   status: "green"  },
        ],
      },
      bullets: [
        "Every KPI mapped to a target you define",
        "Green / Amber / Red status calculated automatically",
        "Week-over-week and month-over-month variance shown inline",
        "Shareable as a weekly management report with one click",
      ],
    },
  },
  {
    icon: <Users size={24} />,
    title: "Multi-User Access",
    desc: "Role-based access control so leadership sees the full picture, managers see their domain, and sensitive data stays protected.",
    modal: {
      tagline: "Right data. Right people. Right time.",
      overview:
        "A BI environment is only useful if the right people can access it — and dangerous if the wrong people can. We implement role-based access control so each user type sees exactly what they should: executives get the full picture, department heads see their domain, and sensitive financial or HR data is locked to those with clearance.",
      visual: {
        type: "access-matrix",
        roles: ["Executive", "Dept Head", "Manager", "Analyst"],
        permissions: [
          { view: "Executive Dashboard", access: [true,  false, false, false] },
          { view: "Dept. Scorecards",    access: [true,  true,  false, false] },
          { view: "Team Reports",        access: [true,  true,  true,  false] },
          { view: "Raw Data Explorer",   access: [true,  true,  true,  true ] },
        ],
      },
      bullets: [
        "Row-level security down to individual data points",
        "Managed through your existing identity provider (SSO)",
        "Audit log of who viewed what and when",
        "Self-service for managers — no IT ticket required",
      ],
    },
  },
];

// ── sub-components for modal visuals ──────────────────────────────────────

function DashboardMockup({ metrics }) {
  return (
    <div style={{
      background: C.bg, border: `1px solid ${C.border}`,
      borderRadius: 6, padding: "20px 16px",
      display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10,
    }}>
      {metrics.map((m, i) => (
        <div key={i} style={{
          background: C.surface, border: `1px solid ${C.border}`,
          borderRadius: 4, padding: "14px 16px",
        }}>
          <div style={{ fontSize: 10, color: C.dim, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 6 }}>{m.label}</div>
          <div style={{ fontSize: "1.5rem", fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, color: C.text, lineHeight: 1 }}>{m.value}</div>
          <div style={{ fontSize: 11, color: m.up ? "#4ade80" : "#f87171", marginTop: 4 }}>
            {m.up ? "▲" : "▼"} {m.delta}
          </div>
        </div>
      ))}
    </div>
  );
}

function DeptTabs({ tabs }) {
  const [active, setActive] = useState(0);
  const t = tabs[active];
  return (
    <div style={{ background: C.bg, border: `1px solid ${C.border}`, borderRadius: 6, overflow: "hidden" }}>
      <div style={{ display: "flex", borderBottom: `1px solid ${C.border}` }}>
        {tabs.map((tab, i) => (
          <button key={i} onClick={() => setActive(i)} style={{
            flex: 1, padding: "10px 4px", background: "none",
            border: "none", borderBottom: i === active ? `2px solid ${tab.color}` : "2px solid transparent",
            color: i === active ? tab.color : C.dim,
            fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase",
            cursor: "pointer", transition: "color 0.2s",
          }}>{tab.name}</button>
        ))}
      </div>
      <div style={{ padding: "16px" }}>
        {t.metrics.map((m, i) => (
          <div key={i} style={{
            padding: "10px 14px", marginBottom: 6,
            background: C.surface, border: `1px solid ${C.border}`, borderRadius: 4,
            fontSize: 13, color: C.muted,
          }}>
            <span style={{ color: t.color, marginRight: 8 }}>●</span>{m}
          </div>
        ))}
      </div>
    </div>
  );
}

function PipelineVisual({ stages }) {
  return (
    <div style={{ display: "flex", alignItems: "stretch", gap: 0, background: C.bg, border: `1px solid ${C.border}`, borderRadius: 6, overflow: "hidden" }}>
      {stages.map((stage, si) => (
        <div key={si} style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <div style={{
            padding: "10px 8px", background: si === 1 ? C.surface : C.bg,
            borderRight: si < stages.length - 1 ? `1px solid ${C.border}` : "none",
            textAlign: "center",
          }}>
            <div style={{ fontSize: 9, color: C.gold, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 10 }}>{stage.label}</div>
            {stage.icons.map((icon, ii) => (
              <div key={ii} style={{
                background: si === 1 ? C.bg : C.surface,
                border: `1px solid ${C.border}`,
                borderRadius: 4, padding: "6px 4px",
                fontSize: 10, color: C.muted, marginBottom: 4,
                textAlign: "center",
              }}>{icon}</div>
            ))}
          </div>
          {si < stages.length - 1 && (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", padding: "0 -4px" }} />
          )}
        </div>
      ))}
    </div>
  );
}

function TrendChart({ points, anomalyIndex }) {
  const max = Math.max(...points);
  const min = Math.min(...points);
  const range = max - min || 1;
  const w = 300; const h = 100; const pad = 10;
  const xs = points.map((_, i) => pad + (i / (points.length - 1)) * (w - 2 * pad));
  const ys = points.map(v => h - pad - ((v - min) / range) * (h - 2 * pad));
  const path = xs.map((x, i) => `${i === 0 ? "M" : "L"}${x},${ys[i]}`).join(" ");
  const area = `${path} L${xs[xs.length-1]},${h} L${xs[0]},${h} Z`;

  return (
    <div style={{ background: C.bg, border: `1px solid ${C.border}`, borderRadius: 6, padding: "16px" }}>
      <div style={{ fontSize: 10, color: C.dim, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 10 }}>Revenue Trend — Anomaly Detected</div>
      <svg width="100%" viewBox={`0 0 ${w} ${h}`} style={{ overflow: "visible" }}>
        <defs>
          <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={C.gold} stopOpacity="0.15" />
            <stop offset="100%" stopColor={C.gold} stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={area} fill="url(#areaGrad)" />
        <path d={path} fill="none" stroke={C.goldDim} strokeWidth="1.5" />
        {points.map((_, i) => i !== anomalyIndex ? null : (
          <g key={i}>
            <circle cx={xs[i]} cy={ys[i]} r="6" fill="none" stroke="#f87171" strokeWidth="2" />
            <circle cx={xs[i]} cy={ys[i]} r="3" fill="#f87171" />
            <line x1={xs[i]} y1={ys[i] - 10} x2={xs[i]} y2={pad} stroke="#f87171" strokeWidth="1" strokeDasharray="3,2" opacity="0.5" />
            <text x={xs[i]} y={pad - 2} textAnchor="middle" fill="#f87171" fontSize="8" fontWeight="600">ANOMALY</text>
          </g>
        ))}
      </svg>
      <div style={{ fontSize: 11, color: "#f87171", marginTop: 8 }}>▼ Significant drop flagged — 26% below rolling average</div>
    </div>
  );
}

function Scorecard({ rows }) {
  const colour = { green: "#4ade80", amber: "#fbbf24", red: "#f87171" };
  const bg     = { green: "rgba(74,222,128,0.08)", amber: "rgba(251,191,36,0.08)", red: "rgba(248,113,113,0.08)" };
  return (
    <div style={{ background: C.bg, border: `1px solid ${C.border}`, borderRadius: 6, overflow: "hidden" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr auto auto auto", gap: 0, borderBottom: `1px solid ${C.border}`, padding: "8px 14px" }}>
        {["KPI","Target","Actual","Status"].map(h => (
          <div key={h} style={{ fontSize: 9, color: C.dim, letterSpacing: "0.12em", textTransform: "uppercase", textAlign: h === "KPI" ? "left" : "center" }}>{h}</div>
        ))}
      </div>
      {rows.map((r, i) => (
        <div key={i} style={{
          display: "grid", gridTemplateColumns: "1fr auto auto auto", gap: 0,
          padding: "10px 14px", borderBottom: i < rows.length - 1 ? `1px solid ${C.border}` : "none",
          background: bg[r.status], alignItems: "center",
        }}>
          <div style={{ fontSize: 12, color: C.text }}>{r.kpi}</div>
          <div style={{ fontSize: 11, color: C.dim, minWidth: 56, textAlign: "center" }}>{r.target}</div>
          <div style={{ fontSize: 12, color: C.text, fontWeight: 600, minWidth: 56, textAlign: "center" }}>{r.actual}</div>
          <div style={{ width: 10, height: 10, borderRadius: "50%", background: colour[r.status], margin: "0 auto", boxShadow: `0 0 6px ${colour[r.status]}` }} />
        </div>
      ))}
    </div>
  );
}

function AccessMatrix({ roles, permissions }) {
  return (
    <div style={{ background: C.bg, border: `1px solid ${C.border}`, borderRadius: 6, overflow: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ borderBottom: `1px solid ${C.border}` }}>
            <th style={{ padding: "8px 14px", fontSize: 9, color: C.dim, letterSpacing: "0.12em", textTransform: "uppercase", textAlign: "left", fontWeight: 400 }}>View</th>
            {roles.map(r => (
              <th key={r} style={{ padding: "8px 10px", fontSize: 9, color: C.gold, letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 600, textAlign: "center" }}>{r}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {permissions.map((row, ri) => (
            <tr key={ri} style={{ borderBottom: ri < permissions.length - 1 ? `1px solid ${C.border}` : "none" }}>
              <td style={{ padding: "10px 14px", fontSize: 12, color: C.muted }}>{row.view}</td>
              {row.access.map((has, ai) => (
                <td key={ai} style={{ textAlign: "center", padding: "10px" }}>
                  {has
                    ? <Check size={13} color="#4ade80" />
                    : <span style={{ display: "inline-block", width: 13, height: 1, background: C.border }} />
                  }
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ModalVisual({ v }) {
  if (!v) return null;
  if (v.type === "dashboard-mockup") return <DashboardMockup metrics={v.metrics} />;
  if (v.type === "dept-tabs")        return <DeptTabs tabs={v.tabs} />;
  if (v.type === "pipeline")         return <PipelineVisual stages={v.stages} />;
  if (v.type === "trend-chart")      return <TrendChart points={v.points} anomalyIndex={v.anomalyIndex} />;
  if (v.type === "scorecard")        return <Scorecard rows={v.rows} />;
  if (v.type === "access-matrix")    return <AccessMatrix roles={v.roles} permissions={v.permissions} />;
  return null;
}

// ── modal component ────────────────────────────────────────────────────────

function DeliverableModal({ item, onClose }) {
  // close on Escape
  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  // prevent scroll on body
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 200,
        background: "rgba(4,7,14,0.85)",
        backdropFilter: "blur(10px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "24px 16px",
        animation: "fadeInOverlay 0.25s ease",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: C.surface,
          border: `1px solid ${C.border}`,
          borderRadius: 6,
          width: "100%", maxWidth: 620,
          maxHeight: "90vh", overflowY: "auto",
          position: "relative",
          animation: "slideUpModal 0.3s cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        {/* gold top bar */}
        <div style={{ height: 2, background: `linear-gradient(90deg, ${C.goldDim}, ${C.gold}, ${C.goldDim})` }} />

        {/* header */}
        <div style={{ padding: "28px 32px 0", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <div style={{
              width: 44, height: 44,
              border: `1px solid ${C.goldDim}`,
              background: "rgba(201,168,76,0.06)",
              borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center",
              color: C.gold, marginBottom: 16,
            }}>
              {item.icon}
            </div>
            <div style={{ fontSize: 10, color: C.gold, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 6 }}>Deliverable</div>
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

        {/* body */}
        <div style={{ padding: "20px 32px 32px" }}>
          <p style={{ fontSize: 14, color: C.muted, lineHeight: 1.8, fontWeight: 300, marginBottom: 24 }}>
            {item.modal.overview}
          </p>

          {/* visual */}
          <div style={{ marginBottom: 24 }}>
            <ModalVisual v={item.modal.visual} />
          </div>

          {/* bullet list */}
          <div style={{
            background: C.bg, border: `1px solid ${C.border}`,
            borderRadius: 4, padding: "16px 20px",
            display: "flex", flexDirection: "column", gap: 10,
          }}>
            {item.modal.bullets.map((b, i) => (
              <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                <div style={{ width: 18, height: 18, borderRadius: "50%", background: "rgba(201,168,76,0.12)", border: `1px solid ${C.goldDim}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
                  <Check size={10} color={C.gold} />
                </div>
                <span style={{ fontSize: 13, color: C.muted, lineHeight: 1.6 }}>{b}</span>
              </div>
            ))}
          </div>

          {/* CTA */}
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
        @keyframes fadeInOverlay  { from { opacity:0 } to { opacity:1 } }
        @keyframes slideUpModal   { from { opacity:0; transform:translateY(24px) } to { opacity:1; transform:translateY(0) } }
      `}</style>
    </div>
  );
}

// ── deliverables grid (drop-in replacement) ───────────────────────────────

export default function DeliverablesSection() {
  const [active, setActive] = useState(null);
  const close = useCallback(() => setActive(null), []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=DM+Sans:wght@300;400;500;600&display=swap');

        .deliverable-cell {
          background: ${C.surface};
          padding: 36px 32px;
          transition: background 0.25s, cursor 0.1s;
          position: relative; overflow: hidden;
          cursor: pointer;
        }
        .deliverable-cell::before {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(135deg, rgba(201,168,76,0.07), transparent);
          opacity: 0; transition: opacity 0.3s;
        }
        .deliverable-cell:hover::before { opacity: 1; }
        .deliverable-cell:hover .deliverable-icon {
          border-color: ${C.goldDim} !important;
          background: rgba(201,168,76,0.08) !important;
        }
        .deliverable-cell:hover .deliverable-title { color: ${C.goldLt} !important; }
        .cell-hint {
          position: absolute; bottom: 14px; right: 16px;
          font-size: 9px; letter-spacing: 0.15em; text-transform: uppercase;
          color: ${C.goldDim}; opacity: 0;
          transition: opacity 0.25s;
          display: flex; align-items: center; gap: 4px;
        }
        .deliverable-cell:hover .cell-hint { opacity: 1; }
      `}</style>

      {/* grid */}
      <div style={{
        display: "grid", gridTemplateColumns: "repeat(3, 1fr)",
        gap: 1, background: C.border,
        border: `1px solid ${C.border}`, marginTop: 64,
      }}>
        {deliverables.map((d, i) => (
          <div
            key={i}
            className="deliverable-cell"
            onClick={() => setActive(i)}
            role="button"
            tabIndex={0}
            onKeyDown={e => e.key === "Enter" && setActive(i)}
            aria-label={`Learn more about ${d.title}`}
          >
            <div
              className="deliverable-icon"
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
              className="deliverable-title"
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
            <div className="cell-hint">
              Learn more <ArrowRight size={9} />
            </div>
          </div>
        ))}
      </div>

      {/* modal */}
      {active !== null && (
        <DeliverableModal item={deliverables[active]} onClose={close} />
      )}
    </>
  );
}
