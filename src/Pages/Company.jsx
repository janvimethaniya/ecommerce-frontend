import React from 'react'
import './css/ShopCategory.css'

const Company = () => {
  return (
    <div className="company-page">
      {/* Hero Section */}
      <div className="page-hero">
        <div className="hero-text">
          <h1>Prysmor</h1>
          <p>Trendy fashion meets affordable quality since 2018. Trusted by 50,000+ customers worldwide.</p>
        </div>
        <div className="hero-visual">👔 Fashion First</div>
      </div>

      {/* Main Layout */}
      <div className="company-layout">
        {/* Left: Mission & Values */}
        <div className="company-card">
          <h2>Our Mission</h2>
          <p>We're committed to delivering premium-quality, trendy clothing at prices everyone can afford. Quality testing, fast shipping, and customer satisfaction drive everything we do.</p>

          <h2 style={{ marginTop: '14px' }}>Core Values</h2>
          <div className="feature-grid">
            <div className="feature-tile">
              <h4>✓ Quality</h4>
              <p>Premium fabrics & detail inspection</p>
            </div>
            <div className="feature-tile">
              <h4>💎 Trust</h4>
              <p>50K+ happy customers</p>
            </div>
            <div className="feature-tile">
              <h4>🚀 Innovation</h4>
              <p>New collections weekly</p>
            </div>
          </div>
        </div>

        {/* Right: Contact Panel */}
        <div className="contact-panel">
          <h3>Get in Touch</h3>
          <div className="contact-row">
            <strong>📧 Email</strong>
            <span>prysmor@gmail.com</span>
          </div>
          <div className="contact-row">
            <strong>📱 Phone</strong>
            <span>+91 7016432603</span>
          </div>
          <div className="contact-row">
            <strong>📍 HQ</strong>
            <span>Ahmedabad, India</span>
          </div>
          <div className="contact-row">
            <strong>🕐 Hours</strong>
            <span>24/7 Online Support</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Company
