import React, { useState, useEffect, useRef } from 'react';

// ─── CONSTANTS ────────────────────────────────────────────────
const HERO_IMAGE = "https://lh3.googleusercontent.com/aida-public/AB6AXuCti5invhZpG_X0NahacZA34B3eX6QWU_kjYzN4iEwAP5wnc_1yN3giwJl8rqJhuK0RNIGGHqhyXfWIfDhTcxtwmLcEmlQzmNgziDx9F-kyoxyQ-MCFvuckyiUe0GHWW181Yd9ms6a1GaSVsQzutl8m4aixXfCkG2s-5LDf6LY8MFN_84zbiDtQpouV1DkHnYU61gakiwKM-wWmLKqzVE9GKm7zlpeR1IVReb9KN-6YoVA_nNw6pyMQtSwIc8RD0M0QYOY7nkifh3Mz";
const KITCHEN_IMAGE = "https://lh3.googleusercontent.com/aida-public/AB6AXuDPQ66rgbd5NcvEd8d2D0-gNutZaDxNINiMcXQX4bLc-7M5yvQj_IddgACz8lF-Jta7r_xe5o_19cMC4Zi4OvxlvLe6czgsd-_DmaMkCh9jiWX7g_QCrHlKznhcoe2aZgyXXnEUfdvdsf_GYZu9fBia_m8MQpVQDnP3Wl8nX1gvgLniUqq9XDPPTmETSbv1rpqjEh9GdDCRr8RLIEabxFc4D56uf8jNDvqedL8Lb9Fq-ULxCJgRWFTvn8TLTTQXSL1gCmNsYilJsU3A";

const STATS = [
  { value: '500+', label: 'Providers Ready', suffix: '' },
  { value: '#900', label: 'Billion Market', suffix: 'B' },
  { value: '13', label: 'Providers Undigitized', suffix: '%' },
  { value: '1K', label: 'Waitlist Signups', suffix: '+' },
];

const FEATURES = [
  {
    icon: 'fa-robot',
    tag: 'CORE AI',
    title: 'Smart Matchmaking',
    desc: 'Our proprietary AI engine connects buyers to the perfect chef, farmer, or caterer in milliseconds — learning your preferences with every interaction.',
    color: '#2e8b57',
  },
  {
    icon: 'fa-chart-line',
    tag: 'PRICING ENGINE',
    title: 'Dynamic Pricing',
    desc: 'Real-time market intelligence sets optimal prices based on seasonality, demand, and supply — so providers always earn what they deserve.',
    color: '#f5a623',
  },
  {
    icon: 'fa-file-contract',
    tag: 'LEGAL AI',
    title: 'Automated Contracts',
    desc: 'AI generates legally structured agreements in seconds. Review, e-sign, and manage every contract — all without leaving the platform.',
    color: '#4caf7d',
  },
  {
    icon: 'fa-building',
    tag: 'ENTERPRISE',
    title: 'B2B Business Portal',
    desc: 'Dedicated web dashboard for restaurants, hotels, and corporates to manage vendors, track orders, and analyze food spend at scale.',
    color: '#7ecba1',
  },
  {
    icon: 'fa-lock',
    tag: 'PAYMENTS',
    title: 'Escrow Protection',
    desc: 'Funds are held securely until service delivery is confirmed. No more chasing payments or dispute anxiety for either party.',
    color: '#f5a623',
  },
  {
    icon: 'fa-check-circle',
    tag: 'TRUST LAYER',
    title: 'Verified Providers',
    desc: 'Every provider goes through ID verification, food safety certification checks, and background screening before joining the network.',
    color: '#2e8b57',
  },
];

const TIMELINE = [
  { phase: 'Q1–Q2 2025', label: 'SEED', title: 'Build & Onboard', items: ['Core platform engineering', '50 hand-picked providers', 'Invite-only beta launch'] },
  { phase: 'Q3 2025', label: 'BETA', title: 'Launch & Learn', items: ['Public beta — 1 city', 'AI matchmaking V1 live', '1,000+ consumers'] },
  { phase: 'Q4 2025', label: 'V1', title: 'Public Launch', items: ['Full V1 public release', 'Mobile apps (iOS & Android)', 'Dynamic pricing + contracts'] },
  { phase: '2026+', label: 'SCALE', title: 'Expand & Grow', items: ['Multi-city expansion', 'B2B SaaS portal launch', '$500K GMV target'] },
];

