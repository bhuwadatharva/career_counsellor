import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../AuthContext";

/* ─── Scoped styles matching Dashboard editorial theme ─── */
const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=DM+Mono:wght@300;400;500&family=DM+Sans:wght@300;400;500&display=swap');

  .ps-overlay {
    position: fixed;
    inset: 0;
    background: rgba(10,10,10,0.85);
    backdrop-filter: blur(6px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
    padding: 20px;
    animation: ps-fade-in 0.3s ease;
  }
  @keyframes ps-fade-in {
    from { opacity: 0; }
    to   { opacity: 1; }
  }

  .ps-card {
    background: #000000;
    width: 100%;
    max-width: 620px;
    border-radius: 4px;
    border: 1px solid #333333;
    overflow: hidden;
    position: relative;
    box-shadow: 0 32px 80px rgba(0,0,0,0.8);
  }

  /* ── Header bar ── */
  .ps-header {
    border-bottom: 1px solid #333333;
    padding: 22px 32px 18px;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
  }
  .ps-eyebrow {
    font-family: 'DM Mono', monospace;
    font-size: 9px;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: #888;
    margin-bottom: 4px;
  }
  .ps-header-title {
    font-family: 'Playfair Display', serif;
    font-size: 20px;
    font-weight: 900;
    letter-spacing: -0.02em;
    color: #ffffff;
  }
  .ps-step-counter {
    font-family: 'DM Mono', monospace;
    font-size: 11px;
    letter-spacing: 0.12em;
    color: #888;
    padding-top: 4px;
  }
  .ps-step-counter strong {
    color: #ffffff;
    font-weight: 500;
  }

  /* ── Progress track ── */
  .ps-progress-track {
    height: 2px;
    background: #333333;
    width: 100%;
  }
  .ps-progress-fill {
    height: 2px;
    background: #ffffff;
    transition: width 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  }

  /* ── Question stage ── */
  .ps-stage {
    padding: 36px 32px 28px;
    min-height: 320px;
    display: flex;
    flex-direction: column;
  }
  .ps-q-number {
    font-family: 'DM Mono', monospace;
    font-size: 9px;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: #aaa;
    margin-bottom: 10px;
  }
  .ps-q-text {
    font-family: 'Playfair Display', serif;
    font-size: clamp(17px, 2.5vw, 22px);
    font-weight: 700;
    line-height: 1.35;
    color: #ffffff;
    letter-spacing: -0.01em;
    margin-bottom: 6px;
  }
  .ps-q-sub {
    font-family: 'DM Sans', sans-serif;
    font-size: 12px;
    color: #999;
    margin-bottom: 26px;
    font-weight: 300;
    letter-spacing: 0.02em;
  }
  .ps-multi-hint {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-family: 'DM Mono', monospace;
    font-size: 9px;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: #aaa;
    margin-bottom: 14px;
    border: 1px solid #333333;
    background: #111111;
    padding: 4px 10px;
    border-radius: 2px;
    width: fit-content;
  }

  /* ── Options ── */
  .ps-options {
    display: flex;
    flex-direction: column;
    gap: 8px;
    flex: 1;
  }
  .ps-option {
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 13px 16px;
    border: 1px solid #333333;
    border-radius: 3px;
    background: #111111;
    cursor: pointer;
    text-align: left;
    transition: all 0.15s ease;
    width: 100%;
    position: relative;
    overflow: hidden;
  }
  .ps-option::before {
    content: '';
    position: absolute;
    inset: 0;
    background: #ffffff;
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.2s cubic-bezier(0.4,0,0.2,1);
    z-index: 0;
  }
  .ps-option:hover::before {
    transform: scaleX(1);
  }
  .ps-option:hover .ps-opt-id,
  .ps-option:hover .ps-opt-text {
    color: #000000;
  }
  .ps-option:hover .ps-opt-check {
    border-color: #000000;
  }
  .ps-option.selected {
    border-color: #ffffff;
    background: #ffffff;
  }
  .ps-option.selected .ps-opt-id,
  .ps-option.selected .ps-opt-text {
    color: #000000;
  }
  .ps-option.selected .ps-opt-check {
    border-color: #000000;
    background: #000000;
  }
  .ps-option.selected .ps-opt-check::after {
    opacity: 1;
  }
  .ps-opt-check {
    width: 16px;
    height: 16px;
    border: 1.5px solid #666;
    border-radius: 50%;
    flex-shrink: 0;
    position: relative;
    z-index: 1;
    transition: all 0.15s ease;
  }
  .ps-opt-check.square {
    border-radius: 2px;
  }
  .ps-opt-check::after {
    content: '';
    position: absolute;
    top: 50%; left: 50%;
    transform: translate(-50%, -50%);
    width: 6px; height: 6px;
    background: #ffffff;
    border-radius: 50%;
    opacity: 0;
    transition: opacity 0.15s ease;
  }
  .ps-opt-check.square::after {
    width: 7px; height: 5px;
    background: transparent;
    border-bottom: 1.5px solid #ffffff;
    border-right: 1.5px solid #ffffff;
    transform: translate(-50%, -62%) rotate(45deg);
    border-radius: 0;
  }
  .ps-opt-id {
    font-family: 'DM Mono', monospace;
    font-size: 10px;
    color: #888;
    min-width: 16px;
    position: relative;
    z-index: 1;
    transition: color 0.15s ease;
  }
  .ps-opt-text {
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    font-weight: 400;
    color: #dddddd;
    line-height: 1.4;
    position: relative;
    z-index: 1;
    transition: color 0.15s ease;
  }

  /* ── Footer nav ── */
  .ps-footer {
    padding: 18px 32px 24px;
    border-top: 1px solid #333;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
  }
  .ps-btn-back {
    display: flex;
    align-items: center;
    gap: 8px;
    font-family: 'DM Mono', monospace;
    font-size: 10px;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: #888;
    background: none;
    border: 1px solid #333;
    padding: 10px 18px;
    border-radius: 3px;
    cursor: pointer;
    transition: all 0.15s ease;
  }
  .ps-btn-back:hover {
    border-color: #555;
    color: #cecece;
  }
  .ps-btn-back:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
  .ps-btn-next {
    display: flex;
    align-items: center;
    gap: 10px;
    font-family: 'DM Mono', monospace;
    font-size: 10px;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: #000;
    background: #ffffff;
    border: 1.5px solid #ffffff;
    padding: 11px 24px;
    border-radius: 3px;
    cursor: pointer;
    transition: all 0.2s ease;
    position: relative;
    overflow: hidden;
    flex: 1;
    justify-content: center;
    max-width: 240px;
    margin-left: auto;
  }
  .ps-btn-next::before {
    content: '';
    position: absolute;
    inset: 0;
    background: #cccccc;
    transform: scaleX(0);
    transform-origin: right;
    transition: transform 0.2s ease;
    z-index: 0;
  }
  .ps-btn-next:hover::before {
    transform: scaleX(1);
  }
  .ps-btn-next span, .ps-btn-next svg {
    position: relative;
    z-index: 1;
  }
  .ps-btn-next:disabled {
    opacity: 0.35;
    cursor: not-allowed;
  }
  .ps-btn-next.submit {
    background: #ffffff;
  }

  /* ── Dot indicators ── */
  .ps-dots {
    display: flex;
    align-items: center;
    gap: 5px;
  }
  .ps-dot {
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: #333;
    transition: all 0.2s ease;
  }
  .ps-dot.active {
    background: #ffffff;
    width: 18px;
    border-radius: 3px;
  }
  .ps-dot.done {
    background: #666;
  }

  /* ── Slide animation ── */
  .ps-slide {
    animation: ps-slide-up 0.28s cubic-bezier(0.4, 0, 0.2, 1);
  }
  @keyframes ps-slide-up {
    from { opacity: 0; transform: translateY(14px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  /* ── Loading state ── */
  .ps-generating {
    min-height: 320px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;
    padding: 36px 32px;
  }
  .ps-gen-title {
    font-family: 'Playfair Display', serif;
    font-size: 22px;
    font-weight: 700;
    letter-spacing: -0.01em;
    color: #ffffff;
  }
  .ps-gen-sub {
    font-family: 'DM Mono', monospace;
    font-size: 10px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: #aaa;
    margin-top: -10px;
  }
  .ps-gen-bar {
    width: 160px;
    height: 1px;
    background: #333;
    overflow: hidden;
    margin-top: 8px;
  }
  .ps-gen-fill {
    height: 1px;
    background: #ffffff;
    animation: ps-gen-anim 1.6s ease-in-out infinite;
  }
  @keyframes ps-gen-anim {
    0%   { width: 0; margin-left: 0; }
    50%  { width: 100%; margin-left: 0; }
    100% { width: 0; margin-left: 100%; }
  }

  @media (max-width: 480px) {
    .ps-header, .ps-stage, .ps-footer { padding-left: 20px; padding-right: 20px; }
    .ps-dots { display: none; }
  }
`;

export default function Profilesetup({ onClose }) {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(false);
  const [slideKey, setSlideKey] = useState(0);

  useEffect(() => {
    const fetchQuestions = async () => {
      const res = await fetch(
        "https://career-counsellor-22cy.onrender.com/questions",
      );
      const data = await res.json();
      setQuestions(data.questions || []);
    };
    fetchQuestions();
  }, []);

  const handleAnswer = (qId, optionId, multi) => {
    setAnswers((prev) => {
      if (multi) {
        const prev_ = prev[qId] || [];
        return {
          ...prev,
          [qId]: prev_.includes(optionId)
            ? prev_.filter((a) => a !== optionId)
            : [...prev_, optionId],
        };
      }
      return { ...prev, [qId]: [optionId] };
    });
  };

  const goNext = () => {
    setSlideKey((k) => k + 1);
    setCurrent((c) => c + 1);
  };

  const goBack = () => {
    setSlideKey((k) => k + 1);
    setCurrent((c) => c - 1);
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const payload = {
        name: "User",
        current_year: 2,
        total_years: 4,
        degree_type: "B.Tech",
        preferred_work_style: "both",
        answers,
      };
      const res = await fetch(
        `https://career-counsellor-ha78.onrender.com/career/generate/${user.user_id}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
      );
      const data = await res.json();
      localStorage.setItem("career_id", data.career_id);
      onClose();
      navigate("/roadmap");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const q = questions[current];
  const isAnswered = q && answers[q.id]?.length > 0;
  const progress =
    questions.length > 0 ? (current / questions.length) * 100 : 0;

  return (
    <>
      <style>{STYLES}</style>
      <div className="ps-overlay">
        <div className="ps-card">
          {/* ── Header ── */}
          <div className="ps-header">
            <div>
              <p className="ps-eyebrow">Career Intelligence Setup</p>
              <p className="ps-header-title">Profile Assessment</p>
            </div>
            {questions.length > 0 && (
              <p className="ps-step-counter">
                <strong>{current + 1}</strong> / {questions.length}
              </p>
            )}
          </div>

          {/* ── Progress ── */}
          <div className="ps-progress-track">
            <div
              className="ps-progress-fill"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* ── Content ── */}
          {loading ? (
            <div className="ps-generating">
              <p className="ps-gen-title">Building your roadmap</p>
              <p className="ps-gen-sub">AI is analysing your profile</p>
              <div className="ps-gen-bar">
                <div className="ps-gen-fill" />
              </div>
            </div>
          ) : questions.length === 0 ? (
            <div className="ps-generating">
              <p className="ps-gen-sub">Loading questions...</p>
              <div className="ps-gen-bar">
                <div className="ps-gen-fill" />
              </div>
            </div>
          ) : (
            <div className="ps-stage ps-slide" key={slideKey}>
              <p className="ps-q-number">
                Question {String(current + 1).padStart(2, "0")}
              </p>
              <p className="ps-q-text">{q.text}</p>
              {q.subtitle && <p className="ps-q-sub">{q.subtitle}</p>}
              {q.multi_select && (
                <span className="ps-multi-hint">
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <rect
                      x="1"
                      y="1"
                      width="8"
                      height="8"
                      rx="1"
                      stroke="currentColor"
                      strokeWidth="1.2"
                    />
                    <path
                      d="M3 5l1.5 1.5L7 3.5"
                      stroke="currentColor"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                    />
                  </svg>
                  Select all that apply
                </span>
              )}
              <div className="ps-options">
                {q.options.map((opt) => {
                  const selected = answers[q.id]?.includes(opt.id);
                  return (
                    <button
                      key={opt.id}
                      className={`ps-option${selected ? " selected" : ""}`}
                      onClick={() => handleAnswer(q.id, opt.id, q.multi_select)}
                    >
                      <span
                        className={`ps-opt-check${q.multi_select ? " square" : ""}`}
                      />
                      <span className="ps-opt-id">{opt.id}</span>
                      <span className="ps-opt-text">{opt.text}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* ── Footer ── */}
          {!loading && questions.length > 0 && (
            <div className="ps-footer">
              <button
                className="ps-btn-back"
                onClick={goBack}
                disabled={current === 0}
              >
                ← Back
              </button>

              <div className="ps-dots">
                {questions.map((_, i) => (
                  <div
                    key={i}
                    className={`ps-dot${i === current ? " active" : i < current ? " done" : ""}`}
                  />
                ))}
              </div>

              {current < questions.length - 1 ? (
                <button
                  className="ps-btn-next"
                  onClick={goNext}
                  disabled={!isAnswered}
                >
                  <span>Next</span>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path
                      d="M2 6h8M7 3l3 3-3 3"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              ) : (
                <button
                  className="ps-btn-next submit"
                  onClick={handleSubmit}
                  disabled={!isAnswered}
                >
                  <span>Generate Roadmap</span>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path
                      d="M2 6h8M7 3l3 3-3 3"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
