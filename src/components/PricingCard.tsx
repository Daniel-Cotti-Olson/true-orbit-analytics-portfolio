"use client";

import { Check } from "lucide-react";

export type PricingCardProps = {
  index: number;
  name: string;
  description: string;
  price: string;
  features: string[];
  cta: string;
  popular: boolean;
};

export default function PricingCard({
  name,
  description,
  price,
  features,
  cta,
  popular,
}: PricingCardProps) {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Syne:wght@700;800&display=swap');

        .pc-card {
          font-family: 'DM Sans', sans-serif;
          position: relative;
          background: #0f172a;
          border: 1px solid #1e293b;
          border-radius: 20px;
          padding: 36px 32px;
          display: flex;
          flex-direction: column;
          transition: transform 0.25s, border-color 0.25s, box-shadow 0.25s;
        }

        .pc-card:hover {
          transform: translateY(-4px);
        }

        .pc-card.pc-highlighted {
          background: #0c1a2e;
          border-color: #0ea5e9;
          box-shadow: 0 0 0 1px #0ea5e9, 0 24px 64px rgba(14,165,233,0.12);
        }

        .pc-card.pc-highlighted:hover {
          box-shadow: 0 0 0 1px #0ea5e9, 0 32px 80px rgba(14,165,233,0.18);
        }

        .pc-popular-badge {
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

        .pc-name {
          font-family: 'Syne', sans-serif;
          font-size: 1.25rem;
          font-weight: 700;
          color: #f1f5f9;
          margin-bottom: 4px;
        }

        .pc-description {
          font-size: 13px;
          color: #64748b;
          margin-bottom: 28px;
          line-height: 1.5;
        }

        .pc-price-block {
          margin-bottom: 28px;
        }

        .pc-price-amount {
          font-family: 'Syne', sans-serif;
          font-size: 3rem;
          font-weight: 800;
          color: #f1f5f9;
          letter-spacing: -0.03em;
          line-height: 1;
        }

        .pc-price-period {
          font-size: 13px;
          color: #475569;
          margin-top: 6px;
        }

        .pc-divider {
          height: 1px;
          background: #1e293b;
          margin-bottom: 28px;
        }

        .pc-features {
          list-style: none;
          padding: 0;
          margin: 0 0 32px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          flex: 1;
        }

        .pc-feature-item {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 14px;
          color: #94a3b8;
        }

        .pc-check {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          background: rgba(14,165,233,0.08);
          color: #0ea5e9;
        }

        .pc-check.pc-check-muted {
          background: rgba(100,116,139,0.08);
          color: #64748b;
        }

        .pc-cta {
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

        .pc-cta:hover {
          opacity: 0.88;
          transform: translateY(-1px);
        }

        .pc-cta:active {
          transform: translateY(0);
        }

        .pc-cta-primary {
          background: #0ea5e9;
          color: #fff;
        }

        .pc-cta-secondary {
          background: #1e293b;
          color: #94a3b8;
        }
      `}</style>

      <div className={`pc-card${popular ? " pc-highlighted" : ""}`}>
        {popular && <div className="pc-popular-badge">Most Popular</div>}

        <div className="pc-name">{name}</div>
        <div className="pc-description">{description}</div>

        <div className="pc-price-block">
          <div className="pc-price-amount">{price}</div>
          <div className="pc-price-period">per seat / month</div>
        </div>

        <div className="pc-divider" />

        <ul className="pc-features">
          {features.map((f) => (
            <li key={f} className="pc-feature-item">
              <span className={`pc-check${popular ? "" : " pc-check-muted"}`}>
                <Check size={11} strokeWidth={3} />
              </span>
              {f}
            </li>
          ))}
        </ul>

        <button className={`pc-cta ${popular ? "pc-cta-primary" : "pc-cta-secondary"}`}>
          {cta}
        </button>
      </div>
    </>
  );
}
