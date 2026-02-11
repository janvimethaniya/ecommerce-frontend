import React from "react";
import "./testimonial.css";

const Testimonials = () => {
  const reviews = [
    {
      name: "Priya S.",
      city: "Ahmedabad",
      rating: "⭐⭐⭐⭐⭐",
      text: "Product quality bahu saras che. Same jevu image ma dekhatu hatu ane delivery fast hati."
    },
    {
      name: "Rohit K.",
      city: "Surat",
      rating: "⭐⭐⭐⭐☆",
      text: "Price reasonable che ane packing perfect hati. Recommend karish."
    },
    {
      name: "Neha P.",
      city: "Mumbai",
      rating: "⭐⭐⭐⭐⭐",
      text: "Customer support responsive che ane return process easy hato."
    },
    {
      name: "Ankit R.",
      city: "Jaipur",
      rating: "⭐⭐⭐⭐⭐",
      text: "Meesho jevo experience malyo. Quality ane price banne best."
    }
  ];

  return (
    <div className="testimonials">
      <h2>Customer Reviews</h2>

      <div className="testimonial-list">
        {reviews.map((item, index) => (
          <div className="testimonial-card" key={index}>
            <div className="rating">{item.rating}</div>
            <p className="review-text">“{item.text}”</p>
            <p className="user">
              — {item.name}, <span>{item.city}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
