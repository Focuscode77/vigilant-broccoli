import React, { useEffect, useRef, useState } from 'react';
import './App.css';

const C = {
  void: '#0A0A0F',
  blue: '#0D3D6E',
  brandBlue: '#185FA5',   // hex logo blue — used for CTAs and accents
  frost: '#F5F5F7',
  carbon: '#2C2C2A',
  green: '#126B50',
  greenText: '#1D9E75',
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

/* ─── Hook: responsive breakpoints ───────────────────── */
function useBreakpoint() {
  const [w, setW] = useState(() => window.innerWidth);
  useEffect(() => {
    const h = () => setW(window.innerWidth);
    window.addEventListener('resize', h, { passive: true });
    return () => window.removeEventListener('resize', h);
  }, []);
  return { isMobile: w < 768, isTablet: w < 1024 };
}

/* ─── NAV ─────────────────────────────────────────────── */
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const { isMobile } = useBreakpoint();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav style={{
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      padding: isMobile ? '0 20px' : '0 48px',
      height: '60px',
      position: 'sticky', top: 0, zIndex: 100,
      background: scrolled ? 'rgba(10,10,15,0.82)' : C.void,
      backdropFilter: scrolled ? 'blur(16px) saturate(180%)' : 'none',
      WebkitBackdropFilter: scrolled ? 'blur(16px) saturate(180%)' : 'none',
      borderBottom: `1px solid ${scrolled ? 'rgba(245,245,247,0.08)' : 'transparent'}`,
      transition: 'background 0.3s ease, border-color 0.3s ease',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '9px' }}>
        <svg width="26" height="23" viewBox="118 38 164 144" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M 278.0,110.0 L 239.0,177.5 L 161.0,177.5 L 122.0,110.0 L 161.0,42.5 L 239.0,42.5 Z" fill="#185FA5"/>
          <path d="M 269.0,110.0 L 234.5,170.0 L 165.5,170.0 L 131.0,110.0 L 165.5,50.0 L 234.5,50.0 Z" fill="none" stroke="#F5F5F7" strokeWidth="1.2" opacity="0.25"/>
          <text x="200" y="152" textAnchor="middle" fontFamily="'Helvetica Neue', Helvetica, Arial, sans-serif" fontWeight="800" fontSize="84" fill="#F5F5F7">A</text>
        </svg>
        <span className="nav-wordmark" style={{ fontWeight: 700, fontSize: '15px', letterSpacing: '0.1em', color: C.frost }}>AURVIQ</span>
      </div>
      <div style={{ display: 'flex', gap: isMobile ? '16px' : '32px', alignItems: 'center' }}>
        {!isMobile && (
          <>
            <a href="#services" className="nav-link">Services</a>
            <a href="#proof" className="nav-link">Proof</a>
          </>
        )}
        <a href="#contact" className="btn-primary" style={{
          background: C.green, color: C.white,
          padding: isMobile ? '7px 14px' : '8px 20px',
          fontSize: '13px', fontWeight: 600, letterSpacing: '0.04em', textDecoration: 'none',
        }}>Get started</a>
      </div>
    </nav>
  );
}

