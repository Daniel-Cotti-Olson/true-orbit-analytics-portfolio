"use client";

import { useState } from "react";
import { Check, Zap, BarChart3, Globe } from "lucide-react";

type Tier = {
  name: string;
  tagline: string;
  price: { monthly: number; annual: number };
  icon: React.ReactNode;
  accent: string;
  accentBg: string;
  features: string[];
  cta: string;
  highlighted: boolean;
};

const tiers: Tier[] = [
  {
    name: "Starter",
    tagline: "For teams just getting started",
    price: { monthly: 49, annual: 39 },
    icon: <BarChart3 size={20} />,
    accent: "#64748b",
    accentBg: "rgba(100,116,139,0.08)",
    features: [
      "Up to 5 data sources",
      "500K rows / month",
      "7-day data retention",
      "3 dashboards",
      "CSV & JSON exports",
      "Email support",
    ],
    cta: "Start free trial",
    highlighted: false,
  },
  {
    name: "Growth",
    tagline: "For scaling data operations",
    price: { monthly: 149, annual: 119 },
    icon: <Zap size={20} />,
    accent: "#0ea5e9",
    accentBg: "rgba(14,165,233,0.08)",
    features: [
      "Unlimited data sources",
      "10M rows / month",
      "90-day data retention",
      "Unlimited dashboards",
      "All export formats",
      "API access",
      "Scheduled reports",
      "Priority support",
    ],
    cta: "Start free trial",
    highlighted: true,
  },
  {
    name: "Enterprise",
    tagline: "For mission-critical analytics",
    price: { monthly: 499, annual: 399 },
    icon: <Globe size={20} />,
    accent: "#8b5cf6",
    accentBg: "rgba(139,92,246,0.08)",
    features: [
      "Unlimited everything",
      "Custom row limits",
      "Unlimited data retention",
      "Custom dashboards",
      "White-label exports",
      "Full API access",
      "SSO & SAML",
      "SLA guarantee",
      "Dedicated engineer",
    ],
    cta: "Contact sales",
    highlighted: false,
  },
];

