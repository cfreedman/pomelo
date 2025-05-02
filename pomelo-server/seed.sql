
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
)

CREATE TABLE IF NOT EXISTS recipe_meal_plan_bridge (
    recipe_id INTEGER REFERENCES recipes(id)
    meal_plan_id INTEGER REFERENCES meal_plans(id),
    PRIMARY KEY (recipe_id, meal_plan_id)
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

INSERT INTO ingredient (name, units) VALUES
('Chicken Breast', 'grams'),
('Broccoli', 'grams'),
('Rice', 'grams'),
('Olive Oil', 'ml'),
('Salt', 'grams'),
('Pepper', 'grams'),
('Garlic', 'cloves'),
('Onion', 'pieces'),
('Tomato', 'pieces'),
('Pasta', 'grams');

INSERT INTO tags (name) VALUES
('Healthy'),
('Quick'),
('Vegetarian');


INSERT INTO recipes (name, cuisine, meal_type, servings) VALUES
('Chicken Stir Fry', 'Chinese', 'Dinner', 4),
('Pasta Primavera', 'Italian', 'Lunch', 2),
('Garlic Butter Shrimp', 'Seafood', 'Dinner', 3),
('Vegetable Soup', 'American', 'Lunch', 4),
('Grilled Cheese Sandwich', 'American', 'Breakfast', 1);

INSERT INTO stores (name, address, latitude, longitude) VALUES
('Walmart', '123 Main St, Cityville', 40.7128, -74.0060),
('Target', '456 Elm St, Townsville', 34.0522, -118.2437),
('Whole Foods', '789 Oak St, Villageburg', 37.7749, -122.4194),
('Trader Joes', '101 Pine St, Hamletton', 41.8781, -87.6298),
('Costco', '202 Maple St, Boroughtown', 47.6062, -122.3321);

INSERT INTO meal_plans (week_start) VALUES
('2025-04-20'),
('2025-04-06');

INSERT INTO shopping_lists (week_start) VALUES
('2025-02-23'),
('2025-02-09');

