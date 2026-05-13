"use client";

import { useState, useEffect, useCallback } from "react";
import {
  TrendingUp, AlertOctagon, Eye, Activity, Layers, Target,
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
    icon: <TrendingUp size={24} />,
    title: "Demand Forecasting Models",
    desc: "Statistical and ML-driven models that project future demand across products, services, or customer segments — so you plan inventory, staffing, and spend ahead of the curve.",
    modal: {
      tagline: "Stop planning for last month. Start planning for next quarter.",
      overview:
        "Demand Forecasting Models replace gut-feel planning with statistically grounded projections. Using your historical transaction, seasonal, and external signal data, we build models that produce accurate forward-looking demand estimates across whatever dimensions matter to your business — SKU, region, service line, or customer segment.",
      visual: {
        type: "forecast-chart",
        historical: [82, 91, 78, 95, 103, 88, 110, 97, 115, 108],
        forecast:   [null, null, null, null, null, null, null, null, null, null, 118, 124, 131, 127, 138],
        lower:      [null, null, null, null, null, null, null, null, null, null, 108, 112, 117, 112, 120],
        upper:      [null, null, null, null, null, null, null, null, null, null, 128, 136, 145, 142, 156],
        splitAt: 9,
        labels: ["M-9","M-8","M-7","M-6","M-5","M-4","M-3","M-2","M-1","Now","M+1","M+2","M+3","M+4","M+5"],
      },
      bullets: [
        "Time-series models (ARIMA, Prophet, ETS) calibrated to your data cadence",
        "Confidence intervals surfaced alongside point estimates — not false precision",
        "Segment-level forecasts: SKU, region, channel, or customer cohort",
        "Retraining schedule built in so accuracy holds as your business evolves",
      ],
    },
  },
  {
    icon: <AlertOctagon size={24} />,
    title: "Risk Probability Scoring",
    desc: "Quantified risk scores for clients, suppliers, or market positions. Know the probability of churn, default, or disruption before it becomes a crisis.",
    modal: {
      tagline: "A number on every risk. Prioritization made automatic.",
      overview:
        "Risk that isn't quantified can't be managed systematically. Risk Probability Scoring takes the behavioural and transactional signals already in your data and converts them into explicit probability scores — so you know which clients are trending toward churn, which suppliers are likely to miss SLAs, and which positions carry the most concentration risk.",
      visual: {
        type: "risk-scores",
        entities: [
          { name: "Client: Meridian Group",    score: 87, category: "Churn Risk",    trend: "↑", color: "#f87171" },
          { name: "Client: Harlow & Sons",     score: 34, category: "Churn Risk",    trend: "→", color: "#4ade80" },
          { name: "Supplier: Vantec Logistics",score: 71, category: "Disruption",    trend: "↑", color: "#fbbf24" },
          { name: "Client: Orvex Systems",     score: 22, category: "Churn Risk",    trend: "↓", color: "#4ade80" },
          { name: "Supplier: Kestrel Parts",   score: 58, category: "Disruption",    trend: "↑", color: "#fbbf24" },
        ],
      },
      bullets: [
        "Classification models trained on your own historical outcomes",
        "Score updated on each data refresh — always reflects current signals",
        "Explainable outputs: which factors are driving each score",
        "Alert triggers when any entity crosses a threshold you define",
      ],
    },
  },
  {
    icon: <Eye size={24} />,
    title: "Opportunity Surface Detection",
    desc: "Pattern recognition across your data that surfaces untapped revenue opportunities, underperforming segments, and timing windows your competitors aren't watching.",
    modal: {
      tagline: "The upside hiding in your own data.",
      overview:
        "Most businesses are sitting on revenue opportunities they can't see because the signal is buried in the noise of day-to-day data. Opportunity Surface Detection applies clustering and pattern-recognition models to your customer, product, and transaction data to surface segments that are undermonetized, timing windows where conversion rates spike, and cohorts ripe for expansion.",
      visual: {
        type: "opportunity-matrix",
        segments: [
          { x: 72, y: 28, size: 18, label: "Seg A",  status: "untapped",  note: "High LTV, low engagement" },
          { x: 30, y: 65, size: 12, label: "Seg B",  status: "optimised", note: "Fully monetised" },
          { x: 55, y: 55, size: 22, label: "Seg C",  status: "untapped",  note: "Large, low conversion" },
          { x: 18, y: 30, size: 8,  label: "Seg D",  status: "watch",     note: "Declining engagement" },
          { x: 82, y: 70, size: 14, label: "Seg E",  status: "untapped",  note: "High-intent, undersold" },
          { x: 45, y: 20, size: 10, label: "Seg F",  status: "optimised", note: "Stable performer" },
        ],
      },
      bullets: [
        "Clustering models segment your customers by behaviour, not just demographics",
        "Revenue gap analysis: what each segment could yield at peer-segment conversion rates",
        "Timing intelligence: when each segment is most likely to convert or expand",
        "Delivered as a ranked opportunity list with supporting evidence",
      ],
    },
  },
  {
    icon: <Activity size={24} />,
    title: "Anomaly & Trend Alerts",
    desc: "Automated detection of statistical anomalies and emerging trends in your operational data — delivered as real-time alerts before they move the needle in the wrong direction.",
    modal: {
      tagline: "The signal before the noise becomes a problem.",
      overview:
        "By the time an anomaly is visible to the naked eye in a dashboard, it's already been developing for days or weeks. Anomaly & Trend Alerts apply statistical process control and ML-based detection to your live data streams, identifying deviations from expected behaviour the moment they cross a significance threshold — and routing them to the right person immediately.",
      visual: {
        type: "anomaly-feed",
        events: [
          { time: "Today 09:14",   metric: "Order cancellation rate",   delta: "+340% vs 7-day avg",    severity: "critical" },
          { time: "Today 07:52",   metric: "API response latency",      delta: "+180% vs baseline",     severity: "warning"  },
          { time: "Yesterday",     metric: "Support ticket volume",     delta: "+62% vs 30-day avg",    severity: "warning"  },
          { time: "Yesterday",     metric: "Avg order value",           delta: "-28% vs 7-day avg",     severity: "critical" },
          { time: "2 days ago",    metric: "Email open rate",           delta: "+41% vs prior campaign",severity: "positive" },
        ],
      },
      bullets: [
        "Statistical and ML-based anomaly detection on every connected data stream",
        "Configurable sensitivity — reduces noise while catching signals that matter",
        "Email, Slack, or SMS routing to the right person for each alert type",
        "Trend detection alongside anomalies — emerging patterns, not just spikes",
      ],
    },
  },
  {
    icon: <Layers size={24} />,
    title: "Scenario Simulation Engine",
    desc: "Monte Carlo and sensitivity models that simulate thousands of futures based on your inputs. Stress-test decisions before committing capital or resources.",
    modal: {
      tagline: "Run 10,000 futures before committing to one.",
      overview:
        "Every major decision involves uncertain inputs. The Scenario Simulation Engine uses Monte Carlo methods to simulate thousands of possible outcomes based on the probability distributions of your key variables — revenue growth, churn, cost inflation, demand volatility. The result is a full distribution of outcomes, not a single point estimate, so you can see the realistic range of what could happen before you act.",
      visual: {
        type: "monte-carlo",
        distribution: [2, 4, 7, 11, 16, 21, 26, 28, 24, 19, 13, 8, 5, 3, 2],
        p10: 4,
        p50: 8,
        p90: 13,
        xLabel: "12-Month Revenue Outcome ($M)",
        xValues: ["$0.8","$1.0","$1.2","$1.4","$1.6","$1.8","$2.0","$2.2","$2.4","$2.6","$2.8","$3.0","$3.2","$3.4","$3.6"],
      },
      bullets: [
        "Monte Carlo simulation across your key uncertain input variables",
        "Sensitivity analysis shows which variables drive outcome variance most",
        "Toggle assumption ranges and re-run instantly from a dashboard",
        "Presentation-ready output: probability distributions, percentile bands, breakeven",
      ],
    },
  },
  {
    icon: <Target size={24} />,
    title: "Predictive KPI Dashboards",
    desc: "Forward-looking dashboards that show not just where you are, but where your metrics are headed — giving leadership a 30, 60, and 90-day visibility horizon.",
    modal: {
      tagline: "Your dashboard tells you where you are. Ours tells you where you're going.",
      overview:
        "Standard dashboards are rearview mirrors. Predictive KPI Dashboards sit on top of your live data and your trained models to show leadership not just current performance, but projected performance at 30, 60, and 90 days — with confidence intervals and the key drivers that will determine whether you hit your targets or miss them.",
      visual: {
        type: "predictive-kpis",
        kpis: [
          {
            label: "Monthly Revenue",
            current: "$1.24M",
            p30: "$1.31M", p60: "$1.38M", p90: "$1.44M",
            trend: "up",
            confidence: "High",
          },
          {
            label: "Customer Churn Rate",
            current: "2.8%",
            p30: "3.1%", p60: "3.4%", p90: "3.8%",
            trend: "down",
            confidence: "Medium",
          },
          {
            label: "Pipeline Value",
            current: "$840K",
            p30: "$920K", p60: "$1.05M", p90: "$1.12M",
            trend: "up",
            confidence: "High",
          },
        ],
      },
      bullets: [
        "30 / 60 / 90-day forward projections on every key metric",
        "Confidence bands shown alongside projections — no false precision",
        "Driver analysis: the top factors pushing each metric up or down",
        "Built on your existing BI platform with automatic model refresh",
      ],
    },
  },
];

