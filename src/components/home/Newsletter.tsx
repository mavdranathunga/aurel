'use client';

import { useState } from 'react';
import { Send } from 'lucide-react';
import ScrollReveal from '@/components/ui/ScrollReveal';
import styles from './Newsletter.module.css';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail('');
    }
  };

  return (
    <section className={`section ${styles.section}`} id="newsletter">
      <div className="container">
        <ScrollReveal>
          <div className={styles.card}>
            <div className={styles.bgGlow} />
            <div className={styles.content}>
              <span className="label">Stay Connected</span>
              <h2 className="heading-lg" style={{ marginTop: 'var(--space-md)', marginBottom: 'var(--space-md)' }}>
                Join the AUREL World
              </h2>
              <p className={styles.text}>
                Subscribe to receive exclusive early access, personalized style recommendations,
                and invitations to private events.
              </p>

              {submitted ? (
                <div className={styles.success}>
                  <p>Welcome to the AUREL world. Check your inbox for a special welcome.</p>
                </div>
              ) : (
                <form className={styles.form} onSubmit={handleSubmit}>
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={styles.input}
                    required
                    id="newsletter-email"
                  />
                  <button type="submit" className={`btn btn-primary ${styles.submitBtn}`} id="newsletter-submit">
                    Subscribe
                    <Send size={14} />
                  </button>
                </form>
              )}

              <p className={styles.privacy}>
                By subscribing, you agree to our Privacy Policy. Unsubscribe anytime.
              </p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
