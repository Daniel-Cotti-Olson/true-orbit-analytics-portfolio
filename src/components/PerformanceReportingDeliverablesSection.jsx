"use client";

import { useState, useEffect, useCallback } from "react";
import {
  BarChart2, Layers, Calendar, Filter, Bell, Users,
  X, ArrowRight, Check
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

// ── deliverables data ──────────────────────────────────────────────────────

const deliverables = [
  {
    icon: <BarChart2 size={24} />,
    title: "Executive Dashboard Reports",
    desc: "High-level performance summaries formatted for leadership consumption — clear, visual, and opinionated. Decision-ready in under five minutes of reading time.",
    modal: {
      tagline: "The whole picture. In five minutes of reading.",
      overview:
        "Leadership time is your most expensive resource. Executive Dashboard Reports are built around that constraint — synthesizing your most critical operational and financial data into a single, structured view that communicates what's happening, what's changed, and what requires attention. No noise, no buried insights, no spreadsheet archaeology.",
      visual: {
        type: "exec-dashboard",
        tiles: [
          { label: "Revenue MTD",       value: "$1.24M",  delta: "+8.3%",  up: true  },
          { label: "Gross Margin",       value: "61.2%",   delta: "+1.4pp", up: true  },
          { label: "Pipeline Value",     value: "$3.8M",   delta: "-5.1%",  up: false },
          { label: "Team Utilisation",   value: "84%",     delta: "+2pp",   up: true  },
          { label: "Churn Rate",         value: "1.8%",    delta: "-0.3pp", up: true  },
          { label: "Operating Cash",     value: "$418K",   delta: "+12.1%", up: true  },
        ],
        signals: [
          { label: "Pipeline softness in Q3 warrants review", type: "warn" },
          { label: "Margin improvement on track vs. target",  type: "ok"   },
        ],
      },
      bullets: [
        "Formatted for 5-minute executive consumption — no data archaeology required",
        "Covers financial, operational, and growth metrics in a single structured view",
        "Commentary layer explains what moved, not just what the number is",
        "Delivered on your schedule — weekly pulse or monthly deep-dive",
      ],
    },
  },
  {
    icon: <Layers size={24} />,
    title: "Board-Level Presentation Packs",
    desc: "Professionally structured decks that translate operational metrics into strategic narrative. The story your board needs to hear, backed by the numbers that prove it.",
    modal: {
      tagline: "Numbers that tell a story. Decks that earn trust.",
      overview:
        "Board members don't want raw data — they want informed confidence. Board-Level Presentation Packs translate your operational reality into a structured narrative arc: where you are, how you got there, what the risks are, and what decisions are on the table. Every deck is built to the standard that investors, directors, and lenders expect.",
      visual: {
        type: "board-pack",
        slides: [
          { n: "01", title: "Executive Summary",      status: "Agenda & period snapshot"          },
          { n: "02", title: "Financial Performance",   status: "P&L, margin, cash position"        },
          { n: "03", title: "KPI Scorecard",           status: "Target vs. actuals with variance"  },
          { n: "04", title: "Risk & Opportunities",    status: "Flag register + strategic outlook"  },
          { n: "05", title: "Decisions Required",      status: "Agenda items needing board vote"   },
        ],
      },
      bullets: [
        "Structured to governance best practice — agenda, financials, decisions",
        "Narrative commentary layer that contextualises the numbers",
        "Branded to your standards — fonts, colours, and visual identity",
        "Produced on your quarterly cadence with zero scramble from your team",
      ],
    },
  },
  {
    icon: <Calendar size={24} />,
    title: "Cadenced Delivery — Your Schedule",
    desc: "Weekly, monthly, or quarterly — reports arrive on your chosen cadence without you chasing them. Automated delivery pipelines with zero manual effort on your end.",
    modal: {
      tagline: "Reports that arrive. Every time. Without asking.",
      overview:
        "The discipline of reporting only works if it's consistent. Ad-hoc reports that depend on someone's bandwidth always slip. Cadenced Delivery means your reports are automated from source data through to delivery — weekly pulses, monthly reviews, quarterly packs — arriving in inboxes or BI platforms exactly when they should, without a single manual step.",
      visual: {
        type: "cadence-schedule",
        rows: [
          { cadence: "Weekly",    audience: "Ops & Sales Teams",    format: "Pulse Report",    day: "Every Monday AM"     },
          { cadence: "Monthly",   audience: "Senior Leadership",     format: "Performance Pack",day: "1st of each month"   },
          { cadence: "Quarterly", audience: "Board & Investors",     format: "Board Deck",      day: "End of quarter +3d"  },
        ],
      },
      bullets: [
        "Fully automated pipeline — source data to delivered report, zero manual steps",
        "Weekly, monthly, quarterly, or custom cadences configured to your cycle",
        "Delivered to email, Slack, SharePoint, or your BI platform of choice",
        "Cadence can be adjusted at any time as your reporting needs evolve",
      ],
    },
  },
  {
    icon: <Filter size={24} />,
    title: "KPI Variance & Trend Analysis",
    desc: "Every report includes a variance breakdown against prior period and target, with trend commentary that explains what moved, why it moved, and what it means.",
    modal: {
      tagline: "Not just what changed. Why it changed.",
      overview:
        "A number without context is just a number. KPI Variance & Trend Analysis goes beyond the figure — it shows how each metric has moved against your prior period, against your target, and against the trajectory you were on. Every material variance includes a commentary layer that surfaces the driver so leadership can respond to causes, not symptoms.",
      visual: {
        type: "variance-table",
        rows: [
          { kpi: "Revenue",         actual: "$1.24M", target: "$1.18M", prior: "$1.14M", varTarget: "+5.1%",  varPrior: "+8.8%",  dir: "up"   },
          { kpi: "Gross Margin %",  actual: "61.2%",  target: "60.0%",  prior: "59.8%",  varTarget: "+1.2pp", varPrior: "+1.4pp", dir: "up"   },
          { kpi: "Operating Costs", actual: "$310K",  target: "$295K",  prior: "$288K",  varTarget: "+5.1%",  varPrior: "+7.6%",  dir: "down" },
          { kpi: "Pipeline",        actual: "$3.8M",  target: "$4.2M",  prior: "$4.0M",  varTarget: "-9.5%",  varPrior: "-5.0%",  dir: "down" },
          { kpi: "NPS",             actual: "72",     target: "70",     prior: "68",     varTarget: "+2pts",  varPrior: "+4pts",  dir: "up"   },
        ],
      },
      bullets: [
        "Every KPI measured against target and prior period simultaneously",
        "Trend lines surfaced for all key metrics — not just current snapshot",
        "Material variances flagged with root-cause commentary",
        "Consistent methodology across reporting periods for reliable comparison",
      ],
    },
  },
  {
    icon: <Bell size={24} />,
    title: "Exception & Alert Reporting",
    desc: "Out-of-threshold metrics are flagged automatically so leadership attention goes to the signals that require action — not the noise that doesn't.",
    modal: {
      tagline: "Your attention, directed at what matters.",
      overview:
        "Executives don't have time to review every metric every day. Exception & Alert Reporting solves that by monitoring your KPIs continuously and surfacing only the signals that have crossed a threshold you've defined. When something needs attention, you hear about it. When everything is tracking normally, you don't. That's the discipline that separates reactive leadership from proactive leadership.",
      visual: {
        type: "alert-feed",
        alerts: [
          { metric: "Days Sales Outstanding", value: "57d",   threshold: "< 45d",  severity: "red",   msg: "DSO up 12d vs. prior month — AR follow-up required"   },
          { metric: "Pipeline Coverage",      value: "2.1x",  threshold: "> 3.0x", severity: "amber", msg: "Coverage below comfort zone entering Q4"               },
          { metric: "Gross Margin %",         value: "61.2%", threshold: "> 58%",  severity: "green", msg: "On track — no action required"                         },
          { metric: "Headcount Cost Ratio",   value: "38%",   threshold: "< 40%",  severity: "green", msg: "Within target band"                                    },
          { metric: "Cash Runway",            value: "5.2mo", threshold: "> 6mo",  severity: "amber", msg: "Below 6-month floor — review burn rate"                },
        ],
      },
      bullets: [
        "Thresholds defined per metric based on your business model and risk tolerance",
        "Alerts delivered via email, Slack, or BI platform notification",
        "Severity tiering — red for immediate action, amber for monitoring, green for clear",
        "Exception reports auto-generated when thresholds breach, separate from cadenced packs",
      ],
    },
  },
  {
    icon: <Users size={24} />,
    title: "Department & Segment Cuts",
    desc: "Roll-up and drill-down views across business units, product lines, or geographies. The right level of detail for every audience — from the board to the team lead.",
    modal: {
      tagline: "Board-level roll-up. Team-level drill-down.",
      overview:
        "One set of numbers doesn't serve every audience. The board needs a single consolidated view. Department heads need their unit's performance. Regional leads need geography-specific data. Department & Segment Cuts delivers all of these from the same underlying data — consistent methodology, different lenses — so every stakeholder has exactly the context they need.",
      visual: {
        type: "segment-tree",
        total: { label: "Total Business", revenue: "$1.24M", margin: "61.2%" },
        segments: [
          { label: "Product Division",   revenue: "$620K",  margin: "68.4%", pct: "50%", color: C.gold    },
          { label: "Service Division",   revenue: "$390K",  margin: "72.1%", pct: "31%", color: "#4ade80" },
          { label: "Consulting Practice",revenue: "$230K",  margin: "41.3%", pct: "19%", color: "#94a3b8" },
        ],
      },
      bullets: [
        "Consolidated view for board and executive audiences",
        "Department and business unit cuts for operational leaders",
        "Product line, geography, and customer segment breakdowns available",
        "All cuts use the same underlying data — no reconciliation, no discrepancies",
      ],
    },
  },
];

// ── visual sub-components ─────────────────────────────────────────────────

function ExecDashboard({ tiles, signals }) {
  return (
    <div style={{ background: C.bg, border: `1px solid ${C.border}`, borderRadius: 6, padding: 16 }}>
      <div style={{ fontSize: 10, color: C.dim, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 12 }}>
        Executive Performance Snapshot
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 12 }}>
        {tiles.map((t, i) => (
          <div key={i} style={{
            background: C.surface, border: `1px solid ${C.border}`,
            borderRadius: 4, padding: "10px 12px",
          }}>
            <div style={{ fontSize: 9, color: C.dim, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 5 }}>{t.label}</div>
            <div style={{ fontSize: "1rem", fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, color: C.text, lineHeight: 1 }}>{t.value}</div>
            <div style={{ fontSize: 10, color: t.up ? "#4ade80" : "#f87171", marginTop: 4 }}>
              {t.up ? "▲" : "▼"} {t.delta}
            </div>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {signals.map((s, i) => (
          <div key={i} style={{
            display: "flex", alignItems: "center", gap: 8,
            background: s.type === "ok" ? "rgba(74,222,128,0.05)" : "rgba(251,191,36,0.06)",
            border: `1px solid ${s.type === "ok" ? "rgba(74,222,128,0.15)" : "rgba(251,191,36,0.15)"}`,
            borderRadius: 3, padding: "7px 10px",
          }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", flexShrink: 0, background: s.type === "ok" ? "#4ade80" : "#fbbf24" }} />
            <span style={{ fontSize: 11, color: C.muted }}>{s.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function BoardPack({ slides }) {
  return (
    <div style={{ background: C.bg, border: `1px solid ${C.border}`, borderRadius: 6, overflow: "hidden" }}>
      <div style={{ padding: "8px 14px", borderBottom: `1px solid ${C.border}`, display: "grid", gridTemplateColumns: "auto 1fr auto" }}>
        {["#","Section","Content"].map((h, i) => (
          <div key={i} style={{ fontSize: 9, color: C.dim, letterSpacing: "0.12em", textTransform: "uppercase", textAlign: i === 2 ? "right" : "left" }}>{h}</div>
        ))}
      </div>
      {slides.map((s, i) => (
        <div key={i} style={{
          display: "grid", gridTemplateColumns: "auto 1fr auto",
          padding: "10px 14px", alignItems: "center", gap: 12,
          borderBottom: i < slides.length - 1 ? `1px solid ${C.border}` : "none",
          background: i % 2 === 0 ? "transparent" : "rgba(201,168,76,0.02)",
        }}>
          <div style={{ fontSize: 10, color: C.goldDim, fontWeight: 700, fontFamily: "'Cormorant Garamond', serif", minWidth: 24 }}>{s.n}</div>
          <div style={{ fontSize: 12, color: C.text, fontWeight: 500 }}>{s.title}</div>
          <div style={{ fontSize: 10, color: C.dim, textAlign: "right", maxWidth: 180 }}>{s.status}</div>
        </div>
      ))}
      <div style={{ padding: "10px 14px", background: `linear-gradient(90deg, rgba(201,168,76,0.06), transparent)`, borderTop: `1px solid ${C.border}` }}>
        <div style={{ fontSize: 9, color: C.goldDim, letterSpacing: "0.1em", textTransform: "uppercase" }}>Produced quarterly · Board-branded · Decision-ready</div>
      </div>
    </div>
  );
}

function CadenceSchedule({ rows }) {
  const cadenceColor = { Weekly: "#4ade80", Monthly: C.gold, Quarterly: "#a78bfa" };
  return (
    <div style={{ background: C.bg, border: `1px solid ${C.border}`, borderRadius: 6, overflow: "hidden" }}>
      <div style={{ display: "grid", gridTemplateColumns: "auto 1fr auto auto", padding: "8px 14px", borderBottom: `1px solid ${C.border}`, gap: 12 }}>
        {["Cadence","Audience","Format","Trigger"].map((h, i) => (
          <div key={i} style={{ fontSize: 9, color: C.dim, letterSpacing: "0.12em", textTransform: "uppercase" }}>{h}</div>
        ))}
      </div>
      {rows.map((r, i) => (
        <div key={i} style={{
          display: "grid", gridTemplateColumns: "auto 1fr auto auto",
          padding: "12px 14px", alignItems: "center", gap: 12,
          borderBottom: i < rows.length - 1 ? `1px solid ${C.border}` : "none",
        }}>
          <div style={{
            fontSize: 10, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase",
            color: cadenceColor[r.cadence] || C.gold,
            background: `${cadenceColor[r.cadence]}14` || "rgba(201,168,76,0.08)",
            border: `1px solid ${cadenceColor[r.cadence]}30`,
            borderRadius: 2, padding: "2px 8px",
          }}>{r.cadence}</div>
          <div style={{ fontSize: 12, color: C.text }}>{r.audience}</div>
          <div style={{ fontSize: 11, color: C.muted, whiteSpace: "nowrap" }}>{r.format}</div>
          <div style={{ fontSize: 10, color: C.dim, whiteSpace: "nowrap" }}>{r.day}</div>
        </div>
      ))}
      <div style={{ padding: "10px 14px", background: "rgba(74,222,128,0.03)", borderTop: `1px solid ${C.border}` }}>
        <div style={{ fontSize: 9, color: "#4ade8060", letterSpacing: "0.1em", textTransform: "uppercase" }}>Fully automated · Zero manual steps · Adjustable at any time</div>
      </div>
    </div>
  );
}

function VarianceTable({ rows }) {
  const dirColor = (dir) => dir === "up" ? "#4ade80" : "#f87171";
  return (
    <div style={{ background: C.bg, border: `1px solid ${C.border}`, borderRadius: 6, overflow: "hidden" }}>
      <div style={{
        display: "grid", gridTemplateColumns: "1fr auto auto auto auto",
        padding: "8px 14px", borderBottom: `1px solid ${C.border}`, gap: 8,
      }}>
        {["KPI","Actual","Target","vs Target","vs Prior"].map((h, i) => (
          <div key={i} style={{ fontSize: 9, color: C.dim, letterSpacing: "0.12em", textTransform: "uppercase", textAlign: i === 0 ? "left" : "center" }}>{h}</div>
        ))}
      </div>
      {rows.map((r, i) => (
        <div key={i} style={{
          display: "grid", gridTemplateColumns: "1fr auto auto auto auto",
          padding: "10px 14px", alignItems: "center", gap: 8,
          borderBottom: i < rows.length - 1 ? `1px solid ${C.border}` : "none",
          background: i % 2 === 0 ? "transparent" : "rgba(201,168,76,0.02)",
        }}>
          <div style={{ fontSize: 12, color: C.text }}>{r.kpi}</div>
          <div style={{ fontSize: 12, fontWeight: 700, color: C.text, minWidth: 56, textAlign: "center" }}>{r.actual}</div>
          <div style={{ fontSize: 11, color: C.dim, minWidth: 56, textAlign: "center" }}>{r.target}</div>
          <div style={{ fontSize: 11, fontWeight: 600, color: dirColor(r.dir), minWidth: 56, textAlign: "center" }}>{r.varTarget}</div>
          <div style={{ fontSize: 11, color: C.muted, minWidth: 56, textAlign: "center" }}>{r.varPrior}</div>
        </div>
      ))}
    </div>
  );
}

function AlertFeed({ alerts }) {
  const colour  = { green: "#4ade80", amber: "#fbbf24", red: "#f87171" };
  const bg      = { green: "rgba(74,222,128,0.05)", amber: "rgba(251,191,36,0.06)", red: "rgba(248,113,113,0.07)" };
  const border  = { green: "rgba(74,222,128,0.15)", amber: "rgba(251,191,36,0.15)", red: "rgba(248,113,113,0.2)" };
  const label   = { green: "CLEAR", amber: "MONITOR", red: "ACTION" };
  return (
    <div style={{ background: C.bg, border: `1px solid ${C.border}`, borderRadius: 6, overflow: "hidden" }}>
      {alerts.map((a, i) => (
        <div key={i} style={{
          padding: "10px 14px",
          background: bg[a.severity],
          borderBottom: i < alerts.length - 1 ? `1px solid ${C.border}` : "none",
          borderLeft: `3px solid ${colour[a.severity]}`,
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8, marginBottom: 3 }}>
            <div style={{ fontSize: 12, color: C.text, fontWeight: 500 }}>{a.metric}</div>
            <div style={{ display: "flex", alignItems: "center", gap: 6, flexShrink: 0 }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: colour[a.severity] }}>{a.value}</span>
              <span style={{
                fontSize: 8, fontWeight: 700, letterSpacing: "0.1em",
                color: colour[a.severity],
                background: `${colour[a.severity]}18`,
                border: `1px solid ${border[a.severity]}`,
                borderRadius: 2, padding: "1px 5px",
              }}>{label[a.severity]}</span>
            </div>
          </div>
          <div style={{ fontSize: 10, color: C.dim }}>Floor: {a.threshold} &nbsp;·&nbsp; {a.msg}</div>
        </div>
      ))}
    </div>
  );
}

function SegmentTree({ total, segments }) {
  return (
    <div style={{ background: C.bg, border: `1px solid ${C.border}`, borderRadius: 6, padding: 16 }}>
      {/* Total roll-up */}
      <div style={{
        background: `linear-gradient(135deg, rgba(201,168,76,0.1), rgba(201,168,76,0.03))`,
        border: `1px solid ${C.goldDim}`,
        borderRadius: 4, padding: "10px 14px", marginBottom: 12,
        display: "flex", justifyContent: "space-between", alignItems: "center",
      }}>
        <div style={{ fontSize: 11, color: C.gold, fontWeight: 600, letterSpacing: "0.05em" }}>{total.label}</div>
        <div style={{ display: "flex", gap: 20 }}>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 9, color: C.goldDim, textTransform: "uppercase", letterSpacing: "0.1em" }}>Revenue</div>
            <div style={{ fontSize: 13, fontWeight: 700, fontFamily: "'Cormorant Garamond', serif", color: C.text }}>{total.revenue}</div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 9, color: C.goldDim, textTransform: "uppercase", letterSpacing: "0.1em" }}>Margin</div>
            <div style={{ fontSize: 13, fontWeight: 700, fontFamily: "'Cormorant Garamond', serif", color: C.text }}>{total.margin}</div>
          </div>
        </div>
      </div>
      {/* Connector */}
      <div style={{ display: "flex", justifyContent: "center", marginBottom: 8 }}>
        <div style={{ width: 1, height: 16, background: C.border }} />
      </div>
      {/* Segment bar */}
      <div style={{ display: "flex", borderRadius: 3, overflow: "hidden", height: 8, marginBottom: 12 }}>
        {segments.map((s, i) => (
          <div key={i} style={{ width: s.pct, background: s.color, opacity: 0.7 }} />
        ))}
      </div>
      {/* Segment rows */}
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {segments.map((s, i) => (
          <div key={i} style={{
            display: "grid", gridTemplateColumns: "10px 1fr auto auto auto",
            alignItems: "center", gap: 10,
            background: C.surface, border: `1px solid ${C.border}`,
            borderRadius: 3, padding: "8px 12px",
          }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: s.color, opacity: 0.8 }} />
            <div style={{ fontSize: 12, color: C.text }}>{s.label}</div>
            <div style={{ fontSize: 11, color: C.muted, textAlign: "right" }}>{s.revenue}</div>
            <div style={{ fontSize: 11, fontWeight: 600, color: "#4ade80", textAlign: "right" }}>{s.margin}</div>
            <div style={{ fontSize: 10, color: C.dim, minWidth: 28, textAlign: "right" }}>{s.pct}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ModalVisual({ v }) {
  if (!v) return null;
  if (v.type === "exec-dashboard")   return <ExecDashboard tiles={v.tiles} signals={v.signals} />;
  if (v.type === "board-pack")       return <BoardPack slides={v.slides} />;
  if (v.type === "cadence-schedule") return <CadenceSchedule rows={v.rows} />;
  if (v.type === "variance-table")   return <VarianceTable rows={v.rows} />;
  if (v.type === "alert-feed")       return <AlertFeed alerts={v.alerts} />;
  if (v.type === "segment-tree")     return <SegmentTree total={v.total} segments={v.segments} />;
  return null;
}

// ── modal ─────────────────────────────────────────────────────────────────

function DeliverableModal({ item, onClose }) {
  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

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
        <div style={{ height: 2, background: `linear-gradient(90deg, ${C.goldDim}, ${C.gold}, ${C.goldDim})` }} />

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

        <div style={{ padding: "20px 32px 32px" }}>
          <p style={{ fontSize: 14, color: C.muted, lineHeight: 1.8, fontWeight: 300, marginBottom: 24 }}>
            {item.modal.overview}
          </p>

          <div style={{ marginBottom: 24 }}>
            <ModalVisual v={item.modal.visual} />
          </div>

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

// ── grid (drop-in replacement) ────────────────────────────────────────────

export default function PerformanceReportingDeliverablesSection() {
  const [active, setActive] = useState(null);
  const close = useCallback(() => setActive(null), []);

  return (
    <>
      <style>{`
        .pr-deliverable-cell {
          background: ${C.surface};
          padding: 36px 32px;
          transition: background 0.25s;
          position: relative; overflow: hidden;
          cursor: pointer;
        }
        .pr-deliverable-cell::before {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(135deg, rgba(201,168,76,0.07), transparent);
          opacity: 0; transition: opacity 0.3s;
        }
        .pr-deliverable-cell:hover::before { opacity: 1; }
        .pr-deliverable-cell:hover .pr-del-icon {
          border-color: ${C.goldDim} !important;
          background: rgba(201,168,76,0.08) !important;
        }
        .pr-deliverable-cell:hover .pr-del-title { color: ${C.goldLt} !important; }
        .pr-cell-hint {
          position: absolute; bottom: 14px; right: 16px;
          font-size: 9px; letter-spacing: 0.15em; text-transform: uppercase;
          color: ${C.goldDim}; opacity: 0; transition: opacity 0.25s;
          display: flex; align-items: center; gap: 4px;
        }
        .pr-deliverable-cell:hover .pr-cell-hint { opacity: 1; }
      `}</style>

      <div style={{
        display: "grid", gridTemplateColumns: "repeat(3, 1fr)",
        gap: 1, background: C.border,
        border: `1px solid ${C.border}`, marginTop: 64,
      }}>
        {deliverables.map((d, i) => (
          <div
            key={i}
            className="pr-deliverable-cell"
            onClick={() => setActive(i)}
            role="button"
            tabIndex={0}
            onKeyDown={e => e.key === "Enter" && setActive(i)}
            aria-label={`Learn more about ${d.title}`}
          >
            <div
              className="pr-del-icon"
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
              className="pr-del-title"
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
            <div className="pr-cell-hint">
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