// ── visual sub-components ─────────────────────────────────────────────────

function ForecastChart({ historical, forecast, lower, upper, splitAt, labels }) {
  const allValid = [...historical, ...forecast.filter(Boolean), ...lower.filter(Boolean), ...upper.filter(Boolean)];
  const max = Math.max(...allValid); const min = Math.min(...allValid);
  const range = max - min || 1;
  const w = 300; const h = 110; const padX = 8; const padY = 14;
  const n = labels.length;

  const px = (i) => padX + (i / (n - 1)) * (w - 2 * padX);
  const py = (v) => h - padY - ((v - min) / range) * (h - 2 * padY);

  const histPath = historical.map((v, i) => `${i === 0 ? "M" : "L"}${px(i)},${py(v)}`).join(" ");

  const forecastPoints = forecast.map((v, i) => v !== null ? { x: px(i), y: py(v) } : null).filter(Boolean);
  const fcPath = forecastPoints.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ");

  const upperPoints = upper.map((v, i) => v !== null ? { x: px(i), y: py(v) } : null).filter(Boolean);
  const lowerPoints = lower.map((v, i) => v !== null ? { x: px(i), y: py(v) } : null).filter(Boolean);
  const bandPath = upperPoints.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ")
    + " " + [...lowerPoints].reverse().map((p, i) => `${i === 0 ? "L" : "L"}${p.x},${p.y}`).join(" ") + " Z";

  const splitX = px(splitAt);

  return (
    <div style={{ background: C.bg, border: `1px solid ${C.border}`, borderRadius: 6, padding: "16px" }}>
      <div style={{ fontSize: 10, color: C.dim, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 10 }}>
        Demand Forecast — Historical + 5-Month Projection
      </div>
      <svg width="100%" viewBox={`0 0 ${w} ${h}`} style={{ overflow: "visible" }}>
        <defs>
          <linearGradient id="histGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={C.gold} stopOpacity="0.1" />
            <stop offset="100%" stopColor={C.gold} stopOpacity="0" />
          </linearGradient>
        </defs>
        {/* split line */}
        <line x1={splitX} y1={padY - 4} x2={splitX} y2={h - padY + 4}
          stroke={C.border} strokeWidth="1" strokeDasharray="4,3" />
        <text x={splitX - 4} y={padY - 6} textAnchor="end" fill={C.dim} fontSize="7">Historical</text>
        <text x={splitX + 4} y={padY - 6} textAnchor="start" fill={C.gold} fontSize="7">Forecast</text>

        {/* confidence band */}
        <path d={bandPath} fill="rgba(201,168,76,0.08)" />

        {/* historical line */}
        <path d={histPath} fill="none" stroke={C.goldDim} strokeWidth="2" />

        {/* forecast line */}
        <path d={fcPath} fill="none" stroke={C.gold} strokeWidth="2" strokeDasharray="5,3" />

        {/* labels */}
        {labels.filter((_, i) => i % 3 === 0).map((l, idx) => {
          const i = idx * 3;
          return <text key={i} x={px(i)} y={h - 2} textAnchor="middle" fill={C.dim} fontSize="7">{l}</text>;
        })}
      </svg>
      <div style={{ display: "flex", gap: 14, marginTop: 4 }}>
        {[[C.goldDim, "Historical"],[C.gold, "Forecast"],["rgba(201,168,76,0.4)","Confidence Band"]].map(([col, lbl]) => (
          <div key={lbl} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 10, color: C.muted }}>
            <span style={{ width: 16, height: 2, background: col, display: "inline-block" }} />{lbl}
          </div>
        ))}
      </div>
    </div>
  );
}

