import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../Context/Shopcontext"
import ProductDisplay from "../Component/productDisplay/ProductDisplay" 

const Product = () => {
  const { productId } = useParams();
  const { all_product } = useContext(ShopContext);

  // Convert productId to number for comparison
  const product = all_product.find((p) => String(p.id) === String(productId) || p._id === productId);

  return (
    <div>
      {product ? (
        <ProductDisplay product={product} />
      ) : (
        <div style={{ textAlign: 'center', padding: '50px 20px', fontSize: '18px', color: '#666' }}>
          <h2>Product not found</h2>
          <p>We couldn't find the product you're looking for.</p>
        </div>
      )}
    </div>
  );
};

export default Product;
