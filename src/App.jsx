import React, { useEffect, useRef, useState } from 'react';
import './App.css';

const C = {
  void:       '#000000',
  surface:    '#000000',
  surfaceAlt: '#111111',
  blue:       '#185FA5',   // logo blue
  brandBlue:  '#185FA5',
  frost:      '#F5F5F7',
  green:      '#1D9E75',   // logo green
  greenText:  '#1D9E75',
  white:      '#FFFFFF',
  border:     'rgba(255,255,255,0.08)',
  muted:      'rgba(245,245,247,0.42)',
  red:        '#FF5555',
};

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

function useBreakpoint() {
  const [w, setW] = useState(() => window.innerWidth);
  useEffect(() => {
    const h = () => setW(window.innerWidth);
    window.addEventListener('resize', h, { passive: true });
    return () => window.removeEventListener('resize', h);
  }, []);
  return { isMobile: w < 768, isTablet: w < 1024 };
}

/* ─── Glow helpers ────────────────────────────────────── */
function glowStyle(ratio, color) {
  const r = Math.max(0, Math.min(1, ratio));
  const s1 = Math.round(20 + r * 60);
  const s2 = Math.round(40 + r * 120);
  if (color === 'blue') return {
    boxShadow:   `0 0 ${s1}px rgba(24,95,165,${(0.08 + r * 0.52).toFixed(2)}), 0 0 ${s2}px rgba(24,95,165,${(r * 0.25).toFixed(2)})`,
    borderColor: `rgba(24,95,165,${(0.15 + r * 0.45).toFixed(2)})`,
  };
  return {
    boxShadow:   `0 0 ${s1}px rgba(29,158,117,${(0.08 + r * 0.42).toFixed(2)}), 0 0 ${s2}px rgba(29,158,117,${(r * 0.2).toFixed(2)})`,
    borderColor: `rgba(29,158,117,${(0.15 + r * 0.45).toFixed(2)})`,
  };
}