function RiskScores({ entities }) {
  const scoreColor = (s) => s >= 70 ? "#f87171" : s >= 45 ? "#fbbf24" : "#4ade80";
  return (
    <div style={{ background: C.bg, border: `1px solid ${C.border}`, borderRadius: 6, overflow: "hidden" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr auto auto", padding: "8px 14px", borderBottom: `1px solid ${C.border}` }}>
        {["Entity / Category", "Risk Score", ""].map((h, i) => (
          <div key={i} style={{ fontSize: 9, color: C.dim, letterSpacing: "0.12em", textTransform: "uppercase", textAlign: i === 0 ? "left" : "center" }}>{h}</div>
        ))}
      </div>
      {entities.map((e, i) => {
        const col = scoreColor(e.score);
        return (
          <div key={i} style={{
            display: "grid", gridTemplateColumns: "1fr auto auto",
            padding: "10px 14px", alignItems: "center",
            borderBottom: i < entities.length - 1 ? `1px solid ${C.border}` : "none",
            background: e.score >= 70 ? "rgba(248,113,113,0.05)" : "transparent",
          }}>
            <div>
              <div style={{ fontSize: 12, color: C.text }}>{e.name}</div>
              <div style={{ fontSize: 10, color: C.dim, marginTop: 2 }}>{e.category}</div>
            </div>
            <div style={{ minWidth: 80, textAlign: "center" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6, justifyContent: "center" }}>
                <div style={{ flex: 1, height: 4, background: C.border, borderRadius: 2, overflow: "hidden", maxWidth: 48 }}>
                  <div style={{ width: `${e.score}%`, height: "100%", background: col, borderRadius: 2 }} />
                </div>
                <span style={{ fontSize: 12, fontWeight: 700, color: col, minWidth: 24 }}>{e.score}</span>
              </div>
            </div>
            <div style={{ fontSize: 14, color: col, minWidth: 20, textAlign: "center" }}>{e.trend}</div>
          </div>
        );
      })}
    </div>
  );
}

function OpportunityMatrix({ segments }) {
  const statusColor = { untapped: C.gold, optimised: "#4ade80", watch: "#f87171" };
  const statusLabel = { untapped: "Untapped", optimised: "Optimised", watch: "At Risk" };
  return (
    <div style={{ background: C.bg, border: `1px solid ${C.border}`, borderRadius: 6, overflow: "hidden" }}>
      <div style={{ padding: "10px 14px", borderBottom: `1px solid ${C.border}`, display: "flex", gap: 12 }}>
        {Object.entries(statusColor).map(([k, col]) => (
          <div key={k} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 10, color: C.muted }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: col, display: "inline-block" }} />
            {statusLabel[k]}
          </div>
        ))}
      </div>
      <div style={{ padding: "4px 0" }}>
        {segments.map((s, i) => (
          <div key={i} style={{
            display: "flex", alignItems: "center", gap: 10, padding: "8px 14px",
            borderBottom: i < segments.length - 1 ? `1px solid ${C.border}` : "none",
          }}>
            <div style={{
              width: s.size, height: s.size, borderRadius: "50%", flexShrink: 0,
              background: statusColor[s.status] + "33",
              border: `1.5px solid ${statusColor[s.status]}`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 8, color: statusColor[s.status], fontWeight: 700,
            }}>{s.label}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 11, color: C.text }}>{s.note}</div>
            </div>
            <div style={{ fontSize: 10, color: statusColor[s.status], fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}>
              {statusLabel[s.status]}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AnomalyFeed({ events }) {
  const sevColor = { critical: "#f87171", warning: "#fbbf24", positive: "#4ade80" };
  const sevBg    = { critical: "rgba(248,113,113,0.07)", warning: "rgba(251,191,36,0.05)", positive: "rgba(74,222,128,0.05)" };
  return (
    <div style={{ background: C.bg, border: `1px solid ${C.border}`, borderRadius: 6, overflow: "hidden" }}>
      {events.map((e, i) => (
        <div key={i} style={{
          padding: "10px 14px", display: "flex", alignItems: "flex-start", gap: 10,
          background: sevBg[e.severity],
          borderBottom: i < events.length - 1 ? `1px solid ${C.border}` : "none",
        }}>
          <div style={{
            width: 6, height: 6, borderRadius: "50%",
            background: sevColor[e.severity], flexShrink: 0, marginTop: 5,
            boxShadow: `0 0 6px ${sevColor[e.severity]}`,
          }} />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 12, color: C.text }}>{e.metric}</div>
            <div style={{ fontSize: 11, color: sevColor[e.severity], marginTop: 2 }}>{e.delta}</div>
          </div>
          <div style={{ fontSize: 10, color: C.dim, flexShrink: 0 }}>{e.time}</div>
        </div>
      ))}
    </div>
  );
}

function MonteCarlo({ distribution, p10, p50, p90, xLabel, xValues }) {
  const max = Math.max(...distribution);
  const w = 300; const h = 100; const padX = 8; const padY = 12;
  const barW = (w - 2 * padX) / distribution.length;

  return (
    <div style={{ background: C.bg, border: `1px solid ${C.border}`, borderRadius: 6, padding: "16px" }}>
      <div style={{ fontSize: 10, color: C.dim, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 10 }}>
        {xLabel} — Simulated Distribution (10,000 runs)
      </div>
      <svg width="100%" viewBox={`0 0 ${w} ${h}`}>
        {distribution.map((v, i) => {
          const bh = (v / max) * (h - padY - 8);
          const isP50 = i === p50;
          const isPessimistic = i <= p10;
          const isOptimistic  = i >= p90;
          const col = isPessimistic ? "#f87171" : isOptimistic ? "#4ade80" : C.gold;
          return (
            <g key={i}>
              <rect
                x={padX + i * barW + 1} y={h - padY - bh}
                width={barW - 2} height={bh}
                fill={col} opacity={isP50 ? 1 : 0.55} rx="1"
              />
            </g>
          );
        })}
        {[p10, p50, p90].map((pi, idx) => {
          const x = padX + pi * barW + barW / 2;
          const label = ["P10","P50","P90"][idx];
          const col = ["#f87171", C.gold, "#4ade80"][idx];
          return (
            <g key={idx}>
              <line x1={x} y1={8} x2={x} y2={h - padY} stroke={col} strokeWidth="1" strokeDasharray="3,2" opacity="0.7" />
              <text x={x} y={6} textAnchor="middle" fill={col} fontSize="7" fontWeight="600">{label}</text>
            </g>
          );
        })}
        {xValues.filter((_, i) => i % 4 === 0).map((v, idx) => {
          const i = idx * 4;
          return <text key={i} x={padX + i * barW} y={h - 2} fill={C.dim} fontSize="6">{v}</text>;
        })}
      </svg>
      <div style={{ display: "flex", gap: 12, marginTop: 6 }}>
        {[["#f87171","Pessimistic (P10)"],[C.gold,"Base (P50)"],["#4ade80","Optimistic (P90)"]].map(([col, lbl]) => (
          <div key={lbl} style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 10, color: C.muted }}>
            <span style={{ width: 8, height: 8, background: col, display: "inline-block", borderRadius: 1, opacity: 0.8 }} />{lbl}
          </div>
        ))}
      </div>
    </div>
  );
}

