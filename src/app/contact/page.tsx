'use client';

import { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle } from 'lucide-react';
import ScrollReveal from '@/components/ui/ScrollReveal';
import styles from './contact.module.css';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '', email: '', subject: '', message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className={styles.page}>
      <div className="container">
        <ScrollReveal>
          <div className={styles.hero}>
            <span className="label">Get in Touch</span>
            <h1 className="heading-display" style={{ marginTop: 'var(--space-md)' }}>Contact Us</h1>
            <p className={styles.heroText}>
              We&apos;d love to hear from you. Whether you have a question about our collection,
              sizing, or anything else, our team is here to help.
            </p>
          </div>
        </ScrollReveal>

        <div className={styles.grid}>
          <ScrollReveal>
            <div className={styles.info}>
              <div className={styles.infoCard}>
                <Mail size={20} className={styles.infoIcon} />
                <div>
                  <h3 className={styles.infoTitle}>Email</h3>
                  <p className={styles.infoText}>hello@aurel.com</p>
                  <p className={styles.infoSubtext}>We reply within 24 hours</p>
                </div>
              </div>

              <div className={styles.infoCard}>
                <Phone size={20} className={styles.infoIcon} />
                <div>
                  <h3 className={styles.infoTitle}>Phone</h3>
                  <p className={styles.infoText}>+94 11 234 5678</p>
                  <p className={styles.infoSubtext}>Mon–Fri, 9am–6pm IST</p>
                </div>
              </div>

              <div className={styles.infoCard}>
                <MapPin size={20} className={styles.infoIcon} />
                <div>
                  <h3 className={styles.infoTitle}>Flagship Store</h3>
                  <p className={styles.infoText}>One Galle Face</p>
                  <p className={styles.infoSubtext}>Colombo 02, Sri Lanka</p>
                </div>
              </div>

              <div className={styles.infoCard}>
                <Clock size={20} className={styles.infoIcon} />
                <div>
                  <h3 className={styles.infoTitle}>Store Hours</h3>
                  <p className={styles.infoText}>Mon–Sat: 10am – 8pm</p>
                  <p className={styles.infoSubtext}>Sunday: 11am – 6pm</p>
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <div className={styles.formCard}>
              {submitted ? (
                <div className={styles.success}>
                  <CheckCircle size={48} color="var(--success)" strokeWidth={1} />
                  <h3 className="heading-md" style={{ marginTop: 'var(--space-lg)' }}>Message Sent</h3>
                  <p className={styles.successText}>
                    Thank you for reaching out. Our team will get back to you within 24 hours.
                  </p>
                  <button className="btn btn-secondary" onClick={() => { setSubmitted(false); setFormData({ name: '', email: '', subject: '', message: '' }); }}>
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className={styles.form}>
                  <h2 className={styles.formTitle}>Send a Message</h2>

                  <div className={styles.formRow}>
                    <div className={styles.field}>
                      <label className={styles.fieldLabel} htmlFor="contact-name">Name</label>
                      <input
                        type="text"
                        name="name"
                        id="contact-name"
                        value={formData.name}
                        onChange={handleChange}
                        className="input"
                        placeholder="Your full name"
                        required
                      />
                    </div>
                    <div className={styles.field}>
                      <label className={styles.fieldLabel} htmlFor="contact-email">Email</label>
                      <input
                        type="email"
                        name="email"
                        id="contact-email"
                        value={formData.email}
                        onChange={handleChange}
                        className="input"
                        placeholder="you@example.com"
                        required
                      />
                    </div>
                  </div>

                  <div className={styles.field}>
                    <label className={styles.fieldLabel} htmlFor="contact-subject">Subject</label>
                    <select
                      name="subject"
                      id="contact-subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="input select"
                      required
                    >
                      <option value="">Select a topic</option>
                      <option value="order">Order Inquiry</option>
                      <option value="product">Product Question</option>
                      <option value="returns">Returns & Exchanges</option>
                      <option value="sizing">Sizing Help</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div className={styles.field}>
                    <label className={styles.fieldLabel} htmlFor="contact-message">Message</label>
                    <textarea
                      name="message"
                      id="contact-message"
                      value={formData.message}
                      onChange={handleChange}
                      className="input textarea"
                      placeholder="How can we help you?"
                      rows={5}
                      required
                    />
                  </div>

                  <button type="submit" className="btn btn-primary" style={{ width: '100%' }} id="contact-submit">
                    Send Message
                    <Send size={14} />
                  </button>
                </form>
              )}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
}
