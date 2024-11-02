import axios from "axios";

const BASE_URL = "https://www.themealdb.com/api/json/v1/1";

const HttpKit = {
  registerUser: async (userData) => {
    const response = await axios.post("YOUR_API_URL/api/register", userData);
    return response.data;
  },

  loginUser: async (credentials) => {
    const response = await axios.post("YOUR_API_URL/api/login", credentials);
    return response.data;
  },
  // Fetch all meals by a specific letter (e.g., 'a' for all meals starting with 'a')
  listMealsByLetter: async (letter) => {
    try {
      const response = await axios.get(`${BASE_URL}/search.php`, {
        params: { f: letter },
      });
      return response.data.meals || [];
    } catch (error) {
      console.error("Error fetching meals by letter:", error);
      throw error;
    }
  },

  // Fetch all meals based on multiple letters for an "All Recipes" list
  listAllMeals: async () => {
    const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
    try {
      const allMeals = [];
      for (const letter of alphabet) {
        const meals = await HttpKit.listMealsByLetter(letter);
        allMeals.push(...meals);
      }
      return allMeals;
    } catch (error) {
      console.error("Error fetching all meals:", error);
      throw error;
    }
  },
  getTopRecipes: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/filter.php?a=American`);
      return response.data.meals ? response.data.meals.slice(0, 12) : [];
    } catch (error) {
      console.error("Error fetching top recipes:", error);
      throw error;
    }
  },

  searchRecipesByName: async (query) => {
    try {
      const response = await axios.get(`${BASE_URL}/search.php`, {
        params: { s: query },
      });
      return response.data.meals || [];
    } catch (error) {
      console.error("Error fetching recipes by name:", error);
      throw error;
    }
  },

  searchRecipesByIngredient: async (ingredient) => {
    try {
      const response = await axios.get(`${BASE_URL}/filter.php`, {
        params: { i: ingredient },
      });
      return response.data.meals || [];
    } catch (error) {
      console.error("Error fetching recipes by ingredient:", error);
      throw error;
    }
  },

  getRecipeDetails: async (id) => {
    try {
      const response = await axios.get(`${BASE_URL}/lookup.php`, {
        params: { i: id },
      });
      return response.data.meals ? response.data.meals[0] : null;
    } catch (error) {
      console.error("Error fetching recipe details:", error);
      throw error;
    }
  },

  getCategories: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/categories.php`);
      return response.data.categories || [];
    } catch (error) {
      console.error("Error fetching categories:", error);
      throw error;
    }
  },

  filterByCategory: async (category) => {
    try {
      const response = await axios.get(`${BASE_URL}/filter.php`, {
        params: { c: category },
      });
      return response.data.meals || [];
    } catch (error) {
      console.error("Error filtering recipes by category:", error);
      throw error;
    }
  },

  filterByArea: async (area) => {
    try {
      const response = await axios.get(`${BASE_URL}/filter.php`, {
        params: { a: area },
      });
      return response.data.meals || [];
    } catch (error) {
      console.error("Error filtering recipes by area:", error);
      throw error;
    }
  },
};

export default HttpKit;
