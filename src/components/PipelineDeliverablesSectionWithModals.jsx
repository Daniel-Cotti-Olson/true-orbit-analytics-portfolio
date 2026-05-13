"use client";

import { useState, useEffect, useCallback } from "react";
import {
  GitBranch, RefreshCw, Shield, Activity, Layers, Lock,
  X, ArrowRight, Check, CheckCircle, AlertCircle
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
    icon: <GitBranch size={24} />,
    title: "Source-to-Destination Pipelines",
    desc: "Fully automated data flows connecting every source system — CRM, ERP, accounting, marketing, operations — to a centralized destination your analytics layer can trust.",
    modal: {
      tagline: "Every system connected. One version of truth.",
      overview:
        "Most businesses run on five to fifteen different systems, each holding a piece of the picture. Source-to-Destination Pipelines connect all of them into a single, centralized data destination — automatically, reliably, and without anyone having to touch a spreadsheet. The result is one trusted source your entire analytics layer can build on.",
      visual: {
        type: "source-map",
        sources: [
          { name: "Salesforce",  category: "CRM",       color: "#3b82f6" },
          { name: "NetSuite",    category: "ERP",        color: "#8b5cf6" },
          { name: "Xero",        category: "Accounting", color: "#06b6d4" },
          { name: "HubSpot",     category: "Marketing",  color: "#f97316" },
          { name: "Shopify",     category: "Commerce",   color: "#10b981" },
          { name: "Custom APIs", category: "Operations", color: C.gold    },
        ],
        destination: "Data Warehouse",
      },
      bullets: [
        "Connects CRM, ERP, accounting, marketing, payments, and custom sources",
        "Each pipeline fully documented with schema, refresh schedule, and owner",
        "Incremental loads where possible — efficient and cost-effective at scale",
        "Tested end-to-end before handover with data validation checks",
      ],
    },
  },
  {
    icon: <RefreshCw size={24} />,
    title: "Scheduled & Event-Driven Refresh",
    desc: "Pipelines that run on your schedule — hourly, daily, or triggered by upstream events — so your dashboards and reports always reflect the current state of your business.",
    modal: {
      tagline: "Fresh data when you need it. Every time.",
      overview:
        "A pipeline that ran successfully yesterday is only useful if it runs again today. Every pipeline we build is configured with a refresh schedule tailored to how frequently your business actually needs that data — down to near real-time for operational decisions, daily for strategic reporting. Event-driven triggers handle the cases where time-based scheduling isn't enough.",
      visual: {
        type: "schedule-view",
        pipelines: [
          { name: "Salesforce → Warehouse",  freq: "Every 1hr",   lastRun: "14 min ago", status: "ok"      },
          { name: "Xero → Warehouse",        freq: "Every 6hr",   lastRun: "2hr ago",    status: "ok"      },
          { name: "HubSpot → Warehouse",     freq: "Every 4hr",   lastRun: "38 min ago", status: "ok"      },
          { name: "Shopify → Warehouse",     freq: "Every 30min", lastRun: "8 min ago",  status: "ok"      },
          { name: "Custom ERP → Warehouse",  freq: "Daily 02:00", lastRun: "6hr ago",    status: "warning" },
        ],
      },
      bullets: [
        "Time-based scheduling: hourly, daily, weekly, or custom cron",
        "Event-driven triggers for upstream system webhooks or file arrivals",
        "Retry logic with configurable back-off on transient failures",
        "Refresh cadence matched to your actual reporting and operational needs",
      ],
    },
  },
  {
    icon: <Shield size={24} />,
    title: "Data Cleaning & Normalization",
    desc: "Automated transformation logic that catches duplicates, resolves conflicts, standardizes formats, and enforces business rules before data reaches your reports.",
    modal: {
      tagline: "Garbage in, clean data out.",
      overview:
        "Raw data from operational systems is almost never analysis-ready. Fields are misnamed, formats inconsistent, duplicates rampant, and business logic absent. Our transformation layer runs every record through a defined set of cleaning and normalization rules before it ever reaches a dashboard — so the numbers your team sees are ones you can actually rely on.",
      visual: {
        type: "transform-pipeline",
        steps: [
          {
            label: "Raw Input",
            examples: ["date: '2024/01/05'", "name: 'ACME corp'", "amount: '1,200.00'", "customer_id: NULL"],
            color: "#f87171",
          },
          {
            label: "Transformation",
            rules: ["Standardize dates → ISO 8601", "Title-case names", "Parse numeric strings", "Resolve NULL IDs via lookup"],
            color: C.gold,
          },
          {
            label: "Clean Output",
            examples: ["date: 2024-01-05", "name: 'Acme Corp'", "amount: 1200.00", "customer_id: 'C-0482'"],
            color: "#4ade80",
          },
        ],
      },
      bullets: [
        "Deduplication logic tailored to each source system's quirks",
        "Format standardization across dates, currencies, names, and IDs",
        "Business rule encoding — same logic applied consistently everywhere",
        "Data quality tests run on every load with failure alerting",
      ],
    },
  },
  {
    icon: <Activity size={24} />,
    title: "Pipeline Monitoring & Alerting",
    desc: "Real-time monitoring of every pipeline run with automated alerts when something breaks, stalls, or produces anomalous output — before it contaminates your reporting.",
    modal: {
      tagline: "You know before your team does.",
      overview:
        "Silent pipeline failures are the most dangerous kind. A pipeline that stops running doesn't announce itself — it just quietly stops delivering fresh data while your team makes decisions on stale numbers. Our monitoring layer watches every run, checks every output for anomalies, and sends an alert the moment anything deviates from expected behaviour.",
      visual: {
        type: "monitor-log",
        runs: [
          { pipeline: "Salesforce → WH",   time: "09:00", duration: "1m 12s", rows: "4,821",  status: "success" },
          { pipeline: "Xero → WH",         time: "09:00", duration: "43s",    rows: "312",    status: "success" },
          { pipeline: "HubSpot → WH",      time: "08:00", duration: "2m 04s", rows: "1,940",  status: "success" },
          { pipeline: "Custom ERP → WH",   time: "02:00", duration: "—",      rows: "—",      status: "failed"  },
          { pipeline: "Shopify → WH",      time: "08:30", duration: "28s",    rows: "88",     status: "success" },
        ],
      },
      bullets: [
        "Every pipeline run logged with duration, row count, and status",
        "Anomaly detection flags unexpected drops in row volume",
        "Email and Slack alerts on failure, stall, or data quality breach",
        "Dashboard showing pipeline health across your entire data infrastructure",
      ],
    },
  },
  {
    icon: <Layers size={24} />,
    title: "Centralized Data Warehouse",
    desc: "A single, structured destination for all your business data — modeled logically, documented clearly, and optimized for the queries your BI tools need to run fast.",
    modal: {
      tagline: "One place. Every number. Always correct.",
      overview:
        "A data warehouse isn't just storage — it's the logical model of your entire business expressed in data. We design and build the warehouse layer that organizes raw source data into clean, well-documented tables structured around the way your business actually works. The result is a foundation every analyst, dashboard, and report can build on confidently.",
      visual: {
        type: "warehouse-layers",
        layers: [
          {
            name: "Raw Layer",
            desc: "Untouched source data, preserved as-is",
            tables: ["raw_salesforce_opportunities", "raw_xero_invoices", "raw_hubspot_contacts"],
            color: C.dim,
          },
          {
            name: "Staging Layer",
            desc: "Cleaned, typed, deduplicated",
            tables: ["stg_opportunities", "stg_invoices", "stg_contacts"],
            color: C.goldDim,
          },
          {
            name: "Mart Layer",
            desc: "Business-ready models for reporting",
            tables: ["fct_revenue", "dim_customers", "fct_pipeline"],
            color: C.gold,
          },
        ],
      },
      bullets: [
        "Built on BigQuery, Snowflake, or your existing warehouse platform",
        "Three-layer architecture: raw, staging, and business-ready marts",
        "Every table and column documented in a maintained data dictionary",
        "Query-optimized partitioning and clustering for fast BI tool performance",
      ],
    },
  },
  {
    icon: <Lock size={24} />,
    title: "Access Control & Auditability",
    desc: "Role-based access policies and full audit trails so sensitive data stays protected, compliance requirements are met, and every data change is traceable.",
    modal: {
      tagline: "The right people see the right data. Always.",
      overview:
        "A data warehouse containing your entire business — financials, customer data, operational metrics — needs to be locked down as carefully as it's built. We implement role-based access control at the warehouse level, integrate with your identity provider for SSO, and ensure every data access and change is logged in a full audit trail.",
      visual: {
        type: "access-layers",
        roles: [
          {
            role: "Data Engineer",
            access: ["Raw Layer (RW)", "Staging Layer (RW)", "Mart Layer (RW)"],
            color: "#3b82f6",
          },
          {
            role: "Analyst",
            access: ["Staging Layer (R)", "Mart Layer (RW)"],
            color: C.gold,
          },
          {
            role: "BI Consumer",
            access: ["Mart Layer (R) — filtered by department"],
            color: "#10b981",
          },
          {
            role: "Executive",
            access: ["Mart Layer (R) — aggregate views only"],
            color: "#8b5cf6",
          },
        ],
      },
      bullets: [
        "Role-based access control at schema, table, and row level",
        "SSO integration via your existing identity provider (Okta, Google, etc.)",
        "Full audit log: who queried what, when, and from where",
        "Compliance-ready configuration for GDPR, SOC 2, and similar frameworks",
      ],
    },
  },
];

