"use client";

import { useState, useEffect, useCallback } from "react";
import {
  BarChart2, TrendingUp, PieChart, AlertTriangle, Target, Shield,
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
    title: "Revenue & Margin Analysis",
    desc: "Detailed breakdown of revenue streams, gross margins, and contribution margins by product, service line, or customer segment.",
    modal: {
      tagline: "Know exactly where your profit comes from.",
      overview:
        "Most businesses know their top-line revenue. Far fewer know which products, clients, or service lines are actually making them money. Revenue & Margin Analysis cuts through the noise and shows you your true profitability — broken down by every dimension that matters to your business.",
      visual: {
        type: "margin-table",
        rows: [
          { segment: "Product A",    revenue: "$420K", gm: "68%",  contrib: "$285K", status: "strong" },
          { segment: "Product B",    revenue: "$310K", gm: "41%",  contrib: "$127K", status: "mid"    },
          { segment: "Service Line", revenue: "$195K", gm: "82%",  contrib: "$160K", status: "strong" },
          { segment: "Client C",     revenue: "$88K",  gm: "19%",  contrib: "$17K",  status: "weak"   },
        ],
      },
      bullets: [
        "Revenue broken down by product, service, client, and channel",
        "Gross margin and contribution margin calculated for every segment",
        "Side-by-side comparison vs. prior period and budget",
        "Identifies which segments to grow — and which to reconsider",
      ],
    },
  },
  {
    icon: <TrendingUp size={24} />,
    title: "Cash Flow Forecasting",
    desc: "Rolling 13-week and 12-month cash flow models that show exactly where your money is going and when pressure points will occur.",
    modal: {
      tagline: "See the crunch before it arrives.",
      overview:
        "Cash flow surprises kill businesses that are otherwise profitable. Our rolling cash flow models give you a clear forward view — 13 weeks for operational decisions, 12 months for strategic planning — so you always know what's coming and have time to act before it becomes a crisis.",
      visual: {
        type: "cashflow-chart",
        weeks: ["W1","W2","W3","W4","W5","W6","W7","W8"],
        inflows:  [180, 210, 160, 230, 195, 170, 250, 220],
        outflows: [155, 190, 175, 200, 210, 165, 180, 195],
      },
      bullets: [
        "Rolling 13-week model updated with your live data",
        "12-month strategic forecast with scenario toggles",
        "Pressure point flags — weeks where cash dips below your floor",
        "Tied directly to your accounts payable and receivable cycles",
      ],
    },
  },
  {
    icon: <PieChart size={24} />,
    title: "Expense Intelligence",
    desc: "Categorized expense analysis with variance reporting against budget, identifying waste and optimization opportunities.",
    modal: {
      tagline: "Every dollar accounted for. Every leak found.",
      overview:
        "Expenses left unexamined always grow. Expense Intelligence categorizes every outgoing dollar, compares it to your budget, and highlights the variances that matter — whether that's a vendor relationship that's drifted out of control or a category where you're consistently under-utilizing your budget.",
      visual: {
        type: "expense-variance",
        rows: [
          { category: "Payroll",        budget: "$85K",  actual: "$87K",  variance: "+$2K",   pct: "+2.4%",  flag: false },
          { category: "Software & SaaS",budget: "$12K",  actual: "$18K",  variance: "+$6K",   pct: "+50%",   flag: true  },
          { category: "Marketing",      budget: "$20K",  actual: "$17K",  variance: "-$3K",   pct: "-15%",   flag: false },
          { category: "Logistics",      budget: "$30K",  actual: "$34K",  variance: "+$4K",   pct: "+13.3%", flag: true  },
          { category: "Facilities",     budget: "$8K",   actual: "$8K",   variance: "$0",     pct: "0%",     flag: false },
        ],
      },
      bullets: [
        "Every expense category mapped and tracked against budget",
        "Variance alerts for categories drifting significantly over plan",
        "Month-over-month and year-over-year trend lines per category",
        "Optimization recommendations based on benchmark data",
      ],
    },
  },
  {
    icon: <AlertTriangle size={24} />,
    title: "Risk Flag Reports",
    desc: "Automated alerts when key financial ratios move outside acceptable thresholds — before small problems become large ones.",
    modal: {
      tagline: "Your early warning system. Always on.",
      overview:
        "Financial problems rarely appear suddenly — they build over weeks and months while the signals go unnoticed in raw data. Risk Flag Reports monitor your key financial ratios continuously and trigger alerts the moment something moves outside the thresholds you've defined, giving you time to respond rather than react.",
      visual: {
        type: "risk-flags",
        flags: [
          { metric: "Current Ratio",       value: "1.4x",  threshold: "> 1.5x", status: "amber", trend: "↓" },
          { metric: "Days Sales Outstanding", value: "54d", threshold: "< 45d",  status: "red",   trend: "↑" },
          { metric: "Debt-to-Equity",      value: "0.6x",  threshold: "< 1.0x", status: "green", trend: "→" },
          { metric: "Gross Margin %",       value: "58%",   threshold: "> 55%",  status: "green", trend: "↑" },
          { metric: "Operating Cash Flow",  value: "-$12K", threshold: "> $0",   status: "red",   trend: "↓" },
        ],
      },
      bullets: [
        "Monitors current ratio, DSO, burn rate, margin, and more",
        "Thresholds customized to your business model and industry",
        "Email or Slack alerts the moment a flag is triggered",
        "Historical trend shown for every flagged metric",
      ],
    },
  },
  {
    icon: <Target size={24} />,
    title: "KPI Dashboard",
    desc: "A live, always-current financial dashboard tracking your most critical metrics, delivered on your preferred BI platform.",
    modal: {
      tagline: "Your financial pulse. Always live.",
      overview:
        "The KPI Dashboard is your single source of financial truth — built on the BI platform you already use or the one we recommend for your scale. Every metric refreshes automatically from your connected data sources so the number you see when you open it is always today's number, not last month's export.",
      visual: {
        type: "kpi-tiles",
        tiles: [
          { label: "MRR",              value: "$94K",   delta: "+6.2%",  up: true  },
          { label: "Net Profit Margin",value: "18.4%",  delta: "+0.8pp", up: true  },
          { label: "Cash on Hand",     value: "$312K",  delta: "-4.1%",  up: false },
          { label: "Burn Rate",        value: "$38K/mo",delta: "+$2K",   up: false },
          { label: "ARR",              value: "$1.13M", delta: "+11%",   up: true  },
          { label: "Runway",           value: "8.2 mo", delta: "-0.6mo", up: false },
        ],
      },
      bullets: [
        "Built on Power BI, Tableau, Looker, or your existing platform",
        "Auto-refreshes on your defined schedule — no manual updates",
        "Role-restricted so each stakeholder sees their relevant view",
        "Mobile-accessible for on-the-go checks",
      ],
    },
  },
  {
    icon: <Shield size={24} />,
    title: "Scenario Modeling",
    desc: "Best case, base case, and worst case financial models so you can make decisions with full awareness of downside risk.",
    modal: {
      tagline: "Make decisions knowing all three futures.",
      overview:
        "Every major business decision carries uncertainty. Scenario Modeling removes the guesswork by building three rigorous financial projections — optimistic, realistic, and pessimistic — so you can evaluate any decision against its full range of outcomes and choose a path with your eyes open.",
      visual: {
        type: "scenario-chart",
        months: ["M1","M2","M3","M4","M5","M6"],
        best:   [100, 118, 140, 168, 195, 230],
        base:   [100, 108, 118, 128, 140, 155],
        worst:  [100,  92,  85,  79,  74,  70],
      },
      bullets: [
        "Three fully modeled scenarios for any strategic decision",
        "Toggle assumptions (price, volume, cost) and see instant impact",
        "Breakeven analysis and payback period for every scenario",
        "Presentation-ready output for investors, lenders, or the board",
      ],
    },
  },
];

