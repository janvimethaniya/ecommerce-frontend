import React, { useContext } from 'react'
import './navbar.css'
import logo from '../Assets/logoo.jpg'
import cart_icon from '../Assets/cart_icon.png'
import { Link } from 'react-router-dom'
import { ShopContext } from '../../Context/Shopcontext'

const Navbar = () => {
   const { getTotalItems } = useContext(ShopContext)
   const totalItems = getTotalItems()

  return (
   
    <div className='navbar'>
        <div className='nav-logo'>
            <img src={logo} alt="" />
           
    <ul className='nav-menu'>
        <li><Link to='/'>Shop <hr /></Link></li>
        <li><Link to='/about'>About</Link></li>
        <li><Link to='/contact'>Contact</Link></li>
        <li><Link to='/myorders'>My Orders</Link></li>

    </ul>
    <div className='nav-login-cart'>
      {localStorage.getItem('auth-token')
      ?<button onClick={()=>{localStorage.removeItem('auth-token');window.location.replace('/')}}>Logout</button>
      :<Link to='/login'>  <button>Login</button></Link>}
      
      <div className='cart-icon-wrapper'>
        <Link to='/cart'>  <img src={cart_icon} alt="cart" /></Link>
        <div className='nav-cart-count'>{totalItems}</div>
      </div>
    </div>

        </div>
      </div>
  )
}

export default Navbar
