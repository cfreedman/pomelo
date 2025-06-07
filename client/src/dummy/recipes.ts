import { Recipe, BaseRecipe } from "@/lib/recipes";

export const DUMMY_RECIPES: Recipe[] = [
  {
    id: "1",
    name: "Spaghetti Bolognese",
    cuisine: "Italian",
    mealType: "Dinner",
    servings: 4,
    tags: [
      { id: "1", name: "Hearty" },
      { id: "2", name: "Comfort Food" },
    ],
    ingredients: [
      { id: "1", name: "Spaghetti", quantity: 200, units: "g" },
      { id: "2", name: "Ground Beef", quantity: 300, units: "g" },
      { id: "3", name: "Tomato Sauce", quantity: 400, units: "ml" },
      { id: "4", name: "Onion", quantity: 1 },
    ],
  },
  {
    id: "2",
    name: "Chicken Curry",
    cuisine: "Indian",
    mealType: "Dinner",
    servings: 4,
    tags: [
      { id: "3", name: "Spicy" },
      { id: "4", name: "Comfort Food" },
    ],
    ingredients: [
      { id: "5", name: "Chicken", quantity: 500, units: "g" },
      { id: "6", name: "Curry Powder", quantity: 2, units: "tbsp" },
      { id: "7", name: "Coconut Milk", quantity: 400, units: "ml" },
      { id: "8", name: "Onion", quantity: 1 },
    ],
  },
  {
    id: "3",
    name: "Caesar Salad",
    cuisine: "American",
    mealType: "Lunch",
    servings: 2,
    tags: [
      { id: "5", name: "Healthy" },
      { id: "6", name: "Quick" },
    ],
    ingredients: [
      { id: "9", name: "Romaine Lettuce", quantity: 1, units: "head" },
      { id: "10", name: "Croutons", quantity: 50, units: "g" },
      { id: "11", name: "Caesar Dressing", quantity: 100, units: "ml" },
      { id: "12", name: "Parmesan Cheese", quantity: 30, units: "g" },
    ],
  },
  {
    id: "4",
    name: "Beef Stroganoff",
    cuisine: "Russian",
    mealType: "Dinner",
    servings: 4,
    tags: [
      { id: "7", name: "Hearty" },
      { id: "8", name: "Comfort Food" },
    ],
    ingredients: [
      { id: "13", name: "Beef", quantity: 500, units: "g" },
      { id: "14", name: "Mushrooms", quantity: 200, units: "g" },
      { id: "15", name: "Sour Cream", quantity: 200, units: "ml" },
      { id: "16", name: "Onion", quantity: 1 },
    ],
  },
  {
    id: "5",
    name: "Vegetable Stir Fry",
    cuisine: "Chinese",
    mealType: "Dinner",
    servings: 3,
    tags: [
      { id: "9", name: "Healthy" },
      { id: "10", name: "Quick" },
    ],
    ingredients: [
      { id: "17", name: "Broccoli", quantity: 200, units: "g" },
      { id: "18", name: "Carrots", quantity: 150, units: "g" },
      { id: "19", name: "Bell Peppers", quantity: 150, units: "g" },
      { id: "20", name: "Soy Sauce", quantity: 50, units: "ml" },
    ],
  },
  {
    id: "6",
    name: "Pancakes",
    cuisine: "American",
    mealType: "Breakfast",
    servings: 4,
    tags: [
      { id: "11", name: "Sweet" },
      { id: "12", name: "Quick" },
    ],
    ingredients: [
      { id: "21", name: "Flour", quantity: 200, units: "g" },
      { id: "22", name: "Milk", quantity: 300, units: "ml" },
      { id: "23", name: "Eggs", quantity: 2 },
      { id: "24", name: "Sugar", quantity: 50, units: "g" },
    ],
  },
  {
    id: "7",
    name: "Sushi Rolls",
    cuisine: "Japanese",
    mealType: "Lunch",
    servings: 2,
    tags: [
      { id: "13", name: "Healthy" },
      { id: "14", name: "Light" },
    ],
    ingredients: [
      { id: "25", name: "Sushi Rice", quantity: 200, units: "g" },
      { id: "26", name: "Nori Sheets", quantity: 4 },
      { id: "27", name: "Cucumber", quantity: 1 },
      { id: "28", name: "Raw Fish", quantity: 150, units: "g" },
    ],
  },
  {
    id: "8",
    name: "Tacos",
    cuisine: "Mexican",
    mealType: "Dinner",
    servings: 4,
    tags: [
      { id: "15", name: "Spicy" },
      { id: "16", name: "Quick" },
    ],
    ingredients: [
      { id: "29", name: "Tortillas", quantity: 8 },
      { id: "30", name: "Ground Beef", quantity: 300, units: "g" },
      { id: "31", name: "Cheese", quantity: 100, units: "g" },
      { id: "32", name: "Lettuce", quantity: 1, units: "head" },
    ],
  },
  {
    id: "9",
    name: "Margherita Pizza",
    cuisine: "Italian",
    mealType: "Dinner",
    servings: 2,
    tags: [
      { id: "17", name: "Vegetarian" },
      { id: "18", name: "Comfort Food" },
    ],
    ingredients: [
      { id: "33", name: "Pizza Dough", quantity: 1 },
      { id: "34", name: "Tomato Sauce", quantity: 100, units: "ml" },
      { id: "35", name: "Mozzarella Cheese", quantity: 150, units: "g" },
      { id: "36", name: "Basil", quantity: 10, units: "g" },
    ],
  },
  {
    id: "10",
    name: "French Onion Soup",
    cuisine: "French",
    mealType: "Dinner",
    servings: 4,
    tags: [
      { id: "19", name: "Hearty" },
      { id: "20", name: "Comfort Food" },
    ],
    ingredients: [
      { id: "37", name: "Onions", quantity: 500, units: "g" },
      { id: "38", name: "Beef Broth", quantity: 1, units: "l" },
      { id: "39", name: "Butter", quantity: 50, units: "g" },
      { id: "40", name: "Gruyere Cheese", quantity: 100, units: "g" },
    ],
  },
  {
    id: "11",
    name: "Pad Thai",
    cuisine: "Thai",
    mealType: "Dinner",
    servings: 3,
    tags: [
      { id: "21", name: "Spicy" },
      { id: "22", name: "Quick" },
    ],
    ingredients: [
      { id: "41", name: "Rice Noodles", quantity: 200, units: "g" },
      { id: "42", name: "Shrimp", quantity: 150, units: "g" },
      { id: "43", name: "Peanuts", quantity: 50, units: "g" },
      { id: "44", name: "Bean Sprouts", quantity: 100, units: "g" },
    ],
  },
  {
    id: "12",
    name: "Greek Salad",
    cuisine: "Greek",
    mealType: "Lunch",
    servings: 2,
    tags: [
      { id: "23", name: "Healthy" },
      { id: "24", name: "Vegetarian" },
    ],
    ingredients: [
      { id: "45", name: "Tomatoes", quantity: 200, units: "g" },
      { id: "46", name: "Cucumber", quantity: 1 },
      { id: "47", name: "Feta Cheese", quantity: 100, units: "g" },
      { id: "48", name: "Olives", quantity: 50, units: "g" },
    ],
  },
  {
    id: "13",
    name: "Chocolate Cake",
    cuisine: "American",
    mealType: "Dessert",
    servings: 8,
    tags: [
      { id: "25", name: "Sweet" },
      { id: "26", name: "Rich" },
    ],
    ingredients: [
      { id: "49", name: "Flour", quantity: 250, units: "g" },
      { id: "50", name: "Cocoa Powder", quantity: 50, units: "g" },
      { id: "51", name: "Sugar", quantity: 200, units: "g" },
      { id: "52", name: "Eggs", quantity: 3 },
    ],
  },
  {
    id: "14",
    name: "Fish and Chips",
    cuisine: "British",
    mealType: "Dinner",
    servings: 2,
    tags: [
      { id: "27", name: "Comfort Food" },
      { id: "28", name: "Crispy" },
    ],
    ingredients: [
      { id: "53", name: "Fish Fillets", quantity: 300, units: "g" },
      { id: "54", name: "Potatoes", quantity: 500, units: "g" },
      { id: "55", name: "Flour", quantity: 100, units: "g" },
      { id: "56", name: "Oil", quantity: 500, units: "ml" },
    ],
  },
  {
    id: "15",
    name: "Avocado Toast",
    cuisine: "American",
    mealType: "Breakfast",
    servings: 1,
    tags: [
      { id: "29", name: "Healthy" },
      { id: "30", name: "Quick" },
    ],
    ingredients: [
      { id: "57", name: "Bread", quantity: 2, units: "slices" },
      { id: "58", name: "Avocado", quantity: 1 },
      { id: "59", name: "Salt", quantity: 1, units: "tsp" },
      { id: "60", name: "Pepper", quantity: 1, units: "tsp" },
    ],
  },
];

export const DUMMY_BASE_RECIPES: BaseRecipe[] = DUMMY_RECIPES.map(
  ({ id, name }) => ({ id, name })
);