// ── visual sub-components ─────────────────────────────────────────────────

function MarginTable({ rows }) {
  const color = { strong: "#4ade80", mid: C.gold, weak: "#f87171" };
  const bgCol = { strong: "rgba(74,222,128,0.06)", mid: "rgba(201,168,76,0.06)", weak: "rgba(248,113,113,0.06)" };
  return (
    <div style={{ background: C.bg, border: `1px solid ${C.border}`, borderRadius: 6, overflow: "hidden" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr auto auto auto", padding: "8px 14px", borderBottom: `1px solid ${C.border}` }}>
        {["Segment","Revenue","Gross Margin","Contribution"].map(h => (
          <div key={h} style={{ fontSize: 9, color: C.dim, letterSpacing: "0.12em", textTransform: "uppercase", textAlign: h === "Segment" ? "left" : "center" }}>{h}</div>
        ))}
      </div>
      {rows.map((r, i) => (
        <div key={i} style={{
          display: "grid", gridTemplateColumns: "1fr auto auto auto",
          padding: "10px 14px", alignItems: "center",
          background: bgCol[r.status],
          borderBottom: i < rows.length - 1 ? `1px solid ${C.border}` : "none",
        }}>
          <div style={{ fontSize: 12, color: C.text }}>{r.segment}</div>
          <div style={{ fontSize: 12, color: C.muted, minWidth: 60, textAlign: "center" }}>{r.revenue}</div>
          <div style={{ fontSize: 12, fontWeight: 600, color: color[r.status], minWidth: 50, textAlign: "center" }}>{r.gm}</div>
          <div style={{ fontSize: 12, color: C.muted, minWidth: 60, textAlign: "center" }}>{r.contrib}</div>
        </div>
      ))}
    </div>
  );
}

function CashFlowChart({ weeks, inflows, outflows }) {
  const allVals = [...inflows, ...outflows];
  const max = Math.max(...allVals); const min = 0;
  const w = 300; const h = 110; const padX = 10; const padY = 12;
  const barW = (w - 2 * padX) / weeks.length;

  const barY  = (v) => padY + (1 - v / max) * (h - 2 * padY);
  const barH  = (v) => (v / max) * (h - 2 * padY);

  return (
    <div style={{ background: C.bg, border: `1px solid ${C.border}`, borderRadius: 6, padding: "16px" }}>
      <div style={{ fontSize: 10, color: C.dim, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 10 }}>
        Cash In vs. Out — 8-Week Rolling ($K)
      </div>
      <svg width="100%" viewBox={`0 0 ${w} ${h}`}>
        {weeks.map((wk, i) => {
          const x = padX + i * barW;
          const inH = barH(inflows[i]); const outH = barH(outflows[i]);
          const net = inflows[i] - outflows[i];
          return (
            <g key={i}>
              <rect x={x + 2} y={barY(inflows[i])} width={barW / 2 - 3} height={inH}
                fill="rgba(74,222,128,0.5)" rx="1" />
              <rect x={x + barW / 2 + 1} y={barY(outflows[i])} width={barW / 2 - 3} height={outH}
                fill={net >= 0 ? "rgba(201,168,76,0.4)" : "rgba(248,113,113,0.5)"} rx="1" />
              <text x={x + barW / 2} y={h - 2} textAnchor="middle" fill={C.dim} fontSize="7">{wk}</text>
            </g>
          );
        })}
      </svg>
      <div style={{ display: "flex", gap: 16, marginTop: 6 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 10, color: C.muted }}>
          <span style={{ width: 10, height: 10, background: "rgba(74,222,128,0.5)", display: "inline-block", borderRadius: 1 }} />Inflows
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 10, color: C.muted }}>
          <span style={{ width: 10, height: 10, background: "rgba(201,168,76,0.4)", display: "inline-block", borderRadius: 1 }} />Outflows
        </div>
      </div>
    </div>
  );
}