// ── visual sub-components ─────────────────────────────────────────────────

function SourceMap({ sources, destination }) {
  return (
    <div style={{ background: C.bg, border: `1px solid ${C.border}`, borderRadius: 6, padding: "16px" }}>
      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        {/* sources */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 6 }}>
          {sources.map((s, i) => (
            <div key={i} style={{
              background: C.surface, border: `1px solid ${C.border}`,
              borderRadius: 4, padding: "7px 10px",
              display: "flex", alignItems: "center", gap: 8,
            }}>
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: s.color, flexShrink: 0 }} />
              <span style={{ fontSize: 11, color: C.text, flex: 1 }}>{s.name}</span>
              <span style={{ fontSize: 9, color: C.dim, letterSpacing: "0.1em", textTransform: "uppercase" }}>{s.category}</span>
            </div>
          ))}
        </div>

        {/* arrow */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, flexShrink: 0 }}>
          <div style={{ width: 1, flex: 1, background: C.border }} />
          <div style={{ fontSize: 16, color: C.gold }}>→</div>
          <div style={{ width: 1, flex: 1, background: C.border }} />
        </div>

        {/* destination */}
        <div style={{
          background: `linear-gradient(135deg, rgba(201,168,76,0.12), rgba(201,168,76,0.04))`,
          border: `1px solid ${C.goldDim}`,
          borderRadius: 6, padding: "16px 20px",
          textAlign: "center", flexShrink: 0, width: 110,
        }}>
          <Layers size={20} color={C.gold} style={{ marginBottom: 8 }} />
          <div style={{ fontSize: 11, fontWeight: 600, color: C.text, lineHeight: 1.3 }}>{destination}</div>
          <div style={{ fontSize: 9, color: C.gold, marginTop: 4, letterSpacing: "0.1em", textTransform: "uppercase" }}>Unified</div>
        </div>
      </div>
    </div>
  );
}

