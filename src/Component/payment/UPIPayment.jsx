import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { QRCodeSVG } from "qrcode.react";
import axios from "axios";
import qrImage from "../../Component/Assets/qr1.jpeg";
const UPIPayment = ({ amount, cartProducts, address }) => {
  const navigate = useNavigate();
  const [paymentIntentId, setPaymentIntentId] = useState("");
  const [upiQR, setUpiQR] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");

  const handleUPIPayment = async () => {
    try {
      const token = localStorage.getItem("auth-token");

      const res = await axios.post(
        "http://localhost:7000/create-payment",
        { amount },
        { headers: { "auth-token": token } }
      );

      const { paymentIntentId } = res.data; // <-- use paymentIntentId from backend
      setPaymentIntentId(paymentIntentId);

      const qrString = `upi://pay?pa=methaniyajanvi636@okaxis&pn=Janvi&am=${amount}&cu=INR&tr=${paymentIntentId}`;
      setUpiQR(qrString);
    } catch (err) {
      console.log("Error creating payment:", err);
    }
  };

  const saveOrder = async () => {
    const token = localStorage.getItem("auth-token");
    try {
      await axios.post(
        "http://localhost:7000/save-order",
        {
          cartItems: cartProducts,
          totalAmount: amount,
          paymentId: "UPI_" + paymentIntentId,
          status: "succeeded",
          address,
        },
        { headers: { "auth-token": token } }
      );
      setTimeout(() => {
        navigate("/myorders");
      }, 2000);
    } catch (err) {
      console.log("Error saving order:", err);
    }
  };

  useEffect(() => {
    if (!paymentIntentId) return;

    const interval = setInterval(async () => {
      try {
        const token = localStorage.getItem("auth-token");
        const res = await axios.post(
          "http://localhost:7000/check-payment",
          { paymentIntentId },
          { headers: { "auth-token": token } }
        );

        if (res.data.status === "succeeded") {
          setPaymentStatus("succeeded");
          clearInterval(interval);
          saveOrder();
        }
      } catch (err) {
        console.log(err);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [paymentIntentId]);

  if (paymentStatus === "succeeded") {
    return (
      <>
        {/* TOP TOAST NOTIFICATION */}
        <div style={{
          position: "fixed",
          top: "20px",
          left: "50%",
          transform: "translateX(-50%)",
          backgroundColor: "#28a745",
          color: "white",
          padding: "15px 30px",
          borderRadius: "8px",
          fontSize: "18px",
          fontWeight: "bold",
          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
          zIndex: 9999,
          animation: "slideDown 0.5s ease-out"
        }}>
          ✓ Payment Successful!
        </div>

        {/* MODAL OVERLAY */}
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0,0,0,0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 9998
        }}>
          {/* MODAL BOX */}
          <div style={{
            backgroundColor: "white",
            padding: "40px 50px",
            borderRadius: "12px",
            textAlign: "center",
            boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
            maxWidth: "500px"
          }}>
            <div style={{
              fontSize: "60px",
              marginBottom: "20px",
              animation: "bounce 0.6s ease-out"
            }}>
              ✓
            </div>
            <h2 style={{ color: "#28a745", marginTop: 0, fontSize: "28px", marginBottom: "10px" }}>
              Payment Successful!
            </h2>
            <p style={{ color: "#666", fontSize: "16px", marginBottom: "20px" }}>
              Your payment has been received successfully.
            </p>
            <p style={{ color: "#999", fontSize: "14px", marginBottom: 0 }}>
              Saving order and redirecting to your orders...
            </p>
            
            {/* LOADING ANIMATION */}
            <div style={{
              marginTop: "20px",
              display: "flex",
              justifyContent: "center",
              gap: "8px"
            }}>
              <div style={{
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                backgroundColor: "#28a745",
                animation: "pulse 1.4s infinite"
              }}></div>
              <div style={{
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                backgroundColor: "#28a745",
                animation: "pulse 1.4s infinite 0.2s"
              }}></div>
              <div style={{
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                backgroundColor: "#28a745",
                animation: "pulse 1.4s infinite 0.4s"
              }}></div>
            </div>
          </div>
        </div>

        {/* CSS ANIMATIONS */}
        <style>{`
          @keyframes slideDown {
            from {
              opacity: 0;
              transform: translateX(-50%) translateY(-20px);
            }
            to {
              opacity: 1;
              transform: translateX(-50%) translateY(0);
            }
          }

          @keyframes bounce {
            0% {
              transform: scale(0);
            }
            50% {
              transform: scale(1.2);
            }
            100% {
              transform: scale(1);
            }
          }

          @keyframes pulse {
            0%, 100% {
              opacity: 0.3;
            }
            50% {
              opacity: 1;
            }
          }
        `}</style>
      </>
    );
  }

  return (
     <div style={{ textAlign: "center", marginTop: 50 }}>
      <h2>Pay via UPI</h2>
      <div className="qr-area">
        <p>Scan this QR with your UPI app to pay ₹{amount}</p>
        {!paymentIntentId ? (
          <button 
            onClick={handleUPIPayment}
            style={{
              padding: "10px 20px",
              fontSize: "16px",
              backgroundColor: "#2d3436",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              marginBottom: "20px"
            }}
          >
            Generate UPI QR Code
          </button>
        ) : (
          <>
            <img
              src={qrImage}
              alt="UPI QR"
              style={{ width: 250, height: 250, borderRadius: 10 }}
            />
            <p style={{ marginTop: "15px", color: "#666", fontSize: "14px" }}>Waiting for payment confirmation...</p>
          </>
        )}
      </div>
    </div>
  );
};

export default UPIPayment;