function ExpenseVariance({ rows }) {
  return (
    <div style={{ background: C.bg, border: `1px solid ${C.border}`, borderRadius: 6, overflow: "hidden" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr auto auto auto auto", padding: "8px 14px", borderBottom: `1px solid ${C.border}` }}>
        {["Category","Budget","Actual","Variance",""].map((h, i) => (
          <div key={i} style={{ fontSize: 9, color: C.dim, letterSpacing: "0.12em", textTransform: "uppercase", textAlign: i === 0 ? "left" : "center" }}>{h}</div>
        ))}
      </div>
      {rows.map((r, i) => (
        <div key={i} style={{
          display: "grid", gridTemplateColumns: "1fr auto auto auto auto",
          padding: "9px 14px", alignItems: "center",
          background: r.flag ? "rgba(248,113,113,0.05)" : "transparent",
          borderBottom: i < rows.length - 1 ? `1px solid ${C.border}` : "none",
        }}>
          <div style={{ fontSize: 12, color: C.text }}>{r.category}</div>
          <div style={{ fontSize: 11, color: C.dim, minWidth: 48, textAlign: "center" }}>{r.budget}</div>
          <div style={{ fontSize: 12, fontWeight: 600, color: C.text, minWidth: 48, textAlign: "center" }}>{r.actual}</div>
          <div style={{ fontSize: 11, color: r.flag ? "#f87171" : C.muted, minWidth: 48, textAlign: "center" }}>{r.variance}</div>
          <div style={{ minWidth: 28, textAlign: "center" }}>
            {r.flag && <AlertTriangle size={11} color="#f87171" />}
          </div>
        </div>
      ))}
    </div>
  );
}

function RiskFlags({ flags }) {
  const colour = { green: "#4ade80", amber: "#fbbf24", red: "#f87171" };
  const bg     = { green: "rgba(74,222,128,0.06)", amber: "rgba(251,191,36,0.06)", red: "rgba(248,113,113,0.07)" };
  return (
    <div style={{ background: C.bg, border: `1px solid ${C.border}`, borderRadius: 6, overflow: "hidden" }}>
      {flags.map((f, i) => (
        <div key={i} style={{
          display: "grid", gridTemplateColumns: "1fr auto auto auto",
          padding: "10px 14px", alignItems: "center",
          background: bg[f.status],
          borderBottom: i < flags.length - 1 ? `1px solid ${C.border}` : "none",
          gap: 8,
        }}>
          <div style={{ fontSize: 12, color: C.text }}>{f.metric}</div>
          <div style={{ fontSize: 12, fontWeight: 700, color: colour[f.status], minWidth: 56, textAlign: "right" }}>{f.value}</div>
          <div style={{ fontSize: 10, color: C.dim, minWidth: 60, textAlign: "center" }}>floor {f.threshold}</div>
          <div style={{ fontSize: 14, color: colour[f.status], minWidth: 16, textAlign: "center" }}>{f.trend}</div>
        </div>
      ))}
    </div>
  );
}

function KpiTiles({ tiles }) {
  return (
    <div style={{
      background: C.bg, border: `1px solid ${C.border}`, borderRadius: 6,
      padding: "16px", display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8,
    }}>
      {tiles.map((t, i) => (
        <div key={i} style={{
          background: C.surface, border: `1px solid ${C.border}`,
          borderRadius: 4, padding: "12px 14px",
        }}>
          <div style={{ fontSize: 9, color: C.dim, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 6 }}>{t.label}</div>
          <div style={{ fontSize: "1.1rem", fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, color: C.text, lineHeight: 1 }}>{t.value}</div>
          <div style={{ fontSize: 10, color: t.up ? "#4ade80" : "#f87171", marginTop: 4 }}>
            {t.up ? "▲" : "▼"} {t.delta}
          </div>
        </div>
      ))}
    </div>
  );
}

function ScenarioChart({ months, best, base, worst }) {
  const all = [...best, ...base, ...worst];
  const max = Math.max(...all); const min = Math.min(...all);
  const range = max - min || 1;
  const w = 300; const h = 110; const padX = 10; const padY = 14;

  const px = (i) => padX + (i / (months.length - 1)) * (w - 2 * padX);
  const py = (v) => h - padY - ((v - min) / range) * (h - 2 * padY);

  const linePath = (pts) => pts.map((v, i) => `${i === 0 ? "M" : "L"}${px(i)},${py(v)}`).join(" ");
  const areaPath = (pts, base100) => {
    const top = linePath(pts);
    const bottomPts = [...pts].map((_, i) => `L${px(pts.length - 1 - i)},${py(base100)}`);
    return `${top} ${bottomPts.join(" ")} Z`;
  };

  return (
    <div style={{ background: C.bg, border: `1px solid ${C.border}`, borderRadius: 6, padding: "16px" }}>
      <div style={{ fontSize: 10, color: C.dim, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 10 }}>
        Revenue Scenarios — Indexed to Month 1
      </div>
      <svg width="100%" viewBox={`0 0 ${w} ${h}`} style={{ overflow: "visible" }}>
        <path d={linePath(best)}  fill="none" stroke="#4ade80" strokeWidth="1.5" strokeDasharray="4,2" />
        <path d={linePath(base)}  fill="none" stroke={C.gold}  strokeWidth="2" />
        <path d={linePath(worst)} fill="none" stroke="#f87171" strokeWidth="1.5" strokeDasharray="4,2" />
        {months.map((m, i) => (
          <text key={i} x={px(i)} y={h - 2} textAnchor="middle" fill={C.dim} fontSize="7">{m}</text>
        ))}
      </svg>
      <div style={{ display: "flex", gap: 14, marginTop: 6 }}>
        {[["#4ade80","Best Case"],[ C.gold,"Base Case"],["#f87171","Worst Case"]].map(([col, label]) => (
          <div key={label} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 10, color: C.muted }}>
            <span style={{ width: 16, height: 2, background: col, display: "inline-block" }} />{label}
          </div>
        ))}
      </div>
    </div>
  );
}

