"use client";
import React from "react";
import HttpKit from "@/common/helpers/HttpKit";
import RecipeCard from "./RecipeCard";
import { useQuery } from "@tanstack/react-query";

const AllRecipes = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["all-recipes"],
    queryFn: HttpKit.listAllMeals,
  });

  if (isLoading)
    return <div className="container pt-20">Loading recipes...</div>;
  if (error)
    return (
      <div className="container pt-20">
        Error loading recipes: {error.message}
      </div>
    );

  return (
    <div className="bg-gray-50 py-32">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-6">All Recipes</h1>
        <div className="grid gap-6 lg:grid-cols-3">
          {data.map((recipe) => (
            <RecipeCard
              key={recipe.idMeal}
              recipe={recipe}
              handleDetailsOpen={() => {}}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllRecipes;
