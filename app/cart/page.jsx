"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { toast } from "react-toastify";

const Cart = () => {
  const [cart, setCart] = useState([]);

  // Load cart items from localStorage
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, []);

  const handleRemoveFromCart = (itemId) => {
    const updatedCart = cart.filter((item) => item.id !== itemId);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    toast.info("Item removed from cart");
  };

  return (
    <div className="bg-gray-50 min-h-screen flex items-center">
      <div className="container mx-auto">
        <h1 className="text-4xl mb-6">Cart</h1>
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div className="flex flex-col gap-6">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 border-b pb-4"
              >
                <Image
                  src={item.strMealThumb}
                  width={100}
                  height={100}
                  alt={item.strMeal}
                />
                <div className="flex-grow">
                  <h2 className="text-xl font-semibold">{item.strMeal}</h2>
                </div>
                <button
                  onClick={() => handleRemoveFromCart(item.id)}
                  className="bg-red-500 text-white font-bold py-1 px-3 rounded hover:bg-red-600"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
