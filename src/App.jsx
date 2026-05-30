import './App.css';

const C = {
  void: '#0A0A0F',
  blue: '#0D3D6E',
  frost: '#F5F5F7',
  carbon: '#2C2C2A',
  green: '#126B50',
  white: '#FFFFFF',
  border: '#E0E0E2',
  muted: '#6B6B6E',
};

function Nav() {
  return (
    <nav style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '20px 48px',
      borderBottom: 'none',
      position: 'sticky',
      top: 0,
      background: C.void,
      zIndex: 100,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <img src="/aurviq-logo.svg" alt="Aurviq logo" style={{ height: '28px' }} />
        <span style={{
          fontWeight: 700,
          fontSize: '17px',
          letterSpacing: '0.08em',
          color: C.frost,
        }}>AURVIQ</span>
      </div>
      <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
        <a href="#services" style={{ color: C.frost, fontSize: '14px', textDecoration: 'none', opacity: 0.65 }}>Services</a>
        <a href="#proof" style={{ color: C.frost, fontSize: '14px', textDecoration: 'none', opacity: 0.65 }}>Proof</a>
        <a href="#contact" style={{
          background: C.green,
          color: C.white,
          padding: '8px 20px',
          fontSize: '14px',
          fontWeight: 700,
          letterSpacing: '0.04em',
          textDecoration: 'none',
        }}>Get started</a>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section style={{
      padding: '112px 48px 96px',
      maxWidth: '960px',
      margin: '0 auto',
    }}>
      <p style={{
        fontFamily: 'Courier New, monospace',
        fontSize: '11px',
        letterSpacing: '0.18em',
        color: '#0A4A35',
        marginBottom: '28px',
        textTransform: 'uppercase',
      }}>
        QUALITY ASSURANCE · ADA COMPLIANT · PERFORMANCE TESTED
      </p>
      <h1 style={{
        fontWeight: 700,
        fontSize: 'clamp(40px, 6vw, 72px)',
        lineHeight: 1.08,
        color: C.void,
        marginBottom: '28px',
        letterSpacing: '-0.025em',
      }}>
        Products built to work.<br />
        For everyone.<br />
        Every time.
      </h1>
      <p style={{
        fontSize: '17px',
        color: C.muted,
        maxWidth: '520px',
        marginBottom: '44px',
        lineHeight: 1.75,
      }}>
        Aurviq is the QA agency embedded in your team. We catch what others miss — before a single user encounters it.
      </p>
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
        <a href="#contact" style={{
          background: C.blue,
          color: C.white,
          padding: '13px 30px',
          fontWeight: 700,
          fontSize: '14px',
          letterSpacing: '0.05em',
          textDecoration: 'none',
          display: 'inline-block',
        }}>
          SHIP WITH CERTAINTY.
        </a>
        <a href="#services" style={{
          border: `1px solid ${C.border}`,
          color: C.carbon,
          padding: '13px 30px',
          fontSize: '14px',
          textDecoration: 'none',
          display: 'inline-block',
        }}>
          See how it works
        </a>
      </div>
    </section>
  );
}

function StatsBar() {
  const stats = [
    { number: '100×', label: 'Bug cost: production vs. planning' },
    { number: '~$0', label: 'Bug cost caught in planning' },
    { number: '9', label: 'Bugs caught before go-live' },
    { number: '14', label: 'ADA violations fixed pre-launch' },
  ];

  return (
    <div style={{
      borderTop: `1px solid ${C.border}`,
      borderBottom: `1px solid ${C.border}`,
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      background: C.white,
    }}>
      {stats.map((s, i) => (
        <div key={i} style={{
          padding: '40px 24px',
          borderRight: i < 3 ? `1px solid ${C.border}` : 'none',
          textAlign: 'center',
        }}>
          <div style={{
            fontWeight: 700,
            fontSize: '38px',
            color: C.green,
            marginBottom: '8px',
            letterSpacing: '-0.02em',
          }}>{s.number}</div>
          <div style={{
            fontFamily: 'Courier New, monospace',
            fontSize: '10px',
            letterSpacing: '0.12em',
            color: C.muted,
            textTransform: 'uppercase',
          }}>{s.label}</div>
        </div>
      ))}
    </div>
  );
}

