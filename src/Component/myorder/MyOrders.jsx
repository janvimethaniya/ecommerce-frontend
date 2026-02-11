import React, { useEffect, useState } from 'react'
import './myOrder.css'

const MyOrders= () => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [expandedOrder, setExpandedOrder] = useState(null)
  const [orderEntries, setOrderEntries] = useState({})

  /* ================= FETCH MY ORDERS ================= */
  const fetchMyOrders = async () => {
    try {
      const res = await fetch('http://localhost:7000/my-orders', {
        headers: {
          'auth-token': localStorage.getItem('auth-token')
        }
      })
      const data = await res.json()
      if (data.success) {
        setOrders(data.orders)
      }
      setLoading(false)
    } catch (err) {
      console.error(err)
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMyOrders()
  }, [])

  /* ================= FETCH TRACKING ================= */
  const fetchTracking = async (orderId) => {
    const res = await fetch(`http://localhost:7000/order-entries/${orderId}`)
    const data = await res.json()
    setOrderEntries(prev => ({ ...prev, [orderId]: data }))
  }

  /* ================= HELPERS ================= */
  const formatDate = (d) =>
    new Date(d).toLocaleString('en-IN')

  const getStatusColor = (status) => {
    switch (status) {
      case 'order_placed': return '#2874f0'
      case 'processing': return '#ff9f00'
      case 'packed': return '#8e24aa'
      case 'shipped': return '#1976d2'
      case 'out_for_delivery': return '#f57c00'
      case 'delivered': return '#31a049'
      case 'cancelled': return '#d32f2f'
      default: return '#666'
    }
  }

  if (loading) return <p className="loading">Loading your orders...</p>

  if (!orders.length) {
    return <p className="empty">You have not placed any orders yet.</p>
  }

  return (
    <div className="myorders-container">
      <h2>🛒 My Orders</h2>

      {orders.map(order => (
        <div key={order._id} className="myorder-card">

          {/* HEADER */}
          <div className="myorder-header">
            <div>
              <p><b>Order ID:</b> {order._id.slice(-8)}</p>
              <p className="date">{formatDate(order.date)}</p>
            </div>

            <span
              className="status-badge"
              style={{ background: getStatusColor(order.status) }}
            >
              {order.status.replace(/_/g, ' ').toUpperCase()}
            </span>
          </div>

          {/* ITEMS */}
          <div className="items">
            {order.cartItems.map((item, i) => (
              <div key={i} className="item">
                {item.image && <img src={item.image} alt={item.name} />}
                <div>
                  <p className="name">{item.name}</p>
                  <p>Qty: {item.quantity}</p>
                  <p>₹{item.new_price}</p>
                </div>
              </div>
            ))}
          </div>

          {/* TOTAL */}
          <div className="total">
            <b>Total:</b> ₹{order.totalAmount}
          </div>

          {/* TRACK BUTTON */}
          <button
            className="track-btn"
            onClick={() => {
              if (expandedOrder === order._id) {
                setExpandedOrder(null)
              } else {
                setExpandedOrder(order._id)
                if (!orderEntries[order._id]) {
                  fetchTracking(order._id)
                }
              }
            }}
          >
            {expandedOrder === order._id ? 'Hide Tracking ▲' : 'Track Order ▼'}
          </button>

          {/* TRACKING */}
          {expandedOrder === order._id && (
            <div className="tracking-box">
              {orderEntries[order._id]?.length ? (
                orderEntries[order._id].map((t, i) => (
                  <div key={i} className="track-item">
                    <span className="dot"></span>
                    <div>
                      <p className="action">{t.action.replace(/_/g, ' ')}</p>
                      <p className="desc">{t.description}</p>
                      <p className="time">{formatDate(t.timestamp)}</p>
                      {t.notes && <p className="note">Note: {t.notes}</p>}
                    </div>
                  </div>
                ))
              ) : (
                <p>No tracking updates yet.</p>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export default MyOrders
