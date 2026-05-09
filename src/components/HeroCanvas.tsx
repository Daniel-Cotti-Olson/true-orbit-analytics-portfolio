"use client";

import { useEffect, useRef, useCallback } from "react";

// ── Track definition ─────────────────────────────────────────────
interface Track {
  label: string;
  color: string;          // solid color
  fillColor: string;      // area fill (rgba)
  glowColor: string;      // node glow
  yCenter: number;        // vertical center (0..1 of canvas height)
  data: number[];         // rolling price data
  currentValue: number;   // current "price"
  targetValue: number;    // where price is heading
  volatility: number;     // how wild the moves are
  stepCountdown: number;  // frames until next move
  trend: number;          // -1 | 0 | 1 current trend bias
}

interface Cursor { x: number; y: number; active: boolean; }

// ── Helpers ──────────────────────────────────────────────────────
function randomBetween(a: number, b: number) {
  return a + Math.random() * (b - a);
}

function randomSign() { return Math.random() > 0.5 ? 1 : -1; }

function initTrack(track: Track, canvasHeight: number) {
  track.yCenter = canvasHeight * track.yCenter;
}

// ── Main component ───────────────────────────────────────────────
export default function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const tracksRef = useRef<Track[]>([]);
  const cursorRef = useRef<Cursor>({ x: 0, y: 0, active: false });
  const rafRef = useRef<number>(0);
  const frameRef = useRef<number>(0);
  const initializedRef = useRef(false);

  const buildTracks = useCallback((w: number, h: number): Track[] => {
    const dataLen = Math.ceil(w / 3) + 20;

    return [
      // ── Gold — Portfolio Value ──────────────────────────────
      {
        label: "PORTFOLIO",
        color: "rgba(201,168,76,0.55)",
        fillColor: "rgba(201,168,76,",
        glowColor: "rgba(201,168,76,",
        yCenter: h * 0.28,
        data: Array(dataLen).fill(0),
        currentValue: 0,
        targetValue: 0,
        volatility: 35,
        stepCountdown: 0,
        trend: 1,
      },
      // ── Blue — Benchmark / Volume ───────────────────────────
      {
        label: "BENCHMARK",
        color: "rgba(96,165,250,0.45)",
        fillColor: "rgba(96,165,250,",
        glowColor: "rgba(96,165,250,",
        yCenter: h * 0.55,
        data: Array(dataLen).fill(0),
        currentValue: 0,
        targetValue: 0,
        volatility: 25,
        stepCountdown: 0,
        trend: 0,
      },
      // ── Red — Risk / Volatility Index ───────────────────────
      {
        label: "VOLATILITY",
        color: "rgba(248,113,113,0.40)",
        fillColor: "rgba(248,113,113,",
        glowColor: "rgba(248,113,113,",
        yCenter: h * 0.78,
        data: Array(dataLen).fill(0),
        currentValue: 0,
        targetValue: 0,
        volatility: 45,
        stepCountdown: 0,
        trend: -1,
      },
    ];
  }, []);

  const seedData = useCallback((tracks: Track[], h: number) => {
    tracks.forEach(track => {
      // Seed with realistic-looking initial data
      let v = 0;
      for (let i = 0; i < track.data.length; i++) {
        if (Math.random() < 0.08) {
          // occasional sharp move
          v += randomSign() * randomBetween(track.volatility * 0.5, track.volatility);
        } else {
          v += randomSign() * randomBetween(0, track.volatility * 0.25);
        }
        v = Math.max(-60, Math.min(60, v)); // clamp range
        track.data[i] = v;
      }
      track.currentValue = track.data[track.data.length - 1];
      track.targetValue = track.currentValue;
    });
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      canvas.width = parent.offsetWidth;
      canvas.height = parent.offsetHeight;
      tracksRef.current = buildTracks(canvas.width, canvas.height);
      seedData(tracksRef.current, canvas.height);
      initializedRef.current = true;
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas.parentElement!);

    // Mouse
    const onMove = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      cursorRef.current = { x: e.clientX - r.left, y: e.clientY - r.top, active: true };
    };
    const onLeave = () => { cursorRef.current.active = false; };
    const parent = canvas.parentElement!;
    parent.addEventListener("mousemove", onMove);
    parent.addEventListener("mouseleave", onLeave);

    // ── Draw loop ─────────────────────────────────────────────
    const draw = () => {
      if (!initializedRef.current) {
        rafRef.current = requestAnimationFrame(draw);
        return;
      }

      frameRef.current++;
      const W = canvas.width;
      const H = canvas.height;
      const tracks = tracksRef.current;

      ctx.clearRect(0, 0, W, H);

      // ── Cursor glow ────────────────────────────────────────
      const cur = cursorRef.current;
      if (cur.active) {
        const g = ctx.createRadialGradient(cur.x, cur.y, 0, cur.x, cur.y, 280);
        g.addColorStop(0, "rgba(201,168,76,0.06)");
        g.addColorStop(1, "rgba(201,168,76,0)");
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, W, H);
      }

      // ── Update & draw each track ───────────────────────────
      tracks.forEach(track => {
        // ── Advance price simulation ─────────────────────────
        const isBigMove = Math.random() < 0.12;
const magnitude = isBigMove
  ? randomBetween(track.volatility * 0.6, track.volatility)
  : randomBetween(1, track.volatility * 0.3);

track.currentValue = Math.max(
  -65,
  Math.min(65, track.currentValue + randomSign() * magnitude)
);

        track.data.shift();
        track.data.push(track.currentValue);

        // ── Draw ─────────────────────────────────────────────
        // ── Draw ─────────────────────────────────────────────
        const yC = track.yCenter;
        const xStep = W / (track.data.length - 1);
        const amplitude = 55; // max pixel deviation from center

        // Helper: data index → canvas coords
        const toX = (i: number) => i * xStep;
        const toY = (v: number) => yC - (v / 65) * amplitude;

        // ── Baseline (very faint) ────────────────────────────
        ctx.beginPath();
        ctx.setLineDash([4, 8]);
        ctx.strokeStyle = track.color.replace(/[\d.]+\)$/, "0.12)");
        ctx.lineWidth = 0.5;
        ctx.moveTo(0, yC);
        ctx.lineTo(W, yC);
        ctx.stroke();
        ctx.setLineDash([]);

        // ── Area fill below line ─────────────────────────────
        ctx.beginPath();
        ctx.moveTo(toX(0), toY(track.data[0]));
        for (let i = 1; i < track.data.length; i++) {
          // Stepped chart look — flat then vertical jump
          ctx.lineTo(toX(i), toY(track.data[i - 1]));
          ctx.lineTo(toX(i), toY(track.data[i]));
        }
        ctx.lineTo(W, yC);
        ctx.lineTo(0, yC);
        ctx.closePath();

        const areaGrad = ctx.createLinearGradient(0, yC - amplitude, 0, yC + amplitude);
        areaGrad.addColorStop(0, `${track.fillColor}0.06)`);
        areaGrad.addColorStop(1, `${track.fillColor}0)`);
        ctx.fillStyle = areaGrad;
        ctx.fill();

        // ── Main chart line (stepped) ────────────────────────
        ctx.beginPath();
        ctx.moveTo(toX(0), toY(track.data[0]));
        for (let i = 1; i < track.data.length; i++) {
          ctx.lineTo(toX(i), toY(track.data[i - 1]));  // horizontal step
          ctx.lineTo(toX(i), toY(track.data[i]));       // vertical jump
        }
        ctx.strokeStyle = track.color;
        ctx.lineWidth = 1.5;
        ctx.lineJoin = "miter";
        ctx.stroke();

        // ── Live node at right edge ──────────────────────────
        const liveX = W - 2;
        const liveY = toY(track.data[track.data.length - 1]);
        const pulse = 2.5 + Math.sin(frameRef.current * 0.1) * 1;

        // Outer halo
        const halo = ctx.createRadialGradient(liveX, liveY, 0, liveX, liveY, 20);
        halo.addColorStop(0, `${track.glowColor}0.25)`);
        halo.addColorStop(1, `${track.glowColor}0)`);
        ctx.beginPath();
        ctx.arc(liveX, liveY, 20, 0, Math.PI * 2);
        ctx.fillStyle = halo;
        ctx.fill();

        // Dot
        ctx.beginPath();
        ctx.arc(liveX, liveY, pulse, 0, Math.PI * 2);
        ctx.fillStyle = track.color.replace(/[\d.]+\)$/, "0.9)");
        ctx.fill();

        // ── Track label (left edge) ──────────────────────────
        ctx.font = "600 9px 'DM Sans', monospace";
        ctx.letterSpacing = "0.15em";
        ctx.fillStyle = track.color.replace(/[\d.]+\)$/, "0.35)");
        ctx.fillText(track.label, 12, yC - amplitude - 8);

        // ── Occasional vertical event lines ──────────────────
        if (frameRef.current % 180 === Math.floor(track.yCenter) % 180) {
          const evX = toX(Math.floor(track.data.length * 0.72));
          ctx.beginPath();
          ctx.setLineDash([2, 4]);
          ctx.strokeStyle = track.color.replace(/[\d.]+\)$/, "0.15)");
          ctx.lineWidth = 1;
          ctx.moveTo(evX, yC - amplitude - 10);
          ctx.lineTo(evX, yC + amplitude + 10);
          ctx.stroke();
          ctx.setLineDash([]);
        }
      });

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
      parent.removeEventListener("mousemove", onMove);
      parent.removeEventListener("mouseleave", onLeave);
    };
  }, [buildTracks, seedData]);



  
  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 0,
      }}
      aria-hidden="true"
    />
  );
}
