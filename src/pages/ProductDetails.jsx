import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router"
import { getProductById } from "../data/products";
import { useCart } from "../context/CartContext";

export default function ProductDetails(){
     const {id} = useParams();
     const [product, setProduct] = useState();
     const navigate = useNavigate();

      const { addToCart, cartItems } = useCart();
  
     
     
     useEffect(() => {
          const foundProduct = getProductById(id);

          if(!foundProduct) {
               navigate("/");
               return
          }
          setProduct(foundProduct);

     }, [id]);
     if(!product) {
          return <h1>Loading...</h1>
     }

        
         if (!product) return null;
     
         const productInCart = cartItems.find(item => item.id === product.id);
         const productQuantityLabel = productInCart ? `(${productInCart.quantity})` : "";
     return (
          <div className="page">
          <div className="container">
               <div className="product-detail">
                    <div className="product-detail-image">
                    <img src={product.image} alt="" />
                    </div>
                    <div className="product-detail-content">
                         <h1 className="product-detail-name">{product.name}</h1>
                         <p className="product-detail-price">${product.price}</p>
                         <p className="product-detail-description">{product.description}</p>
                         <button className="btn btn-primary" onClick={() => addToCart(product.id)}>Add to Cart {productQuantityLabel}
                         </button>  

                    </div>
                    
               </div>  

          </div>
          </div>
     )
}