function Services() {
  const pkgs = [
    {
      stage: 'STAGE 01 — PLANNING',
      name: 'Foundation',
      tagline: 'Build the right thing before you build anything.',
      body: "Every mistake made before a line of code is written becomes exponentially more expensive to fix later. Foundation eliminates that risk before it's possible.",
    },
    {
      stage: 'STAGE 02 — REGRESSION',
      name: 'Shield',
      tagline: 'Every new feature protected. Nothing breaks what works.',
      body: 'Your checkout broke on iOS. We found it first. Shield wraps every release with regression coverage so nothing that works today breaks tomorrow.',
    },
    {
      stage: 'STAGE 03 — AUTOMATION',
      name: 'Autopilot',
      tagline: 'Quality at scale without scaling your team.',
      body: 'Automated test suites, performance benchmarks, and ADA checks — running on every build. Speed and quality are no longer a trade-off.',
    },
  ];

  return (
    <section id="services" style={{ padding: '96px 48px', background: C.frost }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <p style={{
          fontFamily: 'Courier New, monospace',
          fontSize: '11px',
          letterSpacing: '0.15em',
          color: C.blue,
          textTransform: 'uppercase',
          marginBottom: '14px',
        }}>Services</p>
        <h2 style={{
          fontWeight: 700,
          fontSize: 'clamp(28px, 4vw, 44px)',
          color: C.void,
          marginBottom: '56px',
          letterSpacing: '-0.02em',
        }}>Three stages. One standard.</h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '1px',
          background: C.border,
          border: `1px solid ${C.border}`,
        }}>
          {pkgs.map((pkg, i) => (
            <div key={i} style={{
              background: C.white,
              padding: '44px 36px',
              display: 'flex',
              flexDirection: 'column',
              gap: '14px',
            }}>
              <p style={{
                fontFamily: 'Courier New, monospace',
                fontSize: '10px',
                letterSpacing: '0.14em',
                color: C.blue,
                textTransform: 'uppercase',
              }}>{pkg.stage}</p>
              <h3 style={{
                fontWeight: 700,
                fontSize: '30px',
                color: C.void,
                lineHeight: 1.1,
              }}>{pkg.name}</h3>
              <div style={{ width: '36px', height: '2px', background: C.green }} />
              <p style={{ fontWeight: 700, color: C.void, fontSize: '14px', lineHeight: 1.5 }}>
                {pkg.tagline}
              </p>
              <p style={{ color: C.muted, fontSize: '13px', lineHeight: 1.75 }}>
                {pkg.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CostCurve() {
  return (
    <section style={{
      background: C.void,
      padding: '80px 48px',
    }}>
      <div style={{ maxWidth: '760px', margin: '0 auto', textAlign: 'center' }}>
        <p style={{
          fontFamily: 'Courier New, monospace',
          fontSize: '11px',
          letterSpacing: '0.15em',
          color: C.blue,
          textTransform: 'uppercase',
          marginBottom: '20px',
        }}>THE COST CURVE</p>
        <h2 style={{
          fontWeight: 700,
          fontSize: 'clamp(22px, 3.5vw, 36px)',
          color: C.frost,
          marginBottom: '20px',
          lineHeight: 1.25,
          letterSpacing: '-0.02em',
        }}>
          A bug in planning costs{' '}
          <span style={{ color: C.green }}>~$0.</span>
          <br />
          That same bug in production costs you{' '}
          <span style={{ color: '#E05252' }}>your launch.</span>
        </h2>
        <p style={{ color: C.frost, opacity: 0.55, fontSize: '14px', lineHeight: 1.75 }}>
          NIST research puts the fix cost ratio at up to 100× between planning and production.
          Aurviq's Foundation package exists to eliminate that risk before it's even possible.
        </p>
      </div>
    </section>
  );
}

function Proof() {
  const rows = [
    {
      before: 'Zero SEO — invisible to every search engine',
      after: 'Full SEO audit and implementation',
    },
    {
      before: 'ADA non-compliant — excluding users with disabilities',
      after: 'ADA compliance overhaul completed',
    },
    {
      before: 'Slow load times — unoptimized media killing performance',
      after: 'Image and video optimization complete',
    },
    {
      before: 'Not mobile responsive — broken on most devices',
      after: 'Full mobile responsiveness rebuild',
    },
    {
      before: 'Result: Zero discoverability',
      after: 'Result: Measurable increase in website traffic',
      bold: true,
    },
  ];

  return (
    <section id="proof" style={{ padding: '96px 48px', background: C.frost }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <p style={{
          fontFamily: 'Courier New, monospace',
          fontSize: '11px',
          letterSpacing: '0.15em',
          color: C.blue,
          textTransform: 'uppercase',
          marginBottom: '14px',
        }}>Case Study</p>
        <h2 style={{
          fontWeight: 700,
          fontSize: 'clamp(28px, 4vw, 44px)',
          color: C.void,
          marginBottom: '10px',
          letterSpacing: '-0.02em',
        }}>From invisible to findable.</h2>
        <p style={{
          color: C.muted,
          fontSize: '15px',
          marginBottom: '48px',
          maxWidth: '520px',
          lineHeight: 1.7,
        }}>
          A medical logistics company came to Aurviq with a product they believed in.
          Nobody could find it, access it, or load it fast enough to stay.
        </p>

        <div style={{ border: `1px solid ${C.border}`, background: C.white }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
            <div style={{
              padding: '14px 28px',
              background: C.frost,
              fontFamily: 'Courier New, monospace',
              fontSize: '10px',
              letterSpacing: '0.12em',
              color: C.muted,
              textTransform: 'uppercase',
              borderBottom: `1px solid ${C.border}`,
              borderRight: `1px solid ${C.border}`,
            }}>Before Aurviq</div>
            <div style={{
              padding: '14px 28px',
              background: C.green,
              fontFamily: 'Courier New, monospace',
              fontSize: '10px',
              letterSpacing: '0.12em',
              color: C.white,
              fontWeight: 700,
              textTransform: 'uppercase',
              borderBottom: `1px solid ${C.border}`,
            }}>After Aurviq</div>
          </div>
          {rows.map((r, i) => (
            <div key={i} style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              borderBottom: i < rows.length - 1 ? `1px solid ${C.border}` : 'none',
            }}>
              <div style={{
                padding: '20px 28px',
                fontSize: '13px',
                color: C.muted,
                borderRight: `1px solid ${C.border}`,
              }}>{r.before}</div>
              <div style={{
                padding: '20px 28px',
                fontSize: '13px',
                color: C.void,
                fontWeight: r.bold ? 700 : 400,
              }}>{r.after}</div>
            </div>
          ))}
        </div>

        <div style={{
          marginTop: '28px',
          padding: '28px 32px',
          borderLeft: `4px solid ${C.green}`,
          background: C.white,
          border: `1px solid ${C.border}`,
          borderLeftWidth: '4px',
          borderLeftColor: C.green,
        }}>
          <p style={{
            fontFamily: 'Courier New, monospace',
            fontSize: '10px',
            letterSpacing: '0.12em',
            color: C.green,
            textTransform: 'uppercase',
            marginBottom: '10px',
          }}>Client Quote</p>
          <p style={{ fontSize: '18px', color: C.void, fontStyle: 'italic' }}>
            "We're receiving more traffic to our website."
          </p>
          <p style={{ marginTop: '8px', fontSize: '13px', color: C.muted }}>
            — Client, Medical Logistics
          </p>
        </div>
      </div>
    </section>
  );
}

function VoiceBlock() {
  const pairs = [
    {
      never: '"We leverage best-in-class solutions..."',
      always: '"We caught 9 bugs before your launch."',
    },
    {
      never: '"Our holistic approach ensures quality..."',
      always: '"Your checkout broke on iOS. We found it first."',
    },
    {
      never: '"We are passionate about accessibility..."',
      always: '"14 ADA violations. Fixed before any user saw them."',
    },
  ];

  return (
    <section style={{ background: C.white, padding: '80px 48px' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <p style={{
          fontFamily: 'Courier New, monospace',
          fontSize: '11px',
          letterSpacing: '0.15em',
          color: C.blue,
          textTransform: 'uppercase',
          marginBottom: '14px',
          textAlign: 'center',
        }}>Proof, not promises.</p>
        <h2 style={{
          fontWeight: 700,
          fontSize: 'clamp(24px, 3.5vw, 38px)',
          color: C.void,
          marginBottom: '44px',
          textAlign: 'center',
          letterSpacing: '-0.02em',
        }}>We show our work.</h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2px' }}>
            <div style={{
              padding: '12px 24px',
              background: C.frost,
              fontFamily: 'Courier New, monospace',
              fontSize: '10px',
              letterSpacing: '0.12em',
              color: C.muted,
              textTransform: 'uppercase',
            }}>Never say</div>
            <div style={{
              padding: '12px 24px',
              background: C.green,
              fontFamily: 'Courier New, monospace',
              fontSize: '10px',
              letterSpacing: '0.12em',
              color: C.white,
              fontWeight: 700,
              textTransform: 'uppercase',
            }}>Always say</div>
          </div>
          {pairs.map((p, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2px' }}>
              <div style={{
                padding: '20px 24px',
                background: C.frost,
                fontSize: '14px',
                color: C.muted,
                fontStyle: 'italic',
              }}>{p.never}</div>
              <div style={{
                padding: '20px 24px',
                background: 'rgba(29,158,117,0.08)',
                fontSize: '14px',
                color: C.void,
                fontWeight: 700,
                borderLeft: `2px solid ${C.green}`,
              }}>{p.always}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section id="contact" style={{
      padding: '120px 48px',
      textAlign: 'center',
      background: C.blue,
    }}>
      <div style={{ maxWidth: '680px', margin: '0 auto' }}>
        <p style={{
          fontFamily: 'Courier New, monospace',
          fontSize: '11px',
          letterSpacing: '0.15em',
          color: C.green,
          textTransform: 'uppercase',
          marginBottom: '22px',
        }}>Ready to ship?</p>
        <h2 style={{
          fontWeight: 700,
          fontSize: 'clamp(36px, 5.5vw, 64px)',
          color: C.white,
          marginBottom: '20px',
          lineHeight: 1.08,
          letterSpacing: '-0.025em',
        }}>Ship with certainty.</h2>
        <p style={{
          fontSize: '16px',
          color: C.white,
          opacity: 0.75,
          marginBottom: '44px',
          lineHeight: 1.75,
        }}>
          Free 30-minute pre-launch audit. No pitch. Just proof.
        </p>
        <a href="mailto:hello@aurviq.com" style={{
          background: C.white,
          color: C.blue,
          padding: '15px 38px',
          fontWeight: 700,
          fontSize: '15px',
          letterSpacing: '0.04em',
          display: 'inline-block',
          textDecoration: 'none',
        }}>
          BOOK A FREE AUDIT
        </a>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{
      borderTop: `1px solid ${C.border}`,
      padding: '28px 48px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      background: C.white,
    }}>
      <p style={{
        fontFamily: 'Courier New, monospace',
        fontSize: '11px',
        letterSpacing: '0.12em',
        color: C.muted,
        textTransform: 'uppercase',
      }}>SHIP WITH CERTAINTY. · AURVIQ</p>
      <div style={{ display: 'flex', gap: '20px' }}>
        {['aurviq.com', 'aurviq.io'].map(d => (
          <span key={d} style={{
            fontFamily: 'Courier New, monospace',
            fontSize: '11px',
            color: C.muted,
          }}>{d}</span>
        ))}
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <div style={{ minHeight: '100vh', background: C.frost }}>
      <Nav />
      <Hero />
      <StatsBar />
      <Services />
      <CostCurve />
      <Proof />
      <VoiceBlock />
      <CTA />
      <Footer />
    </div>
  );
}
