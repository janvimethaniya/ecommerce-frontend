import React, { useContext } from 'react'
import CartItem from '../Component/CartItem/CartItem'
import { ShopContext } from '../Context/Shopcontext'
import './css/cart.css'

import { useNavigate } from 'react-router-dom'
const Cart = () => {
  const { cartItems, all_product, addToCart, removeFromCart, setItemQuantity, deleteFromCart } = useContext(ShopContext)

  // ----------------------------
  // SAFE CART LIST BUILDING
  // ----------------------------
  const cartProducts = Object.entries(cartItems || {})
    .filter(([, item]) => item?.qty > 0)
    .map(([id, item]) => {
      const product = all_product.find(p => Number(p.id) === Number(id))

      if (!product) return null  // product missing → skip

      return {
        ...product,
        quantity: item.qty,
        size: item.size,
        image: product.image,   // ✔ FINAL FIX
      }
    })
    .filter(Boolean)

  // ----------------------------
  // TOTAL SUBTOTAL
  // ----------------------------
  const subtotal = cartProducts.reduce(
    (acc, item) => acc + item.new_price * item.quantity,
    0
  )

  const navigate = useNavigate()

  // ----------------------------
  // HANDLE DELETE
  // ----------------------------
  const handleDelete = (id) => {
    deleteFromCart(id)
  }

  // ----------------------------
  // HANDLE QUANTITY CHANGE
  // ----------------------------
  const handleSetQuantity = (id, qty) => {
    setItemQuantity(id, qty)
  }

  return (
    <div className="cart-page">
      <h1>Your Cart</h1>

      {cartProducts.length === 0 ? (
        <div className="cart-empty">Your cart is empty. Add products to the cart.</div>
      ) : (
        <div className="cart-grid">

          {/* ---------------------------- */}
          {/* CART PRODUCT LIST */}
          {/* ---------------------------- */}
          <div className="cart-list">
            {cartProducts.map((p) => (
              <CartItem
                key={p.id}
                id={p.id}
                name={p.name}
                image={p.image}     // ✔ FINAL FIX
                price={p.new_price}
                quantity={p.quantity}
                size={p.size}
                onAdd={addToCart}
                onRemove={removeFromCart}
                onDelete={handleDelete}
                onSetQuantity={handleSetQuantity}
              />
            ))}
          </div>

          {/* ---------------------------- */}
          {/* ORDER SUMMARY */}
          {/* ---------------------------- */}
          <div className="cart-summary">
            <h3>Order Summary</h3>

            <div className="summary-row">
              <span>Subtotal</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>

            <div className="summary-row">
              <span>Shipping</span>
              <span>Calculated at checkout</span>
            </div>

            <div className="summary-total">
              <span>Total</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>

      <button
  className="checkout-btn"
  onClick={() => navigate('/checkout')}
>
  Proceed to Checkout
</button>

          </div>

        </div>
        
      )}
    </div>
  )
}

export default Cart