const HOW_IT_WORKS = [
  { num: '01', title: 'Providers List', desc: 'Farmers, chefs, bakers, caterers, and bartenders create AI-assisted profiles — showcasing their services, availability, and pricing.' },
  { num: '02', title: 'AI Matches', desc: 'The matchmaking engine analyzes dozens of signals to surface the most relevant providers — instantly, for every unique buyer need.' },
  { num: '03', title: 'Book & Contract', desc: 'Buyers book in seconds. AI auto-generates a legal contract. Both parties e-sign. Funds are held in escrow until delivery.' },
  { num: '04', title: 'Deliver & Review', desc: 'Service is delivered, payment released, and both parties review. The AI learns, gets smarter, and improves future matches.' },
];

// ─── UTILITY ──────────────────────────────────────────────────
function useInView(ref, threshold = 0.15) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref, threshold]);
  return inView;
}

// ─── COMPONENTS ───────────────────────────────────────────────

function GridBackground() {
  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', overflow: 'hidden',
    }}>
      {/* Radial glow */}
      <div style={{
        position: 'absolute', top: '-20%', left: '50%', transform: 'translateX(-50%)',
        width: '80vw', height: '80vw', maxWidth: 900,
        background: 'radial-gradient(circle, rgba(46,139,87,0.12) 0%, transparent 65%)',
        pointerEvents: 'none',
      }} />
      {/* Grid lines */}
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.04 }}>
        <defs>
          <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#4caf7d" strokeWidth="0.5"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
      {/* Bottom fade */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: '30vh',
        background: 'linear-gradient(to top, var(--green-900), transparent)',
      }} />
    </div>
  );
}

function Navbar({ scrolled }) {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <header style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      background: scrolled ? 'rgba(5,18,9,0.92)' : 'transparent',
      backdropFilter: scrolled ? 'blur(20px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(78,175,125,0.12)' : '1px solid transparent',
      transition: 'all 0.4s ease',
      padding: '0 24px',
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 68 }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <img 
            src="ChatGPT Image Feb 27, 2026, 11_51_27 AM.png" 
            alt="FreshLink Logo" 
            style={{
              width: 50, 
              height: 50, 
              borderRadius: 10,
              objectFit: 'cover',
              boxShadow: '0 0 20px rgba(46,139,87,0.4)',
            }} 
          />
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 22, letterSpacing: '-0.02em', color: 'white' }}>
            Fresh<span style={{ color: 'var(--green-400)' }}>Link</span>
          </span>
        </div>

        {/* Desktop nav */}
        <nav style={{ display: 'flex', gap: 32, alignItems: 'center' }} className="desktop-nav">
          {['How It Works', 'Features', 'Roadmap', 'About'].map(item => (
            <a key={item} href={`#${item.toLowerCase().replace(/ /g, '-')}`} style={{
              color: 'var(--text-muted)', textDecoration: 'none', fontSize: 14, fontWeight: 500,
              transition: 'color 0.2s', letterSpacing: '0.01em',
            }}
            onMouseEnter={e => e.target.style.color = 'var(--green-300)'}
            onMouseLeave={e => e.target.style.color = 'var(--text-muted)'}
            >{item}</a>
          ))}
        </nav>

        {/* CTA */}
        <a href="#waitlist" style={{
          background: 'linear-gradient(135deg, #2e8b57, #1a5b2e)',
          color: 'white', padding: '10px 22px', borderRadius: 8,
          fontSize: 13, fontWeight: 700, textDecoration: 'none',
          border: '1px solid rgba(78,175,125,0.3)',
          boxShadow: '0 0 20px rgba(46,139,87,0.25)',
          transition: 'all 0.2s', letterSpacing: '0.03em',
          fontFamily: 'var(--font-display)',
        }}
        onMouseEnter={e => { e.target.style.transform = 'translateY(-1px)'; e.target.style.boxShadow = '0 4px 30px rgba(46,139,87,0.45)'; }}
        onMouseLeave={e => { e.target.style.transform = 'translateY(0)'; e.target.style.boxShadow = '0 0 20px rgba(46,139,87,0.25)'; }}
        >Join Waitlist</a>
      </div>
    </header>
  );
}

