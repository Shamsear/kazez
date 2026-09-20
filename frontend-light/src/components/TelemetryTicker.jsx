import React from 'react';
import { ShieldCheck, Cpu, Gauge, Zap } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const TelemetryTicker = () => {
  const { isRtl } = useLanguage();

  const metrics = [
    {
      icon: <Gauge size={18} color="var(--kz-crimson)" />,
      val: '45 Nm',
      lbl: isRtl ? 'عزم التثبيت الكوكبي' : 'Planetary Torque',
      sub: isRtl ? 'ثبات حتى 160 كم/س' : '45 Nm Holding Lock'
    },
    {
      icon: <ShieldCheck size={18} color="#059669" />,
      val: 'IP67',
      lbl: isRtl ? 'عزل الرمال والماء' : 'Desert Ingress',
      sub: isRtl ? 'حلقات فيتون مزدوجة' : 'Hermetic Seal'
    },
    {
      icon: <Cpu size={18} color="var(--kz-text-primary)" />,
      val: '6061-T6',
      lbl: isRtl ? 'سبيكة طيران مخرطة' : 'Aviation Billet',
      sub: isRtl ? 'ألومنيوم مقسى CNC' : 'Structural Alloy'
    },
    {
      icon: <Zap size={18} color="var(--kz-crimson)" />,
      val: '433 MHz',
      lbl: isRtl ? 'تحكم لاسلكي فوري' : 'Wireless Remote',
      sub: isRtl ? 'إشارة بدون فقد' : 'RF Conduit'
    }
  ];

  return (
    <section className="kz-ticker-wrap" aria-label="Hardware Telemetry Metrics">
      <div className="kz-container">
        <div className="kz-telemetry-grid">
          {metrics.map((m, idx) => (
            <div key={idx} className="kz-telemetry-card-item">
              <div className="kz-telemetry-icon-wrap">{m.icon}</div>
              <div className="kz-telemetry-content">
                <div className="kz-telemetry-val">{m.val}</div>
                <div className="kz-telemetry-lbl">{m.lbl}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
