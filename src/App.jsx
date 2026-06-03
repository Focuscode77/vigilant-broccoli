import { useEffect, useRef, useState } from 'react';
import './App.css';

const C = {
  void: '#0A0A0F',
  blue: '#0D3D6E',
  frost: '#F5F5F7',
  carbon: '#2C2C2A',
  green: '#126B50',      // backgrounds with white text
  greenText: '#1D9E75',  // text on dark backgrounds
  white: '#FFFFFF',
  border: '#E0E0E2',
  muted: '#6B6B6E',
  red: '#B03030',
};

/* ─── Hook: fire once when element enters viewport ────── */
function useInView(options = {}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setVisible(true); obs.disconnect(); }
    }, { threshold: 0.15, ...options });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

/* ─── NAV ─────────────────────────────────────────────── */
function Nav() {
  return (
    <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 48px', position: 'sticky', top: 0, background: C.void, zIndex: 100 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <img src="/aurviq-logo.svg" alt="Aurviq logo" style={{ height: '28px' }} />
        <span style={{ fontWeight: 700, fontSize: '17px', letterSpacing: '0.08em', color: C.frost }}>AURVIQ</span>
      </div>
      <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
        <a href="#services" style={{ color: C.frost, fontSize: '14px', textDecoration: 'none', opacity: 0.65 }}>Services</a>
        <a href="#proof"    style={{ color: C.frost, fontSize: '14px', textDecoration: 'none', opacity: 0.65 }}>Proof</a>
        <a href="#contact"  style={{ background: C.green, color: C.white, padding: '8px 20px', fontSize: '14px', fontWeight: 700, letterSpacing: '0.04em', textDecoration: 'none' }}>Get started</a>
      </div>
    </nav>
  );
}

/* ─── HERO ────────────────────────────────────────────── */
function Hero() {
  return (
    <section className="hero-section" style={{ minHeight: '560px' }}>
      {/* Ambient gradient orbs */}
      <div className="hero-orb hero-orb-1" />
      <div className="hero-orb hero-orb-2" />
      <div className="hero-orb hero-orb-3" />

      {/* Technical grid */}
      <div className="hero-grid" />

      {/* Sweeping shimmer */}
      <div className="hero-shimmer" />

      {/* Bottom fade into page */}
      <div className="hero-fade" />

      {/* Content */}
      <div className="hero-content" style={{ padding: '112px 48px 96px', maxWidth: '960px', margin: '0 auto' }}>
        <p style={{ fontFamily: 'Courier New, monospace', fontSize: '11px', letterSpacing: '0.18em', color: C.greenText, marginBottom: '28px', textTransform: 'uppercase', opacity: 0.85 }}>
          QUALITY ASSURANCE · ADA COMPLIANT · PERFORMANCE TESTED
        </p>
        <h1 style={{ fontWeight: 700, fontSize: 'clamp(40px, 6vw, 72px)', lineHeight: 1.08, color: C.frost, marginBottom: '28px', letterSpacing: '-0.025em' }}>
          Products built to work.<br />For everyone.<br />Every time.
        </h1>
        <p style={{ fontSize: '17px', color: C.frost, opacity: 0.6, maxWidth: '520px', marginBottom: '44px', lineHeight: 1.75 }}>
          Aurviq is the QA agency embedded in your team. We catch what others miss — before a single user encounters it.
        </p>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <a href="#contact" style={{ background: C.blue, color: C.white, padding: '13px 30px', fontWeight: 700, fontSize: '14px', letterSpacing: '0.05em', textDecoration: 'none', display: 'inline-block' }}>
            SHIP WITH CERTAINTY.
          </a>
          <a href="#services" style={{ border: `1px solid rgba(245,245,247,0.2)`, color: C.frost, padding: '13px 30px', fontSize: '14px', textDecoration: 'none', display: 'inline-block', opacity: 0.8 }}>
            See how it works
          </a>
        </div>
      </div>
    </section>
  );
}

