import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('UI Exception caught by Kazez ErrorBoundary:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.hash = 'home';
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '60vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '40px 24px',
          textAlign: 'center',
          background: 'var(--kz-bg)'
        }}>
          <div style={{
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            background: 'rgba(204, 0, 27, 0.1)',
            border: '1px solid rgba(204, 0, 27, 0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--kz-red)',
            marginBottom: '20px'
          }}>
            <AlertTriangle size={26} />
          </div>

          <div style={{
            fontFamily: 'var(--kz-font-mono)',
            fontSize: '11px',
            letterSpacing: '0.1em',
            color: 'var(--kz-red)',
            textTransform: 'uppercase',
            marginBottom: '8px'
          }}>
            TELEMETRY DISRUPTION DETECTED
          </div>

          <h2 style={{
            fontFamily: 'var(--kz-font-heading)',
            fontSize: '24px',
            fontWeight: 500,
            color: 'var(--kz-text)',
            marginBottom: '12px'
          }}>
            Module Failed to Render
          </h2>

          <p style={{
            fontSize: '14px',
            color: 'var(--kz-text-muted)',
            maxWidth: '460px',
            lineHeight: '1.6',
            marginBottom: '28px'
          }}>
            An unexpected error occurred while loading this view. You can return to home to continue browsing.
          </p>

          <button
            type="button"
            onClick={this.handleReset}
            className="kz-btn kz-btn-primary"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
          >
            <RefreshCw size={15} />
            <span>Reset & Return to Home</span>
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
