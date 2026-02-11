import React from 'react'
import './footer.css'
import footer_logo from'../Assets/logoo.jpg';
import instragram_icon from '../Assets/instagram_icon.png'
import printrest_icon from '../Assets/pintester_icon.png'
import whatsapp_icon from '../Assets/whatsapp_icon.png'
import { Link } from 'react-router-dom'
const Footer = () => {
  return (
    <div className='footer'>
        <div className='footer-logo'>
            <img src={footer_logo} alt="" />
            <p>Prysmor</p>

        </div>
        <ul className='footer-link'>
          <li><Link to="/company">Company</Link></li>
          <li><Link to="/">Products</Link></li>
          <li><Link to="/office">Office</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>
        <div className='social-link'>
            <div className='footer-icon-container'>
                <img src={instragram_icon} alt="" />
            </div>
             <div className='footer-icon-container'>
                <img src={printrest_icon} alt="" />
            </div>
             <div className='footer-icon-container'>
                <img src={whatsapp_icon} alt="" />
            </div>

        </div>
      <div className='footer-copyright'>
        <hr/>
        <p>Copyright @2025 all reserved</p>
      </div>

    </div>
  )
}

export default Footer