/* ─── STATS BAR ───────────────────────────────────────── */
function StatsBar() {
  const [ref, visible] = useInView();
  const stats = [
    { number: '100×', label: 'Bug cost: production vs. planning' },
    { number: '~$0',  label: 'Bug cost caught in planning' },
    { number: '9',    label: 'Bugs caught before go-live' },
    { number: '14',   label: 'ADA violations fixed pre-launch' },
  ];
  return (
    <div ref={ref} style={{ borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}`, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', background: C.white }}>
      {stats.map((s, i) => (
        <div key={i} className={`fade-up${visible ? ' visible' : ''}`}
          style={{ padding: '40px 24px', borderRight: i < 3 ? `1px solid ${C.border}` : 'none', textAlign: 'center', animationDelay: `${i * 0.1}s` }}>
          <div style={{ fontWeight: 700, fontSize: '38px', color: C.green, marginBottom: '8px', letterSpacing: '-0.02em' }}>{s.number}</div>
          <div style={{ fontFamily: 'Courier New, monospace', fontSize: '10px', letterSpacing: '0.12em', color: C.muted, textTransform: 'uppercase' }}>{s.label}</div>
        </div>
      ))}
    </div>
  );
}

/* ─── SERVICES ────────────────────────────────────────── */
function Services() {
  const [ref, visible] = useInView();
  const pkgs = [
    { stage: 'STAGE 01 — PLANNING',   name: 'Foundation', tagline: 'Build the right thing before you build anything.',      body: "Every mistake made before a line of code is written becomes exponentially more expensive to fix later. Foundation eliminates that risk before it's possible." },
    { stage: 'STAGE 02 — REGRESSION', name: 'Shield',     tagline: 'Every new feature protected. Nothing breaks what works.', body: 'Your checkout broke on iOS. We found it first. Shield wraps every release with regression coverage so nothing that works today breaks tomorrow.' },
    { stage: 'STAGE 03 — AUTOMATION', name: 'Autopilot',  tagline: 'Quality at scale without scaling your team.',             body: 'Automated test suites, performance benchmarks, and ADA checks — running on every build. Speed and quality are no longer a trade-off.' },
  ];
  return (
    <section id="services" style={{ padding: '96px 48px', background: C.frost }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <p style={{ fontFamily: 'Courier New, monospace', fontSize: '11px', letterSpacing: '0.15em', color: C.blue, textTransform: 'uppercase', marginBottom: '14px' }}>Services</p>
        <h2 style={{ fontWeight: 700, fontSize: 'clamp(28px, 4vw, 44px)', color: C.void, marginBottom: '56px', letterSpacing: '-0.02em' }}>Three stages. One standard.</h2>
        <div ref={ref} style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1px', background: C.border, border: `1px solid ${C.border}` }}>
          {pkgs.map((pkg, i) => (
            <div key={i} className={`fade-up${visible ? ' visible' : ''}`}
              style={{ background: C.white, padding: '44px 36px', display: 'flex', flexDirection: 'column', gap: '14px', animationDelay: `${i * 0.12}s` }}>
              <p style={{ fontFamily: 'Courier New, monospace', fontSize: '10px', letterSpacing: '0.14em', color: C.blue, textTransform: 'uppercase' }}>{pkg.stage}</p>
              <h3 style={{ fontWeight: 700, fontSize: '30px', color: C.void, lineHeight: 1.1 }}>{pkg.name}</h3>
              <div style={{ width: '36px', height: '2px', background: C.green }} />
              <p style={{ fontWeight: 700, color: C.void, fontSize: '14px', lineHeight: 1.5 }}>{pkg.tagline}</p>
              <p style={{ color: C.muted, fontSize: '13px', lineHeight: 1.75 }}>{pkg.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── PIPELINE DIAGRAM ────────────────────────────────── */
function PipelineDiagram() {
  const [ref, visible] = useInView();
  const [arrowRef, arrowVisible] = useInView();

  const stages = [
    { id: '01', name: 'Foundation', sub: 'PLANNING',   items: ['Requirements review', 'Test strategy', 'Risk mapping', 'Acceptance criteria'] },
    { id: '02', name: 'Shield',     sub: 'REGRESSION', items: ['Feature testing', 'Regression suite', 'Cross-browser checks', 'iOS / Android'] },
    { id: '03', name: 'Autopilot',  sub: 'AUTOMATION', items: ['CI/CD integration', 'Performance tests', 'ADA scans', 'Scheduled runs'] },
  ];

  return (
    <div className="hero-section" style={{ padding: '64px 48px' }}>
      <div className="hero-orb hero-orb-1" />
      <div className="hero-orb hero-orb-2" />
      <div className="hero-orb hero-orb-3" />
      <div className="hero-grid" />
      <div className="hero-shimmer" />
      <div style={{ position: 'relative', zIndex: 2, maxWidth: '1100px', margin: '0 auto' }}>
        <p style={{ fontFamily: 'Courier New, monospace', fontSize: '11px', letterSpacing: '0.15em', color: C.greenText, textTransform: 'uppercase', marginBottom: '40px', textAlign: 'center' }}>
          THE TESTING PIPELINE
        </p>

        <div ref={ref} style={{ display: 'grid', gridTemplateColumns: '1fr 40px 1fr 40px 1fr', alignItems: 'start' }}>
          {stages.map((s, i) => (
            <>
              {/* Stage card */}
              <div key={s.id} className={`fade-up${visible ? ' visible' : ''}`}
                style={{ border: `1px solid rgba(245,245,247,0.12)`, padding: '32px 28px', background: 'rgba(245,245,247,0.03)', animationDelay: `${i * 0.18}s` }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                  <div style={{ width: '32px', height: '32px', background: C.blue, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <span style={{ fontFamily: 'Courier New, monospace', fontSize: '11px', color: C.frost, fontWeight: 700 }}>{s.id}</span>
                  </div>
                  <div>
                    <p style={{ fontFamily: 'Courier New, monospace', fontSize: '9px', letterSpacing: '0.14em', color: C.greenText, textTransform: 'uppercase', marginBottom: '2px' }}>{s.sub}</p>
                    <p style={{ fontWeight: 700, fontSize: '18px', color: C.frost, lineHeight: 1 }}>{s.name}</p>
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {s.items.map((item, j) => (
                    <div key={j} className={`fade-in${visible ? ' visible' : ''}`}
                      style={{ display: 'flex', alignItems: 'center', gap: '10px', animationDelay: `${i * 0.18 + j * 0.07 + 0.3}s` }}>
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ flexShrink: 0 }}>
                        <rect width="12" height="12" fill={C.greenText} opacity="0.15" />
                        <path d="M2.5 6l2.5 2.5 4.5-5" stroke={C.greenText} strokeWidth="1.5" strokeLinecap="square" />
                      </svg>
                      <span style={{ fontFamily: 'Courier New, monospace', fontSize: '11px', color: C.frost, opacity: 0.65 }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Arrow */}
              {i < 2 && (
                <div key={`arrow-${i}`} ref={i === 0 ? arrowRef : null}
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: '40px' }}>
                  <svg width="40" height="16" viewBox="0 0 40 16" fill="none" overflow="visible">
                    <line className={`arrow-path${arrowVisible ? ' visible' : ''}`}
                      x1="0" y1="8" x2="32" y2="8"
                      stroke={C.blue} strokeWidth="1.5"
                      style={{ animationDelay: `${0.35 + i * 0.18}s` }} />
                    <path className={`fade-in${arrowVisible ? ' visible' : ''}`}
                      d="M28 3l8 5-8 5" stroke={C.blue} strokeWidth="1.5" strokeLinecap="square" fill="none"
                      style={{ animationDelay: `${0.6 + i * 0.18}s` }} />
                  </svg>
                </div>
              )}
            </>
          ))}
        </div>

        {/* Terminal status bar */}
        <div className={`fade-in${visible ? ' visible' : ''}`}
          style={{ marginTop: '32px', background: 'rgba(245,245,247,0.04)', border: `1px solid rgba(245,245,247,0.08)`, padding: '16px 24px', display: 'flex', alignItems: 'center', gap: '24px', animationDelay: '0.8s' }}>
          <span className="terminal-cursor" style={{ fontFamily: 'Courier New, monospace', fontSize: '10px', color: C.greenText, letterSpacing: '0.1em' }}>▶ PIPELINE STATUS</span>
          {['PLAN COMPLETE', 'TESTS PASSING', 'ADA: OK', 'PERF: OK', 'READY TO SHIP'].map((label, i) => (
            <span key={i} className={`fade-in${visible ? ' visible' : ''}`}
              style={{ fontFamily: 'Courier New, monospace', fontSize: '10px', color: C.frost, opacity: 0.6, letterSpacing: '0.08em', animationDelay: `${0.9 + i * 0.12}s` }}>
              {label}{i < 4 && <span style={{ opacity: 0.3, marginLeft: '8px' }}>·</span>}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── COST CURVE + CHART ──────────────────────────────── */
function CostCurve() {
  const [ref, visible] = useInView();
  const [withAurviq, setWithAurviq] = useState(false);

  const states = {
    without: [
      { label: 'Planning',   pct: 2,   color: C.greenText, cost: '~$0'  },
      { label: 'Staging',    pct: 15,  color: '#B8860B', cost: '~15×' },
      { label: 'Production', pct: 100, color: C.red,   cost: '100×' },
    ],
    with: [
      { label: 'Planning',   pct: 2,  color: C.greenText, cost: '~$0' },
      { label: 'Staging',    pct: 2,  color: C.greenText, cost: '~$0' },
      { label: 'Production', pct: 2,  color: C.greenText, cost: '~$0' },
    ],
  };

  const bars = withAurviq ? states.with : states.without;

  return (
    <section style={{ background: C.void, padding: '80px 48px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }}>

        {/* Copy */}
        <div className={`fade-up${visible ? ' visible' : ''}`} ref={ref}>
          <p style={{ fontFamily: 'Courier New, monospace', fontSize: '11px', letterSpacing: '0.15em', color: C.greenText, textTransform: 'uppercase', marginBottom: '20px' }}>THE COST CURVE</p>
          <h2 style={{ fontWeight: 700, fontSize: 'clamp(22px, 3vw, 34px)', color: C.frost, marginBottom: '20px', lineHeight: 1.25, letterSpacing: '-0.02em' }}>
            A bug in planning costs <span style={{ color: C.greenText }}>~$0.</span><br />
            That same bug in production costs you <span style={{ color: C.red }}>your launch.</span>
          </h2>
          <p style={{ color: C.frost, opacity: 0.5, fontSize: '14px', lineHeight: 1.75 }}>
            NIST research puts the fix cost ratio at up to 100× between planning and production. Aurviq's Foundation package exists to eliminate that risk before it's even possible.
          </p>
          <div style={{ marginTop: '32px', padding: '16px 20px', background: 'rgba(245,245,247,0.04)', borderLeft: `3px solid ${C.greenText}`, fontFamily: 'Courier New, monospace', fontSize: '11px', color: C.greenText, letterSpacing: '0.1em', lineHeight: 1.6 }}>
            SOURCE: NIST — "The Economic Impacts of Inadequate Infrastructure for Software Testing"
          </div>
        </div>

        {/* Bar chart */}
        <div>
          {/* Toggle */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
            <p style={{ fontFamily: 'Courier New, monospace', fontSize: '10px', letterSpacing: '0.12em', color: C.frost, opacity: 0.55, textTransform: 'uppercase' }}>
              Relative cost to fix a bug — by stage
            </p>
            <div style={{ display: 'flex', gap: '2px' }}>
              <button className="toggle-btn"
                onClick={() => setWithAurviq(false)}
                style={{ color: !withAurviq ? C.void : C.frost, background: !withAurviq ? C.frost : 'transparent', borderColor: !withAurviq ? C.frost : 'rgba(245,245,247,0.25)' }}>
                Without
              </button>
              <button className="toggle-btn"
                onClick={() => setWithAurviq(true)}
                style={{ color: withAurviq ? C.void : C.frost, background: withAurviq ? C.green : 'transparent', borderColor: withAurviq ? C.green : 'rgba(245,245,247,0.25)' }}>
                With Aurviq
              </button>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {bars.map((b, i) => (
              <div key={i} className={`fade-up${visible ? ' visible' : ''}`} style={{ animationDelay: `${0.2 + i * 0.15}s` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <span style={{ fontFamily: 'Courier New, monospace', fontSize: '11px', color: C.frost, opacity: 0.65, letterSpacing: '0.08em', textTransform: 'uppercase' }}>{b.label}</span>
                  <span style={{ fontFamily: 'Courier New, monospace', fontSize: '11px', color: b.color, fontWeight: 700, transition: 'color 0.4s' }}>{b.cost}</span>
                </div>
                <div style={{ height: '28px', background: 'rgba(245,245,247,0.06)', position: 'relative', overflow: 'hidden' }}>
                  <div className="bar-interactive"
                    style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: visible ? `${b.pct}%` : '0%', background: b.color, opacity: 0.85, minWidth: b.pct > 0 ? '4px' : '0' }} />
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ fontFamily: 'Courier New, monospace', fontSize: '9px', color: C.frost, opacity: 0.25, letterSpacing: '0.08em' }}>LOW COST</span>
            <span style={{ fontFamily: 'Courier New, monospace', fontSize: '9px', color: C.frost, opacity: 0.25, letterSpacing: '0.08em' }}>HIGH COST</span>
          </div>

          {withAurviq && (
            <p className="fade-in visible" style={{ fontFamily: 'Courier New, monospace', fontSize: '11px', color: C.greenText, marginTop: '16px', letterSpacing: '0.08em', textAlign: 'right' }}>
              ✓ All bugs caught in planning. Cost: ~$0.
            </p>
          )}
        </div>

      </div>
    </section>
  );
}

/* ─── PERFORMANCE CHART ───────────────────────────────── */
function PerformanceChart() {
  const [ref, visible] = useInView();
  const [mode, setMode] = useState('before');

  const metrics = [
    { label: 'Load Time',         before: 18, after: 91, beforeLabel: '18/100', afterLabel: '91/100' },
    { label: 'Mobile Responsive', before: 0,  after: 96, beforeLabel: 'FAIL',   afterLabel: '96/100' },
    { label: 'ADA Compliance',    before: 12, after: 98, beforeLabel: '12/100', afterLabel: '98/100' },
    { label: 'SEO Score',         before: 0,  after: 94, beforeLabel: 'ZERO',   afterLabel: '94/100' },
  ];

  const isAfter = mode === 'after';

  return (
    <div ref={ref} style={{ marginTop: '56px' }}>
      {/* Header + toggle */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
        <p style={{ fontFamily: 'Courier New, monospace', fontSize: '10px', letterSpacing: '0.12em', color: C.blue, textTransform: 'uppercase' }}>
          Performance Scores
        </p>
        <div style={{ display: 'flex', gap: '2px' }}>
          <button className="toggle-btn"
            onClick={() => setMode('before')}
            style={{ color: !isAfter ? C.white : C.muted, background: !isAfter ? C.muted : 'transparent', borderColor: !isAfter ? C.muted : C.border }}>
            Before
          </button>
          <button className="toggle-btn"
            onClick={() => setMode('after')}
            style={{ color: isAfter ? C.white : C.muted, background: isAfter ? C.green : 'transparent', borderColor: isAfter ? C.green : C.border }}>
            After
          </button>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {metrics.map((m, i) => {
          const val = isAfter ? m.after : m.before;
          const label = isAfter ? m.afterLabel : m.beforeLabel;
          const color = isAfter ? C.green : C.muted;
          const score = Math.round((val / 100) * 100);

          return (
            <div key={i} className={`fade-up${visible ? ' visible' : ''}`} style={{ animationDelay: `${i * 0.1}s` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '8px' }}>
                <span style={{ fontSize: '13px', color: C.void, fontWeight: 600 }}>{m.label}</span>
                <span style={{ fontFamily: 'Courier New, monospace', fontSize: '12px', color, fontWeight: 700, transition: 'color 0.4s' }}>
                  {label}
                </span>
              </div>
              <div style={{ height: '10px', background: C.border, position: 'relative', overflow: 'hidden' }}>
                <div className="bar-interactive"
                  style={{
                    position: 'absolute', left: 0, top: 0, bottom: 0,
                    width: visible ? `${val}%` : '0%',
                    background: color,
                    opacity: isAfter ? 1 : 0.45,
                    minWidth: val > 0 ? '3px' : '0',
                    transition: 'width 0.7s cubic-bezier(0.22,1,0.36,1), background 0.4s, opacity 0.4s',
                  }} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div style={{ display: 'flex', gap: '20px', marginTop: '16px' }}>
        <button onClick={() => setMode('before')}
          style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', padding: 0 }}>
          <span style={{ width: '10px', height: '10px', background: C.muted, opacity: !isAfter ? 1 : 0.35, display: 'block', transition: 'opacity 0.3s' }} />
          <span style={{ fontFamily: 'Courier New, monospace', fontSize: '9px', color: !isAfter ? C.void : C.muted, letterSpacing: '0.08em', transition: 'color 0.3s' }}>BEFORE AURVIQ</span>
        </button>
        <button onClick={() => setMode('after')}
          style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', padding: 0 }}>
          <span style={{ width: '10px', height: '10px', background: C.green, opacity: isAfter ? 1 : 0.35, display: 'block', transition: 'opacity 0.3s' }} />
          <span style={{ fontFamily: 'Courier New, monospace', fontSize: '9px', color: isAfter ? C.green : C.muted, letterSpacing: '0.08em', transition: 'color 0.3s' }}>AFTER AURVIQ</span>
        </button>
      </div>
    </div>
  );
}

/* ─── PROOF ───────────────────────────────────────────── */
function Proof() {
  const [ref, visible] = useInView();
  const rows = [
    { before: 'Zero SEO — invisible to every search engine',           after: 'Full SEO audit and implementation' },
    { before: 'ADA non-compliant — excluding users with disabilities', after: 'ADA compliance overhaul completed' },
    { before: 'Slow load times — unoptimized media killing performance', after: 'Image and video optimization complete' },
    { before: 'Not mobile responsive — broken on most devices',        after: 'Full mobile responsiveness rebuild' },
    { before: 'Result: Zero discoverability',                          after: 'Result: Measurable increase in website traffic', bold: true },
  ];

  return (
    <section id="proof" style={{ padding: '96px 48px', background: C.frost }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <p style={{ fontFamily: 'Courier New, monospace', fontSize: '11px', letterSpacing: '0.15em', color: C.blue, textTransform: 'uppercase', marginBottom: '14px' }}>Case Study</p>
        <h2 style={{ fontWeight: 700, fontSize: 'clamp(28px, 4vw, 44px)', color: C.void, marginBottom: '10px', letterSpacing: '-0.02em' }}>From invisible to findable.</h2>
        <p style={{ color: C.muted, fontSize: '15px', marginBottom: '48px', maxWidth: '520px', lineHeight: 1.7 }}>
          A medical logistics company came to Aurviq with a product they believed in. Nobody could find it, access it, or load it fast enough to stay.
        </p>

        <div ref={ref} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', alignItems: 'start' }}>
          {/* Before/After table */}
          <div className={`fade-up${visible ? ' visible' : ''}`} style={{ animationDelay: '0s' }}>
            <div style={{ border: `1px solid ${C.border}`, background: C.white }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
                <div style={{ padding: '14px 24px', background: C.frost, fontFamily: 'Courier New, monospace', fontSize: '10px', letterSpacing: '0.12em', color: C.muted, textTransform: 'uppercase', borderBottom: `1px solid ${C.border}`, borderRight: `1px solid ${C.border}` }}>Before Aurviq</div>
                <div style={{ padding: '14px 24px', background: C.green, fontFamily: 'Courier New, monospace', fontSize: '10px', letterSpacing: '0.12em', color: C.white, fontWeight: 700, textTransform: 'uppercase', borderBottom: `1px solid ${C.border}` }}>After Aurviq</div>
              </div>
              {rows.map((r, i) => (
                <div key={i} className={`fade-in${visible ? ' visible' : ''}`}
                  style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderBottom: i < rows.length - 1 ? `1px solid ${C.border}` : 'none', animationDelay: `${0.1 + i * 0.08}s` }}>
                  <div style={{ padding: '16px 24px', fontSize: '12px', color: C.muted, borderRight: `1px solid ${C.border}` }}>{r.before}</div>
                  <div style={{ padding: '16px 24px', fontSize: '12px', color: C.void, fontWeight: r.bold ? 700 : 400 }}>{r.after}</div>
                </div>
              ))}
            </div>
            <div className={`fade-up${visible ? ' visible' : ''}`}
              style={{ marginTop: '20px', padding: '24px 28px', borderLeft: `4px solid ${C.green}`, background: C.white, border: `1px solid ${C.border}`, borderLeftWidth: '4px', borderLeftColor: C.green, animationDelay: '0.6s' }}>
              <p style={{ fontFamily: 'Courier New, monospace', fontSize: '10px', letterSpacing: '0.12em', color: C.green, textTransform: 'uppercase', marginBottom: '10px' }}>Client Quote</p>
              <p style={{ fontSize: '16px', color: C.void, fontStyle: 'italic' }}>"We're receiving more traffic to our website."</p>
              <p style={{ marginTop: '8px', fontSize: '12px', color: C.muted }}>— Client, Medical Logistics</p>
            </div>
          </div>

          {/* Performance chart */}
          <div className={`fade-up${visible ? ' visible' : ''}`}
            style={{ background: C.white, border: `1px solid ${C.border}`, padding: '32px 28px', animationDelay: '0.15s' }}>
            <PerformanceChart />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── ADA PANEL ───────────────────────────────────────── */
function ADAPanel() {
  const [listRef, listVisible] = useInView();
  const [wcagRef, wcagVisible] = useInView();

  const checks = [
    { label: 'Colour Contrast',     detail: '4.5:1 minimum ratio met' },
    { label: 'Keyboard Navigation', detail: 'All interactive elements reachable' },
    { label: 'Screen Reader',       detail: 'ARIA labels on all components' },
    { label: 'Alt Text',            detail: 'All images described' },
    { label: 'Focus Indicators',    detail: 'Visible on every focusable element' },
    { label: 'Form Labels',         detail: 'Every input explicitly labelled' },
    { label: 'Skip Navigation',     detail: 'Bypass link to main content' },
    { label: 'Semantic HTML',       detail: 'Heading hierarchy correct' },
  ];

  const levels = [
    { level: 'WCAG A',   status: 'PASS',    note: 'All 30 criteria met',  pass: true },
    { level: 'WCAG AA',  status: 'PASS',    note: 'All 20 criteria met',  pass: true },
    { level: 'WCAG AAA', status: 'PARTIAL', note: '14 of 28 criteria met', pass: false },
  ];

  const contrastRows = [
    { bg: C.void,  text: C.frost, ratio: '16.1:1', label: 'Void / Frost',         grade: 'AAA' },
    { bg: C.blue,  text: C.white, ratio: '7.2:1',  label: 'Stellar Blue / White', grade: 'AA' },
    { bg: C.green, text: C.white, ratio: '5.8:1',  label: 'Signal Green / White', grade: 'AA' },
    { bg: C.frost, text: C.void,  ratio: '16.1:1', label: 'Frost / Void',          grade: 'AAA' },
  ];

  return (
    <section style={{ background: C.white, padding: '96px 48px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <p style={{ fontFamily: 'Courier New, monospace', fontSize: '11px', letterSpacing: '0.15em', color: C.blue, textTransform: 'uppercase', marginBottom: '14px' }}>Accessibility</p>
        <h2 style={{ fontWeight: 700, fontSize: 'clamp(28px, 4vw, 44px)', color: C.void, marginBottom: '10px', letterSpacing: '-0.02em' }}>Built for every user.</h2>
        <p style={{ color: C.muted, fontSize: '15px', marginBottom: '56px', maxWidth: '560px', lineHeight: 1.7 }}>
          ADA compliance isn't a checkbox — it's the baseline. Every product Aurviq ships is tested against WCAG standards before a single user touches it.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', alignItems: 'start' }}>

          {/* Checklist */}
          <div ref={listRef} style={{ border: `1px solid ${C.border}` }}>
            <div style={{ padding: '14px 24px', background: C.frost, borderBottom: `1px solid ${C.border}` }}>
              <span style={{ fontFamily: 'Courier New, monospace', fontSize: '10px', letterSpacing: '0.12em', color: C.muted, textTransform: 'uppercase' }}>ADA Compliance Checklist</span>
            </div>
            {checks.map((c, i) => (
              <div key={i} className={`fade-in${listVisible ? ' visible' : ''}`}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 24px', borderBottom: i < checks.length - 1 ? `1px solid ${C.border}` : 'none', background: C.white, animationDelay: `${i * 0.07}s` }}>
                <div>
                  <p style={{ fontSize: '13px', fontWeight: 600, color: C.void, marginBottom: '2px' }}>{c.label}</p>
                  <p style={{ fontFamily: 'Courier New, monospace', fontSize: '10px', color: C.muted }}>{c.detail}</p>
                </div>
                <div className={`check-icon${listVisible ? ' visible' : ''}`}
                  style={{ display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0, marginLeft: '16px', animationDelay: `${i * 0.07 + 0.2}s` }}>
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <rect width="18" height="18" fill={C.green} opacity="0.12" />
                    <path d="M4 9l3.5 3.5 6.5-7" stroke={C.green} strokeWidth="1.8" strokeLinecap="square" />
                  </svg>
                  <span style={{ fontFamily: 'Courier New, monospace', fontSize: '10px', color: C.green, fontWeight: 700, letterSpacing: '0.06em' }}>PASS</span>
                </div>
              </div>
            ))}
          </div>

          {/* WCAG levels + contrast */}
          <div ref={wcagRef} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ border: `1px solid ${C.border}` }}>
              <div style={{ padding: '14px 24px', background: C.frost, borderBottom: `1px solid ${C.border}` }}>
                <span style={{ fontFamily: 'Courier New, monospace', fontSize: '10px', letterSpacing: '0.12em', color: C.muted, textTransform: 'uppercase' }}>WCAG 2.1 Conformance</span>
              </div>
              {levels.map((l, i) => (
                <div key={i} className={`fade-up${wcagVisible ? ' visible' : ''}`}
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 24px', borderBottom: i < levels.length - 1 ? `1px solid ${C.border}` : 'none', animationDelay: `${i * 0.1}s` }}>
                  <div>
                    <p style={{ fontWeight: 700, fontSize: '16px', color: C.void }}>{l.level}</p>
                    <p style={{ fontFamily: 'Courier New, monospace', fontSize: '10px', color: C.muted, marginTop: '2px' }}>{l.note}</p>
                  </div>
                  <span className={`check-icon${wcagVisible ? ' visible' : ''}`}
                    style={{ fontFamily: 'Courier New, monospace', fontSize: '10px', fontWeight: 700, letterSpacing: '0.08em', color: l.pass ? C.green : '#B8860B', background: l.pass ? 'rgba(18,107,80,0.08)' : 'rgba(184,134,11,0.08)', padding: '4px 10px', animationDelay: `${i * 0.1 + 0.2}s` }}>
                    {l.status}
                  </span>
                </div>
              ))}
            </div>

            {/* Contrast swatches */}
            <div className={`fade-up${wcagVisible ? ' visible' : ''}`}
              style={{ border: `1px solid ${C.border}`, padding: '28px 24px', animationDelay: '0.35s' }}>
              <p style={{ fontFamily: 'Courier New, monospace', fontSize: '10px', letterSpacing: '0.12em', color: C.muted, textTransform: 'uppercase', marginBottom: '20px' }}>
                Colour Contrast Reference
              </p>
              {contrastRows.map((row, i) => (
                <div key={i} className={`fade-in${wcagVisible ? ' visible' : ''}`}
                  style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: i < contrastRows.length - 1 ? '12px' : 0, animationDelay: `${0.4 + i * 0.08}s` }}>
                  <div style={{ width: '40px', height: '24px', background: row.bg, border: `1px solid ${C.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <span style={{ fontFamily: 'Courier New, monospace', fontSize: '8px', color: row.text, fontWeight: 700 }}>Aa</span>
                  </div>
                  <span style={{ fontFamily: 'Courier New, monospace', fontSize: '10px', color: C.muted, flex: 1 }}>{row.label}</span>
                  <span style={{ fontFamily: 'Courier New, monospace', fontSize: '10px', color: C.void, fontWeight: 700 }}>{row.ratio}</span>
                  <span style={{ fontFamily: 'Courier New, monospace', fontSize: '10px', color: C.green, background: 'rgba(18,107,80,0.08)', padding: '2px 8px' }}>{row.grade}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

/* ─── VOICE BLOCK ─────────────────────────────────────── */
function VoiceBlock() {
  const [ref, visible] = useInView();
  const pairs = [
    { never: '"We leverage best-in-class solutions..."',   always: '"We caught 9 bugs before your launch."' },
    { never: '"Our holistic approach ensures quality..."', always: '"Your checkout broke on iOS. We found it first."' },
    { never: '"We are passionate about accessibility..."', always: '"14 ADA violations. Fixed before any user saw them."' },
  ];

  return (
    <section style={{ background: C.frost, padding: '80px 48px' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <p style={{ fontFamily: 'Courier New, monospace', fontSize: '11px', letterSpacing: '0.15em', color: C.blue, textTransform: 'uppercase', marginBottom: '14px', textAlign: 'center' }}>Proof, not promises.</p>
        <h2 style={{ fontWeight: 700, fontSize: 'clamp(24px, 3.5vw, 38px)', color: C.void, marginBottom: '44px', textAlign: 'center', letterSpacing: '-0.02em' }}>We show our work.</h2>
        <div ref={ref} style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2px' }}>
            <div style={{ padding: '12px 24px', background: C.border, fontFamily: 'Courier New, monospace', fontSize: '10px', letterSpacing: '0.12em', color: C.muted, textTransform: 'uppercase' }}>Never say</div>
            <div style={{ padding: '12px 24px', background: C.green, fontFamily: 'Courier New, monospace', fontSize: '10px', letterSpacing: '0.12em', color: C.white, fontWeight: 700, textTransform: 'uppercase' }}>Always say</div>
          </div>
          {pairs.map((p, i) => (
            <div key={i} className={`fade-in${visible ? ' visible' : ''}`}
              style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2px', animationDelay: `${i * 0.12}s` }}>
              <div style={{ padding: '20px 24px', background: C.white, fontSize: '14px', color: C.muted, fontStyle: 'italic' }}>{p.never}</div>
              <div style={{ padding: '20px 24px', background: 'rgba(18,107,80,0.07)', fontSize: '14px', color: C.void, fontWeight: 700, borderLeft: `2px solid ${C.green}` }}>{p.always}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── CTA ─────────────────────────────────────────────── */
function CTA() {
  return (
    <section id="contact" className="hero-section" style={{ padding: '120px 48px', textAlign: 'center' }}>
      <div className="hero-orb hero-orb-1" />
      <div className="hero-orb hero-orb-2" />
      <div className="hero-orb hero-orb-3" />
      <div className="hero-grid" />
      <div className="hero-shimmer" />
      <div className="hero-fade" />
      <div style={{ position: 'relative', zIndex: 2, maxWidth: '680px', margin: '0 auto' }}>
        <p style={{ fontFamily: 'Courier New, monospace', fontSize: '11px', letterSpacing: '0.15em', color: C.frost, opacity: 0.65, textTransform: 'uppercase', marginBottom: '22px' }}>Ready to ship?</p>
        <h2 style={{ fontWeight: 700, fontSize: 'clamp(36px, 5.5vw, 64px)', color: C.white, marginBottom: '20px', lineHeight: 1.08, letterSpacing: '-0.025em' }}>Ship with certainty.</h2>
        <p style={{ fontSize: '16px', color: C.white, opacity: 0.75, marginBottom: '44px', lineHeight: 1.75 }}>Free 30-minute pre-launch audit. No pitch. Just proof.</p>
        <a href="mailto:hello@aurviq.com" style={{ background: C.white, color: C.blue, padding: '15px 38px', fontWeight: 700, fontSize: '15px', letterSpacing: '0.04em', display: 'inline-block', textDecoration: 'none' }}>
          BOOK A FREE AUDIT
        </a>
      </div>
    </section>
  );
}

/* ─── FOOTER ──────────────────────────────────────────── */
function Footer() {
  return (
    <footer style={{ borderTop: `1px solid ${C.border}`, padding: '28px 48px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: C.white }}>
      <p style={{ fontFamily: 'Courier New, monospace', fontSize: '11px', letterSpacing: '0.12em', color: C.muted, textTransform: 'uppercase' }}>SHIP WITH CERTAINTY. · AURVIQ</p>
      <div style={{ display: 'flex', gap: '20px' }}>
        {['aurviq.com', 'aurviq.io'].map(d => (
          <span key={d} style={{ fontFamily: 'Courier New, monospace', fontSize: '11px', color: C.muted }}>{d}</span>
        ))}
      </div>
    </footer>
  );
}

/* ─── APP ─────────────────────────────────────────────── */
export default function App() {
  return (
    <div style={{ minHeight: '100vh', background: C.frost }}>
      <Nav />
      <Hero />
      <StatsBar />
      <Services />
      <PipelineDiagram />
      <CostCurve />
      <Proof />
      <ADAPanel />
      <VoiceBlock />
      <CTA />
      <Footer />
    </div>
  );
}
