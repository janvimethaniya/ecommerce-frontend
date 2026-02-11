import React, { useContext, useState } from "react";
import "./productdisplay.css";
import star_dull from "../Assets/star_dull_icon.png";
import { ShopContext } from "../../Context/Shopcontext";
import { useNavigate } from "react-router-dom";

const ProductDisplay = ({ product }) => {
  const { addToCartWithSize } = useContext(ShopContext);
  const navigate = useNavigate();
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = (id) => {
    if (!selectedSize) {
      alert("Please select a size");
      return;
    }
    addToCartWithSize(id, selectedSize);
    alert("Product added to cart!");
    setSelectedSize("");
    setQuantity(1);
  };

  const discount = Math.round(((product.old_price - product.new_price) / product.old_price) * 100);

  return (
    <div className="productdisplay">
      <div className="productdisplay-left">
        <div className="productdisplay-img-container">
          <img
            className="productdisplay-main-img"
            src={product.image || product.img} 
            alt={product.name}
          />
          {discount > 0 && <div className="discount-tag">{discount}% OFF</div>}
        </div>
      </div>

      <div className="productdisplay-right">
        <div className="product-header">
          <h1>{product.name}</h1>
          <p className="product-category">{product.category}</p>
        </div>

        <div className="productdisplay-right-star">
          <div className="star-rating">
            {[...Array(5)].map((_, idx) => (
              <img key={idx} src={star_dull} alt="star" />
            ))}
            <span>(122 reviews)</span>
          </div>
        </div>

        <div className="productdisplay-right-prices">
          <span className="old-price">₹{product.old_price}</span>
          <span className="new-price">₹{product.new_price}</span>
          {discount > 0 && <span className="discount">{discount}% OFF</span>}
        </div>

        <div className="description">
          <h3>Product Description</h3>
          <p>Premium quality product with excellent craftsmanship. Perfect for everyday wear with comfort and style combined.</p>
        </div>

        <div className="size">
          <h3>Select Size</h3>
          <div className="size-options">
            {["S", "M", "L", "XL", "XXL"].map((size) => (
              <div
                key={size}
                className={`size-option ${selectedSize === size ? "active" : ""}`}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </div>
            ))}
          </div>
        </div>

        <div className="quantity-section">
          <h3>Quantity</h3>
          <div className="quantity-control">
            <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>−</button>
            <input type="number" value={quantity} readOnly />
            <button onClick={() => setQuantity(quantity + 1)}>+</button>
          </div>
        </div>

        <div className="action-buttons">
          <button className="add-to-cart-btn" onClick={() => handleAddToCart(product.id)}>
            🛒 Add To Cart
          </button>
          <button className="buy-now-btn" onClick={() => navigate("/checkout")}>
            ⚡ Buy Now
          </button>
        </div>

        <div className="product-info">
          <div className="info-item">
            <span className="label">Free Delivery</span>
            <p>On orders above ₹500</p>
          </div>
          <div className="info-item">
            <span className="label">Easy Returns</span>
            <p>7 days return policy</p>
          </div>
          <div className="info-item">
            <span className="label">Secure Payment</span>
            <p>100% secure transactions</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDisplay;
