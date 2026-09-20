import React, { useState } from 'react';
import { Shield, Zap, Activity, CheckCircle2, ChevronRight, ChevronLeft, Gauge, Radio, Droplets } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const EngineeringPage = ({ onSelectEdition }) => {
  const { t, isRtl } = useLanguage();
  const [activeTab, setActiveTab] = useState('metallurgy');

  const technicalSections = [
    {
      id: 'metallurgy',
      label: isRtl ? '01 / سبيكة 6061-T6' : '01 / 6061-T6 Metallurgy',
      icon: Shield,
      headline: isRtl ? 'هيكل صلب من ألمنيوم الطائرات المشكّل' : 'AEROSPACE-GRADE FORGED BILLET MONOCOQUE',
      subhead: isRtl ? 'تشغيل آلي فائق الدقة بتفاوت ±0.02 مم' : 'CNC MACHINED FROM SOLID ALUMINUM WITH ±0.02MM PRECISION TOLERANCE',
      description: isRtl
        ? 'على عكس القواعد الكهربائية التجارية المصنوعة من الألمنيوم المصبوب الهش أو البلاستيك، يبدأ كل هيكل كازيز ككتلة ألمنيوم 6061-T6 صلبة. تقوم مراكز CNC خماسية المحاور بنحت الهيكل من كتلة واحدة لمنع أي شقوق وتوفير أقصى صلابة حتى سرعة 220 كم/س في العواصف الصحراوية.'
        : 'Unlike mass-market motorized brackets constructed from brittle cast aluminum or injection-molded plastics, every Kazez chassis begins life as a solid forged block of 6061-T6 aerospace aluminum. High-speed 5-axis CNC machining centers mill each housing from a single billet, eliminating weak cast seams and guaranteeing structural integrity up to 220 km/h desert crosswinds.',
      specs: [
        { label: isRtl ? 'قوة الخضوع للشد' : 'Tensile Yield Strength', value: '276 MPa', bench: isRtl ? '+240% مقارنة بالمصبوب' : '+240% vs Cast Alloy' },
        { label: isRtl ? 'أقصى قوة شد' : 'Ultimate Tensile Strength', value: '310 MPa', bench: 'Aero Spec QQ-A-250/11' },
        { label: isRtl ? 'تفاوت السطح' : 'Surface Finish Tolerance', value: '±0.02 mm', bench: isRtl ? 'دقة 5 محاور فائقة' : '5-Axis High Precision' },
        { label: isRtl ? 'معيار الطلاء' : 'Coating Specification', value: 'MIL-A-8625 Type III', bench: isRtl ? 'أنودايز عسكري صلب' : 'Class 2 Hardcoat Anodize' }
      ],
      points: isRtl ? [
        'الهيكل الموحد الصلب يمتص الاهتزازات الصحراوية العنيفة دون أي إجهاد ميكانيكي.',
        'توصيل حراري عالي يمنع تراكم حرارة المحرك الداخلي في صيف الخليج عند 55 درجة مئوية.',
        'متوفر بالكروم الأسود التكتيكي الممتص للوهج أو طلاء الكروم الفضي العاكس ذو الخمس طبقات.'
      ] : [
        'Monolithic billet housing absorbs extreme desert vibration without harmonic fatigue.',
        'High-density thermal conductivity prevents internal motor heat buildup in 55°C Qatari summer heat.',
        'Available in Type III Hard Anodized Tactical Black or 5-layer Mirror Chrome Electroplate.'
      ]
    },
    {
      id: 'ingress',
      label: isRtl ? '02 / عزل IP67 المحكم' : '02 / IP67 Hermetic Sealing',
      icon: Droplets,
      headline: isRtl ? 'حماية فائقة من رمال الصحراء الناعمة وضغط المياه' : 'DESERT SAND & WATER PRESSURE INGRESS PROTECTION',
      subhead: isRtl ? 'مقاوم للغمر حتى عمق 1 متر مع حلقات Viton® المزدوجة' : 'SUBMERSIBLE TO 1 METER WITH CHEMICAL-RESISTANT VITON® FLUOROELASTOMER SEALS',
      description: isRtl
        ? 'القيادة في الكثبان الرملية تعرض المعدات لذرات غبار السيليكا الدقيقة ومحطات غسيل السيارات ذات الضغط العالي. يدمج كازيز حلقات Viton® مانعة للتسرب على محور الدوران ومنافذ الأسلاك، لحماية حجرة التروس بالكامل.'
        : 'Dune driving and off-road expeditions expose equipment to super-fine silica sand dust and high-pressure vehicle wash bays. Kazez integrates dual-channel Viton® fluoroelastomer O-rings around the rotation axis and electrical pass-throughs, sealing the internal planetary drive chamber against any dust or fluid intrusion.',
      specs: [
        { label: isRtl ? 'معيار العزل' : 'Ingress Certification', value: 'IP67 Rated', bench: 'IEC 60529 Compliant' },
        { label: isRtl ? 'عمق الغمر بالماء' : 'Water Submersion Depth', value: '1.0 Meter', bench: isRtl ? '30 دقيقة مستمرة' : '30 Minutes Continuous' },
        { label: isRtl ? 'اختراق غبار السيليكا' : 'Silica Dust Penetration', value: 'Zero (0.0 μm)', bench: isRtl ? 'عزل ضغط إيجابي' : 'Positive Pressure Sealed' },
        { label: isRtl ? 'نطاق حرارة التشغيل' : 'Thermal Operating Range', value: '-20°C to +85°C', bench: isRtl ? 'مختبر بظروف الخليج' : 'Desert Extreme Tested' }
      ],
      points: isRtl ? [
        'مقاوم للمنظفات القوية، والمحروقات، ورطوبة هواء سواحل الخليج المشبعة بالأملاح.',
        'غشاء Gore-Tex لمعادلة الضغط يمنع التكاثف الداخلي دون التأثير على العزل المائي.',
        'براغي ومثبتات من الفولاذ المقاوم للصدأ 316 A4 البحري لمنع التآكل الكهروكيميائي.'
      ] : [
        'Resistant to aggressive detergents, hydrocarbons, and hyper-saline coastal gulf air.',
        'Gore-Tex breathable equalization membrane prevents internal moisture condensation without compromising seal.',
        'Stainless steel 316 A4 marine-grade fasteners eliminate electrolytic galvanic corrosion.'
      ]
    },
    {
      id: 'powertrain',
      label: isRtl ? '03 / ناقل الحركة 45 ن.م' : '03 / 45 Nm Powertrain',
      icon: Gauge,
      headline: isRtl ? 'تروس كوكبية فولاذية بالكامل لنقل الحركة' : 'ALL-STEEL EPICYCLIC PLANETARY GEAR REDUCTION',
      subhead: isRtl ? 'محرك 12 فولت فائق العزم مع مكبح كهروميكانيكي مدمج' : 'HIGH-TORQUE 12V BRUSHED MOTOR WITH INTEGRATED ELECTROMECHANICAL BRAKE',
      description: isRtl
        ? 'حمل هوائيات الراديو الثقيلة بطول 1.5م إلى 2.4م على سرعات عالية يولد قوى عزم هائلة. يعتمد محرك كازيز على صندوق تروس كوكبي ثلاثي المراحل من الفولاذ المقسى يولد عزم تثبيت 45 ن.م، مما يحافظ على استقامة الهوائي دون أي انزلاق.'
        : 'Carrying a heavy 1.5m to 2.4m mobile radio antenna at high velocities generates severe lever forces. Kazez incorporates a hardened steel 3-stage epicyclic planetary gearbox capable of delivering 45 Nm peak holding torque, keeping your antenna perpendicular or stowed without gear slippage.',
      specs: [
        { label: isRtl ? 'عزم التثبيت القابض' : 'Holding Stall Torque', value: '45.0 Nm', bench: isRtl ? 'يثبت هوائي 2.4م عند 180 كم/س' : 'Holds 2.4m Whip at 180 km/h' },
        { label: isRtl ? 'زمن دورة الحركة' : 'Articulation Cycle Time', value: '1.8 Seconds', bench: isRtl ? 'نشر سريع من 0° إلى 90°' : '0° to 90° Rapid Deploy' },
        { label: isRtl ? 'جهد التشغيل' : 'Operating Voltage', value: '12.0 - 14.8 VDC', bench: isRtl ? 'نظام كهرباء السيارات القياسي' : 'Standard Vehicle Electrical' },
        { label: isRtl ? 'استهلاك الطاقة بالاستعداد' : 'Standby Current Draw', value: '0.00 mA', bench: isRtl ? 'صفر استنزاف لبطارية السيارة' : 'Zero Parasitic Battery Drain' }
      ],
      points: isRtl ? [
        'نظام إقفال ذاتي بتروس دودية يمنع ارتجاج الهوائي تماماً أثناء القيادة في الطرق الوعرة.',
        'نظام حماية ذكي يفصل المحرك فوراً عند ملامسة الهوائي لعوائق الأسقف أو الكراجات.',
        'مختبر لأكثر من 50,000 دورة فتح وإغلاق كاملة تحت محاكاة المقاومة الهوائية.'
      ] : [
        'Zero-backlash worm-gear self-locking architecture prevents antenna flutter under turbulence.',
        'Over-current intelligent safety cutoff stops motor instantly if antenna contacts garage obstacles.',
        'Tested for over 50,000 continuous full-articulation cycles under simulated aerodynamic drag.'
      ]
    },
    {
      id: 'rf-fidelity',
      label: isRtl ? '04 / نقاء إشارة RF' : '04 / RF Shielding',
      icon: Radio,
      headline: isRtl ? 'عزل تام للإشارة وتوصيل أرضي مباشر بدون أي فقد' : 'ZERO INSERTION LOSS RF ISOLATION & CONTINUITY',
      subhead: isRtl ? 'توصيلات نحاسية مطلية بالفضة ومسار تأريض مباشر لهيكل السيارة' : 'SILVER-PLATED COPPER GROUND CONTACTS & DIRECT CHASSIS GROUNDING PATH',
      description: isRtl
        ? 'لا فائدة من القاعدة الكهربائية إذا كانت تضعف إشارة جهاز الإرسال. طوق محرك كازيز مزود بنقاط اتصال نابضية من نحاس البيريليوم المطلي بالفضة، مما يضمن استمرارية التأريض بزاوية 360 درجة في جميع أوضاع الهوائي.'
        : 'A motorized mount is useless if it degrades your transceiver signal. The Kazez antenna collar features internal silver-plated beryllium copper spring contacts that ensure continuous 360-degree RF ground continuity regardless of whether the antenna is upright, stowed, or transitioning.',
      specs: [
        { label: isRtl ? 'نطاق التردد اللاسلكي' : 'RF Frequency Range', value: '136 - 470 MHz', bench: isRtl ? 'ترددات VHF و UHF التجارية واللاسلكية' : 'VHF & UHF Commercial/Ham' },
        { label: isRtl ? 'فقد إدخال الإشارة' : 'RF Insertion Loss', value: '< 0.12 dB', bench: isRtl ? 'مختبر عبر أجهزة Rohde & Schwarz' : 'Tested via Rohde & Schwarz VNA' },
        { label: isRtl ? 'تأثير VSWR' : 'VSWR Impact', value: '1.05:1 Typical', bench: isRtl ? 'صفر انعكاس ملحوظ للإشارة' : 'Zero Noticeable SWR Reflection' },
        { label: isRtl ? 'أقصى قدرة إرسال' : 'Maximum RF Power Rating', value: '250 Watts CW', bench: isRtl ? 'مضخمات الإشارة عالية القدرة' : 'High Power Mobile Amplifiers' }
      ],
      points: isRtl ? [
        'منافذ تركيب متوافقة مع موصلات SO-239 / UHF و N-Type عالية الدقة.',
        'وصلة تأريض نحاسية خالية من الأكسجين تتجاوز المحامل الميكانيكية لعودة إشارة نقية 100%.',
        'عزل تام يمنع تسرب أي تشويش كهربائي من الدينامو أو المحرك إلى جهاز الإرسال.'
      ] : [
        'Precision machined SO-239 / UHF and N-Type compatible mounting interfaces.',
        'Braided oxygen-free copper bonding strap bypasses mechanical rotating bearings for pure RF return.',
        'Zero motor electrical hash or alternator whine transmitted back into transceiver feedline.'
      ]
    }
  ];

  const currentSection = technicalSections.find(s => s.id === activeTab) || technicalSections[0];
  const NextChevron = isRtl ? ChevronLeft : ChevronRight;

  return (
    <div className="kz-engineering-page">
      {/* Header Banner */}
      <div className="kz-container kz-eng-header">
        <div className="kz-tag-telemetry" style={{ width: 'fit-content', marginBottom: '16px' }}>
          <Activity size={13} style={{ color: 'var(--kz-racing-red)' }} />
          <span>{t.engineering.tag}</span>
        </div>

        <h1 className="kz-eng-headline">
          {t.engineering.headline}
        </h1>

        <p className="kz-eng-subhead">
          {t.engineering.subhead}
        </p>
      </div>

      {/* Navigation Tabs */}
      <div className="kz-eng-nav-sticky">
        <div className="kz-container" style={{ padding: '0 clamp(16px, 3vw, 32px)' }}>
          <div className="kz-eng-tab-bar">
            {technicalSections.map((sec) => {
              const Icon = sec.icon;
              const isActive = activeTab === sec.id;
              return (
                <button
                  key={sec.id}
                  type="button"
                  className={`kz-eng-tab-btn ${isActive ? 'active' : ''}`}
                  onClick={() => setActiveTab(sec.id)}
                >
                  <Icon size={14} />
                  <span>{sec.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Section Content */}
      <div className="kz-container">
        <div className="kz-eng-content-grid">
          {/* Left Column: Deep Dive Narrative */}
          <div className="kz-eng-narrative-col">
            <div className="kz-eng-subhead-tag">
              {currentSection.subhead}
            </div>
            <h2 className="kz-eng-narrative-headline">
              {currentSection.headline}
            </h2>
            <p className="kz-eng-narrative-desc">
              {currentSection.description}
            </p>

            <div className="kz-eng-points-list">
              {currentSection.points.map((pt, idx) => (
                <div key={idx} className="kz-eng-point-item">
                  <div className="kz-eng-point-icon">
                    <CheckCircle2 size={16} />
                  </div>
                  <div>
                    {pt}
                  </div>
                </div>
              ))}
            </div>

            <div className="kz-eng-cta-row">
              <button
                type="button"
                onClick={() => onSelectEdition('kazez-black')}
                className="kz-btn kz-btn-primary kz-btn-island"
              >
                <span>{t.nav.blackEdition}</span>
                <span className="kz-btn-island-icon">
                  <NextChevron size={13} />
                </span>
              </button>

              <button
                type="button"
                onClick={() => onSelectEdition('kazez-silver')}
                className="kz-btn kz-btn-secondary kz-btn-island"
              >
                <span>{t.nav.silverEdition}</span>
                <span className="kz-btn-island-icon">
                  <NextChevron size={13} />
                </span>
              </button>
            </div>
          </div>

          {/* Right Column: Spec Benchmarks Grid (Double-Bezel) */}
          <div className="kz-eng-benchmarks-col">
            <div className="kz-eng-bench-card">
              <div className="kz-eng-bench-inner">
                <div className="kz-eng-bench-title">
                  {t.engineering.labBenchmarks}
                </div>

                <div className="kz-eng-specs-grid">
                  {currentSection.specs.map((sp, idx) => (
                    <div key={idx} className="kz-eng-spec-tile">
                      <div className="kz-eng-spec-lbl">
                        {sp.label}
                      </div>
                      <div className="kz-eng-spec-val">
                        {sp.value}
                      </div>
                      <div className="kz-eng-spec-bench">
                        {sp.bench}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Stress Test Comparison Metric */}
                <div className="kz-eng-stress-wrap">
                  <div className="kz-eng-stress-title">
                    {isRtl ? 'أقصى سرعة تحمل لمقاومة الرياح الهوائية' : 'Aerodynamic Drag Survival Velocity'}
                  </div>
                  <div className="kz-eng-meter-row">
                    <span className="kz-eng-meter-label">{isRtl ? 'محرك كازيز' : 'Kazez Billet'}</span>
                    <div className="kz-eng-meter-track">
                      <div className="kz-eng-meter-fill primary" style={{ width: '100%' }}></div>
                    </div>
                    <span className="kz-eng-meter-val">220 km/h</span>
                  </div>

                  <div className="kz-eng-meter-row">
                    <span className="kz-eng-meter-label" style={{ color: 'var(--kz-text-muted)' }}>{isRtl ? 'القواعد المصبوبة' : 'Cast Brackets'}</span>
                    <div className="kz-eng-meter-track">
                      <div className="kz-eng-meter-fill secondary" style={{ width: '50%' }}></div>
                    </div>
                    <span className="kz-eng-meter-val" style={{ color: 'var(--kz-text-muted)', fontWeight: 400 }}>110 km/h</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
