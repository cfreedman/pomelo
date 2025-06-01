CREATE DATABASE pomelo;

\c pomelo;

CREATE TABLE IF NOT EXISTS stores (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    address VARCHAR(100),
    latitude FLOAT,
    longitude FLOAT
);

CREATE TABLE IF NOT EXISTS ingredients (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    units VARCHAR(20),
    store_id INTEGER REFERENCES stores(id)
);

CREATE TABLE IF NOT EXISTS tags (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS recipes (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    cuisine VARCHAR(100),
    meal_type VARCHAR(50),
    servings INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS ingredient_recipe_bridge (
    recipe_id INTEGER REFERENCES recipes(id),
    ingredient_id INTEGER REFERENCES ingredients(id),
    quantity INTEGER NOT NULL,
    PRIMARY KEY (recipe_id, ingredient_id)
);

CREATE TABLE IF NOT EXISTS tag_recipe_bridge (
    recipe_id INTEGER REFERENCES recipes(id),
    tag_id INTEGER REFERENCES tags(id),
    PRIMARY KEY (recipe_id, tag_id)
);

CREATE TABLE IF NOT EXISTS meal_plans (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    week_start DATE NOT NULL
);

CREATE TABLE IF NOT EXISTS recipe_meal_plan_bridge (
    recipe_id INTEGER REFERENCES recipes(id),
    meal_plan_id INTEGER REFERENCES meal_plans(id),
    PRIMARY KEY (recipe_id, meal_plan_id),
    quantity INTEGER NOT NULL DEFAULT 1
);

CREATE TABLE IF NOT EXISTS shopping_lists (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    week_start DATE NOT NULL
);

CREATE TABLE IF NOT EXISTS ingredient_shopping_list_bridge (
    ingredient_id INTEGER REFERENCES ingredients(id),
    shopping_list_id INTEGER REFERENCES shopping_lists(id),
    PRIMARY KEY (ingredient_id, shopping_list_id),
    quantity INTEGER NOT NULL DEFAULT 1
);

INSERT INTO stores (name, address, latitude, longitude) VALUES
('Walmart', '123 Main St, Cityville', 40.7128, -74.0060),
('Target', '456 Elm St, Townsville', 34.0522, -118.2437),
('Whole Foods', '789 Oak St, Villageburg', 37.7749, -122.4194),
('Trader Joes', '101 Pine St, Hamletton', 41.8781, -87.6298),
('Costco', '202 Maple St, Boroughtown', 47.6062, -122.3321),
('Acme Markets', '1400 E Passyunk Ave, Philadelphia, PA', 39.9335, -75.1590),
('ShopRite', '2800 Fox St, Philadelphia, PA', 39.9972, -75.1767),
('Giant Food Stores', '2550 Grant Ave, Philadelphia, PA', 40.0727, -75.0276),
('Fresh Grocer', '4160 Monument Rd, Philadelphia, PA', 40.0086, -75.2242),
('Aldi', '6119 N Broad St, Philadelphia, PA', 40.0452, -75.1377),
('Weis Markets', '2100 County Line Rd, Huntingdon Valley, PA', 40.1302, -75.0617),
('Whole Foods Market', '2101 Pennsylvania Ave, Philadelphia, PA', 39.9637, -75.1740),
('Trader Joes', '2121 Market St, Philadelphia, PA', 39.9542, -75.1757),
('Sprouts Farmers Market', '1000 S Broad St, Philadelphia, PA', 39.9364, -75.1667),
('Redners Warehouse Markets', '500 Eon Blue Bell Pike, Blue Bell, PA', 40.1521, -75.2772);


INSERT INTO ingredients (name, units, store_id) VALUES
('Chicken Breast', 'grams', 1),
('Broccoli', 'grams', 7),
('Rice', 'grams', 12),
('Olive Oil', 'ml', 3),
('Salt', 'grams', 10),
('Pepper', 'grams', 1),
('Garlic', 'cloves', 14),
('Onion', 'pieces', 5),
('Tomato', 'pieces', 2),
('Carrot', 'pieces', 9),
('Potato', 'pieces', 8),
('Bell Pepper', 'pieces', 4),
('Spinach', 'grams', 13),
('Mushroom', 'grams', 6),
('Cheddar Cheese', 'grams', 11),
('Milk', 'ml', 15),
('Egg', 'pieces', 2),
('Butter', 'grams', 8),
('Basil', 'grams', 1),
('Parsley', 'grams', 7),
('Cilantro', 'grams', 3),
('Lemon', 'pieces', 12),
('Lime', 'pieces', 5),
('Beef', 'grams', 9),
('Pork', 'grams', 14),
('Salmon', 'grams', 6),
('Shrimp', 'grams', 4),
('Tofu', 'grams', 13),
('Black Beans', 'grams', 2),
('Kidney Beans', 'grams', 10),
('Chickpeas', 'grams', 11),
('Corn', 'grams', 15),
('Green Peas', 'grams', 1),
('Zucchini', 'pieces', 8),
('Cucumber', 'pieces', 7),
('Lettuce', 'grams', 3),
('Cabbage', 'grams', 9),
('Apple', 'pieces', 5),
('Banana', 'pieces', 12),
('Orange', 'pieces', 14),
('Strawberry', 'grams', 4),
('Blueberry', 'grams', 6),
('Yogurt', 'grams', 2),
('Honey', 'ml', 13),
('Soy Sauce', 'ml', 10),
('Vinegar', 'ml', 8),
('Flour', 'grams', 7),
('Sugar', 'grams', 15),
('Baking Powder', 'grams', 11),
('Oats', 'grams', 9),
('Almonds', 'grams', 3);

INSERT INTO tags (name) VALUES
('Healthy'),
('Quick'),
('Vegetarian'),
('Vegan'),
('Gluten-Free'),
('Low Carb'),
('Dairy-Free'),
('High Protein'),
('Comfort Food');


INSERT INTO recipes (name, cuisine, meal_type, servings) VALUES
('Chicken Stir Fry', 'Chinese', 'Dinner', 4),
('Pasta Primavera', 'Italian', 'Lunch', 2),
('Garlic Butter Shrimp', 'Seafood', 'Dinner', 3),
('Vegetable Soup', 'American', 'Lunch', 4),
('Grilled Cheese Sandwich', 'American', 'Breakfast', 1),
('Beef Tacos', 'Mexican', 'Dinner', 4),
('Vegetable Curry', 'Indian', 'Lunch', 3),
('Salmon Teriyaki', 'Japanese', 'Dinner', 2),
('Greek Salad', 'Greek', 'Lunch', 2),
('Egg Fried Rice', 'Chinese', 'Dinner', 3),
('Mushroom Risotto', 'Italian', 'Dinner', 2),
('Chicken Caesar Salad', 'American', 'Lunch', 2),
('Shakshuka', 'Middle Eastern', 'Breakfast', 2),
('Pancakes', 'American', 'Breakfast', 4),
('Lentil Soup', 'Mediterranean', 'Lunch', 4),
('Stuffed Peppers', 'Mediterranean', 'Dinner', 3),
('Fish Tacos', 'Mexican', 'Lunch', 2),
('Quinoa Bowl', 'Vegetarian', 'Lunch', 2),
('Tofu Stir Fry', 'Asian', 'Dinner', 3),
('Banana Oat Muffins', 'American', 'Breakfast', 6);

INSERT INTO meal_plans (week_start) VALUES
('2025-04-20'),
('2025-04-06');

INSERT INTO shopping_lists (week_start) VALUES
('2025-02-23'),
('2025-02-09');

INSERT INTO ingredient_recipe_bridge (recipe_id, ingredient_id, quantity) VALUES
(1, 1, 500),
(1, 2, 200),
(1, 4, 30),
(2, 9, 300),
(2, 8, 1),
(3, 1, 300),
(3, 7, 2),
(4, 2, 150),
(4, 6, 5),
(5, 8, 2),
(5, 15, 100),
(6, 1, 400),
(6, 10, 2),
(7, 2, 200),
(7, 11, 1),
(8, 1, 250),
(8, 12, 1),
(9, 2, 100),
(9, 13, 50),
(10, 1, 300),
(10, 14, 2),
(11, 2, 200),
(11, 15, 100),
(12, 16, 3),
(12, 17, 2),
(13, 18, 4),
(13, 19, 1),
(14, 20, 2),
(14, 21, 1),
(15, 22, 3),
(15, 23, 1),
(16, 24, 2),
(16, 25, 1);

INSERT INTO tag_recipe_bridge (recipe_id, tag_id) VALUES
(1, 1),
(1, 2),
(2, 3),
(3, 1),
(4, 2),
(5, 3);

INSERT INTO ingredient_shopping_list_bridge (ingredient_id, shopping_list_id, quantity) VALUES
(1, 1, 500),
(2, 1, 200),
(3, 1, 300),
(4, 2, 30),
(5, 2, 5),
(6, 2, 10),
(7, 1, 2),
(8, 1, 1),
(9, 2, 300),
(10, 2, 200),
(11, 1, 100),
(12, 1, 50),
(13, 2, 150),
(14, 2, 100),
(15, 1, 200),
(16, 1, 3),
(17, 2, 4),
(18, 2, 2),
(19, 1, 1),
(20, 1, 5);

INSERT INTO recipe_meal_plan_bridge (recipe_id, meal_plan_id, quantity) VALUES
(1, 1, 2),
(2, 1, 1),
(3, 2, 3),
(4, 2, 4),
(5, 1, 1),
(6, 1, 2),
(7, 2, 3),
(8, 2, 2),
(9, 1, 1),
(10, 1, 2),
(11, 2, 3),
(12, 2, 4),
(13, 1, 2),
(14, 1, 1),
(15, 2, 3),
(16, 2, 4);