function ScheduleView({ pipelines }) {
  const statusColor = { ok: "#4ade80", warning: "#fbbf24", failed: "#f87171" };
  const statusLabel = { ok: "✓", warning: "!", failed: "✕" };
  return (
    <div style={{ background: C.bg, border: `1px solid ${C.border}`, borderRadius: 6, overflow: "hidden" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr auto auto auto", padding: "8px 14px", borderBottom: `1px solid ${C.border}` }}>
        {["Pipeline", "Schedule", "Last Run", ""].map((h, i) => (
          <div key={i} style={{ fontSize: 9, color: C.dim, letterSpacing: "0.12em", textTransform: "uppercase", textAlign: i === 0 ? "left" : "center" }}>{h}</div>
        ))}
      </div>
      {pipelines.map((p, i) => (
        <div key={i} style={{
          display: "grid", gridTemplateColumns: "1fr auto auto auto",
          padding: "9px 14px", alignItems: "center",
          borderBottom: i < pipelines.length - 1 ? `1px solid ${C.border}` : "none",
          background: p.status === "failed" ? "rgba(248,113,113,0.05)" : p.status === "warning" ? "rgba(251,191,36,0.04)" : "transparent",
        }}>
          <div style={{ fontSize: 11, color: C.text }}>{p.name}</div>
          <div style={{ fontSize: 10, color: C.dim, minWidth: 72, textAlign: "center" }}>{p.freq}</div>
          <div style={{ fontSize: 10, color: C.muted, minWidth: 68, textAlign: "center" }}>{p.lastRun}</div>
          <div style={{
            width: 18, height: 18, borderRadius: "50%",
            background: statusColor[p.status] + "22",
            border: `1px solid ${statusColor[p.status]}`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 9, color: statusColor[p.status], fontWeight: 700,
            margin: "0 auto",
          }}>{statusLabel[p.status]}</div>
        </div>
      ))}
    </div>
  );
}

function TransformPipeline({ steps }) {
  return (
    <div style={{ display: "flex", gap: 8, alignItems: "stretch", background: C.bg, border: `1px solid ${C.border}`, borderRadius: 6, overflow: "hidden" }}>
      {steps.map((step, si) => (
        <div key={si} style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <div style={{
            padding: "12px 10px",
            borderRight: si < steps.length - 1 ? `1px solid ${C.border}` : "none",
            height: "100%",
          }}>
            <div style={{ fontSize: 9, color: step.color, letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 600, marginBottom: 10, textAlign: "center" }}>
              {step.label}
            </div>
            {step.examples && step.examples.map((ex, i) => (
              <div key={i} style={{
                background: C.surface, border: `1px solid ${C.border}`,
                borderRadius: 3, padding: "5px 7px", marginBottom: 4,
                fontSize: 10, color: C.muted, fontFamily: "monospace",
              }}>{ex}</div>
            ))}
            {step.rules && step.rules.map((r, i) => (
              <div key={i} style={{
                display: "flex", gap: 6, alignItems: "flex-start", marginBottom: 6,
              }}>
                <span style={{ color: C.gold, fontSize: 10, marginTop: 1 }}>→</span>
                <span style={{ fontSize: 10, color: C.muted, lineHeight: 1.4 }}>{r}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function MonitorLog({ runs }) {
  const statusColor = { success: "#4ade80", failed: "#f87171", warning: "#fbbf24" };
  const statusIcon  = { success: "✓", failed: "✕", warning: "!" };
  return (
    <div style={{ background: C.bg, border: `1px solid ${C.border}`, borderRadius: 6, overflow: "hidden" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr auto auto auto auto", padding: "8px 14px", borderBottom: `1px solid ${C.border}` }}>
        {["Pipeline","Time","Duration","Rows",""].map((h, i) => (
          <div key={i} style={{ fontSize: 9, color: C.dim, letterSpacing: "0.12em", textTransform: "uppercase", textAlign: i === 0 ? "left" : "center" }}>{h}</div>
        ))}
      </div>
      {runs.map((r, i) => (
        <div key={i} style={{
          display: "grid", gridTemplateColumns: "1fr auto auto auto auto",
          padding: "9px 14px", alignItems: "center",
          background: r.status === "failed" ? "rgba(248,113,113,0.06)" : "transparent",
          borderBottom: i < runs.length - 1 ? `1px solid ${C.border}` : "none",
        }}>
          <div style={{ fontSize: 11, color: C.text }}>{r.pipeline}</div>
          <div style={{ fontSize: 10, color: C.dim, minWidth: 42, textAlign: "center" }}>{r.time}</div>
          <div style={{ fontSize: 10, color: C.muted, minWidth: 50, textAlign: "center" }}>{r.duration}</div>
          <div style={{ fontSize: 10, color: C.muted, minWidth: 44, textAlign: "center" }}>{r.rows}</div>
          <div style={{
            width: 18, height: 18, borderRadius: "50%",
            background: statusColor[r.status] + "22",
            border: `1px solid ${statusColor[r.status]}`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 9, color: statusColor[r.status], fontWeight: 700,
            margin: "0 auto",
          }}>{statusIcon[r.status]}</div>
        </div>
      ))}
    </div>
  );
}

function WarehouseLayers({ layers }) {
  return (
    <div style={{ background: C.bg, border: `1px solid ${C.border}`, borderRadius: 6, overflow: "hidden" }}>
      {layers.map((layer, li) => (
        <div key={li} style={{ borderBottom: li < layers.length - 1 ? `1px solid ${C.border}` : "none" }}>
          <div style={{
            display: "flex", alignItems: "center", gap: 12,
            padding: "10px 14px",
            background: li === layers.length - 1 ? "rgba(201,168,76,0.05)" : "transparent",
          }}>
            <div style={{ width: 3, alignSelf: "stretch", background: layer.color, borderRadius: 2, flexShrink: 0 }} />
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                <span style={{ fontSize: 12, fontWeight: 600, color: layer.color }}>{layer.name}</span>
                <span style={{ fontSize: 10, color: C.dim }}>{layer.desc}</span>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                {layer.tables.map((t, i) => (
                  <span key={i} style={{
                    fontSize: 10, color: C.muted,
                    background: C.surface, border: `1px solid ${C.border}`,
                    borderRadius: 3, padding: "2px 7px",
                    fontFamily: "monospace",
                  }}>{t}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function AccessLayers({ roles }) {
  return (
    <div style={{ background: C.bg, border: `1px solid ${C.border}`, borderRadius: 6, overflow: "hidden" }}>
      {roles.map((r, i) => (
        <div key={i} style={{
          padding: "12px 14px",
          borderBottom: i < roles.length - 1 ? `1px solid ${C.border}` : "none",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: r.color, flexShrink: 0 }} />
            <span style={{ fontSize: 12, fontWeight: 600, color: C.text }}>{r.role}</span>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
            {r.access.map((a, ai) => (
              <span key={ai} style={{
                fontSize: 10, color: C.muted,
                background: C.surface, border: `1px solid ${C.border}`,
                borderRadius: 3, padding: "3px 8px",
              }}>{a}</span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function ModalVisual({ v }) {
  if (!v) return null;
  if (v.type === "source-map")        return <SourceMap sources={v.sources} destination={v.destination} />;
  if (v.type === "schedule-view")     return <ScheduleView pipelines={v.pipelines} />;
  if (v.type === "transform-pipeline")return <TransformPipeline steps={v.steps} />;
  if (v.type === "monitor-log")       return <MonitorLog runs={v.runs} />;
  if (v.type === "warehouse-layers")  return <WarehouseLayers layers={v.layers} />;
  if (v.type === "access-layers")     return <AccessLayers roles={v.roles} />;
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

export default function PipelineDeliverablesSection() {
  const [active, setActive] = useState(null);
  const close = useCallback(() => setActive(null), []);

  return (
    <>
      <style>{`
        .pipe-deliverable-cell {
          background: ${C.surface};
          padding: 36px 32px;
          transition: background 0.25s;
          position: relative; overflow: hidden;
          cursor: pointer;
        }
        .pipe-deliverable-cell::before {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(135deg, rgba(201,168,76,0.07), transparent);
          opacity: 0; transition: opacity 0.3s;
        }
        .pipe-deliverable-cell:hover::before { opacity: 1; }
        .pipe-deliverable-cell:hover .pipe-del-icon {
          border-color: ${C.goldDim} !important;
          background: rgba(201,168,76,0.08) !important;
        }
        .pipe-deliverable-cell:hover .pipe-del-title { color: ${C.goldLt} !important; }
        .pipe-cell-hint {
          position: absolute; bottom: 14px; right: 16px;
          font-size: 9px; letter-spacing: 0.15em; text-transform: uppercase;
          color: ${C.goldDim}; opacity: 0; transition: opacity 0.25s;
          display: flex; align-items: center; gap: 4px;
        }
        .pipe-deliverable-cell:hover .pipe-cell-hint { opacity: 1; }
      `}</style>

      <div style={{
        display: "grid", gridTemplateColumns: "repeat(3, 1fr)",
        gap: 1, background: C.border,
        border: `1px solid ${C.border}`, marginTop: 64,
      }}>
        {deliverables.map((d, i) => (
          <div
            key={i}
            className="pipe-deliverable-cell"
            onClick={() => setActive(i)}
            role="button"
            tabIndex={0}
            onKeyDown={e => e.key === "Enter" && setActive(i)}
            aria-label={`Learn more about ${d.title}`}
          >
            <div
              className="pipe-del-icon"
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
              className="pipe-del-title"
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
            <div className="pipe-cell-hint">
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