function HeroSection() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [count, setCount] = useState(11847);

  useEffect(() => {
    const t = setTimeout(() => setCount(c => c + Math.floor(Math.random() * 3 + 1)), 8000);
    return () => clearTimeout(t);
  }, [count]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && email.includes('@')) setSubmitted(true);
  };

  return (
    <section id="hero" style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
      {/* BG image with overlay */}
      <div style={{ position: 'absolute', inset: 0 }}>
        <img src={HERO_IMAGE} alt="Fresh produce" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.18 }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(5,18,9,0.5) 0%, rgba(5,18,9,0.7) 60%, var(--green-900) 100%)' }} />
      </div>

      {/* Floating orbs */}
      <div style={{ position: 'absolute', top: '20%', right: '10%', width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(46,139,87,0.15) 0%, transparent 70%)', animation: 'float 6s ease-in-out infinite' }} />
      <div style={{ position: 'absolute', bottom: '30%', left: '5%', width: 200, height: 200, borderRadius: '50%', background: 'radial-gradient(circle, rgba(245,166,35,0.08) 0%, transparent 70%)', animation: 'float 8s ease-in-out infinite 2s' }} />

      <div style={{ position: 'relative', zIndex: 2, maxWidth: 1200, margin: '0 auto', padding: '120px 24px 80px', width: '100%' }}>
        <div style={{ maxWidth: 760 }}>
          {/* Badge */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'rgba(46,139,87,0.12)', border: '1px solid rgba(78,175,125,0.25)',
            borderRadius: 100, padding: '6px 16px', marginBottom: 28,
            animation: 'fadeUp 0.5s ease forwards',
          }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--green-400)', animation: 'pulse-ring 2s infinite', display: 'inline-block' }} />
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', color: 'var(--green-300)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase' }}>
              Now Building · Launching 2025
            </span>
          </div>

          {/* Headline */}
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(44px, 7vw, 88px)',
            fontWeight: 800,
            lineHeight: 1.0,
            letterSpacing: '-0.04em',
            marginBottom: 28,
            animation: 'fadeUp 0.7s 0.1s ease both',
            opacity: 0,
          }}>
            <span style={{ color: 'white' }}>The Food Economy </span>
            <span style={{
              background: 'linear-gradient(135deg, #4caf7d 0%, #2e8b57 50%, #f5a623 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>Reimagined by AI</span>
          </h1>

          {/* Sub */}
          <p style={{
            fontSize: 18, color: 'rgba(255,255,255,0.65)', maxWidth: 560, lineHeight: 1.7,
            marginBottom: 48, fontWeight: 300,
            animation: 'fadeUp 0.7s 0.2s ease both', opacity: 0,
          }}>
            FreshLink connects farmers, chefs, bakers, caterers, and bartenders to consumers and businesses through an AI-powered marketplace — smart matchmaking, dynamic pricing, and automated contracts.
          </p>

          {/* Waitlist form */}
          <div id="waitlist" style={{ animation: 'fadeUp 0.7s 0.3s ease both', opacity: 0 }}>
            {!submitted ? (
              <form onSubmit={handleSubmit}>
                <div style={{
                  display: 'flex', gap: 0, maxWidth: 520,
                  background: 'rgba(10,31,16,0.8)', border: '1px solid rgba(78,175,125,0.3)',
                  borderRadius: 12, padding: 6, backdropFilter: 'blur(20px)',
                  boxShadow: '0 0 40px rgba(46,139,87,0.15)',
                }}>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    required
                    style={{
                      flex: 1, background: 'transparent', border: 'none',
                      color: 'white', fontSize: 15, padding: '12px 16px',
                      fontFamily: 'var(--font-body)', minWidth: 0,
                    }}
                  />
                  <button type="submit" style={{
                    background: 'linear-gradient(135deg, #2e8b57, #1a5b2e)',
                    color: 'white', border: 'none', borderRadius: 8,
                    padding: '12px 24px', fontSize: 14, fontWeight: 700,
                    cursor: 'pointer', whiteSpace: 'nowrap',
                    fontFamily: 'var(--font-display)', letterSpacing: '0.02em',
                    transition: 'all 0.2s', boxShadow: '0 0 20px rgba(46,139,87,0.3)',
                  }}
                  onMouseEnter={e => e.target.style.boxShadow = '0 0 30px rgba(46,139,87,0.5)'}
                  onMouseLeave={e => e.target.style.boxShadow = '0 0 20px rgba(46,139,87,0.3)'}
                  >
                    Join Waitlist →
                  </button>
                </div>
                <p style={{ marginTop: 12, fontSize: 12, color: 'var(--text-muted)' }}>
                  🔒 No spam. Just launch updates, city announcements, and early access.
                </p>
              </form>
            ) : (
              <div style={{
                maxWidth: 520, background: 'rgba(46,139,87,0.1)',
                border: '1px solid rgba(78,175,125,0.35)', borderRadius: 12, padding: '20px 24px',
                animation: 'fadeIn 0.4s ease',
              }}>
                <div style={{ fontSize: 24, marginBottom: 6 }}>🎉</div>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 18, color: 'var(--green-300)', marginBottom: 4 }}>
                  You're on the list!
                </div>
                <div style={{ fontSize: 14, color: 'var(--text-muted)' }}>
                  We'll reach out with early access as soon as we launch in your city. Stay fresh.
                </div>
              </div>
            )}
          </div>

          {/* Social proof */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginTop: 40, animation: 'fadeUp 0.7s 0.4s ease both', opacity: 0 }}>
            <div style={{ display: 'flex' }}>
               {['#2e8b57', '#4caf7d', '#1a5b2e', '#f5a623'].map((c, i) => (
                <div key={i} style={{
                  width: 32, height: 32, borderRadius: '50%',
                  background: c, border: '2px solid var(--green-900)',
                  marginLeft: i ? -8 : 0, fontSize: 13, display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <i className={`fas ${['fa-seedling', 'fa-utensils', 'fa-birthday-cake', 'fa-cocktail'][i]}`} style={{ color: 'white', fontSize: 12 }}></i>
                </div>
              ))}
            </div>
            <div>
              <div style={{ fontSize: 15, fontWeight: 700, color: 'white', fontFamily: 'var(--font-display)' }}>
                {count.toLocaleString()}+ on the waitlist
              </div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Farmers, chefs, restaurants & food lovers</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{ position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, opacity: 0.4 }}>
        <span style={{ fontSize: 11, fontFamily: 'var(--font-mono)', letterSpacing: '0.1em', color: 'var(--green-300)' }}>SCROLL</span>
        <div style={{ width: 1, height: 40, background: 'linear-gradient(to bottom, var(--green-400), transparent)' }} />
      </div>
    </section>
  );
}

