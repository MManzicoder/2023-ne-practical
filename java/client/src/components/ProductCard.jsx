import axios from "axios";
import React, { useState } from "react";
import { sendRequest, API_URL } from "../utils/Api";
import { errorToast, successToast } from "../utils/Toast";

const ProductCard = ({ product }) => {
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (e) => {
    setQuantity(parseInt(e.target.value));
  };

  const handleAddToCart = async () => {
    console.log(product);
    //get the current cart in localstorage
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    //check if the product is already in the cart
    const productFind = cart.find((pr) => pr.productCode === product.code);
    if (productFind != undefined) {
      errorToast("Product already in the cart!");
      return;
    }
    //add item to the cart
    cart.push({ productCode: product.code, quantity });
    localStorage.setItem("cart", JSON.stringify(cart));
    // console.log(`Added ${quantity} ${product.name} to cart`);
    successToast(`Added ${quantity} ${product.name} to cart`);
    window.location.reload();
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
      <div className="md:flex">
        <div className="md:flex-shrink-0">
          <img
            className="h-48 w-full object-cover md:w-48"
            src={`/uploads/${product?.image?.name}`}
            alt={product.name}
          />
        </div>
        <div className="p-8">
          <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
            {product?.productType}
          </div>
          <div className="block mt-1 text-lg leading-tight font-medium text-black">
            {product.name}
          </div>
          <div className="block mt-1 text-lg leading-tight font-medium text-black">
            {product?.quantity?.quantity}
          </div>
          <div className="flex items-center mt-4">
            <label htmlFor="quantity" className="mr-2">
              Quantity:
            </label>
            <input
              type="number"
              id="quantity"
              value={quantity}
              min="1"
              onChange={handleQuantityChange}
              className="appearance-none bg-gray-200 rounded-lg p-2 w-16 text-center"
            />
          </div>
          <button
            onClick={handleAddToCart}
            className="mt-4 bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
