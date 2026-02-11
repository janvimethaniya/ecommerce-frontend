// src/pages/Payment.jsx
import React, { useState, useEffect } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useNavigate, useLocation } from "react-router-dom";
import UPIPayment from "./UPIPayment";
import "./payment.css";

const Payment = () => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const location = useLocation();

  // Safely get state from Checkout page
  const state = location.state || {};
  const cartProducts = state.cartProducts || [];
  const amount = state.amount || 0;
  const address = state.address || {};

  const [method, setMethod] = useState("card");
  const [showUPI, setShowUPI] = useState(false);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [cardError, setCardError] = useState("");

  // Redirect if no cartProducts
  useEffect(() => {
    if (cartProducts.length === 0 || amount <= 0) {
      alert("No products selected, redirecting to Checkout");
      navigate("/checkout");
    }
  }, [cartProducts, amount, navigate]);

  const handleCardChange = (event) => {
    if (event.error) {
      setCardError(event.error.message);
    } else {
      setCardError("");
    }
  };

  /* ===== CARD PAYMENT ===== */
  const payByCard = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg("");
    setCardError("");

    // Validate card element
    if (!stripe || !elements) {
      setMsg("Payment system not initialized");
      setLoading(false);
      return;
    }

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      setMsg("Card element not found");
      setLoading(false);
      return;
    }

    try {
      const token = localStorage.getItem("auth-token");
      if (!token) {
        setMsg("User not authenticated");
        setLoading(false);
        return;
      }

      const res = await fetch("http://localhost:7000/create-payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
        body: JSON.stringify({ amount }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        console.error("Payment creation error:", errorText);
        
        if (res.status === 401) {
          setMsg("Session expired. Please login again.");
        } else if (res.status === 400) {
          setMsg("Invalid payment request");
        } else {
          setMsg("Failed to create payment: " + errorText);
        }
        setLoading(false);
        return;
      }

      const data = await res.json();
      if (!data.clientSecret) {
        setMsg("Payment initialization failed");
        setLoading(false);
        return;
      }
      const { clientSecret } = data;

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: { card: cardElement },
      });

      if (result.error) {
        setMsg(result.error.message);
        setCardError(result.error.message);
      } else if (result.paymentIntent.status === "succeeded") {
        await saveOrder("succeeded", result.paymentIntent.id);
      }
    } catch (err) {
      setMsg("Payment failed: " + err.message);
      setCardError(err.message);
    }

    setLoading(false);
  };

  /* ===== COD ===== */
  const payByCOD = async () => {
    setLoading(true);
    await saveOrder("cod", "COD_" + Date.now());
    setLoading(false);
  };

  /* ===== UPI ===== */
  const payByUPI = () => {
    setShowUPI(true);
  };

  /* ===== SAVE ORDER ===== */
  const saveOrder = async (status, paymentId) => {
    const token = localStorage.getItem("auth-token");
    try {
      await fetch("http://localhost:7000/save-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
        body: JSON.stringify({
          cartItems: cartProducts,
          totalAmount: amount,
          paymentId,
          status,
          address,
        }),
      });
      alert("Order Placed Successfully");
      navigate("/myorders");
    } catch (err) {
      setMsg("Failed to save order");
    }
  };

  return (
    <div className="payment-page">
      <div className="payment-card">
        {/* LEFT PANEL */}
        <div className="pay-left">
          <h2>Payment Details</h2>

          <div className="address-box">
            <strong>Shipping To:</strong>
            <div>{address.name}</div>
            <div>{address.phone}</div>
            <div>
              {address.line1}, {address.city}, {address.state} - {address.pincode}
            </div>
          </div>

          {!showUPI && (
            <div className="payment-options">
              {/* <div
                className={`opt ${method === "card" ? "active" : ""}`}
                onClick={() => setMethod("card")}
              >
                Card
              </div> */}
              <div
                className={`opt ${method === "cod" ? "active" : ""}`}
                onClick={() => setMethod("cod")}
              >
                COD
              </div>
              <div
                className={`opt ${method === "upi" ? "active" : ""}`}
                onClick={payByUPI}
              >
                UPI
              </div>
            </div>
          )}



          {method === "cod" && !showUPI && (
            <button className="btn" onClick={payByCOD} disabled={loading}>
              Place COD Order — ₹{amount}
            </button>
          )}

          {showUPI && <UPIPayment amount={amount} cartProducts={cartProducts} address={address} />}
          {msg && <div className={`msg error`}>{msg}</div>}
        </div>

        {/* RIGHT PANEL */}
        <div className="pay-right">
          <h3>Order Summary</h3>
          <div className="summary-scroll">
            {cartProducts.map((item) => (
              <div className="summary-line" key={item.id}>
                <img src={item.image} alt={item.name} />
                <div className="meta">
                  <strong>{item.name}</strong>
                  <span>Qty: {item.quantity} {item.size ? `• ${item.size}` : ""}</span>
                </div>
                <div>₹{item.new_price * item.quantity}</div>
              </div>
            ))}
          </div>
          <div className="summary-bottom">
            <div className="row">
              <span>Subtotal</span>
              <span>₹{amount}</span>
            </div>
            <div className="total-row">
              <span>Total</span>
              <span>₹{amount}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
