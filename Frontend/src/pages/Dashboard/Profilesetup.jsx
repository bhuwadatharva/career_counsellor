import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../AuthContext";

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=DM+Mono:wght@300;400;500&family=DM+Sans:wght@300;400;500&display=swap');

  .ps-overlay {
    position: fixed;
    inset: 0;
    background: rgba(248,250,252,0.85); 
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
    background: #ffffff;
    width: 100%;
    max-width: 620px;
    border-radius: 12px;
    border: 1px solid #e2e8f0;
    overflow: hidden;
    position: relative;
    box-shadow: 0 32px 80px rgba(0,0,0,0.05);
  }

  /* ── Header bar ── */
  .ps-header {
    border-bottom: 1px solid #e2e8f0;
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
    color: #64748b;
    margin-bottom: 4px;
  }
  .ps-header-title {
    font-family: 'Playfair Display', serif;
    font-size: 20px;
    font-weight: 900;
    letter-spacing: -0.02em;
    color: #064e3b;
  }
  .ps-step-counter {
    font-family: 'DM Mono', monospace;
    font-size: 11px;
    letter-spacing: 0.12em;
    color: #64748b;
    padding-top: 4px;
  }
  .ps-step-counter strong {
    color: #064e3b;
    font-weight: 700;
  }

  /* ── Progress track ── */
  .ps-progress-track {
    height: 3px;
    background: #e2e8f0;
    width: 100%;
  }
  .ps-progress-fill {
    height: 3px;
    background: #10b981;
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
    color: #94a3b8;
    margin-bottom: 10px;
    font-weight: bold;
  }
  .ps-q-text {
    font-family: 'Playfair Display', serif;
    font-size: clamp(17px, 2.5vw, 22px);
    font-weight: 700;
    line-height: 1.35;
    color: #064e3b;
    letter-spacing: -0.01em;
    margin-bottom: 6px;
  }
  .ps-q-sub {
    font-family: 'DM Sans', sans-serif;
    font-size: 12px;
    color: #64748b;
    margin-bottom: 26px;
    font-weight: 500;
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
    color: #64748b;
    margin-bottom: 14px;
    border: 1px solid #e2e8f0;
    background: #f8fafc;
    padding: 4px 10px;
    border-radius: 4px;
    width: fit-content;
    font-weight: bold;
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
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    background: #ffffff;
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
    background: #ecfdf5;
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.2s cubic-bezier(0.4,0,0.2,1);
    z-index: 0;
  }
  .ps-option:hover {
    border-color: #a7f3d0;
  }
  .ps-option:hover::before {
    transform: scaleX(1);
  }
  .ps-option:hover .ps-opt-id,
  .ps-option:hover .ps-opt-text {
    color: #064e3b;
  }
  .ps-option:hover .ps-opt-check {
    border-color: #10b981;
  }
  .ps-option.selected {
    border-color: #10b981;
    background: #ecfdf5;
  }
  .ps-option.selected .ps-opt-id,
  .ps-option.selected .ps-opt-text {
    color: #064e3b;
    font-weight: 600;
  }
  .ps-option.selected .ps-opt-check {
    border-color: #10b981;
    background: #10b981;
  }
  .ps-option.selected .ps-opt-check::after {
    opacity: 1;
  }
  .ps-opt-check {
    width: 18px;
    height: 18px;
    border: 2px solid #cbd5e1;
    border-radius: 50%;
    flex-shrink: 0;
    position: relative;
    z-index: 1;
    transition: all 0.15s ease;
    background: #ffffff;
  }
  .ps-opt-check.square {
    border-radius: 4px;
  }
  .ps-opt-check::after {
    content: '';
    position: absolute;
    top: 50%; left: 50%;
    transform: translate(-50%, -50%);
    width: 8px; height: 8px;
    background: #ffffff;
    border-radius: 50%;
    opacity: 0;
    transition: opacity 0.15s ease;
  }
  .ps-opt-check.square::after {
    width: 8px; height: 6px;
    background: transparent;
    border-bottom: 2px solid #ffffff;
    border-right: 2px solid #ffffff;
    transform: translate(-50%, -62%) rotate(45deg);
    border-radius: 0;
  }
  .ps-opt-id {
    font-family: 'DM Mono', monospace;
    font-size: 11px;
    color: #94a3b8;
    min-width: 16px;
    position: relative;
    z-index: 1;
    transition: color 0.15s ease;
    font-weight: bold;
  }
  .ps-opt-text {
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    font-weight: 500;
    color: #334155;
    line-height: 1.4;
    position: relative;
    z-index: 1;
    transition: color 0.15s ease;
  }

  /* ── Footer nav ── */
  .ps-footer {
    padding: 18px 32px 24px;
    border-top: 1px solid #e2e8f0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    background: #f8fafc;
  }
  .ps-btn-back {
    display: flex;
    align-items: center;
    gap: 8px;
    font-family: 'DM Mono', monospace;
    font-size: 10px;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: #64748b;
    background: #ffffff;
    border: 1px solid #e2e8f0;
    padding: 10px 18px;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.15s ease;
    font-weight: bold;
    box-shadow: 0 1px 2px rgba(0,0,0,0.05);
  }
  .ps-btn-back:hover {
    border-color: #cbd5e1;
    color: #334155;
    background: #f1f5f9;
  }
  .ps-btn-back:disabled {
    opacity: 0.4;
    cursor: not-allowed;
    background: transparent;
    box-shadow: none;
  }
  .ps-btn-next {
    display: flex;
    align-items: center;
    gap: 10px;
    font-family: 'DM Mono', monospace;
    font-size: 10px;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: #ffffff;
    background: #10b981;
    border: 1.5px solid #10b981;
    padding: 11px 24px;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.2s ease;
    position: relative;
    overflow: hidden;
    flex: 1;
    justify-content: center;
    max-width: 240px;
    margin-left: auto;
    font-weight: bold;
    box-shadow: 0 4px 12px rgba(16,185,129,0.2);
  }
  .ps-btn-next::before {
    content: '';
    position: absolute;
    inset: 0;
    background: #059669;
    transform: scaleX(0);
    transform-origin: right;
    transition: transform 0.2s ease;
    z-index: 0;
  }
  .ps-btn-next:hover::before {
    transform: scaleX(1);
  }
  .ps-btn-next:hover {
    box-shadow: 0 4px 16px rgba(16,185,129,0.3);
  }
  .ps-btn-next span, .ps-btn-next svg {
    position: relative;
    z-index: 1;
  }
  .ps-btn-next:disabled {
    opacity: 0.4;
    cursor: not-allowed;
    box-shadow: none;
  }
  .ps-btn-next.submit {
    background: #059669;
    border-color: #059669;
  }

  /* ── Dot indicators ── */
  .ps-dots {
    display: flex;
    align-items: center;
    gap: 6px;
  }
  .ps-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #cbd5e1;
    transition: all 0.3s ease;
  }
  .ps-dot.active {
    background: #10b981;
    width: 20px;
    border-radius: 4px;
  }
  .ps-dot.done {
    background: #a7f3d0;
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
    color: #064e3b;
  }
  .ps-gen-sub {
    font-family: 'DM Mono', monospace;
    font-size: 10px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: #64748b;
    margin-top: -10px;
    font-weight: bold;
  }
  .ps-gen-bar {
    width: 160px;
    height: 2px;
    background: #e2e8f0;
    overflow: hidden;
    margin-top: 8px;
    border-radius: 2px;
  }
  .ps-gen-fill {
    height: 2px;
    background: #10b981;
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
\`;left: 20px; padding-right: 20px; }
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
      const res = await fetch("http://127.0.0.1:8001/questions");
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
