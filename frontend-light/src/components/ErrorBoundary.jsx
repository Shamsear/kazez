import React from 'react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '80px 24px', textAlign: 'center', maxWidth: '500px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '12px' }}>Something went wrong.</h2>
          <p style={{ color: 'var(--kz-text-muted)', marginBottom: '24px', fontSize: '0.9rem' }}>
            {this.state.error?.message || 'An unexpected error occurred in the storefront view.'}
          </p>
          <button
            type="button"
            className="kz-btn kz-btn-primary"
            onClick={() => {
              this.setState({ hasError: false });
              window.location.hash = '';
              window.location.reload();
            }}
          >
            Reload Storefront
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
