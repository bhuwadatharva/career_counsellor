import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Profilesetup from "./Profilesetup";
import { useAuth } from "../../AuthContext";

/* ─── Scoped styles: only affects .db-root and its children ─── */
const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=DM+Mono:wght@300;400;500&family=DM+Sans:wght@300;400;500&display=swap');

  .db-root {
    --db-bg: #000000;
    --db-fg: #ffffff;
    --db-mid: #888888;
    --db-border: #333333;
    --db-accent: #111111;
    --db-tag-bg: #222222;
    --db-hover-bg: #1a1a1a;
    --db-hover-fg: #ffffff;
    --db-serif: 'Playfair Display', Georgia, serif;
    --db-mono: 'DM Mono', 'Courier New', monospace;
    --db-sans: 'DM Sans', sans-serif;
    font-family: var(--db-sans);
    background: var(--db-bg);
    color: var(--db-fg);
    min-height: 100vh;
  }

  /* ── Layout ── */
  .db-shell {
    max-width: 1080px;
    margin: 0 auto;
    padding: 48px 40px 80px;
  }

  /* ── Eyebrow / masthead ── */
  .db-masthead {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    border-top: 3px solid var(--db-fg);
    padding-top: 28px;
    margin-bottom: 56px;
  }
  .db-masthead-left {}
  .db-eyebrow {
    font-family: var(--db-mono);
    font-size: 10px;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: var(--db-mid);
    margin-bottom: 10px;
  }
  .db-name {
    font-family: var(--db-serif);
    font-size: clamp(28px, 4vw, 46px);
    font-weight: 900;
    line-height: 1.05;
    letter-spacing: -0.02em;
  }
  .db-goal {
    font-family: var(--db-sans);
    font-size: 13px;
    color: var(--db-mid);
    margin-top: 6px;
    font-weight: 300;
    letter-spacing: 0.04em;
  }
  .db-masthead-right {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 4px;
    padding-top: 4px;
  }
  .db-badge {
    font-family: var(--db-mono);
    font-size: 9px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    background: var(--db-fg);
    color: var(--db-bg);
    padding: 4px 10px;
    border-radius: 2px;
  }
  .db-version {
    font-family: var(--db-mono);
    font-size: 9px;
    color: var(--db-mid);
    letter-spacing: 0.14em;
  }

  /* ── Stat grid ── */
  .db-stats {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1px;
    background: var(--db-border);
    border: 1px solid var(--db-border);
    border-radius: 4px;
    overflow: hidden;
    margin-bottom: 40px;
  }
  .db-stat {
    background: var(--db-accent);
    padding: 28px 26px;
    position: relative;
    transition: background 0.2s ease;
  }
  .db-stat:hover {
    background: var(--db-hover-bg);
  }
  .db-stat-label {
    font-family: var(--db-mono);
    font-size: 9px;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--db-mid);
    margin-bottom: 12px;
  }
  .db-stat-value {
    font-family: var(--db-serif);
    font-size: 36px;
    font-weight: 700;
    line-height: 1;
    letter-spacing: -0.03em;
  }
  .db-stat-sub {
    font-family: var(--db-mono);
    font-size: 10px;
    color: var(--db-mid);
    margin-top: 6px;
  }
  /* progress bar inside stat */
  .db-prog-track {
    width: 100%;
    height: 2px;
    background: var(--db-border);
    margin-top: 16px;
    border-radius: 1px;
    overflow: hidden;
  }
  .db-prog-fill {
    height: 100%;
    background: var(--db-fg);
    border-radius: 1px;
    transition: width 1s cubic-bezier(0.4, 0, 0.2, 1);
  }

  /* ── Divider ── */
  .db-section-header {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 20px;
  }
  .db-section-title {
    font-family: var(--db-serif);
    font-size: 18px;
    font-weight: 700;
    letter-spacing: -0.01em;
    white-space: nowrap;
  }
  .db-section-rule {
    flex: 1;
    height: 1px;
    background: var(--db-border);
  }
  .db-section-count {
    font-family: var(--db-mono);
    font-size: 10px;
    color: var(--db-mid);
    letter-spacing: 0.1em;
  }

  /* ── Overview card ── */
  .db-overview {
    border: 1px solid var(--db-border);
    border-radius: 4px;
    padding: 28px 30px;
    margin-bottom: 40px;
    position: relative;
    overflow: hidden;
  }
  .db-overview::before {
    content: '"';
    position: absolute;
    top: -10px;
    right: 20px;
    font-family: var(--db-serif);
    font-size: 120px;
    color: #222222;
    line-height: 1;
    pointer-events: none;
    user-select: none;
  }
  .db-overview-text {
    font-size: 14px;
    line-height: 1.75;
    color: #cccccc;
    font-weight: 300;
    position: relative;
    z-index: 1;
  }

  /* ── Roadmap ── */
  .db-roadmap {
    margin-bottom: 40px;
  }
  .db-phases {
    display: flex;
    flex-direction: column;
    gap: 0;
  }
  .db-phase {
    border: 1px solid var(--db-border);
    border-top: none;
    padding: 0;
    overflow: hidden;
    transition: all 0.25s ease;
  }
  .db-phase:first-child {
    border-top: 1px solid var(--db-border);
    border-radius: 4px 4px 0 0;
  }
  .db-phase:last-child {
    border-radius: 0 0 4px 4px;
  }
  .db-phase-head {
    display: flex;
    align-items: center;
    gap: 20px;
    padding: 22px 26px;
    cursor: pointer;
    user-select: none;
    background: var(--db-accent);
    transition: background 0.15s ease;
  }
  .db-phase-head:hover {
    background: var(--db-hover-bg);
  }
  .db-phase-num {
    font-family: var(--db-mono);
    font-size: 11px;
    color: var(--db-mid);
    letter-spacing: 0.1em;
    min-width: 52px;
  }
  .db-phase-title {
    font-family: var(--db-serif);
    font-size: 16px;
    font-weight: 700;
    flex: 1;
  }
  .db-phase-toggle {
    font-family: var(--db-mono);
    font-size: 18px;
    color: var(--db-mid);
    line-height: 1;
    transition: transform 0.25s ease;
  }
  .db-phase-toggle.open {
    transform: rotate(45deg);
  }
  .db-phase-body {
    display: none;
    padding: 0 26px 26px;
    border-top: 1px solid var(--db-border);
    background: var(--db-bg);
    animation: db-slide-in 0.2s ease;
  }
  .db-phase-body.open {
    display: block;
  }
  @keyframes db-slide-in {
    from { opacity: 0; transform: translateY(-6px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .db-phase-cols {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
    padding-top: 22px;
  }
  .db-phase-col-label {
    font-family: var(--db-mono);
    font-size: 9px;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--db-mid);
    margin-bottom: 10px;
  }
  .db-phase-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  .db-phase-list li {
    font-size: 13px;
    font-weight: 300;
    line-height: 1.6;
    padding: 5px 0;
    border-bottom: 1px solid var(--db-border);
    color: #dddddd;
  }
  .db-phase-list li:last-child {
    border-bottom: none;
  }
  .db-phase-list li::before {
    content: '→ ';
    font-family: var(--db-mono);
    font-size: 10px;
    color: var(--db-mid);
  }
  .db-skills-wrap {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    margin-top: 2px;
  }
  .db-skill-chip {
    font-family: var(--db-mono);
    font-size: 10px;
    letter-spacing: 0.06em;
    background: var(--db-tag-bg);
    color: var(--db-fg);
    border: 1px solid var(--db-border);
    padding: 4px 10px;
    border-radius: 2px;
    transition: all 0.15s ease;
  }
  .db-skill-chip:hover {
    background: var(--db-fg);
    color: var(--db-bg);
    border-color: var(--db-fg);
  }

  /* ── CTA ── */
  .db-cta {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 28px;
    background: var(--db-fg);
    color: var(--db-bg);
    border: 1.5px solid var(--db-fg);
    border-radius: 4px;
    cursor: pointer;
    font-family: var(--db-mono);
    font-size: 11px;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    transition: all 0.2s ease;
    position: relative;
    overflow: hidden;
  }
  .db-cta::before {
    content: '';
    position: absolute;
    top: 0; left: -100%;
    width: 100%; height: 100%;
    background: #000;
    transition: left 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    z-index: 0;
  }
  .db-cta:hover::before {
    left: 0;
  }
  .db-cta:hover {
    color: var(--db-fg);
  }
  .db-cta span, .db-cta-arrow {
    position: relative;
    z-index: 1;
  }
  .db-cta-arrow {
    font-size: 16px;
    transition: transform 0.2s ease;
  }
  .db-cta:hover .db-cta-arrow {
    transform: translateX(4px);
  }

  /* ── Loading ── */
  .db-loader {
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 16px;
    font-family: 'DM Mono', monospace;
    font-size: 11px;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: #888;
  }
  .db-loader-bar {
    width: 120px;
    height: 1px;
    background: #e0e0e0;
    overflow: hidden;
  }
  .db-loader-fill {
    height: 1px;
    background: #0a0a0a;
    animation: db-load 1.4s ease-in-out infinite;
  }
  @keyframes db-load {
    0%   { width: 0; margin-left: 0; }
    50%  { width: 100%; margin-left: 0; }
    100% { width: 0; margin-left: 100%; }
  }

  /* ── Responsive ── */
  @media (max-width: 680px) {
    .db-shell { padding: 28px 20px 60px; }
    .db-stats { grid-template-columns: 1fr; }
    .db-phase-cols { grid-template-columns: 1fr; }
    .db-masthead { flex-direction: column; gap: 16px; }
    .db-masthead-right { align-items: flex-start; }
  }
`;

/* ── Phase accordion item ── */
function PhaseCard({ phase }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="db-phase">
      <div className="db-phase-head" onClick={() => setOpen(!open)}>
        <span className="db-phase-num">
          PHASE {String(phase.phase).padStart(2, "0")}
        </span>
        <span className="db-phase-title">{phase.title}</span>
        <span className={`db-phase-toggle${open ? " open" : ""}`}>+</span>
      </div>
      <div className={`db-phase-body${open ? " open" : ""}`}>
        <div className="db-phase-cols">
          <div>
            <p className="db-phase-col-label">Projects</p>
            <ul className="db-phase-list">
              {phase.projects.map((p, i) => (
                <li key={i}>{p}</li>
              ))}
            </ul>
          </div>
          <div>
            <p className="db-phase-col-label">Skills to Gain</p>
            <div className="db-skills-wrap">
              {phase.skills_to_gain.map((s, i) => (
                <span key={i} className="db-skill-chip">
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const [users, setUsers] = useState(null);
  const navigate = useNavigate();
  const { user } = useAuth();

  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const checkFirstTime = async () => {
      try {
        const res = await fetch(
          `http://127.0.0.1:8000/auth/is-first-time/${user.user_id}`,
        );
        const d = await res.json();
        if (d.is_first_time) {
          setShowModal(true);
        } else {
          fetchDashboard();
        }
      } catch (err) {
        console.error(err);
      }
    };
    if (user?.user_id) checkFirstTime();
  }, [user]);

  const fetchDashboard = async () => {
    try {
      const res = await fetch(
        `http://127.0.0.1:8000/auth/dashboard/${user.user_id}`,
      );
      const dashboard = await res.json();
      const res2 = await fetch(
        `http://127.0.0.1:8000/progress/${user.user_id}`,
      );
      const prog = await res2.json();
      setUsers(dashboard?.user);
      setData(dashboard?.career?.ai_json);
      setProgress(prog.progress_percentage);
    } catch (err) {
      console.error(err);
    }
  };

  if (!data) {
    return (
      <>
        <style>{STYLES}</style>
        <div className="db-root">
          <div className="db-loader">
            <div className="db-loader-bar">
              <div className="db-loader-fill" />
            </div>
            <span>Initialising career intelligence</span>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <style>{STYLES}</style>
      <div className="db-root">
        {showModal && (
          <Profilesetup
            onClose={() => {
              setShowModal(false);
              fetchDashboard();
            }}
          />
        )}

        <div className="db-shell">
          {/* ── Masthead ── */}
          <div className="db-masthead">
            <div className="db-masthead-left">
              <p className="db-eyebrow">Career Intelligence Report</p>
              <h1 className="db-name">
                {users?.name?.split(" ")[0]},<br />
                {users?.name?.split(" ").slice(1).join(" ")}
              </h1>
              <p className="db-goal">{data.career_goal}</p>
            </div>
            <div className="db-masthead-right">
              <span className="db-badge">Career Counsellor v2</span>
              <span className="db-version">
                {new Date()
                  .toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })
                  .toUpperCase()}
              </span>
            </div>
          </div>

          {/* ── Stats ── */}
          <div className="db-stats">
            <div className="db-stat">
              <p className="db-stat-label">Confidence Score</p>
              <p className="db-stat-value">
                {(data.confidence_score * 100).toFixed(0)}
                <span
                  style={{
                    fontSize: 18,
                    fontFamily: "var(--db-mono)",
                    fontWeight: 400,
                  }}
                >
                  %
                </span>
              </p>
              <p className="db-stat-sub">AI-assessed readiness</p>
            </div>

            <div className="db-stat">
              <p className="db-stat-label">Recommended Domain</p>
              <p
                className="db-stat-value"
                style={{ fontSize: "clamp(16px, 2.2vw, 22px)", marginTop: 6 }}
              >
                {data.recommended_domain}
              </p>
              <p className="db-stat-sub">Primary career vector</p>
            </div>

            <div className="db-stat">
              <p className="db-stat-label">Overall Progress</p>
              <p className="db-stat-value">
                {progress}
                <span
                  style={{
                    fontSize: 18,
                    fontFamily: "var(--db-mono)",
                    fontWeight: 400,
                  }}
                >
                  %
                </span>
              </p>
              <div className="db-prog-track">
                <div
                  className="db-prog-fill"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>

          {/* ── Overview ── */}
          <div style={{ marginBottom: 40 }}>
            <div className="db-section-header">
              <p className="db-section-title">Overview</p>
              <div className="db-section-rule" />
            </div>
            <div className="db-overview">
              <p className="db-overview-text">{data.summary}</p>
            </div>
          </div>

          {/* ── Roadmap ── */}
          <div className="db-roadmap">
            <div className="db-section-header">
              <p className="db-section-title">Roadmap</p>
              <div className="db-section-rule" />
              <span className="db-section-count">
                {data.monthly_milestones.length} PHASES
              </span>
            </div>
            <div className="db-phases">
              {data.monthly_milestones.map((phase) => (
                <PhaseCard key={phase.phase} phase={phase} />
              ))}
            </div>
          </div>

          {/* ── CTA ── */}
          <button className="db-cta" onClick={() => navigate("/roadmap")}>
            <span>View Full Roadmap</span>
            <span className="db-cta-arrow">→</span>
          </button>
        </div>
      </div>
    </>
  );
}
