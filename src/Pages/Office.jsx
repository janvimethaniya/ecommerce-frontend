import React from 'react'
import './css/ShopCategory.css'

const Office = () => {
  return (
    <div className="office-page">
      {/* Hero Section */}
      <div className="page-hero">
        <div className="hero-text">
          <h1>Visit Us</h1>
          <p>Connect with our team for partnerships, wholesale inquiries, and support. We're here to help your business grow.</p>
        </div>
        <div className="hero-visual">🏢 Our Hub</div>
      </div>

      {/* Main Layout */}
      <div className="company-layout">
        {/* Left: Location & Details */}
        <div className="company-card">
          <h2>Head Office</h2>
          <p>Our Ahmedabad headquarters is the heart of Prysmor's operations. Whether you're interested in B2B partnerships, wholesale deals, or just want to learn more about us — we're always ready to chat!</p>

          <h2 style={{ marginTop: '14px' }}>Why Visit?</h2>
          <div className="feature-grid">
            <div className="feature-tile">
              <h4>🤝 Partners</h4>
              <p>Wholesale & B2B deals</p>
            </div>
            <div className="feature-tile">
              <h4>🏢 Inquiries</h4>
              <p>Direct business talks</p>
            </div>
            <div className="feature-tile">
              <h4>📦 Support</h4>
              <p>Order & logistics help</p>
            </div>
          </div>
        </div>

        {/* Right: Contact Info */}
        <div className="contact-panel">
          <h3>Office Info</h3>
          <div className="contact-row">
            <strong>📍 Address</strong>
            <span>Ahmedabad, Gujarat, India</span>
          </div>
          <div className="contact-row">
            <strong>🕐 Hours</strong>
            <span>24/7 Online Support</span>
          </div>
          <div className="contact-row">
            <strong>📱 Phone</strong>
            <span>+91 7016432603</span>
          </div>
          <div className="contact-row">
            <strong>📧 Email</strong>
            <span>prysmor@gmail.com</span>
          </div>
          <div className="office-map" style={{ marginTop: '12px' }}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3671.5373771475906!2d72.58!3d23.03!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e84d5a3e6d6d5%3A0x5e84d5a3e6d6d5!2sAhmedabad%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1234567890"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Office