function PredictiveKPIs({ kpis }) {
  return (
    <div style={{ background: C.bg, border: `1px solid ${C.border}`, borderRadius: 6, overflow: "hidden" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr auto auto auto auto", padding: "8px 14px", borderBottom: `1px solid ${C.border}`, gap: 4 }}>
        {["KPI", "Now", "+30d", "+60d", "+90d"].map((h, i) => (
          <div key={i} style={{ fontSize: 9, color: C.dim, letterSpacing: "0.12em", textTransform: "uppercase", textAlign: i === 0 ? "left" : "center" }}>{h}</div>
        ))}
      </div>
      {kpis.map((k, i) => {
        const arrowColor = k.trend === "up" ? "#4ade80" : "#f87171";
        const arrow = k.trend === "up" ? "▲" : "▼";
        return (
          <div key={i} style={{
            display: "grid", gridTemplateColumns: "1fr auto auto auto auto",
            padding: "11px 14px", alignItems: "center", gap: 4,
            borderBottom: i < kpis.length - 1 ? `1px solid ${C.border}` : "none",
          }}>
            <div>
              <div style={{ fontSize: 12, color: C.text }}>{k.label}</div>
              <div style={{ fontSize: 9, color: C.dim, marginTop: 1 }}>Confidence: {k.confidence}</div>
            </div>
            <div style={{ fontSize: 12, fontWeight: 700, color: C.text, minWidth: 52, textAlign: "center" }}>{k.current}</div>
            {[k.p30, k.p60, k.p90].map((v, pi) => (
              <div key={pi} style={{ fontSize: 11, color: arrowColor, minWidth: 52, textAlign: "center" }}>
                {arrow} {v}
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
}

function ModalVisual({ v }) {
  if (!v) return null;
  if (v.type === "forecast-chart")    return <ForecastChart {...v} />;
  if (v.type === "risk-scores")       return <RiskScores entities={v.entities} />;
  if (v.type === "opportunity-matrix")return <OpportunityMatrix segments={v.segments} />;
  if (v.type === "anomaly-feed")      return <AnomalyFeed events={v.events} />;
  if (v.type === "monte-carlo")       return <MonteCarlo {...v} />;
  if (v.type === "predictive-kpis")   return <PredictiveKPIs kpis={v.kpis} />;
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

// ── grid ──────────────────────────────────────────────────────────────────

export default function PredictiveDeliverablesSection() {
  const [active, setActive] = useState(null);
  const close = useCallback(() => setActive(null), []);

  return (
    <>
      <style>{`
        .pred-deliverable-cell {
          background: ${C.surface};
          padding: 36px 32px;
          transition: background 0.25s;
          position: relative; overflow: hidden;
          cursor: pointer;
        }
        .pred-deliverable-cell::before {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(135deg, rgba(201,168,76,0.07), transparent);
          opacity: 0; transition: opacity 0.3s;
        }
        .pred-deliverable-cell:hover::before { opacity: 1; }
        .pred-deliverable-cell:hover .pred-del-icon {
          border-color: ${C.goldDim} !important;
          background: rgba(201,168,76,0.08) !important;
        }
        .pred-deliverable-cell:hover .pred-del-title { color: ${C.goldLt} !important; }
        .pred-cell-hint {
          position: absolute; bottom: 14px; right: 16px;
          font-size: 9px; letter-spacing: 0.15em; text-transform: uppercase;
          color: ${C.goldDim}; opacity: 0; transition: opacity 0.25s;
          display: flex; align-items: center; gap: 4px;
        }
        .pred-deliverable-cell:hover .pred-cell-hint { opacity: 1; }
      `}</style>

      <div style={{
        display: "grid", gridTemplateColumns: "repeat(3, 1fr)",
        gap: 1, background: C.border,
        border: `1px solid ${C.border}`, marginTop: 64,
      }}>
        {deliverables.map((d, i) => (
          <div
            key={i}
            className="pred-deliverable-cell"
            onClick={() => setActive(i)}
            role="button"
            tabIndex={0}
            onKeyDown={e => e.key === "Enter" && setActive(i)}
            aria-label={`Learn more about ${d.title}`}
          >
            <div
              className="pred-del-icon"
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
              className="pred-del-title"
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
            <div className="pred-cell-hint">
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
