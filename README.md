# Recipe App

A Recipe Application built with Next.js and Tailwind CSS, using the free MealDB API to showcase recipes, allowing users to add them to a cart, and providing a basic authentication flow. The application features a clean, responsive design and is accessible across devices.

## Live Demo
[Live Link](https://practical-assessment-repliq.vercel.app/)

## Features

### 1. **Home Page**
   - **Banner Section**: A visually appealing banner section highlighting the app's purpose.
   - **Top Recipes Section**: Displays a selection of top recipes from the MealDB API.
   - **Search Recipes**: Users can search for recipes by name or ingredients for ease of access.

### 2. **All Recipes Page**
   - A dedicated page that displays all recipes fetched from the MealDB API, allowing users to browse through the entire recipe collection.

### 3. **Cart Functionality**
   - **Add to Cart**: Users can add recipes to their cart directly from the list or recipe details view.
   - **Local Storage**: If users are not logged in, cart data is stored locally.
   - **Account Storage**: For logged-in users, cart data is saved to their account.

### 4. **Authentication**
   - Basic sign-up and login flow allowing users to register with their name, email, phone, and password.
   - **Protected Routes**: Pages like the cart are accessible only after logging in, ensuring user privacy.

## Bug Fixes
1. **Fixed API Fetch Errors**: Resolved issues with API calls that prevented data from loading properly.
2. **Authentication Flow Fix**: Improved handling of login state for better user experience.
3. **UI Responsiveness**: Adjusted layout issues on smaller screens to enhance mobile responsiveness.

## Tech Stack
- **Next.js**: Framework for server-rendered React applications.
- **Tailwind CSS**: Utility-first CSS framework for quick styling.
- **MealDB API**: Free API for retrieving recipe data.
- **React Query (TanStack Query)**: Used for data fetching and caching.
- **Vercel**: Deployment platform for fast, serverless hosting.

## Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/hasibulmahi/practical-assessment-repliq.git
   cd practical-assessment-repliq
