import React, { useState, useEffect } from 'react';

/**
 * NewsletterSignupModal Component
 * Renders a newsletter subscription modal with success check marks
 * and an animated confetti celebration burst on submit.
 * 
 * @param {Object} props
 * @param {boolean} props.isOpen - Controls visibility of the modal
 * @param {Function} props.onClose - Triggered when closing the modal
 * @param {string} [props.title='Join Our Newsletter'] - Modal header title
 * @param {string} [props.description='Get the latest updates, articles, and resources straight to your inbox.'] - Modal description
 * @param {string} [props.buttonText='Subscribe'] - CTA button label
 * @param {string} [props.accentColor='#8b5cf6'] - Primary styling color
 */
export default function NewsletterSignupModal({
  isOpen,
  onClose,
  title = 'Join Our Newsletter',
  description = 'Get the latest updates, articles, and resources straight to your inbox.',
  buttonText = 'Subscribe',
  accentColor = '#8b5cf6'
}) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle | loading | success
  const [error, setError] = useState('');
  const [particles, setParticles] = useState([]);

  // Clear states when modal opens/closes
  useEffect(() => {
    if (!isOpen) {
      setEmail('');
      setStatus('idle');
      setError('');
      setParticles([]);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const validateEmail = (val) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
  };

  // Generate dynamic celebration particles positions
  const triggerConfetti = () => {
    const newParticles = Array.from({ length: 24 }).map((_, i) => {
      const angle = (i * 360) / 24;
      const distance = 80 + Math.random() * 40;
      const duration = 0.6 + Math.random() * 0.4;
      
      return {
        id: i,
        angle,
        distance,
        duration,
        color: ['#8b5cf6', '#3b82f6', '#10b981', '#f59e0b', '#f43f5e'][i % 5]
      };
    });
    setParticles(newParticles);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!email) {
      setError('Email address is required.');
      return;
    }
    if (!validateEmail(email)) {
      setError('Please provide a valid email address.');
      return;
    }

    setStatus('loading');

    // Simulate server request
    setTimeout(() => {
      setStatus('success');
      triggerConfetti();
    }, 1200);
  };

  return (
    <div
      className="modal-overlay"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(3, 7, 18, 0.85)',
        backdropFilter: 'blur(4px)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000
      }}
      onClick={onClose}
    >
      {/* Modal Container */}
      <div
        className="modal-container ease-zoom-in ease-duration-normal"
        style={{
          width: '100%',
          maxWidth: '480px',
          backgroundColor: '#0b0f19',
          border: '1px solid #1f2937',
          borderRadius: '16px',
          padding: '2.5rem',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5)',
          position: 'relative'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          className="modal-close-btn"
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1.25rem',
            right: '1.25rem',
            background: 'none',
            border: 'none',
            color: '#6b7280',
            fontSize: '1.25rem',
            cursor: 'pointer',
            transition: 'color 0.2s ease'
          }}
        >
          &times;
        </button>

        {status !== 'success' ? (
          /* Form Content */
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>✉️</div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#f9fafb', margin: '0 0 0.5rem 0' }}>
                {title}
              </h3>
              <p style={{ fontSize: '0.9rem', color: '#9ca3af', margin: 0, lineHeight: 1.5 }}>
                {description}
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={status === 'loading'}
                style={{
                  width: '100%',
                  boxSizing: 'border-box',
                  padding: '0.75rem 1rem',
                  borderRadius: '8px',
                  backgroundColor: '#030712',
                  border: '1px solid #1f2937',
                  color: '#fff',
                  outline: 'none',
                  fontSize: '0.9rem',
                  transition: 'border-color 0.2s ease'
                }}
              />
              {error && (
                <span style={{ fontSize: '0.8rem', color: '#f43f5e', paddingLeft: '0.25rem' }}>
                  {error}
                </span>
              )}
            </div>

            <button
              type="submit"
              disabled={status === 'loading'}
              style={{
                width: '100%',
                padding: '0.75rem',
                borderRadius: '8px',
                backgroundColor: accentColor,
                color: '#fff',
                fontWeight: 700,
                fontSize: '0.9rem',
                border: 'none',
                cursor: 'pointer',
                transition: 'opacity 0.2s ease',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              {status === 'loading' ? (
                /* Spinner indicator */
                <span className="spinner-icon" style={{
                  width: '16px',
                  height: '16px',
                  border: '2px solid rgba(255, 255, 255, 0.3)',
                  borderTopColor: '#fff',
                  borderRadius: '50%',
                  animation: 'spin 0.8s linear infinite'
                }} />
              ) : buttonText}
            </button>
          </form>
        ) : (
          /* Success Screen with Confetti Burst */
          <div style={{ textAlign: 'center', position: 'relative' }}>
            {/* Confetti Particles Container */}
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', pointerEvents: 'none' }}>
              {particles.map(p => (
                <div
                  key={p.id}
                  style={{
                    position: 'absolute',
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    backgroundColor: p.color,
                    transform: `rotate(${p.angle}deg) translate(${p.distance}px)`,
                    opacity: 0,
                    animation: `burst ${p.duration}s cubic-bezier(0.1, 0.8, 0.3, 1) forwards`
                  }}
                />
              ))}
            </div>

            <div className="ease-zoom-in" style={{ fontSize: '3rem', marginBottom: '1rem', animationDuration: '0.5s' }}>🎉</div>
            <h3 className="ease-fade-in" style={{ fontSize: '1.5rem', fontWeight: 800, color: '#10b981', margin: '0 0 0.5rem 0' }}>
              Subscribed Successfully!
            </h3>
            <p className="ease-fade-in" style={{ fontSize: '0.9rem', color: '#9ca3af', margin: '0 0 1.5rem 0', lineHeight: 1.5 }}>
              Thank you for subscribing! Check your inbox for your welcome details.
            </p>
            <button
              onClick={onClose}
              style={{
                padding: '0.5rem 1.5rem',
                borderRadius: '6px',
                border: '1px solid #1f2937',
                backgroundColor: '#030712',
                color: '#fff',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              Close Window
            </button>
          </div>
        )}
      </div>

      {/* Global CSS declarations injected automatically */}
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @keyframes burst {
          0% { opacity: 1; transform: rotate(var(--angle, 0deg)) translate(0); }
          100% { opacity: 0; transform: rotate(var(--angle, 0deg)) translate(var(--distance, 100px)); }
        }
      `}</style>
    </div>
  );
}