function ModalVisual({ v }) {
  if (!v) return null;
  if (v.type === "margin-table")      return <MarginTable rows={v.rows} />;
  if (v.type === "cashflow-chart")    return <CashFlowChart weeks={v.weeks} inflows={v.inflows} outflows={v.outflows} />;
  if (v.type === "expense-variance")  return <ExpenseVariance rows={v.rows} />;
  if (v.type === "risk-flags")        return <RiskFlags flags={v.flags} />;
  if (v.type === "kpi-tiles")         return <KpiTiles tiles={v.tiles} />;
  if (v.type === "scenario-chart")    return <ScenarioChart months={v.months} best={v.best} base={v.base} worst={v.worst} />;
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

export default function FinancialDeliverablesSection() {
  const [active, setActive] = useState(null);
  const close = useCallback(() => setActive(null), []);

  return (
    <>
      <style>{`
        .fin-deliverable-cell {
          background: ${C.surface};
          padding: 36px 32px;
          transition: background 0.25s;
          position: relative; overflow: hidden;
          cursor: pointer;
        }
        .fin-deliverable-cell::before {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(135deg, rgba(201,168,76,0.07), transparent);
          opacity: 0; transition: opacity 0.3s;
        }
        .fin-deliverable-cell:hover::before { opacity: 1; }
        .fin-deliverable-cell:hover .fin-del-icon {
          border-color: ${C.goldDim} !important;
          background: rgba(201,168,76,0.08) !important;
        }
        .fin-deliverable-cell:hover .fin-del-title { color: ${C.goldLt} !important; }
        .fin-cell-hint {
          position: absolute; bottom: 14px; right: 16px;
          font-size: 9px; letter-spacing: 0.15em; text-transform: uppercase;
          color: ${C.goldDim}; opacity: 0; transition: opacity 0.25s;
          display: flex; align-items: center; gap: 4px;
        }
        .fin-deliverable-cell:hover .fin-cell-hint { opacity: 1; }
      `}</style>

      <div style={{
        display: "grid", gridTemplateColumns: "repeat(3, 1fr)",
        gap: 1, background: C.border,
        border: `1px solid ${C.border}`, marginTop: 64,
      }}>
        {deliverables.map((d, i) => (
          <div
            key={i}
            className="fin-deliverable-cell"
            onClick={() => setActive(i)}
            role="button"
            tabIndex={0}
            onKeyDown={e => e.key === "Enter" && setActive(i)}
            aria-label={`Learn more about ${d.title}`}
          >
            <div
              className="fin-del-icon"
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
              className="fin-del-title"
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
            <div className="fin-cell-hint">
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
