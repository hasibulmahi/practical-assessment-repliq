import HttpKit from "@/common/helpers/HttpKit";
import { useTanstack } from "@/providers/TanstackProvider";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const SingleRecipe = ({ id, setIsOpen }) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["recipe-details", id],
    queryFn: () => HttpKit.getRecipeDetails(id),
    enabled: !!id,
  });

  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    // Check if item is already in cart from local storage
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setIsAdded(cart.some((item) => item.id === id));
  }, [id]);

  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const updatedCart = [...cart, { id, ...data }];

    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setIsAdded(true);
    toast.success("Item added to cart");
  };

  if (isLoading) return "Loading...";
  if (error) return "Error loading recipe details";

  return (
    <div className="flex flex-col gap-5">
      <div className="flex justify-end">
        <button onClick={() => setIsOpen(false)}>Close</button>
      </div>
      <div>
        <Image src={data?.strMealThumb} width={500} height={500} alt="Image" />
      </div>
      <h2 className="text-2xl font-semibold">{data?.strMeal}</h2>
      <button
        onClick={handleAddToCart}
        disabled={isAdded}
        className={`${
          isAdded ? "bg-green-500" : "bg-yellow-400"
        } text-white font-bold py-2 px-4 rounded`}
      >
        {isAdded ? "Added" : "Add to Cart"}
      </button>
    </div>
  );
};
export default SingleRecipe;