export default function PricingCard() {
  const [annual, setAnnual] = useState(false);

  return (
    <section className="pricing-section">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Syne:wght@700;800&display=swap');

        .pricing-section {
          font-family: 'DM Sans', sans-serif;
          background: #0a0f1a;
          padding: 80px 24px;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .pricing-header {
          text-align: center;
          margin-bottom: 56px;
        }

        .pricing-eyebrow {
          font-family: 'DM Sans', sans-serif;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #0ea5e9;
          margin-bottom: 14px;
        }

        .pricing-title {
          font-family: 'Syne', sans-serif;
          font-size: clamp(2rem, 5vw, 3.25rem);
          font-weight: 800;
          color: #f1f5f9;
          line-height: 1.1;
          margin-bottom: 16px;
          letter-spacing: -0.02em;
        }

        .pricing-subtitle {
          color: #64748b;
          font-size: 1rem;
          font-weight: 400;
          max-width: 420px;
          margin: 0 auto 36px;
          line-height: 1.6;
        }

        .toggle-wrapper {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          background: #111827;
          border: 1px solid #1e293b;
          border-radius: 999px;
          padding: 6px 16px;
        }

        .toggle-label {
          font-size: 13px;
          font-weight: 500;
          color: #94a3b8;
          cursor: pointer;
          transition: color 0.2s;
        }

        .toggle-label.active {
          color: #f1f5f9;
        }

        .toggle-switch {
          position: relative;
          width: 40px;
          height: 22px;
          cursor: pointer;
        }

        .toggle-switch input {
          opacity: 0;
          width: 0;
          height: 0;
          position: absolute;
        }

        .toggle-track {
          position: absolute;
          inset: 0;
          background: #1e293b;
          border-radius: 999px;
          transition: background 0.25s;
        }

        .toggle-switch input:checked ~ .toggle-track {
          background: #0ea5e9;
        }

        .toggle-thumb {
          position: absolute;
          top: 3px;
          left: 3px;
          width: 16px;
          height: 16px;
          background: #fff;
          border-radius: 50%;
          transition: transform 0.25s;
        }

        .toggle-switch input:checked ~ .toggle-track .toggle-thumb {
          transform: translateX(18px);
        }

        .save-badge {
          font-size: 11px;
          font-weight: 600;
          background: rgba(14,165,233,0.15);
          color: #0ea5e9;
          border-radius: 999px;
          padding: 2px 8px;
          margin-left: 4px;
        }

        .cards-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 20px;
          max-width: 1040px;
          width: 100%;
        }

        .card {
          position: relative;
          background: #0f172a;
          border: 1px solid #1e293b;
          border-radius: 20px;
          padding: 36px 32px;
          display: flex;
          flex-direction: column;
          transition: transform 0.25s, border-color 0.25s, box-shadow 0.25s;
        }

        .card:hover {
          transform: translateY(-4px);
        }

        .card.highlighted {
          background: #0c1a2e;
          border-color: #0ea5e9;
          box-shadow: 0 0 0 1px #0ea5e9, 0 24px 64px rgba(14,165,233,0.12);
        }

        .card.highlighted:hover {
          box-shadow: 0 0 0 1px #0ea5e9, 0 32px 80px rgba(14,165,233,0.18);
        }

        .popular-badge {
          position: absolute;
          top: -13px;
          left: 50%;
          transform: translateX(-50%);
          background: #0ea5e9;
          color: #fff;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          padding: 4px 16px;
          border-radius: 999px;
          white-space: nowrap;
        }

        .card-icon {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 20px;
        }

        .card-name {
          font-family: 'Syne', sans-serif;
          font-size: 1.25rem;
          font-weight: 700;
          color: #f1f5f9;
          margin-bottom: 4px;
        }

        .card-tagline {
          font-size: 13px;
          color: #64748b;
          margin-bottom: 28px;
          line-height: 1.5;
        }

        .card-price {
          margin-bottom: 28px;
        }

        .price-amount {
          font-family: 'Syne', sans-serif;
          font-size: 3rem;
          font-weight: 800;
          color: #f1f5f9;
          letter-spacing: -0.03em;
          line-height: 1;
        }

        .price-currency {
          font-size: 1.25rem;
          font-weight: 500;
          color: #94a3b8;
          vertical-align: super;
          margin-right: 2px;
        }

        .price-period {
          font-size: 13px;
          color: #475569;
          margin-top: 6px;
        }

        .divider {
          height: 1px;
          background: #1e293b;
          margin-bottom: 28px;
        }

        .features-list {
          list-style: none;
          padding: 0;
          margin: 0 0 32px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          flex: 1;
        }

        .feature-item {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 14px;
          color: #94a3b8;
          font-weight: 400;
        }

        .check-icon {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .cta-button {
          width: 100%;
          padding: 13px;
          border-radius: 10px;
          border: none;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: opacity 0.2s, transform 0.15s;
          letter-spacing: 0.01em;
        }

        .cta-button:hover {
          opacity: 0.88;
          transform: translateY(-1px);
        }

        .cta-button:active {
          transform: translateY(0);
        }

        .cta-primary {
          background: #0ea5e9;
          color: #fff;
        }

        .cta-secondary {
          background: #1e293b;
          color: #94a3b8;
        }

        @media (max-width: 680px) {
          .cards-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <div className="pricing-header">
        <p className="pricing-eyebrow">Pricing</p>
        <h2 className="pricing-title">Simple, transparent pricing</h2>
        <p className="pricing-subtitle">
          Scale your analytics without surprises. Every plan includes a 14-day free trial.
        </p>

        <div className="toggle-wrapper">
          <span
            className={`toggle-label ${!annual ? "active" : ""}`}
            onClick={() => setAnnual(false)}
          >
            Monthly
          </span>
          <label className="toggle-switch">
            <input
              type="checkbox"
              checked={annual}
              onChange={() => setAnnual((v) => !v)}
            />
            <div className="toggle-track">
              <div className="toggle-thumb" />
            </div>
          </label>
          <span
            className={`toggle-label ${annual ? "active" : ""}`}
            onClick={() => setAnnual(true)}
          >
            Annual <span className="save-badge">Save 20%</span>
          </span>
        </div>
      </div>

      <div className="cards-grid">
        {tiers.map((tier) => (
          <div
            key={tier.name}
            className={`card${tier.highlighted ? " highlighted" : ""}`}
          >
            {tier.highlighted && (
              <div className="popular-badge">Most Popular</div>
            )}

            <div
              className="card-icon"
              style={{ background: tier.accentBg, color: tier.accent }}
            >
              {tier.icon}
            </div>

            <div className="card-name">{tier.name}</div>
            <div className="card-tagline">{tier.tagline}</div>

            <div className="card-price">
              <div className="price-amount">
                <span className="price-currency">$</span>
                {annual ? tier.price.annual : tier.price.monthly}
              </div>
              <div className="price-period">per seat / month{annual ? ", billed annually" : ""}</div>
            </div>

            <div className="divider" />

            <ul className="features-list">
              {tier.features.map((f) => (
                <li key={f} className="feature-item">
                  <span
                    className="check-icon"
                    style={{ background: tier.accentBg, color: tier.accent }}
                  >
                    <Check size={11} strokeWidth={3} />
                  </span>
                  {f}
                </li>
              ))}
            </ul>

            <button
              className={`cta-button ${tier.highlighted ? "cta-primary" : "cta-secondary"}`}
            >
              {tier.cta}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
