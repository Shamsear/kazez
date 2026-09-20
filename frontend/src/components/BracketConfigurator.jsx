import React, { useState } from 'react';
import { Search, CheckCircle2, ShieldAlert, Check, ArrowRight, ShieldCheck, X } from 'lucide-react';
import { BRACKETS, VEHICLE_MAKES } from '../data/brackets';

export const BracketConfigurator = ({ onConfigureMotor }) => {
  const [selectedMake, setSelectedMake] = useState('All Makes');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredBrackets = BRACKETS.filter((bracket) => {
    const matchesMake = selectedMake === 'All Makes' || bracket.make.toLowerCase() === selectedMake.toLowerCase();
    const query = searchQuery.toLowerCase().trim();
    const matchesQuery =
      !query ||
      bracket.name.toLowerCase().includes(query) ||
      bracket.model.toLowerCase().includes(query) ||
      bracket.sku.toLowerCase().includes(query) ||
      bracket.years.toLowerCase().includes(query);
    return matchesMake && matchesQuery;
  });

  return (
    <section className="kz-section" id="kz-brackets">
      <div className="kz-container">
        {/* Section header */}
        <div style={{ maxWidth: '680px', marginBottom: '40px' }}>
          <div className="kz-tag-telemetry">
            <span className="kz-live-indicator" />
            <span>DIRECT BOLT-ON // VEHICLE FITMENT MATRIX</span>
          </div>
          <h2 className="kz-hero-title" style={{ fontSize: 'clamp(2rem, 3.8vw, 3.2rem)', margin: '14px 0 10px' }}>
            Vehicle Fitment<br />
            <span style={{ color: 'var(--kz-racing-red)' }}>Compatibility.</span>
          </h2>
          <p style={{ color: 'var(--kz-text-secondary)', fontSize: '0.95rem', lineHeight: '1.8' }}>
            The Kazez Antenna Motor interfaces directly with your vehicle's factory mounting points without any drilling or body modification. Browse below to verify your vehicle's direct bolt-on match before ordering your Kazez Motor.
          </p>
        </div>

        {/* Filter & Search Toolbar */}
        <div className="kz-configurator-box">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '20px', flexWrap: 'wrap', marginBottom: '24px' }}>
            {/* Filter pills */}
            <div className="kz-filter-pills" style={{ marginBottom: 0 }}>
              {VEHICLE_MAKES.map((make) => (
                <button
                  key={make}
                  type="button"
                  className={`kz-filter-pill ${selectedMake === make ? 'active' : ''}`}
                  onClick={() => setSelectedMake(make)}
                >
                  {make}
                </button>
              ))}
            </div>

            {/* Search field */}
            <div style={{ position: 'relative', minWidth: '240px', flex: '1 1 200px', maxWidth: '360px' }}>
              <Search size={16} color="var(--kz-text-muted)" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
              <input
                type="text"
                className="kz-form-input"
                style={{ paddingLeft: '40px', paddingRight: searchQuery ? '36px' : '14px' }}
                placeholder="Search model, year, SKU..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  style={{
                    position: 'absolute',
                    right: '10px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'rgba(255, 255, 255, 0.08)',
                    border: 'none',
                    borderRadius: '50%',
                    width: '22px',
                    height: '22px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--kz-text-muted)',
                    cursor: 'pointer',
                    padding: 0
                  }}
                  aria-label="Clear search input"
                >
                  <X size={12} />
                </button>
              )}
            </div>
          </div>

          {/* Brackets Grid */}
          {filteredBrackets.length > 0 ? (
            <div className="kz-bracket-grid">
              {filteredBrackets.map((bracket) => (
                <div key={bracket.id} className="kz-bracket-card">
                  <div className="kz-bracket-thumb">
                    <img src={bracket.image} alt={bracket.name} loading="lazy" />
                  </div>

                  <div className="kz-bracket-header">
                    <span className="kz-badge-make">{bracket.make}</span>
                    <span className="kz-badge-years">{bracket.years}</span>
                  </div>

                  <h3 className="kz-bracket-title">{bracket.name}</h3>
                  <div className="kz-bracket-sku">FITMENT CODE: {bracket.sku}</div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem', color: 'var(--kz-racing-red)', margin: '8px 0' }}>
                    <ShieldCheck size={14} />
                    <span>{bracket.mountType}</span>
                  </div>

                  <p style={{ fontSize: '0.8rem', color: 'var(--kz-text-secondary)', lineHeight: '1.6', marginBottom: '16px', flexGrow: 1 }}>
                    {bracket.notes}
                  </p>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '14px', borderTop: '1px solid var(--kz-border)' }}>
                    <div>
                      <div style={{ fontSize: '0.75rem', color: '#4ade80', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 500 }}>
                        <Check size={12} /> 100% Direct Bolt-On
                      </div>
                      <div style={{ fontSize: '0.68rem', color: 'var(--kz-text-muted)', marginTop: '2px' }}>
                        Zero Drilling Required
                      </div>
                    </div>

                    <button
                      type="button"
                      className="kz-btn kz-btn-secondary kz-btn-sm"
                      onClick={() => onConfigureMotor && onConfigureMotor('kazez-black')}
                      aria-label={`Configure Kazez Motor for ${bracket.model}`}
                    >
                      <span>Configure Motor</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--kz-text-muted)' }}>
              <ShieldAlert size={40} color="var(--kz-racing-red)" style={{ marginBottom: '12px' }} />
              <h4 style={{ color: '#fff', marginBottom: '8px' }}>No Exact Match for "{searchQuery}"</h4>
              <p style={{ maxWidth: '440px', margin: '0 auto 20px', fontSize: '0.88rem' }}>
                We precision-fabricate custom stainless steel brackets in-house for unlisted GCC vehicles at our Doha facility.
              </p>
              <a
                href="https://wa.me/97455128900?text=Hello%20Kazez%2C%20I%20need%20a%20custom%20antenna%20bracket%20for%20my%20vehicle"
                target="_blank"
                rel="noreferrer"
                className="kz-btn kz-btn-whatsapp kz-btn-sm"
              >
                Inquire on WhatsApp
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