/* ─── HERO ────────────────────────────────────────────── */
function Hero() {
  const { isMobile } = useBreakpoint();
  return (
    <section className="hero-section" style={{ minHeight: isMobile ? '480px' : '560px' }}>
      <div className="hero-orb hero-orb-1" />
      <div className="hero-orb hero-orb-2" />
      <div className="hero-orb hero-orb-3" />
      <div className="hero-orb hero-orb-5" />
      <div className="hero-grid" />
      <div className="hero-chip-edge" />
      <div className="hero-shimmer" />

      <div className="hero-content" style={{ padding: isMobile ? '72px 24px 64px' : '112px 48px 96px', maxWidth: '960px', margin: '0 auto' }}>
        <p style={{ fontFamily: 'Courier New, monospace', fontSize: '11px', letterSpacing: isMobile ? '0.08em' : '0.16em', color: C.greenText, marginBottom: '24px', textTransform: 'uppercase', opacity: 0.85 }}>
          {isMobile ? 'QA · ADA · PERFORMANCE' : 'QUALITY ASSURANCE · ADA COMPLIANT · PERFORMANCE TESTED'}
        </p>
        <h1 style={{
          fontWeight: 800,
          fontSize: isMobile ? 'clamp(28px, 7vw, 36px)' : 'clamp(42px, 6vw, 72px)',
          lineHeight: isMobile ? 1.15 : 1.06,
          color: C.frost,
          marginBottom: '24px',
          letterSpacing: '-0.025em',
          overflowWrap: 'break-word',
        }}>
          {isMobile
            ? 'Products built to work. For everyone. Every time.'
            : <>Products built to work.<br />For everyone.<br />Every time.</>}
        </h1>
        <p style={{ fontSize: isMobile ? '15px' : '17px', color: C.frost, opacity: 0.6, maxWidth: isMobile ? '100%' : '520px', marginBottom: '40px', lineHeight: 1.75 }}>
          Aurviq is the QA agency embedded in your team. We catch what others miss — before a single user encounters it.
        </p>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', maxWidth: '100%' }}>
          <a href="#contact" className="btn-primary" style={{
            background: C.brandBlue, color: C.white,
            padding: isMobile ? '12px 22px' : '13px 30px',
            fontWeight: 700, fontSize: '14px', letterSpacing: '0.05em',
            textDecoration: 'none', display: 'inline-block',
          }}>
            SHIP WITH CERTAINTY.
          </a>
          <a href="#services" style={{
            border: `1px solid rgba(245,245,247,0.22)`, color: C.frost,
            padding: isMobile ? '12px 22px' : '13px 30px',
            fontSize: '14px', textDecoration: 'none', display: 'inline-block',
            opacity: 0.75, transition: 'opacity 0.18s',
          }}>
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
  const { isMobile } = useBreakpoint();
  const stats = [
    { number: '100×', label: 'Bug cost: production vs. planning' },
    { number: '~$0',  label: 'Bug cost caught in planning' },
    { number: '9',    label: 'Bugs caught before go-live' },
    { number: '14',   label: 'ADA violations fixed pre-launch' },
  ];
  return (
    <div ref={ref} style={{
      borderTop: `1px solid ${C.border}`,
      borderBottom: `1px solid ${C.border}`,
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(4, 1fr)',
      background: C.white,
    }}>
      {stats.map((s, i) => (
        <div key={i} className={`fade-up${visible ? ' visible' : ''}`}
          style={{
            padding: isMobile ? '28px 16px' : '40px 24px',
            borderRight: isMobile
              ? (i % 2 === 0 ? `1px solid ${C.border}` : 'none')
              : (i < 3 ? `1px solid ${C.border}` : 'none'),
            borderBottom: isMobile && i < 2 ? `1px solid ${C.border}` : 'none',
            textAlign: 'center',
            animationDelay: `${i * 0.1}s`,
          }}>
          <div style={{ fontWeight: 800, fontSize: isMobile ? '28px' : '38px', color: C.greenText, marginBottom: '8px', letterSpacing: '-0.02em' }}>{s.number}</div>
          <div style={{ fontFamily: 'Courier New, monospace', fontSize: '10px', letterSpacing: '0.12em', color: C.muted, textTransform: 'uppercase', lineHeight: 1.4 }}>{s.label}</div>
        </div>
      ))}
    </div>
  );
}

/* ─── SERVICES ────────────────────────────────────────── */
function Services() {
  const [ref, visible] = useInView();
  const { isMobile } = useBreakpoint();
  const pkgs = [
    { stage: 'STAGE 01 — PLANNING',   name: 'Foundation', tagline: 'Build the right thing before you build anything.',      body: "Every mistake made before a line of code is written becomes exponentially more expensive to fix later. Foundation eliminates that risk before it's possible." },
    { stage: 'STAGE 02 — REGRESSION', name: 'Shield',     tagline: 'Every new feature protected. Nothing breaks what works.', body: 'Your checkout broke on iOS. We found it first. Shield wraps every release with regression coverage so nothing that works today breaks tomorrow.' },
    { stage: 'STAGE 03 — AUTOMATION', name: 'Autopilot',  tagline: 'Quality at scale without scaling your team.',             body: 'Automated test suites, performance benchmarks, and ADA checks — running on every build. Speed and quality are no longer a trade-off.' },
  ];
  return (
    <section id="services" style={{ padding: isMobile ? '64px 20px' : '96px 48px', background: C.frost }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <p style={{ fontFamily: 'Courier New, monospace', fontSize: '11px', letterSpacing: '0.15em', color: C.blue, textTransform: 'uppercase', marginBottom: '12px' }}>Services</p>
        <h2 style={{ fontWeight: 700, fontSize: 'clamp(28px, 4vw, 44px)', color: C.void, marginBottom: '48px', letterSpacing: '-0.025em' }}>Three stages. One standard.</h2>
        <div ref={ref} style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
          gap: '1px',
          background: C.border,
          border: `1px solid ${C.border}`,
        }}>
          {pkgs.map((pkg, i) => (
            <div key={i} className={`fade-up service-card${visible ? ' visible' : ''}`}
              style={{ background: C.white, padding: isMobile ? '32px 24px' : '44px 36px', display: 'flex', flexDirection: 'column', gap: '14px', animationDelay: `${i * 0.12}s` }}>
              <p style={{ fontFamily: 'Courier New, monospace', fontSize: '10px', letterSpacing: '0.14em', color: C.blue, textTransform: 'uppercase' }}>{pkg.stage}</p>
              <h3 style={{ fontWeight: 700, fontSize: '28px', color: C.void, lineHeight: 1.1 }}>{pkg.name}</h3>
              <div style={{ width: '36px', height: '2px', background: C.green }} />
              <p style={{ fontWeight: 600, color: C.void, fontSize: '14px', lineHeight: 1.55 }}>{pkg.tagline}</p>
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
  const { isMobile } = useBreakpoint();

  const stages = [
    { id: '01', name: 'Foundation', sub: 'PLANNING',   items: ['Requirements review', 'Test strategy', 'Risk mapping', 'Acceptance criteria'] },
    { id: '02', name: 'Shield',     sub: 'REGRESSION', items: ['Feature testing', 'Regression suite', 'Cross-browser checks', 'iOS / Android'] },
    { id: '03', name: 'Autopilot',  sub: 'AUTOMATION', items: ['CI/CD integration', 'Performance tests', 'ADA scans', 'Scheduled runs'] },
  ];

  const StageCard = ({ s, i, delay }) => (
    <div className={`fade-up${visible ? ' visible' : ''}`}
      style={{ border: `1px solid rgba(245,245,247,0.12)`, padding: isMobile ? '24px 20px' : '32px 28px', background: 'rgba(245,245,247,0.03)', animationDelay: delay }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: isMobile ? '16px' : '20px' }}>
        <div style={{ width: '32px', height: '32px', background: C.brandBlue, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <span style={{ fontFamily: 'Courier New, monospace', fontSize: '11px', color: C.frost, fontWeight: 700 }}>{s.id}</span>
        </div>
        <div>
          <p style={{ fontFamily: 'Courier New, monospace', fontSize: '9px', letterSpacing: '0.14em', color: C.greenText, textTransform: 'uppercase', marginBottom: '2px' }}>{s.sub}</p>
          <p style={{ fontWeight: 700, fontSize: '18px', color: C.frost, lineHeight: 1 }}>{s.name}</p>
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr 1fr' : '1fr', gap: isMobile ? '8px' : '8px' }}>
        {s.items.map((item, j) => (
          <div key={j} className={`fade-in${visible ? ' visible' : ''}`}
            style={{ display: 'flex', alignItems: 'center', gap: '10px', animationDelay: `${parseFloat(delay) + j * 0.07 + 0.3}s` }}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ flexShrink: 0 }}>
              <rect width="12" height="12" fill={C.greenText} opacity="0.15" />
              <path d="M2.5 6l2.5 2.5 4.5-5" stroke={C.greenText} strokeWidth="1.5" strokeLinecap="square" />
            </svg>
            <span style={{ fontFamily: 'Courier New, monospace', fontSize: isMobile ? '10px' : '11px', color: C.frost, opacity: 0.65 }}>{item}</span>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="hero-section" style={{ padding: isMobile ? '48px 20px' : '64px 48px' }}>
      <div className="hero-orb hero-orb-1" />
      <div className="hero-orb hero-orb-2" />
      <div className="hero-orb hero-orb-3" />
      <div className="hero-grid" />
      <div className="hero-shimmer" />
      <div style={{ position: 'relative', zIndex: 2, maxWidth: '1100px', margin: '0 auto' }}>
        <p style={{ fontFamily: 'Courier New, monospace', fontSize: '11px', letterSpacing: '0.15em', color: C.greenText, textTransform: 'uppercase', marginBottom: '40px', textAlign: 'center' }}>
          THE TESTING PIPELINE
        </p>

        {isMobile ? (
          <div ref={ref} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {stages.map((s, i) => (
              <StageCard key={s.id} s={s} i={i} delay={`${i * 0.18}s`} />
            ))}
          </div>
        ) : (
          <div ref={ref} style={{ display: 'grid', gridTemplateColumns: '1fr 40px 1fr 40px 1fr', alignItems: 'start' }}>
            {stages.map((s, i) => (
              <React.Fragment key={s.id}>
                <StageCard s={s} i={i} delay={`${i * 0.18}s`} />
                {i < 2 && (
                  <div ref={i === 0 ? arrowRef : null}
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: '40px' }}>
                    <svg width="40" height="16" viewBox="0 0 40 16" fill="none" overflow="visible">
                      <line className={`arrow-path${arrowVisible ? ' visible' : ''}`}
                        x1="0" y1="8" x2="32" y2="8"
                        stroke={C.brandBlue} strokeWidth="1.5"
                        style={{ animationDelay: `${0.35 + i * 0.18}s` }} />
                      <path className={`fade-in${arrowVisible ? ' visible' : ''}`}
                        d="M28 3l8 5-8 5" stroke={C.brandBlue} strokeWidth="1.5" strokeLinecap="square" fill="none"
                        style={{ animationDelay: `${0.6 + i * 0.18}s` }} />
                    </svg>
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        )}

        <div className={`fade-in pipeline-status${visible ? ' visible' : ''}`}
          style={{ marginTop: '28px', background: 'rgba(245,245,247,0.04)', border: `1px solid rgba(245,245,247,0.08)`, padding: '16px 24px', display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap', animationDelay: '0.8s' }}>
          <span className="terminal-cursor" style={{ fontFamily: 'Courier New, monospace', fontSize: '10px', color: C.greenText, letterSpacing: '0.1em', flexShrink: 0 }}>▶ PIPELINE STATUS</span>
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
  const { isMobile } = useBreakpoint();

  const states = {
    without: [
      { label: 'Planning',   pct: 2,   color: C.greenText, cost: '~$0'  },
      { label: 'Staging',    pct: 15,  color: '#B8860B',   cost: '~15×' },
      { label: 'Production', pct: 100, color: C.red,       cost: '100×' },
    ],
    with: [
      { label: 'Planning',   pct: 2, color: C.greenText, cost: '~$0' },
      { label: 'Staging',    pct: 2, color: C.greenText, cost: '~$0' },
      { label: 'Production', pct: 2, color: C.greenText, cost: '~$0' },
    ],
  };

  const bars = withAurviq ? states.with : states.without;

  return (
    <section style={{ background: C.void, padding: isMobile ? '56px 20px' : '80px 48px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? '44px' : '80px', alignItems: 'center' }}>

        <div className={`fade-up${visible ? ' visible' : ''}`} ref={ref}>
          <p style={{ fontFamily: 'Courier New, monospace', fontSize: '11px', letterSpacing: '0.15em', color: C.greenText, textTransform: 'uppercase', marginBottom: '20px' }}>THE COST CURVE</p>
          <h2 style={{ fontWeight: 700, fontSize: 'clamp(22px, 3vw, 34px)', color: C.frost, marginBottom: '20px', lineHeight: 1.25, letterSpacing: '-0.02em' }}>
            A bug in planning costs <span style={{ color: C.greenText }}>~$0.</span><br />
            That same bug in production costs you <span style={{ color: C.red }}>your launch.</span>
          </h2>
          <p style={{ color: C.frost, opacity: 0.5, fontSize: '14px', lineHeight: 1.75 }}>
            NIST research puts the fix cost ratio at up to 100× between planning and production. Aurviq's Foundation package exists to eliminate that risk before it's even possible.
          </p>
          <div style={{ marginTop: '32px', padding: '16px 20px', background: 'rgba(245,245,247,0.04)', borderLeft: `3px solid ${C.greenText}`, fontFamily: 'Courier New, monospace', fontSize: '11px', color: C.greenText, letterSpacing: '0.08em', lineHeight: 1.6 }}>
            SOURCE: NIST — "The Economic Impacts of Inadequate Infrastructure for Software Testing"
          </div>
        </div>

        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
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
    <div ref={ref} style={{ marginTop: '40px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '10px' }}>
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
  const { isMobile } = useBreakpoint();
  const rows = [
    { before: 'Zero SEO — invisible to every search engine',            after: 'Full SEO audit and implementation' },
    { before: 'ADA non-compliant — excluding users with disabilities',  after: 'ADA compliance overhaul completed' },
    { before: 'Slow load times — unoptimized media killing performance', after: 'Image and video optimization complete' },
    { before: 'Not mobile responsive — broken on most devices',         after: 'Full mobile responsiveness rebuild' },
    { before: 'Result: Zero discoverability',                           after: 'Result: Measurable increase in website traffic', bold: true },
  ];

  return (
    <section id="proof" style={{ padding: isMobile ? '64px 20px' : '96px 48px', background: C.frost }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <p style={{ fontFamily: 'Courier New, monospace', fontSize: '11px', letterSpacing: '0.15em', color: C.blue, textTransform: 'uppercase', marginBottom: '12px' }}>Case Study</p>
        <h2 style={{ fontWeight: 700, fontSize: 'clamp(28px, 4vw, 44px)', color: C.void, marginBottom: '10px', letterSpacing: '-0.025em' }}>From invisible to findable.</h2>
        <p style={{ color: C.muted, fontSize: '15px', marginBottom: '44px', maxWidth: '520px', lineHeight: 1.7 }}>
          A medical logistics company came to Aurviq with a product they believed in. Nobody could find it, access it, or load it fast enough to stay.
        </p>

        <div ref={ref} style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? '24px' : '40px', alignItems: 'start' }}>
          <div className={`fade-up${visible ? ' visible' : ''}`} style={{ animationDelay: '0s' }}>
            <div style={{ border: `1px solid ${C.border}`, background: C.white }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
                <div style={{ padding: '14px 20px', background: C.frost, fontFamily: 'Courier New, monospace', fontSize: '10px', letterSpacing: '0.12em', color: C.muted, textTransform: 'uppercase', borderBottom: `1px solid ${C.border}`, borderRight: `1px solid ${C.border}` }}>Before Aurviq</div>
                <div style={{ padding: '14px 20px', background: C.green, fontFamily: 'Courier New, monospace', fontSize: '10px', letterSpacing: '0.12em', color: C.white, fontWeight: 700, textTransform: 'uppercase', borderBottom: `1px solid ${C.border}` }}>After Aurviq</div>
              </div>
              {rows.map((r, i) => (
                <div key={i} className={`fade-in${visible ? ' visible' : ''}`}
                  style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderBottom: i < rows.length - 1 ? `1px solid ${C.border}` : 'none', animationDelay: `${0.1 + i * 0.08}s` }}>
                  <div style={{ padding: isMobile ? '12px 14px' : '16px 20px', fontSize: '12px', color: C.muted, borderRight: `1px solid ${C.border}` }}>{r.before}</div>
                  <div style={{ padding: isMobile ? '12px 14px' : '16px 20px', fontSize: '12px', color: C.void, fontWeight: r.bold ? 700 : 400 }}>{r.after}</div>
                </div>
              ))}
            </div>
            <div className={`fade-up${visible ? ' visible' : ''}`}
              style={{ marginTop: '20px', padding: '24px', borderLeft: `4px solid ${C.green}`, background: C.white, border: `1px solid ${C.border}`, borderLeftWidth: '4px', borderLeftColor: C.green, animationDelay: '0.6s' }}>
              <p style={{ fontFamily: 'Courier New, monospace', fontSize: '10px', letterSpacing: '0.12em', color: C.green, textTransform: 'uppercase', marginBottom: '10px' }}>Client Quote</p>
              <p style={{ fontSize: '16px', color: C.void, fontStyle: 'italic', lineHeight: 1.6 }}>"We're receiving more traffic to our website."</p>
              <p style={{ marginTop: '8px', fontSize: '12px', color: C.muted }}>— Client, Medical Logistics</p>
            </div>
          </div>

          <div className={`fade-up${visible ? ' visible' : ''}`}
            style={{ background: C.white, border: `1px solid ${C.border}`, padding: isMobile ? '24px 20px' : '32px 28px', animationDelay: '0.15s' }}>
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
  const { isMobile } = useBreakpoint();

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
    { level: 'WCAG A',   status: 'PASS',    note: 'All 30 criteria met',   pass: true },
    { level: 'WCAG AA',  status: 'PASS',    note: 'All 20 criteria met',   pass: true },
    { level: 'WCAG AAA', status: 'PARTIAL', note: '14 of 28 criteria met', pass: false },
  ];

  const contrastRows = [
    { bg: C.void,  text: C.frost, ratio: '16.1:1', label: 'Void / Frost',         grade: 'AAA' },
    { bg: C.blue,  text: C.white, ratio: '7.2:1',  label: 'Stellar Blue / White', grade: 'AA' },
    { bg: C.green, text: C.white, ratio: '5.8:1',  label: 'Signal Green / White', grade: 'AA' },
    { bg: C.frost, text: C.void,  ratio: '16.1:1', label: 'Frost / Void',          grade: 'AAA' },
  ];

  return (
    <section style={{ background: C.white, padding: isMobile ? '64px 20px' : '96px 48px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <p style={{ fontFamily: 'Courier New, monospace', fontSize: '11px', letterSpacing: '0.15em', color: C.blue, textTransform: 'uppercase', marginBottom: '12px' }}>Accessibility</p>
        <h2 style={{ fontWeight: 700, fontSize: 'clamp(28px, 4vw, 44px)', color: C.void, marginBottom: '10px', letterSpacing: '-0.025em' }}>Built for every user.</h2>
        <p style={{ color: C.muted, fontSize: '15px', marginBottom: '48px', maxWidth: '560px', lineHeight: 1.7 }}>
          ADA compliance isn't a checkbox — it's the baseline. Every product Aurviq ships is tested against WCAG standards before a single user touches it.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? '24px' : '40px', alignItems: 'start' }}>

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
  const { isMobile } = useBreakpoint();
  const pairs = [
    { never: '"We leverage best-in-class solutions..."',   always: '"We caught 9 bugs before your launch."' },
    { never: '"Our holistic approach ensures quality..."', always: '"Your checkout broke on iOS. We found it first."' },
    { never: '"We are passionate about accessibility..."', always: '"14 ADA violations. Fixed before any user saw them."' },
  ];

  return (
    <section style={{ background: C.frost, padding: isMobile ? '56px 20px' : '80px 48px' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <p style={{ fontFamily: 'Courier New, monospace', fontSize: '11px', letterSpacing: '0.15em', color: C.blue, textTransform: 'uppercase', marginBottom: '12px', textAlign: 'center' }}>Proof, not promises.</p>
        <h2 style={{ fontWeight: 700, fontSize: 'clamp(24px, 3.5vw, 38px)', color: C.void, marginBottom: '40px', textAlign: 'center', letterSpacing: '-0.025em' }}>We show our work.</h2>
        <div ref={ref} style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          {!isMobile && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2px' }}>
              <div style={{ padding: '12px 24px', background: C.border, fontFamily: 'Courier New, monospace', fontSize: '10px', letterSpacing: '0.12em', color: C.muted, textTransform: 'uppercase' }}>Never say</div>
              <div style={{ padding: '12px 24px', background: C.green, fontFamily: 'Courier New, monospace', fontSize: '10px', letterSpacing: '0.12em', color: C.white, fontWeight: 700, textTransform: 'uppercase' }}>Always say</div>
            </div>
          )}
          {pairs.map((p, i) => (
            isMobile ? (
              <div key={i} className={`fade-in${visible ? ' visible' : ''}`}
                style={{ display: 'flex', flexDirection: 'column', gap: '2px', marginBottom: '10px', animationDelay: `${i * 0.12}s` }}>
                <div style={{ padding: '16px 20px', background: C.white, fontSize: '13px', color: C.muted, fontStyle: 'italic', display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                  <span style={{ fontFamily: 'Courier New, monospace', fontSize: '10px', color: C.muted, opacity: 0.5, flexShrink: 0, marginTop: '1px' }}>✗</span>
                  {p.never}
                </div>
                <div style={{ padding: '16px 20px', background: 'rgba(18,107,80,0.07)', fontSize: '13px', color: C.void, fontWeight: 600, borderLeft: `3px solid ${C.green}`, display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                  <span style={{ fontFamily: 'Courier New, monospace', fontSize: '10px', color: C.greenText, flexShrink: 0, marginTop: '1px' }}>✓</span>
                  {p.always}
                </div>
              </div>
            ) : (
              <div key={i} className={`fade-in${visible ? ' visible' : ''}`}
                style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2px', animationDelay: `${i * 0.12}s` }}>
                <div style={{ padding: '20px 24px', background: C.white, fontSize: '14px', color: C.muted, fontStyle: 'italic' }}>{p.never}</div>
                <div style={{ padding: '20px 24px', background: 'rgba(18,107,80,0.07)', fontSize: '14px', color: C.void, fontWeight: 600, borderLeft: `2px solid ${C.green}` }}>{p.always}</div>
              </div>
            )
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── CTA ─────────────────────────────────────────────── */
function CTA() {
  const { isMobile } = useBreakpoint();
  return (
    <section id="contact" className="hero-section" style={{ padding: isMobile ? '80px 24px' : '120px 48px', textAlign: 'center' }}>
      <div className="hero-orb hero-orb-1" />
      <div className="hero-orb hero-orb-2" />
      <div className="hero-orb hero-orb-3" />
      <div className="hero-grid" />
      <div className="hero-shimmer" />
      <div style={{ position: 'relative', zIndex: 2, maxWidth: '680px', margin: '0 auto' }}>
        <p style={{ fontFamily: 'Courier New, monospace', fontSize: '11px', letterSpacing: '0.15em', color: C.frost, opacity: 0.65, textTransform: 'uppercase', marginBottom: '20px' }}>Ready to ship?</p>
        <h2 style={{ fontWeight: 800, fontSize: isMobile ? 'clamp(32px, 9vw, 48px)' : 'clamp(36px, 5.5vw, 64px)', color: C.white, marginBottom: '20px', lineHeight: 1.06, letterSpacing: '-0.03em' }}>Ship with certainty.</h2>
        <p style={{ fontSize: isMobile ? '15px' : '16px', color: C.white, opacity: 0.7, marginBottom: '40px', lineHeight: 1.75 }}>Free 30-minute pre-launch audit. No pitch. Just proof.</p>
        <a href="mailto:hello@aurviq.com" className="btn-primary" style={{
          background: C.white, color: C.blue,
          padding: isMobile ? '13px 28px' : '15px 38px',
          fontWeight: 700, fontSize: '15px', letterSpacing: '0.04em',
          display: 'inline-block', textDecoration: 'none',
        }}>
          BOOK A FREE AUDIT
        </a>
      </div>
    </section>
  );
}

/* ─── FOOTER ──────────────────────────────────────────── */
function Footer() {
  const { isMobile } = useBreakpoint();
  return (
    <footer style={{
      borderTop: `1px solid ${C.border}`,
      padding: isMobile ? '24px 20px' : '28px 48px',
      display: 'flex',
      flexDirection: isMobile ? 'column' : 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: isMobile ? '10px' : '0',
      background: C.white,
      textAlign: isMobile ? 'center' : 'left',
    }}>
      <p style={{ fontFamily: 'Courier New, monospace', fontSize: '11px', letterSpacing: '0.12em', color: C.void, textTransform: 'uppercase' }}>SHIP WITH CERTAINTY. · AURVIQ</p>
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