function StatsSection() {
  const ref = useRef(null);
  const inView = useInView(ref);
  return (
    <section ref={ref} style={{ padding: '80px 24px', position: 'relative' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 1, border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden', background: 'var(--border)' }}>
          {STATS.map((stat, i) => (
            <div key={i} style={{
              background: 'rgba(10,31,16,0.9)', padding: '40px 32px', textAlign: 'center',
              opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(20px)',
              transition: `all 0.6s ${i * 0.1}s ease`,
            }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 48, fontWeight: 800, color: 'var(--green-400)', letterSpacing: '-0.03em', lineHeight: 1 }}>
                {stat.value}<span style={{ color: 'var(--amber)' }}>{stat.suffix}</span>
              </div>
              <div style={{ marginTop: 8, fontSize: 13, color: 'var(--text-muted)', fontWeight: 500, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorksSection() {
  const ref = useRef(null);
  const inView = useInView(ref);
  return (
    <section id="how-it-works" ref={ref} style={{ padding: '100px 24px', position: 'relative' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        {/* Section header */}
        <div style={{ marginBottom: 64, opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(20px)', transition: 'all 0.6s ease' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--green-400)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 12 }}>
            // PROCESS
          </div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.1 }}>
            How FreshLink Works
          </h2>
        </div>

        {/* Steps */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 2 }}>
          {HOW_IT_WORKS.map((step, i) => (
            <div key={i} style={{
              position: 'relative', padding: '36px 28px',
              border: '1px solid var(--border)',
              background: 'rgba(10,31,16,0.4)',
              borderRadius: 16,
              opacity: inView ? 1 : 0,
              transform: inView ? 'none' : 'translateY(30px)',
              transition: `all 0.6s ${0.1 + i * 0.12}s ease`,
              overflow: 'hidden',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'rgba(46,139,87,0.08)';
              e.currentTarget.style.borderColor = 'rgba(78,175,125,0.35)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'rgba(10,31,16,0.4)';
              e.currentTarget.style.borderColor = 'var(--border)';
            }}
            >
              {/* Number */}
              <div style={{
                fontFamily: 'var(--font-mono)', fontSize: 64, fontWeight: 700,
                color: 'rgba(46,139,87,0.08)', position: 'absolute', top: 12, right: 16,
                lineHeight: 1, pointerEvents: 'none', userSelect: 'none',
              }}>{step.num}</div>

              <div style={{
                width: 40, height: 40, borderRadius: 10,
                background: 'rgba(46,139,87,0.15)', border: '1px solid rgba(78,175,125,0.2)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 600,
                color: 'var(--green-400)', marginBottom: 20,
              }}>
                {step.num}
              </div>

              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 700, marginBottom: 12, color: 'white' }}>
                {step.title}
              </h3>
              <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.7 }}>
                {step.desc}
              </p>

              {i < HOW_IT_WORKS.length - 1 && (
                <div style={{
                  position: 'absolute', right: -12, top: '50%', transform: 'translateY(-50%)',
                  zIndex: 2, width: 24, height: 24, borderRadius: '50%',
                  background: 'var(--green-900)', border: '1px solid var(--border)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 10, color: 'var(--green-400)',
                  display: 'none', // hidden on mobile; CSS handles
                }}>→</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturesSection() {
  const ref = useRef(null);
  const inView = useInView(ref);
  return (
    <section id="features" ref={ref} style={{ padding: '100px 24px', position: 'relative' }}>
      {/* Background glow */}
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '60vw', height: '60vw', maxWidth: 700, background: 'radial-gradient(circle, rgba(46,139,87,0.06) 0%, transparent 60%)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 64, flexWrap: 'wrap', gap: 24, opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(20px)', transition: 'all 0.6s ease' }}>
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--green-400)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 12 }}>// CAPABILITIES</div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.1, maxWidth: 500 }}>
              Everything You Need, <br />
              <span style={{ color: 'var(--green-400)' }}>Nothing You Don't</span>
            </h2>
          </div>
          <p style={{ maxWidth: 340, fontSize: 15, color: 'var(--text-muted)', lineHeight: 1.7 }}>
            FreshLink is built around three AI engines that handle the complexity of food service — so you can focus on what you do best.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 16 }}>
          {FEATURES.map((f, i) => (
            <div key={i} style={{
              padding: '32px 28px',
              background: 'rgba(10,31,16,0.5)',
              border: '1px solid var(--border)',
              borderRadius: 16, position: 'relative', overflow: 'hidden',
              cursor: 'default',
              opacity: inView ? 1 : 0,
              transform: inView ? 'none' : 'translateY(30px)',
              transition: `all 0.6s ${i * 0.08}s ease`,
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = `${f.color}55`;
              e.currentTarget.style.boxShadow = `0 0 40px ${f.color}18`;
              e.currentTarget.style.transform = 'translateY(-3px)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'var(--border)';
              e.currentTarget.style.boxShadow = 'none';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
            >
              {/* Glow corner */}
              <div style={{ position: 'absolute', top: 0, right: 0, width: 120, height: 120, background: `radial-gradient(circle at top right, ${f.color}18, transparent 70%)`, pointerEvents: 'none' }} />

              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
               <div style={{
                    width: 44, height: 44, borderRadius: 12,
                    background: `${f.color}18`, border: `1px solid ${f.color}35`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22,
                  }}><i className={`fas ${f.icon}`} style={{ color: f.color }}></i></div>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: f.color, letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 600 }}>
                  {f.tag}
                </span>
              </div>

              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 19, fontWeight: 700, color: 'white', marginBottom: 10 }}>
                {f.title}
              </h3>
              <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.75 }}>
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProvidersSection() {
  const ref = useRef(null);
  const inView = useInView(ref);
  const providers = [
    { icon: 'fa-seedling', label: 'Farmers', count: '100+ ready', desc: 'Fresh produce, bulk grains, seasonal crops direct to buyers' },
    { icon: 'fa-utensils', label: 'Chefs', count: '20+ ready', desc: 'Private dining, pop-ups, meal prep, corporate catering' },
    { icon: 'fa-birthday-cake', label: 'Bakers', count: '65+ ready', desc: 'Artisan bread, custom cakes, pastries for events and retail' },
    { icon: 'fa-clipboard-list', label: 'Caterers', count: '90+ ready', desc: 'Full-service event catering for every occasion and scale' },
    { icon: 'fa-apple-alt', label: 'Meal Prep', count: '40+ ready', desc: 'Weekly and monthly subscription-based healthy meal plans' },
    { icon: 'fa-cocktail', label: 'Bartenders', count: '55+ ready', desc: 'Expert mixologists for corporate, private, and public events' },
  ];

  return (
    <section ref={ref} style={{ padding: '100px 24px', background: 'linear-gradient(to bottom, transparent, rgba(26,91,46,0.06), transparent)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 64, opacity: inView ? 1 : 0, transition: 'all 0.6s ease' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--green-400)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 12 }}>
            // THE NETWORK
          </div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 800, letterSpacing: '-0.03em' }}>
            Six Provider Categories.<br />
            <span style={{ color: 'var(--green-400)' }}>One Unified Platform.</span>
          </h2>
          <p style={{ marginTop: 16, fontSize: 16, color: 'var(--text-muted)', maxWidth: 480, margin: '16px auto 0' }}>
            Every food and beverage professional — from farm to bar — has a home on FreshLink.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 12 }}>
          {providers.map((p, i) => (
            <div key={i} style={{
              padding: '28px 24px', border: '1px solid var(--border)', borderRadius: 14,
              background: 'rgba(10,31,16,0.4)', display: 'flex', gap: 18, alignItems: 'flex-start',
              opacity: inView ? 1 : 0,
              transform: inView ? 'none' : 'translateY(20px)',
              transition: `all 0.5s ${i * 0.07}s ease`,
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(78,175,125,0.3)'; e.currentTarget.style.background = 'rgba(46,139,87,0.06)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.background = 'rgba(10,31,16,0.4)'; }}
            >
               <div style={{ width: 48, height: 48, borderRadius: 12, background: 'rgba(46,139,87,0.12)', border: '1px solid rgba(78,175,125,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, flexShrink: 0 }}>
                <i className={`fas ${p.icon}`} style={{ color: 'var(--green-400)' }}></i>
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
                  <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 17, color: 'white' }}>{p.label}</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--green-400)', letterSpacing: '0.05em' }}>{p.count}</span>
                </div>
                <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.6 }}>{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ImageBreakSection() {
  const ref = useRef(null);
  const inView = useInView(ref);
  return (
    <section ref={ref} style={{ padding: '60px 24px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{
          position: 'relative', borderRadius: 24, overflow: 'hidden',
          border: '1px solid var(--border)',
          opacity: inView ? 1 : 0, transform: inView ? 'none' : 'scale(0.97)',
          transition: 'all 0.8s ease',
        }}>
          <img src={KITCHEN_IMAGE} alt="Modern kitchen" style={{ width: '100%', height: 420, objectFit: 'cover', display: 'block' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(5,18,9,0.85) 40%, transparent)' }} />
          <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '48px 56px', maxWidth: 560 }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--green-400)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 12 }}>
              // OUR MISSION
            </div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.15, marginBottom: 16 }}>
              Revolutionizing the Supply Chain from Soil to Shelf
            </h2>
            <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.65)', lineHeight: 1.75, marginBottom: 28 }}>
              The food economy is fragmented, opaque, and inefficient. We're building the intelligence layer that fixes it — for everyone in the chain.
            </p>
            <div style={{ display: 'flex', gap: 32 }}>
              {[['$500K', 'Year 1 GMV Goal'], ['18mo', 'To Profitability'], ['9.5%', 'Market CAGR']].map(([v, l]) => (
                <div key={l}>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 800, color: 'var(--green-400)' }}>{v}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginTop: 2 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Floating tag */}
          <div style={{ position: 'absolute', top: 24, right: 24, background: 'rgba(10,31,16,0.8)', backdropFilter: 'blur(20px)', border: '1px solid rgba(78,175,125,0.25)', borderRadius: 100, padding: '8px 16px', display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--green-400)', animation: 'pulse-ring 2s infinite' }} />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--green-300)', letterSpacing: '0.08em' }}>LAUNCHING 2025</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function RoadmapSection() {
  const ref = useRef(null);
  const inView = useInView(ref);
  const colors = ['var(--text-muted)', 'var(--green-400)', 'var(--green-500)', 'var(--amber)'];

  return (
    <section id="roadmap" ref={ref} style={{ padding: '100px 24px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ marginBottom: 64, opacity: inView ? 1 : 0, transition: 'all 0.6s ease' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--green-400)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 12 }}>// ROADMAP</div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 800, letterSpacing: '-0.03em' }}>
            From Zero to <span style={{ color: 'var(--green-400)' }}>Market Leader</span>
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 0, border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden' }}>
          {TIMELINE.map((t, i) => (
            <div key={i} style={{
              padding: '36px 28px',
              borderRight: i < TIMELINE.length - 1 ? '1px solid var(--border)' : 'none',
              background: i === 1 ? 'rgba(46,139,87,0.05)' : 'rgba(10,31,16,0.4)',
              opacity: inView ? 1 : 0,
              transform: inView ? 'none' : 'translateY(20px)',
              transition: `all 0.6s ${i * 0.1}s ease`,
              position: 'relative',
            }}>
              {i === 1 && (
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(to right, transparent, var(--green-500), transparent)' }} />
              )}
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-muted)', letterSpacing: '0.08em', marginBottom: 12 }}>{t.phase}</div>
              <div style={{
                display: 'inline-block',
                fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 13,
                color: colors[i], border: `1px solid ${colors[i]}55`,
                borderRadius: 6, padding: '3px 10px', marginBottom: 16, letterSpacing: '0.08em',
              }}>{t.label}</div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, color: 'white', marginBottom: 16 }}>{t.title}</h3>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
                {t.items.map((item, j) => (
                  <li key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 13, color: 'var(--text-muted)' }}>
                    <span style={{ color: colors[i], marginTop: 2, flexShrink: 0 }}>›</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function WaitlistCTASection() {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref);

  const roles = ['Consumer', 'Chef / Baker', 'Farmer', 'Caterer / Bartender', 'Restaurant / Hotel', 'Investor'];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && email.includes('@')) setSubmitted(true);
  };

  return (
    <section id="about" ref={ref} style={{ padding: '100px 24px' }}>
      <div style={{ maxWidth: 700, margin: '0 auto', textAlign: 'center' }}>
        <div style={{ opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(30px)', transition: 'all 0.7s ease' }}>
          {/* Glow ring */}
          <div style={{
            width: 80, height: 80, borderRadius: '50%', margin: '0 auto 32px',
            background: 'radial-gradient(circle, rgba(46,139,87,0.2), transparent)',
            border: '1px solid rgba(78,175,125,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 36,
          }}>🌿</div>

          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--green-400)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 16 }}>
            // EARLY ACCESS
          </div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(36px, 6vw, 60px)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1.1, marginBottom: 20 }}>
            Be First to the<br />
            <span style={{ color: 'var(--green-400)' }}>Fresh Revolution</span>
          </h2>
          <p style={{ fontSize: 16, color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: 48 }}>
            Join thousands of food professionals and consumers waiting to reshape how food is discovered, booked, and delivered. Early access. Launch city priority. And a story to tell.
          </p>

          {!submitted ? (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Email address"
                  required
                  style={{
                    background: 'rgba(10,31,16,0.8)', border: '1px solid var(--border)', borderRadius: 10,
                    color: 'white', padding: '14px 18px', fontSize: 14, fontFamily: 'var(--font-body)',
                    transition: 'border-color 0.2s',
                  }}
                  onFocus={e => e.target.style.borderColor = 'rgba(78,175,125,0.5)'}
                  onBlur={e => e.target.style.borderColor = 'var(--border)'}
                />
                <select
                  value={role}
                  onChange={e => setRole(e.target.value)}
                  style={{
                    background: 'rgba(10,31,16,0.8)', border: '1px solid var(--border)', borderRadius: 10,
                    color: role ? 'white' : 'var(--text-muted)', padding: '14px 18px', fontSize: 14,
                    fontFamily: 'var(--font-body)', cursor: 'pointer', WebkitAppearance: 'none',
                  }}
                >
                  <option value="" disabled>I am a...</option>
                  {roles.map(r => <option key={r} value={r} style={{ background: '#0a1f10' }}>{r}</option>)}
                </select>
              </div>
              <button type="submit" style={{
                background: 'linear-gradient(135deg, #2e8b57, #1a5b2e)',
                color: 'white', border: '1px solid rgba(78,175,125,0.3)',
                borderRadius: 10, padding: '16px 32px', fontSize: 15,
                fontWeight: 700, cursor: 'pointer',
                fontFamily: 'var(--font-display)', letterSpacing: '0.02em',
                boxShadow: '0 0 40px rgba(46,139,87,0.3)',
                transition: 'all 0.2s',
              }}
              onMouseEnter={e => { e.target.style.transform = 'translateY(-2px)'; e.target.style.boxShadow = '0 8px 50px rgba(46,139,87,0.45)'; }}
              onMouseLeave={e => { e.target.style.transform = 'none'; e.target.style.boxShadow = '0 0 40px rgba(46,139,87,0.3)'; }}
              >
                Request Early Access →
              </button>
              <p style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                No spam, ever. Unsubscribe anytime. We respect your inbox.
              </p>
            </form>
          ) : (
            <div style={{
              background: 'rgba(46,139,87,0.1)', border: '1px solid rgba(78,175,125,0.3)',
              borderRadius: 16, padding: '40px 32px', animation: 'fadeIn 0.5s ease',
            }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>🎉</div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 800, color: 'var(--green-300)', marginBottom: 8 }}>
                You're on the list!
              </div>
              <p style={{ fontSize: 15, color: 'var(--text-muted)', lineHeight: 1.7 }}>
                Welcome to the future of food. We'll be in touch with launch updates, city announcements, and your early access invite.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{ borderTop: '1px solid var(--border)', padding: '48px 24px', marginTop: 40 }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 40, marginBottom: 40 }}>
          <div style={{ maxWidth: 300 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: 'linear-gradient(135deg, #2e8b57, #1a5b2e)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>🌿</div>
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 20 }}>
                Fresh<span style={{ color: 'var(--green-400)' }}>Link</span>
              </span>
            </div>
            <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.7 }}>
              AI-powered food & beverage marketplace. Own nothing. Connect everything. Profit at every transaction.
            </p>
          </div>
          <div style={{ display: 'flex', gap: 60, flexWrap: 'wrap' }}>
            {[
              { title: 'Product', links: ['How It Works', 'Features', 'Roadmap', 'Pricing'] },
              { title: 'Company', links: ['About', 'Blog', 'Careers', 'Press'] },
              { title: 'Legal', links: ['Privacy Policy', 'Terms of Service', 'Cookie Policy'] },
            ].map(col => (
              <div key={col.title}>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 13, color: 'white', marginBottom: 16, letterSpacing: '0.05em' }}>{col.title}</div>
                {col.links.map(link => (
                  <div key={link} style={{ marginBottom: 10 }}>
                    <a href="#" style={{ fontSize: 13, color: 'var(--text-muted)', textDecoration: 'none', transition: 'color 0.2s' }}
                      onMouseEnter={e => e.target.style.color = 'var(--green-300)'}
                      onMouseLeave={e => e.target.style.color = 'var(--text-muted)'}
                    >{link}</a>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div style={{ borderTop: '1px solid var(--border)', paddingTop: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
          <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>© 2025 FreshLink Inc. All rights reserved.</div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--green-600)', letterSpacing: '0.1em' }}>
            v0.1.0-beta · BUILDING IN PUBLIC
          </div>
        </div>
      </div>
    </footer>
  );
}

// Mobile bottom nav
function MobileNav() {
  const [active, setActive] = useState('home');
  const items = [
    { id: 'home', icon: '⌂', label: 'Home', href: '#hero' },
    { id: 'market', icon: '◫', label: 'Market', href: '#features' },
    { id: 'analytics', icon: '↗', label: 'Insights', href: '#roadmap' },
    { id: 'profile', icon: '◯', label: 'Profile', href: '#waitlist' },
  ];
  return (
    <nav style={{
      position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 100,
      background: 'rgba(5,18,9,0.95)', backdropFilter: 'blur(20px)',
      borderTop: '1px solid var(--border)',
      display: 'flex', padding: '8px 0 20px',
    }} className="mobile-nav">
      {items.map(item => (
        <a key={item.id} href={item.href} onClick={() => setActive(item.id)} style={{
          flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
          textDecoration: 'none', padding: '6px 4px',
          color: active === item.id ? 'var(--green-400)' : 'var(--text-muted)',
          transition: 'color 0.2s',
        }}>
          <span style={{ fontSize: 20 }}>{item.icon}</span>
          <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>{item.label}</span>
        </a>
      ))}
    </nav>
  );
}

// ─── APP ──────────────────────────────────────────────────────
export default function App() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div style={{ position: 'relative' }}>
      <GridBackground />
      <Navbar scrolled={scrolled} />
      <main style={{ position: 'relative', zIndex: 1, paddingBottom: 80 }}>
        <HeroSection />
        <StatsSection />
        <HowItWorksSection />
        <FeaturesSection />
        <ProvidersSection />
        <ImageBreakSection />
        <RoadmapSection />
        <WaitlistCTASection />
      </main>
      <Footer />
      <MobileNav />

      {/* Global styles for responsive */}
      <style>{`
        @media (max-width: 640px) {
          .desktop-nav { display: none !important; }
        }
        @media (min-width: 641px) {
          .mobile-nav { display: none !important; }
        }
      `}</style>
    </div>
  );
}