/* ─── Shared interactive check circle ─────────────────── */
function CheckCircle({ checked, onToggle, size = 22 }) {
  return (
    <div
      className="check-circle"
      role="checkbox" aria-checked={checked} tabIndex={0}
      onClick={onToggle}
      onKeyDown={e => (e.key === ' ' || e.key === 'Enter') && onToggle()}
      style={{
        width: size, height: size, borderRadius: '50%',
        background: checked ? C.green : 'transparent',
        border: `2px solid ${checked ? C.green : 'rgba(245,245,247,0.22)'}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0,
        transition: 'background 0.2s, border-color 0.2s',
      }}>
      {checked && (
        <svg width={size * 0.48} height={size * 0.48} viewBox="0 0 11 11" fill="none">
          <path d="M2 5.5l2.5 2.5 4.5-4.5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </div>
  );
}

/* ─── NAV ─────────────────────────────────────────────── */
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const { isMobile } = useBreakpoint();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { label: 'Services',      href: '#services'     },
    { label: 'Pipeline',      href: '#pipeline'     },
    { label: 'Case Study',    href: '#proof'        },
    { label: 'Accessibility', href: '#accessibility'},
  ];

  return (
    <nav style={{
      position: 'sticky', top: 0, zIndex: 100,
      background: 'rgba(0,0,0,0.92)',
      backdropFilter: 'blur(20px) saturate(180%)',
      WebkitBackdropFilter: 'blur(20px) saturate(180%)',
      borderBottom: `1px solid rgba(255,255,255,${scrolled ? 0.10 : 0.06})`,
      transition: 'border-color 0.3s ease',
    }}>
      <div style={{
        maxWidth: '1280px', margin: '0 auto',
        padding: isMobile ? '0 20px' : '0 40px',
        height: '64px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>

        {/* Logo + separator + nav links */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <a href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', marginRight: isMobile ? 0 : '24px' }}>
            <svg width="32" height="28" viewBox="118 38 164 144" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M 278.0,110.0 L 239.0,177.5 L 161.0,177.5 L 122.0,110.0 L 161.0,42.5 L 239.0,42.5 Z" fill="#185FA5"/>
              <path d="M 269.0,110.0 L 234.5,170.0 L 165.5,170.0 L 131.0,110.0 L 165.5,50.0 L 234.5,50.0 Z" fill="none" stroke="#F5F5F7" strokeWidth="1.2" opacity="0.25"/>
              <text x="200" y="152" textAnchor="middle" fontFamily="'Helvetica Neue', Helvetica, Arial, sans-serif" fontWeight="800" fontSize="84" fill="#F5F5F7">A</text>
            </svg>
            <span style={{ fontWeight: 600, fontSize: '18px', letterSpacing: '-0.01em', color: C.frost }}>Aurviq</span>
          </a>

          {!isMobile && <>
            <div style={{ width: '1px', height: '18px', background: 'rgba(255,255,255,0.12)', marginRight: '20px' }} />
            <div style={{ display: 'flex', gap: '2px' }}>
              {links.map(l => (
                <a key={l.label} href={l.href} className="nav-pill">{l.label}</a>
              ))}
            </div>
          </>}
        </div>

        {/* Right actions */}
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          {!isMobile && (
            <a href="#contact" className="nav-outline-btn">Sign in</a>
          )}
          <a href="#contact" className="nav-cta-btn">
            Get started
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
              <path d="M2.5 6.5h8M7 2.5l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>

      </div>
    </nav>
  );
}

/* ─── HERO ────────────────────────────────────────────── */
function Hero() {
  const { isMobile } = useBreakpoint();

  const runs = [
    { name: 'Regression suite — iOS / Android',   sub: 'Build #4821 · push · main', time: '2m 14s' },
    { name: 'ADA compliance scan',                sub: 'Build #4821 · push · main', time: '47s'    },
    { name: 'Cross-browser matrix · 12 browsers', sub: 'Build #4821 · push · main', time: '4m 02s' },
    { name: 'Performance benchmarks',             sub: 'Build #4821 · push · main', time: '1m 33s' },
    { name: 'Checkout flow — edge cases',         sub: 'Build #4821 · push · main', time: '3m 18s' },
  ];

  const [checked, setChecked] = useState(() => Array(runs.length).fill(true));
  const ratio = checked.filter(Boolean).length / runs.length;
  const glow  = glowStyle(ratio, 'blue');

  return (
    <section className="hero-section">
      <div className="hero-content" style={{
        padding: isMobile ? '72px 24px 64px' : '96px 48px 96px',
        maxWidth: '1200px', margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
        gap: isMobile ? '48px' : '64px',
        alignItems: 'center',
      }}>

        {/* Left — text + CTAs */}
        <div>
          <p style={{ fontFamily: 'Courier New, monospace', fontSize: '11px', letterSpacing: isMobile ? '0.08em' : '0.16em', color: C.greenText, marginBottom: '24px', textTransform: 'uppercase', opacity: 0.85 }}>
            {isMobile ? 'QA · ADA · PERFORMANCE' : 'QUALITY ASSURANCE · ADA COMPLIANT · PERFORMANCE TESTED'}
          </p>
          <h1 style={{
            fontWeight: 800,
            fontSize: isMobile ? 'clamp(28px, 7vw, 36px)' : 'clamp(36px, 4.5vw, 58px)',
            lineHeight: isMobile ? 1.15 : 1.08,
            color: C.frost,
            marginBottom: '24px',
            letterSpacing: '-0.025em',
            overflowWrap: 'break-word',
          }}>
            {isMobile
              ? 'Products built to work. For everyone. Every time.'
              : <>Products built to work.<br />For everyone.<br />Every time.</>}
          </h1>
          <p style={{ fontSize: isMobile ? '15px' : '17px', color: C.frost, opacity: 0.55, marginBottom: '40px', lineHeight: 1.75 }}>
            Aurviq is an AI powered QA agency.
          </p>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <a href="#contact" className="btn-primary" style={{
              background: C.brandBlue, color: C.white,
              padding: isMobile ? '12px 22px' : '13px 30px',
              fontWeight: 700, fontSize: '14px', letterSpacing: '0.05em',
              textDecoration: 'none', display: 'inline-block',
            }}>
              SHIP WITH CERTAINTY.
            </a>
            <a href="#services" style={{
              border: `1px solid ${C.border}`, color: C.frost,
              padding: isMobile ? '12px 22px' : '13px 30px',
              fontSize: '14px', textDecoration: 'none', display: 'inline-block',
              opacity: 0.65, transition: 'opacity 0.18s',
            }}>
              See how it works
            </a>
          </div>
        </div>

        {/* Right — workflow card (blue glow) */}
        <div style={{
          background: '#0D0D18',
          border: `1px solid ${glow.borderColor}`,
          borderRadius: '12px',
          overflow: 'hidden',
          boxShadow: glow.boxShadow,
          transition: 'box-shadow 0.35s ease, border-color 0.35s ease',
        }}>
          <div style={{
            padding: '14px 20px',
            borderBottom: `1px solid rgba(24,95,165,0.2)`,
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          }}>
            <span style={{ fontSize: '14px', fontWeight: 600, color: C.frost }}>9 tests passed</span>
            <div style={{ display: 'flex', gap: '16px' }}>
              {['Stage', 'Status', 'Browser'].map(f => (
                <span key={f} style={{ fontFamily: 'Courier New, monospace', fontSize: '10px', color: C.muted, letterSpacing: '0.05em' }}>{f} ▾</span>
              ))}
            </div>
          </div>
          {runs.map((run, i) => (
            <div key={i} style={{
              padding: '13px 20px',
              borderBottom: i < runs.length - 1 ? `1px solid rgba(255,255,255,0.05)` : 'none',
              display: 'flex', alignItems: 'center', gap: '12px',
              opacity: checked[i] ? 1 : 0.38,
              transition: 'opacity 0.2s',
            }}>
              <CheckCircle checked={checked[i]} onToggle={() => setChecked(p => p.map((v, j) => j === i ? !v : v))} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontSize: '13px', fontWeight: 600, color: C.frost, marginBottom: '2px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{run.name}</p>
                <p style={{ fontFamily: 'Courier New, monospace', fontSize: '10px', color: C.muted, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{run.sub}</p>
              </div>
              <span style={{ fontFamily: 'Courier New, monospace', fontSize: '11px', color: C.muted, flexShrink: 0 }}>{run.time}</span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

/* ─── STATS BAR ───────────────────────────────────────── */
function StatsBar() {
  const { isMobile } = useBreakpoint();
  const stats = [
    { number: '100×', label: 'Bug cost: production vs. planning', accent: C.brandBlue },
    { number: '~$0',  label: 'Bug cost caught in planning',        accent: C.green },
    { number: '9',    label: 'Bugs caught before go-live',         accent: C.green },
    { number: '14',   label: 'ADA violations fixed pre-launch',    accent: C.brandBlue },
  ];
  return (
    <div style={{
      borderTop: `1px solid ${C.border}`,
      borderBottom: `1px solid ${C.border}`,
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(4, 1fr)',
      background: C.surface,
    }}>
      {stats.map((s, i) => (
        <div key={i} style={{
          padding: isMobile ? '28px 16px' : '40px 24px',
          borderRight: isMobile
            ? (i % 2 === 0 ? `1px solid ${C.border}` : 'none')
            : (i < 3 ? `1px solid ${C.border}` : 'none'),
          borderBottom: isMobile && i < 2 ? `1px solid ${C.border}` : 'none',
          borderTop: `2px solid ${s.accent}`,
          textAlign: 'center',
        }}>
          <div style={{ fontWeight: 800, fontSize: isMobile ? '28px' : '38px', color: s.accent, marginBottom: '8px', letterSpacing: '-0.02em' }}>{s.number}</div>
          <div style={{ fontFamily: 'Courier New, monospace', fontSize: '10px', letterSpacing: '0.12em', color: C.muted, textTransform: 'uppercase', lineHeight: 1.4 }}>{s.label}</div>
        </div>
      ))}
    </div>
  );
}

/* ─── DELIVERABLE CARD (Services) ────────────────────── */
function DeliverableCard({ isMobile }) {
  const items = [
    { title: 'Written test strategy',   sub: 'Before a line of code is written'    },
    { title: 'Regression coverage',     sub: 'On every build, every release'       },
    { title: 'ADA + WCAG 2.1 audit',   sub: 'Full compliance testing'             },
    { title: 'Performance benchmarks',  sub: 'Core Web Vitals + load testing'      },
    { title: 'QA report with findings', sub: 'Detailed, actionable documentation'  },
    { title: 'Async communication',     sub: 'Throughout the engagement'            },
  ];
  const [checked, setChecked] = useState(() => Array(items.length).fill(true));
  const ratio = checked.filter(Boolean).length / items.length;
  const glow  = glowStyle(ratio, 'green');

  return (
    <div style={{
      marginTop: '24px',
      background: '#0D1410',
      border: `1px solid ${glow.borderColor}`,
      borderRadius: '12px',
      overflow: 'hidden',
      boxShadow: glow.boxShadow,
      transition: 'box-shadow 0.35s ease, border-color 0.35s ease',
    }}>
      <div style={{ padding: '16px 28px', borderBottom: `1px solid rgba(29,158,117,0.2)`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: '14px', fontWeight: 700, color: C.frost }}>Every engagement includes</span>
        <span style={{ fontFamily: 'Courier New, monospace', fontSize: '10px', color: C.green, letterSpacing: '0.12em' }}>ALL STAGES</span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)' }}>
        {items.map((item, i) => (
          <div key={i} style={{
            padding: '16px 28px',
            borderBottom: isMobile
              ? (i < items.length - 1 ? `1px solid rgba(29,158,117,0.12)` : 'none')
              : (i < items.length - 2 ? `1px solid rgba(29,158,117,0.12)` : 'none'),
            borderRight: !isMobile && i % 2 === 0 ? `1px solid rgba(29,158,117,0.12)` : 'none',
            display: 'flex', alignItems: 'center', gap: '14px',
            opacity: checked[i] ? 1 : 0.38,
            transition: 'opacity 0.2s',
          }}>
            <CheckCircle checked={checked[i]} onToggle={() => setChecked(p => p.map((v, j) => j === i ? !v : v))} />
            <div>
              <p style={{ fontSize: '13px', fontWeight: 600, color: C.frost, marginBottom: '2px' }}>{item.title}</p>
              <p style={{ fontFamily: 'Courier New, monospace', fontSize: '10px', color: C.muted }}>{item.sub}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── SERVICES ────────────────────────────────────────── */
function Services() {
  const { isMobile } = useBreakpoint();
  const pkgs = [
    { stage: 'STAGE 01 — PLANNING',   name: 'Foundation', tagline: 'Build the right thing before you build anything.',      body: "Every mistake made before a line of code is written becomes exponentially more expensive to fix later. Foundation eliminates that risk before it's possible.", accent: C.brandBlue },
    { stage: 'STAGE 02 — REGRESSION', name: 'Shield',     tagline: 'Every new feature protected. Nothing breaks what works.', body: 'Your checkout broke on iOS. We found it first. Shield wraps every release with regression coverage so nothing that works today breaks tomorrow.', accent: C.green },
    { stage: 'STAGE 03 — AUTOMATION', name: 'Autopilot',  tagline: 'Quality at scale without scaling your team.',             body: 'Automated test suites, performance benchmarks, and ADA checks — running on every build. Speed and quality are no longer a trade-off.', accent: C.brandBlue },
  ];
  return (
    <section id="services" style={{ padding: isMobile ? '64px 20px' : '96px 48px', background: C.void }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <p style={{ fontFamily: 'Courier New, monospace', fontSize: '11px', letterSpacing: '0.15em', color: C.brandBlue, textTransform: 'uppercase', marginBottom: '12px' }}>Services</p>
        <h2 style={{ fontWeight: 700, fontSize: 'clamp(28px, 4vw, 44px)', color: C.frost, marginBottom: '48px', letterSpacing: '-0.025em' }}>Three stages. One standard.</h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
          gap: '1px',
          background: C.border,
          border: `1px solid ${C.border}`,
        }}>
          {pkgs.map((pkg, i) => (
            <div key={i} className="service-card"
              style={{
                background: C.surfaceAlt,
                padding: isMobile ? '32px 24px' : '44px 36px',
                display: 'flex', flexDirection: 'column', gap: '14px',
                borderTop: `2px solid ${pkg.accent}`,
              }}>
              <p style={{ fontFamily: 'Courier New, monospace', fontSize: '10px', letterSpacing: '0.14em', color: pkg.accent, textTransform: 'uppercase' }}>{pkg.stage}</p>
              <h3 style={{ fontWeight: 700, fontSize: '28px', color: C.frost, lineHeight: 1.1 }}>{pkg.name}</h3>
              <div style={{ width: '36px', height: '2px', background: pkg.accent }} />
              <p style={{ fontWeight: 600, color: C.frost, fontSize: '14px', lineHeight: 1.55 }}>{pkg.tagline}</p>
              <p style={{ color: C.muted, fontSize: '13px', lineHeight: 1.75 }}>{pkg.body}</p>
            </div>
          ))}
        </div>

        <DeliverableCard isMobile={isMobile} />

      </div>
    </section>
  );
}

/* ─── BUILD LOG CARD (Pipeline) ──────────────────────── */
function BuildLogCard({ isMobile }) {
  const steps = [
    { text: 'Requirements & test strategy', time: '1m 02s' },
    { text: 'Unit + integration tests',     time: '3m 14s' },
    { text: 'Cross-browser regression',     time: '4m 38s' },
    { text: 'ADA / WCAG 2.1 scan',         time: '47s'    },
    { text: 'Performance benchmarks',       time: '2m 06s' },
  ];
  const [checked, setChecked] = useState(() => Array(steps.length).fill(true));
  const ratio = checked.filter(Boolean).length / steps.length;
  const glow  = glowStyle(ratio, 'blue');

  return (
    <div style={{
      marginTop: '20px',
      background: '#0D0D18',
      border: `1px solid ${glow.borderColor}`,
      borderRadius: '12px',
      overflow: 'hidden',
      boxShadow: glow.boxShadow,
      transition: 'box-shadow 0.35s ease, border-color 0.35s ease',
    }}>
      <div style={{ padding: '12px 20px', borderBottom: `1px solid rgba(24,95,165,0.2)`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontFamily: 'Courier New, monospace', fontSize: '11px', color: C.brandBlue, letterSpacing: '0.1em' }}>▶ BUILD #4821 — main</span>
        <span style={{ fontFamily: 'Courier New, monospace', fontSize: '10px', color: C.muted }}>11m 47s total</span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(5, 1fr)' }}>
        {steps.map((step, i) => (
          <div key={i} style={{
            padding: '14px 20px',
            borderRight: !isMobile && i < steps.length - 1 ? `1px solid rgba(24,95,165,0.12)` : 'none',
            borderBottom: isMobile && i < steps.length - 1 ? `1px solid rgba(24,95,165,0.12)` : 'none',
            display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'flex-start',
            opacity: checked[i] ? 1 : 0.38,
            transition: 'opacity 0.2s',
          }}>
            <CheckCircle checked={checked[i]} onToggle={() => setChecked(p => p.map((v, j) => j === i ? !v : v))} size={20} />
            <p style={{ fontFamily: 'Courier New, monospace', fontSize: '10px', color: C.frost, lineHeight: 1.4 }}>{step.text}</p>
            <p style={{ fontFamily: 'Courier New, monospace', fontSize: '10px', color: C.muted }}>{step.time}</p>
          </div>
        ))}
      </div>
    </div>
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
    <div style={{ border: `1px solid ${C.border}`, padding: isMobile ? '24px 20px' : '32px 28px', background: 'rgba(255,255,255,0.03)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: isMobile ? '16px' : '20px' }}>
        <div style={{ width: '32px', height: '32px', background: C.brandBlue, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <span style={{ fontFamily: 'Courier New, monospace', fontSize: '11px', color: C.frost, fontWeight: 700 }}>{s.id}</span>
        </div>
        <div>
          <p style={{ fontFamily: 'Courier New, monospace', fontSize: '9px', letterSpacing: '0.14em', color: C.greenText, textTransform: 'uppercase', marginBottom: '2px' }}>{s.sub}</p>
          <p style={{ fontWeight: 700, fontSize: '18px', color: C.frost, lineHeight: 1 }}>{s.name}</p>
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr 1fr' : '1fr', gap: '8px' }}>
        {s.items.map((item, j) => (
          <div key={j} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
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
    <div id="pipeline" className="hero-section" style={{ padding: isMobile ? '48px 20px' : '64px 48px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
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
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: '40px' }}>
                    <svg width="40" height="16" viewBox="0 0 40 16" fill="none" overflow="visible">
                      <line x1="0" y1="8" x2="32" y2="8" stroke={C.brandBlue} strokeWidth="1.5" />
                      <path d="M28 3l8 5-8 5" stroke={C.brandBlue} strokeWidth="1.5" strokeLinecap="square" fill="none" />
                    </svg>
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        )}

        <BuildLogCard isMobile={isMobile} />

        <div className="pipeline-status"
          style={{ marginTop: '16px', background: 'rgba(255,255,255,0.03)', border: `1px solid ${C.border}`, padding: '16px 24px', display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap' }}>
          <span className="terminal-cursor" style={{ fontFamily: 'Courier New, monospace', fontSize: '10px', color: C.greenText, letterSpacing: '0.1em', flexShrink: 0 }}>▶ PIPELINE STATUS</span>
          {['PLAN COMPLETE', 'TESTS PASSING', 'ADA: OK', 'PERF: OK', 'READY TO SHIP'].map((label, i) => (
            <span key={i} style={{ fontFamily: 'Courier New, monospace', fontSize: '10px', color: C.frost, opacity: 0.55, letterSpacing: '0.08em' }}>
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
    <section style={{ background: C.surface, padding: isMobile ? '56px 20px' : '80px 48px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? '44px' : '80px', alignItems: 'center' }}>

        <div ref={ref}>
          <p style={{ fontFamily: 'Courier New, monospace', fontSize: '11px', letterSpacing: '0.15em', color: C.greenText, textTransform: 'uppercase', marginBottom: '20px' }}>THE COST CURVE</p>
          <h2 style={{ fontWeight: 700, fontSize: 'clamp(22px, 3vw, 34px)', color: C.frost, marginBottom: '20px', lineHeight: 1.25, letterSpacing: '-0.02em' }}>
            A bug in planning costs <span style={{ color: C.greenText }}>~$0.</span><br />
            That same bug in production costs you <span style={{ color: C.red }}>your launch.</span>
          </h2>
          <p style={{ color: C.muted, fontSize: '14px', lineHeight: 1.75 }}>
            NIST research puts the fix cost ratio at up to 100× between planning and production. Aurviq's Foundation package exists to eliminate that risk before it's even possible.
          </p>
          <div style={{ marginTop: '32px', padding: '16px 20px', background: 'rgba(29,158,117,0.06)', borderLeft: `3px solid ${C.greenText}`, fontFamily: 'Courier New, monospace', fontSize: '11px', color: C.greenText, letterSpacing: '0.08em', lineHeight: 1.6 }}>
            SOURCE: NIST — "The Economic Impacts of Inadequate Infrastructure for Software Testing"
          </div>
        </div>

        <div style={{
          background: '#0D1410',
          border: `1px solid rgba(29,158,117,0.5)`,
          borderRadius: '12px',
          padding: '28px',
          boxShadow: '0 0 70px rgba(29,158,117,0.4), 0 0 140px rgba(29,158,117,0.16)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
            <p style={{ fontFamily: 'Courier New, monospace', fontSize: '10px', letterSpacing: '0.12em', color: C.muted, textTransform: 'uppercase' }}>
              Relative cost to fix a bug — by stage
            </p>
            <div style={{ display: 'flex', gap: '2px' }}>
              <button className="toggle-btn"
                onClick={() => setWithAurviq(false)}
                style={{ color: !withAurviq ? '#000' : C.frost, background: !withAurviq ? C.frost : 'transparent', borderColor: !withAurviq ? C.frost : C.border }}>
                Without
              </button>
              <button className="toggle-btn"
                onClick={() => setWithAurviq(true)}
                style={{ color: withAurviq ? '#000' : C.frost, background: withAurviq ? C.green : 'transparent', borderColor: withAurviq ? C.green : C.border }}>
                With Aurviq
              </button>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {bars.map((b, i) => (
              <div key={i}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <span style={{ fontFamily: 'Courier New, monospace', fontSize: '11px', color: C.muted, letterSpacing: '0.08em', textTransform: 'uppercase' }}>{b.label}</span>
                  <span style={{ fontFamily: 'Courier New, monospace', fontSize: '11px', color: b.color, fontWeight: 700, transition: 'color 0.4s' }}>{b.cost}</span>
                </div>
                <div style={{ height: '28px', background: C.border, position: 'relative', overflow: 'hidden' }}>
                  <div className="bar-interactive"
                    style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: `${b.pct}%`, background: b.color, opacity: 0.85, minWidth: b.pct > 0 ? '4px' : '0' }} />
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ fontFamily: 'Courier New, monospace', fontSize: '9px', color: C.muted, opacity: 0.5, letterSpacing: '0.08em' }}>LOW COST</span>
            <span style={{ fontFamily: 'Courier New, monospace', fontSize: '9px', color: C.muted, opacity: 0.5, letterSpacing: '0.08em' }}>HIGH COST</span>
          </div>

          {withAurviq && (
            <p style={{ fontFamily: 'Courier New, monospace', fontSize: '11px', color: C.greenText, marginTop: '16px', letterSpacing: '0.08em', textAlign: 'right' }}>
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
        <p style={{ fontFamily: 'Courier New, monospace', fontSize: '10px', letterSpacing: '0.12em', color: C.brandBlue, textTransform: 'uppercase' }}>
          Performance Scores
        </p>
        <div style={{ display: 'flex', gap: '2px' }}>
          <button className="toggle-btn"
            onClick={() => setMode('before')}
            style={{ color: !isAfter ? '#000' : C.muted, background: !isAfter ? 'rgba(245,245,247,0.85)' : 'transparent', borderColor: !isAfter ? 'rgba(245,245,247,0.85)' : C.border }}>
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
          const color = isAfter ? C.green : 'rgba(245,245,247,0.35)';

          return (
            <div key={i}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '8px' }}>
                <span style={{ fontSize: '13px', color: C.frost, fontWeight: 600 }}>{m.label}</span>
                <span style={{ fontFamily: 'Courier New, monospace', fontSize: '12px', color: isAfter ? C.green : C.muted, fontWeight: 700, transition: 'color 0.4s' }}>
                  {label}
                </span>
              </div>
              <div style={{ height: '10px', background: C.border, position: 'relative', overflow: 'hidden' }}>
                <div className="bar-interactive"
                  style={{
                    position: 'absolute', left: 0, top: 0, bottom: 0,
                    width: `${val}%`,
                    background: color,
                    minWidth: val > 0 ? '3px' : '0',
                    transition: 'width 0.7s cubic-bezier(0.22,1,0.36,1), background 0.4s',
                  }} />
              </div>
            </div>
          );
        })}
      </div>

      <div style={{ display: 'flex', gap: '20px', marginTop: '16px' }}>
        <button onClick={() => setMode('before')}
          style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', padding: 0 }}>
          <span style={{ width: '10px', height: '10px', background: 'rgba(245,245,247,0.35)', display: 'block' }} />
          <span style={{ fontFamily: 'Courier New, monospace', fontSize: '9px', color: !isAfter ? C.frost : C.muted, letterSpacing: '0.08em', transition: 'color 0.3s' }}>BEFORE AURVIQ</span>
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
    <section id="proof" style={{ padding: isMobile ? '64px 20px' : '96px 48px', background: C.surface }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <p style={{ fontFamily: 'Courier New, monospace', fontSize: '11px', letterSpacing: '0.15em', color: C.brandBlue, textTransform: 'uppercase', marginBottom: '12px' }}>Case Study</p>
        <h2 style={{ fontWeight: 700, fontSize: 'clamp(28px, 4vw, 44px)', color: C.frost, marginBottom: '10px', letterSpacing: '-0.025em' }}>From invisible to findable.</h2>
        <p style={{ color: C.muted, fontSize: '15px', marginBottom: '44px', maxWidth: '520px', lineHeight: 1.7 }}>
          A medical logistics company came to Aurviq with a product they believed in. Nobody could find it, access it, or load it fast enough to stay.
        </p>

        <div ref={ref} style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? '24px' : '40px', alignItems: 'start' }}>
          <div>
            <div style={{
              border: `1px solid rgba(24,95,165,0.45)`,
              borderRadius: '12px',
              overflow: 'hidden',
              background: C.surfaceAlt,
              boxShadow: '0 0 60px rgba(24,95,165,0.35), 0 0 120px rgba(24,95,165,0.14)',
            }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
                <div style={{ padding: '14px 20px', background: 'rgba(255,255,255,0.04)', fontFamily: 'Courier New, monospace', fontSize: '10px', letterSpacing: '0.12em', color: C.muted, textTransform: 'uppercase', borderBottom: `1px solid ${C.border}`, borderRight: `1px solid ${C.border}` }}>Before Aurviq</div>
                <div style={{ padding: '14px 20px', background: C.green, fontFamily: 'Courier New, monospace', fontSize: '10px', letterSpacing: '0.12em', color: C.white, fontWeight: 700, textTransform: 'uppercase', borderBottom: `1px solid ${C.border}` }}>After Aurviq</div>
              </div>
              {rows.map((r, i) => (
                <div key={i}
                  style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderBottom: i < rows.length - 1 ? `1px solid ${C.border}` : 'none' }}>
                  <div style={{ padding: isMobile ? '12px 14px' : '16px 20px', fontSize: '12px', color: C.muted, borderRight: `1px solid ${C.border}` }}>{r.before}</div>
                  <div style={{ padding: isMobile ? '12px 14px' : '16px 20px', fontSize: '12px', color: C.frost, fontWeight: r.bold ? 700 : 400 }}>{r.after}</div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: '20px', padding: '24px', background: C.surfaceAlt, border: `1px solid ${C.border}`, borderLeft: `4px solid ${C.green}` }}>
              <p style={{ fontFamily: 'Courier New, monospace', fontSize: '10px', letterSpacing: '0.12em', color: C.green, textTransform: 'uppercase', marginBottom: '10px' }}>Client Quote</p>
              <p style={{ fontSize: '16px', color: C.frost, fontStyle: 'italic', lineHeight: 1.6 }}>"We're receiving more traffic to our website."</p>
              <p style={{ marginTop: '8px', fontSize: '12px', color: C.muted }}>— Client, Medical Logistics</p>
            </div>
          </div>

          <div style={{
            background: '#0D1410',
            border: `1px solid rgba(29,158,117,0.5)`,
            borderRadius: '12px',
            padding: isMobile ? '24px 20px' : '32px 28px',
            boxShadow: '0 0 70px rgba(29,158,117,0.4), 0 0 140px rgba(29,158,117,0.16)',
          }}>
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

  const [listChecked, setListChecked] = useState(() => Array(8).fill(true));
  const listRatio = listChecked.filter(Boolean).length / listChecked.length;
  const listGlow  = glowStyle(listRatio, 'blue');

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
    { bg: '#0A0A0F', text: '#F5F5F7', ratio: '16.1:1', label: 'Void / Frost',         grade: 'AAA' },
    { bg: '#0D3D6E', text: '#FFFFFF', ratio: '7.2:1',  label: 'Stellar Blue / White', grade: 'AA' },
    { bg: '#126B50', text: '#FFFFFF', ratio: '5.8:1',  label: 'Signal Green / White', grade: 'AA' },
    { bg: '#F5F5F7', text: '#0A0A0F', ratio: '16.1:1', label: 'Frost / Void',         grade: 'AAA' },
  ];

  return (
    <section id="accessibility" style={{ background: C.void, padding: isMobile ? '64px 20px' : '96px 48px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <p style={{ fontFamily: 'Courier New, monospace', fontSize: '11px', letterSpacing: '0.15em', color: C.brandBlue, textTransform: 'uppercase', marginBottom: '12px' }}>Accessibility</p>
        <h2 style={{ fontWeight: 700, fontSize: 'clamp(28px, 4vw, 44px)', color: C.frost, marginBottom: '10px', letterSpacing: '-0.025em' }}>Built for every user.</h2>
        <p style={{ color: C.muted, fontSize: '15px', marginBottom: '48px', maxWidth: '560px', lineHeight: 1.7 }}>
          ADA compliance isn't a checkbox — it's the baseline. Every product Aurviq ships is tested against WCAG standards before a single user touches it.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? '24px' : '40px', alignItems: 'start' }}>

          <div ref={listRef} style={{
            border: `1px solid ${listGlow.borderColor}`,
            borderRadius: '12px',
            overflow: 'hidden',
            boxShadow: listGlow.boxShadow,
            transition: 'box-shadow 0.35s ease, border-color 0.35s ease',
          }}>
            <div style={{ padding: '14px 24px', background: 'rgba(24,95,165,0.08)', borderBottom: `1px solid ${C.border}`, borderTop: `2px solid ${C.brandBlue}` }}>
              <span style={{ fontFamily: 'Courier New, monospace', fontSize: '10px', letterSpacing: '0.12em', color: C.brandBlue, textTransform: 'uppercase' }}>ADA Compliance Checklist</span>
            </div>
            {checks.map((c, i) => (
              <div key={i}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 24px', borderBottom: i < checks.length - 1 ? `1px solid ${C.border}` : 'none', background: C.surfaceAlt, opacity: listChecked[i] ? 1 : 0.38, transition: 'opacity 0.2s' }}>
                <div>
                  <p style={{ fontSize: '13px', fontWeight: 600, color: C.frost, marginBottom: '2px' }}>{c.label}</p>
                  <p style={{ fontFamily: 'Courier New, monospace', fontSize: '10px', color: C.muted }}>{c.detail}</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0, marginLeft: '16px' }}>
                  <span style={{ fontFamily: 'Courier New, monospace', fontSize: '10px', color: listChecked[i] ? C.green : C.muted, fontWeight: 700, letterSpacing: '0.06em', transition: 'color 0.2s' }}>
                    {listChecked[i] ? 'PASS' : 'OFF'}
                  </span>
                  <CheckCircle checked={listChecked[i]} onToggle={() => setListChecked(p => p.map((v, j) => j === i ? !v : v))} size={20} />
                </div>
              </div>
            ))}
          </div>

          <div ref={wcagRef} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{
              border: `1px solid rgba(29,158,117,0.5)`,
              borderRadius: '12px',
              overflow: 'hidden',
              boxShadow: '0 0 60px rgba(29,158,117,0.4), 0 0 120px rgba(29,158,117,0.16)',
            }}>
              <div style={{ padding: '14px 24px', background: 'rgba(29,158,117,0.08)', borderBottom: `1px solid ${C.border}`, borderTop: `2px solid ${C.green}` }}>
                <span style={{ fontFamily: 'Courier New, monospace', fontSize: '10px', letterSpacing: '0.12em', color: C.green, textTransform: 'uppercase' }}>WCAG 2.1 Conformance</span>
              </div>
              {levels.map((l, i) => (
                <div key={i}
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 24px', borderBottom: i < levels.length - 1 ? `1px solid ${C.border}` : 'none', background: C.surfaceAlt }}>
                  <div>
                    <p style={{ fontWeight: 700, fontSize: '16px', color: C.frost }}>{l.level}</p>
                    <p style={{ fontFamily: 'Courier New, monospace', fontSize: '10px', color: C.muted, marginTop: '2px' }}>{l.note}</p>
                  </div>
                  <span style={{ fontFamily: 'Courier New, monospace', fontSize: '10px', fontWeight: 700, letterSpacing: '0.08em', color: l.pass ? C.green : '#B8860B', background: l.pass ? 'rgba(29,158,117,0.12)' : 'rgba(184,134,11,0.12)', padding: '4px 10px' }}>
                    {l.status}
                  </span>
                </div>
              ))}
            </div>

            <div style={{ border: `1px solid ${C.border}`, padding: '28px 24px', background: C.surfaceAlt }}>
              <p style={{ fontFamily: 'Courier New, monospace', fontSize: '10px', letterSpacing: '0.12em', color: C.muted, textTransform: 'uppercase', marginBottom: '20px' }}>
                Colour Contrast Reference
              </p>
              {contrastRows.map((row, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: i < contrastRows.length - 1 ? '12px' : 0 }}>
                  <div style={{ width: '40px', height: '24px', background: row.bg, border: `1px solid ${C.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <span style={{ fontFamily: 'Courier New, monospace', fontSize: '8px', color: row.text, fontWeight: 700 }}>Aa</span>
                  </div>
                  <span style={{ fontFamily: 'Courier New, monospace', fontSize: '10px', color: C.muted, flex: 1 }}>{row.label}</span>
                  <span style={{ fontFamily: 'Courier New, monospace', fontSize: '10px', color: C.frost, fontWeight: 700 }}>{row.ratio}</span>
                  <span style={{ fontFamily: 'Courier New, monospace', fontSize: '10px', color: C.green, background: 'rgba(29,158,117,0.12)', padding: '2px 8px' }}>{row.grade}</span>
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
    <section style={{ background: C.surface, padding: isMobile ? '56px 20px' : '80px 48px' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <p style={{ fontFamily: 'Courier New, monospace', fontSize: '11px', letterSpacing: '0.15em', color: C.brandBlue, textTransform: 'uppercase', marginBottom: '12px', textAlign: 'center' }}>Proof, not promises.</p>
        <h2 style={{ fontWeight: 700, fontSize: 'clamp(24px, 3.5vw, 38px)', color: C.frost, marginBottom: '40px', textAlign: 'center', letterSpacing: '-0.025em' }}>We show our work.</h2>
        <div ref={ref} style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          {!isMobile && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2px' }}>
              <div style={{ padding: '12px 24px', background: 'rgba(255,255,255,0.05)', fontFamily: 'Courier New, monospace', fontSize: '10px', letterSpacing: '0.12em', color: C.muted, textTransform: 'uppercase' }}>Never say</div>
              <div style={{ padding: '12px 24px', background: C.green, fontFamily: 'Courier New, monospace', fontSize: '10px', letterSpacing: '0.12em', color: C.white, fontWeight: 700, textTransform: 'uppercase' }}>Always say</div>
            </div>
          )}
          {pairs.map((p, i) => (
            isMobile ? (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '2px', marginBottom: '10px' }}>
                <div style={{ padding: '16px 20px', background: C.surfaceAlt, fontSize: '13px', color: C.muted, fontStyle: 'italic', display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                  <span style={{ fontFamily: 'Courier New, monospace', fontSize: '10px', color: C.muted, opacity: 0.5, flexShrink: 0, marginTop: '1px' }}>✗</span>
                  {p.never}
                </div>
                <div style={{ padding: '16px 20px', background: 'rgba(29,158,117,0.08)', fontSize: '13px', color: C.frost, fontWeight: 600, borderLeft: `3px solid ${C.green}`, display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                  <span style={{ fontFamily: 'Courier New, monospace', fontSize: '10px', color: C.greenText, flexShrink: 0, marginTop: '1px' }}>✓</span>
                  {p.always}
                </div>
              </div>
            ) : (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2px' }}>
                <div style={{ padding: '20px 24px', background: C.surfaceAlt, fontSize: '14px', color: C.muted, fontStyle: 'italic' }}>{p.never}</div>
                <div style={{ padding: '20px 24px', background: 'rgba(29,158,117,0.08)', fontSize: '14px', color: C.frost, fontWeight: 600, borderLeft: `2px solid ${C.green}` }}>{p.always}</div>
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
      <div style={{ maxWidth: '680px', margin: '0 auto' }}>
        <p style={{ fontFamily: 'Courier New, monospace', fontSize: '11px', letterSpacing: '0.15em', color: C.frost, opacity: 0.55, textTransform: 'uppercase', marginBottom: '20px' }}>Ready to ship?</p>
        <h2 style={{ fontWeight: 800, fontSize: isMobile ? 'clamp(32px, 9vw, 48px)' : 'clamp(36px, 5.5vw, 64px)', color: C.white, marginBottom: '20px', lineHeight: 1.06, letterSpacing: '-0.03em' }}>Ship with certainty.</h2>
        <p style={{ fontSize: isMobile ? '15px' : '16px', color: C.white, opacity: 0.6, marginBottom: '40px', lineHeight: 1.75 }}>Free 30-minute pre-launch audit. No pitch. Just proof.</p>
        <a href="mailto:hello@aurviq.com" className="btn-primary" style={{
          background: C.white, color: C.brandBlue,
          padding: isMobile ? '13px 28px' : '15px 38px',
          fontWeight: 700, fontSize: '15px', letterSpacing: '0.04em',
          display: 'inline-block', textDecoration: 'none',
        }}>
          BOOK A FREE AUDIT
        </a>

        {/* What happens next — green glow card */}
        {(() => {
          const steps = [
            { n: '01', title: '30-minute audit call',  sub: 'Live review of your product — no slides, just findings' },
            { n: '02', title: 'Written audit report',  sub: 'Every issue documented with priority and impact'        },
            { n: '03', title: 'Action plan + pricing', sub: 'Clear next steps with no obligation'                   },
          ];
          return (
            <div style={{
              marginTop: '48px',
              background: '#0D1410',
              border: `1px solid rgba(29,158,117,0.55)`,
              borderRadius: '12px',
              overflow: 'hidden',
              textAlign: 'left',
              boxShadow: '0 0 80px rgba(29,158,117,0.5), 0 0 160px rgba(29,158,117,0.2)',
            }}>
              <div style={{ padding: '14px 24px', borderBottom: `1px solid rgba(29,158,117,0.2)`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontFamily: 'Courier New, monospace', fontSize: '11px', color: C.green, letterSpacing: '0.12em' }}>AFTER YOU BOOK</span>
                <span style={{ fontFamily: 'Courier New, monospace', fontSize: '10px', color: C.muted }}>Free · No obligation</span>
              </div>
              {steps.map((s, i) => (
                <div key={i} style={{
                  padding: '16px 24px',
                  borderBottom: i < steps.length - 1 ? `1px solid rgba(29,158,117,0.12)` : 'none',
                  display: 'flex', alignItems: 'center', gap: '16px',
                }}>
                  <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'rgba(29,158,117,0.15)', border: `1px solid rgba(29,158,117,0.4)`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <span style={{ fontFamily: 'Courier New, monospace', fontSize: '10px', color: C.green, fontWeight: 700 }}>{s.n}</span>
                  </div>
                  <div>
                    <p style={{ fontSize: '13px', fontWeight: 600, color: C.frost, marginBottom: '2px' }}>{s.title}</p>
                    <p style={{ fontFamily: 'Courier New, monospace', fontSize: '10px', color: C.muted }}>{s.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          );
        })()}
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
      background: C.void,
      textAlign: isMobile ? 'center' : 'left',
    }}>
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
    <div style={{ minHeight: '100vh', background: '#000' }}>
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
