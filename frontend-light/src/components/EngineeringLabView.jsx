import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  Zap,
  Layers,
  Radio,
  Activity,
  Compass,
  CheckCircle2,
  ArrowRight,
  Gauge,
  Sliders,
  Wind,
  Cpu,
  RotateCw,
  Sparkles,
  Lock,
  ChevronRight,
  Maximize2
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useScrollReveal } from '../hooks/useScrollReveal';

export const EngineeringLabView = ({ onSelectEdition }) => {
  const { isRtl } = useLanguage();
  useScrollReveal('.kz-reveal', []);

  const [testSpeed, setTestSpeed] = useState(140); // 60 - 180 km/h

  // Dynamic engineering telemetry calculations
  const holdingTorque = 45; // Nm constant planetary lock
  // Deflection angle computed dynamically based on speed
  const whipDeflection = testSpeed <= 80 ? 0.0 : testSpeed <= 130 ? 0.1 : Number((0.1 + (testSpeed - 130) * 0.0035).toFixed(1));
  // Dynamic wind load force in Newtons: F = 0.5 * rho * v^2 * Cd * A
  const windForceN = Math.round(0.5 * 1.225 * Math.pow(testSpeed / 3.6, 2) * 0.82 * 0.038 * 8);
  const signalAttenuation = '< 0.08 dB';
  const sweepTransitTime = '2.8s';

  const engineeringPillars = [
    {
      icon: <Zap size={22} color="var(--kz-crimson)" />,
      num: '01',
      title: isRtl ? 'مخفض التروس الكوكبي 45 نيوتن متر' : '45 Nm Planetary Gear Reducer',
      spec: '45 Nm Holding Torque',
      tag: 'POWERTRAIN',
      desc: isRtl
        ? 'نظام تروس فولاذي مقسى يولد عزم تثبيت استثنائي يمنع تذبذب الهوائيات الطويلة (VHF/UHF) عند سرعات الصحراء العالية حتى 160 كم/س.'
        : 'Internal precision planetary gearset delivers 45 Nm of dynamic holding torque, locking fiberglass and steel antenna whips rigidly at speeds up to 160 km/h with zero deflection.'
    },
    {
      icon: <ShieldCheck size={22} color="var(--kz-crimson)" />,
      num: '02',
      title: isRtl ? 'عزل صحراوي هرمسي IP67' : 'IP67 Hermetic Environmental Seal',
      spec: 'Dual Viton O-Rings',
      tag: 'INGRESS BARRIER',
      desc: isRtl
        ? 'حلقات إحكام مزدوجة من مادة الفيتون المقاومة للحرارة والرمال الناعمة تضمن منع تسرب الغبار الدقيق ورذاذ مياه البحر الساحلية والرطوبة العالية.'
        : 'Engineered with dual high-temperature Viton O-ring seals, safeguarding internal windings against micro-fine desert silica dust, coastal Gulf brine, and torrential downpours.'
    },
    {
      icon: <Layers size={22} color="var(--kz-crimson)" />,
      num: '03',
      title: isRtl ? 'سبيكة طيران 6061-T6 معالجة حرارياً' : '6061-T6 Aerospace Billet Housing',
      spec: 'Hard-Anodized Multi-Layer',
      tag: 'METALLURGY',
      desc: isRtl
        ? 'هيكل مصبوب ومخروط باستخدام الحاسب الآلي (CNC) من سبائك الألومنيوم المستخدمة في صناعة الطائرات، مطلي بطبقات كروم تقاوم التآكل والأشعة فوق البنفسجية.'
        : 'Monolithic CNC-milled chassis crafted from aviation-grade 6061-T6 aluminum, finished with sacrificial and decorative electroplated coatings to resist intense desert UV and impact vibrations.'
    },
    {
      icon: <Radio size={22} color="var(--kz-crimson)" />,
      num: '04',
      title: isRtl ? 'نقل تردد بدون فقد RF < 0.1 dB' : 'Zero RF Insertion Loss Conduit',
      spec: '136 MHz – 470 MHz',
      tag: 'RF TELEMETRY',
      desc: isRtl
        ? 'مسار إشارة لاسلكية معزول كهربائياً ومطلي بالذهب يضمن صفاء الإرسال والاستقبال عبر أجهزة الموتورولا والآيكوم بدون أي تشويش محرك.'
        : 'Gold-plated coaxial grounding architecture delivers ultra-low insertion loss (<0.1 dB) across entire VHF and UHF bands, ensuring crystal-clear transmission with zero alternator noise.'
    }
  ];

  const telemetryMetrics = [
    { label: isRtl ? 'عزم التثبيت' : 'Holding Torque', val: '45 Nm', sub: 'Planetary Gear', icon: Zap },
    { label: isRtl ? 'معيار العزل' : 'Ingress Rating', val: 'IP67', sub: 'Hermetic Sealed', icon: ShieldCheck },
    { label: isRtl ? 'سرعة الرفع' : 'Transit Time', val: '2.8s', sub: '90° Rapid Sweep', icon: RotateCw },
    { label: isRtl ? 'مقاومة التردد' : 'Insertion Loss', val: '< 0.08 dB', sub: '136–470 MHz', icon: Radio }
  ];

  const speedPresets = [
    { label: isRtl ? '٦٠ كم/س (كثبان)' : '60 km/h (Dunes)', speed: 60 },
    { label: isRtl ? '١٢٠ كم/س (سريع)' : '120 km/h (Highway)', speed: 120 },
    { label: isRtl ? '١٦٠ كم/س (عاصفة)' : '160 km/h (Storm)', speed: 160 },
    { label: isRtl ? '١٨٠ كم/س (أقصى)' : '180 km/h (Extreme)', speed: 180 }
  ];

  // Calculate mast top displacement in SVG coordinate space
  const mastTipX = 400 + whipDeflection * 75;

  return (
    <div className="kz-pdp-container kz-engineering-view">
      <div className="kz-container">
        {/* Header Section */}
        <div className="kz-reveal" style={{ maxWidth: '780px', marginBottom: '40px' }}>
          <div className="kz-tag-telemetry" style={{ marginBottom: '16px' }}>
            <span className="kz-live-indicator" />
            <span>{isRtl ? 'مختبر الهندسة والتطوير الميداني // الدوحة' : 'DOHA FIELD ENGINEERING LAB & TELEMETRY'}</span>
          </div>

          <h1 className="kz-hero-h1" style={{ fontSize: 'clamp(2.3rem, 4.2vw, 3.5rem)', marginTop: '8px' }}>
            {isRtl ? 'الهندسة الصحراوية' : 'Engineering'}{' '}
            <span className="kz-serif-accent" style={{ color: 'var(--kz-crimson)' }}>
              {isRtl ? 'فائقة الدقة.' : 'Architecture.'}
            </span>
          </h1>

          <p className="kz-hero-lede" style={{ marginTop: '14px' }}>
            {isRtl
              ? 'تم تطوير موتور وهوائيات كزاز بعد مئات الآلاف من الكيلومترات من الاختبارات الميدانية القاسية عبر رمال قطر والخليج العربي.'
              : 'Stress-tested across extreme GCC desert dunes, corrugated highway washboards, and coastal salt-spray climates.'}
          </p>
        </div>

        {/* Live Metrics Ticker Strip */}
        <div className="kz-reveal kz-delay-1" style={{ marginBottom: '44px' }}>
          <div className="kz-engineering-metrics-bar">
            {telemetryMetrics.map((m, idx) => {
              const Icon = m.icon;
              return (
                <div key={idx} className="kz-engineering-metric-cell">
                  <div className="kz-metric-cell-icon">
                    <Icon size={16} color="var(--kz-crimson)" />
                  </div>
                  <div>
                    <div className="kz-metric-cell-val">{m.val}</div>
                    <div className="kz-metric-cell-lbl">{m.label} · <span style={{ color: 'var(--kz-text-muted)' }}>{m.sub}</span></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Interactive Telemetry & Velocity Simulator */}
        <div className="kz-double-bezel kz-reveal kz-delay-1" style={{ marginBottom: '56px' }}>
          <div className="kz-double-bezel-inner kz-engineering-sim-card" style={{ padding: '32px' }}>
            {/* Simulator Header */}
            <div className="kz-sim-header">
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                  <span className="kz-live-indicator" />
                  <span style={{ fontFamily: 'var(--kz-font-mono)', fontSize: '0.74rem', fontWeight: 700, color: 'var(--kz-crimson)', letterSpacing: '0.06em' }}>
                    AERODYNAMIC RIG // TELEMETRY SIMULATOR
                  </span>
                </div>
                <h2 style={{ fontFamily: 'var(--kz-font-display)', fontSize: '1.35rem', fontWeight: 800, margin: 0 }}>
                  {isRtl ? 'محاكي ثبات الهوائي وسرعة الرياح الميدانية' : 'Dynamic Velocity & Deflection Telemetry Rig'}
                </h2>
                <p style={{ fontSize: '0.86rem', color: 'var(--kz-text-secondary)', marginTop: '4px' }}>
                  {isRtl ? 'حرك المؤشر لاختبار استجابة المحرك وتروس التثبيت عند سرعات مختلفة' : 'Simulate extreme desert wind drag & highway turbulence against the 45 Nm planetary powertrain'}
                </p>
              </div>

              <div className="kz-sim-status-pill">
                <span className="kz-live-indicator" />
                <span style={{ fontFamily: 'var(--kz-font-mono)', fontSize: '0.78rem', fontWeight: 700, color: '#0F172A' }}>
                  PLANETARY LOCK: 100% RIGID
                </span>
              </div>
            </div>

            {/* High-End CAD Telemetry Visualizer Stage */}
            <div className="kz-cad-stage-wrap">
              {/* Telemetry HUD Overlays */}
              <div className="kz-cad-hud-top">
                <div className="kz-cad-hud-item">
                  <span className="kz-cad-hud-lbl">WIND VECTOR</span>
                  <span className="kz-cad-hud-val">{testSpeed} KM/H</span>
                </div>
                <div className="kz-cad-hud-item">
                  <span className="kz-cad-hud-lbl">HOLDING TORQUE</span>
                  <span className="kz-cad-hud-val" style={{ color: '#10B981' }}>45.0 NM (LOCKED)</span>
                </div>
                <div className="kz-cad-hud-item">
                  <span className="kz-cad-hud-lbl">DEFLECTION ANGLE</span>
                  <span className="kz-cad-hud-val" style={{ color: whipDeflection > 0.15 ? '#F59E0B' : '#38BDF8' }}>
                    {whipDeflection}°
                  </span>
                </div>
                <div className="kz-cad-hud-item">
                  <span className="kz-cad-hud-lbl">DYNAMIC FORCE</span>
                  <span className="kz-cad-hud-val">{windForceN} N</span>
                </div>
              </div>

              {/* High-Precision SVG Rig Graphic */}
              <div className="kz-cad-svg-container">
                <svg
                  viewBox="0 0 800 240"
                  className="kz-cad-svg"
                  preserveAspectRatio="xMidYMid meet"
                >
                  <defs>
                    {/* Metallic motor gradients */}
                    <linearGradient id="billetGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#1E293B" />
                      <stop offset="30%" stopColor="#475569" />
                      <stop offset="50%" stopColor="#94A3B8" />
                      <stop offset="70%" stopColor="#334155" />
                      <stop offset="100%" stopColor="#0F172A" />
                    </linearGradient>

                    <linearGradient id="chromeCapGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#F8FAFC" />
                      <stop offset="50%" stopColor="#CBD5E1" />
                      <stop offset="100%" stopColor="#64748B" />
                    </linearGradient>

                    <linearGradient id="mastGrad" x1="0%" y1="100%" x2="0%" y2="0%">
                      <stop offset="0%" stopColor="#94A3B8" />
                      <stop offset="30%" stopColor="var(--kz-crimson)" />
                      <stop offset="100%" stopColor="#F43F5E" />
                    </linearGradient>

                    <linearGradient id="aeroFlowGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="rgba(56, 189, 248, 0.05)" />
                      <stop offset="50%" stopColor="rgba(56, 189, 248, 0.45)" />
                      <stop offset="100%" stopColor="rgba(244, 63, 94, 0.7)" />
                    </linearGradient>

                    <pattern id="cadGrid" width="24" height="24" patternUnits="userSpaceOnUse">
                      <path d="M 24 0 L 0 0 0 24" fill="none" stroke="rgba(255, 255, 255, 0.04)" strokeWidth="1" />
                    </pattern>
                  </defs>

                  {/* CAD Grid Backdrop */}
                  <rect width="800" height="240" fill="url(#cadGrid)" />

                  {/* Caliper Angle Protractor Grid */}
                  <path d="M 320,180 A 140,140 0 0,1 480,180" fill="none" stroke="rgba(255, 255, 255, 0.08)" strokeDasharray="4 4" strokeWidth="1.5" />
                  <line x1="400" y1="180" x2="400" y2="40" stroke="rgba(255, 255, 255, 0.12)" strokeDasharray="2 4" strokeWidth="1" />
                  <text x="404" y="50" fill="rgba(255, 255, 255, 0.35)" fontSize="9" fontFamily="monospace">0.0°</text>
                  <text x="465" y="65" fill="rgba(255, 255, 255, 0.25)" fontSize="8" fontFamily="monospace">+5.0°</text>

                  {/* Aerodynamic Streamlines (Speed-Responsive Velocity Vectors) */}
                  <path
                    d={`M 20,40 C 260,${40 + whipDeflection * 15} 440,${40 + whipDeflection * 30} 780,${40 + whipDeflection * 45}`}
                    fill="none"
                    stroke="url(#aeroFlowGrad)"
                    strokeWidth={testSpeed > 140 ? '2.5' : '1.5'}
                    strokeDasharray="16 8"
                    className="kz-cad-streamline fast"
                  />
                  <path
                    d={`M 20,80 C 280,${80 + whipDeflection * 20} 460,${80 + whipDeflection * 35} 780,${80 + whipDeflection * 55}`}
                    fill="none"
                    stroke="url(#aeroFlowGrad)"
                    strokeWidth={testSpeed > 140 ? '3' : '2'}
                    strokeDasharray="20 10"
                    className="kz-cad-streamline"
                  />
                  <path
                    d={`M 20,120 C 300,${120 + whipDeflection * 16} 470,${120 + whipDeflection * 28} 780,${120 + whipDeflection * 40}`}
                    fill="none"
                    stroke="url(#aeroFlowGrad)"
                    strokeWidth="1.5"
                    strokeDasharray="14 7"
                    className="kz-cad-streamline slow"
                  />
                  <path
                    d={`M 20,155 C 320,${155 + whipDeflection * 8} 480,${155 + whipDeflection * 14} 780,${155 + whipDeflection * 22}`}
                    fill="none"
                    stroke="url(#aeroFlowGrad)"
                    strokeWidth="1"
                    strokeDasharray="10 5"
                    className="kz-cad-streamline"
                  />

                  {/* Vehicle Roof Plinth Base Mount */}
                  <rect x="300" y="212" width="200" height="8" rx="2" fill="#334155" />
                  <line x1="280" y1="220" x2="520" y2="220" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="1" />

                  {/* Kazez Billet Aluminum Motor Housing (CNC Step Contour) */}
                  {/* Lower chassis body */}
                  <rect x="355" y="174" width="90" height="38" rx="5" fill="url(#billetGrad)" stroke="#64748B" strokeWidth="1.5" />
                  {/* Viton Seal O-Ring Groove */}
                  <line x1="355" y1="186" x2="445" y2="186" stroke="#0F172A" strokeWidth="2.5" />
                  {/* CNC Chamfer Accent */}
                  <line x1="360" y1="178" x2="440" y2="178" stroke="rgba(255, 255, 255, 0.35)" strokeWidth="1" />
                  {/* Upper Rotating Swivel Collar */}
                  <rect x="375" y="152" width="50" height="22" rx="4" fill="url(#chromeCapGrad)" stroke="#475569" strokeWidth="1.5" />
                  {/* Planetary Lock Pivot Pin */}
                  <circle cx="400" cy="163" r="5" fill="#0F172A" stroke="#CBD5E1" strokeWidth="1.5" />

                  {/* Antenna Mast (Dynamically flexes with high-precision curve based on testSpeed) */}
                  <path
                    d={`M 400,152 Q ${400 + whipDeflection * 25},${90} ${mastTipX},25`}
                    fill="none"
                    stroke="url(#mastGrad)"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    className="kz-cad-mast"
                  />

                  {/* Antenna Tip Beacon LED */}
                  <circle cx={mastTipX} cy="25" r="4.5" fill="#10B981" />
                  <circle cx={mastTipX} cy="25" r="9" fill="none" stroke="#10B981" strokeWidth="1.2" opacity="0.6" className="kz-ping-ring" />

                  {/* Deflection Dimension Annotation */}
                  {whipDeflection > 0.0 && (
                    <g className="kz-cad-annotation">
                      <line x1="400" y1="25" x2={mastTipX} y2="25" stroke="#F59E0B" strokeWidth="1" strokeDasharray="2 2" />
                      <text x={mastTipX + 12} y="28" fill="#F59E0B" fontSize="10" fontFamily="monospace" fontWeight="bold">
                        Δ {whipDeflection}°
                      </text>
                    </g>
                  )}

                  {/* Grounding Telemetry Icon */}
                  <text x="362" y="200" fill="rgba(255, 255, 255, 0.5)" fontSize="8" fontFamily="monospace">6061-T6 // 45 Nm</text>
                </svg>
              </div>

              {/* Bottom HUD Bar */}
              <div className="kz-cad-hud-bottom">
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Cpu size={14} color="#38BDF8" />
                  <span>DOHA TELEMETRY RIG: SENSOR CALIBRATED ±0.01°</span>
                </div>
                <div>
                  <span>RF CONTINUITY: 100% · GROUNDED</span>
                </div>
              </div>
            </div>

            {/* Velocity Slider & Interactive Speed Chips */}
            <div style={{ marginTop: '28px', marginBottom: '32px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', marginBottom: '14px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Wind size={18} color="var(--kz-crimson)" />
                  <span style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--kz-text-primary)' }}>
                    {isRtl ? 'سرعة المركبة / الرياح الميدانية' : 'Simulated Vehicle Velocity'}
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontFamily: 'var(--kz-font-mono)', fontSize: '1.8rem', fontWeight: 800, color: 'var(--kz-crimson)', lineHeight: 1 }}>
                    {testSpeed}
                  </span>
                  <span style={{ fontFamily: 'var(--kz-font-mono)', fontSize: '0.88rem', fontWeight: 800, color: 'var(--kz-text-muted)' }}>
                    KM/H
                  </span>
                </div>
              </div>

              {/* Interactive Range Input */}
              <div className="kz-slider-track-wrap">
                <input
                  type="range"
                  min="60"
                  max="180"
                  step="5"
                  value={testSpeed}
                  onChange={(e) => setTestSpeed(Number(e.target.value))}
                  className="kz-engineering-slider"
                  aria-label="Velocity slider control"
                />
              </div>

              {/* Speed Preset Quick Chips */}
              <div className="kz-speed-presets-row">
                {speedPresets.map((preset) => (
                  <button
                    key={preset.speed}
                    type="button"
                    className={`kz-speed-preset-btn ${testSpeed === preset.speed ? 'active' : ''}`}
                    onClick={() => setTestSpeed(preset.speed)}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 4 Output Gauges (Rock-Solid 4-Column Responsive Grid) */}
            <div className="kz-lab-gauges-grid">
              <div className="kz-lab-gauge-card">
                <div className="kz-lab-gauge-title">
                  {isRtl ? 'عزم التثبيت الفعلي' : 'Holding Powertrain'}
                </div>
                <div className="kz-lab-gauge-num">
                  {holdingTorque} <span className="kz-gauge-unit">Nm</span>
                </div>
                <div className="kz-gauge-bar-track">
                  <div className="kz-gauge-bar-fill" style={{ width: '100%', background: '#10B981' }} />
                </div>
                <div className="kz-gauge-status-msg" style={{ color: '#15803D' }}>
                  <CheckCircle2 size={12} /> Zero Slip Planetary Lock
                </div>
              </div>

              <div className="kz-lab-gauge-card">
                <div className="kz-lab-gauge-title">
                  {isRtl ? 'انحراف زاوية الهوائي' : 'Whip Deflection'}
                </div>
                <div className="kz-lab-gauge-num" style={{ color: testSpeed > 150 ? '#D97706' : 'var(--kz-text-primary)' }}>
                  {whipDeflection}<span className="kz-gauge-unit">°</span>
                </div>
                <div className="kz-gauge-bar-track">
                  <div className="kz-gauge-bar-fill" style={{ width: `${Math.min(100, whipDeflection * 300)}%`, background: testSpeed > 150 ? '#D97706' : '#38BDF8' }} />
                </div>
                <div className="kz-gauge-status-msg" style={{ color: '#15803D' }}>
                  <CheckCircle2 size={12} /> Anti-Flutter Damping
                </div>
              </div>

              <div className="kz-lab-gauge-card">
                <div className="kz-lab-gauge-title">
                  {isRtl ? 'مقاومة الحمل الديناميكي' : 'Wind Load Force'}
                </div>
                <div className="kz-lab-gauge-num">
                  {windForceN} <span className="kz-gauge-unit">N</span>
                </div>
                <div className="kz-gauge-bar-track">
                  <div className="kz-gauge-bar-fill" style={{ width: `${(windForceN / 160) * 100}%`, background: 'var(--kz-crimson)' }} />
                </div>
                <div className="kz-gauge-status-msg" style={{ color: '#15803D' }}>
                  <CheckCircle2 size={12} /> 6061-T6 Structural Rigid
                </div>
              </div>

              <div className="kz-lab-gauge-card">
                <div className="kz-lab-gauge-title">
                  {isRtl ? 'فقد الإشارة اللاسلكية' : 'RF Insertion Loss'}
                </div>
                <div className="kz-lab-gauge-num">
                  &lt; 0.08 <span className="kz-gauge-unit">dB</span>
                </div>
                <div className="kz-gauge-bar-track">
                  <div className="kz-gauge-bar-fill" style={{ width: '8%', background: '#10B981' }} />
                </div>
                <div className="kz-gauge-status-msg" style={{ color: '#15803D' }}>
                  <CheckCircle2 size={12} /> Gold Coaxial Grounded
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Pillars Grid (Symmetric 2x2 with Staggered Scroll Reveal) */}
        <div style={{ marginBottom: '56px' }}>
          <div className="kz-reveal" style={{ marginBottom: '24px' }}>
            <h2 style={{ fontFamily: 'var(--kz-font-display)', fontSize: '1.45rem', fontWeight: 800, margin: 0 }}>
              {isRtl ? 'الركائز الهندسية الأربعة' : 'Four Foundational Engineering Pillars'}
            </h2>
            <p style={{ fontSize: '0.88rem', color: 'var(--kz-text-secondary)', marginTop: '4px' }}>
              {isRtl ? 'معايير تصنيع عسكرية لضمان أداء لا ينقطع في أشد الظروف الميدانية.' : 'Aerospace metallurgy and hermetic seals built to endure desert heat and corrugations.'}
            </p>
          </div>

          <div className="kz-engineering-pillars-grid">
            {engineeringPillars.map((p, idx) => (
              <div
                key={p.num}
                className={`kz-double-bezel kz-engineering-pillar-card kz-reveal kz-delay-${idx + 1}`}
              >
                <div className="kz-double-bezel-inner" style={{ display: 'flex', flexDirection: 'column', height: '100%', padding: '28px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                    <div
                      style={{
                        width: '46px',
                        height: '46px',
                        borderRadius: 'var(--kz-radius-md)',
                        background: 'var(--kz-surface-subtle)',
                        border: '1px solid var(--kz-border)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      {p.icon}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span className="kz-pillar-tag">{p.tag}</span>
                      <span style={{ fontFamily: 'var(--kz-font-mono)', fontSize: '0.9rem', fontWeight: 800, color: 'var(--kz-text-muted)' }}>
                        {p.num}
                      </span>
                    </div>
                  </div>

                  <h3 style={{ fontFamily: 'var(--kz-font-display)', fontSize: '1.2rem', fontWeight: 700, color: 'var(--kz-text-primary)', marginBottom: '6px' }}>
                    {p.title}
                  </h3>
                  <div style={{ fontFamily: 'var(--kz-font-mono)', fontSize: '0.82rem', color: 'var(--kz-crimson)', fontWeight: 700, marginBottom: '12px' }}>
                    {p.spec}
                  </div>
                  <p style={{ fontSize: '0.88rem', color: 'var(--kz-text-secondary)', lineHeight: '1.6', flexGrow: 1 }}>
                    {p.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Visual Story Panels with Parallax Zoom and Staggered Reveal */}
        <div className="kz-engineering-stories-grid" style={{ marginBottom: '56px' }}>
          <div className="kz-double-bezel kz-story-card kz-reveal kz-delay-1">
            <div className="kz-double-bezel-inner" style={{ padding: '0', overflow: 'hidden' }}>
              <div className="kz-story-img-wrap">
                <img
                  src="/assets/images/story-construction.webp"
                  alt="Forged Aluminum Construction"
                  className="kz-story-zoom-img"
                />
                <div className="kz-story-badge">METALLURGY // CNC BILLET</div>
              </div>
              <div style={{ padding: '26px' }}>
                <h3 style={{ fontFamily: 'var(--kz-font-display)', fontSize: '1.2rem', fontWeight: 700, marginBottom: '8px' }}>
                  {isRtl ? 'دقة التصنيع والسبك' : 'Forged Structural Integrity'}
                </h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--kz-text-secondary)', lineHeight: '1.6' }}>
                  {isRtl
                    ? 'يتم فحص كل وحدة كزاز عبر أشعة إكس لضمان خلو الهيكل المصبوب من أي فراغات هوائية مجهرية قبل مرحلة الطلاء الكهربائي.'
                    : 'Every motor chassis is machined from aviation-grade 6061-T6 billet and verified via ultrasonic non-destructive testing prior to electroplating.'}
                </p>
              </div>
            </div>
          </div>

          <div className="kz-double-bezel kz-story-card kz-reveal kz-delay-2">
            <div className="kz-double-bezel-inner" style={{ padding: '0', overflow: 'hidden' }}>
              <div className="kz-story-img-wrap">
                <img
                  src="/assets/images/story-performance.webp"
                  alt="Off-Road Performance"
                  className="kz-story-zoom-img"
                />
                <div className="kz-story-badge">TELEMETRY // FIELD RIG</div>
              </div>
              <div style={{ padding: '26px' }}>
                <h3 style={{ fontFamily: 'var(--kz-font-display)', fontSize: '1.2rem', fontWeight: 700, marginBottom: '8px' }}>
                  {isRtl ? 'اختبارات السرعة والاهتزاز' : 'Desert Velocity & Shock Rig'}
                </h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--kz-text-secondary)', lineHeight: '1.6' }}>
                  {isRtl
                    ? 'تمت معايرة زوايا رفع وخفض الهوائي بزمن 2.8 ثانية لمنح السائق تحكماً فورياً من داخل الكابينة دون مغادرة المقود.'
                    : 'Actuation sweep is synchronized to a swift 2.8-second 90° transit time, giving the driver immediate antenna deployment from the cockpit.'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Bar */}
        <div className="kz-lab-cta-card kz-reveal kz-delay-1">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <Sparkles size={16} color="var(--kz-crimson)" />
              <span style={{ fontFamily: 'var(--kz-font-mono)', fontSize: '0.76rem', fontWeight: 700, color: 'var(--kz-crimson)', letterSpacing: '0.04em' }}>
                OFFICIAL QATAR INVENTORY READY
              </span>
            </div>
            <h2 style={{ fontFamily: 'var(--kz-font-display)', fontSize: '1.45rem', fontWeight: 800, marginBottom: '6px' }}>
              {isRtl ? 'جاهز لترقية مركبتك بمحرك كزاز؟' : 'Ready to Equip Your Vehicle with Kazez?'}
            </h2>
            <p style={{ fontSize: '0.9rem', color: 'var(--kz-text-secondary)', margin: 0 }}>
              {isRtl ? 'شحن فوري ومباشر في قطر ودول مجلس التعاون الخليجي مع ضمان استبدال شامل.' : 'Direct courier dispatch across Qatar and the GCC with 1-Year replacement warranty.'}
            </p>
          </div>

          <div className="kz-lab-cta-actions">
            <button
              type="button"
              className="kz-btn kz-btn-primary kz-btn-lg"
              onClick={() => onSelectEdition('kazez-black')}
            >
              <span>{isRtl ? 'طلب الإصدار الأسود' : 'Configure Black Edition'}</span>
              <ArrowRight size={16} />
            </button>
            <button
              type="button"
              className="kz-btn kz-btn-secondary kz-btn-lg"
              onClick={() => onSelectEdition('kazez-silver')}
            >
              <span>{isRtl ? 'طلب الإصدار الفضي' : 'Configure Silver Edition'}</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
